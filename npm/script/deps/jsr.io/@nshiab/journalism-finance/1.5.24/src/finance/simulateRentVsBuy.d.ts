import { type City } from "./getLandTransferTax.js";
/**
 * This type defines the keys for the various rates used in the rent vs buy simulation.
 */
export type RentVsBuyRates = "marketReturnRate" | "rentIncrease" | "ownerInsuranceIncrease" | "renterInsuranceIncrease" | "maintenanceIncrease" | "propertyTaxIncrease" | "condoFeeIncrease" | "appreciationIncrease" | "sellingFixedFeesIncrease";
/**
 * Simulates and compares the financial outcomes of renting versus buying a home over a specified number of years.
 * This comprehensive simulation accounts for various factors including mortgage payments (fixed and variable),
 * property taxes, maintenance costs, condo fees, insurance, rent increases, market returns on savings, and
 * the eventual sale of the property. Tailored for a Canadian context, it includes specific features like
 * tax-free TFSA contributions and standard Canadian mortgage structures.
 *
 * The simulation tracks three scenarios:
 * 1. **Renter**: Pays rent and invests the difference between their expenses and the buyer's expenses into the market.
 * 2. **Buyer (Fixed)**: Purchases a home using a fixed-rate mortgage and invests any remaining surplus.
 * 3. **Buyer (Variable)**: Purchases a home using a variable-rate mortgage and invests any remaining surplus.
 *
 * It provides a detailed breakdown of monthly expenses, gains, assets, and a final summary including the
 * net balance after selling the property and paying all associated costs (taxes, legal fees, penalties).
 *
 * @param parameters - The input parameters for the simulation.
 * @param parameters.startingYear - The year the simulation begins.
 * @param parameters.numberOfYears - The duration of the simulation in years.
 * @param parameters.tfsaContributions - Whether to prioritize TFSA contributions for investments (tax-free gains).
 * @param parameters.annualInvestmentFeeRate - Annual investment fee rate (e.g. ETF MER or platform/advisor fee) expressed as a decimal (e.g. `0.0025` for 0.25%). Applied monthly to TFSA and stock portfolio balances using a multiplicative model — the fee is charged on the grown balance. The monthly dollar cost is also tracked as `tfsaFees` and `stocksFees` under `monthlyExpenses` and `cumulativeExpenses` in the output.
 * @param parameters.couple - Whether to simulate investments and taxes for a couple doubling TFSA contribution room and splitting capital gains in 2. Assumes each per-month value in parameters.values.employmentIncome represents the per-partner income.
 * @param parameters.city - The city where the home is located, used to calculate land transfer tax and derive the province for sales and income taxes.
 * @param parameters.renter - Configuration for the renter scenario.
 *   @param parameters.renter.startingMonthlyRent - The initial monthly rent payment.
 *   @param parameters.renter.securityDeposit - The initial security deposit.
 *   @param parameters.renter.startingMonthlyInsurance - The initial monthly renter's insurance.
 * @param parameters.buyer - Configuration for the buyer scenarios.
 *   @param parameters.buyer.downPayment - The down payment amount. Must meet the minimum required down payment in Canada based on the purchase price.
 *   @param parameters.buyer.purchasePrice - The purchase price of the home.
 *   @param parameters.buyer.fixedRateAdjustment - The adjustment applied to the posted fixed mortgage rate (added to the posted rate).
 *   @param parameters.buyer.variableRateAdjustment - The adjustment applied to the variable mortgage rate (added to the posted rate).
 *   @param parameters.buyer.firstTimeOwner - Whether the buyer is a first-time owner, used to calculate land transfer tax rebates.
 *   @param parameters.buyer.purchaseFixedFees - Fixed fees associated with the purchase (e.g., notary). Do not include land transfer tax here, as it is calculated automatically based on the city.
 *   @param parameters.buyer.startingAnnualMaintenanceCost - The initial annual maintenance cost.
 *   @param parameters.buyer.startingAnnualPropertyTax - The initial annual property tax.
 *   @param parameters.buyer.startingMonthlyCondoFees - The initial monthly condo fees.
 *   @param parameters.buyer.startingMonthlyInsurance - The initial monthly homeowner's insurance.
 *   @param parameters.buyer.sellingFixedFees - Fixed fees associated with selling the home (before sales tax).
 *   @param parameters.buyer.sellingCommissionRate - The real estate commission rate for selling the home (e.g., 0.05 for 5%).
 *   @param parameters.buyer.floorRate - The minimum interest rate (posted + adjustment) for mortgages.
 *   @param parameters.buyer.investsSavings - Whether the buyer invests any monthly savings (difference between their expenses and the renter's/max expenses) into the stock market. If `false`, these savings are discarded (simulating lifestyle inflation or other spending).
 * @param parameters.values - Shared absolute values over the simulation period. Each array should have a length of `numberOfYears * 12`.
 *   @param parameters.values.employmentIncome - Monthly employment income used for calculating income taxes on investment gains.
 *   @param parameters.values.fiveYearInterestRates - Monthly 5-year fixed mortgage interest rates.
 *   @param parameters.values.fourYearInterestRates - Monthly 4-year fixed mortgage interest rates.
 *   @param parameters.values.threeYearInterestRates - Monthly 3-year fixed mortgage interest rates.
 *   @param parameters.values.twoYearInterestRates - Monthly 2-year fixed mortgage interest rates.
 *   @param parameters.values.oneYearInterestRates - Monthly 1-year fixed mortgage interest rates.
 *   @param parameters.values.variableInterestRates - Monthly variable mortgage interest rates.
 * @param parameters.rates - Annualized growth rates over the simulation period. Each array should have a length of `numberOfYears * 12`. These can be historical or projected rates.
 *   @param parameters.rates.marketReturnRate - Monthly market return rates.
 *   @param parameters.rates.rentIncrease - Monthly rent increase rates.
 *   @param parameters.rates.ownerInsuranceIncrease - Monthly homeowner's insurance increase rates.
 *   @param parameters.rates.renterInsuranceIncrease - Monthly renter's insurance increase rates.
 *   @param parameters.rates.maintenanceIncrease - Monthly maintenance cost increase rates.
 *   @param parameters.rates.propertyTaxIncrease - Monthly property tax increase rates.
 *   @param parameters.rates.condoFeeIncrease - Monthly condo fee increase rates.
 *   @param parameters.rates.appreciationIncrease - Monthly home appreciation rates.
 *   @param parameters.rates.sellingFixedFeesIncrease - Monthly increase rates for selling fixed fees.
 * @param options - Additional simulation options.
 *   @param options.winVariableOnly - If `true`, the returned results will only include the final `winVariable` record for each scenario (one entry per scenario at the final month). Requires `winVariable` to be set — throws if `winVariableOnly` is `true` but `winVariable` is not provided. Defaults to `false`.
 *   @param options.winVariable - The variable used to identify the winner when extracting the final record. Use `"balanceAfterSelling"` for net balance after a simulated sale, `"balance"` for cumulative balance, or `"assets"` for total raw assets.
 *   @param options.onRecord - Internal callback used by `simulateRentVsBuyMonteCarlo` when `details.iterations` or `details.quantiles` is enabled. When provided, numeric values are streamed directly to the accumulator instead of being wrapped in result objects, avoiding the per-record heap allocation cost. At the final month, one winner record (the `winVariable` entry) per category is still pushed to the results array for winner extraction.
 *   @param options.groups - Internal filter used by `simulateRentVsBuyMonteCarlo` via `details.iterationsGroups`. Restricts which groups are emitted by `onRecord` and pushed to results.
 *   @param options.adjustToInflation - The rate parameter used as a proxy for inflation to discount all future dollar values back to Year 0 (today's dollars). For example, setting this to `"sellingFixedFeesIncrease"` will use that parameter's values to calculate the monthly discount factor. Defaults to `undefined` (no adjustment).
 *
 * @returns A detailed array of monthly results for each scenario (renter, buyerFixed, buyerVariable).
 * @throws {Error} If the down payment is less than the minimum required down payment in Canada.
 * Each object in the array represents a specific data point for a given month, categorized by:
 * - `monthlyExpenses` or `cumulativeExpenses`:
 *   - `rent`, `insurance`, `securityDeposit` (for Renter)
 *   - `mortgageCapital`, `mortgageInterests`, `maintenance`, `propertyTax`, `condoFees`, `downPayment`, `purchaseFixedFees`, `insurancePremium` (for Buyers)
 *   - `tfsaFees`, `stocksFees` (for all scenarios)
 * - `monthlyGains` or `cumulativeGains`:
 *   - `tfsaGains`, `tfsaContribution`, `stocksGains`, `newStocks` (for all scenarios)
 *   - `homeEquityGains` (for Buyers)
 * - `assets`:
 *   - `tfsa`, `stocks` (for all scenarios)
 *   - `securityDeposit` (for Renter)
 *   - `homeEquity` (for Buyers)
 * - `summary`: `balance` (monthly net worth)
 * - `summaryCumulative`: `balance` (cumulative net worth), `balanceAfterSelling` (net worth after hypothetical property sale and associated taxes/fees)
 * - `saleCosts`: `stockTaxes` (includes `employmentIncome` used for calculation), `homeSellingCommission`, `homeSellingFixedFees`, `mortgagePenalty`, `mortgageBalance` (hypothetical costs incurred upon selling)
 * - `saleNetGains`: `stockSellingGains`, `tfsaSellingGains`, `homeSellingGains`, `securityDeposit` (hypothetical gains realized upon selling)
 * - `totals`: `monthlyExpenses`, `cumulativeExpenses`, `monthlyGains`, `cumulativeGains`, `assets`, `saleCosts`, `saleNetGains` (sum of all variables in each respective group; always emitted even when zero)
 *
 * @example
 * ```ts
 * const rates = {
 *   marketReturnRate: new Array(120).fill(0.005), // 0.5% monthly
 *   rentIncrease: new Array(120).fill(0.002),
 *   ownerInsuranceIncrease: new Array(120).fill(0.002),
 *   renterInsuranceIncrease: new Array(120).fill(0.002),
 *   maintenanceIncrease: new Array(120).fill(0.002),
 *   propertyTaxIncrease: new Array(120).fill(0.002),
 *   condoFeeIncrease: new Array(120).fill(0.002),
 *   appreciationIncrease: new Array(120).fill(0.003),
 *   sellingFixedFeesIncrease: new Array(120).fill(0.002),
 * };
 *
 * const values = {
 *   employmentIncome: new Array(120).fill(75000),
 *   fiveYearInterestRates: new Array(120).fill(0.05),
 *   fourYearInterestRates: new Array(120).fill(0.05),
 *   threeYearInterestRates: new Array(120).fill(0.05),
 *   twoYearInterestRates: new Array(120).fill(0.05),
 *   oneYearInterestRates: new Array(120).fill(0.05),
 *   variableInterestRates: new Array(120).fill(0.06),
 * };
 *
 * const results = simulateRentVsBuy({
 *   startingYear: 2024,
 *   numberOfYears: 10,
 *   tfsaContributions: true,
 *   annualInvestmentFeeRate: 0,
 *   couple: false,
 *   city: "Toronto",
 *   renter: {
 *     startingMonthlyRent: 2000,
 *     securityDeposit: 2000,
 *     startingMonthlyInsurance: 30,
 *   },
 *   buyer: {
 *     downPayment: 100000,
 *     purchasePrice: 500000,
 *     fixedRateAdjustment: -0.015,
 *     variableRateAdjustment: -0.005,
 *     firstTimeOwner: true, investsSavings: true,
 *     purchaseFixedFees: 2000,
 *     startingAnnualMaintenanceCost: 2000,
 *     startingAnnualPropertyTax: 3000,
 *     startingMonthlyCondoFees: 300,
 *     startingMonthlyInsurance: 100,
 *     sellingFixedFees: 2000,
 *     sellingCommissionRate: 0.05,
 *     floorRate: 0.01,
 *     investsSavings: true,
 *   },
 *   values,
 *   rates,
 * }, { winVariableOnly: true, winVariable: "balanceAfterSelling" });
 * ```
 */
