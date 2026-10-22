[**Journalism v4.0.2**](../index.md)

***

[Journalism](../globals.md) / stepCir

# Function: stepCir()

> **stepCir**(`currentValue`, `a`, `b`, `sigma`, `dt`, `shock`): `number`

Defined in: [journalism-statistics/src/statistics/stepCir.ts:13](https://github.com/nshiab/journalism-statistics/blob/v1.5.9/src/statistics/stepCir.ts#L13)

Calculates the next value in a Cox-Ingersoll-Ross (CIR) process.

## Parameters

### currentValue

`number`

The current value of the process.

### a

`number`

The speed of mean reversion.

### b

`number`

The long-term mean level.

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
