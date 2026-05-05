/** A single request object for {@link askAIPool}, wrapping a prompt and its options. */
export type askAIRequest = {
    id?: string;
    prompt: string;
    options?: {
        systemPrompt?: string;
        model?: string;
        temperature?: number;
        apiKey?: string;
        vertex?: boolean;
        project?: string;
        location?: string;
        ollama?: boolean | any;
        webSearch?: boolean;
        HTMLFrom?: string | string[];
        /** @deprecated Use the `image` option instead. */
        screenshotFrom?: string | string[];
        image?: string | string[];
        video?: string | string[];
        audio?: string | string[];
        pdf?: string | string[];
        text?: string | string[];
        returnJson?: boolean;
        parseJson?: boolean;
        schemaJson?: unknown;
        verbose?: boolean;
        cache?: boolean;
        test?: ((response: unknown) => void) | ((response: unknown) => void)[];
        clean?: (response: unknown) => unknown;
        contextWindow?: number;
        thinkingLevel?: "minimal" | "low" | "medium" | "high";
        thinkingBudget?: number;
        includeThoughts?: boolean;
        geminiParameters?: any;
        ollamaParameters?: any;
    };
};
/**
 * Processes multiple AI requests concurrently using a pool of workers. This function wraps {@link askAI} and manages parallel execution, retries, progress logging, and error handling for batch operations.
 *
 * Each request in the array is processed by a worker from the pool. The pool size controls how many requests run simultaneously. Results and errors are returned separately, sorted by their original index, making it easy to match outputs back to inputs.
 *
 * @example
 * ```ts
 * // Basic usage: Process a batch of prompts with a pool of 5 concurrent workers.
 * const { results, errors } = await askAIPool(
 *   [
 *     { prompt: "What is the capital of France?" },
 *     { prompt: "What is the capital of Germany?" },
 *     { prompt: "What is the capital of Italy?" },
 *   ],
 *   5,
 * );
 * for (const r of results) {
 *   console.log(r.result);
 * }
 * ```
 *
 * @example
 * ```ts
 * // Use an id to easily identify each request in the results.
 * const { results, errors } = await askAIPool(
 *   [
 *     { id: "france", prompt: "What is the capital of France?" },
 *     { id: "germany", prompt: "What is the capital of Germany?" },
 *   ],
 *   2,
 * );
 * for (const r of results) {
 *   console.log(r.request.id, r.result);
 * }
 * ```
 *
 * @example
 * ```ts
 * // Enable progress logging and retries.
 * const { results, errors } = await askAIPool(
 *   [
 *     { prompt: "Summarize this article.", options: { text: "./article1.txt", returnJson: true } },
 *     { prompt: "Summarize this article.", options: { text: "./article2.txt", returnJson: true } },
 *   ],
 *   3,
 *   {
 *     logProgress: true,
 *     retry: 2,
 *   },
 * );
 * console.log(`${results.length} succeeded, ${errors.length} failed`);
 * ```
 *
 * @example
 * ```ts
 * // Track cumulative metrics and enforce a minimum request duration to respect rate limits.
 * const metrics = {
 *   totalCost: 0,
 *   totalInputTokens: 0,
 *   totalOutputTokens: 0,
 *   totalRequests: 0,
 * };
 * const { results } = await askAIPool(
 *   [
 *     { prompt: "What is 2+2?" },
 *     { prompt: "What is 3+3?" },
 *   ],
 *   2,
 *   {
 *     minRequestDurationMs: 1000,
 *     metrics,
 *   },
 * );
 * console.log("Total cost:", metrics.totalCost);
 * console.log("Total requests:", metrics.totalRequests);
 * ```
 *
 * @example
 * ```ts
 * // Use retryCheck to only retry on specific errors.
 * const { results, errors } = await askAIPool(
 *   [
 *     { prompt: "Analyze this image.", options: { image: "./photo.jpg", returnJson: true } },
 *   ],
 *   1,
 *   {
 *     retry: 3,
 *     retryCheck: (error) => {
 *       // Only retry on rate limit errors
 *       return error instanceof Error && error.message.includes("429");
 *     },
 *   },
 * );
 * ```
 *
 * @example
 * ```ts
 * // Use schemaJson to enforce structured output with a specific schema.
 * import * as z from "zod";
 *
 * const schema = z.toJSONSchema(
 *   z.object({
 *     people: z.array(z.object({
 *       name: z.string(),
 *       age: z.number(),
 *       gender: z.enum(["man", "woman"]),
 *     })),
 *   }),
 * );
 *
 * const { results, errors } = await askAIPool(
 *   [
 *     { prompt: "Give me 5 characters from Harry Potter.", options: { schemaJson: schema } },
 *     { prompt: "Give me 5 characters from Lord of the Rings.", options: { schemaJson: schema } },
 *   ],
 *   2,
 * );
 * // Each result will conform to the specified schema
 * for (const r of results) {
 *   console.log(r.result); // { people: [{ name: "...", age: ..., gender: "..." }, ...] }
 * }
 * ```
 *
 * @param requests - An array of request objects to process.
 *   @param requests[].id - An optional identifier for the request, useful for matching results back to inputs.
 *   @param requests[].prompt - The primary text input for the AI model.
 *   @param requests[].options - Options passed to {@link askAI} for each individual request. See {@link askAI} for the full list of available options.
 * @param poolSize - The number of concurrent workers processing requests.
 * @param poolOptions - Configuration for the pool execution.
 *   @param poolOptions.logProgress - If `true`, logs progress to the console after each completed or failed request. Defaults to `false`.
 *   @param poolOptions.retry - The maximum number of retry attempts for a failed request. Defaults to `0` (no retries).
 *   @param poolOptions.retryCheck - A function that receives the error and returns whether the request should be retried. If not provided, all failed requests are retried up to the `retry` limit.
 *   @param poolOptions.minRequestDurationMs - A minimum duration in milliseconds for each request. If a request completes faster, the worker will wait before picking up the next one. Useful for rate limiting.
 *   @param poolOptions.metrics - An object to track cumulative metrics across all requests in the pool. Pass an object with `totalCost`, `totalInputTokens`, `totalOutputTokens`, and `totalRequests` properties (all initialized to 0).
 * @returns A Promise that resolves to an object with `results` (successful responses with their index and request) and `errors` (failed requests with their index, request, and error), both sorted by original index.
 *
 * @category AI
 */
export default function askAIPool(requests: askAIRequest[], poolSize: number, poolOptions?: {
    logProgress?: boolean;
    retry?: number;
    retryCheck?: (error: unknown) => Promise<boolean> | boolean;
    minRequestDurationMs?: number;
    metrics?: {
        totalCost: number;
        totalInputTokens: number;
        totalOutputTokens: number;
        totalRequests: number;
    };
}): Promise<{
    results: {
        index: number;
        request: askAIRequest;
        result: unknown;
    }[];
    errors: Array<{
        index: number;
        request: askAIRequest;
        error: unknown;
    }>;
}>;
//# sourceMappingURL=askAIPool.d.ts.map