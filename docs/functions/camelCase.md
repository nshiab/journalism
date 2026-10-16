[**Journalism v4.0.2**](../index.md)

***

[Journalism](../globals.md) / camelCase

# Function: camelCase()

> **camelCase**(`input`): `string`

Converts a string into camelCase. This is useful for creating variable names or object keys from human-readable text.

## Parameters

### input

`string`

The string to convert to camelCase. It can contain spaces, punctuation, and mixed casing.

## Returns

`string`

The camelCased version of the input string.

## Examples

```ts
// Basic conversion
const result1 = camelCase("hello world");
console.log(result1); // "helloWorld"
```

```ts
// With punctuation and mixed case
const result2 = camelCase("  --Some@Thing is- happening--  ");
console.log(result2); // "someThingsHappening"
```

```ts
// With a single word
const result3 = camelCase("Journalism");
console.log(result3); // "journalism"
```
