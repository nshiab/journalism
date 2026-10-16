[**Journalism v4.0.1**](../index.md)

***

[Journalism](../globals.md) / decodeMonteCarloMonthlyQuantiles

# Function: decodeMonteCarloMonthlyQuantiles()

> **decodeMonteCarloMonthlyQuantiles**(`c`, `quantiles`): `object`[]

Decodes a columnar `monthlyQuantiles` result back into a flat record array.

Keys are `"category|group|variable"`. Layout: `data[key][qIdx * cols + monthIndex]`
where `rows` = number of quantile levels and `cols` = number of months.

## Parameters

### c

The `ColumnarResult` returned as `monthlyQuantiles` by `simulateRentVsBuyMonteCarlo`.

#### cols

`number`

#### data

`Record`\<`string`, `Float64Array`\>

#### keys

`string`[]

#### rows

`number`

### quantiles

`number`[]

The same quantile levels passed to `options.monthlyQuantiles` (e.g. `[0, 0.5, 1]`).

## Returns

`object`[]
