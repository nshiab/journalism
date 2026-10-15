[**Journalism v4.0.0**](../index.md)

***

[Journalism](../globals.md) / generateCirPath

# Function: generateCirPath()

> **generateCirPath**(`startValue`, `a`, `b`, `sigma`, `years`, `periodsPerYear`): `number`[]

Generates a path of values following the Cox-Ingersoll-Ross (CIR) model.

The CIR model is a mean-reverting stochastic process used to model variables that tend to return to a long-term average over time, such as interest rates or volatility.

**When to use this function:**
- To simulate future interest rate paths for financial modeling.
- To test how a mean-reverting system might evolve over time.
- When you have parameters (`a`, `b`, `sigma`) and wish to generate potential future scenarios.

## Parameters

### startValue

`number`

The initial value of the process (e.g., current interest rate).

### a

`number`

The speed of mean reversion.

### b

`number`

The long-term mean to which the process reverts.

### sigma

`number`

The volatility of the process.

### years

`number`

The number of years to simulate.

### periodsPerYear

`number`

The number of simulation steps per year (e.g., 12 for monthly).

## Returns

`number`[]

An array representing the simulated path of values.

## Throws

If parameters are invalid (e.g. negative values where prohibited or zero simulation length).

## Example

```ts
const rates = [0.02, 0.021, 0.019, 0.022, 0.023];
const periodsPerYear = 12;

// First, estimate parameters from historical data
const { a, b, sigma } = getCirParameters(rates, periodsPerYear);

// Then, generate a future path
const initialRate = rates[rates.length - 1];
const path = generateCirPath(initialRate, a, b, sigma, 1, 12);
```
