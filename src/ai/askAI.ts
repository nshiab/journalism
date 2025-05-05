import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import process from "node:process";
import {
  type ContentListUnion,
  GenerateContentResponse,
  GoogleGenAI,
} from "@google/genai";
import { formatNumber, prettyDuration } from "@nshiab/journalism";
import crypto from "node:crypto";
import ollama from "ollama";
import type { ChatResponse } from "ollama";

/**
 * Sends a prompt and optionally a file to an LLM. Currently supports Google Gemini AI and local models running with Ollama.
 *
 * The function retrieves credentials and the model from environment variables (`AI_KEY`, `AI_PROJECT`, `AI_LOCATION`, `AI_MODEL`) or accepts them as options. Options take precedence over environment variables.
 *
 * To run local models with Ollama, set the `OLLAMA` environment variable to `true` and start Ollama on your machine. Make sure to install the model you want and to set the `AI_MODEL` environment variable to the model name. Note that audio, video, or PDF files are not supported for now.
 *
 * The temperature is set to 0 to ensure reproducible results.
 *
 * To save resources and time, you can cache the response. When `cache` is set to `true`, the function saves the response in a local hidden folder called `.journalism-cache`. If the same request is made again in the future, it will return the cached response instead of making a new request. Don't forget to add `.journalism-cache` to your `.gitignore` file!
 *
 * @example
 * Basic usage with credentials and model in .env:
 * ```ts
 * await askAI("What is the capital of France?");
 * ```
 *
 * @example
 * Basic usage with cache:
 * ```ts
 * // Don't forget to add .journalism-cache to your .gitignore file!
 * await askAI("What is the capital of France?", { cache: true });
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
 *     // Can also be an array of URLs.
 *     HTMLFrom: "https://www.whitehouse.gov/presidential-actions/executive-orders/",
 *     returnJson: true,
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
 *     // Can also be an array of images.
 *     image: `./your_image.jpg`,
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
 *     // Can also be an array of audio files.
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
 *     // Can also be an array of video files.
 *     video: "./your_video.mp4",
 *     returnJson: true,
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
 *     // Can also be an array of PDF files.
 *     pdf: "./decision.pdf",
 *     returnJson: true,
 *   },
 * );
 * console.table(pdfExtraction);
 * ```
 *
 * @example
 * Usage with multiple file formats:
 * ```ts
 * const allFiles = await askAI(
 *   `Give me a short description of each thing I give you.`,
 *   {
 *     // Can also be an array of URLs.
 *     HTMLFrom: "https://example.com",
 *     // Can also be an array of audio files.
 *     audio: "speech.mp3",
 *     // Can also be an array of images.
 *     image: "cat.png",
 *     // Can also be an array of video files.
 *     video: "something.mp4",
 *     // Can also be an array of PDF files.
 *     pdf: "decision.pdf",
 *     returnJson: true,
 *   },
 * );
 * ```
 *
 * @example
 * Usage with a test function:
 * ```ts
 * const testedResponse = await askAI(`Give me a list of three countries in Europe.`, {
 *   returnJson: true,
 *   // Can also be an array of functions.
 *   test: (response) => {
 *     if (!Array.isArray(response)) {
 *       throw new Error("Response is not an array.");
 *     }
 *     if (response.length !== 3) {
 *       throw new Error("Response does not contain three items.");
 *     }
 *   },
 * });
 * ```
 *
 * @param prompt - The input string to guide the AI's response.
 * @param options - Configuration options for the AI request.
 *   @param options.cache - Whether to cache the response in a local folder `.journalism-cache`. Defaults to `false`.
 *   @param options.test - A function or array of functions to test the response. It receives the response as an argument.
 *   @param options.model - The model to use. Defaults to the `AI_MODEL` environment variable.
 *   @param options.apiKey - The API key. Defaults to the `AI_KEY` environment variable.
 *   @param options.vertex - Whether to use Vertex AI. Defaults to `false`. If `AI_PROJECT` and `AI_LOCATION` are set in the environment, it will automatically switch to true.
 *   @param options.project - The Google Cloud project ID. Defaults to the `AI_PROJECT` environment variable.
 *   @param options.location - The Google Cloud location. Defaults to the `AI_LOCATION` environment variable.
 *   @param options.ollama - Whether to use Ollama. Defaults to the `OLLAMA` environment variable.
 *   @param options.HTMLFrom - A URL (or list of URLs) to scrape HTML content from. The HTML content is automatically added at the end of the prompt.
 *   @param options.image - The path (or list of paths) to an image file. Must be in JPEG format.
 *   @param options.video - The path (or list of paths) to a video file. Must be in MP4 format.
 *   @param options.audio - The path (or list of paths) to an audio file. Must be in MP3 format.
 *   @param options.pdf - The path (or list of paths) to a PDF file.
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
    ollama?: boolean;
    HTMLFrom?: string | string[];
    image?: string | string[];
    video?: string | string[];
    audio?: string | string[];
    pdf?: string | string[];
    returnJson?: boolean;
    verbose?: boolean;
    cache?: boolean;
    test?: ((response: unknown) => void) | ((response: unknown) => void)[];
  } = {},
): Promise<unknown> {
  const start = Date.now();
  let client;
  const ollamaVar = options.ollama || process.env.OLLAMA;

  if (ollamaVar) {
    client = ollama;
  } else if (
    options.vertex || options.apiKey || options.project || options.location
  ) {
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
      "No API key or project/location or Ollama found. Please set AI_KEY, AI_PROJECT, AI_LOCATION or OLLAMA in your environment variables or pass them as options.",
    );
  }

  const model = options.model ?? process.env.AI_MODEL;
  if (!model) {
    throw new Error(
      "Model not specified. Use the AI_MODEL environment variable or pass it as an option.",
    );
  }

  if (options.verbose) {
    console.log(`\nPrompt to ${model}:`);
    console.log(prompt);
  }

  // Google GenAI
  const contents: ContentListUnion = [];
  // Ollama
  const message: { role: string; content: string; images?: string[] } = {
    role: "user",
    content: "",
  };
  let promptToBeSent = prompt;
  if (options.HTMLFrom) {
    const urls = Array.isArray(options.HTMLFrom)
      ? options.HTMLFrom
      : [options.HTMLFrom];

    for (const url of urls) {
      const res = await fetch(url);
      const html = await res.text();
      promptToBeSent += `\n\nHTML content from ${url}:\n${html}`;
    }
  }
  if (ollamaVar) {
    message.content = promptToBeSent;
  } else {
    contents.push(promptToBeSent);
  }

  if (options.audio) {
    if (ollamaVar) {
      throw new Error(
        "Ollama does not support audio files.",
      );
    } else {
      const audioFiles = Array.isArray(options.audio)
        ? options.audio
        : [options.audio];
      for (const audioFile of audioFiles) {
        const base64Audio = readFileSync(audioFile, {
          encoding: "base64",
        });
        contents.push({
          inlineData: { data: base64Audio, mimeType: "audio/mp3" },
        });
      }
    }
  }

  if (options.video) {
    if (ollamaVar) {
      throw new Error(
        "Ollama does not support video files.",
      );
    } else {
      const videoFiles = Array.isArray(options.video)
        ? options.video
        : [options.video];
      for (const videoFile of videoFiles) {
        const base64Video = readFileSync(videoFile, {
          encoding: "base64",
        });
        contents.push({
          inlineData: { data: base64Video, mimeType: "video/mp4" },
        });
      }
    }
  }

  if (options.pdf) {
    if (ollamaVar) {
      throw new Error(
        "Ollama does not support PDF files.",
      );
    } else {
      const pdfFiles = Array.isArray(options.pdf) ? options.pdf : [options.pdf];
      for (const pdfFile of pdfFiles) {
        const base64Pdf = readFileSync(pdfFile, { encoding: "base64" });
        contents.push({
          inlineData: { data: base64Pdf, mimeType: "application/pdf" },
        });
      }
    }
  }

  if (options.image) {
    const imageFiles = Array.isArray(options.image)
      ? options.image
      : [options.image];
    if (ollamaVar) {
      message.images = imageFiles.map((imageFile) =>
        readFileSync(imageFile, {
          encoding: "base64",
        })
      );
    } else {
      for (const imageFile of imageFiles) {
        const base64Image = readFileSync(imageFile, {
          encoding: "base64",
        });
        contents.push({
          inlineData: { data: base64Image, mimeType: "image/jpeg" },
        });
      }
    }
  }

  // Just everything here
  const params = {
    model,
    contents: contents,
    messages: [message],
    format: options.returnJson ? "json" : undefined,
    temperature: 0,
    config: {
      temperature: 0,
      responseMimeType: options.returnJson ? "application/json" : undefined,
    },
  };

  let cacheFileJSON;
  let cacheFileText;
  if (options.cache) {
    const cachePath = "./.journalism-cache";
    if (!existsSync(cachePath)) {
      mkdirSync(cachePath);
    }
    const hash = crypto
      .createHash("sha256")
      .update(JSON.stringify(params))
      .digest("hex");
    cacheFileJSON = `${cachePath}/askAI-${hash}.json`;
    cacheFileText = `${cachePath}/askAI-${hash}.txt`;
    if (existsSync(cacheFileJSON)) {
      const cachedResponse = JSON.parse(readFileSync(cacheFileJSON, "utf-8"));
      if (options.verbose) {
        console.log("\nReturning cached JSON response.");
      }
      if (options.test) {
        if (Array.isArray(options.test)) {
          options.test.forEach((test) => test(cachedResponse));
        } else {
          options.test(cachedResponse);
        }
      }
      if (options.verbose) {
        console.log("\nResponse:");
        console.log(cachedResponse);
      }
      return cachedResponse;
    } else if (existsSync(cacheFileText)) {
      const cachedResponse = readFileSync(cacheFileText, "utf-8");
      if (options.verbose) {
        console.log("\nReturning cached text response.");
      }
      if (options.test) {
        if (Array.isArray(options.test)) {
          options.test.forEach((test) => test(cachedResponse));
        } else {
          options.test(cachedResponse);
        }
      }
      if (options.verbose) {
        console.log("\nResponse:");
        console.log(cachedResponse);
      }
      return cachedResponse;
    } else {
      if (options.verbose) {
        console.log("\nCache missed. Generating new response...");
      }
    }
  }

  const response = client instanceof GoogleGenAI
    ? await client.models.generateContent(params)
    : await client.chat({
      model,
      messages: [message],
      format: options.returnJson ? "json" : undefined,
      options: {
        temperature: 0,
      },
    });

  if (options.verbose) {
    if (response instanceof GenerateContentResponse) {
      const pricing = [
        { model: "gemini-2.0-flash", input: 0.10, output: 0.40 },
        { model: "gemini-2.0-flash-lite", input: 0.075, output: 0.30 },
      ];
      const modelPricing = pricing.find((p) => p.model === model);
      if (!modelPricing) {
        console.log(
          `${
            options.cache ? "" : "\n"
          }Model ${model} not found in pricing list.`,
        );
      } else {
        const promptTokenCount = response.usageMetadata?.promptTokenCount ?? 0;
        const promptTokenCost = (promptTokenCount / 1_000_000) *
          modelPricing.input;

        const outputTokenCount = response.usageMetadata?.candidatesTokenCount ??
          0;
        const outputTokenCost = (outputTokenCount / 1_000_000) *
          modelPricing.output;

        const estimatedCost = promptTokenCost + outputTokenCost;
        console.log(
          `${options.cache ? "" : "\n"}Tokens in:`,
          formatNumber(promptTokenCount),
          "/",
          "Tokens out:",
          formatNumber(outputTokenCount),
          "/",
          `Estimated cost:`,
          formatNumber(estimatedCost, {
            prefix: "$",
            significantDigits: 1,
            suffix: " USD",
          }),
        );
      }
    }
    console.log("Execution time:", prettyDuration(start));
  }

  let returnedResponse;
  if (response instanceof GenerateContentResponse) {
    if (!response.text) {
      throw new Error(
        "Response text is undefined. Please check the model and input.",
      );
    } else if (options.returnJson) {
      returnedResponse = JSON.parse(response.text);
    } else {
      returnedResponse = response.text.trim();
    }
  } else {
    if (options.returnJson) {
      returnedResponse = JSON.parse(response.message.content);
    } else {
      returnedResponse = response.message.content.trim();
    }
  }

  if (options.test) {
    if (Array.isArray(options.test)) {
      options.test.forEach((test) => test(returnedResponse));
    } else {
      options.test(returnedResponse);
    }
  }

  if (options.cache && options.returnJson && cacheFileJSON) {
    if (
      response instanceof GenerateContentResponse &&
      typeof response.text === "string"
    ) {
      writeFileSync(cacheFileJSON, response.text);
    } else {
      writeFileSync(cacheFileJSON, (response as ChatResponse).message.content);
    }
    console.log("Response cached as JSON.");
  } else if (options.cache && cacheFileText) {
    writeFileSync(cacheFileText, returnedResponse);
    console.log("Response cached as text.");
  }

  if (options.verbose) {
    console.log("\nResponse:");
    console.log(returnedResponse);
  }

  return returnedResponse;
}
