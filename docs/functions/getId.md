[**Journalism v4.0.3**](../index.md)

***

[Journalism](../globals.md) / getId

# Function: getId()

> **getId**(`length?`): `string`

Defined in: [journalism-extras/src/extras/getId.ts:26](https://github.com/nshiab/journalism-extras/blob/v1.0.12/src/extras/getId.ts#L26)

Generates a unique ID string composed of letters and numbers, without spaces or special characters. By default, the ID has a length of 6 characters. While handy for general use, it is not cryptographically secure, meaning it should not be used for security-sensitive applications where true randomness and unpredictability are required.

The function ensures uniqueness by keeping track of previously generated IDs within the current session. If a collision occurs (which is highly unlikely for reasonable lengths), it will attempt to generate a new ID. For very small `length` values, repeated collisions might trigger a warning to suggest increasing the length to maintain uniqueness.

## Parameters

### length?

`number`

The desired length of the generated ID. Defaults to 6.

## Returns

`string`

A unique string ID.

## Examples

```ts
// Generate a default length ID (6 characters).
const id = getId();
console.log(id); // e.g., 'a1B2c3'
```

```ts
// Generate an ID with a specified length (e.g., 10 characters).
const customId = getId(10);
console.log(customId); // e.g., 'a1B2c3D4e5'
```
