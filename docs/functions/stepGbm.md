[**Journalism v4.0.3**](../index.md)

***

[Journalism](../globals.md) / stepGbm

# Function: stepGbm()

> **stepGbm**(`currentValue`, `mu`, `sigma`, `dt`, `shock`): `number`

Defined in: [journalism-statistics/src/statistics/stepGbm.ts:12](https://github.com/nshiab/journalism-statistics/blob/v1.5.9/src/statistics/stepGbm.ts#L12)

Calculates the next value in a Geometric Brownian Motion (GBM) process.

## Parameters

### currentValue

`number`

The current value of the process.

### mu

`number`

The drift coefficient.

### sigma

`number`

The volatility coefficient.

### dt

`number`

The time step.

### shock

`number`

A standard normal random variable (Z).

## Returns

`number`

The next value in the process.
