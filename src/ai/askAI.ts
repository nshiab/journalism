import process from "node:process";
import fs from "node:fs/promises";
import { GoogleGenAI } from "@google/genai";
import { formatNumber, prettyDuration } from "@nshiab/journalism";

/**
 * Sends a prompt and optionally a file to an LLM. Currently supports Google Gemini AI.
 *
 * The function retrieves credentials and the model from environment variables (`AI_KEY`, `AI_PROJECT`, `AI_LOCATION`, `AI_MODEL`) or accepts them as options. Options take precedence over environment variables.
 *
 * The temperature is set to 0 to ensure reproducible results.
 *
 * @example
 * Basic usage with credentials and model in .env:
 * ```ts
 * await askAI("What is the capital of France?");
 * ```
 *
 * @example
 * Usage with API credentials and model passed as options:
 * ```ts
 * await askAI("What is the capital of France?", {
 *   apiKey: "your_api_key",
 *   model: "gemini-2.0-flash",
 * });
 * ```
 *
 * @example
 * Usage with Vertex AI credentials passed as options:
 * ```ts
 * await askAI("What is the capital of France?", {
 *   vertex: true,
 *   project: "your_project_id",
 *   location: "us-central1",
 * });
 * ```
 *
 * @example
 * Usage with HTML content to scrape data:
 * ```ts
 * const executiveOrders = await askAI(
 *   `Here's the page showing presidential executive orders. Extract the executive order names, dates (yyyy-mm-dd), and URLs as an array of objects. Also categorize each executive order based on its name.`,
 *   {
 *     HTMLFrom: "https://www.whitehouse.gov/presidential-actions/executive-orders/",
 *     returnJson: true,
 *     verbose: true,
 *   },
 * );
 * console.table(executiveOrders);
 * ```
 *
 * @example
 * Usage with an image:
 * ```ts
 * const obj = await askAI(
 *   `Based on the image I send you, return an object with the following properties:
 *   - name: the person in the image if it's a human and recognizable,
 *   - description: a very short description of the image,
 *   - isPolitician: true if it's a politician, false otherwise.
 *   Return just the object.`,
 *   {
 *     image: `./your_image.jpg`,
 *     verbose: true,
 *     returnJson: true,
 *   },
 * );
 * console.log(obj);
 * ```
 *
 * @example
 * Usage with an audio file:
 * ```ts
 * const audioResponse = await askAI(
 *   `Return an object with the name of the person speaking and an approximate date of the speech if recognizable.`,
 *   {
 *     audio: "./speech.mp3",
 *     returnJson: true,
 *   },
 * );
 * ```
 *
 * @example
 * Usage with a video file:
 * ```ts
 * const videoTranscript = await askAI(
 *   `Return an array of objects, each containing the following keys: name, timestamp, main emotion, and transcript. Create a new object each time a new person speaks.`,
 *   {
 *     video: "./your_video.mp4",
 *     returnJson: true,
 *     verbose: true,
 *   },
 * );
 * console.table(videoTranscript);
 * ```
 *
 * @example
 * Usage with a PDF file:
 * ```ts
 * const pdfExtraction = await askAI(
 *   `This is a Supreme Court decision. Provide a list of objects with a date and a brief summary for each important event of the case's merits, sorted chronologically.`,
 *   {
 *     model: "gemini-2.0-flash",
 *     pdf: "./decision.pdf",
 *     returnJson: true,
 *     verbose: true,
 *   },
 * );
 * console.table(pdfExtraction);
 * ```
 *
 * @param prompt - The input string to guide the AI's response.
 * @param options - Configuration options for the AI request.
 *   @param options.model - The model to use. Defaults to the `AI_MODEL` environment variable.
 *   @param options.apiKey - The API key. Defaults to the `AI_KEY` environment variable.
 *   @param options.vertex - Whether to use Vertex AI. Defaults to `false`. If a `AI_PROJECT` and `AI_LOCATION` are set in the environment, it will automatically switch to true.
 *   @param options.project - The Google Cloud project ID. Defaults to the `AI_PROJECT` environment variable.
 *   @param options.location - The Google Cloud location. Defaults to the `AI_LOCATION` environment variable.
 *   @param options.HTMLFrom - The URL to scrape HTML content from. The HTML content is automatically added at the end of the prompt.
 *   @param options.image - The path to the image file. Must be a JPEG file.
 *   @param options.video - The path to the video file. Must be an MP4 file.
 *   @param options.audio - The path to the audio file. Must be an MP3 file.
 *   @param options.pdf - The path to the PDF file.
 *   @param options.returnJson - Whether to return the response as JSON. Defaults to `false`.
 *   @param options.verbose - Whether to log additional information. Defaults to `false`. Note that prices are rough estimates.
 */
