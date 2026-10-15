[**Journalism v4.0.0**](../index.md)

***

[Journalism](../globals.md) / updateInfoDW

# Function: updateInfoDW()

> **updateInfoDW**(`chartId`, `metadata`, `options?`): `Promise`\<`void` \| `Response`\>

Updates the title, description, and notes of a Datawrapper chart, table, or map in one API request.

Only supplied fields are updated. Omit a field or pass `undefined` to preserve its existing value; pass an empty string to clear it. At least one field must be supplied. Other chart settings are preserved by Datawrapper's partial metadata update.

The API key is read from `DATAWRAPPER_KEY` by default. This function updates the draft visualization; call `publishChartDW()` afterward to publish the changes.

## Parameters

### chartId

`string`

The ID of the Datawrapper chart, table, or map to update.

### metadata

The fields to update. At least one must be supplied.

#### description?

`string`

The description below the title, stored as `metadata.describe.intro`. An empty string clears it.

#### note?

`string`

The notes in the visualization's footer, stored as `metadata.annotate.notes`. An empty string clears them.

#### title?

`string`

The visualization's headline. An empty string clears it.

### options?

Optional authentication and response settings.

#### apiKey?

`string`

The name of the environment variable containing the API key. Defaults to `"DATAWRAPPER_KEY"`.

#### returnResponse?

`boolean`

If `true`, returns the unconsumed response without checking its status. Defaults to `false`.

## Returns

`Promise`\<`void` \| `Response`\>

A promise resolving to `void`, or to the raw `Response` when requested. By default, non-200 responses throw an error.

## Examples

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
