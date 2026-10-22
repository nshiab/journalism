[**Journalism v4.0.2**](../index.md)

***

[Journalism](../globals.md) / openSpreadsheet

# Function: openSpreadsheet()

> **openSpreadsheet**(`spreadsheetUrl`, `options?`): `Promise`\<\{ `sheetId?`: `number`; `spreadsheet`: `GoogleSpreadsheet`; \}\>

Defined in: [journalism-google/src/google/openSpreadsheet.ts:59](https://github.com/nshiab/journalism-google/blob/v2.0.0/src/google/openSpreadsheet.ts#L59)

Opens a Google spreadsheet and returns its loaded representation. When the
URL identifies a specific tab with a `gid`, that ID is also returned as
`sheetId`; otherwise, `sheetId` is undefined.

By default, authentication uses `GOOGLE_SERVICE_ACCOUNT_EMAIL` and
`GOOGLE_PRIVATE_KEY`. Alternatively, `GOOGLE_APPLICATION_CREDENTIALS` can
point to a service-account JSON file. Credentials passed through
`options.credentials` take precedence over both environment-based methods.
The service account must have access to the spreadsheet.

To learn what you can do with the returned `spreadsheet`, refer to the
`node-google-spreadsheet` documentation:
[https://theoephraim.github.io/node-google-spreadsheet/#/](https://theoephraim.github.io/node-google-spreadsheet/#/).

## Parameters

### spreadsheetUrl

`string`

A Google Sheets URL. It may identify a spreadsheet or
a specific tab.

### options?

Controls authentication. The standard Google environment
variables are used when omitted.

#### apiEmail?

`string`

Name of the environment variable containing the
service-account email. Defaults to `GOOGLE_SERVICE_ACCOUNT_EMAIL`.

#### apiKey?

`string`

Name of the environment variable containing the
service-account private key. Defaults to `GOOGLE_PRIVATE_KEY`.

#### credentials?

\{ `email`: `string`; `privateKey`: `string`; \}

Explicit Google service-account credentials.

#### credentials.email

`string`

#### credentials.privateKey

`string`

## Returns

`Promise`\<\{ `sheetId?`: `number`; `spreadsheet`: `GoogleSpreadsheet`; \}\>

The loaded spreadsheet and the tab ID found in the URL, if any.

## Examples

**Open a spreadsheet using credentials from the environment.**

```ts
import { openSpreadsheet } from "@nshiab/journalism-google";

const spreadsheetUrl = "https://docs.google.com/spreadsheets/d/your-spreadsheet-id/edit";
const { spreadsheet } = await openSpreadsheet(spreadsheetUrl);
console.log(spreadsheet.title);
```

**Open a spreadsheet with explicit credentials.**

```ts
const { spreadsheet } = await openSpreadsheet(spreadsheetUrl, {
  credentials: {
    email: "service-account@project.iam.gserviceaccount.com",
    privateKey: "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  },
});
```

**Access the tab selected by a URL containing a gid.**

```ts
const { spreadsheet, sheetId } = await openSpreadsheet(sheetUrl);
const sheet = sheetId === undefined
  ? spreadsheet.sheetsByIndex[0]
  : spreadsheet.sheetsById[sheetId];
```
