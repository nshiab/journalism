import askAI from "./askAI.js";
import sleep from "./helpers/sleep.js";
import { formatNumber } from "../../../../journalism-format/1.1.7/src/index.js";
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
export default async function askAIPool(requests, poolSize, poolOptions = {}) {
    const maxRetries = poolOptions.retry ?? 0;
    const results = [];
    const errors = [];
    const queue = requests.map((req, index) => ({ req, index, attempt: 0 }));
    let completed = 0;
    let activeWorkers = 0;
    // Worker function that continuously processes items from the queue
    const worker = async () => {
        while (queue.length > 0) {
            const item = queue.shift();
            if (!item)
                break;
            const { req, index, attempt } = item;
            activeWorkers++;
            const requestStart = Date.now();
            try {
                const result = await askAI(req.prompt, {
                    ...req.options,
                    metrics: poolOptions.metrics,
                });
                results.push({ index, request: req, result });
                completed++;
                activeWorkers--;
                if (poolOptions.logProgress) {
                    const durationMs = Date.now() - requestStart;
                    const durationSec = (durationMs / 1000).toFixed(2);
                    const outstanding = requests.length - completed;
                    const metricsInfo = poolOptions.metrics
                        ? ` | Cost so far: $${formatNumber(poolOptions.metrics.totalCost, {
                            significantDigits: 6,
                        })}`
                        : "";
                    console.log(`[askAIPool] Request ${index} processed | Duration: ${durationSec}s | Outstanding: ${outstanding} | Active: ${activeWorkers}${metricsInfo}`);
                }
            }
            catch (error) {
                activeWorkers--;
                // Retry logic
                if (poolOptions.retryCheck
                    ? (await poolOptions.retryCheck(error)) && attempt < maxRetries
                    : attempt < maxRetries) {
                    // Re-queue the request with incremented attempt count
                    queue.push({ req, index, attempt: attempt + 1 });
                    if (poolOptions.logProgress) {
                        const durationMs = Date.now() - requestStart;
                        const durationSec = (durationMs / 1000).toFixed(2);
                        const metricsInfo = poolOptions.metrics
                            ? ` | Cost so far: $${formatNumber(poolOptions.metrics.totalCost, {
                                significantDigits: 6,
                            })}`
                            : "";
                        console.log(`[askAIPool] Request ${index} failed (attempt ${attempt + 1}/${maxRetries + 1}) | Duration: ${durationSec}s | Retrying...${metricsInfo}`);
                    }
                }
                else {
                    // Max retries exceeded, store the error
                    errors.push({ index, request: req, error });
                    completed++;
                    if (poolOptions.logProgress) {
                        const durationMs = Date.now() - requestStart;
                        const durationSec = (durationMs / 1000).toFixed(2);
                        const outstanding = requests.length - completed;
                        const metricsInfo = poolOptions.metrics
                            ? ` | Cost so far: $${formatNumber(poolOptions.metrics.totalCost, {
                                significantDigits: 6,
                            })}`
                            : "";
                        console.log(`[askAIPool] Request ${index} failed after ${maxRetries + 1} attempts | Duration: ${durationSec}s | Outstanding: ${outstanding} | Active: ${activeWorkers}${metricsInfo}`);
                    }
                }
            }
            // Enforce minimum request duration if specified
            if (poolOptions.minRequestDurationMs) {
                await sleep(poolOptions.minRequestDurationMs, requestStart);
            }
        }
    };
    // Start a pool of workers
    const numWorkers = Math.min(poolSize, requests.length);
    const workers = Array.from({ length: numWorkers }, () => worker());
    // Wait for all workers to complete
    await Promise.all(workers);
    return {
        results: results.sort((a, b) => a.index - b.index),
        errors: errors.sort((a, b) => a.index - b.index),
    };
}
