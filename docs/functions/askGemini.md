[**Journalism v4.0.1**](../index.md)

***

[Journalism](../globals.md) / askGemini

# Function: askGemini()

> **askGemini**\<`TResponse`\>(`prompt`, `options?`): `Promise`\<\{ `durationMs`: `number`; `estimatedCost`: `number` \| `null`; `files`: `object`[]; `fromCache`: `boolean`; `model`: `string`; `outputTokenCount`: `number`; `prompt`: `string`; `promptTokenCount`: `number`; `response`: `TResponse`; `safetyEnabled`: `boolean`; `systemPrompt`: `string` \| `null`; `thinkingLevel`: `"minimal"` \| `"low"` \| `"medium"` \| `"high"` \| `null`; `thoughts`: `string` \| `null`; `thoughtsTokenCount`: `number`; `tokensPerSecond`: `number` \| `null`; `totalTokens`: `number`; `webSearch`: `boolean`; \}\>

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

## Type Parameters

### TResponse

`TResponse` = `unknown`

## Parameters

### prompt

`string`

The primary text prompt.

### options?

#### apiKey?

`string`

API key; defaults to `AI_KEY` env var.

#### cache?

`boolean`

Cache the response in `.journalism-cache`. Defaults to `true`.

#### files?

`object`[]

Files to send alongside the prompt, in order. Each entry has a `path` (local path or `gs://` URL) and a `type` (`"image"`, `"video"`, `"audio"`, `"pdf"`, or `"text"`). All files are appended as separate content parts after the prompt.

#### geminiParameters?

`Partial`\<`GenerateContentParameters`\>

Extra params merged into `generateContent`.

#### location?

`string`

GCP location; defaults to `AI_LOCATION` env var.

#### model?

`string`

Model name; defaults to `AI_MODEL` env var.

#### processResponse?

(`response`) => `TResponse` \| `Promise`\<`TResponse`\>

Transform or validate the response before returning it; rejected cached responses are removed.

#### project?

`string`

GCP project ID; defaults to `AI_PROJECT` env var.

#### safetyEnabled?

`boolean`

Override safety filter defaults.

#### schemaJson?

`unknown`

Zod JSON schema for structured output.

#### systemPrompt?

`string`

Optional system prompt.

#### temperature?

`number`

Sampling temperature sent to Gemini.

#### thinkingBudget?

`number`

Reasoning token budget. Use `0` to disable thinking, `-1` for a dynamic budget, or a positive number for a fixed budget. Ignored when `thinkingLevel` is provided.

#### thinkingLevel?

`"minimal"` \| `"low"` \| `"medium"` \| `"high"`

Thinking level: "minimal" | "low" | "medium" | "high".

#### vertex?

`boolean`

Use Vertex AI authentication.

#### webSearch?

`boolean`

Enable web search grounding (extra cost).

## Returns

`Promise`\<\{ `durationMs`: `number`; `estimatedCost`: `number` \| `null`; `files`: `object`[]; `fromCache`: `boolean`; `model`: `string`; `outputTokenCount`: `number`; `prompt`: `string`; `promptTokenCount`: `number`; `response`: `TResponse`; `safetyEnabled`: `boolean`; `systemPrompt`: `string` \| `null`; `thinkingLevel`: `"minimal"` \| `"low"` \| `"medium"` \| `"high"` \| `null`; `thoughts`: `string` \| `null`; `thoughtsTokenCount`: `number`; `tokensPerSecond`: `number` \| `null`; `totalTokens`: `number`; `webSearch`: `boolean`; \}\>

## Examples

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
