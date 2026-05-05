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
export default function getEmbedding(text: string, options?: {
    model?: string;
    apiKey?: string;
    vertex?: boolean;
    project?: string;
    location?: string;
    cache?: boolean;
    ollama?: boolean | any;
    verbose?: boolean;
    contextWindow?: number;
}): Promise<number[]>;
//# sourceMappingURL=getEmbedding.d.ts.map