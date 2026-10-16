[**Journalism v4.0.1**](../index.md)

***

[Journalism](../globals.md) / getRentVsBuyCholeskyMatrix

# Function: getRentVsBuyCholeskyMatrix()

> **getRentVsBuyCholeskyMatrix**(`data?`, `options?`): `number`[][]

Generates a Cholesky decomposition matrix from historical variable data,
formatted specifically for the `simulateRentVsBuyMonteCarlo` function.

This helper calculates the covariance matrix of the provided data arrays,
normalizes it into a correlation matrix, and computes the Cholesky decomposition,
mapping variables internally to the correct 16x16 matrix indices.

If no data object is provided, it returns the Cholesky decomposition of an
identity matrix (which results in independent, uncorrelated paths).

## Parameters

### data?

An object containing arrays of equal-length historical values for all 16 variables.

#### appreciation

`number`[]

#### condoFee

`number`[]

#### employmentIncome

`number`[]

#### fiveYearInterestRates

`number`[]

#### fourYearInterestRates

`number`[]

#### maintenance

`number`[]

#### market

`number`[]

#### oneYearInterestRates

`number`[]

#### ownerInsurance

`number`[]

#### propertyTax

`number`[]

#### rent

`number`[]

#### renterInsurance

`number`[]

#### sellingFixedFees

`number`[]

#### threeYearInterestRates

`number`[]

#### twoYearInterestRates

`number`[]

#### variableInterestRates

`number`[]

### options?

Optional configuration.

#### jitter?

`number`

A tiny positive value (e.g., 1e-9) added to the diagonal of the correlation matrix to force positive-definiteness. This can be useful if the decomposition fails due to numerical precision issues.

## Returns

`number`[][]

## Example

```ts
// Using an identity matrix (no correlation)
const choleskyMatrixId = getRentVsBuyCholeskyMatrix();

// Using historical data to capture true economic correlations
const choleskyMatrixCorrelated = getRentVsBuyCholeskyMatrix({
  employmentIncome: [75000, 76000, 78000, ...],
  market: [0.05, 0.07, -0.02, ...],
  rent: [1500, 1550, 1600, ...],
  // ... and the remaining 13 variables
});

// Using jitter to handle numerical precision issues
const choleskyMatrixWithJitter = getRentVsBuyCholeskyMatrix(historicalData, { jitter: 1e-9 });

const results = simulateRentVsBuyMonteCarlo({
  // ... other parameters
  choleskyMatrix: choleskyMatrixCorrelated,
});
```
