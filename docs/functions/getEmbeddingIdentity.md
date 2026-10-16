[**Journalism v4.0.2**](../index.md)

***

[Journalism](../globals.md) / getEmbeddingIdentity

# Function: getEmbeddingIdentity()

> **getEmbeddingIdentity**(`options?`, `environment?`): \{ `backend`: `"gemini-api"`; `model`: `string`; `provider`: `"gemini"`; `schemaVersion`: `2`; \} \| \{ `backend`: `"vertex"`; `location?`: `string`; `model`: `string`; `project?`: `string`; `provider`: `"gemini"`; `schemaVersion`: `2`; \} \| \{ `backend`: `"ollama"`; `contextWindow?`: `number`; `endpoint`: `string`; `model`: `string`; `provider`: `"ollama"`; `schemaVersion`: `2`; \}

Returns the canonical, non-secret identity for an embedding request.
Downstream persisted data can compare this value to decide whether vectors
are compatible with the current request.

## Parameters

### options?

\{ `apiKey?`: `undefined`; `beforeRequest?`: () => `void` \| `Promise`\<`void`\>; `cache?`: `boolean`; `contextWindow?`: `undefined`; `location?`: `undefined`; `model?`: `string`; `ollama?`: `undefined`; `project?`: `undefined`; `provider?`: `undefined`; `verbose?`: `boolean`; `vertex?`: `undefined`; \} \| \{ `apiKey?`: `string`; `beforeRequest?`: () => `void` \| `Promise`\<`void`\>; `cache?`: `boolean`; `contextWindow?`: `undefined`; `location?`: `undefined`; `model?`: `string`; `ollama?`: `undefined`; `project?`: `undefined`; `provider`: `"gemini"`; `verbose?`: `boolean`; `vertex?`: `false`; \} \| \{ `apiKey?`: `string`; `beforeRequest?`: () => `void` \| `Promise`\<`void`\>; `cache?`: `boolean`; `contextWindow?`: `undefined`; `location?`: `string`; `model?`: `string`; `ollama?`: `undefined`; `project?`: `string`; `provider`: `"gemini"`; `verbose?`: `boolean`; `vertex`: `true`; \} \| \{ `apiKey?`: `undefined`; `beforeRequest?`: () => `void` \| `Promise`\<`void`\>; `cache?`: `boolean`; `contextWindow?`: `number`; `location?`: `undefined`; `model?`: `string`; `ollama?`: \{ `embeddingEndpoint?`: `string`; `embed`(`request`): `Promise`\<\{ `embeddings`: `number`[][]; \}\>; \}; `project?`: `undefined`; `provider`: `"ollama"`; `verbose?`: `boolean`; `vertex?`: `undefined`; \}

Provider-aware embedding options.

#### Type Literal

\{ `apiKey?`: `undefined`; `beforeRequest?`: () => `void` \| `Promise`\<`void`\>; `cache?`: `boolean`; `contextWindow?`: `undefined`; `location?`: `undefined`; `model?`: `string`; `ollama?`: `undefined`; `project?`: `undefined`; `provider?`: `undefined`; `verbose?`: `boolean`; `vertex?`: `undefined`; \}

Provider-aware embedding options.

##### apiKey?

`undefined`

Direct credentials require an explicit provider.

##### beforeRequest?

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

##### cache?

`boolean`

Whether to persist and reuse the embedding response. Defaults to `true`.

##### contextWindow?

`undefined`

Provider-specific semantic options require an explicit provider.

##### location?

`undefined`

Direct deployment selection requires an explicit provider.

##### model?

`string`

The embedding model. Defaults to `AI_EMBEDDINGS_MODEL`.

##### ollama?

`undefined`

Custom clients require an explicit provider.

##### project?

`undefined`

Direct deployment selection requires an explicit provider.

##### provider?

`undefined`

Omit the discriminator to select the provider from the environment.

##### verbose?

`boolean`

Whether to log request and timing information.

##### vertex?

`undefined`

Direct backend selection requires an explicit provider.

***

#### Type Literal

\{ `apiKey?`: `string`; `beforeRequest?`: () => `void` \| `Promise`\<`void`\>; `cache?`: `boolean`; `contextWindow?`: `undefined`; `location?`: `undefined`; `model?`: `string`; `ollama?`: `undefined`; `project?`: `undefined`; `provider`: `"gemini"`; `verbose?`: `boolean`; `vertex?`: `false`; \}

Provider-aware embedding options.

##### apiKey?

`string`

Gemini API key. Defaults to `AI_KEY`.

##### beforeRequest?

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

##### cache?

`boolean`

Whether to persist and reuse the embedding response. Defaults to `true`.

##### contextWindow?

`undefined`

Ollama context windows are not valid for the Gemini API.

##### location?

`undefined`

Vertex locations are not valid for the Gemini API.

##### model?

`string`

The embedding model. Defaults to `AI_EMBEDDINGS_MODEL`.

##### ollama?

`undefined`

Ollama clients are not valid for the Gemini API.

##### project?

`undefined`

Vertex projects are not valid for the Gemini API.

##### provider

`"gemini"`

Explicitly selects the Google embedding provider.

##### verbose?

`boolean`

Whether to log request and timing information.

##### vertex?

`false`

Keeps the request on the Gemini API rather than Vertex AI.

