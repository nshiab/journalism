[**Journalism v4.0.0**](../index.md)

***

[Journalism](../globals.md) / getSheetData

# Function: getSheetData()

## Call Signature

> **getSheetData**(`sheetUrl`, `options`): `Promise`\<`string`\>

Retrieves data from a Google Sheet.

By default, this function attempts to authenticate using environment variables (`GOOGLE_PRIVATE_KEY` for the API key and `GOOGLE_SERVICE_ACCOUNT_EMAIL` for the service account email). Alternatively, you can use `GOOGLE_APPLICATION_CREDENTIALS` pointing to a service account JSON file. For detailed instructions on setting up credentials, refer to the `node-google-spreadsheet` authentication guide: [https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication](https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication).

### Parameters

#### sheetUrl

`string`

The URL of the Google Sheet from which to retrieve data. This URL should point to a specific sheet (e.g., ending with `#gid=0`).

#### options

An optional object with configuration options:

##### apiEmail?

`string`

Name of the environment variable containing the service-account email. Defaults to `GOOGLE_SERVICE_ACCOUNT_EMAIL`.

##### apiKey?

`string`

Name of the environment variable containing the service-account private key. Defaults to `GOOGLE_PRIVATE_KEY`.

##### csv

`true`

If `true`, the function will return the raw data as a CSV string. If `false` or omitted, it will return an array of objects, where each object represents a row and keys correspond to column headers. Defaults to `false`.

##### skip?

`number`

The number of rows to skip from the beginning of the sheet before parsing the data. This is useful for sheets that have metadata at the top. Defaults to `0`.

### Returns

`Promise`\<`string`\>

A Promise that resolves to either an array of objects (`Record<string, string>[]`) if `options.csv` is `false`, or a CSV string (`string`) if `options.csv` is `true`.

### Examples

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

## Call Signature

> **getSheetData**(`sheetUrl`, `options?`): `Promise`\<`Record`\<`string`, `string`\>[]\>

Retrieves data from a Google Sheet.

By default, this function attempts to authenticate using environment variables (`GOOGLE_PRIVATE_KEY` for the API key and `GOOGLE_SERVICE_ACCOUNT_EMAIL` for the service account email). Alternatively, you can use `GOOGLE_APPLICATION_CREDENTIALS` pointing to a service account JSON file. For detailed instructions on setting up credentials, refer to the `node-google-spreadsheet` authentication guide: [https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication](https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication).

### Parameters

#### sheetUrl

`string`

The URL of the Google Sheet from which to retrieve data. This URL should point to a specific sheet (e.g., ending with `#gid=0`).

#### options?

An optional object with configuration options:

##### apiEmail?

`string`

Name of the environment variable containing the service-account email. Defaults to `GOOGLE_SERVICE_ACCOUNT_EMAIL`.

##### apiKey?

`string`

Name of the environment variable containing the service-account private key. Defaults to `GOOGLE_PRIVATE_KEY`.

##### csv?

`false`

If `true`, the function will return the raw data as a CSV string. If `false` or omitted, it will return an array of objects, where each object represents a row and keys correspond to column headers. Defaults to `false`.

##### skip?

`number`

The number of rows to skip from the beginning of the sheet before parsing the data. This is useful for sheets that have metadata at the top. Defaults to `0`.

### Returns

`Promise`\<`Record`\<`string`, `string`\>[]\>

A Promise that resolves to either an array of objects (`Record<string, string>[]`) if `options.csv` is `false`, or a CSV string (`string`) if `options.csv` is `true`.

### Examples

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
