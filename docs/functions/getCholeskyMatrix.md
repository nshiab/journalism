[**Journalism v4.0.0**](../index.md)

***

[Journalism](../globals.md) / getCholeskyMatrix

# Function: getCholeskyMatrix()

> **getCholeskyMatrix**(`matrix`, `jitter?`): `number`[][]

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
