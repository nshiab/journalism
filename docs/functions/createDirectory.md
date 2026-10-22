[**Journalism v4.0.2**](../index.md)

***

[Journalism](../globals.md) / createDirectory

# Function: createDirectory()

> **createDirectory**(`path`): `void`

Defined in: [journalism-extras/src/extras/createDirectory.ts:25](https://github.com/nshiab/journalism-extras/blob/v1.0.12/src/extras/createDirectory.ts#L25)

Recursively creates a directory structure. This function is useful for ensuring that a path exists before writing a file to it.

The function will not throw an error if the directory already exists. It can also accept a full file path, in which case it will create all the parent directories, ignoring the filename portion.

## Parameters

### path

`string`

The path of the directory to create. This can be a path to a directory or a full path to a file.

## Returns

`void`

## Examples

```ts
// Create a simple directory
createDirectory("./output/data");
// This will create the 'output' and 'data' folders if they don't exist.
```

```ts
// Create a directory from a file path
createDirectory("./output/data/my-file.json");
// This will create the './output/data' directory structure. The 'my-file.json' part is ignored.
```
