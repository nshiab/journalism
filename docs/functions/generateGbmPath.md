[**Journalism v4.0.2**](../index.md)

***

[Journalism](../globals.md) / generateGbmPath

# Function: generateGbmPath()

> **generateGbmPath**(`startValue`, `mu`, `sigma`, `years`, `periodsPerYear`): `number`[]

Defined in: [journalism-statistics/src/statistics/generateGbmPath.ts:38](https://github.com/nshiab/journalism-statistics/blob/v1.5.9/src/statistics/generateGbmPath.ts#L38)

Generates a simulated path for an asset using the Geometric Brownian Motion (GBM) model.

Geometric Brownian Motion is a continuous-time stochastic process in which the logarithm of the randomly varying quantity follows a Brownian motion with drift. It is widely used in mathematical finance to model stock prices, as it ensures that values remain positive and accounts for compounded returns.

**When to use this function:**
- To simulate future value paths for a stock, index, or other financial asset
- For risk management and stress testing by generating multiple potential scenarios
- To visualize the impact of volatility and drift on an investment over time

**Note:** You can use `getGbmParameters` to estimate the `mu` and `sigma` parameters from historical data before generating a path.

## Parameters

### startValue

`number`

The initial value of the asset at the beginning of the simulation

### mu

`number`

The expected annualized drift (average growth rate) of the asset

### sigma

`number`

The annualized volatility (degree of variation) of the asset

### years

`number`

The total duration of the simulation in years

### periodsPerYear

`number`

The number of simulation steps per year (e.g., 252 for daily trading days, 12 for monthly data, 52 for weekly)

## Returns

`number`[]

An array of numerical values representing the simulated path, including the `startValue`

## Example

```ts
import getGbmParameters from "./getGbmParameters";

const historicalValues = [100, 102, 101, 105, 107, 110];
const periodsPerYear = 252; // Daily data

// Estimate parameters from historical data
const { mu, sigma } = getGbmParameters(historicalValues, periodsPerYear);

// Generate a simulated path for the next year
const startValue = historicalValues[historicalValues.length - 1];
const path = generateGbmPath(startValue, mu, sigma, 1, periodsPerYear);
console.log(`Simulated path: ${path.map(v => v.toFixed(2)).join(', ')}`);
```
