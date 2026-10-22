[**Journalism v4.0.2**](../index.md)

***

[Journalism](../globals.md) / decodeMonteCarloValues

# Function: decodeMonteCarloValues()

> **decodeMonteCarloValues**(`c`): `object`[]

Defined in: [journalism-finance/src/finance/decodeMonteCarloResults.ts:72](https://github.com/nshiab/journalism-finance/blob/v2.0.3/src/finance/decodeMonteCarloResults.ts#L72)

Decodes a columnar `values` result back into the original object-array shape.

Keys are variable names. Each `Float64Array` has size `iterations × months`.

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
