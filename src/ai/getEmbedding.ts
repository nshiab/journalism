import process from "node:process";
import { GoogleGenAI } from "@google/genai";
import prettyDuration from "../format/prettyDuration.ts";

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
