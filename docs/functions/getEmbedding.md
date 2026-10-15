[**Journalism v4.0.0**](../index.md)

***

[Journalism](../globals.md) / getEmbedding

# Function: getEmbedding()

> **getEmbedding**(`text`, `options?`): `Promise`\<`number`[]\>

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

## Parameters

### text

`string`

The input text string for which to generate the embedding.

### options?

\{ `apiKey?`: `undefined`; `beforeRequest?`: () => `void` \| `Promise`\<`void`\>; `cache?`: `boolean`; `contextWindow?`: `undefined`; `location?`: `undefined`; `model?`: `string`; `ollama?`: `undefined`; `project?`: `undefined`; `provider?`: `undefined`; `verbose?`: `boolean`; `vertex?`: `undefined`; \} \| \{ `apiKey?`: `string`; `beforeRequest?`: () => `void` \| `Promise`\<`void`\>; `cache?`: `boolean`; `contextWindow?`: `undefined`; `location?`: `undefined`; `model?`: `string`; `ollama?`: `undefined`; `project?`: `undefined`; `provider`: `"gemini"`; `verbose?`: `boolean`; `vertex?`: `false`; \} \| \{ `apiKey?`: `string`; `beforeRequest?`: () => `void` \| `Promise`\<`void`\>; `cache?`: `boolean`; `contextWindow?`: `undefined`; `location?`: `string`; `model?`: `string`; `ollama?`: `undefined`; `project?`: `string`; `provider`: `"gemini"`; `verbose?`: `boolean`; `vertex`: `true`; \} \| \{ `apiKey?`: `undefined`; `beforeRequest?`: () => `void` \| `Promise`\<`void`\>; `cache?`: `boolean`; `contextWindow?`: `number`; `location?`: `undefined`; `model?`: `string`; `ollama?`: \{ `embeddingEndpoint?`: `string`; `embed`(`request`): `Promise`\<\{ `embeddings`: `number`[][]; \}\>; \}; `project?`: `undefined`; `provider`: `"ollama"`; `verbose?`: `boolean`; `vertex?`: `undefined`; \}

Configuration options for the embedding generation.

#### Type Literal

\{ `apiKey?`: `undefined`; `beforeRequest?`: () => `void` \| `Promise`\<`void`\>; `cache?`: `boolean`; `contextWindow?`: `undefined`; `location?`: `undefined`; `model?`: `string`; `ollama?`: `undefined`; `project?`: `undefined`; `provider?`: `undefined`; `verbose?`: `boolean`; `vertex?`: `undefined`; \}

Configuration options for the embedding generation.

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

Configuration options for the embedding generation.

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

Configuration options for the embedding generation.

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

Configuration options for the embedding generation.

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

## Returns

`Promise`\<`number`[]\>

A promise that resolves to an array of numbers representing the generated embedding.

## Examples

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
