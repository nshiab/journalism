[**Journalism v4.0.2**](../index.md)

***

[Journalism](../globals.md) / normalizeString

# Function: normalizeString()

> **normalizeString**(`string`, `options?`): `string`

Normalizes a string by converting it to lowercase, stripping accents, punctuation (optional), and trimming whitespace.

## Parameters

### string

`string`

The string to be normalized.

### options?

An optional object with options.

#### stripPunctuation?

`boolean`

If true, punctuation and underscores will be stripped. Defaults to true.

## Returns

`string`

A new string with characters in lowercase, without accents, without punctuation (if specified), with single spaces between words, and without leading or trailing whitespace.

## Examples

```ts
// Basic usage (strips punctuation by default)
const normalized = normalizeString("Évènement!  de  test");
console.log(normalized); // "evenement de test"
```

```ts
// Keeping punctuation
const normalized = normalizeString("Évènement!", { stripPunctuation: false });
console.log(normalized); // "evenement!"
```

```ts
// With accents, punctuation, and uppercase
const normalized = normalizeString("¡Niño!");
console.log(normalized); // "nino"
```

```ts
// Handling multiple types of whitespace and symbols
const normalized = normalizeString("Hello,  World!\t100%");
console.log(normalized); // "hello world 100"
```

```ts
// Stripping hyphens and underscores
const normalized = normalizeString("multi-word_example");
console.log(normalized); // "multiwordexample"
```

```ts
// Handling emails (strips @ and .)
const normalized = normalizeString("email@example.com");
console.log(normalized); // "emailexamplecom"
```
