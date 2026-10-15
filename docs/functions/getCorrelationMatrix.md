[**Journalism v4.0.0**](../index.md)

***

[Journalism](../globals.md) / getCorrelationMatrix

# Function: getCorrelationMatrix()

> **getCorrelationMatrix**(`data`, `options?`): `number`[][]

Computes the correlation matrix for a given dataset. The correlation matrix is a square matrix that describes the correlation between each pair of variables in a dataset.

The function takes a 2D array (matrix) as input, where each inner array represents a data point and each element within the inner array represents a variable. It calculates the Pearson correlation coefficient between all pairs of variables.

Optionally, you can choose to invert the computed correlation matrix by setting the `invert` option to `true`.

## Parameters

### data

`number`[][]

A 2D array of numbers representing the dataset. Each inner array is a data point, and each element is a variable.

### options?

Optional settings for the correlation matrix computation.

#### invert?

`boolean`

If `true`, the function will return the inverse of the computed correlation matrix. Defaults to `false`.

## Returns

`number`[][]

A 2D array representing the correlation matrix. If `options.invert` is `true`, the inverse correlation matrix is returned.

## Throws

If any element in the input `data` is not a number.

## Examples

```ts
// Basic usage: Compute the correlation matrix for a 2x2 dataset.
const twoVariables = [
  [6.5, 11],
  [7.1, 12.2],
  [6.3, 10.5]
];
const matrix2x2 = getCorrelationMatrix(twoVariables);
console.log(matrix2x2);
// Expected output (approximately):
// [
//   [1, -0.1208],
//   [-0.1208, 1]
// ]
```

```ts
// Compute the inverse correlation matrix for a 2x2 dataset.
const invertedMatrix2x2 = getCorrelationMatrix(twoVariables, { invert: true });
console.log(invertedMatrix2x2);
// Expected output (approximately):
// [
//   [1.0148, 0.1226],
//   [0.1226, 1.0148]
// ]
```
