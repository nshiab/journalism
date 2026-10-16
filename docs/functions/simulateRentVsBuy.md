[**Journalism v4.0.2**](../index.md)

***

[Journalism](../globals.md) / simulateRentVsBuy

# Function: simulateRentVsBuy()

> **simulateRentVsBuy**(`parameters`, `options?`): (`object` & \{ `effectiveInterestRate?`: `number`; `fixedRateAdjustment?`: `number`; `group`: `"monthlyExpenses"` \| `"cumulativeExpenses"`; `postedInterestRate?`: `number`; `variable`: `"rent"` \| `"maintenance"` \| `"propertyTax"` \| `"insurance"` \| `"securityDeposit"` \| `"mortgageCapital"` \| `"mortgageInterests"` \| `"condoFees"` \| `"downPayment"` \| `"purchaseFixedFees"` \| `"landTransferTax"` \| `"insurancePremiumTax"` \| `"tfsaFees"` \| `"stocksFees"`; `variableRateAdjustment?`: `number`; \} \| \{ `group`: `"monthlyGains"` \| `"cumulativeGains"`; `homeValue?`: `number`; `variable`: `"tfsaGains"` \| `"tfsaContribution"` \| `"stocksGains"` \| `"newStocks"` \| `"homeEquityGains"`; \} \| \{ `group`: `"assets"`; `variable`: `"securityDeposit"` \| `"tfsa"` \| `"stocks"` \| `"homeEquity"`; \} \| \{ `group`: `"summary"`; `variable`: `"balance"`; \} \| \{ `group`: `"summaryCumulative"`; `variable`: `"balance"` \| `"balanceAfterSelling"`; \} \| \{ `employmentIncome?`: `number`; `group`: `"saleCosts"`; `variable`: `"stockTaxes"` \| `"homeSellingCommission"` \| `"homeSellingFixedFees"` \| `"mortgagePenalty"` \| `"mortgageBalance"`; \} \| \{ `group`: `"saleNetGains"`; `variable`: `"securityDeposit"` \| `"stockSellingGains"` \| `"tfsaSellingGains"` \| `"homeSellingGains"`; \} \| \{ `group`: `"monthlyRecurringExpenses"`; `variable`: `"rent"` \| `"maintenance"` \| `"propertyTax"` \| `"insurance"` \| `"mortgageCapital"` \| `"mortgageInterests"` \| `"condoFees"` \| `"tfsaFees"` \| `"stocksFees"`; \} \| \{ `group`: `"monthlyNonRecurringExpenses"`; `variable`: `"securityDeposit"` \| `"downPayment"` \| `"purchaseFixedFees"` \| `"landTransferTax"` \| `"insurancePremiumTax"`; \} \| \{ `group`: `"totals"`; `variable`: `"assets"` \| `"monthlyExpenses"` \| `"cumulativeExpenses"` \| `"monthlyGains"` \| `"cumulativeGains"` \| `"saleCosts"` \| `"saleNetGains"` \| `"monthlyRecurringExpenses"` \| `"monthlyNonRecurringExpenses"`; \})[]

Simulates and compares the financial outcomes of renting versus buying a home over a specified number of years.
This comprehensive simulation accounts for various factors including mortgage payments (fixed and variable),
property taxes, maintenance costs, condo fees, insurance, rent increases, market returns on savings, and
the eventual sale of the property. Tailored for a Canadian context, it includes specific features like
tax-free TFSA contributions and standard Canadian mortgage structures.

The simulation tracks three scenarios:
1. **Renter**: Pays rent and invests the difference between their expenses and the buyer's expenses into the market.
2. **Buyer (Fixed)**: Purchases a home using a fixed-rate mortgage and invests any remaining surplus.
3. **Buyer (Variable)**: Purchases a home using a variable-rate mortgage and invests any remaining surplus.

It provides a detailed breakdown of monthly expenses, gains, assets, and a final summary including the
net balance after selling the property and paying all associated costs (taxes, legal fees, penalties).

## Parameters

### parameters

The input parameters for the simulation.

#### annualInvestmentFeeRate

`number`