export default async function askAI(
  prompt: string,
  options: {
    model?: string;
    apiKey?: string;
    vertex?: boolean;
    project?: string;
    location?: string;
    HTMLFrom?: string;
    image?: string;
    video?: string;
    audio?: string;
    pdf?: string;
    returnJson?: boolean;
    verbose?: boolean;
  } = {},
) {
  const start = Date.now();
  let client;

  // Initialize the GoogleGenAI client based on options or environment variables
  if (options.vertex || options.apiKey || options.project || options.location) {
    client = new GoogleGenAI({
      apiKey: options.apiKey,
      vertexai: options.vertex,
      project: options.project,
      location: options.location,
    });
  } else if (process.env.AI_PROJECT && process.env.AI_LOCATION) {
    client = new GoogleGenAI({
      vertexai: true,
      project: process.env.AI_PROJECT,
      location: process.env.AI_LOCATION,
    });
  } else if (process.env.AI_KEY) {
    client = new GoogleGenAI({
      apiKey: process.env.AI_KEY,
    });
  }

  if (!client) {
    throw new Error(
      "No API key or project/location found. Please set AI_KEY, AI_PROJECT, and AI_LOCATION in your environment variables or pass them as options.",
    );
  }

  const model = options.model ?? process.env.AI_MODEL;
  if (!model) {
    throw new Error(
      "Model not specified. Use the AI_MODEL environment variable or pass it as an option.",
    );
  }

  let response;
  if (options.HTMLFrom) {
    const res = await fetch(options.HTMLFrom);
    const html = await res.text();
    response = await client.models.generateContent({
      model,
      contents: [`${prompt}\nHere's the HTML code:\n${html}`],
      config: {
        temperature: 0,
        responseMimeType: options.returnJson ? "application/json" : undefined,
      },
    });
  } else if (options.audio) {
    const base64Audio = await fs.readFile(options.audio, {
      encoding: "base64",
    });
    response = await client.models.generateContent({
      model,
      contents: [prompt, {
        inlineData: { data: base64Audio, mimeType: "audio/mp3" },
      }],
      config: {
        temperature: 0,
        responseMimeType: options.returnJson ? "application/json" : undefined,
      },
    });
  } else if (options.video) {
    const base64Video = await fs.readFile(options.video, {
      encoding: "base64",
    });
    response = await client.models.generateContent({
      model,
      contents: [prompt, {
        inlineData: { data: base64Video, mimeType: "video/mp4" },
      }],
      config: {
        temperature: 0,
        responseMimeType: options.returnJson ? "application/json" : undefined,
      },
    });
  } else if (options.pdf) {
    const base64Pdf = await fs.readFile(options.pdf, { encoding: "base64" });
    response = await client.models.generateContent({
      model,
      contents: [prompt, {
        inlineData: { data: base64Pdf, mimeType: "application/pdf" },
      }],
      config: {
        temperature: 0,
        responseMimeType: options.returnJson ? "application/json" : undefined,
      },
    });
  } else if (options.image) {
    const base64Image = await fs.readFile(options.image, {
      encoding: "base64",
    });
    response = await client.models.generateContent({
      model,
      contents: [prompt, {
        inlineData: { data: base64Image, mimeType: "image/jpeg" },
      }],
      config: {
        temperature: 0,
        responseMimeType: options.returnJson ? "application/json" : undefined,
      },
    });
  } else {
    response = await client.models.generateContent({
      model,
      contents: prompt,
      config: {
        temperature: 0,
        responseMimeType: options.returnJson ? "application/json" : undefined,
      },
    });
  }

  if (options.verbose) {
    const pricing = [
      { model: "gemini-2.0-flash", input: 0.10, output: 0.40 },
      { model: "gemini-2.0-flash-lite", input: 0.075, output: 0.30 },
    ];
    const modelPricing = pricing.find((p) => p.model === model);
    if (!modelPricing) {
      console.log(`\nModel ${model} not found in pricing list.`);
    } else {
      const promptTokenCount = response.usageMetadata?.promptTokenCount ?? 0;
      const promptTokenCost = (promptTokenCount / 1_000_000) *
        modelPricing.input;
      console.log("\nInput tokens:", promptTokenCount);

      const outputTokenCount = response.usageMetadata?.candidatesTokenCount ??
        0;
      const outputTokenCost = (outputTokenCount / 1_000_000) *
        modelPricing.output;
      console.log("Output tokens:", outputTokenCount);

      const estimatedCost = promptTokenCost + outputTokenCost;
      console.log(
        `Estimated cost for ${model}:`,
        formatNumber(estimatedCost, {
          prefix: "$",
          significantDigits: 1,
          suffix: " USD",
        }),
      );
    }
    console.log("Execution time:", prettyDuration(start));
  }

  if (!response.text) {
    throw new Error(
      "Response text is undefined. Please check the model and input.",
    );
  } else if (options.returnJson) {
    return JSON.parse(response.text);
  } else {
    return response.text;
  }
}