***

#### Type Literal

\{ `apiKey?`: `string`; `beforeRequest?`: () => `void` \| `Promise`\<`void`\>; `cache?`: `boolean`; `contextWindow?`: `undefined`; `location?`: `string`; `model?`: `string`; `ollama?`: `undefined`; `project?`: `string`; `provider`: `"gemini"`; `verbose?`: `boolean`; `vertex`: `true`; \}

Provider-aware embedding options.

##### apiKey?

`string`

Vertex Express Mode API key.

##### beforeRequest?

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

##### cache?

`boolean`

Whether to persist and reuse the embedding response. Defaults to `true`.

##### contextWindow?

`undefined`

Ollama context windows are not valid for Vertex AI.

##### location?

`string`

Google Cloud location. Defaults to `AI_LOCATION`.

##### model?

`string`

The embedding model. Defaults to `AI_EMBEDDINGS_MODEL`.

##### ollama?

`undefined`

Ollama clients are not valid for Vertex AI.

##### project?

`string`

Google Cloud project. Defaults to `AI_PROJECT`.

##### provider

`"gemini"`

Explicitly selects the Google embedding provider.

##### verbose?

`boolean`

Whether to log request and timing information.

##### vertex

`true`

Selects the Vertex AI backend.

***

#### Type Literal

\{ `apiKey?`: `undefined`; `beforeRequest?`: () => `void` \| `Promise`\<`void`\>; `cache?`: `boolean`; `contextWindow?`: `number`; `location?`: `undefined`; `model?`: `string`; `ollama?`: \{ `embeddingEndpoint?`: `string`; `embed`(`request`): `Promise`\<\{ `embeddings`: `number`[][]; \}\>; \}; `project?`: `undefined`; `provider`: `"ollama"`; `verbose?`: `boolean`; `vertex?`: `undefined`; \}

Provider-aware embedding options.

##### apiKey?

`undefined`

Gemini and Vertex API keys are not valid for Ollama.

##### beforeRequest?

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

##### cache?

`boolean`

Whether to persist and reuse the embedding response. Defaults to `true`.

##### contextWindow?

`number`

The model context-window size sent to Ollama.

##### location?

`undefined`

Vertex locations are not valid for Ollama.

##### model?

`string`

The embedding model. Defaults to `AI_EMBEDDINGS_MODEL`.

##### ollama?

\{ `embeddingEndpoint?`: `string`; `embed`(`request`): `Promise`\<\{ `embeddings`: `number`[][]; \}\>; \}

A custom Ollama client.

##### ollama.embeddingEndpoint?

`string`

Non-secret deployment endpoint for custom adapters that are not instances
of the Ollama SDK client.

##### ollama.embed

(`request`) => `Promise`\<\{ `embeddings`: `number`[][]; \}\>

Sends an embedding request to Ollama.

##### project?

`undefined`

Vertex projects are not valid for Ollama.

##### provider

`"ollama"`

Explicitly selects Ollama.

##### verbose?

`boolean`

Whether to log request and timing information.

##### vertex?

`undefined`

Vertex selection is not valid for Ollama.

### environment?

\{\[`key`: `string`\]: `string` \| `undefined`; \}

Environment used to resolve omitted values.

## Returns

The canonical identity used by embedding caches.

### Type Literal

\{ `backend`: `"gemini-api"`; `model`: `string`; `provider`: `"gemini"`; `schemaVersion`: `2`; \}

#### backend

> **backend**: `"gemini-api"`

Resolved Gemini API backend.

#### model

> **model**: `string`

Resolved embedding model.

#### provider

> **provider**: `"gemini"`

Resolved provider.

#### schemaVersion

> **schemaVersion**: `2`

Cache-compatibility schema for the canonical identity.

***

### Type Literal

\{ `backend`: `"vertex"`; `location?`: `string`; `model`: `string`; `project?`: `string`; `provider`: `"gemini"`; `schemaVersion`: `2`; \}

#### backend

> **backend**: `"vertex"`

Resolved Vertex AI backend.

#### location?

> `optional` **location?**: `string`

Resolved Google Cloud location, when configured.

#### model

> **model**: `string`

Resolved embedding model.

#### project?

> `optional` **project?**: `string`

Resolved Google Cloud project, when configured.

#### provider

> **provider**: `"gemini"`

Resolved provider.

#### schemaVersion

> **schemaVersion**: `2`

Cache-compatibility schema for the canonical identity.

***

### Type Literal

\{ `backend`: `"ollama"`; `contextWindow?`: `number`; `endpoint`: `string`; `model`: `string`; `provider`: `"ollama"`; `schemaVersion`: `2`; \}

#### backend

> **backend**: `"ollama"`

Resolved Ollama backend.

#### contextWindow?

> `optional` **contextWindow?**: `number`

Context-window size when explicitly configured.

#### endpoint

> **endpoint**: `string`

Non-secret Ollama endpoint identity.

#### model

> **model**: `string`

Resolved embedding model.

#### provider

> **provider**: `"ollama"`

Resolved provider.

#### schemaVersion

> **schemaVersion**: `2`

Cache-compatibility schema for the canonical identity.

## Example

```ts
const identity = getEmbeddingIdentity({
  provider: "ollama",
  model: "nomic-embed-text",
  contextWindow: 8192,
});
```
