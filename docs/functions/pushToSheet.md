[**Journalism v4.0.1**](../index.md)

***

[Journalism](../globals.md) / pushToSheet

# Function: pushToSheet()

> **pushToSheet**(`data`, `sheetUrl`, `options?`): `Promise`\<`void`\>

Writes data to a Google Sheets tab, either replacing its contents or
appending rows. The tab can be selected by the URL's `gid` or by title.
If a titled tab does not exist, creation must be explicitly enabled with
`create: true`. In append mode, column headers are detected automatically
within the first 100 rows of the tab.

By default, authentication uses `GOOGLE_SERVICE_ACCOUNT_EMAIL` and
`GOOGLE_PRIVATE_KEY`. Alternatively, `GOOGLE_APPLICATION_CREDENTIALS` can
point to a service-account JSON file. Credentials passed through
`options.credentials` take precedence over both environment-based methods.
For detailed setup instructions, refer to the `node-google-spreadsheet`
authentication guide:
[https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication](https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication).

## Parameters

### data

`object`[]

Rows of data. Object keys are used as column headers.

### sheetUrl

`string`

A Google Sheets URL. It may identify a spreadsheet or a
specific tab.

### options?

Controls tab selection, writing, metadata, value parsing, and
authentication.

#### create?

`boolean`

Creates a missing titled tab. Requires `tabTitle` and
defaults to `false`.

#### credentials?

\{ `email`: `string`; `privateKey`: `string`; \}

Explicit Google service-account credentials.
These values override `GOOGLE_APPLICATION_CREDENTIALS`,
`GOOGLE_SERVICE_ACCOUNT_EMAIL`, and `GOOGLE_PRIVATE_KEY`.

#### credentials.email

`string`

#### credentials.privateKey

`string`

#### lastUpdate?

`boolean` \| `"Canada/Atlantic"` \| `"Canada/Central"` \| `"Canada/Eastern"` \| `"Canada/Mountain"` \| `"Canada/Newfoundland"` \| `"Canada/Pacific"` \| `"Canada/Saskatchewan"` \| `"Canada/Yukon"`

Adds a UTC timestamp when `true`, or a timestamp in
the specified Canadian time zone. Available only in overwrite mode.

#### mode?

`"overwrite"` \| `"append"`

Whether to overwrite the tab or append rows. Defaults to
`"overwrite"`.

#### prepend?

`string`

Adds text above the header row in overwrite mode.

#### raw?

`boolean`

Writes values without Google Sheets interpretation.
Defaults to `true`.

#### tabTitle?

`string`

Selects a tab by title instead of using the URL's
`gid`.

## Returns

`Promise`\<`void`\>

A promise that resolves when the data has been written.

## Examples

**Overwrite the tab selected by the URL.**

```ts
import { pushToSheet } from "@nshiab/journalism-google";

const data = [{ id: "001", name: "Alice" }];
const sheetUrl = "https://docs.google.com/spreadsheets/d/your-spreadsheet-id/edit#gid=0";
await pushToSheet(data, sheetUrl);
```

**Append rows to a tab selected by title.**

```ts
await pushToSheet(data, sheetUrl, {
  mode: "append",
  tabTitle: "Election results",
});
```

**Create a missing tab and write a timestamp in Eastern time.**

```ts
await pushToSheet(data, sheetUrl, {
  tabTitle: "Election results",
  create: true,
  lastUpdate: "Canada/Eastern",
});
```
