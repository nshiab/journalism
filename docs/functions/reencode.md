[**Journalism v3.1.2**](../index.md)

***

[Journalism](../globals.md) / reencode

# Function: reencode()

> **reencode**(`inputFilePath`, `outputFilePath`, `fromEncoding`, `toEncoding`, `options?`): `Promise`\<`void`\>

Converts a file from one character encoding to another. This function is particularly optimized for handling large files.

Character encoding is crucial for ensuring that text data is displayed correctly across different systems and applications. This function helps resolve issues related to garbled text when files are created or read with different encoding standards.

## Parameters

### inputFilePath

`string`

The absolute path to the input file that needs to be re-encoded.

### outputFilePath

`string`

The absolute path where the converted file will be saved.

### fromEncoding

`string`

The character encoding of the input file (e.g., 'windows-1252', 'latin1', 'ISO-8859-1').

### toEncoding

`string`

The desired character encoding for the output file (e.g., 'utf-8').

### options?

Optional configuration settings for the re-encoding process.

#### addBOM?

`boolean`

If `true`, a Byte Order Mark (BOM) will be added to the output file if the `toEncoding` is UTF-8. A BOM can help some applications correctly identify the UTF-8 encoding. Defaults to `false`.

#### bufferSize?

`number`

The size of the read buffer in kilobytes (KB). A larger buffer can improve performance for very large files but consumes more memory. Defaults to `256` KB.

## Returns

`Promise`\<`void`\>

A Promise that resolves when the file has been successfully re-encoded and saved.

## Examples

```ts
// Convert a CSV file from Windows-1252 to UTF-8 encoding.
await reencode('input.csv', 'output.csv', 'windows-1252', 'utf-8');
console.log("File re-encoded successfully.");
```

```ts
// Re-encode a large file with a larger buffer size and add a UTF-8 Byte Order Mark (BOM).
await reencode('large_input.csv', 'large_output.csv', 'latin1', 'utf-8', {
  bufferSize: 1024, // 1MB buffer
  addBOM: true,
});
console.log("Large file re-encoded with custom buffer and BOM.");
```
