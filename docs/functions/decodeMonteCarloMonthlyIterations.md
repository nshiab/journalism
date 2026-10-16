[**Journalism v4.0.1**](../index.md)

***

[Journalism](../globals.md) / decodeMonteCarloMonthlyIterations

# Function: decodeMonteCarloMonthlyIterations()

> **decodeMonteCarloMonthlyIterations**(`c`): `object`[]

Decodes a columnar `monthlyIterations` result back into a flat object array.

**⚠️ Memory Warning:** This function can allocate millions of small objects during large simulations.
Proceed with caution or use pagination/UI virtualization if rendering these arrays to the DOM.

Keys are `"category|group|variable"`. Each `Float64Array` has size `iterations × months`.
Access: `data[key][iteration * cols + monthIndex]`.

Records where `amount === 0` are omitted from the output, matching the zero-filtering
applied by the `onRecord` callback during data collection.

## Parameters

### c

#### cols

`number`

#### data

`Record`\<`string`, `Float64Array`\>

#### keys

`string`[]

#### rows

`number`

## Returns

`object`[]
