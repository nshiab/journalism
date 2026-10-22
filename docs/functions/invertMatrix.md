[**Journalism v4.0.2**](../index.md)

***

[Journalism](../globals.md) / invertMatrix

# Function: invertMatrix()

> **invertMatrix**(`matrix`): `number`[][]

Defined in: [journalism-statistics/src/statistics/invertMatrix.ts:47](https://github.com/nshiab/journalism-statistics/blob/v1.5.9/src/statistics/invertMatrix.ts#L47)

Computes the inverse of a square matrix.

The function takes a square matrix as input and returns its inverse. It handles both 2x2 and larger square matrices. If the matrix is singular (i.e., its determinant is zero), it cannot be inverted, and the function will throw an error.

## Parameters

### matrix

`number`[][]

The square matrix to be inverted. It must be a 2D array where the number of rows equals the number of columns.

## Returns

`number`[][]

A new 2D array representing the inverse of the input matrix.

## Throws

If the input matrix is not square (e.g., `matrix.length !== matrix[0].length`), or if it is singular (non-invertible), an error will be thrown.

## Examples

```ts
// Invert a simple 2x2 matrix.
const matrix2x2 = [
  [4, 7],
  [2, 6]
];
const inverted2x2 = invertMatrix(matrix2x2);
console.log(inverted2x2);
```

```ts
// Invert a 3x3 matrix.
const matrix3x3 = [
  [1, 2, 3],
  [0, 1, 4],
  [5, 6, 0]
];
const inverted3x3 = invertMatrix(matrix3x3);
console.log(inverted3x3);
```

```ts
// Attempting to invert a singular matrix will throw an error.
const singularMatrix = [
  [1, 2],
  [2, 4]
];
try {
  invertMatrix(singularMatrix);
} catch (error) {
  console.error("Error:", error.message);
  // Expected output: "Error: Matrix is singular and cannot be inverted"
}
```
