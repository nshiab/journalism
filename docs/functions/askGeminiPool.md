[**Journalism v3.1.2**](../index.md)

***

[Journalism](../globals.md) / askGeminiPool

# Function: askGeminiPool()

> **askGeminiPool**\<`TResponse`\>(`requests`, `poolSize`, `poolOptions?`): `Promise`\<\{ `errors`: `object`[]; `results`: `object`[]; \}\>

Processes multiple Gemini requests concurrently using a pool of workers. This function wraps [askGemini](askGemini.md) and manages parallel execution, retries, progress logging, and error handling for batch operations.

Each request in the array is processed by a worker from the pool. The pool size controls how many requests run simultaneously. Results and errors are returned separately, sorted by their original index, making it easy to match outputs back to inputs.

**Caching**: each request uses [askGemini](askGemini.md)'s default caching behavior, so
responses are persisted in `.journalism-cache` by default. Set
`options.cache: false` on an individual request to disable caching for it.

## Type Parameters

### TResponse

`TResponse` = `unknown`

## Parameters

### requests

`object`[]

An array of request objects to process.

### poolSize

`number`

The number of concurrent workers processing requests.

### poolOptions?

Configuration for the pool execution.

#### logProgress?

`boolean`

If `true`, logs progress to the console after each completed or failed request. Defaults to `false`.

#### minRequestDurationMs?

`number`

A minimum duration in milliseconds for each request. If a request completes faster, the worker will wait before picking up the next one. Useful for rate limiting.

#### retry?

`number`

The maximum number of retry attempts for a failed request. Defaults to `0` (no retries).

#### retryCheck?

(`error`) => `boolean` \| `Promise`\<`boolean`\>

A function that receives the error and returns whether the request should be retried. If not provided, all failed requests are retried up to the `retry` limit.

## Returns

`Promise`\<\{ `errors`: `object`[]; `results`: `object`[]; \}\>

A Promise that resolves to an object with `results` (successful responses with their index and request) and `errors` (failed requests with their index, request, and error), both sorted by original index.

## Examples

```ts
// Basic usage: Process a batch of prompts with a pool of 5 concurrent workers.
const { results, errors } = await askGeminiPool(
  [
    { prompt: "What is the capital of France?" },
    { prompt: "What is the capital of Germany?" },
    { prompt: "What is the capital of Italy?" },
  ],
  5,
);
for (const r of results) {
  console.log(r.result.response);
}
```

```ts
// Use an id to easily identify each request in the results.
const { results, errors } = await askGeminiPool(
  [
    { id: "france", prompt: "What is the capital of France?" },
    { id: "germany", prompt: "What is the capital of Germany?" },
  ],
  2,
);
for (const r of results) {
  console.log(r.request.id, r.result.response);
}
```

```ts
// Enable progress logging and retries.
const { results, errors } = await askGeminiPool(
  [
    { prompt: "Summarize this article.", options: { files: [{ path: "./article1.txt", type: "text" }], schemaJson: schema } },
    { prompt: "Summarize this article.", options: { files: [{ path: "./article2.txt", type: "text" }], schemaJson: schema } },
  ],
  3,
  {
    logProgress: true,
    retry: 2,
  },
);
console.log(`${results.length} succeeded, ${errors.length} failed`);
```

```ts
// Use retryCheck to only retry on specific errors.
const { results, errors } = await askGeminiPool(
  [
    { prompt: "Analyze this image.", options: { files: [{ path: "./photo.jpg", type: "image" }], schemaJson: schema } },
  ],
  1,
  {
    retry: 3,
    retryCheck: (error) => {
      // Only retry on rate limit errors
      return error instanceof Error && error.message.includes("429");
    },
  },
);
```

```ts
// Use schemaJson to enforce structured output with a specific schema.
import * as z from "zod";

const schema = z.toJSONSchema(
  z.object({
    people: z.array(z.object({
      name: z.string(),
      age: z.number(),
      gender: z.enum(["man", "woman"]),
    })),
  }),
);

const { results, errors } = await askGeminiPool(
  [
    { prompt: "Give me 5 characters from Harry Potter.", options: { schemaJson: schema } },
    { prompt: "Give me 5 characters from Lord of the Rings.", options: { schemaJson: schema } },
  ],
  2,
);
// Each result.response will conform to the specified schema
for (const r of results) {
  console.log(r.result.response); // { people: [{ name: "...", age: ..., gender: "..." }, ...] }
}
```
