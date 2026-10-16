[**Journalism v4.0.1**](../index.md)

***

[Journalism](../globals.md) / getStatCanTable

# Function: getStatCanTable()

> **getStatCanTable**(`pid`, `options?`): `Promise`\<`string` \| `Record`\<`string`, `string`\>[]\>

Retrieves tabular data from Statistics Canada's website using a provided Product ID (PID). This function automates the process of fetching, unzipping, and parsing the CSV data directly from StatCan's API, making it easy to integrate official Canadian statistics into applications or analyses.

The PID is a unique identifier for each table on the Statistics Canada website. It can typically be found in the URL of the table's page (e.g., `https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=98100001` where `98100001` is the PID).

## Parameters

### pid

`string`

The Product ID (PID) of the Statistics Canada table. This is a string of up to 8 digits. If a longer string is provided, it will be truncated to the first 8 characters.

### options?

Optional settings to customize the data retrieval.

#### debug?

`boolean`

A boolean indicating whether to enable debug logging to the console, showing fetch URLs and other process details. Defaults to `false`.

#### lang?

`"en"` \| `"fr"`

The language of the table data. Can be 'en' for English or 'fr' for French. Defaults to 'en'.

#### returnRawCSV?

`boolean`

A boolean indicating whether to return the raw CSV data as a string instead of a parsed array of objects. Useful for direct file storage or custom parsing. Defaults to `false`.

## Returns

`Promise`\<`string` \| `Record`\<`string`, `string`\>[]\>

A Promise that resolves to either a `string` (if `returnRawCSV` is `true`) or an array of objects representing the table rows.

## Examples

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
