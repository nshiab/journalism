[**Journalism v4.0.1**](../index.md)

***

[Journalism](../globals.md) / getMortgagePenalty

# Function: getMortgagePenalty()

> **getMortgagePenalty**(`parameters`): `number`

Calculates the mortgage prepayment penalty.

For variable mortgages, the penalty is typically three months of interest.
For fixed mortgages, the penalty is usually the greater of three months of interest or the Interest Rate Differential (IRD).

## Parameters

### parameters

The mortgage details.

#### currentPostedRates

`Record`\<`number`, `number`\>

A record mapping term lengths (in years) to current posted interest rates.

#### mortgageBalance

`number`

The current outstanding mortgage balance.

#### mortgageType

`"fixed"` \| `"variable"`

Either "fixed" or "variable".

#### postedInterestRate

`number`

The original posted interest rate when the mortgage was signed.

#### rateAdjustmentFixed

`number`

The adjustment applied to the fixed posted interest rate (added to the posted rate).

#### rateAdjustmentVariable

`number`

The adjustment applied to the variable posted interest rate (added to the posted rate).

#### remainingMonthsToTerm

`number`

Number of months left in the current mortgage term.

## Returns

`number`

The calculated mortgage penalty rounded to 2 decimal places.

## Throws

Error if no current posted rate is found for the remaining term length.

## Examples

```ts
const penalty = getMortgagePenalty({
  remainingMonthsToTerm: 24,
  mortgageBalance: 300000,
  postedInterestRate: 0.05,
  rateAdjustmentFixed: -0.0125,
  rateAdjustmentVariable: 0,
  currentPostedRates: { 1: 0.045, 2: 0.0475, 3: 0.05, 4: 0.0525, 5: 0.055 },
  mortgageType: "fixed",
});
```

```ts
const penalty = getMortgagePenalty({
  remainingMonthsToTerm: 36,
  mortgageBalance: 250000,
  postedInterestRate: 0.06,
  rateAdjustmentFixed: 0,
  rateAdjustmentVariable: 0.0025,
  currentPostedRates: {}, // Not used for variable
  mortgageType: "variable",
});
```
