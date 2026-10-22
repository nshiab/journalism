[**Journalism v4.0.3**](../index.md)

***

[Journalism](../globals.md) / simulateRentVsBuyMonteCarlo

# Function: simulateRentVsBuyMonteCarlo()

> **simulateRentVsBuyMonteCarlo**(`parameters`, `options?`): `object`

Defined in: [journalism-finance/src/finance/simulateRentVsBuyMonteCarlo.ts:421](https://github.com/nshiab/journalism-finance/blob/v2.0.3/src/finance/simulateRentVsBuyMonteCarlo.ts#L421)

Performs a Monte Carlo simulation for a rent versus buy analysis tailored for a Canadian context.
This function runs multiple iterations of the `simulateRentVsBuy` function, using stochastic paths
for various economic factors like market returns, interest rates, and inflation-related costs.
It helps evaluate the probability of different financial outcomes under uncertainty.

The simulation uses:
- **Geometric Brownian Motion (GBM)** for paths like market returns, rent increases, and home appreciation.
- **Cox-Ingersoll-Ross (CIR)** models for interest rate paths.

Parameters for these models can be generated from historical data using `getCirParameters` and `getGbmParameters` from `@nshiab/journalism`.

## Parameters

### parameters

The input parameters for the Monte Carlo simulation.

#### annualInvestmentFeeRate

`number`

Annual investment fee rate (e.g. ETF MER or platform/advisor fee) expressed as a decimal (e.g. `0.0025` for 0.25%). Applied monthly to TFSA and stock portfolio balances using a multiplicative model — the fee is charged on the grown balance. The monthly dollar cost is also tracked as `tfsaFees` and `stocksFees` under `monthlyExpenses` and `cumulativeExpenses` in the output.

#### buyer

\{ `downPayment`: `number`; `firstTimeOwner`: `boolean`; `fixedRateAdjustment`: `number`; `floorRate`: `number`; `investsSavings`: `boolean`; `purchaseFixedFees`: `number`; `sellingCommissionRate`: `number`; `variableRateAdjustment`: `number`; \}

Configuration for the buyer scenarios.

#### buyer.downPayment

`number`

The total down payment amount paid at the start. Must meet the minimum required down payment in Canada based on the initial property appreciation value.

#### buyer.firstTimeOwner

`boolean`

Whether the buyer is a first-time owner, used to calculate land transfer tax rebates.

#### buyer.fixedRateAdjustment

`number`

The adjustment applied to the posted fixed mortgage rate (added to the posted rate).

#### buyer.floorRate

`number`

The minimum interest rate (posted + adjustment) for mortgages.

#### buyer.investsSavings

`boolean`

Whether the buyer invests any monthly savings (difference between their expenses and the renter's/max expenses) into the stock market. If `false`, these savings are discarded.

#### buyer.purchaseFixedFees

`number`

One-time costs at purchase (notary, etc.). Do not include land transfer tax here, as it is calculated automatically based on the city.

#### buyer.sellingCommissionRate

`number`

The commission rate paid to real estate agents upon sale (e.g., `0.05` for 5%).

#### buyer.variableRateAdjustment

`number`

The adjustment applied to the variable mortgage rate (added to the posted rate).

#### choleskyMatrix

`number`[][]

Mandatory Cholesky decomposition matrix for the 16 stochastic variables.
You must pre-compute this using `getRentVsBuyCholeskyMatrix` and pass it
into the simulation.

#### city

`"Quebec"` \| `"Toronto"` \| `"Montreal"` \| `"Calgary"` \| `"Ottawa"` \| `"Edmonton"` \| `"Winnipeg"` \| `"Vancouver"` \| `"Hamilton"` \| `"Halifax"` \| `"London"` \| `"Saskatoon"` \| `"Kitchener-Waterloo"` \| `"Regina"` \| `"Victoria"` \| `"Barrie"` \| `"Guelph"` \| `"Kingston"` \| `"Fredericton"` \| `"Moncton"` \| `"Saint John (NB)"` \| `"Saint John's (NL)"`

The city where the home is located, used to calculate land transfer tax and derive the province for sales and income taxes.

#### couple

`boolean`

Whether to simulate investments and taxes for a couple doubling TFSA contribution room and splitting capital gains in 2. Assumes the stochastic employmentIncome parameter represents the per-partner income.

#### iterations

`number`

The number of simulation iterations to run.

#### numberOfYears

`number`

The duration of each simulation in years.

#### renter

\{ `securityDeposit`: `number`; \}

Configuration for the renter scenario.

#### renter.securityDeposit

`number`

The initial security deposit or last month's rent (scenario-dependent).

#### startingYear

`number`

The year the simulation begins.

#### stochasticParameters

\{ `appreciation`: \{ `initialValue`: `number`; `mu`: `number`; `sigma`: `number`; \}; `condoFee`: \{ `initialValue`: `number`; `mu`: `number`; `sigma`: `number`; \}; `employmentIncome`: \{ `initialValue`: `number`; `mu`: `number`; `sigma`: `number`; \}; `fiveYearInterestRates`: \{ `a`: `number`; `b`: `number`; `initialValue`: `number`; `sigma`: `number`; \}; `fourYearInterestRates`: \{ `a`: `number`; `b`: `number`; `initialValue`: `number`; `sigma`: `number`; \}; `maintenance`: \{ `initialValue`: `number`; `mu`: `number`; `sigma`: `number`; \}; `market`: \{ `initialValue`: `number`; `mu`: `number`; `sigma`: `number`; \}; `oneYearInterestRates`: \{ `a`: `number`; `b`: `number`; `initialValue`: `number`; `sigma`: `number`; \}; `ownerInsurance`: \{ `initialValue`: `number`; `mu`: `number`; `sigma`: `number`; \}; `propertyTax`: \{ `initialValue`: `number`; `mu`: `number`; `sigma`: `number`; \}; `rent`: \{ `initialValue`: `number`; `mu`: `number`; `sigma`: `number`; \}; `renterInsurance`: \{ `initialValue`: `number`; `mu`: `number`; `sigma`: `number`; \}; `sellingFixedFees`: \{ `initialValue`: `number`; `mu`: `number`; `sigma`: `number`; \}; `threeYearInterestRates`: \{ `a`: `number`; `b`: `number`; `initialValue`: `number`; `sigma`: `number`; \}; `twoYearInterestRates`: \{ `a`: `number`; `b`: `number`; `initialValue`: `number`; `sigma`: `number`; \}; `variableInterestRates`: \{ `a`: `number`; `b`: `number`; `initialValue`: `number`; `sigma`: `number`; \}; \}

Parameters for the stochastic models.
  For all parameters (market return rate, dollar amounts, interest rates), use:
  - `initialValue`: The starting value (e.g., `0.07` for 7% market return, `1500` for $1,500 monthly rent, or `0.05` for a 5% interest rate).

  For **Geometric Brownian Motion (GBM)** models (income, market, rent, expenses, appreciation):
  - `mu`: The drift or expected annual growth rate.
  - `sigma`: The annual volatility.

  For **Cox-Ingersoll-Ross (CIR)** models (interest rates):
  - `a`: Speed of mean reversion.
  - `b`: Long-term mean.
  - `sigma`: Annual volatility.

#### stochasticParameters.appreciation

\{ `initialValue`: `number`; `mu`: `number`; `sigma`: `number`; \}

Home value appreciation rates (GBM).

#### stochasticParameters.appreciation.initialValue

`number`

#### stochasticParameters.appreciation.mu

`number`

#### stochasticParameters.appreciation.sigma

`number`

#### stochasticParameters.condoFee

\{ `initialValue`: `number`; `mu`: `number`; `sigma`: `number`; \}

Condo fee increase rates (GBM).

#### stochasticParameters.condoFee.initialValue

`number`

#### stochasticParameters.condoFee.mu

`number`

#### stochasticParameters.condoFee.sigma

`number`

#### stochasticParameters.employmentIncome

\{ `initialValue`: `number`; `mu`: `number`; `sigma`: `number`; \}

Employment income trajectory (GBM).

#### stochasticParameters.employmentIncome.initialValue

`number`

#### stochasticParameters.employmentIncome.mu

`number`

#### stochasticParameters.employmentIncome.sigma

`number`

#### stochasticParameters.fiveYearInterestRates

\{ `a`: `number`; `b`: `number`; `initialValue`: `number`; `sigma`: `number`; \}

5-year fixed interest rates (CIR).

#### stochasticParameters.fiveYearInterestRates.a

`number`

#### stochasticParameters.fiveYearInterestRates.b

`number`

#### stochasticParameters.fiveYearInterestRates.initialValue

`number`

#### stochasticParameters.fiveYearInterestRates.sigma

`number`

#### stochasticParameters.fourYearInterestRates

\{ `a`: `number`; `b`: `number`; `initialValue`: `number`; `sigma`: `number`; \}

4-year fixed interest rates (CIR).

#### stochasticParameters.fourYearInterestRates.a

`number`

#### stochasticParameters.fourYearInterestRates.b

`number`

#### stochasticParameters.fourYearInterestRates.initialValue

`number`

#### stochasticParameters.fourYearInterestRates.sigma

`number`

#### stochasticParameters.maintenance

\{ `initialValue`: `number`; `mu`: `number`; `sigma`: `number`; \}

Maintenance cost increase rates (GBM).

#### stochasticParameters.maintenance.initialValue

`number`

#### stochasticParameters.maintenance.mu

`number`

#### stochasticParameters.maintenance.sigma

`number`

#### stochasticParameters.market

\{ `initialValue`: `number`; `mu`: `number`; `sigma`: `number`; \}

Market return rates for savings (GBM).

#### stochasticParameters.market.initialValue

`number`

#### stochasticParameters.market.mu

`number`

#### stochasticParameters.market.sigma

`number`

#### stochasticParameters.oneYearInterestRates

\{ `a`: `number`; `b`: `number`; `initialValue`: `number`; `sigma`: `number`; \}

1-year fixed interest rates (CIR).

#### stochasticParameters.oneYearInterestRates.a

`number`

#### stochasticParameters.oneYearInterestRates.b

`number`

#### stochasticParameters.oneYearInterestRates.initialValue

`number`

#### stochasticParameters.oneYearInterestRates.sigma

`number`

#### stochasticParameters.ownerInsurance

\{ `initialValue`: `number`; `mu`: `number`; `sigma`: `number`; \}

Homeowner's insurance increase rates (GBM).

#### stochasticParameters.ownerInsurance.initialValue

`number`

#### stochasticParameters.ownerInsurance.mu

`number`

#### stochasticParameters.ownerInsurance.sigma

`number`

#### stochasticParameters.propertyTax

\{ `initialValue`: `number`; `mu`: `number`; `sigma`: `number`; \}

Property tax increase rates (GBM).

#### stochasticParameters.propertyTax.initialValue

`number`

#### stochasticParameters.propertyTax.mu

`number`

#### stochasticParameters.propertyTax.sigma

`number`

#### stochasticParameters.rent

\{ `initialValue`: `number`; `mu`: `number`; `sigma`: `number`; \}

Rent increase rates (GBM).

#### stochasticParameters.rent.initialValue

`number`

#### stochasticParameters.rent.mu

`number`

#### stochasticParameters.rent.sigma

`number`

#### stochasticParameters.renterInsurance

\{ `initialValue`: `number`; `mu`: `number`; `sigma`: `number`; \}

Renter's insurance increase rates (GBM).

#### stochasticParameters.renterInsurance.initialValue

`number`

#### stochasticParameters.renterInsurance.mu

`number`

#### stochasticParameters.renterInsurance.sigma

`number`

#### stochasticParameters.sellingFixedFees

\{ `initialValue`: `number`; `mu`: `number`; `sigma`: `number`; \}

Selling fixed fees increase rates (GBM).

#### stochasticParameters.sellingFixedFees.initialValue

`number`

#### stochasticParameters.sellingFixedFees.mu

`number`

#### stochasticParameters.sellingFixedFees.sigma

`number`

#### stochasticParameters.threeYearInterestRates

\{ `a`: `number`; `b`: `number`; `initialValue`: `number`; `sigma`: `number`; \}

3-year fixed interest rates (CIR).

#### stochasticParameters.threeYearInterestRates.a

`number`

#### stochasticParameters.threeYearInterestRates.b

`number`

#### stochasticParameters.threeYearInterestRates.initialValue

`number`

#### stochasticParameters.threeYearInterestRates.sigma

`number`

#### stochasticParameters.twoYearInterestRates

\{ `a`: `number`; `b`: `number`; `initialValue`: `number`; `sigma`: `number`; \}

2-year fixed interest rates (CIR).

#### stochasticParameters.twoYearInterestRates.a

`number`

#### stochasticParameters.twoYearInterestRates.b

`number`

#### stochasticParameters.twoYearInterestRates.initialValue

`number`

#### stochasticParameters.twoYearInterestRates.sigma

`number`

#### stochasticParameters.variableInterestRates

\{ `a`: `number`; `b`: `number`; `initialValue`: `number`; `sigma`: `number`; \}

Variable interest rates (CIR).

#### stochasticParameters.variableInterestRates.a

`number`

#### stochasticParameters.variableInterestRates.b

`number`

#### stochasticParameters.variableInterestRates.initialValue

`number`

#### stochasticParameters.variableInterestRates.sigma

`number`

#### tfsaContributions

`boolean`

Whether to prioritize TFSA contributions for investments (tax-free gains).

#### winVariable

`"assets"` \| `"balance"` \| `"balanceAfterSelling"`

The variable used to determine the winner of each iteration. Use `"balanceAfterSelling"` for the net balance after simulated sale of all assets, `"balance"` for the cumulative balance before any sale simulation, or `"assets"` for the total raw asset value (TFSA + stocks + home equity + security deposit).

### options?

Additional simulation options.

#### adjustToInflation?

`"marketReturnRate"` \| `"rentIncrease"` \| `"ownerInsuranceIncrease"` \| `"renterInsuranceIncrease"` \| `"maintenanceIncrease"` \| `"propertyTaxIncrease"` \| `"condoFeeIncrease"` \| `"appreciationIncrease"` \| `"sellingFixedFeesIncrease"`

The rate parameter used as a proxy for inflation to express future dollar values in today's constant dollars. When set (e.g. to `"sellingFixedFeesIncrease"`), point-in-time metrics (like `monthlyExpenses`, `assets`, and `balance`) are discounted by the current month's simulated inflation factor. Cumulative totals (like `cumulativeExpenses` and `cumulativeGains`) accumulate real values incrementally — meaning each nominal monthly contribution is discounted before being added to the running sum. One-time upfront costs paid at month 0 (`downPayment`, `purchaseFixedFees`, `landTransferTax`, `insurancePremium`, `securityDeposit`) are **not** discounted because their real value already equals their nominal value. Defaults to `undefined` (no adjustment).

#### details?

\{ `filterGroups?`: (`"assets"` \| `"monthlyExpenses"` \| `"cumulativeExpenses"` \| `"monthlyGains"` \| `"cumulativeGains"` \| `"summary"` \| `"summaryCumulative"` \| `"saleCosts"` \| `"saleNetGains"` \| `"monthlyRecurringExpenses"` \| `"monthlyNonRecurringExpenses"` \| `"totals"`)[]; `filterVariables?`: (`"assets"` \| `"rent"` \| `"maintenance"` \| `"propertyTax"` \| `"balance"` \| `"balanceAfterSelling"` \| `"monthlyExpenses"` \| `"cumulativeExpenses"` \| `"insurance"` \| `"securityDeposit"` \| `"mortgageCapital"` \| `"mortgageInterests"` \| `"condoFees"` \| `"downPayment"` \| `"purchaseFixedFees"` \| `"landTransferTax"` \| `"insurancePremiumTax"` \| `"tfsaFees"` \| `"stocksFees"` \| `"monthlyGains"` \| `"cumulativeGains"` \| `"saleCosts"` \| `"saleNetGains"` \| `"monthlyRecurringExpenses"` \| `"monthlyNonRecurringExpenses"` \| `"tfsaGains"` \| `"tfsaContribution"` \| `"stocksGains"` \| `"newStocks"` \| `"homeEquityGains"` \| `"tfsa"` \| `"stocks"` \| `"homeEquity"` \| `"stockTaxes"` \| `"homeSellingCommission"` \| `"homeSellingFixedFees"` \| `"mortgagePenalty"` \| `"mortgageBalance"` \| `"stockSellingGains"` \| `"tfsaSellingGains"` \| `"homeSellingGains"`)[]; `firstMonth?`: `boolean`; `iterations?`: `boolean`; `quantiles?`: `number`[]; \}

When provided, enables detailed monthly data collection for all iterations.
- `iterations`: if `true`, captures raw per-iteration monthly records returned in `details.monthlyIterations`. Requires `filterGroups` to be set and non-empty — throws otherwise. Decode with `decodeMonteCarloMonthlyIterations`.
- `quantiles`: pre-computes the specified quantile levels (e.g. `[0, 0.5, 1]` for min/median/max) across all iterations for every variable/group/category/month, returned in `details.monthlyQuantiles`. Layout: `data[key][qIdx * cols + monthIndex]`. Decode with `decodeMonteCarloMonthlyQuantiles`.
- `firstMonth`: if `true`, captures data for all available groups and variables for the first month (monthIndex 0) during the first iteration. Returned as an array of objects in `details.firstMonth`. This capture is independent of `filterGroups` and `filterVariables`.
- `filterGroups`: required when `iterations: true`; restricts which groups are collected (e.g. `["assets", "summaryCumulative"]`), reducing memory usage. Also filters the shared column-major buffer used by `details.quantiles`.
- `filterVariables`: optional finer-grained filter; restricts which individual variables are stored within the allowed groups (e.g. `["balance", "homeEquity"]`), further reducing memory usage. Also filters the shared column-major buffer used by `details.quantiles`. An empty array is treated as no filter.
Both `iterations` and `quantiles` share the same internal column-major buffer, so enabling both together is more memory-efficient than the sum of their individual costs.

#### details.filterGroups?

(`"assets"` \| `"monthlyExpenses"` \| `"cumulativeExpenses"` \| `"monthlyGains"` \| `"cumulativeGains"` \| `"summary"` \| `"summaryCumulative"` \| `"saleCosts"` \| `"saleNetGains"` \| `"monthlyRecurringExpenses"` \| `"monthlyNonRecurringExpenses"` \| `"totals"`)[]

Required when `details.iterations` is `true`. Restricts which groups are included in the `monthlyIterations` output (e.g. `["assets", "summaryCumulative"]`), reducing memory usage. Also filters the shared column-major buffer used by `details.quantiles`.

  Available groups:
  - `monthlyExpenses`: Monthly cash outlays (rent, mortgage, taxes, fees, etc.).
  - `cumulativeExpenses`: Total cash outlays from start to current month.
  - `monthlyRecurringExpenses`: Recurring monthly costs (same as monthlyExpenses but excluding one-time items).
  - `monthlyNonRecurringExpenses`: One-time costs (down payment, closing costs).
  - `monthlyGains`: Monthly asset appreciation and contribution (market gains, home equity).
  - `cumulativeGains`: Total accumulated gains from start to current month.
  - `assets`: Current value of assets (stocks, TFSA, home equity, deposit).
  - `summary`: Point-in-time metrics like `balance`.
  - `summaryCumulative`: Final snapshot metrics like `balanceAfterSelling`.
  - `saleCosts`: Costs incurred upon selling (taxes, commission, penalties).
  - `saleNetGains`: Gains realized upon selling.
  - `totals`: Group-level sums of all variables in each of the above groups (e.g., `variable: "monthlyExpenses"` under `group: "totals"`).

#### details.filterVariables?

(`"assets"` \| `"rent"` \| `"maintenance"` \| `"propertyTax"` \| `"balance"` \| `"balanceAfterSelling"` \| `"monthlyExpenses"` \| `"cumulativeExpenses"` \| `"insurance"` \| `"securityDeposit"` \| `"mortgageCapital"` \| `"mortgageInterests"` \| `"condoFees"` \| `"downPayment"` \| `"purchaseFixedFees"` \| `"landTransferTax"` \| `"insurancePremiumTax"` \| `"tfsaFees"` \| `"stocksFees"` \| `"monthlyGains"` \| `"cumulativeGains"` \| `"saleCosts"` \| `"saleNetGains"` \| `"monthlyRecurringExpenses"` \| `"monthlyNonRecurringExpenses"` \| `"tfsaGains"` \| `"tfsaContribution"` \| `"stocksGains"` \| `"newStocks"` \| `"homeEquityGains"` \| `"tfsa"` \| `"stocks"` \| `"homeEquity"` \| `"stockTaxes"` \| `"homeSellingCommission"` \| `"homeSellingFixedFees"` \| `"mortgagePenalty"` \| `"mortgageBalance"` \| `"stockSellingGains"` \| `"tfsaSellingGains"` \| `"homeSellingGains"`)[]

Optional finer-grained filter applied within the allowed groups. Restricts which individual variables are stored in the columnar buffer (e.g. `["balance", "homeEquity"]`), reducing memory usage. Also filters the shared column-major buffer used by `details.quantiles`. An empty array is treated as no filter (all variables are stored).

  Commonly used variables:
  - `rent`, `mortgageCapital`, `mortgageInterests`, `maintenance`, `propertyTax`, `condoFees` (expenses).
  - `tfsa`, `stocks`, `homeEquity` (assets).
  - `balance`, `balanceAfterSelling` (summary).
  - `monthlyRecurringExpenses`, `monthlyExpenses`, `assets` (totals).

#### details.firstMonth?

`boolean`

If `true`, captures data for all available groups and variables for the first month (monthIndex 0) during the first iteration. Returned as an array of objects in `details.firstMonth`. This capture is independent of `filterGroups` and `filterVariables`, making it useful for a complete manifest of initial costs.

#### details.iterations?

`boolean`

If `true`, captures and returns the raw monthly financial data for every variable, group, and category for each individual iteration. Requires `details.filterGroups` to be set and non-empty — throws otherwise. Each record includes `iteration` (0-based index), `category`, `group`, `variable`, `monthIndex`, and `amount`. Useful for custom aggregations or visualization of individual paths. Be aware that this can produce a very large number of records (iterations × months × variables × 3 categories), so use `filterGroups` and `filterVariables` to limit scope.

#### details.quantiles?

`number`[]

When provided, pre-computes the specified quantile levels (e.g. `[0, 0.5, 1]` for min/median/max) across all iterations for every variable/group/category/month combination. Layout: `data[key][qIdx * cols + monthIndex]`. Decode with `decodeMonteCarloMonthlyQuantiles`.

#### values?

`boolean`

If `true`, captures the stochastic path values for all 16 variables (e.g. employment income, market returns, interest rates) across all iterations. Dollar-amount paths (employment income, rent, insurances, maintenance, property tax, condo fees, appreciation, selling fixed fees) are expressed in real (inflation-adjusted) dollars when `options.adjustToInflation` is set, using the same deflation factor as `details`. Rate paths (market returns, all six interest rates) are always nominal. Decode with `decodeMonteCarloValues`. Be cautious with high iteration counts as this can consume significant memory.

#### verbose?

`boolean`

If `true`, logs the current iteration number to the console at the frequency set by `verboseStep`. Also logs the total elapsed time upon completion via `prettyDuration`. Useful for long-running simulations.

#### verboseStep?

`number`

The frequency of progress logging. For example, setting this to `50` will log progress every 50 iterations. Defaults to `1`.

## Returns

An object with all large arrays in columnar format (flat `Float64Array` matrices, transferable via `postMessage`). Use `decodeMonteCarloWinners`, `decodeMonteCarloValues`, `decodeMonteCarloMonthlyIterations`, and `decodeMonteCarloMonthlyQuantiles` from `@nshiab/journalism-finance` to restore object-array shapes.
  - `winners`: A `WinnersColumnar` with `monthIndex`, `amount` (`Float64Array`) and `category` (`Uint8Array`) indicating which scenario won each iteration. Decode with `decodeMonteCarloWinners`.
  - `winnerSnapshots`: A `WinnerSnapshots` containing per-checkpoint win rates and median amounts. Win rates are clipped/smoothed to the range `[0.01, 0.98]` (for a single dominant winner, with other scenarios receiving 1% each, yielding `[0.01, 0.01, 0.98]`) so they never return exactly 0% or 100%, reflecting unmodeled tail risks and preventing deterministic misinterpretation of statistical estimates.
  - `values`: A `ColumnarResult` with stochastic path values per iteration (enabled with `options.values`). Decode with `decodeMonteCarloValues`.
  - `details.monthlyIterations`: A `ColumnarResult` with raw monthly records per iteration (enabled with `options.details.iterations`). Decode with `decodeMonteCarloMonthlyIterations`.
  - `details.monthlyQuantiles`: A `ColumnarResult` with pre-computed quantile summaries (enabled with `options.details.quantiles`). Decode with `decodeMonteCarloMonthlyQuantiles`.

### details

> **details**: `object`

Per-iteration and per-quantile monthly data, populated when `options.details` is provided.
- `monthlyIterations`: raw per-iteration monthly records. Layout: `data[key][iteration * cols + monthIndex]`. Decode with `decodeMonteCarloMonthlyIterations`.
- `monthlyQuantiles`: pre-computed quantile summaries. Layout: `data[key][qIdx * cols + monthIndex]`. Decode with `decodeMonteCarloMonthlyQuantiles`.
- `firstMonth`: simple record of all data for category/group/variable at monthIndex 0, captured during the first iteration (assuming month 0 is deterministic).

#### details.firstMonth?

> `optional` **firstMonth?**: (`object` & \{ `effectiveInterestRate?`: `number`; `fixedRateAdjustment?`: `number`; `group`: `"monthlyExpenses"` \| `"cumulativeExpenses"`; `postedInterestRate?`: `number`; `variable`: `"rent"` \| `"maintenance"` \| `"propertyTax"` \| `"insurance"` \| `"securityDeposit"` \| `"mortgageCapital"` \| `"mortgageInterests"` \| `"condoFees"` \| `"downPayment"` \| `"purchaseFixedFees"` \| `"landTransferTax"` \| `"insurancePremiumTax"` \| `"tfsaFees"` \| `"stocksFees"`; `variableRateAdjustment?`: `number`; \} \| \{ `group`: `"monthlyGains"` \| `"cumulativeGains"`; `homeValue?`: `number`; `variable`: `"tfsaGains"` \| `"tfsaContribution"` \| `"stocksGains"` \| `"newStocks"` \| `"homeEquityGains"`; \} \| \{ `group`: `"assets"`; `variable`: `"securityDeposit"` \| `"tfsa"` \| `"stocks"` \| `"homeEquity"`; \} \| \{ `group`: `"summary"`; `variable`: `"balance"`; \} \| \{ `group`: `"summaryCumulative"`; `variable`: `"balance"` \| `"balanceAfterSelling"`; \} \| \{ `employmentIncome?`: `number`; `group`: `"saleCosts"`; `variable`: `"stockTaxes"` \| `"homeSellingCommission"` \| `"homeSellingFixedFees"` \| `"mortgagePenalty"` \| `"mortgageBalance"`; \} \| \{ `group`: `"saleNetGains"`; `variable`: `"securityDeposit"` \| `"stockSellingGains"` \| `"tfsaSellingGains"` \| `"homeSellingGains"`; \} \| \{ `group`: `"monthlyRecurringExpenses"`; `variable`: `"rent"` \| `"maintenance"` \| `"propertyTax"` \| `"insurance"` \| `"mortgageCapital"` \| `"mortgageInterests"` \| `"condoFees"` \| `"tfsaFees"` \| `"stocksFees"`; \} \| \{ `group`: `"monthlyNonRecurringExpenses"`; `variable`: `"securityDeposit"` \| `"downPayment"` \| `"purchaseFixedFees"` \| `"landTransferTax"` \| `"insurancePremiumTax"`; \} \| \{ `group`: `"totals"`; `variable`: `"assets"` \| `"monthlyExpenses"` \| `"cumulativeExpenses"` \| `"monthlyGains"` \| `"cumulativeGains"` \| `"saleCosts"` \| `"saleNetGains"` \| `"monthlyRecurringExpenses"` \| `"monthlyNonRecurringExpenses"`; \})[]

#### details.monthlyIterations

> **monthlyIterations**: `object`

#### details.monthlyIterations.cols

> **cols**: `number`

#### details.monthlyIterations.data

> **data**: `Record`\<`string`, `Float64Array`\>

#### details.monthlyIterations.keys

> **keys**: `string`[]

#### details.monthlyIterations.rows

> **rows**: `number`

#### details.monthlyQuantiles

> **monthlyQuantiles**: `object`

#### details.monthlyQuantiles.cols

> **cols**: `number`

#### details.monthlyQuantiles.data

> **data**: `Record`\<`string`, `Float64Array`\>

#### details.monthlyQuantiles.keys

> **keys**: `string`[]

#### details.monthlyQuantiles.rows

> **rows**: `number`

### values

> **values**: `object`

#### values.cols

> **cols**: `number`

#### values.data

> **data**: `Record`\<`string`, `Float64Array`\>

#### values.keys

> **keys**: `string`[]

#### values.rows

> **rows**: `number`

### winners

> **winners**: `object`

#### winners.amount

> **amount**: `Float64Array`

Final `amount` of the winning scenario for each iteration.

#### winners.category

> **category**: `Uint8Array`

Winning scenario category encoded as a byte.
Use `decodeMonteCarloWinners` to decode the category names.

#### winners.monthIndex

> **monthIndex**: `Float64Array`

Final `monthIndex` of the winning scenario for each iteration.

### winnerSnapshots

> **winnerSnapshots**: `object`

#### winnerSnapshots.buyerFixed

> **buyerFixed**: `Float64Array`

Fraction of iterations (strictly in the range [0.01, 0.98]) where the buyerFixed scenario
had the highest `winVariable` at this checkpoint. Win rates are clipped/smoothed to reflect
unmodeled tail risks and prevent deterministic misinterpretation (e.g., [1.0, 0.0, 0.0] becomes [0.98, 0.01, 0.01]).

#### winnerSnapshots.buyerFixedMedian

> **buyerFixedMedian**: `Float64Array`

#### winnerSnapshots.buyerVariable

> **buyerVariable**: `Float64Array`

Fraction of iterations (strictly in the range [0.01, 0.98]) where the buyerVariable scenario
had the highest `winVariable` at this checkpoint. Win rates are clipped/smoothed to reflect
unmodeled tail risks and prevent deterministic misinterpretation (e.g., [1.0, 0.0, 0.0] becomes [0.98, 0.01, 0.01]).

#### winnerSnapshots.buyerVariableMedian

> **buyerVariableMedian**: `Float64Array`

#### winnerSnapshots.renter

> **renter**: `Float64Array`

Fraction of iterations (strictly in the range [0.01, 0.98]) where the renter scenario
had the highest `winVariable` at this checkpoint. Win rates are clipped/smoothed to reflect
unmodeled tail risks and prevent deterministic misinterpretation (e.g., [1.0, 0.0, 0.0] becomes [0.98, 0.01, 0.01]).

#### winnerSnapshots.renterMedian

> **renterMedian**: `Float64Array`

Median `winVariable` amount for each category at each snapshot.

#### winnerSnapshots.snapshotMonths

> **snapshotMonths**: `number`[]

Month indices of each snapshot (e.g. `[59, 119, 179, 239, 299]` for a 25-year sim, i.e. end of years 5, 10, 15, 20, 25).

## Throws

If the down payment is less than the minimum required down payment in Canada.

## Example

```ts
import { simulateRentVsBuyMonteCarlo, getRentVsBuyCholeskyMatrix } from "@nshiab/journalism-finance";

// Assuming you have an object `historicalData` of type `StochasticData`
// where each key holds an array of historical values for that variable.
const choleskyMatrix = getRentVsBuyCholeskyMatrix(historicalData);

const results = simulateRentVsBuyMonteCarlo({
  iterations: 1000,
  choleskyMatrix,
  winVariable: "balanceAfterSelling",
  startingYear: 2026,
  numberOfYears: 25,
  tfsaContributions: true,
  annualInvestmentFeeRate: 0.0025,
  couple: false,
  city: "Toronto",
  renter: {
    securityDeposit: 1500,
  },
  buyer: {
    downPayment: 50000,
    fixedRateAdjustment: -0.015,
    variableRateAdjustment: -0.005,
    firstTimeOwner: true, investsSavings: true,
    purchaseFixedFees: 2000,
    sellingCommissionRate: 0.05,
    floorRate: 0.01,
    investsSavings: true,
  },
  stochasticParameters: {
    employmentIncome: { initialValue: 80000, mu: 0.03, sigma: 0.05 },
    market: { initialValue: 0.07, mu: 0.07, sigma: 0.15 },
    rent: { initialValue: 1500, mu: 0.03, sigma: 0.02 },
    ownerInsurance: { initialValue: 120, mu: 0.03, sigma: 0.02 },
    renterInsurance: { initialValue: 30, mu: 0.03, sigma: 0.02 },
    maintenance: { initialValue: 200, mu: 0.03, sigma: 0.02 },
    propertyTax: { initialValue: 300, mu: 0.03, sigma: 0.02 },
    condoFee: { initialValue: 300, mu: 0.03, sigma: 0.02 },
    appreciation: { initialValue: 500000, mu: 0.04, sigma: 0.1 },
    sellingFixedFees: { initialValue: 2000, mu: 0.02, sigma: 0.01 },
    fiveYearInterestRates: { initialValue: 0.05, a: 0.2, b: 0.05, sigma: 0.02 },
    fourYearInterestRates: { initialValue: 0.05, a: 0.2, b: 0.05, sigma: 0.02 },
    threeYearInterestRates: { initialValue: 0.05, a: 0.2, b: 0.05, sigma: 0.02 },
    twoYearInterestRates: { initialValue: 0.05, a: 0.2, b: 0.05, sigma: 0.02 },
    oneYearInterestRates: { initialValue: 0.05, a: 0.2, b: 0.05, sigma: 0.02 },
    variableInterestRates: { initialValue: 0.06, a: 0.2, b: 0.06, sigma: 0.02 },
  },
});
```
