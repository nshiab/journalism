"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getEmbedding;
const node_fs_1 = require("node:fs");
const node_process_1 = __importDefault(require("node:process"));
const genai_1 = require("@google/genai");
const ollama_1 = __importStar(require("ollama"));
const node_crypto_1 = __importDefault(require("node:crypto"));
const index_js_1 = require("../../../../journalism-format/1.1.7/src/index.js");
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
async function getEmbedding(text, options = {}) {
    const start = Date.now();
    let client;
    const ollamaVar = options.ollama === true ||
        options.ollama instanceof ollama_1.Ollama || node_process_1.default.env.OLLAMA;
    if (ollamaVar) {
        client = options.ollama instanceof ollama_1.Ollama ? options.ollama : ollama_1.default;
    }
    else if (options.vertex || options.apiKey || options.project || options.location) {
        client = new genai_1.GoogleGenAI({
            apiKey: options.apiKey,
            vertexai: options.vertex,
            project: options.project,
            location: options.location,
        });
    }
    else if (node_process_1.default.env.AI_PROJECT && node_process_1.default.env.AI_LOCATION) {
        client = new genai_1.GoogleGenAI({
            vertexai: true,
            project: node_process_1.default.env.AI_PROJECT,
            location: node_process_1.default.env.AI_LOCATION,
        });
    }
    else if (node_process_1.default.env.AI_KEY) {
        client = new genai_1.GoogleGenAI({
            apiKey: node_process_1.default.env.AI_KEY,
        });
    }
    if (!client) {
        throw new Error("No API key or project/location or Ollama found. Please set AI_KEY, AI_PROJECT, AI_LOCATION or OLLAMA in your environment variables or pass them as options.");
    }
    const model = options.model ?? node_process_1.default.env.AI_EMBEDDINGS_MODEL;
    if (!model) {
        throw new Error("Model not specified. Use the AI_EMBEDDINGS_MODEL environment variable or pass it as an option.");
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
        if (!(0, node_fs_1.existsSync)(cachePath)) {
            (0, node_fs_1.mkdirSync)(cachePath);
        }
        const hash = node_crypto_1.default
            .createHash("sha256")
            .update(JSON.stringify(params))
            .digest("hex");
        cacheFileJSON = `${cachePath}/getEmbedding-${hash}.json`;
        if ((0, node_fs_1.existsSync)(cacheFileJSON)) {
            const cachedResponse = JSON.parse((0, node_fs_1.readFileSync)(cacheFileJSON, "utf-8"));
            if (options.verbose) {
                console.log("\nReturning cached JSON response.");
            }
            return cachedResponse;
        }
        else {
            if (options.verbose) {
                console.log("\nCache missed. Generating new response...");
            }
        }
    }
    const response = client instanceof genai_1.GoogleGenAI
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
        throw new Error("Invalid response from the API. Please check your model and input.");
    }
    if (Array.isArray(rawResponse[0]["values"])) {
        returnedResponse = rawResponse[0]["values"];
    }
    else {
        returnedResponse = rawResponse[0];
    }
    if (!Array.isArray(returnedResponse) || typeof returnedResponse[0] !== "number") {
        throw new Error("Invalid response from the API. Please check your model and input.");
    }
    if (options.cache && cacheFileJSON) {
        if (returnedResponse && Array.isArray(returnedResponse)) {
            (0, node_fs_1.writeFileSync)(cacheFileJSON, JSON.stringify(returnedResponse));
            if (options.verbose) {
                console.log("Response cached as JSON.");
            }
        }
    }
    if (options.verbose) {
        console.log("Execution time:", (0, index_js_1.prettyDuration)(start));
    }
    return returnedResponse;
}
