[**Journalism v3.1.2**](../index.md)

***

[Journalism](../globals.md) / decodeMonteCarloWinners

# Function: decodeMonteCarloWinners()

> **decodeMonteCarloWinners**(`w`): `object`[]

`category` bytes map to category names via `WINNER_CATEGORIES`
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
Decode with `WINNER_CATEGORIES[category[i]]` or use `decodeMonteCarloWinners`.

#### monthIndex

`Float64Array`

Final `monthIndex` of the winning scenario for each iteration.

## Returns

`object`[]
