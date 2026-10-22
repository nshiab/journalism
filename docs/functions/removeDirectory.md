[**Journalism v4.0.2**](../index.md)

***

[Journalism](../globals.md) / removeDirectory

# Function: removeDirectory()

> **removeDirectory**(`path`): `void`

Defined in: [journalism-extras/src/extras/removeDirectory.ts:25](https://github.com/nshiab/journalism-extras/blob/v1.0.12/src/extras/removeDirectory.ts#L25)

Removes a directory and all its contents recursively.

**Caution**: Use this function with care, as it permanently deletes files and directories without sending them to the recycle bin or trash. Ensure that the `path` provided is correct to avoid accidental data loss.

## Parameters

### path

`string`

The absolute or relative path to the directory to be removed.

## Returns

`void`

`void`

## Examples

```ts
// Removes the directory and all its contents recursively.
removeDirectory("./data/temp");
console.log("Directory removed successfully.");
```

```ts
// Attempting to remove a directory that does not exist will not throw an error due to `force: true`.
removeDirectory("./non-existent-folder");
console.log("Attempted to remove non-existent folder (no error thrown).");
```
