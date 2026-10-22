[**Journalism v4.0.2**](../index.md)

***

[Journalism](../globals.md) / getCholeskyMatrix

# Function: getCholeskyMatrix()

> **getCholeskyMatrix**(`matrix`, `jitter?`): `number`[][]

Defined in: [journalism-statistics/src/statistics/getCholeskyMatrix.ts:9](https://github.com/nshiab/journalism-statistics/blob/v1.5.9/src/statistics/getCholeskyMatrix.ts#L9)

Performs Cholesky Decomposition on a symmetric, positive-definite covariance matrix.

## Parameters

### matrix

`number`[][]

A square, symmetric, positive-definite covariance matrix.

### jitter?

`number`

A tiny positive value (e.g., 1e-9) added to the diagonal to force positive-definiteness.

## Returns

`number`[][]

A lower triangular matrix L.
