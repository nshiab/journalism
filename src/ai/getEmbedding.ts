import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import process from "node:process";
import { GoogleGenAI } from "@google/genai";
import ollama from "ollama";
import crypto from "node:crypto";
import prettyDuration from "../format/prettyDuration.ts";

/**
 * Generates an embedding for the given text. Currently supports Google Gemini AI and local models running with Ollama.
 *
 * The function retrieves credentials and the model from environment variables (`AI_KEY`, `AI_PROJECT`, `AI_LOCATION`, `AI_EMBEDDINGS_MODEL`) or accepts them as options. Options take precedence over environment variables.
 *
 * To run local models with Ollama, set the `OLLAMA` environment variable to `true` and start Ollama on your machine. Make sure to install the model you want and to set the `AI_EMBEDDINGS_MODEL` environment variable to the model name.
 *
 * To save resources and time, you can cache the response. When `cache` is set to `true`, the function saves the response in a local hidden folder called `.journalism-cache`. If the same request is made again in the future, it will return the cached response instead of making a new request. Don't forget to add `.journalism-cache` to your `.gitignore` file!
 *
 * @example
 * Basic usage
 * ```ts
 * await getEmbedding("Hello world!")
 * ```
 *
 * @example
 * Using caching
 * ```ts
 * await getEmbedding("Hello world!", { cache: true })
 * ```
 *
 * @param text - The input text to generate the embedding for.
 * @param options - Configuration options for the embedding generation.
 *   @param options.model - The model to use for embedding generation. Defaults to the `AI_EMBEDDINGS_MODEL` environment variable.
 *   @param options.apiKey - The API key for authentication. Can also be set via the `AI_KEY` environment variable.
 *   @param options.vertex - Whether to use Vertex AI. Defaults to `false`.
 *   @param options.project - The Google Cloud project ID. Can also be set via the `AI_PROJECT` environment variable.
 *   @param options.location - The location of the Google Cloud project. Can also be set via the `AI_LOCATION` environment variable.
 *   @param options.verbose - If `true`, logs additional information such as execution time and truncated input text.
 */
export default async function getEmbedding(text: string, options: {
  model?: string;
  apiKey?: string;
  vertex?: boolean;
  project?: string;
  location?: string;
  cache?: boolean;
  ollama?: string;
  verbose?: boolean;
} = {}): Promise<number[]> {
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
    : await client.embed({ model, input: text });

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
  console.log(returnedResponse);
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
