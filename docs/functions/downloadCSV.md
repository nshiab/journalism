[**Journalism v4.0.2**](../index.md)

***

[Journalism](../globals.md) / downloadCSV

# Function: downloadCSV()

> **downloadCSV**(`data`, `filename`): `void`

Triggers a download of the provided data as a CSV (Comma Separated Values) file directly in the user's browser. This function is designed for client-side use, allowing web applications to generate and offer data exports without requiring server-side processing.

The function takes an array of JavaScript objects, converts them into a CSV string, creates a Blob, and then simulates a click on a hidden anchor tag to prompt the browser to download the file. This is a common and effective method for initiating file downloads from the browser.

Object and array cell values are serialized as JSON. Dates use UTC formatting.

## Parameters

### data

`object`[]

An array of JavaScript objects to be converted into CSV format. Each object represents a row, and its keys will become the CSV headers.

### filename

`string`

The desired name for the downloaded CSV file (e.g., `"my_data_export.csv"`, `"report.csv"`). It's recommended to include the `.csv` extension.

## Returns

`void`

`void`

## Example

```ts
import { downloadCSV } from "@nshiab/journalism-web";

// Download a simple array of objects as a CSV file.

const data = [
  { name: "Alice", age: 30, city: "New York" },
  { name: "Bob", age: 25, city: "Los Angeles" }
];
downloadCSV(data, "data.csv");
console.log("CSV download initiated.");
```
