[**Journalism v4.0.3**](../index.md)

***

[Journalism](../globals.md) / updateNotesDW

# ~~Function: updateNotesDW()~~

> **updateNotesDW**(`chartId`, `note`, `options?`): `Promise`\<`void` \| `Response`\>

Defined in: [journalism-dataviz/src/dataviz/updateNotesDW.ts:30](https://github.com/nshiab/journalism-dataviz/blob/v1.0.27/src/dataviz/updateNotesDW.ts#L30)

Updates the notes field of a Datawrapper chart, table, or map.

This function delegates to `updateInfoDW()` and logs a deprecation warning once per module instance. Use `updateInfoDW(chartId, { note }, options)` instead.

## Parameters

### chartId

`string`

The ID of the Datawrapper chart, table, or map to update.

### note

`string`

The notes text. An empty string clears the notes.

### options?

Optional authentication and response settings.

#### apiKey?

`string`

The name of the environment variable containing the API key. Defaults to `"DATAWRAPPER_KEY"`.

#### returnResponse?

`boolean`

If `true`, returns the unconsumed response without checking its status. Defaults to `false`.

## Returns

`Promise`\<`void` \| `Response`\>

A promise resolving to `void`, or to the raw `Response` when requested. By default, non-200 responses throw an error.

## Example

```ts
// Existing calls still work, but emit a deprecation warning.
await updateNotesDW("abcde", "Last updated today.");

// Preferred replacement, including a custom API-key environment variable.
await updateInfoDW("abcde", { note: "Last updated today." }, {
  apiKey: "DW_KEY",
});
```

## Deprecated

Use `updateInfoDW(chartId, { note }, options)` instead. This function will be removed in the next major version.
