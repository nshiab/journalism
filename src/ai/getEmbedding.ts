import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import process from "node:process";
import { GoogleGenAI } from "@google/genai";
import ollama, { Ollama } from "ollama";
import crypto from "node:crypto";
import prettyDuration from "../format/prettyDuration.ts";

/**
 * Generates a numerical embedding (vector representation) for a given text string. Embeddings are crucial for various natural language processing (NLP) tasks, including semantic search, text classification, clustering, and anomaly detection, as they allow text to be processed and compared mathematically.
 *
 * This function supports both Google's Gemini AI models and local models running with Ollama. It provides options for authentication, model selection, and caching to optimize performance and cost.
 *
 * **Authentication**:
 * Credentials and model information can be provided via environment variables (`AI_KEY`, `AI_PROJECT`, `AI_LOCATION`, `AI_EMBEDDINGS_MODEL`) or directly through the `options` object. Options take precedence over environment variables.
 *
 * **Local Models**:
 * To use a local model with Ollama, set the `OLLAMA` environment variable to `true` and ensure Ollama is running on your machine. You will also need to specify the model name using the `AI_EMBEDDINGS_MODEL` environment variable or the `model` option. If you want your Ollama instance to be used, you can pass an instance of the `Ollama` class as the `ollama` option.
 *
 * **Caching**:
 * To save resources and time, you can enable caching by setting `cache` to `true`. Responses will be stored in a local `.journalism-cache` directory. If the same request is made again, the cached response will be returned, avoiding redundant API calls. Remember to add `.journalism-cache` to your `.gitignore` file.
 *
 * @param text The input text string for which to generate the embedding.
 * @param options Configuration options for the embedding generation.
 * @param options.model The specific embedding model to use (e.g., 'text-embedding-004'). Defaults to the `AI_EMBEDDINGS_MODEL` environment variable.
 * @param options.apiKey Your API key for authentication with Google Gemini. Defaults to the `AI_KEY` environment variable.
 * @param options.vertex If `true`, uses Vertex AI for authentication. Defaults to `false`.
 * @param options.project Your Google Cloud project ID for Vertex AI. Defaults to the `AI_PROJECT` environment variable.
 * @param options.location The Google Cloud location for your Vertex AI project. Defaults to the `AI_LOCATION` environment variable.
 * @param options.cache If `true`, enables caching of the embedding response. Defaults to `false`.
 * @param options.ollama If `true`, uses Ollama for local embedding generation. Defaults to the `OLLAMA` environment variable. If you want your Ollama instance to be used, you can pass it here too.
 * @param options.verbose If `true`, logs additional information such as execution time and the truncated input text. Defaults to `false`.
 *   @param options.contextWindow - An option to specify the context window size for Ollama models. By default, Ollama sets this depending on the model, which can be lower than the actual maximum context window size of the model.
 *
 * @returns A promise that resolves to an an array of numbers representing the generated embedding.
 *
 * @example
 * ```ts
 * // Basic usage: Generate an embedding for a simple text.
 * const embedding = await getEmbedding("The quick brown fox jumps over the lazy dog.");
 * console.log(embedding); // [0.012, -0.034, ..., 0.056] (example output)
 * ```
 * @example
 * ```ts
 * // Generate an embedding with caching enabled.
 * const cachedEmbedding = await getEmbedding("Artificial intelligence is transforming industries.", { cache: true });
 * console.log(cachedEmbedding);
 * ```
 * @example
 * ```ts
 * // Generate an embedding using a specific model and API key.
 * const customEmbedding = await getEmbedding("Machine learning is a subset of AI.", {
 *   model: "another-embedding-model",
 *   apiKey: "your_custom_api_key"
 * });
 * console.log(customEmbedding);
 * ```
 * @example
 * ```ts
 * // Generate an embedding with verbose logging.
 * const verboseEmbedding = await getEmbedding("The quick brown fox jumps over the lazy dog.", { verbose: true });
 * console.log(verboseEmbedding);
 * ```
 * @category AI
 */
export default async function getEmbedding(text: string, options: {
  model?: string;
  apiKey?: string;
  vertex?: boolean;
  project?: string;
  location?: string;
  cache?: boolean;
  ollama?: boolean | Ollama;
  verbose?: boolean;
  contextWindow?: number;
} = {}): Promise<number[]> {
  const start = Date.now();
  let client;
  const ollamaVar = options.ollama === true ||
    options.ollama instanceof Ollama || process.env.OLLAMA;

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

  const model = options.model ?? process.env.AI_EMBEDDINGS_MODEL;
  if (!model) {
    throw new Error(
      "Model not specified. Use the AI_EMBEDDINGS_MODEL environment variable or pass it as an option.",
    );
  }

  if (options.verbose) {
    console.log(`\nText for ${model}:`);
    console.log(text.length > 50 ? `${text.slice(0, 50)}...` : text);
  }

  const params = {
    text,
    model,
  };

  let cacheFileJSON;
  if (options.cache) {
    const cachePath = "./.journalism-cache";
    if (!existsSync(cachePath)) {
      mkdirSync(cachePath);
    }
    const hash = crypto
      .createHash("sha256")
      .update(JSON.stringify(params))
      .digest("hex");
    cacheFileJSON = `${cachePath}/getEmbedding-${hash}.json`;
    if (existsSync(cacheFileJSON)) {
      const cachedResponse = JSON.parse(readFileSync(cacheFileJSON, "utf-8"));
      if (options.verbose) {
        console.log("\nReturning cached JSON response.");
      }
      return cachedResponse;
    } else {
      if (options.verbose) {
        console.log("\nCache missed. Generating new response...");
      }
    }
  }

  const response = client instanceof GoogleGenAI
    ? await client.models.embedContent({ model, contents: text })
    : await client.embed({
      model,
      input: text,
      options: {
        num_ctx: options.contextWindow,
      },
    });

  let returnedResponse;
  const rawResponse = response.embeddings;
  if (!rawResponse) {
    throw new Error(
      "Invalid response from the API. Please check your model and input.",
    );
  }
  if (Array.isArray(rawResponse[0]["values"])) {
    returnedResponse = rawResponse[0]["values"];
  } else {
    returnedResponse = rawResponse[0];
  }
  if (
    !Array.isArray(returnedResponse) || typeof returnedResponse[0] !== "number"
  ) {
    throw new Error(
      "Invalid response from the API. Please check your model and input.",
    );
  }

  if (options.cache && cacheFileJSON) {
    if (returnedResponse && Array.isArray(returnedResponse)) {
      writeFileSync(cacheFileJSON, JSON.stringify(returnedResponse));
      if (options.verbose) {
        console.log("Response cached as JSON.");
      }
    }
  }

  if (options.verbose) {
    console.log("Execution time:", prettyDuration(start));
  }

  return returnedResponse;
}
