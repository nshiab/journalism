**Journalism v4.0.3**

***

# The Journalism Library

A collection of TypeScript functions for journalistic projects.

The library is maintained by [Nael Shiab](https://naelshiab.com/), computational
journalist and senior data producer for [CBC News](https://www.cbc.ca/news).

> [!TIP]
> To learn how to use this library and more, check out
> [Code Like a Journalist](https://www.code-like-a-journalist.com/), a free and
> open-source data analysis and data visualization course in TypeScript. You
> might also find
> [simple-data-analysis](https://github.com/nshiab/simple-data-analysis) useful.

## Installation

Uses ES modules.

```sh
npm install @nshiab/journalism
```

```ts
import { createDirectory } from "@nshiab/journalism";

createDirectory("data");
```

For browser projects, use the `/web` entry point:

```ts
import { getHumidex } from "@nshiab/journalism/web";

console.log(getHumidex(30, 70)); // 41
```

To start a data project with folders, configuration and documentation for AI
agents, run:

```sh
npx @nshiab/setup-data-project
```

## Libraries

The umbrella combines these libraries, which can also be installed individually.

- [journalism-ai](https://github.com/nshiab/journalism-ai) — [Documentation](https://nshiab.github.io/journalism-ai/) · [npm](https://www.npmjs.com/package/@nshiab/journalism-ai)
- [journalism-climate](https://github.com/nshiab/journalism-climate) — [Documentation](https://nshiab.github.io/journalism-climate/) · [npm](https://www.npmjs.com/package/@nshiab/journalism-climate)
- [journalism-dataviz](https://github.com/nshiab/journalism-dataviz) — [Documentation](https://nshiab.github.io/journalism-dataviz/) · [npm](https://www.npmjs.com/package/@nshiab/journalism-dataviz)
- [journalism-extras](https://github.com/nshiab/journalism-extras) — [Documentation](https://nshiab.github.io/journalism-extras/) · [npm](https://www.npmjs.com/package/@nshiab/journalism-extras)
- [journalism-finance](https://github.com/nshiab/journalism-finance) — [Documentation](https://nshiab.github.io/journalism-finance/) · [npm](https://www.npmjs.com/package/@nshiab/journalism-finance)
- [journalism-format](https://github.com/nshiab/journalism-format) — [Documentation](https://nshiab.github.io/journalism-format/) · [npm](https://www.npmjs.com/package/@nshiab/journalism-format)
- [journalism-geo](https://github.com/nshiab/journalism-geo) — [Documentation](https://nshiab.github.io/journalism-geo/) · [npm](https://www.npmjs.com/package/@nshiab/journalism-geo)
- [journalism-google](https://github.com/nshiab/journalism-google) — [Documentation](https://nshiab.github.io/journalism-google/) · [npm](https://www.npmjs.com/package/@nshiab/journalism-google)
- [journalism-statistics](https://github.com/nshiab/journalism-statistics) — [Documentation](https://nshiab.github.io/journalism-statistics/) · [npm](https://www.npmjs.com/package/@nshiab/journalism-statistics)
- [journalism-web](https://github.com/nshiab/journalism-web) — [Documentation](https://nshiab.github.io/journalism-web/) · [npm](https://www.npmjs.com/package/@nshiab/journalism-web)
- [journalism-web-scraping](https://github.com/nshiab/journalism-web-scraping) — [Documentation](https://nshiab.github.io/journalism-web-scraping/) · [npm](https://www.npmjs.com/package/@nshiab/journalism-web-scraping)

## Documentation

- [Documentation](https://nshiab.github.io/journalism/)
- [llms.txt — Documentation index for AI agents](https://nshiab.github.io/journalism/llms.txt)
- [llm.md — Complete Markdown reference](https://nshiab.github.io/journalism/llm.md),
  for AI assistants or offline reading
- [npm package](https://www.npmjs.com/package/@nshiab/journalism)

See [CONTRIBUTING.md](https://github.com/nshiab/journalism/blob/main/CONTRIBUTING.md)
for development commands.

Combined API reference for `@nshiab/journalism` and `@nshiab/journalism/web`.

## AI

### askGemini()

> **askGemini**\<`TResponse`\>(`prompt`, `options?`): `Promise`\<\{ `durationMs`: `number`; `estimatedCost`: `number` \| `null`; `files`: `object`[]; `fromCache`: `boolean`; `model`: `string`; `outputTokenCount`: `number`; `prompt`: `string`; `promptTokenCount`: `number`; `response`: `TResponse`; `safetyEnabled`: `boolean`; `systemPrompt`: `string` \| `null`; `thinkingLevel`: `"minimal"` \| `"low"` \| `"medium"` \| `"high"` \| `null`; `thoughts`: `string` \| `null`; `thoughtsTokenCount`: `number`; `tokensPerSecond`: `number` \| `null`; `totalTokens`: `number`; `webSearch`: `boolean`; \}\>

Defined in: [journalism-ai/src/ai/askGemini.ts:178](https://github.com/nshiab/journalism-ai/blob/v3.0.0/src/ai/askGemini.ts#L178)

Interacts with Google's Gemini models to perform a wide range of tasks,
from answering questions to analyzing multimedia content.

**Authentication**: set `AI_KEY` (API key) or `AI_PROJECT` + `AI_LOCATION`
(Vertex AI) environment variables, or pass credentials directly via options.

**Caching**: responses are persisted in `.journalism-cache` by default. Set
`cache: false` to disable caching.

**File handling**: pass files via `files: [{ path, type }]`. Local paths and
`gs://` GCS URLs are both supported for images, audio, video, PDF, and text.

**Web Search Grounding**: set `webSearch: true` to let the model search the
web in real time (extra API cost).

Safety filters are on by default (`true`) but off when using Vertex AI
(`false`); override with `safetyEnabled`.

#### Type Parameters

##### TResponse

`TResponse` = `unknown`

#### Parameters

##### prompt

`string`

The primary text prompt.

##### options?

###### apiKey?

`string`

API key; defaults to `AI_KEY` env var.

###### cache?

`boolean`

Cache the response in `.journalism-cache`. Defaults to `true`.

###### files?

`object`[]

Files to send alongside the prompt, in order. Each entry has a `path` (local path or `gs://` URL) and a `type` (`"image"`, `"video"`, `"audio"`, `"pdf"`, or `"text"`). All files are appended as separate content parts after the prompt.

###### geminiParameters?

`Partial`\<`GenerateContentParameters`\>

Extra params merged into `generateContent`.

###### location?

`string`

GCP location; defaults to `AI_LOCATION` env var.

###### model?

`string`

Model name; defaults to `AI_MODEL` env var.

###### processResponse?

(`response`) => `TResponse` \| `Promise`\<`TResponse`\>

Transform or validate the response before returning it; rejected cached responses are removed.

###### project?

`string`

GCP project ID; defaults to `AI_PROJECT` env var.

###### safetyEnabled?

`boolean`

Override safety filter defaults.

###### schemaJson?

`unknown`

Zod JSON schema for structured output.

###### systemPrompt?

`string`

Optional system prompt.

###### temperature?

`number`

Sampling temperature sent to Gemini.

###### thinkingBudget?

`number`

Reasoning token budget. Use `0` to disable thinking, `-1` for a dynamic budget, or a positive number for a fixed budget. Ignored when `thinkingLevel` is provided.

###### thinkingLevel?

`"minimal"` \| `"low"` \| `"medium"` \| `"high"`

Thinking level: "minimal" | "low" | "medium" | "high".

###### vertex?

`boolean`

Use Vertex AI authentication.

###### webSearch?

`boolean`

Enable web search grounding (extra cost).

#### Returns

`Promise`\<\{ `durationMs`: `number`; `estimatedCost`: `number` \| `null`; `files`: `object`[]; `fromCache`: `boolean`; `model`: `string`; `outputTokenCount`: `number`; `prompt`: `string`; `promptTokenCount`: `number`; `response`: `TResponse`; `safetyEnabled`: `boolean`; `systemPrompt`: `string` \| `null`; `thinkingLevel`: `"minimal"` \| `"low"` \| `"medium"` \| `"high"` \| `null`; `thoughts`: `string` \| `null`; `thoughtsTokenCount`: `number`; `tokensPerSecond`: `number` \| `null`; `totalTokens`: `number`; `webSearch`: `boolean`; \}\>

#### Examples

```ts
const result = await askGemini("What is the capital of France?");
console.log(result.response); // "Paris"
```

```ts
// Pass credentials directly.
const response = await askGemini("What is the capital of France?", {
  apiKey: "your_api_key",
  model: "gemini-3.5-flash",
});

// Vertex AI.
const vertexResponse = await askGemini("What is the capital of France?", {
  vertex: true,
  project: "your_project_id",
  location: "us-central1",
});
```

```ts
// Web search grounding.
const factCheck = await askGemini(
  `Verify: "Renewable energy now accounts for over 30% of global electricity generation."`,
  { webSearch: true },
);
```

```ts
// Structured JSON output with a Zod schema.
import * as z from "zod";
const schema = z.toJSONSchema(z.array(z.object({ name: z.string(), age: z.number() })));
await askGemini("Give me 10 random people.", { schemaJson: schema });
```

```ts
// Analyse a local image.
const info = await askGemini("Describe this image.", {
  files: [{ path: "./photo.jpg", type: "image" }],
});
```

```ts
// Analyse a file stored in Google Cloud Storage.
const result = await askGemini("Summarize this document.", {
  files: [{ path: "gs://my-bucket/report.pdf", type: "pdf" }],
  vertex: true,
  project: "my-gcp-project",
  location: "us-central1",
});
```

```ts
// Access token usage and estimated cost directly from the response.
const result = await askGemini("What is the capital of France?");
console.log(result.response); // "Paris"
console.log(`${result.totalTokens} tokens, $${result.estimatedCost}`);
```

***

### askGeminiPool()

> **askGeminiPool**\<`TResponse`\>(`requests`, `poolSize`, `poolOptions?`): `Promise`\<\{ `errors`: `object`[]; `results`: `object`[]; \}\>

Defined in: [journalism-ai/src/ai/askGeminiPool.ts:163](https://github.com/nshiab/journalism-ai/blob/v3.0.0/src/ai/askGeminiPool.ts#L163)

Processes multiple Gemini requests concurrently using a pool of workers. This function wraps [askGemini](#askgemini) and manages parallel execution, retries, progress logging, and error handling for batch operations.

Each request in the array is processed by a worker from the pool. The pool size controls how many requests run simultaneously. Results and errors are returned separately, sorted by their original index, making it easy to match outputs back to inputs.

**Caching**: each request uses [askGemini](#askgemini)'s default caching behavior, so
responses are persisted in `.journalism-cache` by default. Set
`options.cache: false` on an individual request to disable caching for it.

#### Type Parameters

##### TResponse

`TResponse` = `unknown`

#### Parameters

##### requests

`object`[]

An array of request objects to process.

##### poolSize

`number`

The number of concurrent workers processing requests.

##### poolOptions?

Configuration for the pool execution.

###### logProgress?

`boolean`

If `true`, logs progress to the console after each completed or failed request. Defaults to `false`.

###### minRequestDurationMs?

`number`

A minimum duration in milliseconds for each request. If a request completes faster, the worker will wait before picking up the next one. Useful for rate limiting.

###### retry?

`number`

The maximum number of retry attempts for a failed request. Defaults to `0` (no retries).

###### retryCheck?

(`error`) => `boolean` \| `Promise`\<`boolean`\>

A function that receives the error and returns whether the request should be retried. If not provided, all failed requests are retried up to the `retry` limit.

#### Returns

`Promise`\<\{ `errors`: `object`[]; `results`: `object`[]; \}\>

A Promise that resolves to an object with `results` (successful responses with their index and request) and `errors` (failed requests with their index, request, and error), both sorted by original index.

#### Examples

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

***

### askOllama()

> **askOllama**\<`TResponse`\>(`prompt`, `options?`): `Promise`\<\{ `contextWindow`: `number` \| `null`; `durationMs`: `number`; `files`: `object`[]; `fromCache`: `boolean`; `model`: `string`; `outputTokenCount`: `number`; `prompt`: `string`; `promptTokenCount`: `number`; `response`: `TResponse`; `systemPrompt`: `string` \| `null`; `temperature`: `number`; `thinkingLevel`: `boolean` \| `"low"` \| `"medium"` \| `"high"` \| `null`; `thoughts`: `string` \| `null`; `tokensPerSecond`: `number` \| `null`; `totalTokens`: `number`; \}\>

Defined in: [journalism-ai/src/ai/askOllama.ts:143](https://github.com/nshiab/journalism-ai/blob/v3.0.0/src/ai/askOllama.ts#L143)

Interacts with a local Ollama model to perform a wide range of tasks.

Ollama must be running on the machine. Set the `AI_MODEL` environment
variable or pass `model` directly.

Pass a custom `Ollama` instance via the `ollama` option to target a
non-default host.

**File handling**: pass local files via `files: [{ path, type }]`. Only `"image"`
and `"text"` types are supported for now.

**Caching**: responses are persisted in `.journalism-cache` by default. Set
`cache: false` to disable caching.

Temperature defaults to 0 for deterministic responses.

#### Type Parameters

##### TResponse

`TResponse` = `unknown`

#### Parameters

##### prompt

`string`

The primary text prompt.

##### options?

###### cache?

`boolean`

Cache the response in `.journalism-cache`. Defaults to `true`.

###### contextWindow?

`number`

Override the model's context window size.

###### files?

`object`[]

Files to send alongside the prompt. Only `"image"` and `"text"` types are supported (local paths only; no GCS, audio, video, or PDF). Text files are sent as separate user messages after the prompt; images are sent as attachments to the prompt message.

###### model?

`string`

Model name; defaults to `AI_MODEL` env var.

###### ollama?

`unknown`

Custom `Ollama` instance targeting a specific host.

###### ollamaParameters?

`Partial`\<`ChatRequest`\>

Extra params merged into `client.chat`.

###### processResponse?

(`response`) => `TResponse` \| `Promise`\<`TResponse`\>

Transform or validate the response before returning it; rejected cached responses are removed.

###### schemaJson?

`unknown`

JSON schema for structured output.

###### systemPrompt?

`string`

Optional system prompt.

###### temperature?

`number`

Sampling temperature (default 0).

###### thinkingLevel?

`boolean` \| `"low"` \| `"medium"` \| `"high"`

Enables reasoning. Pass `true` for models that only support on/off, or `"low"`, `"medium"`, or `"high"` for granular control.

#### Returns

`Promise`\<\{ `contextWindow`: `number` \| `null`; `durationMs`: `number`; `files`: `object`[]; `fromCache`: `boolean`; `model`: `string`; `outputTokenCount`: `number`; `prompt`: `string`; `promptTokenCount`: `number`; `response`: `TResponse`; `systemPrompt`: `string` \| `null`; `temperature`: `number`; `thinkingLevel`: `boolean` \| `"low"` \| `"medium"` \| `"high"` \| `null`; `thoughts`: `string` \| `null`; `tokensPerSecond`: `number` \| `null`; `totalTokens`: `number`; \}\>

#### Examples

```ts
// Assumes AI_MODEL is set in environment variables.
const result = await askOllama("What is the capital of France?");
console.log(result.response); // "Paris"
```

```ts
// Use a custom Ollama instance.
import { Ollama } from "ollama";
const client = new Ollama({ host: "http://127.0.0.1:11434" });
const result = await askOllama("What is the capital of France?", { ollama: client });
```

```ts
// Analyse a local image.
const result = await askOllama("Describe this image.", {
  files: [{ path: "./photo.jpg", type: "image" }],
});
```

```ts
// Structured JSON output.
import * as z from "zod";
const schema = z.toJSONSchema(z.object({ country: z.string(), capital: z.string() }));
const result = await askOllama(
  "What is the capital of France?",
  { schemaJson: schema },
);
```

```ts
// Enable thinking / reasoning.
const result = await askOllama(
  "What is 17 * 23?",
  { thinkingLevel: "low" },
);
```

```ts
// Access token usage directly from the response.
const result = await askOllama("What is the capital of France?");
console.log(result.response); // "Paris"
console.log(`${result.totalTokens} tokens in ${result.durationMs}ms`);
```

***

### getEmbedding()

> **getEmbedding**(`text`, `options?`): `Promise`\<`number`[]\>

Defined in: [journalism-ai/src/ai/getEmbedding.ts:103](https://github.com/nshiab/journalism-ai/blob/v3.0.0/src/ai/getEmbedding.ts#L103)

Generates a numerical embedding (vector representation) for a given text string. Embeddings are crucial for various natural language processing (NLP) tasks, including semantic search, text classification, clustering, and anomaly detection, as they allow text to be processed and compared mathematically.

This function supports both Google's Gemini AI models and local models running with Ollama. It provides options for authentication, model selection, and caching to optimize performance and cost.

**Authentication**:
With no explicit provider, credentials, model information, and provider selection come from environment variables (`AI_KEY`, `AI_PROJECT`, `AI_LOCATION`, `AI_EMBEDDINGS_MODEL`, `AI_EMBEDDINGS_PROVIDER`). Providerless options intentionally contain only fields shared by every provider.

**Local Models**:
To use a local model with Ollama, pass `provider: "ollama"`, or set `AI_EMBEDDINGS_PROVIDER=ollama` (the legacy `OLLAMA` environment variable is also supported), and ensure Ollama is running. A custom `Ollama` client can be passed in the provider-specific `ollama` option.

**Caching**:
Responses are cached by default in a local `.journalism-cache` directory. If the same request is made again, the cached response will be returned, avoiding redundant API calls. Set `cache` to `false` to disable caching. Remember to add `.journalism-cache` to your `.gitignore` file.

**Options:**
- `provider`: Explicitly selects Gemini/Vertex or Ollama. When omitted, `AI_EMBEDDINGS_PROVIDER` is used, then the legacy `OLLAMA` fallback, then Gemini.
- `model`: The specific embedding model to use (e.g., 'text-embedding-004'). Defaults to the `AI_EMBEDDINGS_MODEL` environment variable.
- `apiKey`: Your Gemini API or Vertex Express Mode API key. Defaults to the `AI_KEY` environment variable.
- `vertex`: If `true`, explicitly selects the Vertex AI backend for the Google provider.
- `project`: Your Google Cloud project ID for Vertex AI. Defaults to the `AI_PROJECT` environment variable.
- `location`: The Google Cloud location for your Vertex AI project. Defaults to the `AI_LOCATION` environment variable.
- `cache`: If `true`, enables caching of the embedding response. Defaults to `true`.
- `ollama`: A custom Ollama client. Boolean selection remains supported at runtime for compatibility but is deprecated; use `provider: "ollama"` instead.
- `verbose`: If `true`, logs additional information such as execution time and the truncated input text. Defaults to `false`.
- `contextWindow`: An option to specify the context window size for Ollama models. By default, Ollama sets this depending on the model, which can be lower than the actual maximum context window size of the model.
- `beforeRequest`: Awaited immediately before each uncached provider dispatch, including when caching is disabled. Cache hits skip it. Throwing prevents dispatch and successful caching. Caller retries invoke it again; it is excluded from cache identity.

#### Parameters

##### text

`string`

The input text string for which to generate the embedding.

##### options?

\{ `apiKey?`: `undefined`; `beforeRequest?`: () => `void` \| `Promise`\<`void`\>; `cache?`: `boolean`; `contextWindow?`: `undefined`; `location?`: `undefined`; `model?`: `string`; `ollama?`: `undefined`; `project?`: `undefined`; `provider?`: `undefined`; `verbose?`: `boolean`; `vertex?`: `undefined`; \} \| \{ `apiKey?`: `string`; `beforeRequest?`: () => `void` \| `Promise`\<`void`\>; `cache?`: `boolean`; `contextWindow?`: `undefined`; `location?`: `undefined`; `model?`: `string`; `ollama?`: `undefined`; `project?`: `undefined`; `provider`: `"gemini"`; `verbose?`: `boolean`; `vertex?`: `false`; \} \| \{ `apiKey?`: `string`; `beforeRequest?`: () => `void` \| `Promise`\<`void`\>; `cache?`: `boolean`; `contextWindow?`: `undefined`; `location?`: `string`; `model?`: `string`; `ollama?`: `undefined`; `project?`: `string`; `provider`: `"gemini"`; `verbose?`: `boolean`; `vertex`: `true`; \} \| \{ `apiKey?`: `undefined`; `beforeRequest?`: () => `void` \| `Promise`\<`void`\>; `cache?`: `boolean`; `contextWindow?`: `number`; `location?`: `undefined`; `model?`: `string`; `ollama?`: \{ `embeddingEndpoint?`: `string`; `embed`(`request`): `Promise`\<\{ `embeddings`: `number`[][]; \}\>; \}; `project?`: `undefined`; `provider`: `"ollama"`; `verbose?`: `boolean`; `vertex?`: `undefined`; \}

Configuration options for the embedding generation.

###### Type Literal

\{ `apiKey?`: `undefined`; `beforeRequest?`: () => `void` \| `Promise`\<`void`\>; `cache?`: `boolean`; `contextWindow?`: `undefined`; `location?`: `undefined`; `model?`: `string`; `ollama?`: `undefined`; `project?`: `undefined`; `provider?`: `undefined`; `verbose?`: `boolean`; `vertex?`: `undefined`; \}

Configuration options for the embedding generation.

###### apiKey?

`undefined`

Direct credentials require an explicit provider.

###### beforeRequest?

() => `void` \| `Promise`\<`void`\>

Awaits caller-controlled pacing immediately before an uncached provider
request. Cache hits skip this hook. Throwing prevents dispatch and caching.
The hook is excluded from embedding identity and cache keys.

**Example**

```ts
const options = {
  beforeRequest: async () => {
    await new Promise((resolve) => setTimeout(resolve, 100));
  },
};
```

###### cache?

`boolean`

Whether to persist and reuse the embedding response. Defaults to `true`.

###### contextWindow?

`undefined`

Provider-specific semantic options require an explicit provider.

###### location?

`undefined`

Direct deployment selection requires an explicit provider.

###### model?

`string`

The embedding model. Defaults to `AI_EMBEDDINGS_MODEL`.

###### ollama?

`undefined`

Custom clients require an explicit provider.

###### project?

`undefined`

Direct deployment selection requires an explicit provider.

###### provider?

`undefined`

Omit the discriminator to select the provider from the environment.

###### verbose?

`boolean`

Whether to log request and timing information.

###### vertex?

`undefined`

Direct backend selection requires an explicit provider.

***

###### Type Literal

\{ `apiKey?`: `string`; `beforeRequest?`: () => `void` \| `Promise`\<`void`\>; `cache?`: `boolean`; `contextWindow?`: `undefined`; `location?`: `undefined`; `model?`: `string`; `ollama?`: `undefined`; `project?`: `undefined`; `provider`: `"gemini"`; `verbose?`: `boolean`; `vertex?`: `false`; \}

Configuration options for the embedding generation.

###### apiKey?

`string`

Gemini API key. Defaults to `AI_KEY`.

###### beforeRequest?

() => `void` \| `Promise`\<`void`\>

Awaits caller-controlled pacing immediately before an uncached provider
request. Cache hits skip this hook. Throwing prevents dispatch and caching.
The hook is excluded from embedding identity and cache keys.

**Example**

```ts
const options = {
  beforeRequest: async () => {
    await new Promise((resolve) => setTimeout(resolve, 100));
  },
};
```

###### cache?

`boolean`

Whether to persist and reuse the embedding response. Defaults to `true`.

###### contextWindow?

`undefined`

Ollama context windows are not valid for the Gemini API.

###### location?

`undefined`

Vertex locations are not valid for the Gemini API.

###### model?

`string`

The embedding model. Defaults to `AI_EMBEDDINGS_MODEL`.

###### ollama?

`undefined`

Ollama clients are not valid for the Gemini API.

###### project?

`undefined`

Vertex projects are not valid for the Gemini API.

###### provider

`"gemini"`

Explicitly selects the Google embedding provider.

###### verbose?

`boolean`

Whether to log request and timing information.

###### vertex?

`false`

Keeps the request on the Gemini API rather than Vertex AI.

***

###### Type Literal

\{ `apiKey?`: `string`; `beforeRequest?`: () => `void` \| `Promise`\<`void`\>; `cache?`: `boolean`; `contextWindow?`: `undefined`; `location?`: `string`; `model?`: `string`; `ollama?`: `undefined`; `project?`: `string`; `provider`: `"gemini"`; `verbose?`: `boolean`; `vertex`: `true`; \}

Configuration options for the embedding generation.

###### apiKey?

`string`

Vertex Express Mode API key.

###### beforeRequest?

() => `void` \| `Promise`\<`void`\>

Awaits caller-controlled pacing immediately before an uncached provider
request. Cache hits skip this hook. Throwing prevents dispatch and caching.
The hook is excluded from embedding identity and cache keys.

**Example**

```ts
const options = {
  beforeRequest: async () => {
    await new Promise((resolve) => setTimeout(resolve, 100));
  },
};
```

###### cache?

`boolean`

Whether to persist and reuse the embedding response. Defaults to `true`.

###### contextWindow?

`undefined`

Ollama context windows are not valid for Vertex AI.

###### location?

`string`

Google Cloud location. Defaults to `AI_LOCATION`.

###### model?

`string`

The embedding model. Defaults to `AI_EMBEDDINGS_MODEL`.

###### ollama?

`undefined`

Ollama clients are not valid for Vertex AI.

###### project?

`string`

Google Cloud project. Defaults to `AI_PROJECT`.

###### provider

`"gemini"`

Explicitly selects the Google embedding provider.

###### verbose?

`boolean`

Whether to log request and timing information.

###### vertex

`true`

Selects the Vertex AI backend.

***

###### Type Literal

\{ `apiKey?`: `undefined`; `beforeRequest?`: () => `void` \| `Promise`\<`void`\>; `cache?`: `boolean`; `contextWindow?`: `number`; `location?`: `undefined`; `model?`: `string`; `ollama?`: \{ `embeddingEndpoint?`: `string`; `embed`(`request`): `Promise`\<\{ `embeddings`: `number`[][]; \}\>; \}; `project?`: `undefined`; `provider`: `"ollama"`; `verbose?`: `boolean`; `vertex?`: `undefined`; \}

Configuration options for the embedding generation.

###### apiKey?

`undefined`

Gemini and Vertex API keys are not valid for Ollama.

###### beforeRequest?

() => `void` \| `Promise`\<`void`\>

Awaits caller-controlled pacing immediately before an uncached provider
request. Cache hits skip this hook. Throwing prevents dispatch and caching.
The hook is excluded from embedding identity and cache keys.

**Example**

```ts
const options = {
  beforeRequest: async () => {
    await new Promise((resolve) => setTimeout(resolve, 100));
  },
};
```

###### cache?

`boolean`

Whether to persist and reuse the embedding response. Defaults to `true`.

###### contextWindow?

`number`

The model context-window size sent to Ollama.

###### location?

`undefined`

Vertex locations are not valid for Ollama.

###### model?

`string`

The embedding model. Defaults to `AI_EMBEDDINGS_MODEL`.

###### ollama?

\{ `embeddingEndpoint?`: `string`; `embed`(`request`): `Promise`\<\{ `embeddings`: `number`[][]; \}\>; \}

A custom Ollama client.

###### ollama.embeddingEndpoint?

`string`

Non-secret deployment endpoint for custom adapters that are not instances
of the Ollama SDK client.

###### ollama.embed

(`request`) => `Promise`\<\{ `embeddings`: `number`[][]; \}\>

Sends an embedding request to Ollama.

###### project?

`undefined`

Vertex projects are not valid for Ollama.

###### provider

`"ollama"`

Explicitly selects Ollama.

###### verbose?

`boolean`

Whether to log request and timing information.

###### vertex?

`undefined`

Vertex selection is not valid for Ollama.

#### Returns

`Promise`\<`number`[]\>

A promise that resolves to an array of numbers representing the generated embedding.

#### Examples

```ts
// Environment-selected usage. Configure AI_EMBEDDINGS_PROVIDER,
// AI_EMBEDDINGS_MODEL, and the matching credentials first.
const embedding = await getEmbedding("The quick brown fox jumps over the lazy dog.");
console.log(embedding); // [0.012, -0.034, ..., 0.056] (example output)
```

```ts
// Embeddings are cached by default.
const cachedEmbedding = await getEmbedding("Artificial intelligence is transforming industries.");
console.log(cachedEmbedding);
```

```ts
// Generate an embedding using a specific model and API key.
const customEmbedding = await getEmbedding("Machine learning is a subset of AI.", {
  provider: "gemini",
  model: "another-embedding-model",
  apiKey: "your_custom_api_key"
});
console.log(customEmbedding);
```

```ts
// Explicit Vertex AI usage.
const vertexEmbedding = await getEmbedding("Local reporting matters.", {
  provider: "gemini",
  vertex: true,
  model: "text-embedding-004",
  project: "your-project",
  location: "northamerica-northeast1",
});
```

```ts
// Explicit Ollama usage.
const ollamaEmbedding = await getEmbedding("Local reporting matters.", {
  provider: "ollama",
  model: "nomic-embed-text",
  contextWindow: 8192,
});
```

```ts
// Generate an embedding with verbose logging.
const verboseEmbedding = await getEmbedding("The quick brown fox jumps over the lazy dog.", { verbose: true });
console.log(verboseEmbedding);
```

```ts
// Apply pacing only when the response is not cached.
const embedding = await getEmbedding("Local reporting matters.", {
  provider: "ollama",
  model: "nomic-embed-text",
  beforeRequest: async () => {
    await new Promise((resolve) => setTimeout(resolve, 100));
  },
});
```

***

### getEmbeddingIdentity()

> **getEmbeddingIdentity**(`options?`, `environment?`): \{ `backend`: `"gemini-api"`; `model`: `string`; `provider`: `"gemini"`; `schemaVersion`: `2`; \} \| \{ `backend`: `"vertex"`; `location?`: `string`; `model`: `string`; `project?`: `string`; `provider`: `"gemini"`; `schemaVersion`: `2`; \} \| \{ `backend`: `"ollama"`; `contextWindow?`: `number`; `endpoint`: `string`; `model`: `string`; `provider`: `"ollama"`; `schemaVersion`: `2`; \}

Defined in: [journalism-ai/src/ai/embeddingOptions.ts:379](https://github.com/nshiab/journalism-ai/blob/v3.0.0/src/ai/embeddingOptions.ts#L379)

Returns the canonical, non-secret identity for an embedding request.
Downstream persisted data can compare this value to decide whether vectors
are compatible with the current request.

#### Parameters

##### options?

\{ `apiKey?`: `undefined`; `beforeRequest?`: () => `void` \| `Promise`\<`void`\>; `cache?`: `boolean`; `contextWindow?`: `undefined`; `location?`: `undefined`; `model?`: `string`; `ollama?`: `undefined`; `project?`: `undefined`; `provider?`: `undefined`; `verbose?`: `boolean`; `vertex?`: `undefined`; \} \| \{ `apiKey?`: `string`; `beforeRequest?`: () => `void` \| `Promise`\<`void`\>; `cache?`: `boolean`; `contextWindow?`: `undefined`; `location?`: `undefined`; `model?`: `string`; `ollama?`: `undefined`; `project?`: `undefined`; `provider`: `"gemini"`; `verbose?`: `boolean`; `vertex?`: `false`; \} \| \{ `apiKey?`: `string`; `beforeRequest?`: () => `void` \| `Promise`\<`void`\>; `cache?`: `boolean`; `contextWindow?`: `undefined`; `location?`: `string`; `model?`: `string`; `ollama?`: `undefined`; `project?`: `string`; `provider`: `"gemini"`; `verbose?`: `boolean`; `vertex`: `true`; \} \| \{ `apiKey?`: `undefined`; `beforeRequest?`: () => `void` \| `Promise`\<`void`\>; `cache?`: `boolean`; `contextWindow?`: `number`; `location?`: `undefined`; `model?`: `string`; `ollama?`: \{ `embeddingEndpoint?`: `string`; `embed`(`request`): `Promise`\<\{ `embeddings`: `number`[][]; \}\>; \}; `project?`: `undefined`; `provider`: `"ollama"`; `verbose?`: `boolean`; `vertex?`: `undefined`; \}

Provider-aware embedding options.

###### Type Literal

\{ `apiKey?`: `undefined`; `beforeRequest?`: () => `void` \| `Promise`\<`void`\>; `cache?`: `boolean`; `contextWindow?`: `undefined`; `location?`: `undefined`; `model?`: `string`; `ollama?`: `undefined`; `project?`: `undefined`; `provider?`: `undefined`; `verbose?`: `boolean`; `vertex?`: `undefined`; \}

Provider-aware embedding options.

###### apiKey?

`undefined`

Direct credentials require an explicit provider.

###### beforeRequest?

() => `void` \| `Promise`\<`void`\>

Awaits caller-controlled pacing immediately before an uncached provider
request. Cache hits skip this hook. Throwing prevents dispatch and caching.
The hook is excluded from embedding identity and cache keys.

**Example**

```ts
const options = {
  beforeRequest: async () => {
    await new Promise((resolve) => setTimeout(resolve, 100));
  },
};
```

###### cache?

`boolean`

Whether to persist and reuse the embedding response. Defaults to `true`.

###### contextWindow?

`undefined`

Provider-specific semantic options require an explicit provider.

###### location?

`undefined`

Direct deployment selection requires an explicit provider.

###### model?

`string`

The embedding model. Defaults to `AI_EMBEDDINGS_MODEL`.

###### ollama?

`undefined`

Custom clients require an explicit provider.

###### project?

`undefined`

Direct deployment selection requires an explicit provider.

###### provider?

`undefined`

Omit the discriminator to select the provider from the environment.

###### verbose?

`boolean`

Whether to log request and timing information.

###### vertex?

`undefined`

Direct backend selection requires an explicit provider.

***

###### Type Literal

\{ `apiKey?`: `string`; `beforeRequest?`: () => `void` \| `Promise`\<`void`\>; `cache?`: `boolean`; `contextWindow?`: `undefined`; `location?`: `undefined`; `model?`: `string`; `ollama?`: `undefined`; `project?`: `undefined`; `provider`: `"gemini"`; `verbose?`: `boolean`; `vertex?`: `false`; \}

Provider-aware embedding options.

###### apiKey?

`string`

Gemini API key. Defaults to `AI_KEY`.

###### beforeRequest?

() => `void` \| `Promise`\<`void`\>

Awaits caller-controlled pacing immediately before an uncached provider
request. Cache hits skip this hook. Throwing prevents dispatch and caching.
The hook is excluded from embedding identity and cache keys.

**Example**

```ts
const options = {
  beforeRequest: async () => {
    await new Promise((resolve) => setTimeout(resolve, 100));
  },
};
```

###### cache?

`boolean`

Whether to persist and reuse the embedding response. Defaults to `true`.

###### contextWindow?

`undefined`

Ollama context windows are not valid for the Gemini API.

###### location?

`undefined`

Vertex locations are not valid for the Gemini API.

###### model?

`string`

The embedding model. Defaults to `AI_EMBEDDINGS_MODEL`.

###### ollama?

`undefined`

Ollama clients are not valid for the Gemini API.

###### project?

`undefined`

Vertex projects are not valid for the Gemini API.

###### provider

`"gemini"`

Explicitly selects the Google embedding provider.

###### verbose?

`boolean`

Whether to log request and timing information.

###### vertex?

`false`

Keeps the request on the Gemini API rather than Vertex AI.

***

###### Type Literal

\{ `apiKey?`: `string`; `beforeRequest?`: () => `void` \| `Promise`\<`void`\>; `cache?`: `boolean`; `contextWindow?`: `undefined`; `location?`: `string`; `model?`: `string`; `ollama?`: `undefined`; `project?`: `string`; `provider`: `"gemini"`; `verbose?`: `boolean`; `vertex`: `true`; \}

Provider-aware embedding options.

###### apiKey?

`string`

Vertex Express Mode API key.

###### beforeRequest?

() => `void` \| `Promise`\<`void`\>

Awaits caller-controlled pacing immediately before an uncached provider
request. Cache hits skip this hook. Throwing prevents dispatch and caching.
The hook is excluded from embedding identity and cache keys.

**Example**

```ts
const options = {
  beforeRequest: async () => {
    await new Promise((resolve) => setTimeout(resolve, 100));
  },
};
```

###### cache?

`boolean`

Whether to persist and reuse the embedding response. Defaults to `true`.

###### contextWindow?

`undefined`

Ollama context windows are not valid for Vertex AI.

###### location?

`string`

Google Cloud location. Defaults to `AI_LOCATION`.

###### model?

`string`

The embedding model. Defaults to `AI_EMBEDDINGS_MODEL`.

###### ollama?

`undefined`

Ollama clients are not valid for Vertex AI.

###### project?

`string`

Google Cloud project. Defaults to `AI_PROJECT`.

###### provider

`"gemini"`

Explicitly selects the Google embedding provider.

###### verbose?

`boolean`

Whether to log request and timing information.

###### vertex

`true`

Selects the Vertex AI backend.

***

###### Type Literal

\{ `apiKey?`: `undefined`; `beforeRequest?`: () => `void` \| `Promise`\<`void`\>; `cache?`: `boolean`; `contextWindow?`: `number`; `location?`: `undefined`; `model?`: `string`; `ollama?`: \{ `embeddingEndpoint?`: `string`; `embed`(`request`): `Promise`\<\{ `embeddings`: `number`[][]; \}\>; \}; `project?`: `undefined`; `provider`: `"ollama"`; `verbose?`: `boolean`; `vertex?`: `undefined`; \}

Provider-aware embedding options.

###### apiKey?

`undefined`

Gemini and Vertex API keys are not valid for Ollama.

###### beforeRequest?

() => `void` \| `Promise`\<`void`\>

Awaits caller-controlled pacing immediately before an uncached provider
request. Cache hits skip this hook. Throwing prevents dispatch and caching.
The hook is excluded from embedding identity and cache keys.

**Example**

```ts
const options = {
  beforeRequest: async () => {
    await new Promise((resolve) => setTimeout(resolve, 100));
  },
};
```

###### cache?

`boolean`

Whether to persist and reuse the embedding response. Defaults to `true`.

###### contextWindow?

`number`

The model context-window size sent to Ollama.

###### location?

`undefined`

Vertex locations are not valid for Ollama.

###### model?

`string`

The embedding model. Defaults to `AI_EMBEDDINGS_MODEL`.

###### ollama?

\{ `embeddingEndpoint?`: `string`; `embed`(`request`): `Promise`\<\{ `embeddings`: `number`[][]; \}\>; \}

A custom Ollama client.

###### ollama.embeddingEndpoint?

`string`

Non-secret deployment endpoint for custom adapters that are not instances
of the Ollama SDK client.

###### ollama.embed

(`request`) => `Promise`\<\{ `embeddings`: `number`[][]; \}\>

Sends an embedding request to Ollama.

###### project?

`undefined`

Vertex projects are not valid for Ollama.

###### provider

`"ollama"`

Explicitly selects Ollama.

###### verbose?

`boolean`

Whether to log request and timing information.

###### vertex?

`undefined`

Vertex selection is not valid for Ollama.

##### environment?

\{\[`key`: `string`\]: `string` \| `undefined`; \}

Environment used to resolve omitted values.

#### Returns

The canonical identity used by embedding caches.

##### Type Literal

\{ `backend`: `"gemini-api"`; `model`: `string`; `provider`: `"gemini"`; `schemaVersion`: `2`; \}

###### backend

> **backend**: `"gemini-api"`

Resolved Gemini API backend.

###### model

> **model**: `string`

Resolved embedding model.

###### provider

> **provider**: `"gemini"`

Resolved provider.

###### schemaVersion

> **schemaVersion**: `2`

Cache-compatibility schema for the canonical identity.

***

##### Type Literal

\{ `backend`: `"vertex"`; `location?`: `string`; `model`: `string`; `project?`: `string`; `provider`: `"gemini"`; `schemaVersion`: `2`; \}

###### backend

> **backend**: `"vertex"`

Resolved Vertex AI backend.

###### location?

> `optional` **location?**: `string`

Resolved Google Cloud location, when configured.

###### model

> **model**: `string`

Resolved embedding model.

###### project?

> `optional` **project?**: `string`

Resolved Google Cloud project, when configured.

###### provider

> **provider**: `"gemini"`

Resolved provider.

###### schemaVersion

> **schemaVersion**: `2`

Cache-compatibility schema for the canonical identity.

***

##### Type Literal

\{ `backend`: `"ollama"`; `contextWindow?`: `number`; `endpoint`: `string`; `model`: `string`; `provider`: `"ollama"`; `schemaVersion`: `2`; \}

###### backend

> **backend**: `"ollama"`

Resolved Ollama backend.

###### contextWindow?

> `optional` **contextWindow?**: `number`

Context-window size when explicitly configured.

###### endpoint

> **endpoint**: `string`

Non-secret Ollama endpoint identity.

###### model

> **model**: `string`

Resolved embedding model.

###### provider

> **provider**: `"ollama"`

Resolved provider.

###### schemaVersion

> **schemaVersion**: `2`

Cache-compatibility schema for the canonical identity.

#### Example

```ts
const identity = getEmbeddingIdentity({
  provider: "ollama",
  model: "nomic-embed-text",
  contextWindow: 8192,
});
```

## Climate

### getEnvironmentCanadaRecords()

> **getEnvironmentCanadaRecords**\<`T`\>(`locations`, `variable`, `dateRange`, `options?`): `Promise`\<(`T` & `object`)[]\>

Defined in: [journalism-climate/src/climate/getEnvironmentCanadaRecords.ts:102](https://github.com/nshiab/journalism-climate/blob/v1.0.13/src/climate/getEnvironmentCanadaRecords.ts#L102)

Retrieves historical weather records from Environment and Climate Change Canada for specified locations and date ranges. This function fetches extreme weather records (daily maximum temperatures, precipitation, or snowfall) from the closest weather stations to your provided coordinates.

The function uses Environment Canada's Long-Term Climate Extremes (LTCE) API to find the nearest weather stations that have recorded the specified weather variable, then retrieves the historical record values for each day in your specified date range.

**Weather Variables**:
- `"DAILY MAXIMUM TEMPERATURE"`: Historical record high temperatures for each day
- `"DAILY TOTAL PRECIPITATION"`: Historical record precipitation amounts for each day
- `"DAILY TOTAL SNOWFALL"`: Historical record snowfall amounts for each day

**Station Selection**:
For each location you provide, the function automatically finds the closest weather station that has recorded the specified weather variable. The distance to the station is calculated and included in the results, allowing you to assess the relevance of the data to your specific location.

**Rate Limiting**:
The function includes built-in rate limiting with a configurable delay between API calls to respect Environment Canada's servers. The default delay is 100ms between requests, but this can be adjusted based on your needs.

#### Type Parameters

##### T

`T` *extends* `object`

#### Parameters

##### locations

`T`[]

An array of location objects, each containing `lat` and `lon` properties. Additional properties will be preserved in the output.

##### variable

`"DAILY MAXIMUM TEMPERATURE"` \| `"DAILY TOTAL PRECIPITATION"` \| `"DAILY TOTAL SNOWFALL"`

The type of weather record to retrieve. Must be one of:
  - `"DAILY MAXIMUM TEMPERATURE"`: Record high temperatures in Celsius
  - `"DAILY TOTAL PRECIPITATION"`: Record precipitation amounts in millimeters
  - `"DAILY TOTAL SNOWFALL"`: Record snowfall amounts in centimeters

##### dateRange

\[`` `${number}-${number}-${number}` ``, `` `${number}-${number}-${number}` ``\]

A tuple of two date strings in "YYYY-MM-DD" format representing the start and end dates (inclusive) for the record retrieval. Note: The year values are only used for iteration purposes to determine which calendar days to fetch records for - the actual records returned are historical all-time extremes regardless of the year specified.

##### options?

Configuration options for the data retrieval.

###### delay?

`number`

Delay in milliseconds between API requests. Defaults to 100ms. Increase this value if you encounter rate limiting.

###### verbose?

`boolean`

If `true`, logs detailed information about station selection and API requests. Useful for debugging and monitoring progress. Defaults to `false`.

#### Returns

`Promise`\<(`T` & `object`)[]\>

A Promise that resolves to an array of objects containing the weather records. Each object includes:
  - All original properties from the input location
  - `recordMonth`: The month (1-12) of the record
  - `recordDay`: The day of the month of the record
  - `recordVariable`: The weather variable that was requested
  - `recordValue`: The record value (temperature in °C, precipitation/snowfall in mm/cm)
  - `recordYear`: The year when the record was set
  - `previousRecordValue`: The previous record value before the current record
  - `previousRecordYear`: The year when the previous record was set
  - `recordStationName`: The name of the weather station where the record was measured
  - `recordStationId`: The unique identifier of the weather station
  - `recordStationLat`: The latitude of the weather station
  - `recordStationLon`: The longitude of the weather station
  - `recordStationDistance`: The distance in meters from your location to the weather station
  - `recordStationRecordBegin`: The date when record-keeping began at this station
  - `recordStationRecordEnd`: The date when record-keeping ended at this station (null if still active)

#### Examples

```ts
// Get record high temperatures for Toronto in July 2023
const torontoRecords = await getEnvironmentCanadaRecords(
  [{ lat: 43.6532, lon: -79.3832, city: "Toronto" }],
  "DAILY MAXIMUM TEMPERATURE",
  ["2023-07-01", "2023-07-31"]
);
console.table(torontoRecords);
// Returns daily record highs with station info and distances
```

```ts
// Get precipitation records for multiple cities with custom options
const cities = [
  { lat: 45.4215, lon: -75.6972, name: "Ottawa" },
  { lat: 43.6532, lon: -79.3832, name: "Toronto" },
  { lat: 45.5017, lon: -73.5673, name: "Montreal" }
];

const precipitationRecords = await getEnvironmentCanadaRecords(
  cities,
  "DAILY TOTAL PRECIPITATION",
  ["2023-06-01", "2023-08-31"],
  {
    delay: 200, // Slower requests to be extra respectful
    verbose: true // Log progress and station information
  }
);
console.table(precipitationRecords);
```

```ts
// Get snowfall records for winter months
const vancouverSnow = await getEnvironmentCanadaRecords(
  [{ lat: 49.2827, lon: -123.1207, region: "Vancouver" }],
  "DAILY TOTAL SNOWFALL",
  ["2023-12-01", "2024-02-29"]
);

// Filter for days with significant snowfall records
const significantSnow = vancouverSnow.filter(record => record.recordValue > 10);
console.table(significantSnow);
```

***

### getHumidex()

> **getHumidex**(`temperature`, `humidity`): `number`

Defined in: [journalism-climate/src/climate/getHumidex.ts:28](https://github.com/nshiab/journalism-climate/blob/v1.0.13/src/climate/getHumidex.ts#L28)

Calculates the humidex factor in Celsius based on the given temperature in Celsius and humidity percentage.

If the calculated humidex is less than the provided temperature, the temperature itself is returned.

This calculation uses the formula provided by the Canadian Centre for Climate Services.

#### Parameters

##### temperature

`number`

The ambient temperature in Celsius.

##### humidity

`number`

The relative humidity as a percentage (0-100).

#### Returns

`number`

The calculated humidex value in Celsius, rounded to the nearest whole number. Returns the original temperature if the calculated humidex is lower.

#### Examples

```ts
// Calculate humidex for a warm and humid day.
const humidex = getHumidex(30, 70); // returns 41
console.log(`Humidex: ${humidex}`);
```

```ts
// In cases where the calculated humidex is less than the temperature, the temperature is returned.
const humidexLowHumidity = getHumidex(20, 30); // returns 20 (since calculated humidex would be lower)
console.log(`Humidex: ${humidexLowHumidity}`);
```

#### Throws

If the humidity value is not within the valid range of 0 to 100.

***

### getSeason()

> **getSeason**(`options?`): `"winter"` \| `"spring"` \| `"summer"` \| `"fall"`

Defined in: [journalism-climate/src/climate/getSeason.ts:50](https://github.com/nshiab/journalism-climate/blob/v1.0.13/src/climate/getSeason.ts#L50)

Determines the current season based on a given date, hemisphere, and season type. This function provides flexibility by allowing you to specify the exact date, the hemisphere (Northern or Southern), and the method of season calculation (astronomical or meteorological). By default, it uses the current date, the Northern Hemisphere, and astronomical seasons.

Astronomical seasons are based on the Earth's position in its orbit around the sun, marked by equinoxes and solstices. Meteorological seasons are based on the annual temperature cycle and are typically defined by calendar months, making them consistent for statistical purposes.

#### Parameters

##### options?

An object containing options for determining the season.

###### date?

`Date`

Optional. The date for which to determine the season. Defaults to the current date if not provided.

###### hemisphere?

`"northern"` \| `"southern"`

Optional. The hemisphere for which to determine the season. Can be 'northern' or 'southern'. Defaults to 'northern'.

###### type?

`"meteorological"` \| `"astronomical"`

Optional. The type of season calculation to use. Can be 'meteorological' or 'astronomical'. Defaults to 'astronomical'.

#### Returns

`"winter"` \| `"spring"` \| `"summer"` \| `"fall"`

The name of the season ('winter', 'spring', 'summer', or 'fall').

#### Examples

```ts
// Get the current season in the northern hemisphere using astronomical seasons.
const season = getSeason();
console.log(season); // e.g., "summer" (if current date is July 7, 2025)
```

```ts
// Get the season for a specific date in the southern hemisphere using meteorological seasons.
const specificDate = new Date('2023-06-15');
const seasonSouthernMeteorological = getSeason({
  date: specificDate,
  hemisphere: 'southern',
  type: 'meteorological'
});
console.log(seasonSouthernMeteorological); // Output: "winter"
```

```ts
// Compare astronomical and meteorological seasons for a specific date in the Northern Hemisphere.
const march21 = new Date('2024-03-21');
const astronomicalSeason = getSeason({ date: march21, type: 'astronomical' });
console.log(`Astronomical season on March 21: ${astronomicalSeason}`); // Output: "spring"

const meteorologicalSeason = getSeason({ date: march21, type: 'meteorological' });
console.log(`Meteorological season on March 21: ${meteorologicalSeason}`); // Output: "spring"

const december1 = new Date('2024-12-01');
const astronomicalSeasonDec = getSeason({ date: december1, type: 'astronomical' });
console.log(`Astronomical season on December 1: ${astronomicalSeasonDec}`); // Output: "fall"

const meteorologicalSeasonDec = getSeason({ date: december1, type: 'meteorological' });
console.log(`Meteorological season on December 1: ${meteorologicalSeasonDec}`); // Output: "winter"
```

## Dataviz

### getDataDW()

> **getDataDW**(`chartId`, `options?`): `Promise`\<`unknown`\>

Defined in: [journalism-dataviz/src/dataviz/getDataDW.ts:43](https://github.com/nshiab/journalism-dataviz/blob/v1.0.27/src/dataviz/getDataDW.ts#L43)

Gets the data of a Datawrapper chart, table, or map.

Authentication is handled via an API key, which can be provided through environment variables (`DATAWRAPPER_KEY`) or explicitly in the options.

#### Parameters

##### chartId

`string`

The unique ID of the Datawrapper chart, table, or map. This ID can be found in the Datawrapper URL or dashboard.

##### options?

Optional parameters to configure the request.

###### apiKey?

`string`

The name of the environment variable that stores your Datawrapper API key (e.g., `"DATAWRAPPER_KEY"`). If not provided, the function defaults to looking for the `DATAWRAPPER_KEY` environment variable.

###### parse?

`boolean`

If `true`, the response will be parsed and returned as a JavaScript value. CSV data (charts and tables) is returned as an array of objects; JSON data (maps) is returned as a parsed object. Defaults to `false`.

###### returnResponse?

`boolean`

If `true`, the function will return the full `Response` object from the Datawrapper API call. This can be useful for debugging or for more detailed handling of the API response. Defaults to `false`.

#### Returns

`Promise`\<`unknown`\>

A Promise that resolves to a raw `string` by default, a parsed value if `parse` is `true` (`Record<string, string>[]` for CSV charts/tables, or a `object` for JSON maps), or a `Response` object if `returnResponse` is `true`.

#### Examples

```ts
import { getDataDW } from "journalism-dataviz";

const data = await getDataDW("myChartId");
console.log(data); // raw CSV string
```

```ts
// Parse a chart or table — returns an array of objects (all values are strings).
const rows = await getDataDW("myChartId", { parse: true });
console.log(rows); // [{ salary: "75000", hireDate: "2022-12-15" }, ...]
```

```ts
// Parse a locator map — detects JSON automatically and returns a parsed object.
const map = await getDataDW("myMapId", { parse: true });
console.log(map); // { type: "FeatureCollection", features: [...], markers: [] }
```

```ts
// If your API key is stored under a different name in process.env (e.g., `DW_KEY`).
const data = await getDataDW("anotherChartId", { apiKey: "DW_KEY" });
console.log(data);
```

***

### getInfoDW()

> **getInfoDW**(`chartId`, `options?`): `Promise`\<`Record`\<`string`, `unknown`\> \| `Response`\>

Defined in: [journalism-dataviz/src/dataviz/getInfoDW.ts:39](https://github.com/nshiab/journalism-dataviz/blob/v1.0.27/src/dataviz/getInfoDW.ts#L39)

Gets information and settings for a Datawrapper chart, table, or map.

Returns the full parsed chart object, including any chart-specific fields. Property values are typed as unknown because the response varies by visualization.

Authentication is handled via an API key stored in an environment variable (`DATAWRAPPER_KEY` by default). The token requires `chart:read` or `chart:write` scope.

#### Parameters

##### chartId

`string`

The unique ID of the Datawrapper chart, table, or map. This ID can be found in the Datawrapper URL or dashboard.

##### options?

Optional parameters to configure the request.

###### apiKey?

`string`

The name of the environment variable that stores your Datawrapper API key (e.g., `"DATAWRAPPER_KEY"`). If not provided, the function defaults to looking for the `DATAWRAPPER_KEY` environment variable.

###### returnResponse?

`boolean`

If `true`, the function will return the full, unconsumed `Response` object from the Datawrapper API call, including HTTP error responses. This can be useful for debugging or for more detailed handling of the API response. Defaults to `false`.

#### Returns

`Promise`\<`Record`\<`string`, `unknown`\> \| `Response`\>

A Promise that resolves to a parsed `Record<string, unknown>` by default, or a `Response` object if `returnResponse` is `true`.

#### Examples

```ts
import { getInfoDW } from "@nshiab/journalism-dataviz";

const info = await getInfoDW("myChartId");
console.log(info); // full parsed chart object
```

```ts
// If your API key is stored under a different name in process.env (e.g., `DW_KEY`).
const info = await getInfoDW("anotherChartId", { apiKey: "DW_KEY" });
console.log(info);
```

```ts
// Get the full Response for more detailed handling.
const response = await getInfoDW("myChartId", { returnResponse: true });
if (response instanceof Response) {
  console.log(response.status);
}
```

***

### logBarChart()

> **logBarChart**\<`T`\>(`data`, `labels`, `values`, `options?`): `void`

Defined in: [journalism-dataviz/src/dataviz/logBarChart.ts:52](https://github.com/nshiab/journalism-dataviz/blob/v1.0.27/src/dataviz/logBarChart.ts#L52)

Generates and logs a text-based bar chart to the console. This function is useful for quickly visualizing data distributions or comparisons directly within a terminal or log output, without needing a graphical interface. It's particularly effective for presenting categorical data or showing the relative magnitudes of different items.

The chart is constructed using ASCII characters, making it universally compatible across various terminal environments. It can display data for various categories and their corresponding numerical values, with extensive options for custom formatting of labels and values, controlling the chart's width, and adding a descriptive title or a total label. For optimal visualization, it's recommended that the input `data` be sorted by the `values` key in descending order, though the function does not enforce this.

#### Type Parameters

##### T

`T` *extends* `Record`\<`string`, `unknown`\>

#### Parameters

##### data

`T`[]

An array of objects, where each object represents a bar in the chart. Each object should contain keys corresponding to the `labels` and `values` parameters.

##### labels

keyof `T`

The key in the data objects whose values will be used as textual labels for each bar (e.g., 'category', 'name', 'country').

##### values

keyof `T`

The key in the data objects whose numerical values will determine the length of each bar and be displayed alongside the labels (e.g., 'sales', 'count', 'percentage').

##### options?

Optional configuration for customizing the appearance and behavior of the chart.

###### compact?

`boolean`

If `true`, the chart will be rendered in a more compact format, reducing vertical spacing between bars. Defaults to `false`.

###### formatLabels?

(`d`) => `string`

A function to format the labels displayed on the chart. It receives the raw label value as input and should return a string. Defaults to converting the label to a string.

###### formatValues?

(`d`) => `string`

A function to format the numerical values displayed next to the bars. It receives the numerical value as input and should return a string. Defaults to formatting the number using `formatNumber` (which adds commas for thousands, etc.).

###### showPercentages?

`boolean`

If `true`, the percentage of the total for each bar will be displayed next to its value. Defaults to `false`.

###### showTotal?

`boolean`

If `true`, the total sum of all values will be displayed above the chart. Defaults to `false`.

###### title?

`string`

An optional title to display above the chart. If not provided, a default title based on `labels` and `values` keys will be generated.

###### totalLabel?

`string`

An optional label to display for the total sum of all values at the bottom of the chart. If provided, the sum of all `values` will be calculated and displayed next to this label. This also enables the display of the total row.

###### width?

`number`

The maximum width of the bars in characters. The bars will scale proportionally to this width. A larger width allows for more detailed visualization. Defaults to `40`.

#### Returns

`void`

#### Examples

```ts
// Visualize sales data for different regions.
const salesData = [
  { region: 'North', sales: 1200 },
  { region: 'South', sales: 800 },
  { region: 'East', sales: 1500 },
  { region: 'West', sales: 950 }
];
logBarChart(salesData, 'region', 'sales', { title: 'Regional Sales Overview' });
```

```ts
// Display product popularity with custom value formatting, a compact layout, and show percentages.
const productPopularity = [
  { product: 'Laptop', views: 5000 },
  { product: 'Mouse', views: 1500 },
  { product: 'Keyboard', views: 2500 }
];
logBarChart(productPopularity, 'product', 'views', {
  formatValues: (v) => `${v / 1000}K`,
  width: 30,
  compact: true,
  totalLabel: 'Total Views',
  showPercentages: true
});
```

***

### logDotChart()

> **logDotChart**\<`T`, `X`\>(`data`, `x`, `y`, `options?`): `void`

Defined in: [journalism-dataviz/src/dataviz/logDotChart.ts:72](https://github.com/nshiab/journalism-dataviz/blob/v1.0.27/src/dataviz/logDotChart.ts#L72)

Generates and logs a text-based dot chart to the console. This function is ideal for visualizing the relationship between two numerical variables. It provides a quick, terminal-friendly way to inspect data trends and distributions.

The chart is rendered using ASCII characters, ensuring compatibility across various terminal environments. It supports custom formatting for both x and y-axis values, and can generate small multiples to compare distributions across different categories. While the function expects data to be sorted by the x-axis values for proper rendering, it does not enforce this.

**Data Type Requirements:**
- **X-axis values**: Must be `number` or `Date` objects.
- **Y-axis values**: Must be `number` values.
- All values must be non-null and defined.

#### Type Parameters

##### T

`T` *extends* `Record`\<`string`, `unknown`\>

##### X

`X` *extends* `string` \| `number` \| `symbol` = keyof `T`

#### Parameters

##### data

`T`[]

An array of objects representing the data to be visualized. Each object should contain keys corresponding to the `x` and `y` parameters.

##### x

`X`

The key in the data objects whose values will be plotted on the x-axis. Values must be numbers or Date objects.

##### y

keyof `T`

The key in the data objects whose values will be plotted on the y-axis. Values must be numbers.

##### options?

An optional object to customize the chart's appearance and behavior.

###### fixedScales?

`boolean`

If `true` and `smallMultiples` is used, all small multiple charts will share the same x and y scales, allowing for direct comparison of magnitudes. If `false`, each small multiple will have its own independent scales. Defaults to `false`.

###### formatX?

(`d`) => `string`

A function to format the x-axis values for display. It receives the raw x-value as input and should return a string. If the first data point's x value is a Date, it defaults to formatting the date as "YYYY-MM-DD".

###### formatY?

(`d`) => `string`

A function to format the y-axis values for display. It receives the numerical y-value as input and should return a string.

###### height?

`number`

The height of the chart in lines. This affects the vertical resolution of the chart. Defaults to `20`.

###### smallMultiples?

keyof `T`

A key in the data objects to create small multiples (separate charts) for each unique value of this key. This is useful for comparing trends across different categories.

###### smallMultiplesPerRow?

`number`

The number of small multiples to display per row when `smallMultiples` is used. Defaults to `3`.

###### title?

`string`

The title of the chart. If not provided, a default title based on `x`, `y`, and `smallMultiples` (if applicable) will be generated.

###### width?

`number`

The width of the chart in characters. This affects the horizontal resolution of the chart. Defaults to `60`.

#### Returns

`void`

#### Examples

```ts
// Visualize a time series of values.
const timeSeriesData = [
    { date: new Date("2023-01-01"), value: 10 },
    { date: new Date("2023-02-01"), value: 20 },
    { date: new Date("2023-03-01"), value: 30 },
    { date: new Date("2023-04-01"), value: 40 },
];

logDotChart(timeSeriesData, "date", "value", {
    formatX: (d) => d.toISOString().slice(0, 10),
    formatY: (d) => "$" + d.toString(),
    title: "Monthly Sales Trend",
});
```

```ts
// Compare trends across different categories using small multiples.
const multiCategoryData = [
    { date: new Date("2023-01-01"), value: 10, category: "A" },
    { date: new Date("2023-02-01"), value: 20, category: "A" },
    { date: new Date("2023-03-01"), value: 30, category: "A" },
    { date: new Date("2023-04-01"), value: 40, category: "A" },
    { date: new Date("2023-01-01"), value: 15, category: "B" },
    { date: new Date("2023-02-01"), value: 25, category: "B" },
    { date: new Date("2023-03-01"), value: 35, category: "B" },
    { date: new Date("2023-04-01"), value: 45, category: "B" },
];

logDotChart(multiCategoryData, "date", "value", {
    formatX: (d) => d.toISOString().slice(0, 10),
    formatY: (d) => "$" + d.toString(),
    smallMultiples: "category",
    smallMultiplesPerRow: 2,
    fixedScales: true,
    title: "Sales Trend by Category",
});
```

***

### logLineChart()

> **logLineChart**\<`T`, `X`\>(`data`, `x`, `y`, `options?`): `void`

Defined in: [journalism-dataviz/src/dataviz/logLineChart.ts:71](https://github.com/nshiab/journalism-dataviz/blob/v1.0.27/src/dataviz/logLineChart.ts#L71)

Generates and logs a text-based line chart to the console. This function is particularly useful for visualizing trends over time providing a quick and accessible way to understand data progression directly within a terminal or log output.

The chart is rendered using ASCII characters, ensuring broad compatibility. It supports custom formatting for both x and y-axis values, and can generate small multiples to compare trends across different categories. When the chart's width is smaller than the number of data points, the line represents an averaged approximation of the data, providing a smoothed view of the trend. For optimal visualization, it's recommended that the input `data` be sorted by the x-axis values.

**Data Type Requirements:**
- **X-axis values**: Must be `number` or `Date` objects.
- **Y-axis values**: Must be `number` values.
- All values must be non-null and defined.

#### Type Parameters

##### T

`T` *extends* `Record`\<`string`, `unknown`\>

##### X

`X` *extends* `string` \| `number` \| `symbol` = keyof `T`

#### Parameters

##### data

`T`[]

An array of objects representing the data to be visualized. Each object should contain keys corresponding to the `x` and `y` parameters.

##### x

`X`

The key in the data objects whose values will be plotted on the x-axis. Values must be numbers or Date objects.

##### y

keyof `T`

The key in the data objects whose values will be plotted on the y-axis. Values must be numbers.

##### options?

An optional object to customize the chart's appearance and behavior.

###### fixedScales?

`boolean`

If `true` and `smallMultiples` is used, all small multiple charts will share the same x and y scales, allowing for direct comparison of magnitudes. If `false`, each small multiple will have its own independent scales. Defaults to `false`.

###### formatX?

(`d`) => `string`

A function to format the x-axis values for display. It receives the raw x-value as input and should return a string. If the first data point's x value is a Date, it defaults to formatting the date as "YYYY-MM-DD".

###### formatY?

(`d`) => `string`

A function to format the y-axis values for display. It receives the numerical y-value as input and should return a string.

###### height?

`number`

The height of the chart in lines. This affects the vertical resolution of the chart. Defaults to `20`.

###### smallMultiples?

keyof `T`

A key in the data objects to create small multiples (separate charts) for each unique value of this key. This is useful for comparing trends across different categories.

###### smallMultiplesPerRow?

`number`

The number of small multiples to display per row when `smallMultiples` is used. Defaults to `3`.

###### title?

`string`

The title of the chart. If not provided, a default title based on `x`, `y`, and `smallMultiples` (if applicable) will be generated.

###### width?

`number`

The width of the chart in characters. This affects the horizontal resolution of the chart. Defaults to `60`.

#### Returns

`void`

#### Examples

```ts
// Visualize a simple time series of values.
const timeSeriesData = [
    { date: new Date("2023-01-01"), value: 10 },
    { date: new Date("2023-02-01"), value: 20 },
    { date: new Date("2023-03-01"), value: 30 },
    { date: new Date("2023-04-01"), value: 40 },
];

logLineChart(timeSeriesData, "date", "value", {
    formatX: (d) => d.toISOString().slice(0, 10),
    title: "Monthly Data Trend",
});
```

```ts
// Compare trends across different categories using small multiples.
const multiCategoryData = [
    { date: new Date("2023-01-01"), value: 10, category: "A" },
    { date: new Date("2023-02-01"), value: 20, category: "A" },
    { date: new Date("2023-03-01"), value: 30, category: "A" },
    { date: new Date("2023-04-01"), value: 40, category: "A" },
    { date: new Date("2023-01-01"), value: 15, category: "B" },
    { date: new Date("2023-02-01"), value: 25, category: "B" },
    { date: new Date("2023-03-01"), value: 35, category: "B" },
    { date: new Date("2023-04-01"), value: 45, category: "B" },
];

logLineChart(multiCategoryData, "date", "value", {
    formatX: (d) => d.toLocaleDateString(),
    formatY: (d) => "$" + d.toString(),
    smallMultiples: "category",
    smallMultiplesPerRow: 2,
    fixedScales: true,
    title: "Sales Trend by Category",
});
```

***

### publishChartDW()

> **publishChartDW**(`chartId`, `options?`): `Promise`\<`void` \| `Response`\>

Defined in: [journalism-dataviz/src/dataviz/publishChartDW.ts:35](https://github.com/nshiab/journalism-dataviz/blob/v1.0.27/src/dataviz/publishChartDW.ts#L35)

Publishes a specified Datawrapper chart, table, or map. This function streamlines the process of making your Datawrapper visualizations live, allowing for automated deployment and updates. It handles authentication using an API key, which can be provided via environment variables or directly through options.

#### Parameters

##### chartId

`string`

The unique ID of the Datawrapper chart, table, or map to be published. This ID can be found in the Datawrapper URL or dashboard.

##### options?

Optional parameters to configure the publishing process.

###### apiKey?

`string`

The name of the environment variable that stores your Datawrapper API key (e.g., `"DATAWRAPPER_KEY"`). If not provided, the function defaults to looking for the `DATAWRAPPER_KEY` environment variable.

###### returnResponse?

`boolean`

If `true`, the function will return the full `Response` object from the Datawrapper API call. This can be useful for debugging or for more detailed handling of the API response. Defaults to `false`.

#### Returns

`Promise`\<`void` \| `Response`\>

A Promise that resolves to `void` if `returnResponse` is `false` (default), or a `Response` object if `returnResponse` is `true`.

#### Examples

```ts
// Publish a Datawrapper chart with a given ID.
const chartID = "myChartId";
await publishChartDW(chartID);
console.log(`Chart ${chartID} published successfully.`);
```

```ts
// If your Datawrapper API key is stored under a different environment variable name (e.g., `DW_API_KEY`).
const customApiKeyChartID = "anotherChartId";
await publishChartDW(customApiKeyChartID, { apiKey: "DW_API_KEY" });
console.log(`Chart ${customApiKeyChartID} published using custom API key.`);
```

```ts
// Get the full HTTP response object after publishing.
const chartIDForResponse = "yetAnotherChartId";
const response = await publishChartDW(chartIDForResponse, { returnResponse: true });
console.log(`Response status for ${chartIDForResponse}: ${response?.status}`);
```

***

### rewind()

> **rewind**\<`T`\>(`object`): `T`

Defined in: [journalism-dataviz/src/dataviz/rewind.ts:105](https://github.com/nshiab/journalism-dataviz/blob/v1.0.27/src/dataviz/rewind.ts#L105)

Rewinds the winding order of the specified GeoJSON object to be clockwise. It is based on the D3-geo library's winding order conventions.

#### Type Parameters

##### T

`T`

#### Parameters

##### object

`T`

A GeoJSON geometry, feature, feature collection, or null.

#### Returns

`T`

A rewound copy; non-polygon geometries are returned unchanged. Polygon coordinates are two-dimensional.

#### Examples

```ts
// Rewind a FeatureCollection.
const featureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: [[[-10, -10], [-10, 10], [10, 10], [10, -10], [-10, -10]]]
      }
    }
  ]
};
const rewoundFeatureCollection = rewind(featureCollection);
```

```ts
// Rewind a GeoJSON Feature containing a Polygon geometry.
const feature = {
  type: "Feature",
  properties: { name: "Example Area" },
  geometry: {
    type: "Polygon",
    coordinates: [[[-5, -5], [-5, 5], [5, 5], [5, -5], [-5, -5]]]
  }
};
const rewoundFeature = rewind(feature);
console.log(rewoundFeature);
```

***

### saveChart()

> **saveChart**\<`T`\>(`data`, `chart`, `path`, `options?`): `Promise`\<`void`\>

Defined in: [journalism-dataviz/src/dataviz/saveChart.ts:53](https://github.com/nshiab/journalism-dataviz/blob/v1.0.27/src/dataviz/saveChart.ts#L53)

Saves an [Observable Plot](https://github.com/observablehq/plot) chart or map as a PNG or SVG file.
The chart function can return an SVG or HTML element directly or through a promise.
The rendering environment remains available until the chart function finishes.
Concurrent saves are processed one at a time to protect that environment.
Calling `saveChart` from inside its own chart function is not supported and rejects with an error.

#### Type Parameters

##### T

`T`

The type of data passed unchanged to the chart function.

#### Parameters

##### data

`T`

The data passed to the chart function.

##### chart

(`data`) => `SVGSVGElement` \| `HTMLElement` \| `Promise`\<`SVGSVGElement` \| `HTMLElement`\>

A synchronous or asynchronous function returning an SVG or HTML element representing the chart or map.

##### path

`string`

The output file path. The extension must be `.png` or `.svg`.

##### options?

Optional settings to customize the chart's appearance.

###### dark?

`boolean`

If `true`, renders the chart with a dark theme. Defaults to `false`.

###### style?

`string`

A CSS string inserted into the generated SVG.

#### Returns

`Promise`\<`void`\>

A promise that resolves after the file has been saved, or rejects if the chart function or saving fails.

#### Examples

```ts
import { dot, plot } from "@observablehq/plot";

const data = [{ year: 2024, value: 10 }, { year: 2025, value: 15 }];
await saveChart(
  data,
  (rows) => plot({ marks: [dot(rows, { x: "year", y: "value" })] }),
  "output/chart.png",
);
```

```ts
// Load Observable Plot asynchronously before creating the chart.
const data = [{ year: 2024, value: 10 }, { year: 2025, value: 15 }];
await saveChart(
  data,
  async (rows) => {
    const { dot, plot } = await import("@observablehq/plot");
    return plot({ marks: [dot(rows, { x: "year", y: "value" })] });
  },
  "output/chart.svg",
  { dark: true, style: ".chart-title { font-size: 24px; }" },
);
```

***

### updateAnnotationsDW()

> **updateAnnotationsDW**(`chartId`, `annotations`, `options?`): `Promise`\<`void` \| `Response`\>

Defined in: [journalism-dataviz/src/dataviz/updateAnnotationsDW.ts:84](https://github.com/nshiab/journalism-dataviz/blob/v1.0.27/src/dataviz/updateAnnotationsDW.ts#L84)

Updates annotations on a Datawrapper chart. This function allows you to programmatically add, modify, or remove text and line annotations on your Datawrapper visualizations, providing precise control over highlighting specific data points or trends.

This function supports various annotation properties, including position, text content, styling (bold, italic, color, size), alignment, and connector lines with customizable arrowheads.

Authentication is handled via an API key, which can be provided through environment variables (`DATAWRAPPER_KEY`) or explicitly in the options. For detailed information on Datawrapper annotations and their properties, refer to the official Datawrapper API documentation.

Annotation fields:
- `x`: The x-coordinate of the annotation's position on the chart.
- `y`: The y-coordinate of the annotation's position on the chart.
- `text`: The text content of the annotation.
- `bg`: If `true`, the annotation text will have a background. Defaults to `false`.
- `dx`: The horizontal offset of the annotation text from its `x` coordinate, in pixels. Defaults to `0`.
- `dy`: The vertical offset of the annotation text from its `y` coordinate, in pixels. Defaults to `0`.
- `bold`: If `true`, the annotation text will be bold. Defaults to `false`.
- `size`: The font size of the annotation text in pixels. Defaults to `12`.
- `align`: The alignment of the annotation text relative to its `x` and `y` coordinates. Can be `"tl"` (top-left), `"tc"` (top-center), `"tr"` (top-right), `"ml"` (middle-left), `"mc"` (middle-center), `"mr"` (middle-right), `"bl"` (bottom-left), `"bc"` (bottom-center), or `"br"` (bottom-right). Defaults to `"mr"`.
- `color`: The color of the annotation text (e.g., `"#FF0000"`, `"red"`). Defaults to `"#8C8C8C"`.
- `width`: The maximum width of the annotation text box in pixels. Text will wrap if it exceeds this width. Defaults to `20`.
- `italic`: If `true`, the annotation text will be italic. Defaults to `false`.
- `underline`: If `true`, the annotation text will be underlined. Defaults to `false`.
- `showMobile`: If `true`, the annotation will be visible on mobile devices. Defaults to `true`.
- `showDesktop`: If `true`, the annotation will be visible on desktop devices. Defaults to `true`.
- `mobileFallback`: If `true`, the annotation will be displayed as a simple text label on mobile if it's too complex. Defaults to `false`.
- `connectorLine`: An object defining the properties of a connector line from the annotation to a data point.
- `connectorLine.type`: The type of the connector line. Can be `"straight"`, `"curveRight"`, or `"curveLeft"`. Defaults to `"straight"`.
- `connectorLine.circle`: If `true`, a circle will be drawn at the end of the connector line. Defaults to `false`.
- `connectorLine.stroke`: The stroke width of the connector line. Can be `1`, `2`, or `3`. Defaults to `1`.
- `connectorLine.enabled`: If `true`, the connector line will be drawn. Defaults to `false`.
- `connectorLine.arrowHead`: The style of the arrowhead. Can be `"lines"`, `"triangle"`, or `false` (no arrowhead). Defaults to `"lines"`.
- `connectorLine.circleStyle`: The style of the circle at the end of the connector line. Defaults to `"solid"`.
- `connectorLine.circleRadius`: The radius of the circle at the end of the connector line. Defaults to `10`.
- `connectorLine.inheritColor`: If `true`, the connector line will inherit the annotation's text color. Defaults to `false`.
- `connectorLine.targetPadding`: The padding between the end of the connector line and the target data point. Defaults to `4`.

#### Parameters

##### chartId

`string`

The ID of the Datawrapper chart to update. This ID can be found in the Datawrapper URL or dashboard.

##### annotations

`object`[]

An array of annotation objects. Each object defines a single annotation with its properties. Required properties for each annotation are `x`, `y`, and `text`.

##### options?

###### apiKey?

`string`

The name of the environment variable that stores your Datawrapper API key. If not provided, the function defaults to looking for `DATAWRAPPER_KEY`.

###### returnResponse?

`boolean`

If `true`, the function will return the full `Response` object from the Datawrapper API call. This can be useful for debugging or for more detailed handling of the API response. Defaults to `false`.

#### Returns

`Promise`\<`void` \| `Response`\>

A Promise that resolves to `void` if `returnResponse` is `false` (default), or a `Response` object if `returnResponse` is `true`.

#### Examples

```ts
// Update annotations on a Datawrapper chart with a simple text annotation and one with an arrow.

const chartID = "myChartId";
const myAnnotations = [
   {
       "x": "2024/08/30 01:52",
       "y": "14496235",
       "text": "This is an annotation!"
   },
   {
       "x": "2024/06/29",
       "y": "15035128",
       "dy": 50,
       "text": "This is also some text, but with an arrow!",
       "connectorLine": {
           "enabled": true,
           "type": "straight",
           "arrowHead": "lines"
       },
       "mobileFallback": false
   }
];

await updateAnnotationsDW(chartID, myAnnotations);
console.log(`Annotations updated for chart ${chartID}.`);
```

```ts
// If your Datawrapper API key is stored under a different environment variable name (e.g., `DW_API_KEY`).
const customApiKeyChartID = "anotherChartId";
const annotationsForCustomKey = [
  { x: "2024/01/01", y: "100", text: "Custom API Key Test" }
];
await updateAnnotationsDW(customApiKeyChartID, annotationsForCustomKey, { apiKey: "DW_API_KEY" });
console.log(`Annotations updated for chart ${customApiKeyChartID} using custom API key.`);
```

***

### updateDataDW()

> **updateDataDW**(`chartId`, `data`, `options?`): `Promise`\<`void` \| `Response`\>

Defined in: [journalism-dataviz/src/dataviz/updateDataDW.ts:126](https://github.com/nshiab/journalism-dataviz/blob/v1.0.27/src/dataviz/updateDataDW.ts#L126)

Updates the data of a specified Datawrapper chart, table, or map. This function is essential for keeping your Datawrapper visualizations dynamic and up-to-date with the latest information. It supports both CSV data for standard charts and tables, and JSON data for more complex visualizations like locator maps.

Datawrapper is a powerful tool for creating interactive data visualizations. This function allows for programmatic updates, which is ideal for automated data pipelines, dashboards, or applications that require fresh data to be reflected in visualizations without manual intervention.

Authentication is handled via an API key, which can be provided through environment variables (`process.env.DATAWRAPPER_KEY`) or explicitly in the options. The `Content-Type` header for the API request is automatically set based on whether the data is CSV or JSON.

#### Parameters

##### chartId

`string`

The unique ID of the Datawrapper chart, table, or map to update. This ID can be found in the Datawrapper URL or dashboard.

##### data

`string`

The data to update the chart, table, or map with. For standard charts and tables, this should be a CSV formatted string. For locator maps, this should be a JSON string representing the map's data (e.g., markers, areas).

##### options?

Optional parameters to configure the data update process.

###### apiKey?

`string`

The name of the environment variable that stores your Datawrapper API key (e.g., `"DATAWRAPPER_KEY"`). If not provided, the function defaults to looking for `process.env.DATAWRAPPER_KEY`.

###### returnResponse?

`boolean`

If `true`, the function will return the full `Response` object from the Datawrapper API call. This can be useful for debugging or for more detailed handling of the API response. Defaults to `false`.

#### Returns

`Promise`\<`void` \| `Response`\>

A Promise that resolves to `void` if `returnResponse` is `false` (default), or a `Response` object if `returnResponse` is `true`.

#### Examples

```ts
// Update the data of a Datawrapper chart or table with CSV formatted data.
import { updateDataDW, dataAsCsv } from "journalism";

const chartID = "myChartId";
const data = [
 { salary: 75000, hireDate: new Date("2022-12-15") },
 { salary: 80000, hireDate: new Date("2023-01-20") },
];
const dataForChart = dataAsCsv(data);

await updateDataDW(chartID, dataForChart);
console.log(`Data updated for chart ${chartID}.`);
```

```ts
// Update the data of a Datawrapper locator map with GeoJSON data.

const mapID = "myMapId";
const geojson = {
 "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          [
            [
              11.127454320325711,
              20.34856592751224
            ],
            [
              11.127454320325711,
              -13.781306861158996
            ],
            [
              55.68071875381875,
              -13.781306861158996
            ],
            [
              55.68071875381875,
              20.34856592751224
            ],
            [
              11.127454320325711,
              20.34856592751224
            ]
          ]
        ],
        "type": "Polygon"
      }
    }
  ]
};

const dataForMap = {
  "markers": [
    {
      "id": "m1",
      "type": "area",
      "visible": true,
      "exactShape": true,
      "fill": true,
      "stroke": true,
      "properties": {
        "fill": "#15607a",
        "fill-opacity": 0.2,
        "stroke": "#15607a",
        "stroke-width": 1,
        "stroke-opacity": 1,
        "stroke-dasharray": "100000",
        "pattern": "solid",
        "pattern-line-width": 2,
        "pattern-line-gap": 2
      },
      "feature": geojson
    }
  ]
};

await updateDataDW(mapID, JSON.stringify(dataForMap));
console.log(`Data updated for map ${mapID}.`);
```

```ts
// If your API key is stored under a different name in process.env, use the options.
const chartIDCustomKey = "anotherChartId";
const dataForCustomKey = "col1,col2\nval1,val2";
await updateDataDW(chartIDCustomKey, dataForCustomKey, { apiKey: "DW_KEY" });
console.log(`Data updated for chart ${chartIDCustomKey} using custom API key.`);
```

```ts
// Attempting to update data without a configured API key will throw an error.
try {
  await updateDataDW("someChartId", "data", { apiKey: "NON_EXISTENT_KEY" });
} catch (error) {
  console.error("Error:", error.message);
  // Expected output: "Error: process.env.NON_EXISTENT_KEY is undefined or ''"
}
```

#### Throws

If the API key is not found, if the Datawrapper API returns an error status (e.g., invalid chart ID, authentication failure, malformed data), or if there's a network issue.

***

### updateInfoDW()

> **updateInfoDW**(`chartId`, `metadata`, `options?`): `Promise`\<`void` \| `Response`\>

Defined in: [journalism-dataviz/src/dataviz/updateInfoDW.ts:47](https://github.com/nshiab/journalism-dataviz/blob/v1.0.27/src/dataviz/updateInfoDW.ts#L47)

Updates the title, description, and notes of a Datawrapper chart, table, or map in one API request.

Only supplied fields are updated. Omit a field or pass `undefined` to preserve its existing value; pass an empty string to clear it. At least one field must be supplied. Other chart settings are preserved by Datawrapper's partial metadata update.

The API key is read from `DATAWRAPPER_KEY` by default. This function updates the draft visualization; call `publishChartDW()` afterward to publish the changes.

#### Parameters

##### chartId

`string`

The ID of the Datawrapper chart, table, or map to update.

##### metadata

The fields to update. At least one must be supplied.

###### description?

`string`

The description below the title, stored as `metadata.describe.intro`. An empty string clears it.

###### note?

`string`

The notes in the visualization's footer, stored as `metadata.annotate.notes`. An empty string clears them.

###### title?

`string`

The visualization's headline. An empty string clears it.

##### options?

Optional authentication and response settings.

###### apiKey?

`string`

The name of the environment variable containing the API key. Defaults to `"DATAWRAPPER_KEY"`.

###### returnResponse?

`boolean`

If `true`, returns the unconsumed response without checking its status. Defaults to `false`.

#### Returns

`Promise`\<`void` \| `Response`\>

A promise resolving to `void`, or to the raw `Response` when requested. By default, non-200 responses throw an error.

#### Examples

```ts
import { updateInfoDW } from "@nshiab/journalism-dataviz";

await updateInfoDW("abcde", {
  title: "Sales keep rising",
  description: "Monthly revenue since January 2025.",
  note: "Source: company filings.",
});
```

```ts
// Clear the notes while preserving the title and description.
await updateInfoDW("abcde", { note: "" }, { apiKey: "DW_KEY" });
```

```ts
// Inspect the raw response, including non-200 responses.
const response = await updateInfoDW("abcde", { title: "New title" }, {
  returnResponse: true,
});
console.log(response?.status);
```

***

### ~~updateNotesDW()~~

> **updateNotesDW**(`chartId`, `note`, `options?`): `Promise`\<`void` \| `Response`\>

Defined in: [journalism-dataviz/src/dataviz/updateNotesDW.ts:30](https://github.com/nshiab/journalism-dataviz/blob/v1.0.27/src/dataviz/updateNotesDW.ts#L30)

Updates the notes field of a Datawrapper chart, table, or map.

This function delegates to `updateInfoDW()` and logs a deprecation warning once per module instance. Use `updateInfoDW(chartId, { note }, options)` instead.

#### Parameters

##### chartId

`string`

The ID of the Datawrapper chart, table, or map to update.

##### note

`string`

The notes text. An empty string clears the notes.

##### options?

Optional authentication and response settings.

###### apiKey?

`string`

The name of the environment variable containing the API key. Defaults to `"DATAWRAPPER_KEY"`.

###### returnResponse?

`boolean`

If `true`, returns the unconsumed response without checking its status. Defaults to `false`.

#### Returns

`Promise`\<`void` \| `Response`\>

A promise resolving to `void`, or to the raw `Response` when requested. By default, non-200 responses throw an error.

#### Example

```ts
// Existing calls still work, but emit a deprecation warning.
await updateNotesDW("abcde", "Last updated today.");

// Preferred replacement, including a custom API-key environment variable.
await updateInfoDW("abcde", { note: "Last updated today." }, {
  apiKey: "DW_KEY",
});
```

#### Deprecated

Use `updateInfoDW(chartId, { note }, options)` instead. This function will be removed in the next major version.

## Extras

### DurationTracker

Defined in: [journalism-extras/src/extras/DurationTracker.ts:31](https://github.com/nshiab/journalism-extras/blob/v1.0.12/src/extras/DurationTracker.ts#L31)

A utility class for tracking the progress and estimating the remaining time of iterative processes. It calculates the average duration of completed iterations and uses this to project the time left for the remaining tasks. This is particularly useful for long-running operations where users need feedback on progress.

The tracker provides methods to mark the start of an iteration and to log the estimated remaining time. The log message can be customized with a prefix and suffix.

#### Example

```ts
// Basic usage: Tracking a loop with 100 iterations.
const totalItems = 100;
const tracker = new DurationTracker(totalItems, {
  prefix: "Processing... Estimated time remaining: ",
  suffix: " until completion."
});

for (let i = 0; i < totalItems; i++) {
  tracker.start();
  // Simulate some work
  await new Promise(resolve => setTimeout(resolve, Math.random() * 100));
  tracker.log();
}
console.log("Processing complete!");
```

#### Param

**length**

The total number of iterations or items to process. This is used to calculate the remaining items.

#### Param

**options**

Optional settings for the tracker.

#### Param

**options.prefix**

A string to prepend to the logged remaining time message. Defaults to an empty string.

#### Param

**options.suffix**

A string to append to the logged remaining time message. Defaults to an empty string.

#### Constructors

##### Constructor

> **new DurationTracker**(`length`, `options?`): [`DurationTracker`](#durationtracker)

Defined in: [journalism-extras/src/extras/DurationTracker.ts:50](https://github.com/nshiab/journalism-extras/blob/v1.0.12/src/extras/DurationTracker.ts#L50)

Creates an instance of DurationTracker.

###### Parameters

###### length

`number`

The total number of iterations.

###### options?

Optional settings for the tracker.

###### prefix?

`string`

###### suffix?

`string`

###### Returns

[`DurationTracker`](#durationtracker)

#### Properties

##### length

> **length**: `number`

Defined in: [journalism-extras/src/extras/DurationTracker.ts:39](https://github.com/nshiab/journalism-extras/blob/v1.0.12/src/extras/DurationTracker.ts#L39)

The total number of iterations.

##### prefix

> **prefix**: `string`

Defined in: [journalism-extras/src/extras/DurationTracker.ts:41](https://github.com/nshiab/journalism-extras/blob/v1.0.12/src/extras/DurationTracker.ts#L41)

Optional prefix for the log message.

##### suffix

> **suffix**: `string`

Defined in: [journalism-extras/src/extras/DurationTracker.ts:43](https://github.com/nshiab/journalism-extras/blob/v1.0.12/src/extras/DurationTracker.ts#L43)

Option suffix for the log message.

#### Methods

##### log()

> **log**(): `void`

Defined in: [journalism-extras/src/extras/DurationTracker.ts:93](https://github.com/nshiab/journalism-extras/blob/v1.0.12/src/extras/DurationTracker.ts#L93)

Logs the estimated remaining time based on the average duration of previous iterations.

###### Returns

`void`

###### Example

```ts
const totalItems = 100;
const tracker = new DurationTracker(totalItems);
for (let i = 0; i < totalItems; i++) {
  tracker.start();
  // Simulate some work
  await new Promise(resolve => setTimeout(resolve, Math.random() * 100));
  tracker.log(); // Log the estimated remaining time for each iteration
}
```

##### start()

> **start**(): `void`

Defined in: [journalism-extras/src/extras/DurationTracker.ts:74](https://github.com/nshiab/journalism-extras/blob/v1.0.12/src/extras/DurationTracker.ts#L74)

Starts the timer for the current iteration.

###### Returns

`void`

###### Example

```ts
const totalItems = 100;
const tracker = new DurationTracker(totalItems);
for (let i = 0; i < totalItems; i++) {
  tracker.start(); // Mark the start of each iteration
  // Simulate some work
  await new Promise(resolve => setTimeout(resolve, Math.random() * 100));
  tracker.log();
}
```

***

### createDirectory()

> **createDirectory**(`path`): `void`

Defined in: [journalism-extras/src/extras/createDirectory.ts:25](https://github.com/nshiab/journalism-extras/blob/v1.0.12/src/extras/createDirectory.ts#L25)

Recursively creates a directory structure. This function is useful for ensuring that a path exists before writing a file to it.

The function will not throw an error if the directory already exists. It can also accept a full file path, in which case it will create all the parent directories, ignoring the filename portion.

#### Parameters

##### path

`string`

The path of the directory to create. This can be a path to a directory or a full path to a file.

#### Returns

`void`

#### Examples

```ts
// Create a simple directory
createDirectory("./output/data");
// This will create the 'output' and 'data' folders if they don't exist.
```

```ts
// Create a directory from a file path
createDirectory("./output/data/my-file.json");
// This will create the './output/data' directory structure. The 'my-file.json' part is ignored.
```

***

### getId()

> **getId**(`length?`): `string`

Defined in: [journalism-extras/src/extras/getId.ts:26](https://github.com/nshiab/journalism-extras/blob/v1.0.12/src/extras/getId.ts#L26)

Generates a unique ID string composed of letters and numbers, without spaces or special characters. By default, the ID has a length of 6 characters. While handy for general use, it is not cryptographically secure, meaning it should not be used for security-sensitive applications where true randomness and unpredictability are required.

The function ensures uniqueness by keeping track of previously generated IDs within the current session. If a collision occurs (which is highly unlikely for reasonable lengths), it will attempt to generate a new ID. For very small `length` values, repeated collisions might trigger a warning to suggest increasing the length to maintain uniqueness.

#### Parameters

##### length?

`number`

The desired length of the generated ID. Defaults to 6.

#### Returns

`string`

A unique string ID.

#### Examples

```ts
// Generate a default length ID (6 characters).
const id = getId();
console.log(id); // e.g., 'a1B2c3'
```

```ts
// Generate an ID with a specified length (e.g., 10 characters).
const customId = getId(10);
console.log(customId); // e.g., 'a1B2c3D4e5'
```

***

### reencode()

> **reencode**(`inputFilePath`, `outputFilePath`, `fromEncoding`, `toEncoding`, `options?`): `Promise`\<`void`\>

Defined in: [journalism-extras/src/extras/reencode.ts:36](https://github.com/nshiab/journalism-extras/blob/v1.0.12/src/extras/reencode.ts#L36)

Converts a file from one character encoding to another. This function is particularly optimized for handling large files.

Character encoding is crucial for ensuring that text data is displayed correctly across different systems and applications. This function helps resolve issues related to garbled text when files are created or read with different encoding standards.

#### Parameters

##### inputFilePath

`string`

The absolute path to the input file that needs to be re-encoded.

##### outputFilePath

`string`

The absolute path where the converted file will be saved.

##### fromEncoding

`string`

The character encoding of the input file (e.g., 'windows-1252', 'latin1', 'ISO-8859-1').

##### toEncoding

`string`

The desired character encoding for the output file (e.g., 'utf-8').

##### options?

Optional configuration settings for the re-encoding process.

###### addBOM?

`boolean`

If `true`, a Byte Order Mark (BOM) will be added to the output file if the `toEncoding` is UTF-8. A BOM can help some applications correctly identify the UTF-8 encoding. Defaults to `false`.

###### bufferSize?

`number`

The size of the read buffer in kilobytes (KB). A larger buffer can improve performance for very large files but consumes more memory. Defaults to `256` KB.

#### Returns

`Promise`\<`void`\>

A Promise that resolves when the file has been successfully re-encoded and saved.

#### Examples

```ts
// Convert a CSV file from Windows-1252 to UTF-8 encoding.
await reencode('input.csv', 'output.csv', 'windows-1252', 'utf-8');
console.log("File re-encoded successfully.");
```

```ts
// Re-encode a large file with a larger buffer size and add a UTF-8 Byte Order Mark (BOM).
await reencode('large_input.csv', 'large_output.csv', 'latin1', 'utf-8', {
  bufferSize: 1024, // 1MB buffer
  addBOM: true,
});
console.log("Large file re-encoded with custom buffer and BOM.");
```

***

### removeDirectory()

> **removeDirectory**(`path`): `void`

Defined in: [journalism-extras/src/extras/removeDirectory.ts:25](https://github.com/nshiab/journalism-extras/blob/v1.0.12/src/extras/removeDirectory.ts#L25)

Removes a directory and all its contents recursively.

**Caution**: Use this function with care, as it permanently deletes files and directories without sending them to the recycle bin or trash. Ensure that the `path` provided is correct to avoid accidental data loss.

#### Parameters

##### path

`string`

The absolute or relative path to the directory to be removed.

#### Returns

`void`

`void`

#### Examples

```ts
// Removes the directory and all its contents recursively.
removeDirectory("./data/temp");
console.log("Directory removed successfully.");
```

```ts
// Attempting to remove a directory that does not exist will not throw an error due to `force: true`.
removeDirectory("./non-existent-folder");
console.log("Attempted to remove non-existent folder (no error thrown).");
```

***

### sleep()

> **sleep**(`ms`, `options?`): `Promise`\<`void`\>

Defined in: [journalism-extras/src/extras/sleep.ts:46](https://github.com/nshiab/journalism-extras/blob/v1.0.12/src/extras/sleep.ts#L46)

Pauses the execution of an asynchronous function for a specified duration. This utility is useful for introducing delays in workflows, throttling requests, or simulating real-world latencies.

It can also adjust the pause duration by subtracting any time already elapsed since a given start point, ensuring more precise delays. This is particularly useful for respecting API rate limits, ensuring that the total time spent between requests meets a minimum threshold without over-waiting if the preceding operations took some time. If the elapsed time is greater than or equal to `ms`, the function will resolve immediately without pausing.

#### Parameters

##### ms

`number`

The number of milliseconds to pause execution for. This is the target duration of the sleep.

##### options?

Optional parameters to customize the sleep behavior.

###### log?

`boolean`

If `true`, the function will log messages to the console indicating the sleep duration or if no sleep was needed. Defaults to `false`.

###### start?

`Date`

A `Date` object representing a starting timestamp. If provided, the function will subtract the time elapsed since this `start` time from the `ms` duration. This is particularly useful for respecting API rate limits.

#### Returns

`Promise`\<`void`\>

A Promise that resolves after the specified (or adjusted) duration has passed.

#### Examples

```ts
// Pause execution for 1 second.
await sleep(1000);
console.log("1 second has passed.");
```

```ts
// Pause execution for 1 second, but subtract any time already elapsed since `start`.
const start = new Date();
// Simulate a task that takes some time (e.g., 200ms)
await new Promise(resolve => setTimeout(resolve, 200));
await sleep(1000, { start }); // This will pause for approximately 800ms
console.log("Execution resumed after approximately 1 second from start.");
```

```ts
// If the elapsed time already exceeds the requested sleep duration, no actual sleep occurs.
const startTime = new Date();
// Simulate a long-running task (e.g., 150ms)
await new Promise(resolve => setTimeout(resolve, 150));
await sleep(100, { start: startTime, log: true });
// Expected console output: "No need to sleep, already took 150 ms." (or similar)
```

```ts
// Pause execution for 2 seconds and log the sleep duration.
await sleep(2000, { log: true });
// Expected console output: "Sleeping for 2 sec, 0 ms..." (or similar)
```

***

### unzip()

> **unzip**(`zippedFile`, `output`, `options?`): `void`

Defined in: [journalism-extras/src/extras/unzip.ts:26](https://github.com/nshiab/journalism-extras/blob/v1.0.12/src/extras/unzip.ts#L26)

Unzips a given zipped file to a specified output directory. This function provides a convenient way to extract compressed archives, commonly used for distributing data or software. It offers an option to delete the original zipped file after successful extraction, which is useful for cleanup operations.

#### Parameters

##### zippedFile

`string`

The absolute or relative path to the zipped file (`.zip`) to be extracted.

##### output

`string`

The absolute or relative path to the directory where the contents of the zipped file will be extracted. If the directory does not exist, it will be created.

##### options?

Optional settings for the unzip operation.

###### deleteZippedFile?

`boolean`

If `true`, the original zipped file will be deleted from the filesystem after its contents have been successfully extracted. Defaults to `false`.

#### Returns

`void`

`void`

#### Examples

```ts
// Unzip a file to a specified output directory.
unzip('path/to/file.zip', 'path/to/output');
console.log("File unzipped successfully.");
```

```ts
// Unzip a file and then delete the original zipped file.
unzip('path/to/another-file.zip', 'path/to/another-output', { deleteZippedFile: true });
console.log("File unzipped and original zipped file deleted.");
```

***

### zip()

> **zip**(`files`, `zipFile`): `void`

Defined in: [journalism-extras/src/extras/zip.ts:24](https://github.com/nshiab/journalism-extras/blob/v1.0.12/src/extras/zip.ts#L24)

Compresses one or more files or an entire folder into a single zip archive. This function is useful for bundling multiple assets, preparing data for transfer, or creating backups.

You can specify individual files to be added to the archive, or provide a path to a directory, in which case all its contents will be compressed. The function automatically creates the necessary directory structure for the output zip file if it doesn't already exist.

#### Parameters

##### files

`string` \| `string`[]

A string representing the path to a folder, or an array of strings representing paths to individual files. These are the items to be included in the zip archive.

##### zipFile

`string`

The absolute or relative path, including the filename and `.zip` extension, where the created zip archive will be saved (e.g., `"./archives/my-data.zip"`).

#### Returns

`void`

`void`

#### Example

```ts
// Compressing multiple files into a zip archive.
zip(['file1.txt', 'file2.txt'], 'archive.zip');
console.log("Files zipped successfully.");

// Compressing a folder into a zip archive.
zip('path/to/folder', 'folder-archive.zip');
console.log("Folder zipped successfully.");
```

## Finance

### adjustToInflation()

> **adjustToInflation**(`amount`, `amountCPI`, `targetCPI`, `options?`): `number`

Defined in: [journalism-finance/src/finance/adjustToInflation.ts:36](https://github.com/nshiab/journalism-finance/blob/v2.0.3/src/finance/adjustToInflation.ts#L36)

Adjusts a monetary amount for inflation using the Consumer Price Index (CPI).

#### Parameters

##### amount

`number`

The initial amount of money to be adjusted.

##### amountCPI

`number`

The Consumer Price Index (CPI) corresponding to the period of the `amount`.

##### targetCPI

`number`

The Consumer Price Index (CPI) for the period to which the amount is being adjusted.

##### options?

Optional settings for the calculation.

###### decimals?

`number`

The number of decimal places to which the resulting adjusted amount should be rounded. If not specified, the result will not be rounded.

#### Returns

`number`

#### Throws

If either CPI value is not a positive finite number.

#### Examples

```ts
// Basic usage: Adjusting $100 from a time when the CPI was 120 to a time when the CPI is 150.
const adjustedValue = adjustToInflation(100, 120, 150);
console.log(adjustedValue); // Expected output: 125
```

```ts
// With rounding to two decimal places
const adjustedValueRounded = adjustToInflation(100, 120, 150.5, { decimals: 2 });
console.log(adjustedValueRounded); // Expected output: 125.42
```

```ts
// Calculating the value of a 1990 salary in 2023 terms
const salary1990 = 45000;
const cpi1990 = 60.5; // Hypothetical CPI for 1990
const cpi2023 = 135.2; // Hypothetical CPI for 2023
const adjustedSalary = adjustToInflation(salary1990, cpi1990, cpi2023, { decimals: 0 });
console.log(`A $45,000 salary in 1990 is equivalent to approximately ${adjustedSalary} in 2023.`);
// Expected output: "A $45,000 salary in 1990 is equivalent to approximately $100149 in 2023."
```

***

### decodeMonteCarloMonthlyIterations()

> **decodeMonteCarloMonthlyIterations**(`c`): `object`[]

Defined in: [journalism-finance/src/finance/decodeMonteCarloResults.ts:23](https://github.com/nshiab/journalism-finance/blob/v2.0.3/src/finance/decodeMonteCarloResults.ts#L23)

Decodes a columnar `monthlyIterations` result back into a flat object array.

**⚠️ Memory Warning:** This function can allocate millions of small objects during large simulations.
Proceed with caution or use pagination/UI virtualization if rendering these arrays to the DOM.

Keys are `"category|group|variable"`. Each `Float64Array` has size `iterations × months`.
Access: `data[key][iteration * cols + monthIndex]`.

Records where `amount === 0` are omitted from the output, matching the zero-filtering
applied by the `onRecord` callback during data collection.

#### Parameters

##### c

###### cols

`number`

###### data

`Record`\<`string`, `Float64Array`\>

###### keys

`string`[]

###### rows

`number`

#### Returns

`object`[]

***

### decodeMonteCarloMonthlyQuantiles()

> **decodeMonteCarloMonthlyQuantiles**(`c`, `quantiles`): `object`[]

Defined in: [journalism-finance/src/finance/decodeMonteCarloResults.ts:112](https://github.com/nshiab/journalism-finance/blob/v2.0.3/src/finance/decodeMonteCarloResults.ts#L112)

Decodes a columnar `monthlyQuantiles` result back into a flat record array.

Keys are `"category|group|variable"`. Layout: `data[key][qIdx * cols + monthIndex]`
where `rows` = number of quantile levels and `cols` = number of months.

#### Parameters

##### c

The `ColumnarResult` returned as `monthlyQuantiles` by `simulateRentVsBuyMonteCarlo`.

###### cols

`number`

###### data

`Record`\<`string`, `Float64Array`\>

###### keys

`string`[]

###### rows

`number`

##### quantiles

`number`[]

The same quantile levels passed to `options.monthlyQuantiles` (e.g. `[0, 0.5, 1]`).

#### Returns

`object`[]

***

### decodeMonteCarloValues()

> **decodeMonteCarloValues**(`c`): `object`[]

Defined in: [journalism-finance/src/finance/decodeMonteCarloResults.ts:72](https://github.com/nshiab/journalism-finance/blob/v2.0.3/src/finance/decodeMonteCarloResults.ts#L72)

Decodes a columnar `values` result back into the original object-array shape.

Keys are variable names. Each `Float64Array` has size `iterations × months`.

#### Parameters

##### c

###### cols

`number`

###### data

`Record`\<`string`, `Float64Array`\>

###### keys

`string`[]

###### rows

`number`

#### Returns

`object`[]

***

### decodeMonteCarloWinners()

> **decodeMonteCarloWinners**(`w`): `object`[]

Defined in: [journalism-finance/src/finance/decodeMonteCarloResults.ts:205](https://github.com/nshiab/journalism-finance/blob/v2.0.3/src/finance/decodeMonteCarloResults.ts#L205)

Decodes `category` bytes into category names
(0 = "renter", 1 = "buyerFixed", 2 = "buyerVariable").
Records are returned in iteration order (row 0 = iteration 0).

#### Parameters

##### w

###### amount

`Float64Array`

Final `amount` of the winning scenario for each iteration.

###### category

`Uint8Array`

Winning scenario category encoded as a byte.
Use `decodeMonteCarloWinners` to decode the category names.

###### monthIndex

`Float64Array`

Final `monthIndex` of the winning scenario for each iteration.

#### Returns

`object`[]

***

### decodeMonteCarloWinnerSnapshots()

> **decodeMonteCarloWinnerSnapshots**(`ws`): `object`[]

Defined in: [journalism-finance/src/finance/decodeMonteCarloResults.ts:162](https://github.com/nshiab/journalism-finance/blob/v2.0.3/src/finance/decodeMonteCarloResults.ts#L162)

Decodes a `winnerSnapshots` result into a flat record array.

Each record represents one 5-year checkpoint (strictly before `numberOfYears`).
`renter`, `buyerFixed`, and `buyerVariable` are win rates strictly in the range [0.01, 0.98] (smoothed to [0.01, 0.01, 0.98] in extreme scenarios) and sum to 1.
The median fields hold the median `winVariable` amount for that category at the checkpoint.

#### Parameters

##### ws

###### buyerFixed

`Float64Array`

Fraction of iterations (strictly in the range [0.01, 0.98]) where the buyerFixed scenario
had the highest `winVariable` at this checkpoint. Win rates are clipped/smoothed to reflect
unmodeled tail risks and prevent deterministic misinterpretation (e.g., [1.0, 0.0, 0.0] becomes [0.98, 0.01, 0.01]).

###### buyerFixedMedian

`Float64Array`

###### buyerVariable

`Float64Array`

Fraction of iterations (strictly in the range [0.01, 0.98]) where the buyerVariable scenario
had the highest `winVariable` at this checkpoint. Win rates are clipped/smoothed to reflect
unmodeled tail risks and prevent deterministic misinterpretation (e.g., [1.0, 0.0, 0.0] becomes [0.98, 0.01, 0.01]).

###### buyerVariableMedian

`Float64Array`

###### renter

`Float64Array`

Fraction of iterations (strictly in the range [0.01, 0.98]) where the renter scenario
had the highest `winVariable` at this checkpoint. Win rates are clipped/smoothed to reflect
unmodeled tail risks and prevent deterministic misinterpretation (e.g., [1.0, 0.0, 0.0] becomes [0.98, 0.01, 0.01]).

###### renterMedian

`Float64Array`

Median `winVariable` amount for each category at each snapshot.

###### snapshotMonths

`number`[]

Month indices of each snapshot (e.g. `[59, 119, 179, 239, 299]` for a 25-year sim, i.e. end of years 5, 10, 15, 20, 25).

#### Returns

`object`[]

***

### getIncomeTax()

> **getIncomeTax**(`employmentIncome`, `province`, `year`, `options?`): `object`

Defined in: [journalism-finance/src/finance/getIncomeTax.ts:996](https://github.com/nshiab/journalism-finance/blob/v2.0.3/src/finance/getIncomeTax.ts#L996)

Calculates a comprehensive breakdown of Canadian federal and provincial income taxes, including capital gains.

Calculation Engine Methodology:

**1. Mandatory Payroll Deductions:**
- Calculates Tier 1 CPP/QPP base contribution (claimed as a Non-Refundable Tax Credit (NRTC)).
- Calculates Tier 1 CPP/QPP enhanced contribution (claimed as a tax deduction).
- Calculates Tier 2 CPP2/QPP2 based on the Yearly Additional Maximum Pensionable Earnings (YAMPE) (claimed as a tax deduction).
- Calculates EI (and QPIP for Quebec residents) up to their respective annual maximum insurable earnings.

**2. Federal Tax & Non-Refundable Tax Credits (NRTCs):**
- Calculates gross federal tax using progressive federal tax brackets.
- Determines the Federal Basic Personal Amount (BPA), applying a linear phase-out for high earners.
- Calculates the Canada Employment Amount (CEA) against employment income up to the annual maximum.
- Aggregates the federal NRTC base (BPA + Base CPP/QPP + EI + QPIP + CEA) and converts it to a credit amount, accounting for the 15% top-up credit rate for amounts above the first bracket threshold.
- Applies the Federal Abatement exclusively for Quebec residents.

**3. Provincial Tax & NRTCs:**
- Calculates gross provincial tax using the specific province's progressive tax brackets.
- **Quebec-Specific:** Applies the Deduction for Workers as an income reduction before tax calculation. Applies the Person Living Alone amount to the NRTC base (if applicable). Uses a decoupled NRTC rate.
- Retrieves the provincial BPA, executing a specific linear phase-out for Manitoba residents, and dynamically mirroring the federal BPA phase-out for Yukon residents.
- Aggregates the provincial NRTC base (Provincial BPA + Base CPP/QPP + EI + QPIP if in Quebec + CEA if in Yukon + Family Tax Benefit if in Manitoba).

**4. Provincial-Specific Modifiers (If Applicable):**
- **B.C. Tax Reduction:** A non-refundable credit for B.C. residents with low-to-moderate taxable income (subject to phase-out).
- **New Brunswick Tax Reduction:** A non-refundable credit for N.B. residents with low-to-moderate taxable income (subject to phase-out).
- **Newfoundland and Labrador Tax Reduction:** A non-refundable credit for N.L. residents with low-to-moderate taxable income (subject to phase-out).
- **Nova Scotia Tax Reduction:** A non-refundable credit for N.S. residents with low-to-moderate taxable income (subject to phase-out).
- **Prince Edward Island Tax Reduction:** A non-refundable credit for P.E.I. residents with low-to-moderate taxable income (subject to phase-out).
- **Ontario Tax Reduction (OTR) & LIFT:** Reduces or eliminates basic Ontario tax for low-income earners, and applies the Low-income Individuals and Families Tax (LIFT) Credit.
- **Ontario Surtax:** Applies a two-tier cascading surtax on net provincial tax in Ontario.
- **Provincial Health Premiums:** Calculates the Ontario Health Premium based on strict taxable income bands, and the Quebec RAMQ premium based on income thresholds.

**5. Capital Gains:**
- Applies a 50% inclusion rate to any provided capital gains.
- Isolates the exact tax burden associated with those capital gains by computing the marginal difference between a "with gains" and "without gains" tax profile.

#### Parameters

##### employmentIncome

`number`

The individual's total gross annual taxable employment income (assumes T4 income).

##### province

`"Newfoundland and Labrador"` \| `"Prince Edward Island"` \| `"Nova Scotia"` \| `"New Brunswick"` \| `"Quebec"` \| `"Ontario"` \| `"Manitoba"` \| `"Saskatchewan"` \| `"Alberta"` \| `"British Columbia"` \| `"Yukon"` \| `"Northwest Territories"` \| `"Nunavut"`

The Canadian province or territory of residence.

##### year

`2025`

The specific tax year.

##### options?

Additional options for specific tax scenarios. Includes `quebec.ramq`, `quebec.livingAlone`, `capitalGains`, and `rrsp`.

###### capitalGains?

`number`

###### quebec?

\{ `livingAlone?`: `boolean`; `ramq?`: `boolean`; \}

###### quebec.livingAlone?

`boolean`

###### quebec.ramq?

`boolean`

###### rrsp?

`number`

#### Returns

`object`

A fully itemized object containing marginal rates, gross taxes, applied negative-valued credits, mandatory premiums, and the verified total deduction sum.
NOTE: The property `capitalGainsTax` is informational only and explicitly shows the isolated tax burden generated by `options.capitalGains`. The base properties (`grossFederalTax`, `grossProvincialTax`, etc.) already have the capital gains tax baked into them. Summing all itemized deductions plus `capitalGainsTax` will result in double-counting!

##### appliedFederalCredits

> **appliedFederalCredits**: `number`

##### appliedProvincialCredits

> **appliedProvincialCredits**: `number`

##### capitalGainsRate

> **capitalGainsRate**: `number`

##### capitalGainsTax

> **capitalGainsTax**: `number`

##### cpp2OrQpp2Premium

> **cpp2OrQpp2Premium**: `number`

##### cppOrQppBase

> **cppOrQppBase**: `number`

##### cppOrQppEnhanced

> **cppOrQppEnhanced**: `number`

##### eiPremium

> **eiPremium**: `number`

##### federalAbatement

> **federalAbatement**: `number`

##### federalRate

> **federalRate**: `number`

##### grossFederalTax

> **grossFederalTax**: `number`

##### grossProvincialTax

> **grossProvincialTax**: `number`

##### healthPremium

> **healthPremium**: `number`

##### provincialRate

> **provincialRate**: `number`

##### provincialSurtax

> **provincialSurtax**: `number`

##### provincialTaxReduction

> **provincialTaxReduction**: `number`

##### qpipPremium

> **qpipPremium**: `number`

##### taxableCapitalGains

> **taxableCapitalGains**: `number`

##### totalTaxAndPremiums

> **totalTaxAndPremiums**: `number`

#### Examples

```ts
// Basic scenario: $100k employment income in Ontario
getIncomeTax(100000, "Ontario", 2025);
```

```ts
// With options: $80k employment income in Quebec, with $10k RRSP contribution and $5k Capital Gains, excluding RAMQ
getIncomeTax(80000, "Quebec", 2025, {
  rrsp: 10000,
  capitalGains: 5000,
  quebec: { ramq: false }
});
```

***

### getLandTransferTax()

> **getLandTransferTax**(`city`, `propertyValue`, `year`, `firstTimeOwner?`): `number`

Defined in: [journalism-finance/src/finance/getLandTransferTax.ts:122](https://github.com/nshiab/journalism-finance/blob/v2.0.3/src/finance/getLandTransferTax.ts#L122)

Calculates the standard Land Transfer Tax (or equivalent registration fee)
for a given city and property value based on 2026 tax frameworks.

**Rebate Limitations and Exclusions:**
The `firstTimeOwner` parameter applies structural, point-of-sale land transfer tax
rebates assuming the buyer meets all idealized programmatic criteria (e.g., absolute
zero global ownership history, Canadian citizenship/PR, and continuous provincial residency).

The following rebates and subsidies are intentionally excluded from this calculation:
- **Nova Scotia:** The First-Time Home Buyers Rebate is excluded because it is restricted
exclusively to a refund on the provincial portion of the HST for *newly built* properties,
not the 1.5% municipal Deed Transfer Tax calculated here.
- **Montreal (HPAP) & Quebec City (Programme Accès Famille):** Excluded because they operate
as localized financial grants or down payment assistance loans requiring specific household
compositions (e.g., dependents under 18) or new-build environmental certifications, rather
than structural tax base reductions.
- **Manitoba & Quebec (2026 Provincial):** Excluded because their respective FTHB relief
amounts are general income tax credits claimed on annual tax returns in the spring/fall,
not an upfront point-of-sale deduction from the land transfer tax.

#### Parameters

##### city

`"Quebec"` \| `"Toronto"` \| `"Montreal"` \| `"Calgary"` \| `"Ottawa"` \| `"Edmonton"` \| `"Winnipeg"` \| `"Vancouver"` \| `"Hamilton"` \| `"Halifax"` \| `"London"` \| `"Saskatoon"` \| `"Kitchener-Waterloo"` \| `"Regina"` \| `"Victoria"` \| `"Barrie"` \| `"Guelph"` \| `"Kingston"` \| `"Fredericton"` \| `"Moncton"` \| `"Saint John (NB)"` \| `"Saint John's (NL)"`

The metropolitan market.

##### propertyValue

`number`

The fair market value or purchase price of the property.

##### year

`2026`

The tax year (currently only 2026 is supported).

##### firstTimeOwner?

`boolean`

Indicates if the purchaser qualifies for strict FTHB exemptions.

#### Returns

`number`

The total calculated transaction friction cost in Canadian Dollars.

#### Example

```ts
const tax = getLandTransferTax("Toronto", 500_000, 2026, true);
console.log(tax); // 4475
```

***

### getMinimumDownPayment()

> **getMinimumDownPayment**(`purchasePrice`, `options?`): `number`

Defined in: [journalism-finance/src/finance/getMinimumDownPayment.ts:39](https://github.com/nshiab/journalism-finance/blob/v2.0.3/src/finance/getMinimumDownPayment.ts#L39)

Calculates the minimum down payment required for a property purchase in Canada, based on the purchase price.

The calculation follows the Financial Consumer Agency of Canada (FCAC) rules:
- For properties $500,000 or less: 5% of the purchase price.
- For properties between $500,000 and $1.5 million: 5% of the first $500,000, plus 10% of the portion above $500,000.
- For properties $1.5 million or more: 20% of the total purchase price.

#### Parameters

##### purchasePrice

`number`

The total price of the property being purchased.

##### options?

Additional calculation options.

###### decimals?

`number`

The number of decimal places to round the result to. By default, the result is not rounded.

#### Returns

`number`

The minimum down payment amount.

#### Throws

If `purchasePrice` is negative or not finite.

#### Example

```ts
// Minimum down payment for a $400,000 home (5%)
const downPayment400k = getMinimumDownPayment(400_000);
console.log(downPayment400k); // 20000

// Minimum down payment for a $600,000 home (5% of 500k + 10% of 100k)
const downPayment600k = getMinimumDownPayment(600_000);
console.log(downPayment600k); // 35000

// Minimum down payment for a $1,600,000 home (20%)
const downPayment1600k = getMinimumDownPayment(1_600_000);
console.log(downPayment1600k); // 320000

// Round the result to two decimal places
const downPaymentWithDecimals = getMinimumDownPayment(123.456, { decimals: 2 });
console.log(downPaymentWithDecimals); // 6.17
```

Reference: https://www.canada.ca/en/financial-consumer-agency/services/mortgages/down-payment.html

***

### getMortgagePenalty()

> **getMortgagePenalty**(`parameters`): `number`

Defined in: [journalism-finance/src/finance/getMortgagePenalty.ts:49](https://github.com/nshiab/journalism-finance/blob/v2.0.3/src/finance/getMortgagePenalty.ts#L49)

Calculates the mortgage prepayment penalty.

For variable mortgages, the penalty is typically three months of interest.
For fixed mortgages, the penalty is usually the greater of three months of interest or the Interest Rate Differential (IRD).

#### Parameters

##### parameters

The mortgage details.

###### currentPostedRates

`Record`\<`number`, `number`\>

A record mapping term lengths (in years) to current posted interest rates.

###### mortgageBalance

`number`

The current outstanding mortgage balance.

###### mortgageType

`"fixed"` \| `"variable"`

Either "fixed" or "variable".

###### postedInterestRate

`number`

The original posted interest rate when the mortgage was signed.

###### rateAdjustmentFixed

`number`

The adjustment applied to the fixed posted interest rate (added to the posted rate).

###### rateAdjustmentVariable

`number`

The adjustment applied to the variable posted interest rate (added to the posted rate).

###### remainingMonthsToTerm

`number`

Number of months left in the current mortgage term.

#### Returns

`number`

The calculated mortgage penalty rounded to 2 decimal places.

#### Throws

Error if no current posted rate is found for the remaining term length.

#### Examples

```ts
const penalty = getMortgagePenalty({
  remainingMonthsToTerm: 24,
  mortgageBalance: 300000,
  postedInterestRate: 0.05,
  rateAdjustmentFixed: -0.0125,
  rateAdjustmentVariable: 0,
  currentPostedRates: { 1: 0.045, 2: 0.0475, 3: 0.05, 4: 0.0525, 5: 0.055 },
  mortgageType: "fixed",
});
```

```ts
const penalty = getMortgagePenalty({
  remainingMonthsToTerm: 36,
  mortgageBalance: 250000,
  postedInterestRate: 0.06,
  rateAdjustmentFixed: 0,
  rateAdjustmentVariable: 0.0025,
  currentPostedRates: {}, // Not used for variable
  mortgageType: "variable",
});
```

***

### getRentVsBuyCholeskyMatrix()

> **getRentVsBuyCholeskyMatrix**(`data?`, `options?`): `number`[][]

Defined in: [journalism-finance/src/finance/helpers/rentVsBuy/getRentVsBuyCholeskyMatrix.ts:70](https://github.com/nshiab/journalism-finance/blob/v2.0.3/src/finance/helpers/rentVsBuy/getRentVsBuyCholeskyMatrix.ts#L70)

Generates a Cholesky decomposition matrix from historical variable data,
formatted specifically for the `simulateRentVsBuyMonteCarlo` function.

This helper calculates the covariance matrix of the provided data arrays,
normalizes it into a correlation matrix, and computes the Cholesky decomposition,
mapping variables internally to the correct 16x16 matrix indices.

If no data object is provided, it returns the Cholesky decomposition of an
identity matrix (which results in independent, uncorrelated paths).

#### Parameters

##### data?

An object containing arrays of equal-length historical values for all 16 variables.

###### appreciation

`number`[]

###### condoFee

`number`[]

###### employmentIncome

`number`[]

###### fiveYearInterestRates

`number`[]

###### fourYearInterestRates

`number`[]

###### maintenance

`number`[]

###### market

`number`[]

###### oneYearInterestRates

`number`[]

###### ownerInsurance

`number`[]

###### propertyTax

`number`[]

###### rent

`number`[]

###### renterInsurance

`number`[]

###### sellingFixedFees

`number`[]

###### threeYearInterestRates

`number`[]

###### twoYearInterestRates

`number`[]

###### variableInterestRates

`number`[]

##### options?

Optional configuration.

###### jitter?

`number`

A tiny positive value (e.g., 1e-9) added to the diagonal of the correlation matrix to force positive-definiteness. This can be useful if the decomposition fails due to numerical precision issues.

#### Returns

`number`[][]

#### Example

```ts
// Using an identity matrix (no correlation)
const choleskyMatrixId = getRentVsBuyCholeskyMatrix();

// Using historical data to capture true economic correlations
const choleskyMatrixCorrelated = getRentVsBuyCholeskyMatrix({
  employmentIncome: [75000, 76000, 78000, ...],
  market: [0.05, 0.07, -0.02, ...],
  rent: [1500, 1550, 1600, ...],
  // ... and the remaining 13 variables
});

// Using jitter to handle numerical precision issues
const choleskyMatrixWithJitter = getRentVsBuyCholeskyMatrix(historicalData, { jitter: 1e-9 });

const results = simulateRentVsBuyMonteCarlo({
  // ... other parameters
  choleskyMatrix: choleskyMatrixCorrelated,
});
```

***

### getSalesTax()

> **getSalesTax**(`amount`, `province`, `year`): `object`

Defined in: [journalism-finance/src/finance/getSalesTax.ts:61](https://github.com/nshiab/journalism-finance/blob/v2.0.3/src/finance/getSalesTax.ts#L61)

Calculates the Canadian sales tax for a given amount, province, and year.

#### Parameters

##### amount

`number`

The base amount before tax.

##### province

`"Newfoundland and Labrador"` \| `"Prince Edward Island"` \| `"Nova Scotia"` \| `"New Brunswick"` \| `"Quebec"` \| `"Ontario"` \| `"Manitoba"` \| `"Saskatchewan"` \| `"Alberta"` \| `"British Columbia"` \| `"Yukon"` \| `"Northwest Territories"` \| `"Nunavut"`

The province or territory.

##### year

`2025`

The tax year.

#### Returns

`object`

An object containing the breakdown of taxes and the total amount.

##### gst

> **gst**: `number`

##### hst

> **hst**: `number`

##### pst

> **pst**: `number`

##### totalAmount

> **totalAmount**: `number`

##### totalTax

> **totalTax**: `number`

#### Example

```ts
const salesTax = getSalesTax(100, "Quebec", 2025);
console.log(salesTax);
// { gst: 5, pst: 9.975, hst: 0, totalTax: 14.975, totalAmount: 114.975 }
```

Reference: https://www.retailcouncil.org/resources/quick-facts/sales-tax-rates-by-province/

***

### getYahooFinanceData()

> **getYahooFinanceData**(`symbol`, `startDate`, `endDate`, `variable`, `interval`): `Promise`\<`object`[]\>

Defined in: [journalism-finance/src/finance/getYahooFinanceData.ts:63](https://github.com/nshiab/journalism-finance/blob/v2.0.3/src/finance/getYahooFinanceData.ts#L63)

Fetches historical prices or trading volume for a symbol from Yahoo Finance.

**Yahoo Finance notice:** This function uses an undocumented Yahoo Finance
endpoint and is not affiliated with or endorsed by Yahoo. It is provided for
educational, research, and journalistic purposes. Before using it, review
Yahoo's terms and any applicable data-provider restrictions.

#### Parameters

##### symbol

`string`

The stock or index symbol, such as `"AAPL"` or `"^GSPTSE"`.

##### startDate

`Date`

The inclusive start of the requested range.

##### endDate

`Date`

The inclusive end of the requested range. The observation
beginning at this date or time is included when available.

##### variable

`"low"` \| `"high"` \| `"open"` \| `"close"` \| `"adjclose"` \| `"volume"`

The financial variable to retrieve.

##### interval

`"1d"` \| `"1h"` \| `"1m"`

The interval between observations: daily, hourly, or every
minute.

#### Returns

`Promise`\<`object`[]\>

The available observations, with Unix timestamps in milliseconds.
Missing values reported by Yahoo are omitted.

#### Example

```ts
const prices = await getYahooFinanceData(
  "^GSPTSE",
  new Date("2025-03-01"),
  new Date("2025-03-15"),
  "adjclose",
  "1d",
);
console.log(prices);
```

#### Throws

If either date is invalid or `endDate` is before
`startDate`.

#### Throws

If Yahoo rejects the request, returns no data, or provides invalid timestamps.

#### See

 - https://legal.yahoo.com/us/en/yahoo/terms/otos/index.html
 - https://help.yahoo.com/kb/finance/SLN2310.html

***

### mortgageInsurancePremium()

> **mortgageInsurancePremium**(`purchasePrice`, `downPayment`): `number`

Defined in: [journalism-finance/src/finance/mortgageInsurancePremium.ts:47](https://github.com/nshiab/journalism-finance/blob/v2.0.3/src/finance/mortgageInsurancePremium.ts#L47)

Calculates the mortgage insurance premium based on the property's purchase price and the down payment amount. This function is designed to reflect the premium rates typically applied in Canada, as outlined by institutions like the Financial Consumer Agency of Canada. The calculated premium is rounded to the nearest integer.

Mortgage insurance is generally required in Canada when the down payment is less than 20% of the home's purchase price.

#### Parameters

##### purchasePrice

`number`

The total price of the property being purchased.

##### downPayment

`number`

The amount of money paid upfront by the buyer towards the purchase price.

#### Returns

`number`

The calculated mortgage insurance premium, rounded to the nearest integer. Returns `0` if the down payment is 20% or more, as insurance is typically not required in such cases.

#### Throws

If the down payment is less than the minimum required down payment in Canada.

#### Examples

```ts
// Calculate the insurance premium for a property with a $500,000 purchase price and a $25,000 down payment.
// (5% down payment, so 4% premium on the mortgage amount)
const insurancePremium = mortgageInsurancePremium(500_000, 25_000);
console.log(insurancePremium); // Expected output: 19000 (4% of $475,000)
```

```ts
// Scenario 1: 10% down payment ($50,000 on $500,000 property) - 3.1% premium
const premium10Percent = mortgageInsurancePremium(500_000, 50_000);
console.log(`Premium for 10% down: ${premium10Percent}`); // Expected: 13950 (3.1% of $450,000)

// Scenario 2: 15% down payment ($75,000 on $500,000 property) - 2.8% premium
const premium15Percent = mortgageInsurancePremium(500_000, 75_000);
console.log(`Premium for 15% down: ${premium15Percent}`); // Expected: 11900 (2.8% of $425,000)

// Scenario 3: 20% or more down payment ($100,000 on $500,000 property) - No premium
const premium20Percent = mortgageInsurancePremium(500_000, 100_000);
console.log(`Premium for 20% down: ${premium20Percent}`); // Expected: 0
```

```ts
// Attempting to calculate with a down payment less than 5% will throw an error.
try {
  mortgageInsurancePremium(500_000, 20_000); // 4% down payment
} catch (error) {
  console.error("Error:", error.message);
  // Expected output: "Error: The down payment is less than the minimum required down payment..."
}
```

***

### mortgageMaxAmount()

> **mortgageMaxAmount**(`annualIncome`, `downPayment`, `rate`, `options?`): `object`

Defined in: [journalism-finance/src/finance/mortgageMaxAmount.ts:77](https://github.com/nshiab/journalism-finance/blob/v2.0.3/src/finance/mortgageMaxAmount.ts#L77)

Calculates the maximum affordable property purchase price and the corresponding mortgage amount a borrower can qualify for, based on their annual income, down payment, and current mortgage interest rates. This function is designed to simulate mortgage qualification criteria, taking into account various financial factors and debt service ratios.

The calculation incorporates a stress test, where the interest rate used for qualification is the higher of the provided rate + 2% or 5.25% (a common benchmark in Canada). It also considers monthly debt payments, heating costs, property taxes, and condo fees to determine the Gross Debt Service (GDS) and Total Debt Service (TDS) ratios, which are critical in mortgage approvals.

#### Parameters

##### annualIncome

`number`

The borrower's gross annual income.

##### downPayment

`number`

The amount of money the borrower is putting down as a down payment.

##### rate

`number`

The current mortgage interest rate (e.g., 5.25 for 5.25%).

##### options?

Additional options to fine-tune the calculation:

###### monthlyCondoFees?

`number`

The estimated monthly condo fees, if applicable. Defaults to `0`.

###### monthlyDebtPayment?

`number`

The borrower's total monthly payments for other debts (e.g., car loans, credit cards). Defaults to `0`.

###### monthlyHeating?

`number`

The estimated monthly heating costs for the property. Defaults to `175` (a common estimate, e.g., by Royal Bank of Canada).

###### monthlyTax?

`number`

The estimated monthly property tax. Defaults to `1.5%` of the purchase price annually, divided by 12 (a common estimate, e.g., by Royal Bank of Canada).

#### Returns

`object`

An object containing detailed results of the mortgage affordability calculation, including:
  - `annualIncome`: The annual income provided.
  - `downPayment`: The down payment provided.
  - `rate`: The mortgage interest rate provided.
  - `rateTested`: The interest rate used for the stress test (higher of `rate + 2%` or `5.25%`).
  - `purchasePrice`: The maximum affordable property purchase price.
  - `mortgageAmount`: The maximum mortgage amount the borrower qualifies for.
  - `insurancePremium`: The calculated mortgage insurance premium (if applicable).
  - `monthlyMortgagePayment`: The estimated monthly mortgage payment.
  - `grossDebtServiceRatio`: The calculated Gross Debt Service (GDS) ratio.
  - `totalDebtServiceRatio`: The calculated Total Debt Service (TDS) ratio.
  - `reason`: The limiting factor for the maximum amount (e.g., "debt limit", "downPayment limit", "max purchase price").
  - `monthlyDebtPayment`: The monthly debt payment used in the calculation.
  - `monthlyHeating`: The monthly heating cost used in the calculation.
  - `isHeatingEstimate`: `true` if `monthlyHeating` was an estimate, `false` if provided.
  - `monthlyTax`: The monthly property tax used in the calculation.
  - `isTaxEstimate`: `true` if `monthlyTax` was an estimate, `false` if provided.
  - `monthlyCondoFees`: The monthly condo fees used in the calculation.

##### annualIncome

> **annualIncome**: `number`

##### downPayment

> **downPayment**: `number`

##### grossDebtServiceRatio

> **grossDebtServiceRatio**: `number`

##### insurancePremium

> **insurancePremium**: `number`

##### isHeatingEstimate

> **isHeatingEstimate**: `boolean`

##### isTaxEstimate

> **isTaxEstimate**: `boolean`

##### monthlyCondoFees

> **monthlyCondoFees**: `number`

##### monthlyDebtPayment

> **monthlyDebtPayment**: `number`

##### monthlyHeating

> **monthlyHeating**: `number`

##### monthlyMortgagePayment

> **monthlyMortgagePayment**: `number`

##### monthlyTax

> **monthlyTax**: `number`

##### mortgageAmount

> **mortgageAmount**: `number`

##### purchasePrice

> **purchasePrice**: `number`

##### rate

> **rate**: `number`

##### rateTested

> **rateTested**: `number`

##### reason

> **reason**: `string`

##### totalDebtServiceRatio

> **totalDebtServiceRatio**: `number`

#### Examples

```ts
// Calculate affordability for a borrower with $100,000 annual income, $25,000 down payment, and a 5.25% rate.
const results = mortgageMaxAmount(100_000, 25_000, 5.25);
console.log(results);
// Expected output:
// {
//   annualIncome: 100000,
//   downPayment: 25000,
//   rate: 5.25,
//   rateTested: 7.25,
//   purchasePrice: 307000,
//   mortgageAmount: 293280,
//   insurancePremium: 11280,
//   monthlyMortgagePayment: 2100,
//   grossDebtServiceRatio: 0.32,
//   totalDebtServiceRatio: 0.32,
//   reason: "debt limit",
//   monthlyDebtPayment: 0,
//   monthlyHeating: 175,
//   isHeatingEstimate: true,
//   monthlyTax: 385,
//   isTaxEstimate: true,
//   monthlyCondoFees: 0,
// }
```

```ts
// Calculate affordability with specific monthly debt payments and property taxes.
const customExpensesResults = mortgageMaxAmount(120_000, 40_000, 4.5,
  {
    monthlyDebtPayment: 300,
    monthlyTax: 450,
    monthlyCondoFees: 200,
  },
);
console.log(customExpensesResults);
```

***

### mortgagePayments()

> **mortgagePayments**(`mortgageAmount`, `rate`, `paymentFrequency`, `term`, `amortizationPeriod`, `options?`): `object`[]

Defined in: [journalism-finance/src/finance/mortgagePayments.ts:72](https://github.com/nshiab/journalism-finance/blob/v2.0.3/src/finance/mortgagePayments.ts#L72)

Calculates and returns a detailed schedule of fixed-rate mortgage payments. This function is designed to provide a comprehensive breakdown of each payment, including the principal and interest portions, remaining balance, and cumulative amounts paid. It adheres to Canadian mortgage regulations, which typically require semi-annual compounding, but allows for customization of the compounding frequency.

The function is flexible, supporting various payment frequencies (weekly, bi-weekly, monthly, semi-monthly, accelerated weekly, accelerated bi-weekly) and allowing for the specification of the mortgage amount, interest rate, term, and amortization period. It also includes options for rounding payment values and enabling debug logging.

#### Parameters

##### mortgageAmount

`number`

The total amount of the mortgage loan.

##### rate

`number`

The annual interest rate of the mortgage (e.g., `6.00` for 6.00%).

##### paymentFrequency

`"weekly"` \| `"biWeekly"` \| `"monthly"` \| `"semiMonthly"` \| `"acceleratedWeekly"` \| `"acceleratedBiWeekly"`

The frequency at which mortgage payments are made. Supported values are: `"weekly"`, `"biWeekly"`, `"monthly"`, `"semiMonthly"`, `"acceleratedWeekly"`, `"acceleratedBiWeekly"`.

##### term

`number`

The term of the mortgage in years. This is the length of the current mortgage contract.

##### amortizationPeriod

`number`

The total amortization period of the mortgage in years. This is the total time it will take to pay off the mortgage.

##### options?

Additional options for customizing the mortgage calculation and output.

###### annualCompounding?

`number`

The number of times the mortgage interest should be compounded per year. Defaults to `2` (semi-annual compounding, as is standard in Canada).

###### debug?

`boolean`

If `true`, enables debug logging to the console, providing additional insights into the calculation process. Defaults to `false`.

###### decimals?

`number`

The number of decimal places to round the financial values (payment, interest, capital, balance) to. Defaults to `2`.

###### id?

`string`

An optional string ID to be added to each payment object in the returned array. Useful for tracking payments related to a specific mortgage.

#### Returns

`object`[]

An array of objects, where each object represents a single mortgage payment and contains:
  - `paymentId`: A 0-based index for the payment.
  - `payment`: The total amount of the payment.
  - `interest`: The portion of the payment that goes towards interest.
  - `capital`: The portion of the payment that goes towards the principal (capital).
  - `balance`: The remaining mortgage balance after the payment.
  - `amountPaid`: The cumulative total amount paid so far.
  - `interestPaid`: The cumulative total interest paid so far.
  - `capitalPaid`: The cumulative total capital reimbursed so far.
  - `id` (optional): The ID provided in `options.id`.

#### Throws

If the `amortizationPeriod` is less than the `term`, as this is an invalid mortgage configuration.

#### Examples

```ts
// Return the monthly mortgage payments for a $250,000 loan with a 6.00% rate, 5-year term, and 25-year amortization.
const payments = mortgagePayments(250_000, 6, "monthly", 5, 25);
console.log(payments[0]); // First payment details
// Expected output (example):
// {
//   paymentId: 0,
//   payment: 1599.52,
//   interest: 1234.66,
//   capital: 364.86,
//   balance: 249635.14,
//   amountPaid: 1599.52,
//   interestPaid: 1234.66,
//   capitalPaid: 364.86,
// }
console.log(payments[payments.length - 1]); // Last payment details
// Expected output (example):
// {
//   paymentId: 59,
//   payment: 1599.52,
//   interest: 1111.58,
//   capital: 487.93,
//   balance: 224591.84,
//   amountPaid: 95970.99,
//   interestPaid: 70562.76,
//   capitalPaid: 25408.23,
// }
```

```ts
// Attempting to set an amortization period shorter than the term will throw an error.
try {
  mortgagePayments(200_000, 5, "monthly", 10, 5); // Term (10) > Amortization (5)
} catch (error) {
  console.error("Error:", error.message);
  // Expected output: "Error: The amortizationPeriod should be equal or greater than the term."
}
```

***

### simulateRentVsBuy()

> **simulateRentVsBuy**(`parameters`, `options?`): (`object` & \{ `effectiveInterestRate?`: `number`; `fixedRateAdjustment?`: `number`; `group`: `"monthlyExpenses"` \| `"cumulativeExpenses"`; `postedInterestRate?`: `number`; `variable`: `"rent"` \| `"maintenance"` \| `"propertyTax"` \| `"insurance"` \| `"securityDeposit"` \| `"mortgageCapital"` \| `"mortgageInterests"` \| `"condoFees"` \| `"downPayment"` \| `"purchaseFixedFees"` \| `"landTransferTax"` \| `"insurancePremiumTax"` \| `"tfsaFees"` \| `"stocksFees"`; `variableRateAdjustment?`: `number`; \} \| \{ `group`: `"monthlyGains"` \| `"cumulativeGains"`; `homeValue?`: `number`; `variable`: `"tfsaGains"` \| `"tfsaContribution"` \| `"stocksGains"` \| `"newStocks"` \| `"homeEquityGains"`; \} \| \{ `group`: `"assets"`; `variable`: `"securityDeposit"` \| `"tfsa"` \| `"stocks"` \| `"homeEquity"`; \} \| \{ `group`: `"summary"`; `variable`: `"balance"`; \} \| \{ `group`: `"summaryCumulative"`; `variable`: `"balance"` \| `"balanceAfterSelling"`; \} \| \{ `employmentIncome?`: `number`; `group`: `"saleCosts"`; `variable`: `"stockTaxes"` \| `"homeSellingCommission"` \| `"homeSellingFixedFees"` \| `"mortgagePenalty"` \| `"mortgageBalance"`; \} \| \{ `group`: `"saleNetGains"`; `variable`: `"securityDeposit"` \| `"stockSellingGains"` \| `"tfsaSellingGains"` \| `"homeSellingGains"`; \} \| \{ `group`: `"monthlyRecurringExpenses"`; `variable`: `"rent"` \| `"maintenance"` \| `"propertyTax"` \| `"insurance"` \| `"mortgageCapital"` \| `"mortgageInterests"` \| `"condoFees"` \| `"tfsaFees"` \| `"stocksFees"`; \} \| \{ `group`: `"monthlyNonRecurringExpenses"`; `variable`: `"securityDeposit"` \| `"downPayment"` \| `"purchaseFixedFees"` \| `"landTransferTax"` \| `"insurancePremiumTax"`; \} \| \{ `group`: `"totals"`; `variable`: `"assets"` \| `"monthlyExpenses"` \| `"cumulativeExpenses"` \| `"monthlyGains"` \| `"cumulativeGains"` \| `"saleCosts"` \| `"saleNetGains"` \| `"monthlyRecurringExpenses"` \| `"monthlyNonRecurringExpenses"`; \})[]

Defined in: [journalism-finance/src/finance/simulateRentVsBuy.ts:177](https://github.com/nshiab/journalism-finance/blob/v2.0.3/src/finance/simulateRentVsBuy.ts#L177)

Simulates and compares the financial outcomes of renting versus buying a home over a specified number of years.
This comprehensive simulation accounts for various factors including mortgage payments (fixed and variable),
property taxes, maintenance costs, condo fees, insurance, rent increases, market returns on savings, and
the eventual sale of the property. Tailored for a Canadian context, it includes specific features like
tax-free TFSA contributions and standard Canadian mortgage structures.

The simulation tracks three scenarios:
1. **Renter**: Pays rent and invests the difference between their expenses and the buyer's expenses into the market.
2. **Buyer (Fixed)**: Purchases a home using a fixed-rate mortgage and invests any remaining surplus.
3. **Buyer (Variable)**: Purchases a home using a variable-rate mortgage and invests any remaining surplus.

It provides a detailed breakdown of monthly expenses, gains, assets, and a final summary including the
net balance after selling the property and paying all associated costs (taxes, legal fees, penalties).

#### Parameters

##### parameters

The input parameters for the simulation.

###### annualInvestmentFeeRate

`number`

Annual investment fee rate (e.g. ETF MER or platform/advisor fee) expressed as a decimal (e.g. `0.0025` for 0.25%). Applied monthly to TFSA and stock portfolio balances using a multiplicative model — the fee is charged on the grown balance. The monthly dollar cost is also tracked as `tfsaFees` and `stocksFees` under `monthlyExpenses` and `cumulativeExpenses` in the output.

###### buyer

\{ `downPayment`: `number`; `firstTimeOwner`: `boolean`; `fixedRateAdjustment`: `number`; `floorRate`: `number`; `investsSavings`: `boolean`; `purchaseFixedFees`: `number`; `purchasePrice`: `number`; `sellingCommissionRate`: `number`; `sellingFixedFees`: `number`; `startingAnnualMaintenanceCost`: `number`; `startingAnnualPropertyTax`: `number`; `startingMonthlyCondoFees`: `number`; `startingMonthlyInsurance`: `number`; `variableRateAdjustment`: `number`; \}

Configuration for the buyer scenarios.

###### buyer.downPayment

`number`

The down payment amount. Must meet the minimum required down payment in Canada based on the purchase price.

###### buyer.firstTimeOwner

`boolean`

Whether the buyer is a first-time owner, used to calculate land transfer tax rebates.

###### buyer.fixedRateAdjustment

`number`

The adjustment applied to the posted fixed mortgage rate (added to the posted rate).

###### buyer.floorRate

`number`

The minimum interest rate (posted + adjustment) for mortgages.

###### buyer.investsSavings

`boolean`

Whether the buyer invests any monthly savings (difference between their expenses and the renter's/max expenses) into the stock market. If `false`, these savings are discarded (simulating lifestyle inflation or other spending).

###### buyer.purchaseFixedFees

`number`

Fixed fees associated with the purchase (e.g., notary). Do not include land transfer tax here, as it is calculated automatically based on the city.

###### buyer.purchasePrice

`number`

The purchase price of the home.

###### buyer.sellingCommissionRate

`number`

The real estate commission rate for selling the home (e.g., 0.05 for 5%).

###### buyer.sellingFixedFees

`number`

Fixed fees associated with selling the home (before sales tax).

###### buyer.startingAnnualMaintenanceCost

`number`

The initial annual maintenance cost.

###### buyer.startingAnnualPropertyTax

`number`

The initial annual property tax.

###### buyer.startingMonthlyCondoFees

`number`

The initial monthly condo fees.

###### buyer.startingMonthlyInsurance

`number`

The initial monthly homeowner's insurance.

###### buyer.variableRateAdjustment

`number`

The adjustment applied to the variable mortgage rate (added to the posted rate).

###### city

`"Quebec"` \| `"Toronto"` \| `"Montreal"` \| `"Calgary"` \| `"Ottawa"` \| `"Edmonton"` \| `"Winnipeg"` \| `"Vancouver"` \| `"Hamilton"` \| `"Halifax"` \| `"London"` \| `"Saskatoon"` \| `"Kitchener-Waterloo"` \| `"Regina"` \| `"Victoria"` \| `"Barrie"` \| `"Guelph"` \| `"Kingston"` \| `"Fredericton"` \| `"Moncton"` \| `"Saint John (NB)"` \| `"Saint John's (NL)"`

The city where the home is located, used to calculate land transfer tax and derive the province for sales and income taxes.

###### couple

`boolean`

Whether to simulate investments and taxes for a couple doubling TFSA contribution room and splitting capital gains in 2. Assumes each per-month value in parameters.values.employmentIncome represents the per-partner income.

###### numberOfYears

`number`

The duration of the simulation in years.

###### rates

\{ `appreciationIncrease`: `number`[]; `condoFeeIncrease`: `number`[]; `maintenanceIncrease`: `number`[]; `marketReturnRate`: `number`[]; `ownerInsuranceIncrease`: `number`[]; `propertyTaxIncrease`: `number`[]; `renterInsuranceIncrease`: `number`[]; `rentIncrease`: `number`[]; `sellingFixedFeesIncrease`: `number`[]; \}

Annualized growth rates over the simulation period. Each array should have a length of `numberOfYears * 12`. These can be historical or projected rates.

###### rates.appreciationIncrease

`number`[]

Monthly home appreciation rates.

###### rates.condoFeeIncrease

`number`[]

Monthly condo fee increase rates.

###### rates.maintenanceIncrease

`number`[]

Monthly maintenance cost increase rates.

###### rates.marketReturnRate

`number`[]

Monthly market return rates.

###### rates.ownerInsuranceIncrease

`number`[]

Monthly homeowner's insurance increase rates.

###### rates.propertyTaxIncrease

`number`[]

Monthly property tax increase rates.

###### rates.renterInsuranceIncrease

`number`[]

Monthly renter's insurance increase rates.

###### rates.rentIncrease

`number`[]

Monthly rent increase rates.

###### rates.sellingFixedFeesIncrease

`number`[]

Monthly increase rates for selling fixed fees.

###### renter

\{ `securityDeposit`: `number`; `startingMonthlyInsurance`: `number`; `startingMonthlyRent`: `number`; \}

Configuration for the renter scenario.

###### renter.securityDeposit

`number`

The initial security deposit.

###### renter.startingMonthlyInsurance

`number`

The initial monthly renter's insurance.

###### renter.startingMonthlyRent

`number`

The initial monthly rent payment.

###### startingYear

`number`

The year the simulation begins.

###### tfsaContributions

`boolean`

Whether to prioritize TFSA contributions for investments (tax-free gains).

###### values

\{ `employmentIncome`: `number`[]; `fiveYearInterestRates`: `number`[]; `fourYearInterestRates`: `number`[]; `oneYearInterestRates`: `number`[]; `threeYearInterestRates`: `number`[]; `twoYearInterestRates`: `number`[]; `variableInterestRates`: `number`[]; \}

Shared absolute values over the simulation period. Each array should have a length of `numberOfYears * 12`.

###### values.employmentIncome

`number`[]

Annual employment income at each simulated month, used for calculating marginal income tax rates on investment gains.

###### values.fiveYearInterestRates

`number`[]

Monthly 5-year fixed mortgage interest rates.

###### values.fourYearInterestRates

`number`[]

Monthly 4-year fixed mortgage interest rates.

###### values.oneYearInterestRates

`number`[]

Monthly 1-year fixed mortgage interest rates.

###### values.threeYearInterestRates

`number`[]

Monthly 3-year fixed mortgage interest rates.

###### values.twoYearInterestRates

`number`[]

Monthly 2-year fixed mortgage interest rates.

###### values.variableInterestRates

`number`[]

Monthly variable mortgage interest rates.

##### options?

Additional simulation options.

###### adjustToInflation?

`"marketReturnRate"` \| `"rentIncrease"` \| `"ownerInsuranceIncrease"` \| `"renterInsuranceIncrease"` \| `"maintenanceIncrease"` \| `"propertyTaxIncrease"` \| `"condoFeeIncrease"` \| `"appreciationIncrease"` \| `"sellingFixedFeesIncrease"`

The rate parameter used as a proxy for inflation to express future dollar values in today's constant dollars. When set (e.g. to `"sellingFixedFeesIncrease"`), point-in-time metrics (like `monthlyExpenses`, `assets`, and `balance`) are discounted by the current month's inflation factor. Cumulative totals (like `cumulativeExpenses` and `cumulativeGains`) accumulate real values incrementally — meaning each nominal monthly contribution is discounted before being added to the running sum. One-time upfront costs paid at month 0 (`downPayment`, `purchaseFixedFees`, `landTransferTax`, `insurancePremiumTax`, `securityDeposit`) are **not** discounted because their real value already equals their nominal value. Defaults to `undefined` (no adjustment).

###### groups?

`string`[]

Internal filter used by `simulateRentVsBuyMonteCarlo` via `details.filterGroups`. Restricts which groups are emitted by `onRecord` and pushed to results.

###### onRecord?

(`category`, `group`, `variable`, `monthIndex`, `amount`) => `void`

Internal callback used by `simulateRentVsBuyMonteCarlo` when `details.iterations` or `details.quantiles` is enabled. When provided, numeric values are streamed directly to the accumulator instead of being wrapped in result objects, avoiding the per-record heap allocation cost. At the final month, one winner record (the `winVariable` entry) per category is still pushed to the results array for winner extraction.

###### onSnapshotRecord?

(`category`, `monthIndex`, `amount`) => `void`

###### snapshotMonths?

`Set`\<`number`\>

###### variables?

`string`[]

Internal filter used by `simulateRentVsBuyMonteCarlo` via `details.filterVariables`. Restricts which individual variables within allowed groups are emitted by `onRecord`. An empty array is treated as no filter.

###### winVariable?

`"assets"` \| `"balance"` \| `"balanceAfterSelling"`

The variable used to identify the winner when extracting the final record. Use `"balanceAfterSelling"` for net balance after a simulated sale, `"balance"` for cumulative balance, or `"assets"` for total raw assets.

###### winVariableOnly?

`boolean`

If `true`, the returned results will only include the final `winVariable` record for each scenario (one entry per scenario at the final month). Requires `winVariable` to be set — throws if `winVariableOnly` is `true` but `winVariable` is not provided. Defaults to `false`.

#### Returns

(`object` & \{ `effectiveInterestRate?`: `number`; `fixedRateAdjustment?`: `number`; `group`: `"monthlyExpenses"` \| `"cumulativeExpenses"`; `postedInterestRate?`: `number`; `variable`: `"rent"` \| `"maintenance"` \| `"propertyTax"` \| `"insurance"` \| `"securityDeposit"` \| `"mortgageCapital"` \| `"mortgageInterests"` \| `"condoFees"` \| `"downPayment"` \| `"purchaseFixedFees"` \| `"landTransferTax"` \| `"insurancePremiumTax"` \| `"tfsaFees"` \| `"stocksFees"`; `variableRateAdjustment?`: `number`; \} \| \{ `group`: `"monthlyGains"` \| `"cumulativeGains"`; `homeValue?`: `number`; `variable`: `"tfsaGains"` \| `"tfsaContribution"` \| `"stocksGains"` \| `"newStocks"` \| `"homeEquityGains"`; \} \| \{ `group`: `"assets"`; `variable`: `"securityDeposit"` \| `"tfsa"` \| `"stocks"` \| `"homeEquity"`; \} \| \{ `group`: `"summary"`; `variable`: `"balance"`; \} \| \{ `group`: `"summaryCumulative"`; `variable`: `"balance"` \| `"balanceAfterSelling"`; \} \| \{ `employmentIncome?`: `number`; `group`: `"saleCosts"`; `variable`: `"stockTaxes"` \| `"homeSellingCommission"` \| `"homeSellingFixedFees"` \| `"mortgagePenalty"` \| `"mortgageBalance"`; \} \| \{ `group`: `"saleNetGains"`; `variable`: `"securityDeposit"` \| `"stockSellingGains"` \| `"tfsaSellingGains"` \| `"homeSellingGains"`; \} \| \{ `group`: `"monthlyRecurringExpenses"`; `variable`: `"rent"` \| `"maintenance"` \| `"propertyTax"` \| `"insurance"` \| `"mortgageCapital"` \| `"mortgageInterests"` \| `"condoFees"` \| `"tfsaFees"` \| `"stocksFees"`; \} \| \{ `group`: `"monthlyNonRecurringExpenses"`; `variable`: `"securityDeposit"` \| `"downPayment"` \| `"purchaseFixedFees"` \| `"landTransferTax"` \| `"insurancePremiumTax"`; \} \| \{ `group`: `"totals"`; `variable`: `"assets"` \| `"monthlyExpenses"` \| `"cumulativeExpenses"` \| `"monthlyGains"` \| `"cumulativeGains"` \| `"saleCosts"` \| `"saleNetGains"` \| `"monthlyRecurringExpenses"` \| `"monthlyNonRecurringExpenses"`; \})[]

A detailed array of monthly results for each scenario (renter, buyerFixed, buyerVariable).

#### Throws

If the down payment is less than the minimum required down payment in Canada.
Each object in the array represents a specific data point for a given month, categorized by:
- `monthlyExpenses` or `cumulativeExpenses`:
  - `rent`, `insurance`, `securityDeposit` (for Renter)
  - `mortgageCapital`, `mortgageInterests`, `maintenance`, `propertyTax`, `condoFees`, `downPayment`, `purchaseFixedFees`, `insurancePremiumTax` (for Buyers)
  - `tfsaFees`, `stocksFees` (for all scenarios)
- `monthlyGains` or `cumulativeGains`:
  - `tfsaGains`, `tfsaContribution`, `stocksGains`, `newStocks` (for all scenarios)
  - `homeEquityGains` (for Buyers)
- `assets`:
  - `tfsa`, `stocks` (for all scenarios)
  - `securityDeposit` (for Renter)
  - `homeEquity` (for Buyers)
- `summary`: `balance` (monthly net worth)
- `summaryCumulative`: `balance` (cumulative net worth), `balanceAfterSelling` (net worth after hypothetical property sale and associated taxes/fees)
- `saleCosts`: `stockTaxes` (includes `employmentIncome` used for calculation), `homeSellingCommission`, `homeSellingFixedFees`, `mortgagePenalty`, `mortgageBalance` (hypothetical costs incurred upon selling)
- `saleNetGains`: `stockSellingGains`, `tfsaSellingGains`, `homeSellingGains`, `securityDeposit` (hypothetical gains realized upon selling)
- `monthlyRecurringExpenses`: `rent`, `insurance`, `mortgageCapital`, `mortgageInterests`, `maintenance`, `propertyTax`, `condoFees`, `tfsaFees`, `stocksFees` — same values as the corresponding `monthlyExpenses` variables, restricted to costs that recur every month.
- `monthlyNonRecurringExpenses`: `downPayment`, `purchaseFixedFees`, `landTransferTax`, `insurancePremiumTax`, `securityDeposit` — same values as the corresponding `monthlyExpenses` variables, restricted to one-time upfront costs (nonzero only at month 0).
- `totals`: `monthlyExpenses`, `cumulativeExpenses`, `monthlyGains`, `cumulativeGains`, `assets`, `saleCosts`, `saleNetGains`, `monthlyRecurringExpenses`, `monthlyNonRecurringExpenses` (sum of all variables in each respective group; always emitted even when zero)

#### Example

```ts
const rates = {
  marketReturnRate: new Array(120).fill(0.005), // 0.5% monthly
  rentIncrease: new Array(120).fill(0.002),
  ownerInsuranceIncrease: new Array(120).fill(0.002),
  renterInsuranceIncrease: new Array(120).fill(0.002),
  maintenanceIncrease: new Array(120).fill(0.002),
  propertyTaxIncrease: new Array(120).fill(0.002),
  condoFeeIncrease: new Array(120).fill(0.002),
  appreciationIncrease: new Array(120).fill(0.003),
  sellingFixedFeesIncrease: new Array(120).fill(0.002),
};

const values = {
  employmentIncome: new Array(120).fill(75000),
  fiveYearInterestRates: new Array(120).fill(0.05),
  fourYearInterestRates: new Array(120).fill(0.05),
  threeYearInterestRates: new Array(120).fill(0.05),
  twoYearInterestRates: new Array(120).fill(0.05),
  oneYearInterestRates: new Array(120).fill(0.05),
  variableInterestRates: new Array(120).fill(0.06),
};

const results = simulateRentVsBuy({
  startingYear: 2024,
  numberOfYears: 10,
  tfsaContributions: true,
  annualInvestmentFeeRate: 0,
  couple: false,
  city: "Toronto",
  renter: {
    startingMonthlyRent: 2000,
    securityDeposit: 2000,
    startingMonthlyInsurance: 30,
  },
  buyer: {
    downPayment: 100000,
    purchasePrice: 500000,
    fixedRateAdjustment: -0.015,
    variableRateAdjustment: -0.005,
    firstTimeOwner: true, investsSavings: true,
    purchaseFixedFees: 2000,
    startingAnnualMaintenanceCost: 2000,
    startingAnnualPropertyTax: 3000,
    startingMonthlyCondoFees: 300,
    startingMonthlyInsurance: 100,
    sellingFixedFees: 2000,
    sellingCommissionRate: 0.05,
    floorRate: 0.01,
    investsSavings: true,
  },
  values,
  rates,
}, { winVariableOnly: true, winVariable: "balanceAfterSelling" });
```

***

### simulateRentVsBuyMonteCarlo()

> **simulateRentVsBuyMonteCarlo**(`parameters`, `options?`): `object`

Defined in: [journalism-finance/src/finance/simulateRentVsBuyMonteCarlo.ts:421](https://github.com/nshiab/journalism-finance/blob/v2.0.3/src/finance/simulateRentVsBuyMonteCarlo.ts#L421)

Performs a Monte Carlo simulation for a rent versus buy analysis tailored for a Canadian context.
This function runs multiple iterations of the `simulateRentVsBuy` function, using stochastic paths
for various economic factors like market returns, interest rates, and inflation-related costs.
It helps evaluate the probability of different financial outcomes under uncertainty.

The simulation uses:
- **Geometric Brownian Motion (GBM)** for paths like market returns, rent increases, and home appreciation.
- **Cox-Ingersoll-Ross (CIR)** models for interest rate paths.

Parameters for these models can be generated from historical data using `getCirParameters` and `getGbmParameters` from `@nshiab/journalism`.

#### Parameters

##### parameters

The input parameters for the Monte Carlo simulation.

###### annualInvestmentFeeRate

`number`

Annual investment fee rate (e.g. ETF MER or platform/advisor fee) expressed as a decimal (e.g. `0.0025` for 0.25%). Applied monthly to TFSA and stock portfolio balances using a multiplicative model — the fee is charged on the grown balance. The monthly dollar cost is also tracked as `tfsaFees` and `stocksFees` under `monthlyExpenses` and `cumulativeExpenses` in the output.

###### buyer

\{ `downPayment`: `number`; `firstTimeOwner`: `boolean`; `fixedRateAdjustment`: `number`; `floorRate`: `number`; `investsSavings`: `boolean`; `purchaseFixedFees`: `number`; `sellingCommissionRate`: `number`; `variableRateAdjustment`: `number`; \}

Configuration for the buyer scenarios.

###### buyer.downPayment

`number`

The total down payment amount paid at the start. Must meet the minimum required down payment in Canada based on the initial property appreciation value.

###### buyer.firstTimeOwner

`boolean`

Whether the buyer is a first-time owner, used to calculate land transfer tax rebates.

###### buyer.fixedRateAdjustment

`number`

The adjustment applied to the posted fixed mortgage rate (added to the posted rate).

###### buyer.floorRate

`number`

The minimum interest rate (posted + adjustment) for mortgages.

###### buyer.investsSavings

`boolean`

Whether the buyer invests any monthly savings (difference between their expenses and the renter's/max expenses) into the stock market. If `false`, these savings are discarded.

###### buyer.purchaseFixedFees

`number`

One-time costs at purchase (notary, etc.). Do not include land transfer tax here, as it is calculated automatically based on the city.

###### buyer.sellingCommissionRate

`number`

The commission rate paid to real estate agents upon sale (e.g., `0.05` for 5%).

###### buyer.variableRateAdjustment

`number`

The adjustment applied to the variable mortgage rate (added to the posted rate).

###### choleskyMatrix

`number`[][]

Mandatory Cholesky decomposition matrix for the 16 stochastic variables.
You must pre-compute this using `getRentVsBuyCholeskyMatrix` and pass it
into the simulation.

###### city

`"Quebec"` \| `"Toronto"` \| `"Montreal"` \| `"Calgary"` \| `"Ottawa"` \| `"Edmonton"` \| `"Winnipeg"` \| `"Vancouver"` \| `"Hamilton"` \| `"Halifax"` \| `"London"` \| `"Saskatoon"` \| `"Kitchener-Waterloo"` \| `"Regina"` \| `"Victoria"` \| `"Barrie"` \| `"Guelph"` \| `"Kingston"` \| `"Fredericton"` \| `"Moncton"` \| `"Saint John (NB)"` \| `"Saint John's (NL)"`

The city where the home is located, used to calculate land transfer tax and derive the province for sales and income taxes.

###### couple

`boolean`

Whether to simulate investments and taxes for a couple doubling TFSA contribution room and splitting capital gains in 2. Assumes the stochastic employmentIncome parameter represents the per-partner income.

###### iterations

`number`

The number of simulation iterations to run.

###### numberOfYears

`number`

The duration of each simulation in years.

###### renter

\{ `securityDeposit`: `number`; \}

Configuration for the renter scenario.

###### renter.securityDeposit

`number`

The initial security deposit or last month's rent (scenario-dependent).

###### startingYear

`number`

The year the simulation begins.

###### stochasticParameters

\{ `appreciation`: \{ `initialValue`: `number`; `mu`: `number`; `sigma`: `number`; \}; `condoFee`: \{ `initialValue`: `number`; `mu`: `number`; `sigma`: `number`; \}; `employmentIncome`: \{ `initialValue`: `number`; `mu`: `number`; `sigma`: `number`; \}; `fiveYearInterestRates`: \{ `a`: `number`; `b`: `number`; `initialValue`: `number`; `sigma`: `number`; \}; `fourYearInterestRates`: \{ `a`: `number`; `b`: `number`; `initialValue`: `number`; `sigma`: `number`; \}; `maintenance`: \{ `initialValue`: `number`; `mu`: `number`; `sigma`: `number`; \}; `market`: \{ `initialValue`: `number`; `mu`: `number`; `sigma`: `number`; \}; `oneYearInterestRates`: \{ `a`: `number`; `b`: `number`; `initialValue`: `number`; `sigma`: `number`; \}; `ownerInsurance`: \{ `initialValue`: `number`; `mu`: `number`; `sigma`: `number`; \}; `propertyTax`: \{ `initialValue`: `number`; `mu`: `number`; `sigma`: `number`; \}; `rent`: \{ `initialValue`: `number`; `mu`: `number`; `sigma`: `number`; \}; `renterInsurance`: \{ `initialValue`: `number`; `mu`: `number`; `sigma`: `number`; \}; `sellingFixedFees`: \{ `initialValue`: `number`; `mu`: `number`; `sigma`: `number`; \}; `threeYearInterestRates`: \{ `a`: `number`; `b`: `number`; `initialValue`: `number`; `sigma`: `number`; \}; `twoYearInterestRates`: \{ `a`: `number`; `b`: `number`; `initialValue`: `number`; `sigma`: `number`; \}; `variableInterestRates`: \{ `a`: `number`; `b`: `number`; `initialValue`: `number`; `sigma`: `number`; \}; \}

Parameters for the stochastic models.
  For all parameters (market return rate, dollar amounts, interest rates), use:
  - `initialValue`: The starting value (e.g., `0.07` for 7% market return, `1500` for $1,500 monthly rent, or `0.05` for a 5% interest rate).

  For **Geometric Brownian Motion (GBM)** models (income, market, rent, expenses, appreciation):
  - `mu`: The drift or expected annual growth rate.
  - `sigma`: The annual volatility.

  For **Cox-Ingersoll-Ross (CIR)** models (interest rates):
  - `a`: Speed of mean reversion.
  - `b`: Long-term mean.
  - `sigma`: Annual volatility.

###### stochasticParameters.appreciation

\{ `initialValue`: `number`; `mu`: `number`; `sigma`: `number`; \}

Home value appreciation rates (GBM).

###### stochasticParameters.appreciation.initialValue

`number`

###### stochasticParameters.appreciation.mu

`number`

###### stochasticParameters.appreciation.sigma

`number`

###### stochasticParameters.condoFee

\{ `initialValue`: `number`; `mu`: `number`; `sigma`: `number`; \}

Condo fee increase rates (GBM).

###### stochasticParameters.condoFee.initialValue

`number`

###### stochasticParameters.condoFee.mu

`number`

###### stochasticParameters.condoFee.sigma

`number`

###### stochasticParameters.employmentIncome

\{ `initialValue`: `number`; `mu`: `number`; `sigma`: `number`; \}

Employment income trajectory (GBM).

###### stochasticParameters.employmentIncome.initialValue

`number`

###### stochasticParameters.employmentIncome.mu

`number`

###### stochasticParameters.employmentIncome.sigma

`number`

###### stochasticParameters.fiveYearInterestRates

\{ `a`: `number`; `b`: `number`; `initialValue`: `number`; `sigma`: `number`; \}

5-year fixed interest rates (CIR).

###### stochasticParameters.fiveYearInterestRates.a

`number`

###### stochasticParameters.fiveYearInterestRates.b

`number`

###### stochasticParameters.fiveYearInterestRates.initialValue

`number`

###### stochasticParameters.fiveYearInterestRates.sigma

`number`

###### stochasticParameters.fourYearInterestRates

\{ `a`: `number`; `b`: `number`; `initialValue`: `number`; `sigma`: `number`; \}

4-year fixed interest rates (CIR).

###### stochasticParameters.fourYearInterestRates.a

`number`

###### stochasticParameters.fourYearInterestRates.b

`number`

###### stochasticParameters.fourYearInterestRates.initialValue

`number`

###### stochasticParameters.fourYearInterestRates.sigma

`number`

###### stochasticParameters.maintenance

\{ `initialValue`: `number`; `mu`: `number`; `sigma`: `number`; \}

Maintenance cost increase rates (GBM).

###### stochasticParameters.maintenance.initialValue

`number`

###### stochasticParameters.maintenance.mu

`number`

###### stochasticParameters.maintenance.sigma

`number`

###### stochasticParameters.market

\{ `initialValue`: `number`; `mu`: `number`; `sigma`: `number`; \}

Market return rates for savings (GBM).

###### stochasticParameters.market.initialValue

`number`

###### stochasticParameters.market.mu

`number`

###### stochasticParameters.market.sigma

`number`

###### stochasticParameters.oneYearInterestRates

\{ `a`: `number`; `b`: `number`; `initialValue`: `number`; `sigma`: `number`; \}

1-year fixed interest rates (CIR).

###### stochasticParameters.oneYearInterestRates.a

`number`

###### stochasticParameters.oneYearInterestRates.b

`number`

###### stochasticParameters.oneYearInterestRates.initialValue

`number`

###### stochasticParameters.oneYearInterestRates.sigma

`number`

###### stochasticParameters.ownerInsurance

\{ `initialValue`: `number`; `mu`: `number`; `sigma`: `number`; \}

Homeowner's insurance increase rates (GBM).

###### stochasticParameters.ownerInsurance.initialValue

`number`

###### stochasticParameters.ownerInsurance.mu

`number`

###### stochasticParameters.ownerInsurance.sigma

`number`

###### stochasticParameters.propertyTax

\{ `initialValue`: `number`; `mu`: `number`; `sigma`: `number`; \}

Property tax increase rates (GBM).

###### stochasticParameters.propertyTax.initialValue

`number`

###### stochasticParameters.propertyTax.mu

`number`

###### stochasticParameters.propertyTax.sigma

`number`

###### stochasticParameters.rent

\{ `initialValue`: `number`; `mu`: `number`; `sigma`: `number`; \}

Rent increase rates (GBM).

###### stochasticParameters.rent.initialValue

`number`

###### stochasticParameters.rent.mu

`number`

###### stochasticParameters.rent.sigma

`number`

###### stochasticParameters.renterInsurance

\{ `initialValue`: `number`; `mu`: `number`; `sigma`: `number`; \}

Renter's insurance increase rates (GBM).

###### stochasticParameters.renterInsurance.initialValue

`number`

###### stochasticParameters.renterInsurance.mu

`number`

###### stochasticParameters.renterInsurance.sigma

`number`

###### stochasticParameters.sellingFixedFees

\{ `initialValue`: `number`; `mu`: `number`; `sigma`: `number`; \}

Selling fixed fees increase rates (GBM).

###### stochasticParameters.sellingFixedFees.initialValue

`number`

###### stochasticParameters.sellingFixedFees.mu

`number`

###### stochasticParameters.sellingFixedFees.sigma

`number`

###### stochasticParameters.threeYearInterestRates

\{ `a`: `number`; `b`: `number`; `initialValue`: `number`; `sigma`: `number`; \}

3-year fixed interest rates (CIR).

###### stochasticParameters.threeYearInterestRates.a

`number`

###### stochasticParameters.threeYearInterestRates.b

`number`

###### stochasticParameters.threeYearInterestRates.initialValue

`number`

###### stochasticParameters.threeYearInterestRates.sigma

`number`

###### stochasticParameters.twoYearInterestRates

\{ `a`: `number`; `b`: `number`; `initialValue`: `number`; `sigma`: `number`; \}

2-year fixed interest rates (CIR).

###### stochasticParameters.twoYearInterestRates.a

`number`

###### stochasticParameters.twoYearInterestRates.b

`number`

###### stochasticParameters.twoYearInterestRates.initialValue

`number`

###### stochasticParameters.twoYearInterestRates.sigma

`number`

###### stochasticParameters.variableInterestRates

\{ `a`: `number`; `b`: `number`; `initialValue`: `number`; `sigma`: `number`; \}

Variable interest rates (CIR).

###### stochasticParameters.variableInterestRates.a

`number`

###### stochasticParameters.variableInterestRates.b

`number`

###### stochasticParameters.variableInterestRates.initialValue

`number`

###### stochasticParameters.variableInterestRates.sigma

`number`

###### tfsaContributions

`boolean`

Whether to prioritize TFSA contributions for investments (tax-free gains).

###### winVariable

`"assets"` \| `"balance"` \| `"balanceAfterSelling"`

The variable used to determine the winner of each iteration. Use `"balanceAfterSelling"` for the net balance after simulated sale of all assets, `"balance"` for the cumulative balance before any sale simulation, or `"assets"` for the total raw asset value (TFSA + stocks + home equity + security deposit).

##### options?

Additional simulation options.

###### adjustToInflation?

`"marketReturnRate"` \| `"rentIncrease"` \| `"ownerInsuranceIncrease"` \| `"renterInsuranceIncrease"` \| `"maintenanceIncrease"` \| `"propertyTaxIncrease"` \| `"condoFeeIncrease"` \| `"appreciationIncrease"` \| `"sellingFixedFeesIncrease"`

The rate parameter used as a proxy for inflation to express future dollar values in today's constant dollars. When set (e.g. to `"sellingFixedFeesIncrease"`), point-in-time metrics (like `monthlyExpenses`, `assets`, and `balance`) are discounted by the current month's simulated inflation factor. Cumulative totals (like `cumulativeExpenses` and `cumulativeGains`) accumulate real values incrementally — meaning each nominal monthly contribution is discounted before being added to the running sum. One-time upfront costs paid at month 0 (`downPayment`, `purchaseFixedFees`, `landTransferTax`, `insurancePremium`, `securityDeposit`) are **not** discounted because their real value already equals their nominal value. Defaults to `undefined` (no adjustment).

###### details?

\{ `filterGroups?`: (`"assets"` \| `"monthlyExpenses"` \| `"cumulativeExpenses"` \| `"monthlyGains"` \| `"cumulativeGains"` \| `"summary"` \| `"summaryCumulative"` \| `"saleCosts"` \| `"saleNetGains"` \| `"monthlyRecurringExpenses"` \| `"monthlyNonRecurringExpenses"` \| `"totals"`)[]; `filterVariables?`: (`"assets"` \| `"rent"` \| `"maintenance"` \| `"propertyTax"` \| `"balance"` \| `"balanceAfterSelling"` \| `"monthlyExpenses"` \| `"cumulativeExpenses"` \| `"insurance"` \| `"securityDeposit"` \| `"mortgageCapital"` \| `"mortgageInterests"` \| `"condoFees"` \| `"downPayment"` \| `"purchaseFixedFees"` \| `"landTransferTax"` \| `"insurancePremiumTax"` \| `"tfsaFees"` \| `"stocksFees"` \| `"monthlyGains"` \| `"cumulativeGains"` \| `"saleCosts"` \| `"saleNetGains"` \| `"monthlyRecurringExpenses"` \| `"monthlyNonRecurringExpenses"` \| `"tfsaGains"` \| `"tfsaContribution"` \| `"stocksGains"` \| `"newStocks"` \| `"homeEquityGains"` \| `"tfsa"` \| `"stocks"` \| `"homeEquity"` \| `"stockTaxes"` \| `"homeSellingCommission"` \| `"homeSellingFixedFees"` \| `"mortgagePenalty"` \| `"mortgageBalance"` \| `"stockSellingGains"` \| `"tfsaSellingGains"` \| `"homeSellingGains"`)[]; `firstMonth?`: `boolean`; `iterations?`: `boolean`; `quantiles?`: `number`[]; \}

When provided, enables detailed monthly data collection for all iterations.
- `iterations`: if `true`, captures raw per-iteration monthly records returned in `details.monthlyIterations`. Requires `filterGroups` to be set and non-empty — throws otherwise. Decode with `decodeMonteCarloMonthlyIterations`.
- `quantiles`: pre-computes the specified quantile levels (e.g. `[0, 0.5, 1]` for min/median/max) across all iterations for every variable/group/category/month, returned in `details.monthlyQuantiles`. Layout: `data[key][qIdx * cols + monthIndex]`. Decode with `decodeMonteCarloMonthlyQuantiles`.
- `firstMonth`: if `true`, captures data for all available groups and variables for the first month (monthIndex 0) during the first iteration. Returned as an array of objects in `details.firstMonth`. This capture is independent of `filterGroups` and `filterVariables`.
- `filterGroups`: required when `iterations: true`; restricts which groups are collected (e.g. `["assets", "summaryCumulative"]`), reducing memory usage. Also filters the shared column-major buffer used by `details.quantiles`.
- `filterVariables`: optional finer-grained filter; restricts which individual variables are stored within the allowed groups (e.g. `["balance", "homeEquity"]`), further reducing memory usage. Also filters the shared column-major buffer used by `details.quantiles`. An empty array is treated as no filter.
Both `iterations` and `quantiles` share the same internal column-major buffer, so enabling both together is more memory-efficient than the sum of their individual costs.

###### details.filterGroups?

(`"assets"` \| `"monthlyExpenses"` \| `"cumulativeExpenses"` \| `"monthlyGains"` \| `"cumulativeGains"` \| `"summary"` \| `"summaryCumulative"` \| `"saleCosts"` \| `"saleNetGains"` \| `"monthlyRecurringExpenses"` \| `"monthlyNonRecurringExpenses"` \| `"totals"`)[]

Required when `details.iterations` is `true`. Restricts which groups are included in the `monthlyIterations` output (e.g. `["assets", "summaryCumulative"]`), reducing memory usage. Also filters the shared column-major buffer used by `details.quantiles`.

  Available groups:
  - `monthlyExpenses`: Monthly cash outlays (rent, mortgage, taxes, fees, etc.).
  - `cumulativeExpenses`: Total cash outlays from start to current month.
  - `monthlyRecurringExpenses`: Recurring monthly costs (same as monthlyExpenses but excluding one-time items).
  - `monthlyNonRecurringExpenses`: One-time costs (down payment, closing costs).
  - `monthlyGains`: Monthly asset appreciation and contribution (market gains, home equity).
  - `cumulativeGains`: Total accumulated gains from start to current month.
  - `assets`: Current value of assets (stocks, TFSA, home equity, deposit).
  - `summary`: Point-in-time metrics like `balance`.
  - `summaryCumulative`: Final snapshot metrics like `balanceAfterSelling`.
  - `saleCosts`: Costs incurred upon selling (taxes, commission, penalties).
  - `saleNetGains`: Gains realized upon selling.
  - `totals`: Group-level sums of all variables in each of the above groups (e.g., `variable: "monthlyExpenses"` under `group: "totals"`).

###### details.filterVariables?

(`"assets"` \| `"rent"` \| `"maintenance"` \| `"propertyTax"` \| `"balance"` \| `"balanceAfterSelling"` \| `"monthlyExpenses"` \| `"cumulativeExpenses"` \| `"insurance"` \| `"securityDeposit"` \| `"mortgageCapital"` \| `"mortgageInterests"` \| `"condoFees"` \| `"downPayment"` \| `"purchaseFixedFees"` \| `"landTransferTax"` \| `"insurancePremiumTax"` \| `"tfsaFees"` \| `"stocksFees"` \| `"monthlyGains"` \| `"cumulativeGains"` \| `"saleCosts"` \| `"saleNetGains"` \| `"monthlyRecurringExpenses"` \| `"monthlyNonRecurringExpenses"` \| `"tfsaGains"` \| `"tfsaContribution"` \| `"stocksGains"` \| `"newStocks"` \| `"homeEquityGains"` \| `"tfsa"` \| `"stocks"` \| `"homeEquity"` \| `"stockTaxes"` \| `"homeSellingCommission"` \| `"homeSellingFixedFees"` \| `"mortgagePenalty"` \| `"mortgageBalance"` \| `"stockSellingGains"` \| `"tfsaSellingGains"` \| `"homeSellingGains"`)[]

Optional finer-grained filter applied within the allowed groups. Restricts which individual variables are stored in the columnar buffer (e.g. `["balance", "homeEquity"]`), reducing memory usage. Also filters the shared column-major buffer used by `details.quantiles`. An empty array is treated as no filter (all variables are stored).

  Commonly used variables:
  - `rent`, `mortgageCapital`, `mortgageInterests`, `maintenance`, `propertyTax`, `condoFees` (expenses).
  - `tfsa`, `stocks`, `homeEquity` (assets).
  - `balance`, `balanceAfterSelling` (summary).
  - `monthlyRecurringExpenses`, `monthlyExpenses`, `assets` (totals).

###### details.firstMonth?

`boolean`

If `true`, captures data for all available groups and variables for the first month (monthIndex 0) during the first iteration. Returned as an array of objects in `details.firstMonth`. This capture is independent of `filterGroups` and `filterVariables`, making it useful for a complete manifest of initial costs.

###### details.iterations?

`boolean`

If `true`, captures and returns the raw monthly financial data for every variable, group, and category for each individual iteration. Requires `details.filterGroups` to be set and non-empty — throws otherwise. Each record includes `iteration` (0-based index), `category`, `group`, `variable`, `monthIndex`, and `amount`. Useful for custom aggregations or visualization of individual paths. Be aware that this can produce a very large number of records (iterations × months × variables × 3 categories), so use `filterGroups` and `filterVariables` to limit scope.

###### details.quantiles?

`number`[]

When provided, pre-computes the specified quantile levels (e.g. `[0, 0.5, 1]` for min/median/max) across all iterations for every variable/group/category/month combination. Layout: `data[key][qIdx * cols + monthIndex]`. Decode with `decodeMonteCarloMonthlyQuantiles`.

###### values?

`boolean`

If `true`, captures the stochastic path values for all 16 variables (e.g. employment income, market returns, interest rates) across all iterations. Dollar-amount paths (employment income, rent, insurances, maintenance, property tax, condo fees, appreciation, selling fixed fees) are expressed in real (inflation-adjusted) dollars when `options.adjustToInflation` is set, using the same deflation factor as `details`. Rate paths (market returns, all six interest rates) are always nominal. Decode with `decodeMonteCarloValues`. Be cautious with high iteration counts as this can consume significant memory.

###### verbose?

`boolean`

If `true`, logs the current iteration number to the console at the frequency set by `verboseStep`. Also logs the total elapsed time upon completion via `prettyDuration`. Useful for long-running simulations.

###### verboseStep?

`number`

The frequency of progress logging. For example, setting this to `50` will log progress every 50 iterations. Defaults to `1`.

#### Returns

An object with all large arrays in columnar format (flat `Float64Array` matrices, transferable via `postMessage`). Use `decodeMonteCarloWinners`, `decodeMonteCarloValues`, `decodeMonteCarloMonthlyIterations`, and `decodeMonteCarloMonthlyQuantiles` from `@nshiab/journalism-finance` to restore object-array shapes.
  - `winners`: A `WinnersColumnar` with `monthIndex`, `amount` (`Float64Array`) and `category` (`Uint8Array`) indicating which scenario won each iteration. Decode with `decodeMonteCarloWinners`.
  - `winnerSnapshots`: A `WinnerSnapshots` containing per-checkpoint win rates and median amounts. Win rates are clipped/smoothed to the range `[0.01, 0.98]` (for a single dominant winner, with other scenarios receiving 1% each, yielding `[0.01, 0.01, 0.98]`) so they never return exactly 0% or 100%, reflecting unmodeled tail risks and preventing deterministic misinterpretation of statistical estimates.
  - `values`: A `ColumnarResult` with stochastic path values per iteration (enabled with `options.values`). Decode with `decodeMonteCarloValues`.
  - `details.monthlyIterations`: A `ColumnarResult` with raw monthly records per iteration (enabled with `options.details.iterations`). Decode with `decodeMonteCarloMonthlyIterations`.
  - `details.monthlyQuantiles`: A `ColumnarResult` with pre-computed quantile summaries (enabled with `options.details.quantiles`). Decode with `decodeMonteCarloMonthlyQuantiles`.

##### details

> **details**: `object`

Per-iteration and per-quantile monthly data, populated when `options.details` is provided.
- `monthlyIterations`: raw per-iteration monthly records. Layout: `data[key][iteration * cols + monthIndex]`. Decode with `decodeMonteCarloMonthlyIterations`.
- `monthlyQuantiles`: pre-computed quantile summaries. Layout: `data[key][qIdx * cols + monthIndex]`. Decode with `decodeMonteCarloMonthlyQuantiles`.
- `firstMonth`: simple record of all data for category/group/variable at monthIndex 0, captured during the first iteration (assuming month 0 is deterministic).

###### details.firstMonth?

> `optional` **firstMonth?**: (`object` & \{ `effectiveInterestRate?`: `number`; `fixedRateAdjustment?`: `number`; `group`: `"monthlyExpenses"` \| `"cumulativeExpenses"`; `postedInterestRate?`: `number`; `variable`: `"rent"` \| `"maintenance"` \| `"propertyTax"` \| `"insurance"` \| `"securityDeposit"` \| `"mortgageCapital"` \| `"mortgageInterests"` \| `"condoFees"` \| `"downPayment"` \| `"purchaseFixedFees"` \| `"landTransferTax"` \| `"insurancePremiumTax"` \| `"tfsaFees"` \| `"stocksFees"`; `variableRateAdjustment?`: `number`; \} \| \{ `group`: `"monthlyGains"` \| `"cumulativeGains"`; `homeValue?`: `number`; `variable`: `"tfsaGains"` \| `"tfsaContribution"` \| `"stocksGains"` \| `"newStocks"` \| `"homeEquityGains"`; \} \| \{ `group`: `"assets"`; `variable`: `"securityDeposit"` \| `"tfsa"` \| `"stocks"` \| `"homeEquity"`; \} \| \{ `group`: `"summary"`; `variable`: `"balance"`; \} \| \{ `group`: `"summaryCumulative"`; `variable`: `"balance"` \| `"balanceAfterSelling"`; \} \| \{ `employmentIncome?`: `number`; `group`: `"saleCosts"`; `variable`: `"stockTaxes"` \| `"homeSellingCommission"` \| `"homeSellingFixedFees"` \| `"mortgagePenalty"` \| `"mortgageBalance"`; \} \| \{ `group`: `"saleNetGains"`; `variable`: `"securityDeposit"` \| `"stockSellingGains"` \| `"tfsaSellingGains"` \| `"homeSellingGains"`; \} \| \{ `group`: `"monthlyRecurringExpenses"`; `variable`: `"rent"` \| `"maintenance"` \| `"propertyTax"` \| `"insurance"` \| `"mortgageCapital"` \| `"mortgageInterests"` \| `"condoFees"` \| `"tfsaFees"` \| `"stocksFees"`; \} \| \{ `group`: `"monthlyNonRecurringExpenses"`; `variable`: `"securityDeposit"` \| `"downPayment"` \| `"purchaseFixedFees"` \| `"landTransferTax"` \| `"insurancePremiumTax"`; \} \| \{ `group`: `"totals"`; `variable`: `"assets"` \| `"monthlyExpenses"` \| `"cumulativeExpenses"` \| `"monthlyGains"` \| `"cumulativeGains"` \| `"saleCosts"` \| `"saleNetGains"` \| `"monthlyRecurringExpenses"` \| `"monthlyNonRecurringExpenses"`; \})[]

###### details.monthlyIterations

> **monthlyIterations**: `object`

###### details.monthlyIterations.cols

> **cols**: `number`

###### details.monthlyIterations.data

> **data**: `Record`\<`string`, `Float64Array`\>

###### details.monthlyIterations.keys

> **keys**: `string`[]

###### details.monthlyIterations.rows

> **rows**: `number`

###### details.monthlyQuantiles

> **monthlyQuantiles**: `object`

###### details.monthlyQuantiles.cols

> **cols**: `number`

###### details.monthlyQuantiles.data

> **data**: `Record`\<`string`, `Float64Array`\>

###### details.monthlyQuantiles.keys

> **keys**: `string`[]

###### details.monthlyQuantiles.rows

> **rows**: `number`

##### values

> **values**: `object`

###### values.cols

> **cols**: `number`

###### values.data

> **data**: `Record`\<`string`, `Float64Array`\>

###### values.keys

> **keys**: `string`[]

###### values.rows

> **rows**: `number`

##### winners

> **winners**: `object`

###### winners.amount

> **amount**: `Float64Array`

Final `amount` of the winning scenario for each iteration.

###### winners.category

> **category**: `Uint8Array`

Winning scenario category encoded as a byte.
Use `decodeMonteCarloWinners` to decode the category names.

###### winners.monthIndex

> **monthIndex**: `Float64Array`

Final `monthIndex` of the winning scenario for each iteration.

##### winnerSnapshots

> **winnerSnapshots**: `object`

###### winnerSnapshots.buyerFixed

> **buyerFixed**: `Float64Array`

Fraction of iterations (strictly in the range [0.01, 0.98]) where the buyerFixed scenario
had the highest `winVariable` at this checkpoint. Win rates are clipped/smoothed to reflect
unmodeled tail risks and prevent deterministic misinterpretation (e.g., [1.0, 0.0, 0.0] becomes [0.98, 0.01, 0.01]).

###### winnerSnapshots.buyerFixedMedian

> **buyerFixedMedian**: `Float64Array`

###### winnerSnapshots.buyerVariable

> **buyerVariable**: `Float64Array`

Fraction of iterations (strictly in the range [0.01, 0.98]) where the buyerVariable scenario
had the highest `winVariable` at this checkpoint. Win rates are clipped/smoothed to reflect
unmodeled tail risks and prevent deterministic misinterpretation (e.g., [1.0, 0.0, 0.0] becomes [0.98, 0.01, 0.01]).

###### winnerSnapshots.buyerVariableMedian

> **buyerVariableMedian**: `Float64Array`

###### winnerSnapshots.renter

> **renter**: `Float64Array`

Fraction of iterations (strictly in the range [0.01, 0.98]) where the renter scenario
had the highest `winVariable` at this checkpoint. Win rates are clipped/smoothed to reflect
unmodeled tail risks and prevent deterministic misinterpretation (e.g., [1.0, 0.0, 0.0] becomes [0.98, 0.01, 0.01]).

###### winnerSnapshots.renterMedian

> **renterMedian**: `Float64Array`

Median `winVariable` amount for each category at each snapshot.

###### winnerSnapshots.snapshotMonths

> **snapshotMonths**: `number`[]

Month indices of each snapshot (e.g. `[59, 119, 179, 239, 299]` for a 25-year sim, i.e. end of years 5, 10, 15, 20, 25).

#### Throws

If the down payment is less than the minimum required down payment in Canada.

#### Example

```ts
import { simulateRentVsBuyMonteCarlo, getRentVsBuyCholeskyMatrix } from "@nshiab/journalism-finance";

// Assuming you have an object `historicalData` of type `StochasticData`
// where each key holds an array of historical values for that variable.
const choleskyMatrix = getRentVsBuyCholeskyMatrix(historicalData);

const results = simulateRentVsBuyMonteCarlo({
  iterations: 1000,
  choleskyMatrix,
  winVariable: "balanceAfterSelling",
  startingYear: 2026,
  numberOfYears: 25,
  tfsaContributions: true,
  annualInvestmentFeeRate: 0.0025,
  couple: false,
  city: "Toronto",
  renter: {
    securityDeposit: 1500,
  },
  buyer: {
    downPayment: 50000,
    fixedRateAdjustment: -0.015,
    variableRateAdjustment: -0.005,
    firstTimeOwner: true, investsSavings: true,
    purchaseFixedFees: 2000,
    sellingCommissionRate: 0.05,
    floorRate: 0.01,
    investsSavings: true,
  },
  stochasticParameters: {
    employmentIncome: { initialValue: 80000, mu: 0.03, sigma: 0.05 },
    market: { initialValue: 0.07, mu: 0.07, sigma: 0.15 },
    rent: { initialValue: 1500, mu: 0.03, sigma: 0.02 },
    ownerInsurance: { initialValue: 120, mu: 0.03, sigma: 0.02 },
    renterInsurance: { initialValue: 30, mu: 0.03, sigma: 0.02 },
    maintenance: { initialValue: 200, mu: 0.03, sigma: 0.02 },
    propertyTax: { initialValue: 300, mu: 0.03, sigma: 0.02 },
    condoFee: { initialValue: 300, mu: 0.03, sigma: 0.02 },
    appreciation: { initialValue: 500000, mu: 0.04, sigma: 0.1 },
    sellingFixedFees: { initialValue: 2000, mu: 0.02, sigma: 0.01 },
    fiveYearInterestRates: { initialValue: 0.05, a: 0.2, b: 0.05, sigma: 0.02 },
    fourYearInterestRates: { initialValue: 0.05, a: 0.2, b: 0.05, sigma: 0.02 },
    threeYearInterestRates: { initialValue: 0.05, a: 0.2, b: 0.05, sigma: 0.02 },
    twoYearInterestRates: { initialValue: 0.05, a: 0.2, b: 0.05, sigma: 0.02 },
    oneYearInterestRates: { initialValue: 0.05, a: 0.2, b: 0.05, sigma: 0.02 },
    variableInterestRates: { initialValue: 0.06, a: 0.2, b: 0.06, sigma: 0.02 },
  },
});
```

***

### variableMortgagePayments()

> **variableMortgagePayments**(`mortgageAmount`, `rates`, `term`, `amortizationPeriod`, `options?`): `object`[]

Defined in: [journalism-finance/src/finance/variableMortgagePayments.ts:45](https://github.com/nshiab/journalism-finance/blob/v2.0.3/src/finance/variableMortgagePayments.ts#L45)

Calculates and returns a detailed schedule of variable-rate monthly mortgage payments (VRM). This function models a Variable Rate Mortgage where the payment amount stays FIXED for the term, but rate changes affect how much goes to interest vs. principal. If rates rise too high, payments may not cover interest, causing negative amortization (balance increases).

#### Parameters

##### mortgageAmount

`number`

The total amount of the mortgage loan.

##### rates

`number`[]

An array of annual interest rates (e.g., `[6.00, 6.00, 5.50, 5.50, ...]` for rates in percentages). The array must contain at least as many rates as there are payments in the term. Each element corresponds to the rate for that payment period (0-based index).

##### term

`number`

The term of the mortgage in years. This is the length of the current mortgage contract.

##### amortizationPeriod

`number`

The total amortization period of the mortgage in years. This is the total time it will take to pay off the mortgage.

##### options?

Additional options for customizing the mortgage calculation and output.

###### annualCompounding?

`number`

The number of times the mortgage interest should be compounded per year. Defaults to `12` (monthly compounding). Set to `2` for semi-annual compounding as is standard in Canada.

###### debug?

`boolean`

If `true`, enables debug logging to the console, providing additional insights into the calculation process. Defaults to `false`.

###### decimals?

`number`

The number of decimal places to round the financial values (payment, interest, capital, balance) to. Defaults to `2`.

###### id?

`string`

An optional string ID to be added to each payment object in the returned array. Useful for tracking payments related to a specific mortgage.

#### Returns

`object`[]

An array of objects, where each object represents a single mortgage payment and contains:
  - `paymentId`: A 0-based index for the payment.
  - `payment`: The total amount of the payment (fixed for the term).
  - `interest`: The portion that goes towards interest (varies with rate changes).
  - `capital`: The portion that goes towards the principal (can be negative during negative amortization).
  - `balance`: The remaining mortgage balance after the payment (can increase if interest exceeds payment).
  - `amountPaid`: The cumulative total amount paid so far.
  - `interestPaid`: The cumulative total interest paid so far.
  - `capitalPaid`: The cumulative total capital reimbursed so far (can be negative).
  - `rate`: The annual interest rate in effect for this payment.
  - `id` (optional): The ID provided in `options.id`.

#### Throws

If the `amortizationPeriod` is less than the `term`, as this is an invalid mortgage configuration.

#### Throws

If the `rates` array does not contain enough rates for all payments in the term.

#### Example

```ts
// VRM: Payment stays fixed, but rate changes affect interest/principal split
// If rates rise high enough, balance can increase (negative amortization)
const rates = [
  ...Array(12).fill(6),    // Months 0-11 at 6%
  ...Array(12).fill(5.5),  // Months 12-23 at 5.5% (more goes to principal)
  ...Array(36).fill(7.5)   // Months 24-59 at 7.5% (might trigger negative amortization)
];
const payments = variableMortgagePayments(250_000, rates, 5, 25);
console.log(payments[0]);  // Payment amount set based on initial rate
console.log(payments[12]); // Same payment, but less interest (rate dropped)
console.log(payments[24]); // Same payment, but more interest (rate increased)
```

## Formatting

### arraysToData()

> **arraysToData**\<`T`\>(`data`): \{ \[K in string \| number \| symbol\]: T\[K\]\[number\] \}[]

Defined in: [journalism-format/src/format/arraysToData.ts:52](https://github.com/nshiab/journalism-format/blob/v1.1.12/src/format/arraysToData.ts#L52)

Transforms an object of arrays into an array of objects. This function is useful for converting data from a columnar format to a row-based format, which is common in data processing and visualization.

It is assumed that all arrays in the input object have the same length.

#### Type Parameters

##### T

`T` *extends* `Record`\<`string`, `unknown`[]\>

#### Parameters

##### data

`T`

An object where each key is a string and its corresponding value is an array of any type. All arrays are expected to have the same length.

#### Returns

\{ \[K in string \| number \| symbol\]: T\[K\]\[number\] \}[]

An array of objects, where each object is a "row" of data created by combining values from the input arrays at the same index.

#### Examples

```ts
// Basic usage with mixed data types
const columnarData = {
  name: ['Alice', 'Bob', 'Charlie'],
  age: [30, 25, 35],
  city: ['New York', 'London', 'Paris']
};

const rowData = arraysToData(columnarData);

console.log(rowData);
// Expected output:
// [
//   { name: 'Alice', age: 30, city: 'New York' },
//   { name: 'Bob', age: 25, city: 'London' },
//   { name: 'Charlie', age: 35, city: 'Paris' }
// ]
```

```ts
// Usage with numerical data for charting
const chartData = {
  x: [1, 2, 3, 4, 5],
  y: [10, 20, 15, 25, 30]
};

const plotPoints = arraysToData(chartData);

console.log(plotPoints);
// Expected output:
// [
//   { x: 1, y: 10 },
//   { x: 2, y: 20 },
//   { x: 3, y: 15 },
//   { x: 4, y: 25 },
//   { x: 5, y: 30 }
// ]
```

***

### camelCase()

> **camelCase**(`input`): `string`

Defined in: [journalism-format/src/format/camelCase.ts:30](https://github.com/nshiab/journalism-format/blob/v1.1.12/src/format/camelCase.ts#L30)

Converts a string into camelCase. This is useful for creating variable names or object keys from human-readable text.

#### Parameters

##### input

`string`

The string to convert to camelCase. It can contain spaces, punctuation, and mixed casing.

#### Returns

`string`

The camelCased version of the input string.

#### Examples

```ts
// Basic conversion
const result1 = camelCase("hello world");
console.log(result1); // "helloWorld"
```

```ts
// With punctuation and mixed case
const result2 = camelCase("  --Some@Thing is- happening--  ");
console.log(result2); // "someThingsHappening"
```

```ts
// With a single word
const result3 = camelCase("Journalism");
console.log(result3); // "journalism"
```

***

### capitalize()

> **capitalize**(`string`): `string`

Defined in: [journalism-format/src/format/capitalize.ts:28](https://github.com/nshiab/journalism-format/blob/v1.1.12/src/format/capitalize.ts#L28)

Capitalizes the first letter of a given string.

#### Parameters

##### string

`string`

The string to be capitalized.

#### Returns

`string`

A new string with the first letter in uppercase.

#### Examples

```ts
// Basic usage
const capitalized = capitalize("hello world");
console.log(capitalized); // "Hello world"
```

```ts
// With an already capitalized string
const alreadyCapitalized = capitalize("Journalism");
console.log(alreadyCapitalized); // "Journalism"
```

```ts
// With a single character
const singleChar = capitalize("a");
console.log(singleChar); // "A"
```

***

### dataAsCsv()

> **dataAsCsv**(`arrayOfObjects`): `string`

Defined in: [journalism-format/src/format/dataAsCsv.ts:94](https://github.com/nshiab/journalism-format/blob/v1.1.12/src/format/dataAsCsv.ts#L94)

Converts an array of objects into a CSV (Comma-Separated Values) string.

The function takes an array of objects and returns a string in CSV format. The first line contains the union of keys found across all objects, in discovery order. Each subsequent line represents an object, with values in the same order as the headers.

Object and array values are serialized as JSON before CSV escaping. Date values
retain their UTC date formatting, and null or undefined values become empty cells.

#### Parameters

##### arrayOfObjects

`object`[]

The objects to convert. Rows may have different keys;
columns are inferred from all rows.

#### Returns

`string`

A string representing the data in CSV format.

#### Example

```ts
// Basic usage with a simple dataset
const dataset = [
  { make: "Toyota", model: "Camry", year: 2021 },
  { make: "Honda", model: "Accord", year: 2022 },
  { make: "Ford", model: "Mustang", year: 2020 }
];

const csvString = dataAsCsv(dataset);

console.log(csvString);
// Expected output:
// "make,model,year\nToyota,Camry,2021\nHonda,Accord,2022\nFord,Mustang,2020"
```

***

### dataToArrays()

> **dataToArrays**\<`T`\>(`data`): \{ \[K in string \| number \| symbol\]: T\[K\]\[\] \}

Defined in: [journalism-format/src/format/dataToArrays.ts:49](https://github.com/nshiab/journalism-format/blob/v1.1.12/src/format/dataToArrays.ts#L49)

Transforms an array of objects into an object of arrays. This function is the inverse of `arraysToData` and is useful for converting data from a row-based format to a columnar format.

#### Type Parameters

##### T

`T` *extends* `Record`\<`string`, `unknown`\>

#### Parameters

##### data

`T`[]

An array of objects. Each object is expected to have the same set of keys.

#### Returns

\{ \[K in string \| number \| symbol\]: T\[K\]\[\] \}

An object where each key maps to an array of values, effectively representing the data in a columnar format.

#### Examples

```ts
// Basic usage with a simple dataset
const rowData = [
  { name: 'Alice', age: 30, city: 'New York' },
  { name: 'Bob', age: 25, city: 'London' },
  { name: 'Charlie', age: 35, city: 'Paris' }
];

const columnarData = dataToArrays(rowData);

console.log(columnarData);
// Expected output:
// {
//   name: ['Alice', 'Bob', 'Charlie'],
//   age: [30, 25, 35],
//   city: ['New York', 'London', 'Paris']
// }
```

```ts
// Preparing data for statistical analysis
const measurements = [
  { id: 1, temp: 20, humidity: 60 },
  { id: 2, temp: 22, humidity: 65 },
  { id: 3, temp: 18, humidity: 55 }
];

const separatedVariables = dataToArrays(measurements);

console.log(separatedVariables);
// Expected output:
// {
//   id: [1, 2, 3],
//   temp: [20, 22, 18],
//   humidity: [60, 65, 55]
// }
```

***

### formatDate()

> **formatDate**(`date`, `format`, `options?`): `string`

Defined in: [journalism-format/src/format/formatDate.ts:55](https://github.com/nshiab/journalism-format/blob/v1.1.12/src/format/formatDate.ts#L55)

Formats a `Date` object into a human-readable string based on a specified format, style, and time zone. This function provides flexible date and time formatting options, including support for UTC, different linguistic styles (English/French), and various display preferences like abbreviations and zero-padding.

#### Parameters

##### date

`Date`

The `Date` object to be formatted.

##### format

`"YYYY-MM-DD"` \| `"YYYY-MM-DD HH:MM:SS TZ"` \| `"DayOfWeek, Month Day"` \| `"Month DD"` \| `"Month DD, HH:MM period"` \| `"Month DD, HH:MM period TZ"` \| `"DayOfWeek, HH:MM period"` \| `"DayOfWeek, HH:MM period TZ"` \| `"Month DD, YYYY"` \| `"Month DD, YYYY, at HH:MM period"` \| `"Month DD, YYYY, at HH:MM period TZ"` \| `"DayOfWeek"` \| `"Month"` \| `"YYYY"` \| `"MM"` \| `"DD"` \| `"HH:MM period"` \| `"HH:MM period TZ"` \| `"HH:MM period TZ on Month DD, YYYY"` \| `"HH:MM period on Month DD, YYYY"` \| `"HH:MM period TZ on Month DD"` \| `"HH:MM period on Month DD"`

A predefined string literal specifying the desired output format. Examples include "YYYY-MM-DD", "Month DD, YYYY", "HH:MM period", etc.

##### options?

Optional settings to customize the formatting behavior.

###### abbreviations?

`boolean`

If `true`, month and day names will be abbreviated (e.g., "Jan.", "Mon."). Defaults to `false`.

###### noZeroPadding?

`boolean`

If `true`, single-digit days and months will not be padded with a leading zero (e.g., "1" instead of "01"). Defaults to `false`.

###### style?

`"cbc"` \| `"rc"`

The linguistic style for formatting. Use "cbc" for English (default) or "rc" for French. This affects month and day names, and time representations.

###### threeLetterMonth?

`boolean`

If `true`, month abbreviations will be three letters (e.g., "Jan", "Feb"). Defaults to `false`.

###### timeZone?

`"Canada/Atlantic"` \| `"Canada/Central"` \| `"Canada/Eastern"` \| `"Canada/Mountain"` \| `"Canada/Newfoundland"` \| `"Canada/Pacific"` \| `"Canada/Saskatchewan"` \| `"Canada/Yukon"`

Specifies a time zone for formatting. Accepts standard IANA time zone names (e.g., "America/New_York") or specific Canadian time zones. If `utc` is `true`, this option is ignored.

###### utc?

`boolean`

If `true`, the date will be formatted in UTC (Coordinated Universal Time). Defaults to `false`.

#### Returns

`string`

The formatted date string.

#### Examples

```ts
// Basic usage: Format a date in default English style.
const date = new Date("2023-01-01T01:35:00.000Z");
const formatted = formatDate(date, "Month DD, YYYY, at HH:MM period", { utc: true });
console.log(formatted); // "January 1, 2023, at 1:35 a.m."
```

```ts
// Formatting in French style with abbreviations.
const frenchFormatted = formatDate(date, "Month DD, YYYY, at HH:MM period", {
  style: "rc",
  abbreviations: true,
  utc: true
});
console.log(frenchFormatted); // "1 janv. 2023 à 1 h 35"
```

```ts
// Formatting with a specific time zone.
const estFormatted = formatDate(date, "Month DD, YYYY, at HH:MM period TZ", {
  timeZone: "Canada/Eastern"
});
console.log(estFormatted); // "January 1, 2023, at 8:35 p.m. EST" (assuming date is UTC)
```

```ts
// Custom format: YYYY-MM-DD
const isoFormatted = formatDate(new Date("2024-03-15T10:00:00Z"), "YYYY-MM-DD");
console.log(isoFormatted); // "2024-03-15"
```

***

### formatNumber()

> **formatNumber**(`number`, `options?`): `string`

Defined in: [journalism-format/src/format/formatNumber.ts:62](https://github.com/nshiab/journalism-format/blob/v1.1.12/src/format/formatNumber.ts#L62)

Formats a number according to specified style, rounding, and display options. This versatile function can handle various numerical formatting needs.

The function supports two main styles: "cbc" (Canadian Broadcasting Corporation style, typically English) and "rc" (Radio-Canada style, typically French), which dictate the thousands separator and decimal marker.

#### Parameters

##### number

`number`

The number to be formatted.

##### options?

An object containing various formatting options.

###### abbreviation?

`boolean`

If `true`, the number will be abbreviated (e.g., 1,200,000 becomes "1.2M"). Defaults to `false`.

###### decimals?

`number`

The number of decimal places to round to.

###### fixed?

`boolean`

If `true`, the number will be displayed with a fixed number of decimal places as specified by `decimals`, padding with zeros if necessary. Defaults to `false`.

###### nearestInteger?

`number`

The base to which the number should be rounded (e.g., 10 for rounding to the nearest ten, 100 for nearest hundred).

###### position?

`boolean`

If `true`, formats the number as an ordinal position (e.g., "1st", "2nd" in English, "1er", "2e" in French).

###### prefix?

`string`

A string to prepend before the formatted number.

###### round?

`boolean`

If `true`, the number will be rounded to the nearest integer or based on `decimals`, `significantDigits`, or `nearestInteger` options. Defaults to `false`.

###### sign?

`boolean`

If `true`, a "+" sign will be prepended to positive numbers. Negative numbers always retain their "-" sign. Defaults to `false`.

###### significantDigits?

`number`

The number of significant digits to round to.

###### style?

`"cbc"` \| `"rc"`

The formatting style to apply. Can be "cbc" (default, typically English with comma thousands separator and dot decimal) or "rc" (typically French with space thousands separator and comma decimal).

###### suffix?

`string`

A string to append after the formatted number.

#### Returns

`string`

The formatted number as a string.

#### Examples

```ts
// Basic usage: Format a number with thousands separator.
const num1 = formatNumber(1234567.89);
console.log(num1); // "1,234,567.89"
```

```ts
// With sign and rounding to 0 decimals.
const num2 = formatNumber(1234.567, { sign: true, decimals: 0 });
console.log(num2); // "+1,235"
```

```ts
// French style with abbreviation.
const num3 = formatNumber(1234567, { style: "rc", abbreviation: true });
console.log(num3); // "1,2 M"
```

```ts
// Fixed number of decimals with prefix and suffix.
const num4 = formatNumber(98.765, { decimals: 2, fixed: true, prefix: "$", suffix: " CAD" });
console.log(num4); // "$98.77 CAD"
```

```ts
// Formatting as an ordinal position.
const position1 = formatNumber(1, { position: true });
console.log(position1); // "1st"

const position2 = formatNumber(2, { position: true, style: "rc" });
console.log(position2); // "2e"
```

***

### normalizeString()

> **normalizeString**(`string`, `options?`): `string`

Defined in: [journalism-format/src/format/normalizeString.ts:48](https://github.com/nshiab/journalism-format/blob/v1.1.12/src/format/normalizeString.ts#L48)

Normalizes a string by converting it to lowercase, stripping accents, punctuation (optional), and trimming whitespace.

#### Parameters

##### string

`string`

The string to be normalized.

##### options?

An optional object with options.

###### stripPunctuation?

`boolean`

If true, punctuation and underscores will be stripped. Defaults to true.

#### Returns

`string`

A new string with characters in lowercase, without accents, without punctuation (if specified), with single spaces between words, and without leading or trailing whitespace.

#### Examples

```ts
// Basic usage (strips punctuation by default)
const normalized = normalizeString("Évènement!  de  test");
console.log(normalized); // "evenement de test"
```

```ts
// Keeping punctuation
const normalized = normalizeString("Évènement!", { stripPunctuation: false });
console.log(normalized); // "evenement!"
```

```ts
// With accents, punctuation, and uppercase
const normalized = normalizeString("¡Niño!");
console.log(normalized); // "nino"
```

```ts
// Handling multiple types of whitespace and symbols
const normalized = normalizeString("Hello,  World!\t100%");
console.log(normalized); // "hello world 100"
```

```ts
// Stripping hyphens and underscores
const normalized = normalizeString("multi-word_example");
console.log(normalized); // "multiwordexample"
```

```ts
// Handling emails (strips @ and .)
const normalized = normalizeString("email@example.com");
console.log(normalized); // "emailexamplecom"
```

***

### prettyDuration()

> **prettyDuration**(`start`, `options?`): `string`

Defined in: [journalism-format/src/format/prettyDuration.ts:49](https://github.com/nshiab/journalism-format/blob/v1.1.12/src/format/prettyDuration.ts#L49)

Formats a duration into a human-readable string, breaking it down into years, months, days, hours, minutes, seconds, and milliseconds. This function is useful for displaying elapsed time in a user-friendly format, such as for performance logging, task completion times, or general time tracking.

The function can calculate the duration from a given start time to the current time, or between a specified start and end time. It provides options for logging the output directly to the console and adding custom prefixes or suffixes to the formatted string. Note that for simplicity, months are approximated as 30 days and years as 365 days.

#### Parameters

##### start

`number` \| `Date`

The starting point of the duration. This can be a `Date` object or a Unix timestamp (number of milliseconds since epoch).

##### options?

Optional settings to customize the duration formatting and output.

###### end?

`number` \| `Date`

The ending point of the duration. This can be a `Date` object or a Unix timestamp. If omitted, the current time (`Date.now()`) will be used as the end point.

###### log?

`boolean`

If `true`, the formatted duration string will be logged to the console. Defaults to `false`.

###### prefix?

`string`

A string to prepend to the formatted duration string (e.g., "Elapsed time: ").

###### suffix?

`string`

A string to append to the formatted duration string (e.g., " (Task completed)").

#### Returns

`string`

A human-readable string representing the duration.

#### Examples

```ts
// A starting Date somewhere in your code.
const startDate = new Date(); // or Date.now()

// When you want to know the elapsed duration, pass the start date.
const duration = prettyDuration(startDate);
console.log(duration); // Returns something like "22 days, 6 h, 3 min, 15 sec, 3 ms"
```

```ts
// If you want to console.log it directly, set the `log` option to `true`.
// This will print the duration to the console and also return the string.
const startDateForLog = new Date();
// ... some operations ...
prettyDuration(startDateForLog, { log: true });
```

```ts
// You can also use a prefix and/or suffix for the output string.
const startDateWithPrefixSuffix = new Date();
// ... some operations ...
prettyDuration(startDateWithPrefixSuffix, { log: true, prefix: "Elapsed time: ", suffix: " (Main function)" });
// Returns and logs something like "Total duration: 3 min, 15 sec, 3 ms (Main function)"
```

```ts
// If you want to format the duration between two specific dates, use the `end` option.
const start = new Date("2024-01-01T17:00:00");
const end = new Date("2024-01-23T23:03:15");
const specificDuration = prettyDuration(start, { end });
console.log(specificDuration); // Returns "22 days, 6 h, 3 min, 15 sec, 0 ms"
```

***

### printTable()

> **printTable**(`data`, `options?`): `void`

Defined in: [journalism-format/src/format/printTable.ts:39](https://github.com/nshiab/journalism-format/blob/v1.1.12/src/format/printTable.ts#L39)

Prints a formatted table to the console with support for word wrapping within cells.
Unlike console.table(), this function properly handles multi-line content within cells,
making it ideal for displaying data with long text values.

This function has been created for the [simple-data-analysis library](https://github.com/nshiab/simple-data-analysis), but can be used independently for any array of objects.

#### Parameters

##### data

`object`[]

An array of objects representing the rows of the table. Each object should have string keys.

##### options?

Optional configuration for table rendering.

###### maxColumnWidth?

`number`

The maximum width for any column (default: 75). Values exceeding this width will be wrapped at word boundaries.

###### minColumnWidth?

`number`

The minimum width for any column (default: 3).

###### typesRowIndex?

`number`

The index of a row that contains type annotations (e.g. "VARCHAR/string"). This row will be rendered in grey. If omitted, no row is treated as a types row.

#### Returns

`void`

void - The table is printed directly to the console.

#### Examples

```typescript
const data = [
  { name: "Alice", description: "A software engineer with expertise in TypeScript" },
  { name: "Bob", description: "A product manager" }
];
printTable(data, { maxColumnWidth: 30 });
// Outputs a nicely formatted table with word-wrapped description column
```

```typescript
// With types row
const types = { name: "VARCHAR/string", age: "INTEGER/number" };
const data = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 }
];
printTable([types, ...data], { typesRowIndex: 0 });
```

***

### round()

> **round**(`number`, `options?`): `number`

Defined in: [journalism-format/src/format/round.ts:72](https://github.com/nshiab/journalism-format/blob/v1.1.12/src/format/round.ts#L72)

Rounds a number based on specified criteria: a fixed number of decimal places, to the nearest integer multiple, or to a specific number of significant digits. This function provides flexible rounding capabilities essential for data presentation and numerical accuracy.

By default, if no options are specified, the function rounds to the nearest whole number.

#### Parameters

##### number

`number`

The number to be rounded.

##### options?

An object containing options for rounding.

###### decimals?

`number`

The number of decimal places to keep when rounding. For example, `round(123.456, { decimals: 2 })` returns `123.46`.

###### nearestInteger?

`number`

The base to which the number should be rounded. For example, `round(123, { nearestInteger: 10 })` rounds to `120`.

###### significantDigits?

`number`

The number of significant digits to retain. Significant digits are counted from the first non-zero digit. For example, `round(0.004622, { significantDigits: 1 })` rounds to `0.005`.

###### try?

`boolean`

If `true`, the function will return `NaN` (Not a Number) if the input `number` is not a valid number, instead of throwing an error. Defaults to `false`.

#### Returns

`number`

The rounded number.

#### Throws

If the input `number` is not a number (and `options.try` is not `true`), or if more than one rounding option (`decimals`, `nearestInteger`, `significantDigits`) is provided.

#### Examples

```ts
// Round to the nearest integer (default behavior).
const resultDefault = round(1234.567);
console.log(resultDefault); // Expected output: 1235

// Round to one decimal place.
const resultDecimal = round(1234.567, { decimals: 1 });
console.log(resultDecimal); // Expected output: 1234.6
```

```ts
// Round 123 to the nearest multiple of 10.
const resultNearestInteger = round(123, { nearestInteger: 10 });
console.log(resultNearestInteger); // Expected output: 120

// Round 127 to the nearest multiple of 5.
const resultNearestFive = round(127, { nearestInteger: 5 });
console.log(resultNearestFive); // Expected output: 125
```

```ts
// Round 0.004622 to 1 significant digit.
const resultSignificantDigits = round(0.004622, { significantDigits: 1 });
console.log(resultSignificantDigits); // Expected output: 0.005

// Round 12345 to 2 significant digits.
const resultSignificantDigitsLarge = round(12345, { significantDigits: 2 });
console.log(resultSignificantDigitsLarge); // Expected output: 12000
```

```ts
// Attempting to round a non-numeric value without `try: true` will throw an error.
try {
  round("abc");
} catch (error) {
  console.error("Error:", error.message);
  // Expected output: "Error: abc is not a number. If you want to return NaN instead of throwing an error, pass option {try: true}."
}

// With `try: true`, it returns NaN for non-numeric input.
const nanResult = round("abc", { try: true });
console.log(nanResult); // Expected output: NaN
```

```ts
// Providing multiple rounding options will throw an error.
try {
  round(123.45, { decimals: 1, significantDigits: 2 });
} catch (error) {
  console.error("Error:", error.message);
  // Expected output: "Error: You can't use options decimals, nearestInteger, or significantDigits together. Pick one."
}
```

## Geo

### distance()

> **distance**(`lon1`, `lat1`, `lon2`, `lat2`, `options?`): `number`

Defined in: [journalism-geo/src/geo/distance.ts:33](https://github.com/nshiab/journalism-geo/blob/v1.0.26/src/geo/distance.ts#L33)

Calculates the Haversine distance between two geographical points (longitude and latitude) in kilometers. The Haversine formula is used to determine the great-circle distance between two points on a sphere given their longitudes and latitudes.

This function is useful for geospatial applications where accurate distance measurements over the Earth's surface are required,.

#### Parameters

##### lon1

`number`

The longitude of the first point.

##### lat1

`number`

The latitude of the first point.

##### lon2

`number`

The longitude of the second point.

##### lat2

`number`

The latitude of the second point.

##### options?

Optional settings for the distance calculation.

###### decimals?

`number`

The number of decimal places to round the result to. If not specified, the result will not be rounded.

#### Returns

`number`

The distance between the two points in kilometers.

#### Examples

```ts
// Basic usage: Calculate the distance between two cities.
// Montreal (-73.5673, 45.5017) and Toronto (-79.3832, 43.6532)
const dist = distance(-73.5673, 45.5017, -79.3832, 43.6532);
console.log(dist); // Approximately 504.3 km
```

```ts
// Rounding the result to a whole number.
const roundedDist = distance(-73.5673, 45.5017, -79.3832, 43.6532, { decimals: 0 });
console.log(roundedDist); // 504 km
```

***

### geoTo3D()

#### Call Signature

> **geoTo3D**(`lon`, `lat`, `radius`, `options`): \[`number`, `number`, `number`\]

Defined in: [journalism-geo/src/geo/geoTo3D.ts:36](https://github.com/nshiab/journalism-geo/blob/v1.0.26/src/geo/geoTo3D.ts#L36)

Converts geographical coordinates (longitude and latitude) into 3D Cartesian (x, y, z) coordinates based on a specified radius.

The conversion assumes a spherical Earth model. The `radius` parameter determines the size of the sphere on which the points are projected.

##### Parameters

###### lon

`number`

The longitude of the geographical point, in degrees.

###### lat

`number`

The latitude of the geographical point, in degrees.

###### radius

`number`

The radius of the sphere on which to project the coordinates.

###### options

Optional settings for the conversion.

###### decimals?

`number`

The number of decimal places to round the x, y, and z coordinates to. If not specified, no rounding is applied.

###### toArray

`true`

If `true`, the function will return the coordinates as an array `[x, y, z]` instead of an object `{ x, y, z }`. Defaults to `false`.

##### Returns

\[`number`, `number`, `number`\]

An object `{ x, y, z }` or an array `[x, y, z]` representing the 3D Cartesian coordinates.

##### Examples

```ts
// Basic usage: Convert geographical coordinates to 3D object coordinates.
// Longitude: -73.5674 (Montreal), Latitude: 45.5019 (Montreal), Radius: 1
const coordsObject = geoTo3D(-73.5674, 45.5019, 1, { decimals: 2 });
console.log(coordsObject); // Expected output: { x: -0.67, y: 0.71, z: 0.2 }
```

```ts
// Convert geographical coordinates to 3D array coordinates.
const coordsArray = geoTo3D(-73.5674, 45.5019, 1, { decimals: 2, toArray: true });
console.log(coordsArray); // Expected output: [-0.67, 0.71, 0.2]
```

```ts
// Using a larger radius for visualization purposes.
const earthCoords = geoTo3D(0, 0, 6371, { decimals: 0 }); // Earth's approximate radius in km
console.log(earthCoords); // Expected output: { x: 0, y: 6371, z: 0 } (for 0,0 lat/lon)
```

#### Call Signature

> **geoTo3D**(`lon`, `lat`, `radius`, `options?`): `object`

Defined in: [journalism-geo/src/geo/geoTo3D.ts:36](https://github.com/nshiab/journalism-geo/blob/v1.0.26/src/geo/geoTo3D.ts#L36)

Converts geographical coordinates (longitude and latitude) into 3D Cartesian (x, y, z) coordinates based on a specified radius.

The conversion assumes a spherical Earth model. The `radius` parameter determines the size of the sphere on which the points are projected.

##### Parameters

###### lon

`number`

The longitude of the geographical point, in degrees.

###### lat

`number`

The latitude of the geographical point, in degrees.

###### radius

`number`

The radius of the sphere on which to project the coordinates.

###### options?

Optional settings for the conversion.

###### decimals?

`number`

The number of decimal places to round the x, y, and z coordinates to. If not specified, no rounding is applied.

###### toArray?

`false`

If `true`, the function will return the coordinates as an array `[x, y, z]` instead of an object `{ x, y, z }`. Defaults to `false`.

##### Returns

`object`

An object `{ x, y, z }` or an array `[x, y, z]` representing the 3D Cartesian coordinates.

###### x

> **x**: `number`

###### y

> **y**: `number`

###### z

> **z**: `number`

##### Examples

```ts
// Basic usage: Convert geographical coordinates to 3D object coordinates.
// Longitude: -73.5674 (Montreal), Latitude: 45.5019 (Montreal), Radius: 1
const coordsObject = geoTo3D(-73.5674, 45.5019, 1, { decimals: 2 });
console.log(coordsObject); // Expected output: { x: -0.67, y: 0.71, z: 0.2 }
```

```ts
// Convert geographical coordinates to 3D array coordinates.
const coordsArray = geoTo3D(-73.5674, 45.5019, 1, { decimals: 2, toArray: true });
console.log(coordsArray); // Expected output: [-0.67, 0.71, 0.2]
```

```ts
// Using a larger radius for visualization purposes.
const earthCoords = geoTo3D(0, 0, 6371, { decimals: 0 }); // Earth's approximate radius in km
console.log(earthCoords); // Expected output: { x: 0, y: 6371, z: 0 } (for 0,0 lat/lon)
```

***

### geoToBlender()

> **geoToBlender**(`geojsonPath`, `projection`, `outputPath`, `options?`): `Promise`\<`string`\>

Defined in: [journalism-geo/src/geo/geoToBlender.ts:138](https://github.com/nshiab/journalism-geo/blob/v1.0.26/src/geo/geoToBlender.ts#L138)

Converts GeoJSON borders into an OBJ file that can be imported in Blender.

Polygon rings, MultiPolygon rings, LineStrings, and MultiLineStrings are exported as OBJ line geometry.
Polygon and MultiPolygon rings are always closed into loops (a closing coordinate is appended when the source data omits it), while LineStrings and MultiLineStrings are left exactly as provided.
Flat projection functions are placed on Blender's X/Y plane with Z up and north toward positive Y.
The `"orthographic"` projection exports borders in 3D on a sphere using `geoTo3D`.
Set `maxSegmentLength` to add extra vertices along long orthographic segments.

When fitting a flat projection with `fitExtent`/`fitSize`, run the GeoJSON through `rewind` from `@nshiab/journalism-dataviz` first. Many data sources wind their polygons the wrong way for `d3-geo`, which makes the fit collapse to a near-zero scale and produces an empty-looking OBJ.

#### Parameters

##### geojsonPath

`string`

The path to the GeoJSON file to convert.

##### projection

`"orthographic"` \| ((`coordinates`) => \[`number`, `number`\] \| `null`)

A flat projection function or `"orthographic"` for 3D globe borders.

##### outputPath

`string`

The path where the OBJ file will be written.

##### options?

Optional settings for orthographic radius, coordinate rounding, and orthographic segment densification.

###### decimals?

`number`

The number of decimal places to round OBJ coordinates to.

###### maxSegmentLength?

`number`

The maximum angular distance, in degrees, between generated vertices for `"orthographic"`.
By default, segments are not densified.

###### radius?

`number`

For `"orthographic"`, the radius of the sphere in Blender units.

**Default**

```ts
10
```

#### Returns

`Promise`\<`string`\>

A Promise that resolves to the output path.

#### Example

```ts
import { geoToBlender } from "@nshiab/journalism-geo";
import { rewind } from "@nshiab/journalism-dataviz";
import { geoConicConformal } from "d3-geo";
import { readFile } from "node:fs/promises";

const geojsonPath = "./data/canada.geojson";
const geojson = JSON.parse(await readFile(geojsonPath, "utf8"));
// Rewind so fitExtent measures the real extent instead of collapsing.
const domain = rewind(geojson);
const projection = geoConicConformal()
  .rotate([100, -60])
  .fitExtent([[-5, -5], [5, 5]], domain);
await geoToBlender(geojsonPath, projection, "./output/canada.obj", {
  decimals: 3,
});
```

***

### geoToBlenderPoint()

#### Call Signature

> **geoToBlenderPoint**(`lon`, `lat`, `projection`, `options?`): `object`

Defined in: [journalism-geo/src/geo/geoToBlenderPoint.ts:37](https://github.com/nshiab/journalism-geo/blob/v1.0.26/src/geo/geoToBlenderPoint.ts#L37)

Converts one longitude/latitude coordinate into Blender coordinates.

Flat projection functions are placed on Blender's X/Y plane with Z up and north toward positive Y.
The `"orthographic"` projection exports the coordinate in 3D on a sphere using `geoTo3D`.

When fitting a flat projection with `fitExtent`/`fitSize`, run the GeoJSON through `rewind` from `@nshiab/journalism-dataviz` first. Many data sources wind their polygons the wrong way for `d3-geo`, which makes the fit collapse to a near-zero scale and places every point at nearly the same spot. Use the same fitted projection here as the one passed to `geoToBlender` so the point lines up with the borders.

##### Parameters

###### lon

`number`

The longitude of the geographical point, in degrees.

###### lat

`number`

The latitude of the geographical point, in degrees.

###### projection

`"orthographic"` \| ((`coordinates`) => \[`number`, `number`\] \| `null`)

A flat projection function or `"orthographic"` for a 3D globe point.

###### options?

Optional settings for orthographic radius, coordinate rounding, and return shape.

###### decimals?

`number`

The number of decimal places to round coordinates to.

###### radius?

`number`

For `"orthographic"`, the radius of the sphere in Blender units.

**Default**

```ts
10
```

###### toArray?

`false`

If `true`, the function returns `[x, y, z]` instead of `{ x, y, z }`.

**Default**

```ts
false
```

##### Returns

`object`

Blender coordinates.

###### x

> **x**: `number`

###### y

> **y**: `number`

###### z

> **z**: `number`

##### Example

```ts
import { geoToBlenderPoint } from "@nshiab/journalism-geo";
import { rewind } from "@nshiab/journalism-dataviz";
import { geoConicConformal } from "d3-geo";
import { readFile } from "node:fs/promises";

const geojson = JSON.parse(await readFile("./data/canada.geojson", "utf8"));
// Rewind so fitExtent measures the real extent instead of collapsing.
const domain = rewind(geojson);
const projection = geoConicConformal()
  .rotate([100, -60])
  .fitExtent([[-5, -5], [5, 5]], domain);
const point = geoToBlenderPoint(-73.5674, 45.5019, projection, {
  decimals: 3,
});
```

#### Call Signature

> **geoToBlenderPoint**(`lon`, `lat`, `projection`, `options`): \[`number`, `number`, `number`\]

Defined in: [journalism-geo/src/geo/geoToBlenderPoint.ts:37](https://github.com/nshiab/journalism-geo/blob/v1.0.26/src/geo/geoToBlenderPoint.ts#L37)

Converts one longitude/latitude coordinate into Blender coordinates.

Flat projection functions are placed on Blender's X/Y plane with Z up and north toward positive Y.
The `"orthographic"` projection exports the coordinate in 3D on a sphere using `geoTo3D`.

##### Parameters

###### lon

`number`

The longitude of the geographical point, in degrees.

###### lat

`number`

The latitude of the geographical point, in degrees.

###### projection

`"orthographic"` \| ((`coordinates`) => \[`number`, `number`\] \| `null`)

A flat projection function or `"orthographic"` for a 3D globe point.

###### options

Optional settings for orthographic radius, coordinate rounding, and return shape.

###### decimals?

`number`

The number of decimal places to round coordinates to.

###### radius?

`number`

For `"orthographic"`, the radius of the sphere in Blender units.

**Default**

```ts
10
```

###### toArray

`true`

If `true`, the function returns `[x, y, z]` instead of `{ x, y, z }`.

**Default**

```ts
false
```

##### Returns

\[`number`, `number`, `number`\]

Blender coordinates.

##### Example

```ts
import { geoToBlenderPoint } from "@nshiab/journalism-geo";

const point = geoToBlenderPoint(-73.5674, 45.5019, "orthographic", {
  radius: 10,
  decimals: 3,
  toArray: true,
});
```

***

### getClosest()

#### Call Signature

> **getClosest**\<`T`\>(`lon`, `lat`, `geoItems`, `getItemLon`, `getItemLat`, `options?`): `T`

Defined in: [journalism-geo/src/geo/getClosest.ts:88](https://github.com/nshiab/journalism-geo/blob/v1.0.26/src/geo/getClosest.ts#L88)

Finds the geographical item closest to a given reference point (longitude and latitude) from a list of geographical items.

The function calculates the distance between the reference point and each item in the `geoItems` array using the Haversine formula (via the `distance` function). It then returns the item with the minimum distance.

Optionally, you can choose to add the calculated distance as a new property to the returned closest item. If the `geoItems` have a `properties` key (common in GeoJSON-like structures), the distance will be added there; otherwise, it will be added directly to the item object.

##### Type Parameters

###### T

`T`

##### Parameters

###### lon

`number`

The longitude of the reference point.

###### lat

`number`

The latitude of the reference point.

###### geoItems

`T`[]

An array of geographical items to search through. Each item should contain properties that can be accessed by `getItemLon` and `getItemLat` to retrieve its longitude and latitude.

###### getItemLon

(`item`) => `number`

A function that takes an item from `geoItems` and returns its longitude.

###### getItemLat

(`item`) => `number`

A function that takes an item from `geoItems` and returns its latitude.

###### options?

Optional settings for the search.

###### addDistance?

`false`

If `true`, the calculated distance to the closest item will be added as a property (`distance`) to the returned object. Defaults to `false`.

###### decimals?

`number`

The number of decimal places to round the calculated distance to, if `addDistance` is `true`.

##### Returns

`T`

The geographical item from `geoItems` that is closest to the reference point. If `addDistance` is `true`, the returned object will also include the `distance` property.

##### Examples

```ts
// Basic usage: Find the closest city to Ottawa.
const cities = [
  { name: "Montreal", lon: -73.5673, lat: 45.5017 },
  { name: "Toronto", lon: -79.3832, lat: 43.6532 },
  { name: "Vancouver", lon: -123.1207, lat: 49.2827 }
];
const ottawa = { lon: -75.6972, lat: 45.4215 };

const closestCity = getClosest(
  ottawa.lon,
  ottawa.lat,
  cities,
  (d) => d.lon,
  (d) => d.lat,
  { addDistance: true, decimals: 2 }
);

console.log(closestCity);
// Expected output: { name: "Montreal", lon: -73.5673, lat: 45.5017, distance: 160.69 }
```

```ts
// Finding the closest point in a GeoJSON FeatureCollection.
const featureCollection = {
  type: "FeatureCollection",
  features: [
    { type: "Feature", properties: { name: "Park A" }, geometry: { type: "Point", coordinates: [-74.0, 40.7] } },
    { type: "Feature", properties: { name: "Park B" }, geometry: { type: "Point", coordinates: [-73.9, 40.8] } }
  ]
};
const userLocation = { lon: -73.95, lat: 40.75 };

const closestPark = getClosest(
  userLocation.lon,
  userLocation.lat,
  featureCollection.features,
  (f) => f.geometry.coordinates[0],
  (f) => f.geometry.coordinates[1],
  { addDistance: true }
);

console.log(closestPark);
// Expected output: { type: "Feature", properties: { name: "Park B", distance: ... }, geometry: { ... } }
```

#### Call Signature

> **getClosest**\<`T`\>(`lon`, `lat`, `geoItems`, `getItemLon`, `getItemLat`, `options`): `T` & `object`

Defined in: [journalism-geo/src/geo/getClosest.ts:88](https://github.com/nshiab/journalism-geo/blob/v1.0.26/src/geo/getClosest.ts#L88)

Finds the geographical item closest to a given reference point and adds distance to the properties object.

##### Type Parameters

###### T

`T` *extends* `object`

##### Parameters

###### lon

`number`

The longitude of the reference point.

###### lat

`number`

The latitude of the reference point.

###### geoItems

`T`[]

An array of geographical items with properties objects.

###### getItemLon

(`item`) => `number`

A function that returns longitude from an item.

###### getItemLat

(`item`) => `number`

A function that returns latitude from an item.

###### options

Settings with addDistance: true for items with properties.

###### addDistance

`true`

###### decimals?

`number`

##### Returns

`T` & `object`

The closest item with distance added to its properties object.

#### Call Signature

> **getClosest**\<`T`\>(`lon`, `lat`, `geoItems`, `getItemLon`, `getItemLat`, `options`): `T` & `object`

Defined in: [journalism-geo/src/geo/getClosest.ts:88](https://github.com/nshiab/journalism-geo/blob/v1.0.26/src/geo/getClosest.ts#L88)

Finds the geographical item closest to a given reference point and adds distance directly to the item.

##### Type Parameters

###### T

`T`

##### Parameters

###### lon

`number`

The longitude of the reference point.

###### lat

`number`

The latitude of the reference point.

###### geoItems

`T`[]

An array of geographical items without properties objects.

###### getItemLon

(`item`) => `number`

A function that returns longitude from an item.

###### getItemLat

(`item`) => `number`

A function that returns latitude from an item.

###### options

Settings with addDistance: true for items without properties.

###### addDistance

`true`

###### decimals?

`number`

##### Returns

`T` & `object`

The closest item with distance added directly to the item.

***

### getGeoTiffDetails()

> **getGeoTiffDetails**(`path`): `Promise`\<\{ `bbox`: `number`[]; `bboxHeight`: `number`; `bboxWidth`: `number`; `image`: `GeoTIFFImage`; `pixelHeight`: `number`; `pixelWidth`: `number`; \}\>

Defined in: [journalism-geo/src/geo/getGeoTiffDetails.ts:25](https://github.com/nshiab/journalism-geo/blob/v1.0.26/src/geo/getGeoTiffDetails.ts#L25)

Extracts detailed information from a GeoTIFF file, which can then be used with the `getGeoTiffValues` function.

#### Parameters

##### path

`string`

The absolute path to the GeoTIFF file.

#### Returns

`Promise`\<\{ `bbox`: `number`[]; `bboxHeight`: `number`; `bboxWidth`: `number`; `image`: `GeoTIFFImage`; `pixelHeight`: `number`; `pixelWidth`: `number`; \}\>

A Promise that resolves to an object containing the GeoTIFF image, bounding box, pixel dimensions, and bounding box dimensions.

#### Examples

```ts
// Basic usage
const geoTiffDetails = await getGeoTiffDetails("./some-file.tif")
console.log(geoTiffDetails.bbox) // [ -73.8, 45.4, -73.5, 45.6 ]
```

```ts
// Using the output with `getGeoTiffValues`

const geoTiffDetails = await getGeoTiffDetails("./some-file.tif")
const value = await getGeoTiffValues(45.50, -73.57, geoTiffDetails)
console.log(value) // 255
```

***

### getGeoTiffValues()

> **getGeoTiffValues**(`lat`, `lon`, `geoTiffDetails`): `Promise`\<`Uint8Array`\<`ArrayBufferLike`\> \| `Uint16Array`\<`ArrayBufferLike`\> \| `Uint32Array`\<`ArrayBufferLike`\> \| `Int8Array`\<`ArrayBufferLike`\> \| `Int16Array`\<`ArrayBufferLike`\> \| `Int32Array`\<`ArrayBufferLike`\> \| `Float32Array`\<`ArrayBufferLike`\> \| `Float64Array`\<`ArrayBufferLike`\>\>

Defined in: [journalism-geo/src/geo/getGeoTiffValues.ts:31](https://github.com/nshiab/journalism-geo/blob/v1.0.26/src/geo/getGeoTiffValues.ts#L31)

Extracts values at specific latitude and longitude coordinates from a GeoTIFF image. This function works in conjunction with the `getGeoTiffDetails` function, using the details returned by it.

#### Parameters

##### lat

`number`

The latitude coordinate for which to extract the value.

##### lon

`number`

The longitude coordinate for which to extract the value.

##### geoTiffDetails

An object containing the GeoTIFF image details, typically obtained from `getGeoTiffDetails`.

###### bbox

`number`[]

###### bboxHeight

`number`

###### bboxWidth

`number`

###### image

`unknown`

###### pixelHeight

`number`

###### pixelWidth

`number`

#### Returns

`Promise`\<`Uint8Array`\<`ArrayBufferLike`\> \| `Uint16Array`\<`ArrayBufferLike`\> \| `Uint32Array`\<`ArrayBufferLike`\> \| `Int8Array`\<`ArrayBufferLike`\> \| `Int16Array`\<`ArrayBufferLike`\> \| `Int32Array`\<`ArrayBufferLike`\> \| `Float32Array`\<`ArrayBufferLike`\> \| `Float64Array`\<`ArrayBufferLike`\>\>

A Promise that resolves to the pixel value at the specified coordinates, or a `TypedArray` if multiple bands are present.

#### Example

```ts
// Basic usage

const geoTiffDetails = await getGeoTiffDetails("./some-file.tif")
const value = await getGeoTiffValues(45.50, -73.57, geoTiffDetails)
console.log(value) // 255
```

#### Throws

If the coordinates are outside the GeoTIFF's bounding box or if there's an issue reading the raster data.

***

### styledLayerDescriptor()

> **styledLayerDescriptor**(`layer`, `colorScale`): `string`

Defined in: [journalism-geo/src/geo/styledLayerDescriptor.ts:33](https://github.com/nshiab/journalism-geo/blob/v1.0.26/src/geo/styledLayerDescriptor.ts#L33)

Generates an OpenGIS Styled Layer Descriptor (SLD) XML string, encoded for use in a URL. This function is particularly useful for dynamically styling Web Map Service (WMS) layers, allowing for custom color scales and visual representations of geospatial data directly through the WMS request.

The SLD specifies how a map layer should be rendered. This function focuses on creating a `ColorMap` within the SLD, which defines a gradient of colors based on data values. This is commonly used for visualizing continuous data, such as temperature, elevation, or precipitation, on a map.

#### Parameters

##### layer

`string`

The name of the WMS layer to which this SLD will be applied (e.g., `"GDPS.ETA_TT"`).

##### colorScale

`object`[]

An array of objects, where each object defines a `color` (hex code) and a `value` (the data threshold for that color). The function will sort these entries by value in ascending order to create a proper color gradient.

#### Returns

`string`

A URL-encoded XML string representing the Styled Layer Descriptor.

#### Example

```ts
// Returns the SLD for the GDPS.ETA_TT layer with a color scale going from blue to red.
const sld = styledLayerDescriptor("GDPS.ETA_TT", [
  { color: "#550c24", value: 100 },
  { color: "#7f2e34", value: 30 },
  { color: "#c26847", value: 20 },
  { color: "#bdbb7a", value: 10 },
  { color: "#e0e9f0", value: 0 },
  { color: "#97b4cd", value: -10 },
  { color: "#5881a1", value: -20 },
  { color: "#334f60", value: -30 },
  { color: "#21353f", value: -100 },
]);

// The sld can now be used in a WMS request as SLD_BODY.
const url = `https://geo.weather.gc.ca/geomet?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX=-90,-180,90,180&CRS=EPSG:4326&WIDTH=2400&HEIGHT=1200&LAYERS=GDPS.ETA_TT&FORMAT=image/jpeg&SLD_BODY=${sld}`;
console.log(url);
```

## Google

### deleteFromBucket()

> **deleteFromBucket**(`destination`, `options?`): `Promise`\<`void`\>

Defined in: [journalism-google/src/google/deleteFromBucket.ts:38](https://github.com/nshiab/journalism-google/blob/v2.0.0/src/google/deleteFromBucket.ts#L38)

Deletes a specified file from a Google Cloud Storage (GCS) bucket.

The function requires the Google Cloud project ID and the target bucket name. These can be provided either through environment variables (`BUCKET_PROJECT` and `BUCKET_NAME`) or directly as parameters in the `options` object. Parameters passed in `options` will take precedence over environment variables.

By default, if the specified file does not exist in the bucket, the function will throw an error. However, you can suppress this behavior by setting the `try` option to `true`, which will cause the function to complete silently if the file is not found.

#### Parameters

##### destination

`string`

The full path to the file within the bucket (e.g., 'my-folder/my-file.txt').

##### options?

Optional configuration for the deletion operation.

###### bucket?

`string`

The name of the Google Cloud Storage bucket. If not provided, it defaults to the `BUCKET_NAME` environment variable.

###### project?

`string`

The Google Cloud project ID. If not provided, it defaults to the `BUCKET_PROJECT` environment variable.

###### try?

`boolean`

If `true`, the function will not throw an error if the file to be deleted does not exist. Defaults to `false`.

#### Returns

`Promise`\<`void`\>

#### Examples

```ts
import { deleteFromBucket } from "@nshiab/journalism-google";

// Basic usage: Delete a file from the bucket.
await deleteFromBucket("path/to/your/file.txt");
```

```ts
// Delete a file, suppressing errors if it doesn't exist.
await deleteFromBucket("path/to/non-existent-file.txt", { try: true });
```

```ts
// Explicitly specify project ID and bucket name.
await deleteFromBucket("reports/2023-summary.pdf", {
  project: "my-gcp-project-id",
  bucket: "my-data-bucket"
});
```

***

### downloadFromBucket()

> **downloadFromBucket**(`source`, `destination`, `options?`): `Promise`\<`void`\>

Defined in: [journalism-google/src/google/downloadFromBucket.ts:49](https://github.com/nshiab/journalism-google/blob/v2.0.0/src/google/downloadFromBucket.ts#L49)

Downloads a file from a Google Cloud Storage (GCS) bucket to a specified local path. This function provides robust handling for existing local files, allowing you to skip downloads or overwrite files as needed.

The function requires the Google Cloud project ID and the target bucket name. These can be provided either through environment variables (`BUCKET_PROJECT` and `BUCKET_NAME`) or directly as parameters in the `options` object. Parameters passed in `options` will take precedence over environment variables.

By default, if a local file with the same name already exists at the `destination` path, the function will throw an error to prevent accidental overwrites. You can modify this behavior using the `skip` or `overwrite` options.

#### Parameters

##### source

`string`

The path to the file within the GCS bucket (e.g., 'my-folder/document.pdf').

##### destination

`string`

The local file path where the downloaded file will be saved (e.g., './downloads/document.pdf').

##### options?

Optional configuration for the download operation.

###### bucket?

`string`

The name of the Google Cloud Storage bucket. If not provided, it defaults to the `BUCKET_NAME` environment variable.

###### overwrite?

`boolean`

If `true`, an existing local file at the `destination` path will be overwritten. Cannot be used with `skip`. Defaults to `false`.

###### project?

`string`

The Google Cloud project ID. If not provided, it defaults to the `BUCKET_PROJECT` environment variable.

###### skip?

`boolean`

If `true`, the download will be skipped if a local file already exists at the `destination` path. Cannot be used with `overwrite`. Defaults to `false`.

#### Returns

`Promise`\<`void`\>

#### Examples

```ts
import { downloadFromBucket } from "@nshiab/journalism-google";

// Basic usage: Download a file.
await downloadFromBucket("reports/annual-report.pdf", "./local-reports/annual-report.pdf");
console.log("File downloaded successfully!");
```

```ts
// Skip download if the file already exists locally.
await downloadFromBucket("images/profile.jpg", "./local-images/profile.jpg", { skip: true });
console.log("Download skipped if file exists, or downloaded otherwise.");
```

```ts
// Overwrite an existing local file.
await downloadFromBucket("data/latest-data.csv", "./local-data/latest-data.csv", { overwrite: true });
console.log("File downloaded and overwritten if it existed.");
```

```ts
// Specify project and bucket explicitly.
await downloadFromBucket("configs/app-settings.json", "./local-configs/settings.json", {
  project: "my-gcp-project",
  bucket: "my-config-bucket"
});
```

***

### filesInBucket()

> **filesInBucket**(`options?`): `Promise`\<`string`[]\>

Defined in: [journalism-google/src/google/filesInBucket.ts:47](https://github.com/nshiab/journalism-google/blob/v2.0.0/src/google/filesInBucket.ts#L47)

Lists files within a Google Cloud Storage (GCS) bucket. You can list all files in the bucket or narrow down the results to a specific folder. The function can also return the full Google Storage URIs for each file.

This function requires the Google Cloud project ID and the target bucket name. These can be provided either through environment variables (`BUCKET_PROJECT` and `BUCKET_NAME`) or directly as parameters in the `options` object. Parameters passed in `options` will take precedence over environment variables.

#### Parameters

##### options?

Optional configuration for listing files.

###### bucket?

`string`

The name of the Google Cloud Storage bucket. If not provided, it defaults to the `BUCKET_NAME` environment variable.

###### folder?

`string`

The path to a specific folder within the bucket (e.g., 'my-data/'). Only files within this folder will be listed.

###### project?

`string`

The Google Cloud project ID. If not provided, it defaults to the `BUCKET_PROJECT` environment variable.

###### URI?

`boolean`

If `true`, the function will return the full Google Storage URI (e.g., 'gs://your-bucket/path/to/file.txt') for each file. Defaults to `false`, returning just the file path within the bucket.

#### Returns

`Promise`\<`string`[]\>

An array of strings, where each string is either the file path within the bucket or its full Google Storage URI, depending on the `URI` option.

#### Examples

```ts
import { filesInBucket } from "@nshiab/journalism-google";

// List all files in the default bucket.
const allFiles = await filesInBucket();
console.log("All files:", allFiles);
```

```ts
// List files within a specific folder.
const folderFiles = await filesInBucket({ folder: "images/thumbnails/" });
console.log("Files in folder:", folderFiles);
```

```ts
// Get Google Storage URIs for files in a folder.
const fileURIs = await filesInBucket({ folder: "documents/", URI: true });
console.log("File URIs:", fileURIs);
```

```ts
// Explicitly specify project and bucket.
const specificBucketFiles = await filesInBucket({
  project: "my-gcp-project",
  bucket: "my-archive-bucket",
  folder: "old-data/"
});
console.log("Files from specific bucket:", specificBucketFiles);
```

***

### getSheetData()

#### Call Signature

> **getSheetData**(`sheetUrl`, `options`): `Promise`\<`string`\>

Defined in: [journalism-google/src/google/getSheetData.ts:62](https://github.com/nshiab/journalism-google/blob/v2.0.0/src/google/getSheetData.ts#L62)

Retrieves data from a Google Sheet.

By default, this function attempts to authenticate using environment variables (`GOOGLE_PRIVATE_KEY` for the API key and `GOOGLE_SERVICE_ACCOUNT_EMAIL` for the service account email). Alternatively, you can use `GOOGLE_APPLICATION_CREDENTIALS` pointing to a service account JSON file. For detailed instructions on setting up credentials, refer to the `node-google-spreadsheet` authentication guide: [https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication](https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication).

##### Parameters

###### sheetUrl

`string`

The URL of the Google Sheet from which to retrieve data. This URL should point to a specific sheet (e.g., ending with `#gid=0`).

###### options

An optional object with configuration options:

###### apiEmail?

`string`

Name of the environment variable containing the service-account email. Defaults to `GOOGLE_SERVICE_ACCOUNT_EMAIL`.

###### apiKey?

`string`

Name of the environment variable containing the service-account private key. Defaults to `GOOGLE_PRIVATE_KEY`.

###### csv

`true`

If `true`, the function will return the raw data as a CSV string. If `false` or omitted, it will return an array of objects, where each object represents a row and keys correspond to column headers. Defaults to `false`.

###### skip?

`number`

The number of rows to skip from the beginning of the sheet before parsing the data. This is useful for sheets that have metadata at the top. Defaults to `0`.

##### Returns

`Promise`\<`string`\>

A Promise that resolves to either an array of objects (`Record<string, string>[]`) if `options.csv` is `false`, or a CSV string (`string`) if `options.csv` is `true`.

##### Examples

```ts
import { getSheetData } from "@nshiab/journalism-google";

// Fake URL used as an example.
const sheetUrl = "https://docs.google.com/spreadsheets/d/nrqo3oP4KMWYbELScQa8W1nHZPfIrA7LIz9UmcRE4GyJN/edit#gid=0";

// Returning the data as an array of objects.
const data = await getSheetData(sheetUrl);
console.log(data);
// Expected output (example):
// [
//   { Header1: 'Value1', Header2: 'Value2' },
//   { Header1: 'Value3', Header2: 'Value4' }
// ]
```

```ts
// Retrieve data, skipping the first row (e.g., if it contains metadata).
const dataSkippingFirstRow = await getSheetData(sheetUrl, { skip: 1 });
console.log(dataSkippingFirstRow);
// Expected output (example, assuming first row was metadata):
// [
//   { Header1: 'Value1', Header2: 'Value2' },
//   { Header1: 'Value3', Header2: 'Value4' }
// ]
```

```ts
// Return the data as a raw CSV string, useful for direct writing to files or other systems.
const csvString = await getSheetData(sheetUrl, { csv: true });
console.log(csvString);
// Expected output (example):
// "Header1,Header2\nValue1,Value2\nValue3,Value4"
```

```ts
// Use custom environment variable names for API email and key.
const dataWithCustomCredentials = await getSheetData(sheetUrl, {
  apiEmail: "GG_EMAIL",
  apiKey: "GG_KEY"
});
console.log(dataWithCustomCredentials);
```

#### Call Signature

> **getSheetData**(`sheetUrl`, `options?`): `Promise`\<`Record`\<`string`, `string`\>[]\>

Defined in: [journalism-google/src/google/getSheetData.ts:62](https://github.com/nshiab/journalism-google/blob/v2.0.0/src/google/getSheetData.ts#L62)

Retrieves data from a Google Sheet.

By default, this function attempts to authenticate using environment variables (`GOOGLE_PRIVATE_KEY` for the API key and `GOOGLE_SERVICE_ACCOUNT_EMAIL` for the service account email). Alternatively, you can use `GOOGLE_APPLICATION_CREDENTIALS` pointing to a service account JSON file. For detailed instructions on setting up credentials, refer to the `node-google-spreadsheet` authentication guide: [https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication](https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication).

##### Parameters

###### sheetUrl

`string`

The URL of the Google Sheet from which to retrieve data. This URL should point to a specific sheet (e.g., ending with `#gid=0`).

###### options?

An optional object with configuration options:

###### apiEmail?

`string`

Name of the environment variable containing the service-account email. Defaults to `GOOGLE_SERVICE_ACCOUNT_EMAIL`.

###### apiKey?

`string`

Name of the environment variable containing the service-account private key. Defaults to `GOOGLE_PRIVATE_KEY`.

###### csv?

`false`

If `true`, the function will return the raw data as a CSV string. If `false` or omitted, it will return an array of objects, where each object represents a row and keys correspond to column headers. Defaults to `false`.

###### skip?

`number`

The number of rows to skip from the beginning of the sheet before parsing the data. This is useful for sheets that have metadata at the top. Defaults to `0`.

##### Returns

`Promise`\<`Record`\<`string`, `string`\>[]\>

A Promise that resolves to either an array of objects (`Record<string, string>[]`) if `options.csv` is `false`, or a CSV string (`string`) if `options.csv` is `true`.

##### Examples

```ts
import { getSheetData } from "@nshiab/journalism-google";

// Fake URL used as an example.
const sheetUrl = "https://docs.google.com/spreadsheets/d/nrqo3oP4KMWYbELScQa8W1nHZPfIrA7LIz9UmcRE4GyJN/edit#gid=0";

// Returning the data as an array of objects.
const data = await getSheetData(sheetUrl);
console.log(data);
// Expected output (example):
// [
//   { Header1: 'Value1', Header2: 'Value2' },
//   { Header1: 'Value3', Header2: 'Value4' }
// ]
```

```ts
// Retrieve data, skipping the first row (e.g., if it contains metadata).
const dataSkippingFirstRow = await getSheetData(sheetUrl, { skip: 1 });
console.log(dataSkippingFirstRow);
// Expected output (example, assuming first row was metadata):
// [
//   { Header1: 'Value1', Header2: 'Value2' },
//   { Header1: 'Value3', Header2: 'Value4' }
// ]
```

```ts
// Return the data as a raw CSV string, useful for direct writing to files or other systems.
const csvString = await getSheetData(sheetUrl, { csv: true });
console.log(csvString);
// Expected output (example):
// "Header1,Header2\nValue1,Value2\nValue3,Value4"
```

```ts
// Use custom environment variable names for API email and key.
const dataWithCustomCredentials = await getSheetData(sheetUrl, {
  apiEmail: "GG_EMAIL",
  apiKey: "GG_KEY"
});
console.log(dataWithCustomCredentials);
```

***

### inBucket()

> **inBucket**(`destination`, `options?`): `Promise`\<`boolean`\>

Defined in: [journalism-google/src/google/inBucket.ts:41](https://github.com/nshiab/journalism-google/blob/v2.0.0/src/google/inBucket.ts#L41)

Checks if a specified file exists within a Google Cloud Storage (GCS) bucket. This function provides a straightforward way to verify the presence of a file in your GCS infrastructure, which is useful for conditional operations, data validation, or status checks.

Authentication and bucket identification can be configured either through environment variables (`BUCKET_PROJECT` for the Google Cloud Project ID and `BUCKET_NAME` for the bucket name) or by passing them directly as options to the function. Options provided directly will take precedence over environment variables.

#### Parameters

##### destination

`string`

The full path to the file within the bucket (e.g., 'my-folder/my-file.txt').

##### options?

Optional settings for configuring the GCS client.

###### bucket?

`string`

The name of the Google Cloud Storage bucket. If not provided, it defaults to the `BUCKET_NAME` environment variable.

###### project?

`string`

Your Google Cloud Project ID. If not provided, it defaults to the `BUCKET_PROJECT` environment variable.

#### Returns

`Promise`\<`boolean`\>

A Promise that resolves to `true` if the file exists in the bucket, and `false` otherwise.

#### Examples

```ts
import { inBucket } from "@nshiab/journalism-google";

// Check if a file exists in the default Google Cloud Storage bucket (configured via environment variables).
const exists = await inBucket("remote/file.txt");
if (exists) {
  console.log("File exists in the bucket.");
} else {
  console.log("File does not exist in the bucket.");
}
```

```ts
// Check for a file's existence in a specified project and bucket, overriding environment variables.
const existsInSpecificBucket = await inBucket("remote/file.txt", {
 project: "my-gcp-project",
 bucket: "my-bucket-name"
});
if (existsInSpecificBucket) {
  console.log("File exists in the specified bucket.");
} else {
  console.log("File does not exist in the specified bucket.");
}
```

***

### openSpreadsheet()

> **openSpreadsheet**(`spreadsheetUrl`, `options?`): `Promise`\<\{ `sheetId?`: `number`; `spreadsheet`: `GoogleSpreadsheet`; \}\>

Defined in: [journalism-google/src/google/openSpreadsheet.ts:59](https://github.com/nshiab/journalism-google/blob/v2.0.0/src/google/openSpreadsheet.ts#L59)

Opens a Google spreadsheet and returns its loaded representation. When the
URL identifies a specific tab with a `gid`, that ID is also returned as
`sheetId`; otherwise, `sheetId` is undefined.

By default, authentication uses `GOOGLE_SERVICE_ACCOUNT_EMAIL` and
`GOOGLE_PRIVATE_KEY`. Alternatively, `GOOGLE_APPLICATION_CREDENTIALS` can
point to a service-account JSON file. Credentials passed through
`options.credentials` take precedence over both environment-based methods.
The service account must have access to the spreadsheet.

To learn what you can do with the returned `spreadsheet`, refer to the
`node-google-spreadsheet` documentation:
[https://theoephraim.github.io/node-google-spreadsheet/#/](https://theoephraim.github.io/node-google-spreadsheet/#/).

#### Parameters

##### spreadsheetUrl

`string`

A Google Sheets URL. It may identify a spreadsheet or
a specific tab.

##### options?

Controls authentication. The standard Google environment
variables are used when omitted.

###### apiEmail?

`string`

Name of the environment variable containing the
service-account email. Defaults to `GOOGLE_SERVICE_ACCOUNT_EMAIL`.

###### apiKey?

`string`

Name of the environment variable containing the
service-account private key. Defaults to `GOOGLE_PRIVATE_KEY`.

###### credentials?

\{ `email`: `string`; `privateKey`: `string`; \}

Explicit Google service-account credentials.

###### credentials.email

`string`

###### credentials.privateKey

`string`

#### Returns

`Promise`\<\{ `sheetId?`: `number`; `spreadsheet`: `GoogleSpreadsheet`; \}\>

The loaded spreadsheet and the tab ID found in the URL, if any.

#### Examples

**Open a spreadsheet using credentials from the environment.**

```ts
import { openSpreadsheet } from "@nshiab/journalism-google";

const spreadsheetUrl = "https://docs.google.com/spreadsheets/d/your-spreadsheet-id/edit";
const { spreadsheet } = await openSpreadsheet(spreadsheetUrl);
console.log(spreadsheet.title);
```

**Open a spreadsheet with explicit credentials.**

```ts
const { spreadsheet } = await openSpreadsheet(spreadsheetUrl, {
  credentials: {
    email: "service-account@project.iam.gserviceaccount.com",
    privateKey: "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  },
});
```

**Access the tab selected by a URL containing a gid.**

```ts
const { spreadsheet, sheetId } = await openSpreadsheet(sheetUrl);
const sheet = sheetId === undefined
  ? spreadsheet.sheetsByIndex[0]
  : spreadsheet.sheetsById[sheetId];
```

***

### pushToSheet()

> **pushToSheet**(`data`, `sheetUrl`, `options?`): `Promise`\<`void`\>

Defined in: [journalism-google/src/google/pushToSheet.ts:67](https://github.com/nshiab/journalism-google/blob/v2.0.0/src/google/pushToSheet.ts#L67)

Writes data to a Google Sheets tab, either replacing its contents or
appending rows. The tab can be selected by the URL's `gid` or by title.
If a titled tab does not exist, creation must be explicitly enabled with
`create: true`. In append mode, column headers are detected automatically
within the first 100 rows of the tab.

By default, authentication uses `GOOGLE_SERVICE_ACCOUNT_EMAIL` and
`GOOGLE_PRIVATE_KEY`. Alternatively, `GOOGLE_APPLICATION_CREDENTIALS` can
point to a service-account JSON file. Credentials passed through
`options.credentials` take precedence over both environment-based methods.
For detailed setup instructions, refer to the `node-google-spreadsheet`
authentication guide:
[https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication](https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication).

#### Parameters

##### data

`object`[]

Rows of data. Object keys are used as column headers.

##### sheetUrl

`string`

A Google Sheets URL. It may identify a spreadsheet or a
specific tab.

##### options?

Controls tab selection, writing, metadata, value parsing, and
authentication.

###### create?

`boolean`

Creates a missing titled tab. Requires `tabTitle` and
defaults to `false`.

###### credentials?

\{ `email`: `string`; `privateKey`: `string`; \}

Explicit Google service-account credentials.
These values override `GOOGLE_APPLICATION_CREDENTIALS`,
`GOOGLE_SERVICE_ACCOUNT_EMAIL`, and `GOOGLE_PRIVATE_KEY`.

###### credentials.email

`string`

###### credentials.privateKey

`string`

###### lastUpdate?

`boolean` \| `"Canada/Atlantic"` \| `"Canada/Central"` \| `"Canada/Eastern"` \| `"Canada/Mountain"` \| `"Canada/Newfoundland"` \| `"Canada/Pacific"` \| `"Canada/Saskatchewan"` \| `"Canada/Yukon"`

Adds a UTC timestamp when `true`, or a timestamp in
the specified Canadian time zone. Available only in overwrite mode.

###### mode?

`"overwrite"` \| `"append"`

Whether to overwrite the tab or append rows. Defaults to
`"overwrite"`.

###### prepend?

`string`

Adds text above the header row in overwrite mode.

###### raw?

`boolean`

Writes values without Google Sheets interpretation.
Defaults to `true`.

###### tabTitle?

`string`

Selects a tab by title instead of using the URL's
`gid`.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the data has been written.

#### Examples

**Overwrite the tab selected by the URL.**

```ts
import { pushToSheet } from "@nshiab/journalism-google";

const data = [{ id: "001", name: "Alice" }];
const sheetUrl = "https://docs.google.com/spreadsheets/d/your-spreadsheet-id/edit#gid=0";
await pushToSheet(data, sheetUrl);
```

**Append rows to a tab selected by title.**

```ts
await pushToSheet(data, sheetUrl, {
  mode: "append",
  tabTitle: "Election results",
});
```

**Create a missing tab and write a timestamp in Eastern time.**

```ts
await pushToSheet(data, sheetUrl, {
  tabTitle: "Election results",
  create: true,
  lastUpdate: "Canada/Eastern",
});
```

***

### toBucket()

> **toBucket**(`file`, `destination`, `options?`): `Promise`\<`string`\>

Defined in: [journalism-google/src/google/toBucket.ts:70](https://github.com/nshiab/journalism-google/blob/v2.0.0/src/google/toBucket.ts#L70)

Uploads a local file to a Google Cloud Storage (GCS) bucket and returns the URI of the uploaded file. This function provides robust control over the upload process, including options for skipping uploads if the file already exists, overwriting existing files, and setting custom metadata.

By default, if a file with the same destination path already exists in the bucket, an error will be thrown to prevent accidental overwrites. You can modify this behavior using the `skip` or `overwrite` options.

Authentication and bucket identification can be configured either through environment variables (`BUCKET_PROJECT` for the Google Cloud Project ID and `BUCKET_NAME` for the bucket name) or by passing them directly as options to the function. Options provided directly will take precedence over environment variables.

#### Parameters

##### file

`string`

The absolute or relative path to the local file that you want to upload.

##### destination

`string`

The desired path and filename for the file within the GCS bucket (e.g., `"my-folder/my-uploaded-file.txt"`).

##### options?

Optional settings to customize the upload behavior.

###### bucket?

`string`

The name of the Google Cloud Storage bucket. If not provided, it defaults to the `BUCKET_NAME` environment variable.

###### metadata?

\{\[`key`: `string`\]: `unknown`; \}

An object containing custom metadata to be associated with the uploaded file (e.g., `contentType`, `cacheControl`). This is passed directly to the GCS upload options.

###### overwrite?

`boolean`

If `true`, an existing file at the `destination` path in the bucket will be overwritten. Cannot be used with `skip: true`. Defaults to `false`.

###### project?

`string`

Your Google Cloud Project ID. If not provided, it defaults to the `BUCKET_PROJECT` environment variable.

###### skip?

`boolean`

If `true`, the upload will be skipped if a file with the same `destination` path already exists in the bucket. If the local file does not exist but the remote file does, the URI of the remote file will be returned without an error. Cannot be used with `overwrite: true`. Defaults to `false`.

#### Returns

`Promise`\<`string`\>

A Promise that resolves to the Google Cloud Storage URI of the uploaded file (e.g., `"gs://your-bucket-name/your-file-path.txt"`).

#### Examples

```ts
import { toBucket } from "@nshiab/journalism-google";

// Upload a file using environment variables for project and bucket.
// Assuming `BUCKET_PROJECT` and `BUCKET_NAME` are set in your environment.
const uri = await toBucket("./local/file.txt", "remote/file.txt");
console.log(uri); // "gs://my-bucket/remote/file.txt"
```

```ts
// Skip upload if the file already exists in the bucket.
const uriSkip = await toBucket("./local/file.txt", "remote/file.txt", {
  skip: true
});
console.log(uriSkip); // Returns URI whether file was uploaded or already existed
```

```ts
// If the local file doesn't exist but the remote file does, the URI is returned without error.
// (Assuming "./non-existent.txt" does not exist locally, but "remote/file.txt" exists in the bucket)
const uriNonExistentLocal = await toBucket("./non-existent.txt", "remote/file.txt", {
  skip: true
});
console.log(uriNonExistentLocal); // "gs://my-bucket/remote/file.txt"
```

```ts
// Overwrite an existing file in the bucket.
const uriOverwrite = await toBucket("./local/file.txt", "remote/file.txt", {
  overwrite: true
});
console.log(uriOverwrite); // "gs://my-bucket/remote/file.txt"
```

```ts
// Upload a file with specified project, bucket, and custom metadata.
const uriExplicit = await toBucket("./local/file.txt", "remote/file.txt", {
  project: "my-gcp-project",
  bucket: "my-bucket-name",
  metadata: {
    contentType: "text/plain",
    cacheControl: "public, max-age=3600"
  }
});
console.log(uriExplicit);
```

## Statistics

### addClusters()

> **addClusters**\<`T`\>(`data`, `minDistance`, `minNeighbours`, `distance`, `options?`): asserts data is (T & \{ clusterId: string \| null; clusterType: "core" \| "border" \| "noise" \})\[\]

Defined in: [journalism-statistics/src/statistics/addClusters.ts:65](https://github.com/nshiab/journalism-statistics/blob/v1.5.9/src/statistics/addClusters.ts#L65)

Groups data points into clusters using the DBSCAN (Density-Based Spatial Clustering of Applications with Noise) algorithm. This method is particularly effective at identifying clusters of arbitrary shapes and handling noise in the data.

The function operates based on two key parameters: `minDistance` (also known as epsilon or ε) and `minNeighbours`. It classifies each data point into one of three categories:

- **Core point**: A point that has at least `minNeighbours` other points (including itself) within a `minDistance` radius. These points are the foundation of a cluster.
- **Border point**: A point that is within the `minDistance` of a core point but does not have enough neighbors to be a core point itself. Border points are on the edge of a cluster.
- **Noise point**: A point that is neither a core point nor a border point. These are outliers that do not belong to any cluster.

The function modifies the input `data` array by adding two properties to each point:
- `clusterId`: A unique identifier for the cluster the point belongs to (e.g., 'cluster1'). For noise points, this will be `null`.
- `clusterType`: The classification of the point, which can be 'core', 'border', or 'noise'.

#### Type Parameters

##### T

`T` *extends* `Record`\<`string`, `unknown`\>

#### Parameters

##### data

`T`[]

An array of data points. Each point is an object with any number of properties.

##### minDistance

`number`

The maximum distance between two points for them to be considered neighbors. This is a crucial parameter that defines the density of the clusters.

##### minNeighbours

`number`

The minimum number of points required to form a dense region (a core point). A larger value will result in more points being classified as noise.

##### distance

(`a`, `b`) => `number`

A function that takes two points as input and returns the distance between them. This allows for flexible distance metrics (e.g., Euclidean, Manhattan).

##### options?

Optional settings for the clustering process.

###### reset?

`boolean`

If `true`, the `clusterId` and `clusterType` properties of all points will be cleared before the clustering process begins. This is useful for re-running the clustering with different parameters.

#### Returns

asserts data is (T & \{ clusterId: string \| null; clusterType: "core" \| "border" \| "noise" \})\[\]

#### Examples

```ts
// Basic usage with Euclidean distance
const data = [
  { id: 'a', x: 1, y: 2 },
  { id: 'b', x: 2, y: 3 },
  { id: 'c', x: 10, y: 10 },
  { id: 'd', x: 11, y: 11 },
  { id: 'e', x: 50, y: 50 }
];

// Use the journalism library's euclideanDistance function to calculate the distance
const distance = (a, b) => euclideanDistance(a.x, a.y, b.x, b.y);

addClusters(data, 5, 2, distance);

console.log(data);
// Expected output:
// [
//   { id: 'a', x: 1, y: 2, clusterId: 'cluster1', clusterType: 'core' },
//   { id: 'b', x: 2, y: 3, clusterId: 'cluster1', clusterType: 'core' },
//   { id: 'c', x: 10, y: 10, clusterId: 'cluster2', clusterType: 'core' },
//   { id: 'd', x: 11, y: 11, clusterId: 'cluster2', clusterType: 'core' },
//   { id: 'e', x: 50, y: 50, clusterId: null, clusterType: 'noise' }
// ]
```

```ts
// Re-running clustering with different parameters
addClusters(data, 10, 2, distance, { reset: true });

console.log(data);
// Expected output with a larger minDistance:
// [
//   { id: 'a', x: 1, y: 2, clusterId: 'cluster1', clusterType: 'core' },
//   { id: 'b', x: 2, y: 3, clusterId: 'cluster1', clusterType: 'border' },
//   { id: 'c', x: 10, y: 10, clusterId: 'cluster1', clusterType: 'core' },
//   { id: 'd', x: 11, y: 11, clusterId: 'cluster1', clusterType: 'border' },
//   { id: 'e', x: 50, y: 50, clusterId: null, clusterType: 'noise' }
// ]
```

***

### addMahalanobisDistance()

#### Call Signature

> **addMahalanobisDistance**\<`T`\>(`origin`, `data`, `options`): (`T` & `object`)[]

Defined in: [journalism-statistics/src/statistics/addMahalanobisDistance.ts:65](https://github.com/nshiab/journalism-statistics/blob/v1.5.9/src/statistics/addMahalanobisDistance.ts#L65)

Calculates the Mahalanobis distance for each object in an array relative to a specified origin point.

The function enriches the input `data` array by adding a `mahaDist` property to each object, representing its Mahalanobis distance from the `origin`. The dimensions for the calculation are determined by the keys in the `origin` object.

Optionally, you can also compute a `similarity` score, which is a normalized value between 0 and 1, where 1 indicates that the point is identical to the origin. To improve performance on large datasets, you can provide a pre-computed inverted covariance matrix.

##### Type Parameters

###### T

`T` *extends* `Record`\<`string`, `unknown`\>

##### Parameters

###### origin

`Record`\<`string`, `number`\>

An object defining the reference point for the distance calculation. The keys of this object represent the variables (dimensions) to be used, and the values are their corresponding coordinates.

###### data

`T`[]

An array of objects to be analyzed. Each object should contain the same keys as the `origin` object, and their values for these keys should be numbers.

###### options

Optional parameters to customize the function's behavior.

###### matrix?

`number`[][]

A pre-computed inverted covariance matrix. Providing this can significantly speed up calculations, as it avoids re-computing the matrix for each call. This matrix should be obtained from `getCovarianceMatrix` with `invert: true`.

###### similarity

`true`

If `true`, a `similarity` property will be added to each object in the `data` array. The similarity is calculated as `1 - (mahaDist / maxMahaDist)`, providing an intuitive measure of closeness to the origin.

##### Returns

(`T` & `object`)[]

The input `data` array, with `mahaDist` (and optionally `similarity`) properties added to each object.

##### Throws

If the dimensions of the data points or the provided matrix do not match, or if `getCovarianceMatrix` throws an error (e.g., due to non-numeric data).

##### Examples

```ts
// Basic usage with a dataset of wines
const wines = [
  { 'fixed acidity': 6.5, 'alcohol': 11.0 },
  { 'fixed acidity': 7.1, 'alcohol': 12.2 },
  { 'fixed acidity': 6.3, 'alcohol': 10.5 },
  { 'fixed acidity': 7.2, 'alcohol': 11.3 }
];

// Define the ideal wine profile (our origin)
const idealWine = { 'fixed acidity': 7.2, 'alcohol': 11.3 };

// Calculate the Mahalanobis distance for each wine
addMahalanobisDistance(idealWine, wines);

// Sort the wines by their distance to the ideal profile
wines.sort((a, b) => a.mahaDist - b.mahaDist);

console.log(wines);
// Expected output:
// [
//   { 'fixed acidity': 7.2, 'alcohol': 11.3, mahaDist: 0 },
//   { 'fixed acidity': 7.1, 'alcohol': 12.2, mahaDist: 0.939 },
//   { 'fixed acidity': 6.5, 'alcohol': 11.0, mahaDist: 1.263 },
//   { 'fixed acidity': 6.3, 'alcohol': 10.5, mahaDist: 2.079 }
// ]
```

```ts
// Usage with the similarity option
addMahalanobisDistance(idealWine, wines, { similarity: true });

console.log(wines);
// Expected output with similarity scores:
// [
//   { 'fixed acidity': 7.2, 'alcohol': 11.3, mahaDist: 0, similarity: 1 },
//   { 'fixed acidity': 7.1, 'alcohol': 12.2, mahaDist: 0.939, similarity: 0.548 },
//   { 'fixed acidity': 6.5, 'alcohol': 11.0, mahaDist: 1.263, similarity: 0.392 },
//   { 'fixed acidity': 6.3, 'alcohol': 10.5, mahaDist: 2.079, similarity: 0 }
// ]
```

#### Call Signature

> **addMahalanobisDistance**\<`T`\>(`origin`, `data`, `options?`): (`T` & `object`)[]

Defined in: [journalism-statistics/src/statistics/addMahalanobisDistance.ts:65](https://github.com/nshiab/journalism-statistics/blob/v1.5.9/src/statistics/addMahalanobisDistance.ts#L65)

Calculates the Mahalanobis distance for each object in an array relative to a specified origin point (without similarity scores).

##### Type Parameters

###### T

`T` *extends* `Record`\<`string`, `unknown`\>

##### Parameters

###### origin

`Record`\<`string`, `number`\>

An object defining the reference point for the distance calculation.

###### data

`T`[]

An array of objects to be analyzed.

###### options?

Optional parameters (similarity defaults to false).

###### matrix?

`number`[][]

###### similarity?

`false`

##### Returns

(`T` & `object`)[]

The input data array with mahaDist properties added to each object.

***

### addZScore()

#### Call Signature

> **addZScore**\<`T`, `K`\>(`data`, `variable`, `options`): (`T` & `{ [P in string]: number }`)[]

Defined in: [journalism-statistics/src/statistics/addZScore.ts:56](https://github.com/nshiab/journalism-statistics/blob/v1.5.9/src/statistics/addZScore.ts#L56)

Calculates the Z-score for a specific numeric variable within an array of objects and adds it as a new property to each object. The Z-score is a statistical measure that indicates how many standard deviations a data point is from the mean of the dataset.

The function modifies the input `data` array by adding a new key to each object, which by default is `zScore`. You can customize the name of this new key by using the `newKey` option.

##### Type Parameters

###### T

`T` *extends* `Record`\<`string`, `unknown`\>

###### K

`K` *extends* `string`

##### Parameters

###### data

`T`[]

An array of objects. Each object should contain the variable for which the Z-score is to be calculated.

###### variable

`string`

The key (as a string) of the numeric variable for which the Z-score will be computed.

###### options

Optional settings for the Z-score calculation.

###### newKey

`K`

The name of the new key to be added to each object, representing the Z-score. If not provided, it defaults to `'zScore'`.

##### Returns

(`T` & `{ [P in string]: number }`)[]

The input `data` array, with the Z-score added to each object under the specified key.

##### Throws

If the specified `variable` is not found in an object or its value is not a number.

##### Examples

```ts
// Basic usage with a list of student grades
const studentData = [
  { student: 'Alice', grade: 85 },
  { student: 'Bob', grade: 92 },
  { student: 'Charlie', grade: 78 },
  { student: 'David', grade: 95 },
  { student: 'Eve', grade: 62 }
];

// Calculate the Z-score for the 'grade' variable
addZScore(studentData, 'grade');

console.log(studentData);
// Expected output:
// [
//   { student: 'Alice', grade: 85, zScore: 0.25 },
//   { student: 'Bob', grade: 92, zScore: 0.83 },
//   { student: 'Charlie', grade: 78, zScore: -0.33 },
//   { student: 'David', grade: 95, zScore: 1.08 },
//   { student: 'Eve', grade: 62, zScore: -1.83 }
// ]
```

```ts
// Using a custom key for the Z-score
addZScore(studentData, 'grade', { newKey: 'gradeZScore' });

console.log(studentData);
// Expected output with a custom key:
// [
//   { student: 'Alice', grade: 85, gradeZScore: 0.25 },
//   { student: 'Bob', grade: 92, gradeZScore: 0.83 },
//   { student: 'Charlie', grade: 78, gradeZScore: -0.33 },
//   { student: 'David', grade: 95, gradeZScore: 1.08 },
//   { student: 'Eve', grade: 62, gradeZScore: -1.83 }
// ]
```

#### Call Signature

> **addZScore**\<`T`\>(`data`, `variable`, `options?`): (`T` & `object`)[]

Defined in: [journalism-statistics/src/statistics/addZScore.ts:56](https://github.com/nshiab/journalism-statistics/blob/v1.5.9/src/statistics/addZScore.ts#L56)

Calculates the Z-score for a specific numeric variable within an array of objects using the default 'zScore' key name.

##### Type Parameters

###### T

`T` *extends* `Record`\<`string`, `unknown`\>

##### Parameters

###### data

`T`[]

An array of objects. Each object should contain the variable for which the Z-score is to be calculated.

###### variable

`string`

The key (as a string) of the numeric variable for which the Z-score will be computed.

###### options?

Optional settings (newKey defaults to undefined, using 'zScore').

###### newKey?

`undefined`

##### Returns

(`T` & `object`)[]

The input data array with zScore properties added to each object.

***

### euclidianDistance()

> **euclidianDistance**(`x1`, `y1`, `x2`, `y2`): `number`

Defined in: [journalism-statistics/src/statistics/euclidianDistance.ts:33](https://github.com/nshiab/journalism-statistics/blob/v1.5.9/src/statistics/euclidianDistance.ts#L33)

Calculates the Euclidean distance between two points in a 2D Cartesian coordinate system. The Euclidean distance is the shortest straight-line distance between two points, often referred to as the "as the crow flies" distance.

This function applies the Pythagorean theorem to compute the distance.

#### Parameters

##### x1

`number`

The x-coordinate of the first point.

##### y1

`number`

The y-coordinate of the first point.

##### x2

`number`

The x-coordinate of the second point.

##### y2

`number`

The y-coordinate of the second point.

#### Returns

`number`

The Euclidean distance between the two points.

#### Examples

```ts
// Basic usage: Calculate the distance between (0,0) and (3,4).
const dist1 = euclideanDistance(0, 0, 3, 4);
console.log(dist1); // 5
```

```ts
// Calculate the distance between two points with negative coordinates.
const dist2 = euclideanDistance(-1, -1, 2, 3);
console.log(dist2); // 5
```

```ts
// Distance between identical points should be zero.
const dist3 = euclideanDistance(5, 10, 5, 10);
console.log(dist3); // 0
```

***

### generateCirPath()

> **generateCirPath**(`startValue`, `a`, `b`, `sigma`, `years`, `periodsPerYear`): `number`[]

Defined in: [journalism-statistics/src/statistics/generateCirPath.ts:35](https://github.com/nshiab/journalism-statistics/blob/v1.5.9/src/statistics/generateCirPath.ts#L35)

Generates a path of values following the Cox-Ingersoll-Ross (CIR) model.

The CIR model is a mean-reverting stochastic process used to model variables that tend to return to a long-term average over time, such as interest rates or volatility.

**When to use this function:**
- To simulate future interest rate paths for financial modeling.
- To test how a mean-reverting system might evolve over time.
- When you have parameters (`a`, `b`, `sigma`) and wish to generate potential future scenarios.

#### Parameters

##### startValue

`number`

The initial value of the process (e.g., current interest rate).

##### a

`number`

The speed of mean reversion.

##### b

`number`

The long-term mean to which the process reverts.

##### sigma

`number`

The volatility of the process.

##### years

`number`

The number of years to simulate.

##### periodsPerYear

`number`

The number of simulation steps per year (e.g., 12 for monthly).

#### Returns

`number`[]

An array representing the simulated path of values.

#### Throws

If parameters are invalid (e.g. negative values where prohibited or zero simulation length).

#### Example

```ts
const rates = [0.02, 0.021, 0.019, 0.022, 0.023];
const periodsPerYear = 12;

// First, estimate parameters from historical data
const { a, b, sigma } = getCirParameters(rates, periodsPerYear);

// Then, generate a future path
const initialRate = rates[rates.length - 1];
const path = generateCirPath(initialRate, a, b, sigma, 1, 12);
```

***

### generateGbmPath()

> **generateGbmPath**(`startValue`, `mu`, `sigma`, `years`, `periodsPerYear`): `number`[]

Defined in: [journalism-statistics/src/statistics/generateGbmPath.ts:38](https://github.com/nshiab/journalism-statistics/blob/v1.5.9/src/statistics/generateGbmPath.ts#L38)

Generates a simulated path for an asset using the Geometric Brownian Motion (GBM) model.

Geometric Brownian Motion is a continuous-time stochastic process in which the logarithm of the randomly varying quantity follows a Brownian motion with drift. It is widely used in mathematical finance to model stock prices, as it ensures that values remain positive and accounts for compounded returns.

**When to use this function:**
- To simulate future value paths for a stock, index, or other financial asset
- For risk management and stress testing by generating multiple potential scenarios
- To visualize the impact of volatility and drift on an investment over time

**Note:** You can use `getGbmParameters` to estimate the `mu` and `sigma` parameters from historical data before generating a path.

#### Parameters

##### startValue

`number`

The initial value of the asset at the beginning of the simulation

##### mu

`number`

The expected annualized drift (average growth rate) of the asset

##### sigma

`number`

The annualized volatility (degree of variation) of the asset

##### years

`number`

The total duration of the simulation in years

##### periodsPerYear

`number`

The number of simulation steps per year (e.g., 252 for daily trading days, 12 for monthly data, 52 for weekly)

#### Returns

`number`[]

An array of numerical values representing the simulated path, including the `startValue`

#### Example

```ts
import getGbmParameters from "./getGbmParameters";

const historicalValues = [100, 102, 101, 105, 107, 110];
const periodsPerYear = 252; // Daily data

// Estimate parameters from historical data
const { mu, sigma } = getGbmParameters(historicalValues, periodsPerYear);

// Generate a simulated path for the next year
const startValue = historicalValues[historicalValues.length - 1];
const path = generateGbmPath(startValue, mu, sigma, 1, periodsPerYear);
console.log(`Simulated path: ${path.map(v => v.toFixed(2)).join(', ')}`);
```

***

### getCholeskyMatrix()

> **getCholeskyMatrix**(`matrix`, `jitter?`): `number`[][]

Defined in: [journalism-statistics/src/statistics/getCholeskyMatrix.ts:9](https://github.com/nshiab/journalism-statistics/blob/v1.5.9/src/statistics/getCholeskyMatrix.ts#L9)

Performs Cholesky Decomposition on a symmetric, positive-definite covariance matrix.

#### Parameters

##### matrix

`number`[][]

A square, symmetric, positive-definite covariance matrix.

##### jitter?

`number`

A tiny positive value (e.g., 1e-9) added to the diagonal to force positive-definiteness.

#### Returns

`number`[][]

A lower triangular matrix L.

***

### getCirParameters()

> **getCirParameters**(`values`, `periodsPerYear`): `object`

Defined in: [journalism-statistics/src/statistics/getCirParameters.ts:26](https://github.com/nshiab/journalism-statistics/blob/v1.5.9/src/statistics/getCirParameters.ts#L26)

Estimates the parameters of the Cox-Ingersoll-Ross (CIR) model based on historical values using ordinary least squares on the discretized process.

The CIR model is a mean-reverting stochastic process often used to model interest rates or other variables that tend to move toward a long-term average. This function returns the speed of mean reversion (`a`), the long-term mean (`b`), and the volatility (`sigma`).

**When to use this function:**
- To model interest rates, where rates are likely to revert to a mean but stay positive.
- When you need to estimate the behavior of a mean-reverting process from historical data points.
- To determine parameters for simulating potential future paths using `getCirPath`.

#### Parameters

##### values

`number`[]

An array of numerical data points (e.g., historical interest rates).

##### periodsPerYear

`number`

The number of data points per year (e.g., 252 for daily, 12 for monthly).

#### Returns

`object`

An object containing the estimated speed of mean reversion (`a`), long-term mean (`b`), and volatility (`sigma`). Note that `a` is silently clamped to a minimum of 0.001 and `b` to a minimum of 0.

##### a

> **a**: `number`

##### b

> **b**: `number`

##### sigma

> **sigma**: `number`

#### Throws

If `values` contains fewer than four data points, if `periodsPerYear` is not positive, if any value is negative, or if the data is degenerate (collinear).

#### Example

```ts
const rates = [0.02, 0.021, 0.019, 0.022, 0.023];
const periodsPerYear = 12; // Monthly data

const { a, b, sigma } = getCirParameters(rates, periodsPerYear);
```

***

### getCorrelatedShocks()

> **getCorrelatedShocks**(`L`, `Z`): `number`[]

Defined in: [journalism-statistics/src/statistics/getCorrelatedShocks.ts:9](https://github.com/nshiab/journalism-statistics/blob/v1.5.9/src/statistics/getCorrelatedShocks.ts#L9)

Multiplies a lower triangular Cholesky matrix (L) by a vector of independent standard normal random variables (Z).

#### Parameters

##### L

`number`[][]

The lower triangular matrix.

##### Z

`number`[]

An array of independent standard normal random variables.

#### Returns

`number`[]

An array of correlated random variables.

***

### getCorrelationMatrix()

> **getCorrelationMatrix**(`data`, `options?`): `number`[][]

Defined in: [journalism-statistics/src/statistics/getCorrelationMatrix.ts:48](https://github.com/nshiab/journalism-statistics/blob/v1.5.9/src/statistics/getCorrelationMatrix.ts#L48)

Computes the correlation matrix for a given dataset. The correlation matrix is a square matrix that describes the correlation between each pair of variables in a dataset.

The function takes a 2D array (matrix) as input, where each inner array represents a data point and each element within the inner array represents a variable. It calculates the Pearson correlation coefficient between all pairs of variables.

Optionally, you can choose to invert the computed correlation matrix by setting the `invert` option to `true`.

#### Parameters

##### data

`number`[][]

A 2D array of numbers representing the dataset. Each inner array is a data point, and each element is a variable.

##### options?

Optional settings for the correlation matrix computation.

###### invert?

`boolean`

If `true`, the function will return the inverse of the computed correlation matrix. Defaults to `false`.

#### Returns

`number`[][]

A 2D array representing the correlation matrix. If `options.invert` is `true`, the inverse correlation matrix is returned.

#### Throws

If any element in the input `data` is not a number.

#### Examples

```ts
// Basic usage: Compute the correlation matrix for a 2x2 dataset.
const twoVariables = [
  [6.5, 11],
  [7.1, 12.2],
  [6.3, 10.5]
];
const matrix2x2 = getCorrelationMatrix(twoVariables);
console.log(matrix2x2);
// Expected output (approximately):
// [
//   [1, -0.1208],
//   [-0.1208, 1]
// ]
```

```ts
// Compute the inverse correlation matrix for a 2x2 dataset.
const invertedMatrix2x2 = getCorrelationMatrix(twoVariables, { invert: true });
console.log(invertedMatrix2x2);
// Expected output (approximately):
// [
//   [1.0148, 0.1226],
//   [0.1226, 1.0148]
// ]
```

***

### getCovarianceMatrix()

> **getCovarianceMatrix**(`data`, `options?`): `number`[][]

Defined in: [journalism-statistics/src/statistics/getCovarianceMatrix.ts:103](https://github.com/nshiab/journalism-statistics/blob/v1.5.9/src/statistics/getCovarianceMatrix.ts#L103)

Computes the covariance matrix for a given dataset. The covariance matrix is a square matrix that describes the covariance between each pair of variables in a dataset.

The function takes a 2D array (matrix) as input, where each inner array represents a data point and each element within the inner array represents a variable. It calculates the covariance between all pairs of variables.

Optionally, you can choose to invert the computed covariance matrix by setting the `invert` option to `true`. The inverse covariance matrix is often used in statistical applications, particularly in the calculation of Mahalanobis distance.

#### Parameters

##### data

`number`[][]

A 2D array of numbers representing the dataset. Each inner array is a data point, and each element is a variable.

##### options?

Optional settings for the covariance matrix computation.

###### invert?

`boolean`

If `true`, the function will return the inverse of the computed covariance matrix. Defaults to `false`.

#### Returns

`number`[][]

A 2D array representing the covariance matrix. If `options.invert` is `true`, the inverse covariance matrix is returned.

#### Throws

If any element in the input `data` is not a number.

#### Examples

```ts
// Basic usage: Compute the covariance matrix for a 2x2 dataset.
// This example uses a subset of the wine-quality dataset.
const twoVariables = [
  [6.5, 11],
  [7.1, 12.2],
  [6.3, 10.5]
];
const matrix2x2 = getCovarianceMatrix(twoVariables);
console.log(matrix2x2);
// Expected output (approximately):
// [
//   [0.7119681970550005, -0.12550719251309772],
//   [-0.12550719251309772, 1.514117788841716]
// ]
```

```ts
// Compute the inverse covariance matrix for a 2x2 dataset.
const invertedMatrix2x2 = getCovarianceMatrix(twoVariables, { invert: true });
console.log(invertedMatrix2x2);
// Expected output (approximately):
// [
//   [1.4253851985430073, 0.1181520327131952],
//   [0.11815203271319519, 0.6702443742450724]
// ]
```

```ts
// Basic usage: Compute the covariance matrix for a 3x3 dataset.
const threeVariables = [
  [6.5, 1.9, 11],
  [7.1, 2.2, 12.2],
  [6.3, 2.1, 10.5]
];
const matrix3x3 = getCovarianceMatrix(threeVariables);
console.log(matrix3x3);
// Expected output (approximately):
// [
//   [0.7119681970550005, 0.3809440223475775, -0.12550719251309772],
//   [0.3809440223475775, 25.72051786341322, -2.8121660685891356],
//   [-0.12550719251309772, -2.8121660685891356, 1.514117788841716]
// ]
```

```ts
// Compute the inverse covariance matrix for a 3x3 dataset.
const invertedMatrix3x3 = getCovarianceMatrix(threeVariables, { invert: true });
console.log(invertedMatrix3x3);
// Expected output (approximately):
// [
//   [1.4275549391155293, -0.01029636303437083, 0.09920848359253127],
//   [-0.010296363034370827, 0.048860722373056165, 0.08989538259823723],
//   [0.09920848359253126, 0.08989538259823725, 0.835636521966158]
// ]
```

```ts
// Basic usage: Compute the covariance matrix for a 4x4 dataset.
const fourVariables = [
  [6.5, 1.9, 0.99],
  [7.1, 2.2, 0.98],
  [6.3, 2.1, 0.97]
];
const matrix4x4 = getCovarianceMatrix(fourVariables);
console.log(matrix4x4);
// Expected output (approximately):
// [
//   [0.7119681970550005, 0.3809440223475775, 0.0006695405312093783, -0.12550719251309772],
//   [0.3809440223475775, 25.72051786341322, 0.012724566900994994, -2.8121660685891356],
//   [0.0006695405312093783, 0.012724566900994994, 0.000008943697841212739, -0.00287084411696803],
//   [-0.12550719251309772, -2.8121660685891356, -0.00287084411696803, 1.514117788841716]
// ]
```

```ts
// Compute the inverse covariance matrix for a 4x4 dataset.
const invertedMatrix4x4 = getCovarianceMatrix(fourVariables, { invert: true });
console.log(invertedMatrix4x4);
// Expected output (approximately):
// [
//   [1.890366500801349, 0.29548258210193046, -857.0948891407204, -0.9196015969508056],
//   [0.29548258210193046, 0.2508884395460819, -566.2813827046937, -0.583230998661561],
//   [-857.0948891407204, -566.2813827046937, 1587280.2449344082, 1886.7655549874191],
//   [-0.9196015969508056, -0.583230998661561, 1886.7655549874191, 3.078393760864504]
// ]
```

***

### getGbmParameters()

> **getGbmParameters**(`values`, `periodsPerYear`): `object`

Defined in: [journalism-statistics/src/statistics/getGbmParameters.ts:27](https://github.com/nshiab/journalism-statistics/blob/v1.5.9/src/statistics/getGbmParameters.ts#L27)

Calculates the parameters (drift `mu` and volatility `sigma`) for a Geometric Brownian Motion (GBM) model based on historical data.

Geometric Brownian Motion is a continuous-time stochastic process often used to model stock prices and other financial assets. This function estimates the drift and volatility from a series of observed values, assuming the returns follow a log-normal distribution.

**When to use this function:**
- To estimate parameters for simulating future asset paths using GBM
- When you have a sequence of historical prices or values and need to determine their annualized growth rate (drift) and risk (volatility)
- To model potential future scenarios for a stock, index, or commodity based on historical trends

#### Parameters

##### values

`number`[]

An array of numerical values (e.g., historical prices)

##### periodsPerYear

`number`

The number of data points per year (e.g., 252 for daily trading days, 12 for monthly data, 52 for weekly)

#### Returns

`object`

An object containing the annualized drift (`mu`) and annualized volatility (`sigma`)

##### mu

> **mu**: `number`

##### sigma

> **sigma**: `number`

#### Example

```ts
const prices = [100, 102, 101, 105, 107, 110];
const periodsPerYear = 252; // Daily data

const { mu, sigma } = calculateGbmParameters(prices, periodsPerYear);
console.log(`Annualized Drift (mu): ${mu.toFixed(4)}`);
console.log(`Annualized Volatility (sigma): ${sigma.toFixed(4)}`);
```

***

### getMahalanobisDistance()

> **getMahalanobisDistance**(`x1`, `x2`, `invCovMatrix`): `number`

Defined in: [journalism-statistics/src/statistics/getMahalanobisDistance.ts:59](https://github.com/nshiab/journalism-statistics/blob/v1.5.9/src/statistics/getMahalanobisDistance.ts#L59)

Computes the Mahalanobis distance between two data points (`x1` and `x2`) given the inverted covariance matrix of the dataset. The Mahalanobis distance is a measure of the distance between a point and a distribution. It is a unitless measure. This function can handle data points of any dimension (i.e., with more than 2 coordinates).

This function requires the inverted covariance matrix of your dataset, which can be computed using the `getCovarianceMatrix` function with the `invert: true` option.

#### Parameters

##### x1

`number`[]

The first data point (an array of numbers).

##### x2

`number`[]

The second data point (an array of numbers).

##### invCovMatrix

`number`[][]

The inverted covariance matrix of the dataset (a 2D array of numbers).

#### Returns

`number`

The Mahalanobis distance between `x1` and `x2`.

#### Examples

```ts
// Calculate the Mahalanobis distance between two simple 2D points.
// Note: In a real-world scenario, `invCovMatrix` would be derived from a dataset.
const x1 = [1, 2];
const x2 = [3, 4];
const invCovMatrix = [
  [1, 0],
  [0, 1]
];
const distance = getMahalanobisDistance(x1, x2, invCovMatrix);
console.log(`Mahalanobis Distance: ${distance}`);
```

```ts
// Calculate the Mahalanobis distance for 3D points.
const p1 = [1, 2, 3];
const p2 = [4, 5, 6];
const invCovMatrix3D = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1]
];
const distance3D = getMahalanobisDistance(p1, p2, invCovMatrix3D);
console.log(`Mahalanobis Distance (3D): ${distance3D}`);
```

```ts
// Demonstrate how `getMahalanobisDistance` would typically be used with `getCovarianceMatrix`.
import { getCovarianceMatrix, getMahalanobisDistance} from "journalism";

const dataPoints = [
  [1, 10],
  [2, 12],
  [3, 11],
  [4, 15],
  [5, 13]
];
const point1 = [2, 12];
const point2 = [4, 15];

const covMatrix = getCovarianceMatrix(dataPoints, { invert: true });
const mahalanobisDist = getMahalanobisDistance(point1, point2, covMatrix);
console.log(`Mahalanobis Distance between point1 and point2: ${mahalanobisDist}`);
```

***

### getSampleSizeMean()

> **getSampleSizeMean**\<`T`\>(`data`, `key`, `confidenceLevel`, `marginOfError`, `options?`): `number`

Defined in: [journalism-statistics/src/statistics/getSampleSizeMean.ts:74](https://github.com/nshiab/journalism-statistics/blob/v1.5.9/src/statistics/getSampleSizeMean.ts#L74)

Calculates the required sample size for estimating a population mean with a specified confidence level and margin of error.

The function uses the finite population correction formula. It calculates the sample standard deviation from the provided data to estimate the population standard deviation, which is then used in the sample size calculation.

**When to use this function:**
- Use when you want to estimate the average (mean) value of a numeric variable in a population
- When your outcome is continuous/numeric data (income, age, test scores, measurements, etc.)
- When you need to answer questions like "What's the average household income?" or "What's the mean temperature?"
- When you have existing data to calculate the standard deviation from

**Use `getSampleSizeProportion` instead when:**
- You want to estimate what percentage/proportion of a population has a certain characteristic
- Your outcome is categorical (yes/no, present/absent, pass/fail, etc.)
- You need to answer questions like "What percentage of people support this policy?" or "What proportion of records are accurate?"

#### Type Parameters

##### T

`T` *extends* `Record`\<`string`, `unknown`\>

#### Parameters

##### data

`T`[]

An array of objects used to calculate the sample standard deviation. Each object must contain the specified key with numeric values.

##### key

keyof `T`

The key in each data object that contains the numeric values to analyze for calculating the sample size.

##### confidenceLevel

`90` \| `95` \| `99`

The desired confidence level for the sample. Must be 90, 95, or 99. The higher the confidence level, the larger the returned sample size.

##### marginOfError

`number`

The acceptable margin of error in the same units as the data values. The smaller the margin of error, the larger the returned sample size.

##### options?

Optional configuration object.

###### populationSize?

`number`

The total size of the population. If not provided, the function assumes the provided data represents the entire population and uses data.length as the population size.

#### Returns

`number`

The minimum required sample size, rounded up to the nearest whole number.

#### Examples

```ts
// A journalist analyzing income data wants to know how many records to sample
// to estimate the average income with confidence
const incomeData = [
  { household_id: 1, annual_income: 45000 },
  { household_id: 2, annual_income: 52000 },
  { household_id: 3, annual_income: 38000 },
  // ... thousands more records
];
const sampleSize = getSampleSizeMean(incomeData, "annual_income", 95, 2000);
console.log(`You need to analyze ${sampleSize} income records to estimate the average income within $2,000 with 95% confidence`);
```

```ts
// Example with known population size - using a small sample to estimate standard deviation
// but knowing the true population size for accurate sample size calculation
const pilotData = [
  { student_id: 1, score: 85 },
  { student_id: 2, score: 92 },
  { student_id: 3, score: 78 },
  // Only 50 pilot records to estimate variability
];
const requiredSample = getSampleSizeMean(
  pilotData,
  "score",
  99,
  5,
  { populationSize: 10000 } // Total student population is 10,000
);
console.log(`For 99% confidence with a 5-point margin of error, sample ${requiredSample} test scores from the 10,000 students.`);
```

```ts
// Example for analyzing test scores
const testScores = [
  { student_id: 1, score: 85 },
  { student_id: 2, score: 92 },
  { student_id: 3, score: 78 },
  // ... more test data
];
const requiredSample = getSampleSizeMean(testScores, "score", 99, 5);
console.log(`For 99% confidence with a 5-point margin of error, sample ${requiredSample} test scores.`);
```

***

### getSampleSizeProportion()

> **getSampleSizeProportion**(`populationSize`, `confidenceLevel`, `marginOfError`): `number`

Defined in: [journalism-statistics/src/statistics/getSampleSizeProportion.ts:39](https://github.com/nshiab/journalism-statistics/blob/v1.5.9/src/statistics/getSampleSizeProportion.ts#L39)

Calculates the required sample size for estimating a population proportion with a specified confidence level and margin of error.

The function uses the finite population correction formula when the population size is known, which provides more accurate sample size calculations for smaller populations. It assumes a worst-case scenario proportion of 0.5 (50%) to ensure the calculated sample size is sufficient regardless of the actual population proportion.

**When to use this function:**
- Use when you want to estimate what percentage/proportion of a population has a certain characteristic
- When your outcome is categorical (yes/no, pass/fail, present/absent)
- When you need to answer questions like "What percentage of voters support this candidate?" or "What proportion of records contain errors?"
- When you don't know the actual proportion in advance (this function uses the conservative 50% assumption)

**Use `getSampleSizeMean` instead when:**
- You want to estimate an average value (mean) rather than a proportion
- Your data is continuous/numeric (income, temperature, test scores, etc.)
- You need to answer questions like "What's the average salary?" or "What's the mean test score?"

#### Parameters

##### populationSize

`number`

The size of the population from which the sample will be drawn. Used in the finite population correction formula for more accurate sample size calculations.

##### confidenceLevel

`90` \| `95` \| `99`

The desired confidence level for the sample. Must be 90, 95, or 99. The higher the confidence level, the larger the returned sample size.

##### marginOfError

`number`

The acceptable margin of error as a percentage (1-100). The smaller the margin of error, the larger the returned sample size.

#### Returns

`number`

The minimum required sample size, rounded up to the nearest whole number.

#### Examples

```ts
// A journalist has a dataset of 1,000 records and wants to know how many
// data points to manually double-check to ensure their analysis is accurate
const recordsToVerify = getSampleSizeProportion(1000, 95, 5);
console.log(`You need to manually verify ${recordsToVerify} records to be 95% confident in your analysis with a 5% margin of error`); // 278
```

```ts
// Example for survey planning
const requiredSample = getSampleSizeProportion(50000, 95, 4);
console.log(`For a city survey with 95% confidence and 4% margin of error, you need ${requiredSample} respondents.`); // 594
```

***

### invertMatrix()

> **invertMatrix**(`matrix`): `number`[][]

Defined in: [journalism-statistics/src/statistics/invertMatrix.ts:47](https://github.com/nshiab/journalism-statistics/blob/v1.5.9/src/statistics/invertMatrix.ts#L47)

Computes the inverse of a square matrix.

The function takes a square matrix as input and returns its inverse. It handles both 2x2 and larger square matrices. If the matrix is singular (i.e., its determinant is zero), it cannot be inverted, and the function will throw an error.

#### Parameters

##### matrix

`number`[][]

The square matrix to be inverted. It must be a 2D array where the number of rows equals the number of columns.

#### Returns

`number`[][]

A new 2D array representing the inverse of the input matrix.

#### Throws

If the input matrix is not square (e.g., `matrix.length !== matrix[0].length`), or if it is singular (non-invertible), an error will be thrown.

#### Examples

```ts
// Invert a simple 2x2 matrix.
const matrix2x2 = [
  [4, 7],
  [2, 6]
];
const inverted2x2 = invertMatrix(matrix2x2);
console.log(inverted2x2);
```

```ts
// Invert a 3x3 matrix.
const matrix3x3 = [
  [1, 2, 3],
  [0, 1, 4],
  [5, 6, 0]
];
const inverted3x3 = invertMatrix(matrix3x3);
console.log(inverted3x3);
```

```ts
// Attempting to invert a singular matrix will throw an error.
const singularMatrix = [
  [1, 2],
  [2, 4]
];
try {
  invertMatrix(singularMatrix);
} catch (error) {
  console.error("Error:", error.message);
  // Expected output: "Error: Matrix is singular and cannot be inverted"
}
```

***

### performChiSquaredGoodnessOfFitTest()

> **performChiSquaredGoodnessOfFitTest**\<`T`\>(`data`, `categoryKey`, `observedKey`, `expectedKey`): `object`

Defined in: [journalism-statistics/src/statistics/performChiSquaredGoodnessOfFitTest.ts:103](https://github.com/nshiab/journalism-statistics/blob/v1.5.9/src/statistics/performChiSquaredGoodnessOfFitTest.ts#L103)

Performs a Chi-Squared goodness of fit test to determine if observed frequencies match expected frequencies.

The Chi-Squared goodness of fit test examines whether observed frequencies in categorical data differ significantly from expected frequencies. This test helps determine if a sample follows a particular theoretical distribution or pattern.

**When to use this function:**
- Use for goodness of fit tests to see if observed data matches expected distribution
- When testing if a sample follows a specific theoretical distribution
- For validating assumptions about population proportions
- When comparing actual results against theoretical models

**Important Requirements:**
- The sum of observed frequencies must equal the sum of expected frequencies (within 0.1% tolerance)
- All expected frequencies must be greater than 0
- For reliable results, at least 80% of expected frequencies should be ≥ 5
- For tests with 1 degree of freedom, all expected frequencies should be ≥ 5

#### Type Parameters

##### T

`T` *extends* `Record`\<`string`, `unknown`\>

#### Parameters

##### data

`T`[]

An array of objects containing the categorical data and frequency counts.

##### categoryKey

keyof `T`

The key for the categorical variable.

##### observedKey

keyof `T`

The key containing the observed frequency count for each category.

##### expectedKey

keyof `T`

The key containing the expected frequency count for each category.

#### Returns

`object`

An object containing the chi-squared statistic, degrees of freedom, p-value, and any warnings about test assumptions.

##### chiSquared

> **chiSquared**: `number`

##### degreesOfFreedom

> **degreesOfFreedom**: `number`

##### pValue

> **pValue**: `number`

##### warnings

> **warnings**: `string`[]

#### Examples

```ts
// Testing if observed crime types match expected distribution (goodness of fit)
const crimeData = [
  { crime_type: "theft", observed_count: 120, expected_count: 100 },
  { crime_type: "assault", observed_count: 80, expected_count: 90 },
  { crime_type: "fraud", observed_count: 45, expected_count: 50 },
  { crime_type: "vandalism", observed_count: 55, expected_count: 60 },
];
// Note: Total observed = 300, Total expected = 300 ✓

const testResult = performChiSquaredGoodnessOfFitTest(
  crimeData,
  "crime_type",
  "observed_count",
  "expected_count"
);

console.log(`Chi-squared: ${testResult.chiSquared.toFixed(3)}`);
if (testResult.pValue < 0.05) {
  console.log("Observed crime distribution differs significantly from expected");
} else {
  console.log("Observed crime distribution matches expected pattern");
}

// Check for any warnings about test assumptions
if (testResult.warnings.length > 0) {
  console.log("Test assumption warnings:");
  testResult.warnings.forEach(warning => console.log("- " + warning));
}
```

```ts
// Testing if dice rolls follow uniform distribution
const diceData = [
  { face: "1", observed: 18, expected: 20 },
  { face: "2", observed: 22, expected: 20 },
  { face: "3", observed: 16, expected: 20 },
  { face: "4", observed: 25, expected: 20 },
  { face: "5", observed: 19, expected: 20 },
  { face: "6", observed: 20, expected: 20 },
];
// Note: Total observed = 120, Total expected = 120 ✓

const result = performChiSquaredGoodnessOfFitTest(
  diceData,
  "face",
  "observed",
  "expected"
);

if (result.pValue > 0.05) {
  console.log("Dice appears to be fair (follows uniform distribution)");
} else {
  console.log("Dice may be biased");
}
```

```ts
// Example that would throw an error due to mismatched totals
const invalidData = [
  { category: "A", observed: 50, expected: 40 }, // Total observed: 80
  { category: "B", observed: 30, expected: 25 }, // Total expected: 65
];

try {
  performChiSquaredGoodnessOfFitTest(invalidData, "category", "observed", "expected");
} catch (error) {
  console.log("Error:", error.message);
  // "Total observed frequencies (80) must approximately equal total expected frequencies (65)"
}
```

***

### performChiSquaredIndependenceTest()

> **performChiSquaredIndependenceTest**\<`T`\>(`data`, `firstVariableKey`, `secondVariableKey`, `countKey`): `object`

Defined in: [journalism-statistics/src/statistics/performChiSquaredIndependenceTest.ts:81](https://github.com/nshiab/journalism-statistics/blob/v1.5.9/src/statistics/performChiSquaredIndependenceTest.ts#L81)

Performs a Chi-Squared independence test to determine if two categorical variables are statistically independent or associated.

The Chi-Squared independence test examines whether there is a statistically significant association between two categorical variables by comparing observed frequencies against expected frequencies calculated under the assumption of independence.

**When to use this function:**
- Use for testing independence between two categorical variables (e.g., gender vs voting preference)
- When you have categorical data organized in frequency counts
- When testing hypotheses about associations between variables

#### Type Parameters

##### T

`T` *extends* `Record`\<`string`, `unknown`\>

#### Parameters

##### data

`T`[]

An array of objects containing the categorical data and frequency counts.

##### firstVariableKey

keyof `T`

The key for the first categorical variable.

##### secondVariableKey

keyof `T`

The key for the second categorical variable.

##### countKey

keyof `T`

The key containing the frequency count for each combination.

#### Returns

`object`

An object containing the chi-squared statistic, degrees of freedom, p-value, contingency table details, and any warnings about test assumptions.

##### chiSquared

> **chiSquared**: `number`

##### degreesOfFreedom

> **degreesOfFreedom**: `number`

##### pValue

> **pValue**: `number`

##### warnings

> **warnings**: `string`[]

#### Examples

```ts
// A journalist investigating if voting preference is independent of age group
const votingData = [
  { age_group: "18-30", candidate: "A", count: 45 },
  { age_group: "18-30", candidate: "B", count: 55 },
  { age_group: "31-50", candidate: "A", count: 60 },
  { age_group: "31-50", candidate: "B", count: 40 },
  { age_group: "51+", candidate: "A", count: 70 },
  { age_group: "51+", candidate: "B", count: 30 },
];

const result = performChiSquaredIndependenceTest(votingData, "age_group", "candidate", "count");

console.log(`Chi-squared statistic: ${result.chiSquared.toFixed(3)}`);
console.log(`Degrees of freedom: ${result.degreesOfFreedom}`);
console.log(`P-value: ${result.pValue.toFixed(4)}`);

if (result.pValue < 0.05) {
  console.log("Voting preference is significantly associated with age group");
} else {
  console.log("Voting preference is independent of age group");
}

// Check for any warnings about test assumptions
if (result.warnings.length > 0) {
  console.log("Test assumption warnings:");
  result.warnings.forEach(warning => console.log("- " + warning));
}
```

```ts
// Testing association between education level and income category
const educationIncomeData = [
  { education: "high_school", income: "low", count: 150 },
  { education: "high_school", income: "medium", count: 100 },
  { education: "high_school", income: "high", count: 50 },
  { education: "college", income: "low", count: 80 },
  { education: "college", income: "medium", count: 120 },
  { education: "college", income: "high", count: 100 },
  { education: "graduate", income: "low", count: 30 },
  { education: "graduate", income: "medium", count: 70 },
  { education: "graduate", income: "high", count: 150 },
];

const result = performChiSquaredIndependenceTest(
  educationIncomeData,
  "education",
  "income",
  "count"
);

if (result.pValue < 0.01) {
  console.log("Strong evidence that education and income are associated");
} else {
  console.log("No strong evidence of association between education and income");
}
```

***

### performPairedTTest()

> **performPairedTTest**\<`T`\>(`pairedData`, `firstVariableKey`, `secondVariableKey`, `options?`): `object`

Defined in: [journalism-statistics/src/statistics/performPairedTTest.ts:81](https://github.com/nshiab/journalism-statistics/blob/v1.5.9/src/statistics/performPairedTTest.ts#L81)

Performs a paired t-test for dependent means to determine if there is a significant difference between two related samples.

The paired t-test is used when comparing two measurements from the same subjects or entities,
such as before and after an event, policy change, or intervention. It tests whether the mean difference between paired observations
is significantly different from zero. This is a test for **dependent means** (related samples), not independent groups.

**When to use this function:**
- Use when you have two measurements from the same subjects or entities (before/after an event, pre/post policy change)
- When comparing two related conditions or matched pairs (same districts, candidates, regions, etc.)
- When you want to control for individual variation between subjects (dependent means)
- When data differences are approximately normally distributed

**Test types:**
- **"two-tailed"** (default): Tests if the mean difference is significantly different from zero
- **"left-tailed"**: Tests if the mean difference is significantly less than zero
- **"right-tailed"**: Tests if the mean difference is significantly greater than zero

#### Type Parameters

##### T

`T` *extends* `Record`\<`string`, `unknown`\>

#### Parameters

##### pairedData

`T`[]

An array of objects containing paired observations. Each object must contain both specified keys with numeric values.

##### firstVariableKey

keyof `T`

The key for the first measurement in each pair (e.g., "before_event", "baseline", "pre_policy").

##### secondVariableKey

keyof `T`

The key for the second measurement in each pair (e.g., "after_event", "follow_up", "post_policy").

##### options?

Optional configuration object.

###### tail?

`"two-tailed"` \| `"left-tailed"` \| `"right-tailed"`

The type of test to perform: "two-tailed" (default), "left-tailed", or "right-tailed".

#### Returns

`object`

An object containing comprehensive test results including sample statistics, differences, degrees of freedom, t-statistic, and p-value.

##### degreesOfFreedom

> **degreesOfFreedom**: `number`

##### differenceStdDev

> **differenceStdDev**: `number`

##### differenceVariance

> **differenceVariance**: `number`

##### firstMean

> **firstMean**: `number`

##### meanDifference

> **meanDifference**: `number`

##### pValue

> **pValue**: `number`

##### sampleSize

> **sampleSize**: `number`

##### secondMean

> **secondMean**: `number`

##### tStatistic

> **tStatistic**: `number`

#### Examples

```ts
// A journalist investigating if parking fines increased after new enforcement policy
const parkingFineData = [
  { district_id: 1, fines_before: 125, fines_after: 142 },
  { district_id: 2, fines_before: 98, fines_after: 108 },
  { district_id: 3, fines_before: 156, fines_after: 175 },
  { district_id: 4, fines_before: 87, fines_after: 95 },
  { district_id: 5, fines_before: 203, fines_after: 228 },
  { district_id: 6, fines_before: 134, fines_after: 149 },
];

const result = performPairedTTest(parkingFineData, "fines_before", "fines_after");
console.log(`Mean increase in fines: ${result.meanDifference.toFixed(2)} per month`);
console.log(`T-statistic: ${result.tStatistic.toFixed(3)}`);
console.log(`P-value: ${result.pValue.toFixed(4)}`);

if (result.pValue < 0.05) {
  console.log("Parking fines increased significantly after the new policy");
} else {
  console.log("No significant change in parking fines");
}
```

```ts
// Testing if campaign spending affects vote share (right-tailed test)
const campaignData = [
  { district_id: 1, before_ads: 32.5, after_ads: 38.2 },
  { district_id: 2, before_ads: 28.9, after_ads: 34.1 },
  { district_id: 3, before_ads: 41.3, after_ads: 43.7 },
  { district_id: 4, before_ads: 25.6, after_ads: 31.9 },
  { district_id: 5, before_ads: 36.8, after_ads: 40.3 },
];

// Test if after_ads - before_ads > 0 (increase in vote share)
const testResult = performPairedTTest(
  campaignData,
  "before_ads",
  "after_ads",
  { tail: "right-tailed" }
);

console.log(`Mean vote share increase: ${testResult.meanDifference.toFixed(2)}%`);
if (testResult.pValue < 0.05) {
  console.log("Campaign ads show significant increase in vote share!");
} else {
  console.log("Campaign ads don't show significant increase in vote share");
}
```

***

### performTTest()

> **performTTest**\<`T`\>(`sampleData`, `variableKey`, `hypothesizedMean`, `options?`): `object`

Defined in: [journalism-statistics/src/statistics/performTTest.ts:136](https://github.com/nshiab/journalism-statistics/blob/v1.5.9/src/statistics/performTTest.ts#L136)

Performs a one-sample t-test for independent means to determine if a sample mean is significantly different from a hypothesized population mean.

The function compares the mean of a sample against a hypothesized population mean when the population standard deviation is unknown. This is the most common scenario in real-world statistical analysis where we only have sample data and need to estimate the population parameters. This is a test for **independent means** (sample vs population), not related/paired samples.

**When to use this function:**
- Use when you have sample data and want to test if the sample mean differs significantly from a known or hypothesized value
- When the population standard deviation is unknown (most common case)
- When data is approximately normally distributed OR when you have a large sample size (n ≥ 30-50)
- **Robustness to non-normality**: Due to the Central Limit Theorem, the t-test becomes robust to violations of normality as sample size increases. For large samples (n ≥ 30-50), the sampling distribution of the mean approaches normality even if the underlying data is not normally distributed
- **Small samples (n < 30)**: Normality assumption is more critical. Consider checking for normality or using non-parametric alternatives (like Wilcoxon signed-rank test) if data is heavily skewed or has extreme outliers
- For independent observations (not paired or matched data)

**Test types:**
- **"two-tailed"** (default): Tests if sample mean is significantly different (higher OR lower) than hypothesized mean
- **"left-tailed"**: Tests if sample mean is significantly lower than hypothesized mean
- **"right-tailed"**: Tests if sample mean is significantly higher than hypothesized mean

#### Type Parameters

##### T

`T` *extends* `Record`\<`string`, `unknown`\>

#### Parameters

##### sampleData

`T`[]

An array of objects representing the sample data. Each object must contain the specified key with numeric values.

##### variableKey

keyof `T`

The key in each data object that contains the numeric values to analyze for the statistical test.

##### hypothesizedMean

`number`

The hypothesized population mean to test against (null hypothesis value).

##### options?

Optional configuration object.

###### tail?

`"two-tailed"` \| `"left-tailed"` \| `"right-tailed"`

The type of test to perform: "two-tailed" (default), "left-tailed", or "right-tailed".

#### Returns

`object`

An object containing comprehensive test results including sample statistics, degrees of freedom, t-statistic, and p-value.

##### degreesOfFreedom

> **degreesOfFreedom**: `number`

##### hypothesizedMean

> **hypothesizedMean**: `number`

##### pValue

> **pValue**: `number`

##### sampleMean

> **sampleMean**: `number`

##### sampleSize

> **sampleSize**: `number`

##### sampleStdDev

> **sampleStdDev**: `number`

##### sampleVariance

> **sampleVariance**: `number`

##### tStatistic

> **tStatistic**: `number`

#### Examples

```ts
// A journalist investigating if basketball players in a local league
// score significantly different from the national average of 10 points per game
const localPlayers = [
  { player_id: 1, name: "John", points_per_game: 15 },
  { player_id: 2, name: "Sarah", points_per_game: 12 },
  { player_id: 3, name: "Mike", points_per_game: 18 },
  { player_id: 4, name: "Lisa", points_per_game: 14 },
  { player_id: 5, name: "Tom", points_per_game: 16 },
  { player_id: 6, name: "Anna", points_per_game: 13 },
];

const nationalAverage = 10; // Known population mean

const result = performTTest(localPlayers, "points_per_game", nationalAverage);
console.log(`Sample mean: ${result.sampleMean.toFixed(2)} points per game`);
console.log(`T-statistic: ${result.tStatistic.toFixed(3)}`);
console.log(`P-value: ${result.pValue.toFixed(4)}`);

if (result.pValue < 0.05) {
  console.log("Local players score significantly different from national average");
} else {
  console.log("Local players' scoring is consistent with national average");
}
```

```ts
// Testing if a new training program improves performance (right-tailed test)
const trainingResults = [
  { athlete_id: 1, improvement_score: 8.5 },
  { athlete_id: 2, improvement_score: 12.3 },
  { athlete_id: 3, improvement_score: 6.7 },
  { athlete_id: 4, improvement_score: 15.2 },
  { athlete_id: 5, improvement_score: 9.8 },
];

const expectedImprovement = 5; // Null hypothesis: no significant improvement

const testResult = performTTest(
  trainingResults,
  "improvement_score",
  expectedImprovement,
  { tail: "right-tailed" }
);

console.log(`Sample mean improvement: ${testResult.sampleMean.toFixed(2)}`);
if (testResult.pValue < 0.05) {
  console.log("Training program shows significant improvement!");
} else {
  console.log("Training program doesn't show significant improvement");
}
```

***

### performTwoSampleTTest()

> **performTwoSampleTTest**\<`T1`, `T2`, `K`\>(`group1Data`, `group2Data`, `variableKey`, `options?`): `object`

Defined in: [journalism-statistics/src/statistics/performTwoSampleTTest.ts:101](https://github.com/nshiab/journalism-statistics/blob/v1.5.9/src/statistics/performTwoSampleTTest.ts#L101)

Performs a two-sample t-test for independent means to determine if there is a significant difference between two independent groups.

The two-sample t-test compares the means of two independent groups when the population standard deviations are unknown.
It tests whether the difference between the two group means is significantly different from zero. This is a test for **independent means** (unrelated groups), not paired/related samples.

**When to use this function:**
- Use when you have two separate, independent groups to compare
- When comparing measurements from different subjects, entities, or populations
- When the population standard deviations are unknown (most common case)
- When data in both groups are approximately normally distributed OR when you have large sample sizes (n ≥ 30-50 per group)
- **Robustness to non-normality**: Due to the Central Limit Theorem, the two-sample t-test becomes robust to violations of normality as sample sizes increase. For large samples (n ≥ 30-50 per group), the sampling distribution of the difference in means approaches normality even if the underlying data is not normally distributed
- **Small samples (n < 30 per group)**: Normality assumption is more critical for both groups. Consider checking for normality or using non-parametric alternatives (like Mann-Whitney U test) if data is heavily skewed or has extreme outliers
- For independent observations (not paired, matched, or related data)

**Test types:**
- **"two-tailed"** (default): Tests if the group means are significantly different from each other
- **"left-tailed"**: Tests if group 1 mean is significantly less than group 2 mean
- **"right-tailed"**: Tests if group 1 mean is significantly greater than group 2 mean

#### Type Parameters

##### T1

`T1` *extends* `Record`\<`string`, `unknown`\>

##### T2

`T2` *extends* `Record`\<`string`, `unknown`\>

##### K

`K` *extends* `string` \| `number` \| `symbol`

#### Parameters

##### group1Data

`T1`[]

An array of objects containing observations for the first group. Each object must contain the specified key with a numeric value.

##### group2Data

`T2`[]

An array of objects containing observations for the second group. Each object must contain the specified key with a numeric value.

##### variableKey

`K`

The key for the measurement in both group objects (e.g., "income", "score", "price").

##### options?

Optional configuration object.

###### tail?

`"two-tailed"` \| `"left-tailed"` \| `"right-tailed"`

The type of test to perform: "two-tailed" (default), "left-tailed", or "right-tailed".

#### Returns

`object`

An object containing comprehensive test results including sample statistics for both groups, mean difference, degrees of freedom, t-statistic, and p-value.

##### degreesOfFreedom

> **degreesOfFreedom**: `number`

##### group1Mean

> **group1Mean**: `number`

##### group1SampleSize

> **group1SampleSize**: `number`

##### group1StdDev

> **group1StdDev**: `number`

##### group1Variance

> **group1Variance**: `number`

##### group2Mean

> **group2Mean**: `number`

##### group2SampleSize

> **group2SampleSize**: `number`

##### group2StdDev

> **group2StdDev**: `number`

##### group2Variance

> **group2Variance**: `number`

##### meanDifference

> **meanDifference**: `number`

##### pValue

> **pValue**: `number`

##### tStatistic

> **tStatistic**: `number`

#### Examples

```ts
// A journalist comparing average housing prices between two different cities
const city1Prices = [
  { property_id: 1, price: 450000 },
  { property_id: 2, price: 520000 },
  { property_id: 3, price: 380000 },
  { property_id: 4, price: 610000 },
  { property_id: 5, price: 475000 },
];

const city2Prices = [
  { property_id: 101, price: 520000 },
  { property_id: 102, price: 580000 },
  { property_id: 103, price: 490000 },
  { property_id: 104, price: 660000 },
  { property_id: 105, price: 530000 },
  { property_id: 106, price: 615000 },
];

const result = performTwoSampleTTest(city1Prices, city2Prices, "price");
console.log(`City 1 average: $${result.group1Mean.toFixed(0)}`);
console.log(`City 2 average: $${result.group2Mean.toFixed(0)}`);
console.log(`Mean difference: $${result.meanDifference.toFixed(0)}`);
console.log(`T-statistic: ${result.tStatistic.toFixed(3)}`);
console.log(`P-value: ${result.pValue.toFixed(4)}`);

if (result.pValue < 0.05) {
  console.log("Significant difference in housing prices between cities");
} else {
  console.log("No significant difference in housing prices between cities");
}
```

```ts
// Testing if male candidates receive higher campaign donations than female candidates (right-tailed)
const maleCandidates = [
  { candidate_id: 1, donation_total: 25000 },
  { candidate_id: 2, donation_total: 32000 },
  { candidate_id: 3, donation_total: 18000 },
  { candidate_id: 4, donation_total: 41000 },
];

const femaleCandidates = [
  { candidate_id: 101, donation_total: 22000 },
  { candidate_id: 102, donation_total: 28000 },
  { candidate_id: 103, donation_total: 19000 },
  { candidate_id: 104, donation_total: 35000 },
  { candidate_id: 105, donation_total: 24000 },
];

// Test if male average > female average
const testResult = performTwoSampleTTest(
  maleCandidates,
  femaleCandidates,
  "donation_total",
  { tail: "right-tailed" }
);

console.log(`Male average: $${testResult.group1Mean.toFixed(0)}`);
console.log(`Female average: $${testResult.group2Mean.toFixed(0)}`);
if (testResult.pValue < 0.05) {
  console.log("Male candidates receive significantly higher donations");
} else {
  console.log("No significant difference in donation amounts by gender");
}
```

***

### performZTest()

> **performZTest**\<`T`\>(`populationData`, `sampleData`, `variableKey`, `options?`): `object`

Defined in: [journalism-statistics/src/statistics/performZTest.ts:82](https://github.com/nshiab/journalism-statistics/blob/v1.5.9/src/statistics/performZTest.ts#L82)

Performs a one-sample Z-test to determine if a sample mean is significantly different from a population mean.

The function compares the mean of a sample against the mean of a known population to test the null hypothesis. It automatically applies the finite population correction (FPC) when the sample size exceeds 5% of the population size, which provides more accurate results for smaller populations. This is a **one-sample Z-test** comparing a sample against a known population, not a comparison between two independent samples.

**When to use this function:**
- Use when you have a complete population dataset and want to test if a sample represents that population
- When you need to validate whether observed differences between sample and population means are statistically significant
- When data is approximately normally distributed or sample size is large (Central Limit Theorem applies)
- For independent observations (not paired or matched data)

**Test types:**
- **"two-tailed"** (default): Tests if sample mean is significantly different (higher OR lower) than population mean
- **"left-tailed"**: Tests if sample mean is significantly lower than population mean
- **"right-tailed"**: Tests if sample mean is significantly higher than population mean

#### Type Parameters

##### T

`T` *extends* `Record`\<`string`, `unknown`\>

#### Parameters

##### populationData

`T`[]

An array of objects representing the complete population data. Each object must contain the specified key with numeric values.

##### sampleData

`T`[]

An array of objects representing the sample data to test against the population. Each object must contain the specified key with numeric values.

##### variableKey

keyof `T`

The key in each data object that contains the numeric values to analyze for the statistical test.

##### options?

Optional configuration object.

###### tail?

`"two-tailed"` \| `"left-tailed"` \| `"right-tailed"`

The type of test to perform: "two-tailed" (default), "left-tailed", or "right-tailed".

#### Returns

`object`

An object containing comprehensive test results including population and sample statistics, population variance and standard deviation, test statistics (z-score), p-value, and whether finite population correction was applied.

##### fpcApplied

> **fpcApplied**: `boolean`

##### populationMean

> **populationMean**: `number`

##### populationSize

> **populationSize**: `number`

##### populationStdDev

> **populationStdDev**: `number`

##### populationVariance

> **populationVariance**: `number`

##### pValue

> **pValue**: `number`

##### sampleMean

> **sampleMean**: `number`

##### sampleSize

> **sampleSize**: `number`

##### zScore

> **zScore**: `number`

#### Examples

```ts
// A journalist investigating if Democratic candidates receive significantly
// different donation amounts compared to all political candidates (two-tailed test)
const allCandidates = [
  { candidate_id: 1, party: "Democratic", donation_amount: 2500 },
  { candidate_id: 2, party: "Republican", donation_amount: 3200 },
  { candidate_id: 3, party: "Independent", donation_amount: 1800 },
  { candidate_id: 4, party: "Democratic", donation_amount: 2800 },
  // ... complete population of all candidates (5,000 records)
];

const democraticCandidates = [
  { candidate_id: 1, party: "Democratic", donation_amount: 2500 },
  { candidate_id: 4, party: "Democratic", donation_amount: 2800 },
  { candidate_id: 7, party: "Democratic", donation_amount: 3100 },
  // ... all Democratic candidates (1,200 records)
];

const result = performZTest(allCandidates, democraticCandidates, "donation_amount");
console.log(`Population mean donation: $${result.populationMean.toFixed(2)}`);
console.log(`Democratic candidates mean: $${result.sampleMean.toFixed(2)}`);
console.log(`P-value: ${result.pValue.toFixed(4)}`);
if (result.pValue < 0.05) {
  console.log("Democratic candidates receive significantly different donations than average");
} else {
  console.log("Democratic candidates' donations are consistent with overall average");
}
```

```ts
// Testing if corporate donors give MORE than average (right-tailed test)
const allDonors = [
  { donor_id: 1, type: "individual", amount: 500 },
  { donor_id: 2, type: "corporate", amount: 5000 },
  { donor_id: 3, type: "PAC", amount: 2500 },
  // ... complete donor population
];

const corporateDonors = [
  { donor_id: 2, type: "corporate", amount: 5000 },
  { donor_id: 8, type: "corporate", amount: 7500 },
  // ... all corporate donors
];

const testResult = performZTest(allDonors, corporateDonors, "amount", { tail: "right-tailed" });
console.log(`All donors mean donation: $${testResult.populationMean.toFixed(2)}`);
console.log(`Corporate donors mean: $${testResult.sampleMean.toFixed(2)}`);
if (testResult.pValue < 0.05) {
  console.log("Corporate donors give significantly MORE than average");
} else {
  console.log("Corporate donors don't give significantly more than average");
}
```

***

### stepCir()

> **stepCir**(`currentValue`, `a`, `b`, `sigma`, `dt`, `shock`): `number`

Defined in: [journalism-statistics/src/statistics/stepCir.ts:13](https://github.com/nshiab/journalism-statistics/blob/v1.5.9/src/statistics/stepCir.ts#L13)

Calculates the next value in a Cox-Ingersoll-Ross (CIR) process.

#### Parameters

##### currentValue

`number`

The current value of the process.

##### a

`number`

The speed of mean reversion.

##### b

`number`

The long-term mean level.

##### sigma

`number`

The volatility coefficient.

##### dt

`number`

The time step.

##### shock

`number`

A standard normal random variable (Z).

#### Returns

`number`

The next value in the process.

***

### stepGbm()

> **stepGbm**(`currentValue`, `mu`, `sigma`, `dt`, `shock`): `number`

Defined in: [journalism-statistics/src/statistics/stepGbm.ts:12](https://github.com/nshiab/journalism-statistics/blob/v1.5.9/src/statistics/stepGbm.ts#L12)

Calculates the next value in a Geometric Brownian Motion (GBM) process.

#### Parameters

##### currentValue

`number`

The current value of the process.

##### mu

`number`

The drift coefficient.

##### sigma

`number`

The volatility coefficient.

##### dt

`number`

The time step.

##### shock

`number`

A standard normal random variable (Z).

#### Returns

`number`

The next value in the process.

## Web

### downloadCSV()

> **downloadCSV**(`data`, `filename`): `void`

Defined in: [journalism-web/src/web/downloadCsv.ts:28](https://github.com/nshiab/journalism-web/blob/v1.0.12/src/web/downloadCsv.ts#L28)

Triggers a download of the provided data as a CSV (Comma Separated Values) file directly in the user's browser. This function is designed for client-side use, allowing web applications to generate and offer data exports without requiring server-side processing.

The function takes an array of JavaScript objects, converts them into a CSV string, creates a Blob, and then simulates a click on a hidden anchor tag to prompt the browser to download the file. This is a common and effective method for initiating file downloads from the browser.

Object and array cell values are serialized as JSON. Dates use UTC formatting.

#### Parameters

##### data

`object`[]

An array of JavaScript objects to be converted into CSV format. Each object represents a row, and its keys will become the CSV headers.

##### filename

`string`

The desired name for the downloaded CSV file (e.g., `"my_data_export.csv"`, `"report.csv"`). It's recommended to include the `.csv` extension.

#### Returns

`void`

`void`

#### Example

```ts
import { downloadCSV } from "@nshiab/journalism-web";

// Download a simple array of objects as a CSV file.

const data = [
  { name: "Alice", age: 30, city: "New York" },
  { name: "Bob", age: 25, city: "Los Angeles" }
];
downloadCSV(data, "data.csv");
console.log("CSV download initiated.");
```

***

### zipToUrls()

> **zipToUrls**(`url`): `Promise`\<`string`[]\>

Defined in: [journalism-web/src/web/zipToUrls.ts:24](https://github.com/nshiab/journalism-web/blob/v1.0.12/src/web/zipToUrls.ts#L24)

Fetches a ZIP archive from a given URL, extracts all its contained files, and returns an array of object URLs for each extracted file.

Each file within the ZIP archive is converted into a Blob object, and then a corresponding object URL is created.

#### Parameters

##### url

`string`

The URL of the ZIP file to download and extract. This URL must be accessible from the client-side environment where the function is executed.

#### Returns

`Promise`\<`string`[]\>

A Promise that resolves to an array of strings, where each string is an object URL for an extracted file.

#### Example

```ts
// Fetch a ZIP archive from a URL, extract its contents, and get object URLs for each file.
const urls = await zipToUrls('https://example.com/files.zip');
console.log(urls);

// You can use the URLs as image sources, download links, etc.
const img = document.createElement('img');
img.src = urls[0];
document.body.appendChild(img);
```

## Web scraping

### downloadFile()

> **downloadFile**(`url`, `filePath`): `Promise`\<`void`\>

Defined in: [journalism-web-scraping/src/web-scraping/downloadFile.ts:30](https://github.com/nshiab/journalism-web-scraping/blob/v2.0.8/src/web-scraping/downloadFile.ts#L30)

Downloads a file from a given URL and saves it to a specified local path. This function is useful for programmatically fetching resources from the web, such as datasets, images, or documents.

The function uses streams for efficient handling of potentially large files, ensuring that the entire file does not need to be loaded into memory at once.

#### Parameters

##### url

`string`

The URL of the file to download. This should be a complete and valid URL (e.g., 'https://example.com/data.zip').

##### filePath

`string`

The absolute or relative local path where the downloaded file should be saved (e.g., './downloads/report.pdf').

#### Returns

`Promise`\<`void`\>

#### Examples

```ts
// Basic usage: Download a CSV file.
await downloadFile("https://example.com/data.csv", "./data/downloaded_data.csv");
console.log("CSV file downloaded successfully!");
```

```ts
// Download an image file.
await downloadFile("https://www.example.com/image.jpg", "./images/downloaded_image.jpg");
console.log("Image downloaded successfully!");
```

***

### getHtmlTable()

> **getHtmlTable**(`urlOrHtml`, `options?`): `Promise`\<`Record`\<`string`, `string`\>[]\>

Defined in: [journalism-web-scraping/src/web-scraping/getHtmlTable.ts:43](https://github.com/nshiab/journalism-web-scraping/blob/v2.0.8/src/web-scraping/getHtmlTable.ts#L43)

Extracts tabular data from an HTML table from a given URL or an HTML string and returns it as an array of objects. This function is particularly useful for scraping structured data from web pages.

If the page uses JavaScript to render the table, you should fetch the HTML first using a tool like Playwright or Puppeteer and then pass the HTML string to this function.

#### Parameters

##### urlOrHtml

`string`

The URL of the web page containing the HTML table or the HTML string itself.

##### options?

An optional object to specify how to locate the table.

###### index?

`number`

The 0-based index of the table to select if multiple tables match the `selector`. Defaults to `0`.

###### selector?

`string`

A CSS selector string to identify the target table on the page. If not provided, the function will look for the first `<table>` element.

#### Returns

`Promise`\<`Record`\<`string`, `string`\>[]\>

A Promise that resolves to an array of objects representing the table data, where each row is an object with column headers as keys.

#### Examples

```ts
// Extract data from the first table on a page via URL
const data = await getHtmlTable("https://example.com/data");
console.log(data[0]); // Accessing data from the first row
```

```ts
// Extract data from a specific table using a selector and index
// This parses the fourth table with the class name 'data-table'.
const specificTableData = await getHtmlTable("https://example.com/data", {
  selector: ".data-table",
  index: 3
});
console.table(specificTableData);
```

```ts
// Extract data from an HTML string
const html = "<table><tr><th>Header</th></tr><tr><td>Data</td></tr></table>";
const dataFromHtml = await getHtmlTable(html);
console.log(dataFromHtml);
```

***

### getStatCanTable()

> **getStatCanTable**(`pid`, `options?`): `Promise`\<`string` \| `Record`\<`string`, `string`\>[]\>

Defined in: [journalism-web-scraping/src/web-scraping/getStatCanTable.ts:43](https://github.com/nshiab/journalism-web-scraping/blob/v2.0.8/src/web-scraping/getStatCanTable.ts#L43)

Retrieves tabular data from Statistics Canada's website using a provided Product ID (PID). This function automates the process of fetching, unzipping, and parsing the CSV data directly from StatCan's API, making it easy to integrate official Canadian statistics into applications or analyses.

The PID is a unique identifier for each table on the Statistics Canada website. It can typically be found in the URL of the table's page (e.g., `https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=98100001` where `98100001` is the PID).

#### Parameters

##### pid

`string`

The Product ID (PID) of the Statistics Canada table. This is a string of up to 8 digits. If a longer string is provided, it will be truncated to the first 8 characters.

##### options?

Optional settings to customize the data retrieval.

###### debug?

`boolean`

A boolean indicating whether to enable debug logging to the console, showing fetch URLs and other process details. Defaults to `false`.

###### lang?

`"en"` \| `"fr"`

The language of the table data. Can be 'en' for English or 'fr' for French. Defaults to 'en'.

###### returnRawCSV?

`boolean`

A boolean indicating whether to return the raw CSV data as a string instead of a parsed array of objects. Useful for direct file storage or custom parsing. Defaults to `false`.

#### Returns

`Promise`\<`string` \| `Record`\<`string`, `string`\>[]\>

A Promise that resolves to either a `string` (if `returnRawCSV` is `true`) or an array of objects representing the table rows.

#### Examples

```ts
// Retrieve data for a specific Statistics Canada table (e.g., PID '98100001').
const data = await getStatCanTable('98100001');
console.table(data);
```

```ts
// Retrieve data in French and return as raw CSV.
const rawCsvData = await getStatCanTable('98100001', {
  lang: 'fr',
  returnRawCSV: true,
});
console.log(rawCsvData);
```

```ts
// The function automatically truncates PIDs longer than 8 characters.
const truncatedPidData = await getStatCanTable('9810000112345', { debug: true });
console.table(truncatedPidData); // Console will show a warning about truncation.
```
