[**Journalism v3.1.2**](../index.md)

***

[Journalism](../globals.md) / zip

# Function: zip()

> **zip**(`files`, `zipFile`): `void`

Compresses one or more files or an entire folder into a single zip archive. This function is useful for bundling multiple assets, preparing data for transfer, or creating backups.

You can specify individual files to be added to the archive, or provide a path to a directory, in which case all its contents will be compressed. The function automatically creates the necessary directory structure for the output zip file if it doesn't already exist.

## Parameters

### files

`string` \| `string`[]

A string representing the path to a folder, or an array of strings representing paths to individual files. These are the items to be included in the zip archive.

### zipFile

`string`

The absolute or relative path, including the filename and `.zip` extension, where the created zip archive will be saved (e.g., `"./archives/my-data.zip"`).

## Returns

`void`

`void`

## Example

```ts
// Compressing multiple files into a zip archive.
zip(['file1.txt', 'file2.txt'], 'archive.zip');
console.log("Files zipped successfully.");

// Compressing a folder into a zip archive.
zip('path/to/folder', 'folder-archive.zip');
console.log("Folder zipped successfully.");
```
