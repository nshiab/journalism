[**Journalism v4.0.1**](../index.md)

***

[Journalism](../globals.md) / getInfoDW

# Function: getInfoDW()

> **getInfoDW**(`chartId`, `options?`): `Promise`\<`Record`\<`string`, `unknown`\> \| `Response`\>

Gets information and settings for a Datawrapper chart, table, or map.

Returns the full parsed chart object, including any chart-specific fields. Property values are typed as unknown because the response varies by visualization.

Authentication is handled via an API key stored in an environment variable (`DATAWRAPPER_KEY` by default). The token requires `chart:read` or `chart:write` scope.

## Parameters

### chartId

`string`

The unique ID of the Datawrapper chart, table, or map. This ID can be found in the Datawrapper URL or dashboard.

### options?

Optional parameters to configure the request.

#### apiKey?

`string`

The name of the environment variable that stores your Datawrapper API key (e.g., `"DATAWRAPPER_KEY"`). If not provided, the function defaults to looking for the `DATAWRAPPER_KEY` environment variable.

#### returnResponse?

`boolean`

If `true`, the function will return the full, unconsumed `Response` object from the Datawrapper API call, including HTTP error responses. This can be useful for debugging or for more detailed handling of the API response. Defaults to `false`.

## Returns

`Promise`\<`Record`\<`string`, `unknown`\> \| `Response`\>

A Promise that resolves to a parsed `Record<string, unknown>` by default, or a `Response` object if `returnResponse` is `true`.

## Examples

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
