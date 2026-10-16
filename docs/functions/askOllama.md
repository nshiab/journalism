[**Journalism v4.0.1**](../index.md)

***

[Journalism](../globals.md) / askOllama

# Function: askOllama()

> **askOllama**\<`TResponse`\>(`prompt`, `options?`): `Promise`\<\{ `contextWindow`: `number` \| `null`; `durationMs`: `number`; `files`: `object`[]; `fromCache`: `boolean`; `model`: `string`; `outputTokenCount`: `number`; `prompt`: `string`; `promptTokenCount`: `number`; `response`: `TResponse`; `systemPrompt`: `string` \| `null`; `temperature`: `number`; `thinkingLevel`: `boolean` \| `"low"` \| `"medium"` \| `"high"` \| `null`; `thoughts`: `string` \| `null`; `tokensPerSecond`: `number` \| `null`; `totalTokens`: `number`; \}\>

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

## Type Parameters

### TResponse

`TResponse` = `unknown`

## Parameters

### prompt

`string`

The primary text prompt.

### options?

#### cache?

`boolean`

Cache the response in `.journalism-cache`. Defaults to `true`.

#### contextWindow?

`number`

Override the model's context window size.

#### files?

`object`[]

Files to send alongside the prompt. Only `"image"` and `"text"` types are supported (local paths only; no GCS, audio, video, or PDF). Text files are sent as separate user messages after the prompt; images are sent as attachments to the prompt message.

#### model?

`string`

Model name; defaults to `AI_MODEL` env var.

#### ollama?

`unknown`

Custom `Ollama` instance targeting a specific host.

#### ollamaParameters?

`Partial`\<`ChatRequest`\>

Extra params merged into `client.chat`.

#### processResponse?

(`response`) => `TResponse` \| `Promise`\<`TResponse`\>

Transform or validate the response before returning it; rejected cached responses are removed.

#### schemaJson?

`unknown`

JSON schema for structured output.

#### systemPrompt?

`string`

Optional system prompt.

#### temperature?

`number`

Sampling temperature (default 0).

#### thinkingLevel?

`boolean` \| `"low"` \| `"medium"` \| `"high"`

Enables reasoning. Pass `true` for models that only support on/off, or `"low"`, `"medium"`, or `"high"` for granular control.

## Returns

`Promise`\<\{ `contextWindow`: `number` \| `null`; `durationMs`: `number`; `files`: `object`[]; `fromCache`: `boolean`; `model`: `string`; `outputTokenCount`: `number`; `prompt`: `string`; `promptTokenCount`: `number`; `response`: `TResponse`; `systemPrompt`: `string` \| `null`; `temperature`: `number`; `thinkingLevel`: `boolean` \| `"low"` \| `"medium"` \| `"high"` \| `null`; `thoughts`: `string` \| `null`; `tokensPerSecond`: `number` \| `null`; `totalTokens`: `number`; \}\>

## Examples

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
