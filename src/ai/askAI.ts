import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import process from "node:process";
import {
  type Candidate,
  type ContentListUnion,
  GenerateContentResponse,
  GoogleGenAI,
} from "@google/genai";
import { formatNumber, prettyDuration } from "../index.ts";
import crypto from "node:crypto";
import ollama, { Ollama } from "ollama";
import { chromium } from "playwright-chromium";
import { jsonrepair } from "jsonrepair";

/**
 * Interacts with a Large Language Model (LLM) to perform a wide range of tasks, from answering questions to analyzing multimedia content. This function serves as a versatile interface to various AI models, including Google's Gemini and local models via Ollama.
 *
 * The function is designed to be highly configurable, allowing you to specify the AI model, credentials, and various input types such as text, images, audio, video, and even web pages. It also includes features for caching responses to improve performance and reduce costs, as well as for testing and cleaning the AI's output.
 *
 * **Authentication**:
 * The function can be authenticated using environment variables (`AI_KEY`, `AI_PROJECT`, `AI_LOCATION`, `AI_MODEL`) or by passing credentials directly in the `options` object. Options will always take precedence over environment variables.
 *
 * **Local Models**:
 * To use a local model with Ollama, set the `OLLAMA` environment variable to `true` and ensure that Ollama is running on your machine. You will also need to specify the model name using the `AI_MODEL` environment variable or the `model` option. If you want your Ollama instance to be used, you can pass an instance of the `Ollama` class as the `ollama` option.
 *
 * **Caching**:
 * Caching is a powerful feature that saves the AI's response to a local directory (`.journalism-cache`). When the same request is made again, the cached response is returned instantly, saving time and API costs. To enable caching, set the `cache` option to `true`.
 *
 * **File Handling**:
 * The function can process both local files and files stored in Google Cloud Storage (GCS). Simply provide the file path or the `gs://` URL. Note that Ollama only supports local files.
 *
 * @example
 * ```ts
 * // Basic usage: Get a simple text response from the AI.
 * // Assumes credentials are set in environment variables.
 * const capital = await askAI("What is the capital of France?");
 * console.log(capital); // "Paris"
 * ```
 *
 * @example
 * ```ts
 * // Enable caching to save the response and avoid repeated API calls.
 * // A .journalism-cache directory will be created.
 * const cachedCapital = await askAI("What is the capital of France?", { cache: true });
 * ```
 *
 * @example
 * ```ts
 * // Pass API credentials directly as options.
 * const response = await askAI("What is the capital of France?", {
 *   apiKey: "your_api_key",
 *   model: "gemini-1.5-flash",
 * });
 *
 * // Use Vertex AI for authentication.
 * const vertexResponse = await askAI("What is the capital of France?", {
 *   vertex: true,
 *   project: "your_project_id",
 *   location: "us-central1",
 * });
 * ```
 *
 * @example
 * ```ts
 * // Scrape and analyze HTML content from a URL.
 * const orders = await askAI(
 *   `From the following HTML, extract the executive order titles, their dates (in yyyy-mm-dd format), and their URLs. Return the data as a JSON array of objects.`,
 *   {
 *     HTMLFrom: "https://www.whitehouse.gov/presidential-actions/executive-orders/",
 *     returnJson: true,
 *   },
 * );
 * console.table(orders);
 *
 * // Analyze a screenshot of a webpage.
 * const specials = await askAI(
 *   `Based on this screenshot of a grocery store flyer, list the products that are on special.`,
 *   {
 *     screenshotFrom: "https://www.metro.ca/circulaire",
 *     returnJson: true,
 *   },
 * );
 * console.table(specials);
 * ```
 * @example
 * ```ts
 * // Analyze a local image file.
 * const personInfo = await askAI(
 *   `Analyze the provided image and return a JSON object with the following details:
 *   - name: The name of the person if they are a recognizable public figure.
 *   - description: A brief description of the image.
 *   - isPolitician: A boolean indicating if the person is a politician.`,
 *   {
 *     image: "./path/to/your_image.jpg",
 *     returnJson: true,
 *   },
 * );
 * console.log(personInfo);
 *
 * // Analyze an image from Google Cloud Storage.
 * const gcsImageInfo = await askAI(
 *   `Describe the scene in this image.`,
 *   {
 *     image: "gs://your-bucket/your_image.jpg",
 *   },
 * );
 * console.log(gcsImageInfo);
 *
 * // Transcribe an audio file.
 * const speechDetails = await askAI(
 *   `Transcribe the speech in this audio file. If possible, identify the speaker and the approximate date of the speech.`,
 *   {
 *     audio: "./path/to/speech.mp3",
 *     returnJson: true,
 *   },
 * );
 * console.log(speechDetails);
 *
 * // Analyze a video file.
 * const videoAnalysis = await askAI(
 *   `Create a timeline of events from this video. For each event, provide a timestamp, a short description, and identify the main people involved.`,
 *   {
 *     video: "./path/to/your_video.mp4",
 *     returnJson: true,
 *   },
 * );
 * console.table(videoAnalysis);
 * ```
 * @example
 * ```ts
 * // Extract structured data from a PDF document.
 * const caseSummary = await askAI(
 *   `This is a Supreme Court decision. Provide a list of objects with a date and a brief summary for each important event of the case's merits, sorted chronologically.`,
 *   {
 *     pdf: "./path/to/decision.pdf",
 *     returnJson: true,
 *   },
 * );
 * console.table(caseSummary);
 *
 * // Summarize a local text file.
 * const summary = await askAI(
 *   `Analyze the content of this CSV file and provide a summary of its key findings.`,
 *   {
 *     text: "./path/to/data.csv",
 *   },
 * );
 * console.log(summary);
 * ```
 * @example
 * ```ts
 * // Process multiple files of different types in a single call.
 * const multiFileSummary = await askAI(
 *   `Provide a brief summary for each file I've provided.`,
 *   {
 *     HTMLFrom: "https://www.un.org/en/global-issues",
 *     audio: "path/to/speech.mp3",
 *     image: "path/to/protest.jpg",
 *     video: "path/to/event.mp4",
 *     pdf: "path/to/report.pdf",
 *     text: "path/to/notes.txt",
 *     returnJson: true,
 *   },
 * );
 * console.log(multiFileSummary);
 *
 * // Use a clean and test function to process and validate the AI's output.
 * const europeanCountries = await askAI(
 *   `Give me a list of three countries in Northern Europe.`,
 *   {
 *     returnJson: true,
 *     clean: (response: unknown) => {
 *       // Example: Trim whitespace from each country name in the array
 *       if (Array.isArray(response)) {
 *         return response.map(item => typeof item === 'string' ? item.trim() : item);
 *       }
 *       return response;
 *     },
 *     test: (response) => {
 *       if (!Array.isArray(response)) {
 *         throw new Error("Response is not an array.");
 *       }
 *       if (response.length !== 3) {
 *         throw new Error("Response does not contain exactly three items.");
 *       }
 *       console.log("Test passed: The response is a valid list of three countries.");
 *     },
 *   },
 * );
 * console.log(europeanCountries);
 * ```
 * @example
 * ```ts
 * // Track cumulative metrics across multiple AI requests.
 * const metrics = {
 *   totalCost: 0,
 *   totalInputTokens: 0,
 *   totalOutputTokens: 0,
 *   totalRequests: 0,
 * };
 *
 * await askAI("What is the capital of France?", { metrics });
 * await askAI("What is the population of Paris?", { metrics });
 *
 * console.log("Total cost:", metrics.totalCost);
 * console.log("Total input tokens:", metrics.totalInputTokens);
 * console.log("Total output tokens:", metrics.totalOutputTokens);
 * console.log("Total requests:", metrics.totalRequests);
 * ```
 * @param prompt - The primary text input for the AI model.
 * @param options - A comprehensive set of options.
 *   @param options.model - The specific AI model to use (e.g., 'gemini-1.5-flash'). Defaults to the `AI_MODEL` environment variable.
 *   @param options.apiKey - Your API key for the AI service. Defaults to the `AI_KEY` environment variable.
 *   @param options.vertex - Set to `true` to use Vertex AI for authentication. Auto-enables if `AI_PROJECT` and `AI_LOCATION` are set.
 *   @param options.project - Your Google Cloud project ID. Defaults to the `AI_PROJECT` environment variable.
 *   @param options.location - The Google Cloud location for your project. Defaults to the `AI_LOCATION` environment variable.
 *   @param options.ollama - Set to `true` to use a local Ollama model. Defaults to the `OLLAMA` environment variable. If you want your Ollama instance to be used, you can pass it here too.
 *   @param options.HTMLFrom - A URL or an array of URLs to scrape HTML content from. The content is appended to the prompt.
 *   @param options.screenshotFrom - A URL or an array of URLs to take a screenshot from for analysis.
 *   @param options.image - A path or GCS URL (or an array of them) to an image file.
 *   @param options.video - A path or GCS URL (or an array of them) to a video file.
 *   @param options.audio - A path or GCS URL (or an array of them) to an audio file.
 *   @param options.pdf - A path or GCS URL (or an array of them) to a PDF file.
 *   @param options.text - A path or GCS URL (or an array of them) to a text file.
 *   @param options.returnJson - If `true`, instructs the AI to return a JSON object. Defaults to `false`.
 *   @param options.parseJson - If `true`, automatically parses the AI's response as JSON. Defaults to `true` if `returnJson` is `true`, otherwise `false`.
 *   @param options.cache - If `true`, caches the response locally in a `.journalism-cache` directory. Defaults to `false`.
 *   @param options.verbose - If `true`, enables detailed logging, including token usage and estimated costs. Defaults to `false`.
 *   @param options.clean - A function to process and clean the AI's response before it is returned or tested. This function is called after JSON parsing (if `parseJson` is `true`). The response parameter will be the parsed JSON object if `parseJson` is true, or a string otherwise.
 *   @param options.test - A function or an array of functions to validate the AI's response before it's returned.
 *   @param options.contextWindow - An option to specify the context window size for Ollama models. By default, Ollama sets this depending on the model, which can be lower than the actual maximum context window size of the model.
 *   @param options.thinkingBudget - Sets the reasoning token budget: 0 to disable (default, though some models may reason regardless), -1 for a dynamic budget, or > 0 for a fixed budget. For Ollama models, any non-zero value simply enables reasoning, ignoring the specific budget amount.
 *   @param options.includeThoughts - If `true`, includes the AI's reasoning thoughts in the output when using a thinking budget. Defaults to `false`.
 *   @param options.metrics - An object to track cumulative metrics across multiple AI requests. Pass an object with `totalCost`, `totalInputTokens`, `totalOutputTokens`, and `totalRequests` properties (all initialized to 0). The function will update these values after each request. Note: `totalCost` is only calculated for Google GenAI models, not for Ollama.
 * @return {Promise<unknown>} A Promise that resolves to the AI's response.
 *
 * @category AI
 */
