import process from "node:process";
import { GoogleGenAI } from "@google/genai";
import prettyDuration from "../format/prettyDuration.ts";

/**
 * Generates an embedding for the given text using the GoogleGenAI client.
 *
 * The function retrieves credentials and the model from environment variables (`AI_KEY`, `AI_PROJECT`, `AI_LOCATION`, `AI_EMBEDDINGS_MODEL`) or accepts them as options. Options take precedence over environment variables.
 *
 * @example
 * Basic usage
 * ```ts
 * await getEmbedding("Hello world!")
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
  verbose?: boolean;
} = {}) {
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

  const model = options.model ?? process.env.AI_EMBEDDINGS_MODEL;
  if (!model) {
    throw new Error(
      "Model not specified. Use the AI_MODEL environment variable or pass it as an option.",
    );
  }

  const response = await client.models.embedContent({
    model,
    contents: text,
  });

  if (options.verbose) {
    console.log("\nText:", text.length > 50 ? `${text.slice(0, 50)}...` : text);
    console.log("Execution time:", prettyDuration(start));
  }

  if (!response.embeddings || !response.embeddings[0].values) {
    throw new Error(
      "Response embeddings is undefined. Please check the model and input.",
    );
  } else {
    return response.embeddings[0].values;
  }
}
