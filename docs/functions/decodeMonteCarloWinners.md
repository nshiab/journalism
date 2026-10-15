[**Journalism v4.0.0**](../index.md)

***

[Journalism](../globals.md) / decodeMonteCarloWinners

# Function: decodeMonteCarloWinners()

> **decodeMonteCarloWinners**(`w`): `object`[]

Decodes `category` bytes into category names
(0 = "renter", 1 = "buyerFixed", 2 = "buyerVariable").
Records are returned in iteration order (row 0 = iteration 0).

## Parameters

### w

#### amount

`Float64Array`

Final `amount` of the winning scenario for each iteration.

#### category

`Uint8Array`

Winning scenario category encoded as a byte.
Use `decodeMonteCarloWinners` to decode the category names.

#### monthIndex

`Float64Array`

Final `monthIndex` of the winning scenario for each iteration.

## Returns

`object`[]
