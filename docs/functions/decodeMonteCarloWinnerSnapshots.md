[**Journalism v4.0.0**](../index.md)

***

[Journalism](../globals.md) / decodeMonteCarloWinnerSnapshots

# Function: decodeMonteCarloWinnerSnapshots()

> **decodeMonteCarloWinnerSnapshots**(`ws`): `object`[]

Decodes a `winnerSnapshots` result into a flat record array.

Each record represents one 5-year checkpoint (strictly before `numberOfYears`).
`renter`, `buyerFixed`, and `buyerVariable` are win rates strictly in the range [0.01, 0.98] (smoothed to [0.01, 0.01, 0.98] in extreme scenarios) and sum to 1.
The median fields hold the median `winVariable` amount for that category at the checkpoint.

## Parameters

### ws

#### buyerFixed

`Float64Array`

Fraction of iterations (strictly in the range [0.01, 0.98]) where the buyerFixed scenario
had the highest `winVariable` at this checkpoint. Win rates are clipped/smoothed to reflect
unmodeled tail risks and prevent deterministic misinterpretation (e.g., [1.0, 0.0, 0.0] becomes [0.98, 0.01, 0.01]).

#### buyerFixedMedian

`Float64Array`

#### buyerVariable

`Float64Array`

Fraction of iterations (strictly in the range [0.01, 0.98]) where the buyerVariable scenario
had the highest `winVariable` at this checkpoint. Win rates are clipped/smoothed to reflect
unmodeled tail risks and prevent deterministic misinterpretation (e.g., [1.0, 0.0, 0.0] becomes [0.98, 0.01, 0.01]).

#### buyerVariableMedian

`Float64Array`

#### renter

`Float64Array`

Fraction of iterations (strictly in the range [0.01, 0.98]) where the renter scenario
had the highest `winVariable` at this checkpoint. Win rates are clipped/smoothed to reflect
unmodeled tail risks and prevent deterministic misinterpretation (e.g., [1.0, 0.0, 0.0] becomes [0.98, 0.01, 0.01]).

#### renterMedian

`Float64Array`

Median `winVariable` amount for each category at each snapshot.

#### snapshotMonths

`number`[]

Month indices of each snapshot (e.g. `[59, 119, 179, 239, 299]` for a 25-year sim, i.e. end of years 5, 10, 15, 20, 25).

## Returns

`object`[]