Annual investment fee rate (e.g. ETF MER or platform/advisor fee) expressed as a decimal (e.g. `0.0025` for 0.25%). Applied monthly to TFSA and stock portfolio balances using a multiplicative model — the fee is charged on the grown balance. The monthly dollar cost is also tracked as `tfsaFees` and `stocksFees` under `monthlyExpenses` and `cumulativeExpenses` in the output.

#### buyer

\{ `downPayment`: `number`; `firstTimeOwner`: `boolean`; `fixedRateAdjustment`: `number`; `floorRate`: `number`; `investsSavings`: `boolean`; `purchaseFixedFees`: `number`; `purchasePrice`: `number`; `sellingCommissionRate`: `number`; `sellingFixedFees`: `number`; `startingAnnualMaintenanceCost`: `number`; `startingAnnualPropertyTax`: `number`; `startingMonthlyCondoFees`: `number`; `startingMonthlyInsurance`: `number`; `variableRateAdjustment`: `number`; \}

Configuration for the buyer scenarios.

#### buyer.downPayment

`number`

The down payment amount. Must meet the minimum required down payment in Canada based on the purchase price.

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

Whether the buyer invests any monthly savings (difference between their expenses and the renter's/max expenses) into the stock market. If `false`, these savings are discarded (simulating lifestyle inflation or other spending).

#### buyer.purchaseFixedFees

`number`

Fixed fees associated with the purchase (e.g., notary). Do not include land transfer tax here, as it is calculated automatically based on the city.

#### buyer.purchasePrice

`number`

The purchase price of the home.

#### buyer.sellingCommissionRate

`number`

The real estate commission rate for selling the home (e.g., 0.05 for 5%).

#### buyer.sellingFixedFees

`number`

Fixed fees associated with selling the home (before sales tax).

#### buyer.startingAnnualMaintenanceCost

`number`

The initial annual maintenance cost.

#### buyer.startingAnnualPropertyTax

`number`

The initial annual property tax.

#### buyer.startingMonthlyCondoFees

`number`

The initial monthly condo fees.

#### buyer.startingMonthlyInsurance

`number`

The initial monthly homeowner's insurance.

#### buyer.variableRateAdjustment

`number`

The adjustment applied to the variable mortgage rate (added to the posted rate).

#### city

`"Quebec"` \| `"Toronto"` \| `"Montreal"` \| `"Calgary"` \| `"Ottawa"` \| `"Edmonton"` \| `"Winnipeg"` \| `"Vancouver"` \| `"Hamilton"` \| `"Halifax"` \| `"London"` \| `"Saskatoon"` \| `"Kitchener-Waterloo"` \| `"Regina"` \| `"Victoria"` \| `"Barrie"` \| `"Guelph"` \| `"Kingston"` \| `"Fredericton"` \| `"Moncton"` \| `"Saint John (NB)"` \| `"Saint John's (NL)"`

The city where the home is located, used to calculate land transfer tax and derive the province for sales and income taxes.

#### couple

`boolean`

Whether to simulate investments and taxes for a couple doubling TFSA contribution room and splitting capital gains in 2. Assumes each per-month value in parameters.values.employmentIncome represents the per-partner income.

#### numberOfYears

`number`

The duration of the simulation in years.

#### rates

\{ `appreciationIncrease`: `number`[]; `condoFeeIncrease`: `number`[]; `maintenanceIncrease`: `number`[]; `marketReturnRate`: `number`[]; `ownerInsuranceIncrease`: `number`[]; `propertyTaxIncrease`: `number`[]; `renterInsuranceIncrease`: `number`[]; `rentIncrease`: `number`[]; `sellingFixedFeesIncrease`: `number`[]; \}

Annualized growth rates over the simulation period. Each array should have a length of `numberOfYears * 12`. These can be historical or projected rates.

#### rates.appreciationIncrease

`number`[]

Monthly home appreciation rates.

#### rates.condoFeeIncrease

`number`[]

Monthly condo fee increase rates.

#### rates.maintenanceIncrease

`number`[]

Monthly maintenance cost increase rates.

#### rates.marketReturnRate

`number`[]

Monthly market return rates.

#### rates.ownerInsuranceIncrease

`number`[]

Monthly homeowner's insurance increase rates.

#### rates.propertyTaxIncrease

`number`[]

Monthly property tax increase rates.

#### rates.renterInsuranceIncrease

`number`[]

Monthly renter's insurance increase rates.

#### rates.rentIncrease

`number`[]

Monthly rent increase rates.

#### rates.sellingFixedFeesIncrease

`number`[]

Monthly increase rates for selling fixed fees.

#### renter

\{ `securityDeposit`: `number`; `startingMonthlyInsurance`: `number`; `startingMonthlyRent`: `number`; \}

Configuration for the renter scenario.

#### renter.securityDeposit

`number`

The initial security deposit.

#### renter.startingMonthlyInsurance

`number`

The initial monthly renter's insurance.

#### renter.startingMonthlyRent

`number`

The initial monthly rent payment.

#### startingYear

`number`

The year the simulation begins.

#### tfsaContributions

`boolean`

Whether to prioritize TFSA contributions for investments (tax-free gains).

#### values

\{ `employmentIncome`: `number`[]; `fiveYearInterestRates`: `number`[]; `fourYearInterestRates`: `number`[]; `oneYearInterestRates`: `number`[]; `threeYearInterestRates`: `number`[]; `twoYearInterestRates`: `number`[]; `variableInterestRates`: `number`[]; \}

Shared absolute values over the simulation period. Each array should have a length of `numberOfYears * 12`.

#### values.employmentIncome

`number`[]

Annual employment income at each simulated month, used for calculating marginal income tax rates on investment gains.

#### values.fiveYearInterestRates

`number`[]

Monthly 5-year fixed mortgage interest rates.

#### values.fourYearInterestRates

`number`[]

Monthly 4-year fixed mortgage interest rates.

#### values.oneYearInterestRates

`number`[]

Monthly 1-year fixed mortgage interest rates.

#### values.threeYearInterestRates

`number`[]

Monthly 3-year fixed mortgage interest rates.

#### values.twoYearInterestRates

`number`[]

Monthly 2-year fixed mortgage interest rates.

#### values.variableInterestRates

`number`[]

Monthly variable mortgage interest rates.

### options?

Additional simulation options.

#### adjustToInflation?

`"marketReturnRate"` \| `"rentIncrease"` \| `"ownerInsuranceIncrease"` \| `"renterInsuranceIncrease"` \| `"maintenanceIncrease"` \| `"propertyTaxIncrease"` \| `"condoFeeIncrease"` \| `"appreciationIncrease"` \| `"sellingFixedFeesIncrease"`

The rate parameter used as a proxy for inflation to express future dollar values in today's constant dollars. When set (e.g. to `"sellingFixedFeesIncrease"`), point-in-time metrics (like `monthlyExpenses`, `assets`, and `balance`) are discounted by the current month's inflation factor. Cumulative totals (like `cumulativeExpenses` and `cumulativeGains`) accumulate real values incrementally — meaning each nominal monthly contribution is discounted before being added to the running sum. One-time upfront costs paid at month 0 (`downPayment`, `purchaseFixedFees`, `landTransferTax`, `insurancePremiumTax`, `securityDeposit`) are **not** discounted because their real value already equals their nominal value. Defaults to `undefined` (no adjustment).

#### groups?

`string`[]

Internal filter used by `simulateRentVsBuyMonteCarlo` via `details.filterGroups`. Restricts which groups are emitted by `onRecord` and pushed to results.

#### onRecord?

(`category`, `group`, `variable`, `monthIndex`, `amount`) => `void`

Internal callback used by `simulateRentVsBuyMonteCarlo` when `details.iterations` or `details.quantiles` is enabled. When provided, numeric values are streamed directly to the accumulator instead of being wrapped in result objects, avoiding the per-record heap allocation cost. At the final month, one winner record (the `winVariable` entry) per category is still pushed to the results array for winner extraction.

#### onSnapshotRecord?

(`category`, `monthIndex`, `amount`) => `void`

#### snapshotMonths?

`Set`\<`number`\>

#### variables?

`string`[]

Internal filter used by `simulateRentVsBuyMonteCarlo` via `details.filterVariables`. Restricts which individual variables within allowed groups are emitted by `onRecord`. An empty array is treated as no filter.

#### winVariable?

`"assets"` \| `"balance"` \| `"balanceAfterSelling"`

The variable used to identify the winner when extracting the final record. Use `"balanceAfterSelling"` for net balance after a simulated sale, `"balance"` for cumulative balance, or `"assets"` for total raw assets.

#### winVariableOnly?

`boolean`

If `true`, the returned results will only include the final `winVariable` record for each scenario (one entry per scenario at the final month). Requires `winVariable` to be set — throws if `winVariableOnly` is `true` but `winVariable` is not provided. Defaults to `false`.

## Returns

(`object` & \{ `effectiveInterestRate?`: `number`; `fixedRateAdjustment?`: `number`; `group`: `"monthlyExpenses"` \| `"cumulativeExpenses"`; `postedInterestRate?`: `number`; `variable`: `"rent"` \| `"maintenance"` \| `"propertyTax"` \| `"insurance"` \| `"securityDeposit"` \| `"mortgageCapital"` \| `"mortgageInterests"` \| `"condoFees"` \| `"downPayment"` \| `"purchaseFixedFees"` \| `"landTransferTax"` \| `"insurancePremiumTax"` \| `"tfsaFees"` \| `"stocksFees"`; `variableRateAdjustment?`: `number`; \} \| \{ `group`: `"monthlyGains"` \| `"cumulativeGains"`; `homeValue?`: `number`; `variable`: `"tfsaGains"` \| `"tfsaContribution"` \| `"stocksGains"` \| `"newStocks"` \| `"homeEquityGains"`; \} \| \{ `group`: `"assets"`; `variable`: `"securityDeposit"` \| `"tfsa"` \| `"stocks"` \| `"homeEquity"`; \} \| \{ `group`: `"summary"`; `variable`: `"balance"`; \} \| \{ `group`: `"summaryCumulative"`; `variable`: `"balance"` \| `"balanceAfterSelling"`; \} \| \{ `employmentIncome?`: `number`; `group`: `"saleCosts"`; `variable`: `"stockTaxes"` \| `"homeSellingCommission"` \| `"homeSellingFixedFees"` \| `"mortgagePenalty"` \| `"mortgageBalance"`; \} \| \{ `group`: `"saleNetGains"`; `variable`: `"securityDeposit"` \| `"stockSellingGains"` \| `"tfsaSellingGains"` \| `"homeSellingGains"`; \} \| \{ `group`: `"monthlyRecurringExpenses"`; `variable`: `"rent"` \| `"maintenance"` \| `"propertyTax"` \| `"insurance"` \| `"mortgageCapital"` \| `"mortgageInterests"` \| `"condoFees"` \| `"tfsaFees"` \| `"stocksFees"`; \} \| \{ `group`: `"monthlyNonRecurringExpenses"`; `variable`: `"securityDeposit"` \| `"downPayment"` \| `"purchaseFixedFees"` \| `"landTransferTax"` \| `"insurancePremiumTax"`; \} \| \{ `group`: `"totals"`; `variable`: `"assets"` \| `"monthlyExpenses"` \| `"cumulativeExpenses"` \| `"monthlyGains"` \| `"cumulativeGains"` \| `"saleCosts"` \| `"saleNetGains"` \| `"monthlyRecurringExpenses"` \| `"monthlyNonRecurringExpenses"`; \})[]

A detailed array of monthly results for each scenario (renter, buyerFixed, buyerVariable).

## Throws

If the down payment is less than the minimum required down payment in Canada.
Each object in the array represents a specific data point for a given month, categorized by:
- `monthlyExpenses` or `cumulativeExpenses`:
  - `rent`, `insurance`, `securityDeposit` (for Renter)
  - `mortgageCapital`, `mortgageInterests`, `maintenance`, `propertyTax`, `condoFees`, `downPayment`, `purchaseFixedFees`, `insurancePremiumTax` (for Buyers)
  - `tfsaFees`, `stocksFees` (for all scenarios)
- `monthlyGains` or `cumulativeGains`:
  - `tfsaGains`, `tfsaContribution`, `stocksGains`, `newStocks` (for all scenarios)
  - `homeEquityGains` (for Buyers)
- `assets`:
  - `tfsa`, `stocks` (for all scenarios)
  - `securityDeposit` (for Renter)
  - `homeEquity` (for Buyers)
- `summary`: `balance` (monthly net worth)
- `summaryCumulative`: `balance` (cumulative net worth), `balanceAfterSelling` (net worth after hypothetical property sale and associated taxes/fees)
- `saleCosts`: `stockTaxes` (includes `employmentIncome` used for calculation), `homeSellingCommission`, `homeSellingFixedFees`, `mortgagePenalty`, `mortgageBalance` (hypothetical costs incurred upon selling)
- `saleNetGains`: `stockSellingGains`, `tfsaSellingGains`, `homeSellingGains`, `securityDeposit` (hypothetical gains realized upon selling)
- `monthlyRecurringExpenses`: `rent`, `insurance`, `mortgageCapital`, `mortgageInterests`, `maintenance`, `propertyTax`, `condoFees`, `tfsaFees`, `stocksFees` — same values as the corresponding `monthlyExpenses` variables, restricted to costs that recur every month.
- `monthlyNonRecurringExpenses`: `downPayment`, `purchaseFixedFees`, `landTransferTax`, `insurancePremiumTax`, `securityDeposit` — same values as the corresponding `monthlyExpenses` variables, restricted to one-time upfront costs (nonzero only at month 0).
- `totals`: `monthlyExpenses`, `cumulativeExpenses`, `monthlyGains`, `cumulativeGains`, `assets`, `saleCosts`, `saleNetGains`, `monthlyRecurringExpenses`, `monthlyNonRecurringExpenses` (sum of all variables in each respective group; always emitted even when zero)

## Example

```ts
const rates = {
  marketReturnRate: new Array(120).fill(0.005), // 0.5% monthly
  rentIncrease: new Array(120).fill(0.002),
  ownerInsuranceIncrease: new Array(120).fill(0.002),
  renterInsuranceIncrease: new Array(120).fill(0.002),
  maintenanceIncrease: new Array(120).fill(0.002),
  propertyTaxIncrease: new Array(120).fill(0.002),
  condoFeeIncrease: new Array(120).fill(0.002),
  appreciationIncrease: new Array(120).fill(0.003),
  sellingFixedFeesIncrease: new Array(120).fill(0.002),
};

const values = {
  employmentIncome: new Array(120).fill(75000),
  fiveYearInterestRates: new Array(120).fill(0.05),
  fourYearInterestRates: new Array(120).fill(0.05),
  threeYearInterestRates: new Array(120).fill(0.05),
  twoYearInterestRates: new Array(120).fill(0.05),
  oneYearInterestRates: new Array(120).fill(0.05),
  variableInterestRates: new Array(120).fill(0.06),
};

const results = simulateRentVsBuy({
  startingYear: 2024,
  numberOfYears: 10,
  tfsaContributions: true,
  annualInvestmentFeeRate: 0,
  couple: false,
  city: "Toronto",
  renter: {
    startingMonthlyRent: 2000,
    securityDeposit: 2000,
    startingMonthlyInsurance: 30,
  },
  buyer: {
    downPayment: 100000,
    purchasePrice: 500000,
    fixedRateAdjustment: -0.015,
    variableRateAdjustment: -0.005,
    firstTimeOwner: true, investsSavings: true,
    purchaseFixedFees: 2000,
    startingAnnualMaintenanceCost: 2000,
    startingAnnualPropertyTax: 3000,
    startingMonthlyCondoFees: 300,
    startingMonthlyInsurance: 100,
    sellingFixedFees: 2000,
    sellingCommissionRate: 0.05,
    floorRate: 0.01,
    investsSavings: true,
  },
  values,
  rates,
}, { winVariableOnly: true, winVariable: "balanceAfterSelling" });
```
