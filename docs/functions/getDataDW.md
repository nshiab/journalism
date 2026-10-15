[**Journalism v4.0.0**](../index.md)

***

[Journalism](../globals.md) / getDataDW

# Function: getDataDW()

> **getDataDW**(`chartId`, `options?`): `Promise`\<`unknown`\>

Gets the data of a Datawrapper chart, table, or map.

Authentication is handled via an API key, which can be provided through environment variables (`DATAWRAPPER_KEY`) or explicitly in the options.

## Parameters

### chartId

`string`

The unique ID of the Datawrapper chart, table, or map. This ID can be found in the Datawrapper URL or dashboard.

### options?

Optional parameters to configure the request.

#### apiKey?

`string`

The name of the environment variable that stores your Datawrapper API key (e.g., `"DATAWRAPPER_KEY"`). If not provided, the function defaults to looking for the `DATAWRAPPER_KEY` environment variable.

#### parse?

`boolean`

If `true`, the response will be parsed and returned as a JavaScript value. CSV data (charts and tables) is returned as an array of objects; JSON data (maps) is returned as a parsed object. Defaults to `false`.

#### returnResponse?

`boolean`

If `true`, the function will return the full `Response` object from the Datawrapper API call. This can be useful for debugging or for more detailed handling of the API response. Defaults to `false`.

## Returns

`Promise`\<`unknown`\>

A Promise that resolves to a raw `string` by default, a parsed value if `parse` is `true` (`Record<string, string>[]` for CSV charts/tables, or a `object` for JSON maps), or a `Response` object if `returnResponse` is `true`.

## Examples

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