export default function simulateRentVsBuy(parameters: {
    startingYear: number;
    numberOfYears: number;
    tfsaContributions: boolean;
    annualInvestmentFeeRate: number;
    couple: boolean;
    city: City;
    renter: {
        startingMonthlyRent: number;
        securityDeposit: number;
        startingMonthlyInsurance: number;
    };
    buyer: {
        downPayment: number;
        purchasePrice: number;
        fixedRateAdjustment: number;
        variableRateAdjustment: number;
        firstTimeOwner: boolean;
        purchaseFixedFees: number;
        startingAnnualMaintenanceCost: number;
        startingAnnualPropertyTax: number;
        startingMonthlyCondoFees: number;
        startingMonthlyInsurance: number;
        sellingFixedFees: number;
        sellingCommissionRate: number;
        floorRate: number;
        investsSavings: boolean;
    };
    values: {
        employmentIncome: number[];
        fiveYearInterestRates: number[];
        fourYearInterestRates: number[];
        threeYearInterestRates: number[];
        twoYearInterestRates: number[];
        oneYearInterestRates: number[];
        variableInterestRates: number[];
    };
    rates: {
        marketReturnRate: number[];
        rentIncrease: number[];
        ownerInsuranceIncrease: number[];
        renterInsuranceIncrease: number[];
        maintenanceIncrease: number[];
        propertyTaxIncrease: number[];
        condoFeeIncrease: number[];
        appreciationIncrease: number[];
        sellingFixedFeesIncrease: number[];
    };
}, options?: {
    winVariableOnly?: boolean;
    onRecord?: (category: string, group: string, variable: string, monthIndex: number, amount: number) => void;
    winVariable?: "balance" | "balanceAfterSelling" | "assets";
    groups?: string[];
    adjustToInflation?: RentVsBuyRates;
}): ({
    monthIndex: number;
    amount: number;
    category: "renter" | "buyerFixed" | "buyerVariable";
} & ({
    group: "monthlyExpenses" | "cumulativeExpenses";
    variable: "rent" | "insurance" | "securityDeposit" | "mortgageCapital" | "mortgageInterests" | "maintenance" | "propertyTax" | "condoFees" | "downPayment" | "purchaseFixedFees" | "landTransferTax" | "insurancePremium" | "tfsaFees" | "stocksFees";
    effectiveInterestRate?: number;
    postedInterestRate?: number;
    fixedRateAdjustment?: number;
    variableRateAdjustment?: number;
} | {
    group: "monthlyGains" | "cumulativeGains";
    variable: "tfsaGains" | "tfsaContribution" | "stocksGains" | "newStocks" | "homeEquityGains";
    homeValue?: number;
} | {
    group: "assets";
    variable: "tfsa" | "stocks" | "securityDeposit" | "homeEquity";
} | {
    group: "summary";
    variable: "balance";
} | {
    group: "summaryCumulative";
    variable: "balance" | "balanceAfterSelling";
} | {
    group: "saleCosts";
    variable: "stockTaxes" | "homeSellingCommission" | "homeSellingFixedFees" | "mortgagePenalty" | "mortgageBalance";
    employmentIncome?: number;
} | {
    group: "saleNetGains";
    variable: "stockSellingGains" | "tfsaSellingGains" | "homeSellingGains" | "securityDeposit";
} | {
    group: "totals";
    variable: "monthlyExpenses" | "cumulativeExpenses" | "monthlyGains" | "cumulativeGains" | "assets" | "saleCosts" | "saleNetGains";
}))[];
//# sourceMappingURL=simulateRentVsBuy.d.ts.map