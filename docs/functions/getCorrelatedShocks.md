[**Journalism v4.0.3**](../index.md)

***

[Journalism](../globals.md) / getCorrelatedShocks

# Function: getCorrelatedShocks()

> **getCorrelatedShocks**(`L`, `Z`): `number`[]

Defined in: [journalism-statistics/src/statistics/getCorrelatedShocks.ts:9](https://github.com/nshiab/journalism-statistics/blob/v1.5.9/src/statistics/getCorrelatedShocks.ts#L9)

Multiplies a lower triangular Cholesky matrix (L) by a vector of independent standard normal random variables (Z).

## Parameters

### L

`number`[][]

The lower triangular matrix.

### Z

`number`[]

An array of independent standard normal random variables.

## Returns

`number`[]

An array of correlated random variables.