export default async function askAI(
  prompt: string,
  options: {
    model?: string;
    apiKey?: string;
    vertex?: boolean;
    project?: string;
    location?: string;
    ollama?: boolean | Ollama;
    HTMLFrom?: string | string[];
    screenshotFrom?: string | string[];
    image?: string | string[];
    video?: string | string[];
    audio?: string | string[];
    pdf?: string | string[];
    text?: string | string[];
    returnJson?: boolean;
    parseJson?: boolean;
    verbose?: boolean;
    cache?: boolean;
    test?: ((response: unknown) => void) | ((response: unknown) => void)[];
    clean?: (response: unknown) => unknown;
    contextWindow?: number;
    thinkingBudget?: number;
    includeThoughts?: boolean;
    metrics?: {
      totalCost: number;
      totalInputTokens: number;
      totalOutputTokens: number;
      totalRequests: number;
    };
  } = {},
): Promise<unknown> {
  const start = Date.now();
  let client;
  const ollamaVar = options.ollama === true ||
    options.ollama instanceof Ollama || process.env.OLLAMA;
  const defaults = { parseJson: options.returnJson ?? false };
  options = { ...defaults, ...options };

  if (ollamaVar) {
    client = options.ollama instanceof Ollama ? options.ollama : ollama;
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

    const browser = await chromium.launch();
    const page = await browser.newPage();

    for (const url of urls) {
      try {
        const start = options.verbose ? new Date() : null;
        await page.goto(url, {
          waitUntil: "networkidle",
          timeout: 5000,
        });
        const html = await page.locator("body").innerHTML();
        promptToBeSent += `\n\nHTML content from ${url}:\n${html}`;
        if (start) {
          console.log(
            `\nRetrieved body HTML from ${url} in ${
              prettyDuration(
                start,
              )
            }`,
          );
        }
      } catch (error: unknown) {
        console.log(
          `Problem retrieving body HTML from ${url}:`,
          JSON.stringify(error),
        );
        const html = await page.locator("body").innerHTML();
        promptToBeSent += `\n\nHTML content from ${url}:\n${html}`;
      }
    }

    await browser.close();
  }
  if (options.screenshotFrom) {
    const urls = Array.isArray(options.screenshotFrom)
      ? options.screenshotFrom
      : [options.screenshotFrom];

    const browser = await chromium.launch();
    const page = await browser.newPage();

    const base64Images: string[] = [];

    for (const url of urls) {
      try {
        const start = options.verbose ? new Date() : null;
        await page.goto(url, {
          waitUntil: "networkidle",
          timeout: 5000,
        });
        const buffer = await page.screenshot({ fullPage: true, type: "jpeg" });
        base64Images.push(buffer.toString("base64"));
        if (start) {
          console.log(
            `\nRetrieved screenshot from ${url} in ${
              prettyDuration(
                start,
              )
            }`,
          );
        }
      } catch (error: unknown) {
        console.log(
          `Problem retrieving screenshot from ${url}:`,
          JSON.stringify(error),
        );
        const buffer = await page.screenshot({ fullPage: true, type: "jpeg" });
        base64Images.push(buffer.toString("base64"));
      }
    }

    await browser.close();

    if (ollamaVar) {
      message.images = base64Images;
    } else {
      for (const img of base64Images) {
        contents.push({
          inlineData: { data: img, mimeType: "image/jpeg" },
        });
      }
    }
  }
  if (options.text) {
    const textFiles = Array.isArray(options.text)
      ? options.text
      : [options.text];
    for (const textFile of textFiles) {
      if (textFile.startsWith("gs://")) {
        if (!ollamaVar) {
          contents.push({
            fileData: {
              fileUri: textFile,
              mimeType: "text/plain",
            },
          });
        } else {
          throw new Error(
            "Ollama does not support Google Cloud Storage files. Please use local file paths.",
          );
        }
      } else {
        const textContent = readFileSync(textFile, { encoding: "utf-8" });
        promptToBeSent += `\n\nContent from ${textFile}:\n${textContent}`;
      }
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
        if (audioFile.startsWith("gs://")) {
          contents.push({
            fileData: {
              fileUri: audioFile,
              mimeType: "audio/mp3",
            },
          });
        } else {
          const base64Audio = readFileSync(audioFile, {
            encoding: "base64",
          });
          contents.push({
            inlineData: { data: base64Audio, mimeType: "audio/mp3" },
          });
        }
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
        if (videoFile.startsWith("gs://")) {
          contents.push({
            fileData: {
              fileUri: videoFile,
              mimeType: "video/mp4",
            },
          });
        } else {
          const base64Video = readFileSync(videoFile, {
            encoding: "base64",
          });
          contents.push({
            inlineData: { data: base64Video, mimeType: "video/mp4" },
          });
        }
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
        if (pdfFile.startsWith("gs://")) {
          contents.push({
            fileData: {
              fileUri: pdfFile,
              mimeType: "application/pdf",
            },
          });
        } else {
          const base64Pdf = readFileSync(pdfFile, { encoding: "base64" });
          contents.push({
            inlineData: { data: base64Pdf, mimeType: "application/pdf" },
          });
        }
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
        if (imageFile.startsWith("gs://")) {
          contents.push({
            fileData: {
              fileUri: imageFile,
              mimeType: "image/jpeg",
            },
          });
        } else {
          const base64Image = readFileSync(imageFile, {
            encoding: "base64",
          });
          contents.push({
            inlineData: { data: base64Image, mimeType: "image/jpeg" },
          });
        }
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
      thinkingConfig: typeof options.thinkingBudget === "number"
        ? {
          thinkingBudget: options.thinkingBudget ?? 0,
          // we could do a check here if thinkingBudget === 0 -> force false, but
          // let's trust the user options .. what could go wrong?
          includeThoughts: options.includeThoughts ?? false,
        }
        : {
          thinkingBudget: 0,
          includeThoughts: false,
        },
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
      // Passing clean too because cleaned data is cached
      .update(JSON.stringify({ ...params, clean: options.clean }))
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
    ? await client.models.generateContentStream(params)
    : await client.chat({
      model,
      messages: [message],
      format: options.returnJson ? "json" : undefined,
      options: {
        temperature: 0,
        num_ctx: options.contextWindow,
      },
      think: (options.thinkingBudget ?? 0) > 0,
      stream: true,
    });

  let thoughts = "";
  let returnedResponse = "";
  let finalUsageMetadata: {
    promptTokenCount?: number;
    candidatesTokenCount?: number;
  } | null = null;
  let finalOllamaResponse:
    | { prompt_eval_count: number; eval_count: number }
    | null = null;

  try {
    for await (const chunk of response) {
      if (chunk instanceof GenerateContentResponse) {
        const candidate: Candidate | undefined = chunk.candidates?.at(0);
        const parts = candidate?.content?.parts ?? [];

        // Capture usage metadata from the final chunk
        if (chunk.usageMetadata) {
          finalUsageMetadata = chunk.usageMetadata;
        }

        for (const p of parts) {
          if (!p.text) {
            continue;
          } else if (p.thought) {
            if (options.verbose) {
              if (!thoughts) {
                process.stdout.write("\nThoughts:\n");
              }
              process.stdout.write(p.text);
              thoughts += p.text;
            }
          } else {
            if (options.verbose) {
              if (!returnedResponse) {
                process.stdout.write("\nResponse:\n");
              }
              process.stdout.write(p.text);
            }
            returnedResponse += p.text;
          }
        }
      } else {
        // This is an Ollama response chunk
        finalOllamaResponse = chunk; // Keep updating with the latest chunk to get final metadata

        if (chunk.message.thinking) {
          if (options.verbose) {
            if (!thoughts) {
              process.stdout.write("\nThoughts:\n");
            }
            process.stdout.write(chunk.message.thinking);
            thoughts += chunk.message.thinking;
          }
        } else if (
          chunk.message.content
        ) {
          if (options.verbose) {
            if (!returnedResponse) {
              process.stdout.write("\nResponse:\n");
            }
            process.stdout.write(chunk.message.content);
          }
          returnedResponse += chunk.message.content;
        }
      }
    }
  } finally {
    // Ensure the response stream is properly closed for Ollama streaming responses
    if ("abort" in response && typeof response.abort === "function") {
      response.abort();
    }
  }

  if (options.parseJson) {
    try {
      if (typeof returnedResponse === "string") {
        returnedResponse = JSON.parse(jsonrepair(returnedResponse));
      }
    } catch (error) {
      const displayResponse = returnedResponse === ""
        ? "[empty string]"
        : returnedResponse;
      throw new Error(
        `Failed to parse response as JSON: ${error}.\nResponse: ${displayResponse}`,
      );
    }
  }

  let cleanedResponse: unknown = returnedResponse;

  if (options.clean) {
    cleanedResponse = options.clean(returnedResponse);
  } else {
    cleanedResponse = returnedResponse;
  }

  if (options.test) {
    if (Array.isArray(options.test)) {
      options.test.forEach((test) => test(cleanedResponse));
    } else {
      options.test(cleanedResponse);
    }
  }

  if (options.cache && options.parseJson && cacheFileJSON) {
    writeFileSync(cacheFileJSON, JSON.stringify(cleanedResponse));
    options.verbose && console.log("\nResponse cached as JSON.");
  } else if (options.cache && cacheFileText) {
    writeFileSync(cacheFileText, JSON.stringify(cleanedResponse));
    options.verbose && console.log("\nResponse cached as text.");
  }

  if (options.verbose && options.clean) {
    console.log("\nCleaned response:");
    console.log(cleanedResponse, "\n");
  } else if (options.verbose && options.parseJson) {
    console.log("\nParsed JSON response:");
    console.log(cleanedResponse, "\n");
  }

  // Calculate metrics and token usage
  if ((options.verbose || options.metrics) && finalUsageMetadata) {
    // Google GenAI streaming response
    const hasAudio = options.audio ? true : false;

    const pricing = [
      {
        model: "gemini-2.5-pro",
        tiers: [
          { threshold: 200_000, input: 1.25, output: 10.00 },
          { threshold: Infinity, input: 2.50, output: 15.00 },
        ],
      },
      {
        model: "gemini-2.5-flash",
        input: hasAudio ? 1.00 : 0.30,
        output: 2.50,
      },
      {
        model: "gemini-2.5-flash-lite",
        input: hasAudio ? 0.30 : 0.10,
        output: 0.40,
      },
      {
        model: "gemini-2.0-flash",
        input: hasAudio ? 0.70 : 0.10,
        output: 0.40,
      },
      {
        model: "gemini-2.0-flash-lite",
        input: 0.075,
        output: 0.30,
      },
      {
        model: "gemini-1.5-pro",
        tiers: [
          { threshold: 128_000, input: 1.25, output: 5.00 },
          { threshold: Infinity, input: 2.50, output: 10.00 },
        ],
      },
      {
        model: "gemini-1.5-flash",
        tiers: [
          { threshold: 128_000, input: 0.075, output: 0.30 },
          { threshold: Infinity, input: 0.15, output: 0.60 },
        ],
      },
    ];

    const modelPricing = pricing.find((p) => p.model === model);
    if (!modelPricing) {
      if (options.verbose) {
        console.log(
          `\nModel ${model} not found in pricing list.`,
        );
      }
    } else {
      const promptTokenCount = finalUsageMetadata.promptTokenCount ?? 0;
      const outputTokenCount = finalUsageMetadata.candidatesTokenCount ?? 0;

      let inputRate: number;
      let outputRate: number;

      if ("tiers" in modelPricing && modelPricing.tiers) {
        // Find the appropriate tier based on prompt token count
        const tier = modelPricing.tiers.find((t) =>
          promptTokenCount <= t.threshold
        ) || modelPricing.tiers[modelPricing.tiers.length - 1];
        inputRate = tier.input;
        outputRate = tier.output;

        if (options.verbose) {
          const tierDescription = tier.threshold === Infinity
            ? `> ${formatNumber(modelPricing.tiers[0].threshold)} tokens`
            : `≤ ${formatNumber(tier.threshold)} tokens`;

          console.log(
            `\nPricing tier: ${tierDescription}${
              hasAudio ? " (audio pricing applied)" : ""
            }`,
          );
        }
      } else if ("input" in modelPricing && "output" in modelPricing) {
        inputRate = modelPricing.input;
        outputRate = modelPricing.output;
      } else {
        if (options.verbose) {
          console.log(
            `${
              options.cache ? "" : "\n"
            }Invalid pricing structure for model ${model}.`,
          );
        }
        return cleanedResponse;
      }

      const promptTokenCost = (promptTokenCount / 1_000_000) * inputRate;
      const outputTokenCost = (outputTokenCount / 1_000_000) * outputRate;
      const estimatedCost = promptTokenCost + outputTokenCost;

      const totalTokens = promptTokenCount + outputTokenCount;
      const durationSeconds = (Date.now() - start) / 1000;
      const tokensPerSecond = totalTokens / durationSeconds;

      if (options.metrics) {
        options.metrics.totalCost += estimatedCost;
        options.metrics.totalInputTokens += promptTokenCount;
        options.metrics.totalOutputTokens += outputTokenCount;
        options.metrics.totalRequests += 1;
      }

      if (options.verbose) {
        console.log(
          `\n\nTokens in:`,
          formatNumber(promptTokenCount),
          "/",
          "Tokens out:",
          formatNumber(outputTokenCount),
          "/",
          "Tokens per second:",
          formatNumber(tokensPerSecond, { significantDigits: 1 }),
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
  } else if ((options.verbose || options.metrics) && finalOllamaResponse) {
    // Ollama streaming response
    const promptTokenCount = finalOllamaResponse.prompt_eval_count;
    const outputTokenCount = finalOllamaResponse.eval_count;

    if (options.metrics) {
      options.metrics.totalInputTokens += promptTokenCount;
      options.metrics.totalOutputTokens += outputTokenCount;
      options.metrics.totalRequests += 1;
    }

    if (options.verbose) {
      const totalTokens = promptTokenCount + outputTokenCount;
      const durationSeconds = (Date.now() - start) / 1000;
      const tokensPerSecond = totalTokens / durationSeconds;

      console.log(
        `\n\nTokens in:`,
        formatNumber(promptTokenCount),
        "/",
        "Tokens out:",
        formatNumber(outputTokenCount),
        "/",
        "Tokens per second:",
        formatNumber(tokensPerSecond, { significantDigits: 1 }),
      );
    }
  }

  if (options.verbose) {
    console.log("Execution time:", prettyDuration(start), "\n");
  }

  return cleanedResponse;
}
