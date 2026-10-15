[**Journalism v4.0.0**](../index.md)

***

[Journalism](../globals.md) / dataAsCsv

# Function: dataAsCsv()

> **dataAsCsv**(`arrayOfObjects`): `string`

Converts an array of objects into a CSV (Comma-Separated Values) string.

The function takes an array of objects and returns a string in CSV format. The first line contains the union of keys found across all objects, in discovery order. Each subsequent line represents an object, with values in the same order as the headers.

Object and array values are serialized as JSON before CSV escaping. Date values
retain their UTC date formatting, and null or undefined values become empty cells.

## Parameters

### arrayOfObjects

`object`[]

The objects to convert. Rows may have different keys;
columns are inferred from all rows.

## Returns

`string`

A string representing the data in CSV format.

## Example

```ts
// Basic usage with a simple dataset
const dataset = [
  { make: "Toyota", model: "Camry", year: 2021 },
  { make: "Honda", model: "Accord", year: 2022 },
  { make: "Ford", model: "Mustang", year: 2020 }
];

const csvString = dataAsCsv(dataset);

console.log(csvString);
// Expected output:
// "make,model,year\nToyota,Camry,2021\nHonda,Accord,2022\nFord,Mustang,2020"
```
