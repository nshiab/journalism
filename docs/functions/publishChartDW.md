[**Journalism v4.0.1**](../index.md)

***

[Journalism](../globals.md) / publishChartDW

# Function: publishChartDW()

> **publishChartDW**(`chartId`, `options?`): `Promise`\<`void` \| `Response`\>

Publishes a specified Datawrapper chart, table, or map. This function streamlines the process of making your Datawrapper visualizations live, allowing for automated deployment and updates. It handles authentication using an API key, which can be provided via environment variables or directly through options.

## Parameters

### chartId

`string`

The unique ID of the Datawrapper chart, table, or map to be published. This ID can be found in the Datawrapper URL or dashboard.

### options?

Optional parameters to configure the publishing process.

#### apiKey?

`string`

The name of the environment variable that stores your Datawrapper API key (e.g., `"DATAWRAPPER_KEY"`). If not provided, the function defaults to looking for the `DATAWRAPPER_KEY` environment variable.

#### returnResponse?

`boolean`

If `true`, the function will return the full `Response` object from the Datawrapper API call. This can be useful for debugging or for more detailed handling of the API response. Defaults to `false`.

## Returns

`Promise`\<`void` \| `Response`\>

A Promise that resolves to `void` if `returnResponse` is `false` (default), or a `Response` object if `returnResponse` is `true`.

## Examples

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
