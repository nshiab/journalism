[**Journalism v4.0.2**](../index.md)

***

[Journalism](../globals.md) / capitalize

# Function: capitalize()

> **capitalize**(`string`): `string`

Capitalizes the first letter of a given string.

## Parameters

### string

`string`

The string to be capitalized.

## Returns

`string`

A new string with the first letter in uppercase.

## Examples

```ts
// Basic usage
const capitalized = capitalize("hello world");
console.log(capitalized); // "Hello world"
```

```ts
// With an already capitalized string
const alreadyCapitalized = capitalize("Journalism");
console.log(alreadyCapitalized); // "Journalism"
```

```ts
// With a single character
const singleChar = capitalize("a");
console.log(singleChar); // "A"
```
