[**Journalism v4.0.0**](../index.md)

***

[Journalism](../globals.md) / decodeMonteCarloValues

# Function: decodeMonteCarloValues()

> **decodeMonteCarloValues**(`c`): `object`[]

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
