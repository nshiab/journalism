import { type RentVsBuyRates } from "./simulateRentVsBuy.js";
import type { City } from "./getLandTransferTax.js";
/** Flat-matrix result for transferable output. `data[key][row * cols + col]`. */
export type ColumnarResult = {
    data: Record<string, Float64Array>;
    rows: number;
    cols: number;
    keys: string[];
};
/** Variable / group union types (shared between overload return types). */
export type MqGroup = "monthlyExpenses" | "cumulativeExpenses" | "monthlyGains" | "cumulativeGains" | "assets" | "summary" | "summaryCumulative" | "saleCosts" | "saleNetGains" | "totals";
/** Union of all variable names used in simulation output records. */
export type MqVariable = "rent" | "insurance" | "securityDeposit" | "mortgageCapital" | "mortgageInterests" | "maintenance" | "propertyTax" | "condoFees" | "downPayment" | "purchaseFixedFees" | "landTransferTax" | "insurancePremium" | "tfsaFees" | "stocksFees" | "tfsaGains" | "tfsaContribution" | "stocksGains" | "newStocks" | "homeEquityGains" | "tfsa" | "stocks" | "homeEquity" | "balance" | "balanceAfterSelling" | "stockTaxes" | "homeSellingCommission" | "homeSellingFixedFees" | "mortgagePenalty" | "mortgageBalance" | "stockSellingGains" | "tfsaSellingGains" | "homeSellingGains" | "monthlyExpenses" | "cumulativeExpenses" | "monthlyGains" | "cumulativeGains" | "assets" | "saleCosts" | "saleNetGains";
/** Simulation scenario category. */
export type MqCategory = "renter" | "buyerFixed" | "buyerVariable";
/** Category names indexed by `WinnersColumnar.category` byte (0 = renter, 1 = buyerFixed, 2 = buyerVariable). */
export declare const WINNER_CATEGORIES: readonly ["renter", "buyerFixed", "buyerVariable"];
/** Columnar encoding of per-iteration winner records. All three arrays have length `iterations`. */
export type WinnersColumnar = {
    /** Final `monthIndex` of the winning scenario for each iteration. */
    monthIndex: Float64Array;
    /** Final `amount` of the winning scenario for each iteration. */
    amount: Float64Array;
    /**
     * Winning scenario category encoded as a byte.
     * Decode with `WINNER_CATEGORIES[category[i]]` or use `decodeMonteCarloWinners`.
     */
    category: Uint8Array;
};
/** Return type for `simulateRentVsBuyMonteCarlo`. All large arrays are returned in columnar format. */
export type ColumnarReturn = {
    values: ColumnarResult;
    winners: WinnersColumnar;
    /**
     * Per-iteration and per-quantile monthly data, populated when `options.details` is provided.
     * - `monthlyIterations`: raw per-iteration monthly records. Layout: `data[key][iteration * cols + monthIndex]`. Decode with `decodeMonteCarloMonthlyIterations`.
     * - `monthlyQuantiles`: pre-computed quantile summaries. Layout: `data[key][qIdx * cols + monthIndex]`. Decode with `decodeMonteCarloMonthlyQuantiles`.
     */
    details: {
        monthlyIterations: ColumnarResult;
        monthlyQuantiles: ColumnarResult;
    };
};
/** Input parameters for `simulateRentVsBuyMonteCarlo`. */
export type SimParams = {
    iterations: number;
    winVariable: "balance" | "balanceAfterSelling" | "assets";
    startingYear: number;
    numberOfYears: number;
    tfsaContributions: boolean;
    annualInvestmentFeeRate: number;
    couple: boolean;
    city: City;
    renter: {
        securityDeposit: number;
    };
    buyer: {
        downPayment: number;
        fixedRateAdjustment: number;
        variableRateAdjustment: number;
        firstTimeOwner: boolean;
        purchaseFixedFees: number;
        sellingCommissionRate: number;
        floorRate: number;
        investsSavings: boolean;
    };
    /**
     * Mandatory Cholesky decomposition matrix for the 16 stochastic variables.
     * You must pre-compute this using `getRentVsBuyCholeskyMatrix` and pass it
     * into the simulation.
     */
    choleskyMatrix: number[][];
    stochasticParameters: {
        employmentIncome: {
            initialValue: number;
            mu: number;
            sigma: number;
        };
        market: {
            initialValue: number;
            mu: number;
            sigma: number;
        };
        rent: {
            initialValue: number;
            mu: number;
            sigma: number;
        };
        ownerInsurance: {
            initialValue: number;
            mu: number;
            sigma: number;
        };
        renterInsurance: {
            initialValue: number;
            mu: number;
            sigma: number;
        };
        maintenance: {
            initialValue: number;
            mu: number;
            sigma: number;
        };
        propertyTax: {
            initialValue: number;
            mu: number;
            sigma: number;
        };
        condoFee: {
            initialValue: number;
            mu: number;
            sigma: number;
        };
        appreciation: {
            initialValue: number;
            mu: number;
            sigma: number;
        };
        sellingFixedFees: {
            initialValue: number;
            mu: number;
            sigma: number;
        };
        fiveYearInterestRates: {
            a: number;
            b: number;
            sigma: number;
            initialValue: number;
        };
        fourYearInterestRates: {
            a: number;
            b: number;
            sigma: number;
            initialValue: number;
        };
        threeYearInterestRates: {
            a: number;
            b: number;
            sigma: number;
            initialValue: number;
        };
        twoYearInterestRates: {
            a: number;
            b: number;
            sigma: number;
            initialValue: number;
        };
        oneYearInterestRates: {
            a: number;
            b: number;
            sigma: number;
            initialValue: number;
        };
        variableInterestRates: {
            a: number;
            b: number;
            sigma: number;
            initialValue: number;
        };
    };
};
/** Options accepted by `simulateRentVsBuyMonteCarlo`. */
export type BaseOptions = {
    verbose?: boolean;
    verboseStep?: number;
    values?: boolean;
    /**
     * When provided, enables detailed monthly data collection for all iterations.
     * - `iterations`: if `true`, captures raw per-iteration monthly records returned in `details.monthlyIterations`. Requires `iterationsGroups` to be set and non-empty — throws otherwise. Decode with `decodeMonteCarloMonthlyIterations`.
     * - `quantiles`: pre-computes the specified quantile levels (e.g. `[0, 0.5, 1]` for min/median/max) across all iterations for every variable/group/category/month, returned in `details.monthlyQuantiles`. Layout: `data[key][qIdx * cols + monthIndex]`. Decode with `decodeMonteCarloMonthlyQuantiles`.
     * - `iterationsGroups`: required when `iterations: true`; restricts which groups are collected (e.g. `["assets", "summaryCumulative"]`), reducing memory usage.
     * Both `iterations` and `quantiles` share the same internal column-major buffer, so enabling both together is more memory-efficient than the sum of their individual costs.
     */
    details?: {
        iterations?: boolean;
        quantiles?: number[];
        iterationsGroups?: MqGroup[];
    };
    adjustToInflation?: RentVsBuyRates;
};
/**
 * Performs a Monte Carlo simulation for a rent versus buy analysis tailored for a Canadian context.
 * This function runs multiple iterations of the `simulateRentVsBuy` function, using stochastic paths
 * for various economic factors like market returns, interest rates, and inflation-related costs.
 * It helps evaluate the probability of different financial outcomes under uncertainty.
 *
 * The simulation uses:
 * - **Geometric Brownian Motion (GBM)** for paths like market returns, rent increases, and home appreciation.
 * - **Cox-Ingersoll-Ross (CIR)** models for interest rate paths.
 *
 * Parameters for these models can be generated from historical data using `getCirParameters` and `getGbmParameters` from `@nshiab/journalism`.
 *
 * @param parameters - The input parameters for the Monte Carlo simulation.
 * @param parameters.iterations - The number of simulation iterations to run.
 * @param parameters.winVariable - The variable used to determine the winner of each iteration. Use `"balanceAfterSelling"` for the net balance after simulated sale of all assets, `"balance"` for the cumulative balance before any sale simulation, or `"assets"` for the total raw asset value (TFSA + stocks + home equity + security deposit).
 * @param parameters.startingYear - The year the simulation begins.
 * @param parameters.numberOfYears - The duration of each simulation in years.
 * @param parameters.tfsaContributions - Whether to prioritize TFSA contributions for investments (tax-free gains).
 * @param parameters.annualInvestmentFeeRate - Annual investment fee rate (e.g. ETF MER or platform/advisor fee) expressed as a decimal (e.g. `0.0025` for 0.25%). Applied monthly to TFSA and stock portfolio balances using a multiplicative model — the fee is charged on the grown balance. The monthly dollar cost is also tracked as `tfsaFees` and `stocksFees` under `monthlyExpenses` and `cumulativeExpenses` in the output.
 * @param parameters.couple - Whether to simulate investments and taxes for a couple doubling TFSA contribution room and splitting capital gains in 2. Assumes the stochastic employmentIncome parameter represents the per-partner income.
 * @param parameters.city - The city where the home is located, used to calculate land transfer tax and derive the province for sales and income taxes.
 * @param parameters.renter - Configuration for the renter scenario.
 *   @param parameters.renter.securityDeposit - The initial security deposit or last month's rent (scenario-dependent).
 * @param parameters.buyer - Configuration for the buyer scenarios.
 *   @param parameters.buyer.downPayment - The total down payment amount paid at the start. Must meet the minimum required down payment in Canada based on the initial property appreciation value.
 *   @param parameters.buyer.fixedRateAdjustment - The adjustment applied to the posted fixed mortgage rate (added to the posted rate).
 *   @param parameters.buyer.variableRateAdjustment - The adjustment applied to the variable mortgage rate (added to the posted rate).
 *   @param parameters.buyer.firstTimeOwner - Whether the buyer is a first-time owner, used to calculate land transfer tax rebates.
 *   @param parameters.buyer.purchaseFixedFees - One-time costs at purchase (notary, etc.). Do not include land transfer tax here, as it is calculated automatically based on the city.
 *   @param parameters.buyer.sellingCommissionRate - The commission rate paid to real estate agents upon sale (e.g., `0.05` for 5%).
 *   @param parameters.buyer.floorRate - The minimum interest rate (posted + adjustment) for mortgages.
 *   @param parameters.buyer.investsSavings - Whether the buyer invests any monthly savings (difference between their expenses and the renter's/max expenses) into the stock market. If `false`, these savings are discarded.
 * @param parameters.choleskyMatrix - Mandatory Cholesky decomposition matrix for the 16 stochastic variables. Must be pre-computed using `getRentVsBuyCholeskyMatrix` from this library.
 * @param parameters.stochasticParameters - Parameters for the stochastic models.
 *   For all parameters (market return rate, dollar amounts, interest rates), use:
 *   - `initialValue`: The starting value (e.g., `0.07` for 7% market return, `1500` for $1,500 monthly rent, or `0.05` for a 5% interest rate).
 *
 *   For **Geometric Brownian Motion (GBM)** models (income, market, rent, expenses, appreciation):
 *   - `mu`: The drift or expected annual growth rate.
 *   - `sigma`: The annual volatility.
 *
 *   For **Cox-Ingersoll-Ross (CIR)** models (interest rates):
 *   - `a`: Speed of mean reversion.
 *   - `b`: Long-term mean.
 *   - `sigma`: Annual volatility.
 *
 * @param parameters.stochasticParameters.employmentIncome - Employment income trajectory (GBM).
 * @param parameters.stochasticParameters.market - Market return rates for savings (GBM).
 * @param parameters.stochasticParameters.rent - Rent increase rates (GBM).
 * @param parameters.stochasticParameters.ownerInsurance - Homeowner's insurance increase rates (GBM).
 * @param parameters.stochasticParameters.renterInsurance - Renter's insurance increase rates (GBM).
 * @param parameters.stochasticParameters.maintenance - Maintenance cost increase rates (GBM).
 * @param parameters.stochasticParameters.propertyTax - Property tax increase rates (GBM).
 * @param parameters.stochasticParameters.condoFee - Condo fee increase rates (GBM).
 * @param parameters.stochasticParameters.appreciation - Home value appreciation rates (GBM).
 * @param parameters.stochasticParameters.sellingFixedFees - Selling fixed fees increase rates (GBM).
 * @param parameters.stochasticParameters.fiveYearInterestRates - 5-year fixed interest rates (CIR).
 * @param parameters.stochasticParameters.fourYearInterestRates - 4-year fixed interest rates (CIR).
 * @param parameters.stochasticParameters.threeYearInterestRates - 3-year fixed interest rates (CIR).
 * @param parameters.stochasticParameters.twoYearInterestRates - 2-year fixed interest rates (CIR).
 * @param parameters.stochasticParameters.oneYearInterestRates - 1-year fixed interest rates (CIR).
 * @param parameters.stochasticParameters.variableInterestRates - Variable interest rates (CIR).
 *
 * @param options - Additional simulation options.
 *   @param options.verbose - If `true`, logs the current iteration number to the console at the frequency set by `verboseStep`. Also logs the total elapsed time upon completion via `prettyDuration`. Useful for long-running simulations.
 *   @param options.verboseStep - The frequency of progress logging. For example, setting this to `50` will log progress every 50 iterations. Defaults to `1`.
 *   @param options.values - If `true`, the function will capture and return detailed monthly financial data (such as asset balances and net gains) for every iteration of the simulation. Be cautious with high iteration counts as this can consume significant memory.
 *   @param options.details - When provided, enables detailed monthly data collection. Both sub-options share the same internal column-major buffer, so enabling both together is more memory-efficient than the sum of their individual costs.
 *   @param options.details.iterations - If `true`, captures and returns the raw monthly financial data for every variable, group, and category for each individual iteration. Requires `details.iterationsGroups` to be set and non-empty — throws otherwise. Each record includes `iteration` (0-based index), `category`, `group`, `variable`, `monthIndex`, and `amount`. Useful for custom aggregations or visualization of individual paths. Be aware that this can produce a very large number of records (iterations × months × variables × 3 categories), so use `iterationsGroups` to limit scope.
 *   @param options.details.quantiles - When provided, pre-computes the specified quantile levels (e.g. `[0, 0.5, 1]` for min/median/max) across all iterations for every variable/group/category/month combination. Layout: `data[key][qIdx * cols + monthIndex]`. Decode with `decodeMonteCarloMonthlyQuantiles`.
 *   @param options.details.iterationsGroups - Required when `details.iterations` is `true`. Restricts which groups are included in the `monthlyIterations` output (e.g. `["assets", "summaryCumulative"]`), reducing memory usage. Also filters the shared column-major buffer used by `details.quantiles`.
 *   @param options.adjustToInflation - The rate parameter used as a proxy for inflation to discount all future dollar values back to Year 0 (today's dollars). For example, setting this to `"sellingFixedFeesIncrease"` will use the simulated path of that parameter to calculate the monthly discount factor. Defaults to `undefined` (no adjustment).
 *
 * @returns An object with all large arrays in columnar format (flat `Float64Array` matrices, transferable via `postMessage`). Use `decodeMonteCarloWinners`, `decodeMonteCarloValues`, `decodeMonteCarloMonthlyIterations`, and `decodeMonteCarloMonthlyQuantiles` from `@nshiab/journalism-finance` to restore object-array shapes.
 * @throws {Error} If the down payment is less than the minimum required down payment in Canada.
 *   - `winners`: A `WinnersColumnar` with `monthIndex`, `amount` (`Float64Array`) and `category` (`Uint8Array`) indicating which scenario won each iteration. Decode with `decodeMonteCarloWinners`.
 *   - `values`: A `ColumnarResult` with stochastic path values per iteration (enabled with `options.values`). Decode with `decodeMonteCarloValues`.
 *   - `details.monthlyIterations`: A `ColumnarResult` with raw monthly records per iteration (enabled with `options.details.iterations`). Decode with `decodeMonteCarloMonthlyIterations`.
 *   - `details.monthlyQuantiles`: A `ColumnarResult` with pre-computed quantile summaries (enabled with `options.details.quantiles`). Decode with `decodeMonteCarloMonthlyQuantiles`.
 *
 * @example
 * ```ts
 * import { simulateRentVsBuyMonteCarlo, getRentVsBuyCholeskyMatrix } from "@nshiab/journalism-finance";
 *
 * // Assuming you have an object `historicalData` of type `StochasticData`
 * // where each key holds an array of historical values for that variable.
 * const choleskyMatrix = getRentVsBuyCholeskyMatrix(historicalData);
 *
 * const results = simulateRentVsBuyMonteCarlo({
 *   iterations: 1000,
 *   choleskyMatrix,
 *   winVariable: "balanceAfterSelling",
 *   startingYear: 2026,
 *   numberOfYears: 25,
 *   tfsaContributions: true,
 *   annualInvestmentFeeRate: 0.0025,
 *   couple: false,
 *   city: "Toronto",
 *   renter: {
 *     securityDeposit: 1500,
 *   },
 *   buyer: {
 *     downPayment: 50000,
 *     fixedRateAdjustment: -0.015,
 *     variableRateAdjustment: -0.005,
 *     firstTimeOwner: true, investsSavings: true,
 *     purchaseFixedFees: 2000,
 *     sellingCommissionRate: 0.05,
 *     floorRate: 0.01,
 *     investsSavings: true,
 *   },
 *   stochasticParameters: {
 *     employmentIncome: { initialValue: 80000, mu: 0.03, sigma: 0.05 },
 *     market: { initialValue: 0.07, mu: 0.07, sigma: 0.15 },
 *     rent: { initialValue: 1500, mu: 0.03, sigma: 0.02 },
 *     ownerInsurance: { initialValue: 120, mu: 0.03, sigma: 0.02 },
 *     renterInsurance: { initialValue: 30, mu: 0.03, sigma: 0.02 },
 *     maintenance: { initialValue: 200, mu: 0.03, sigma: 0.02 },
 *     propertyTax: { initialValue: 300, mu: 0.03, sigma: 0.02 },
 *     condoFee: { initialValue: 300, mu: 0.03, sigma: 0.02 },
 *     appreciation: { initialValue: 500000, mu: 0.04, sigma: 0.1 },
 *     sellingFixedFees: { initialValue: 2000, mu: 0.02, sigma: 0.01 },
 *     fiveYearInterestRates: { initialValue: 0.05, a: 0.2, b: 0.05, sigma: 0.02 },
 *     fourYearInterestRates: { initialValue: 0.05, a: 0.2, b: 0.05, sigma: 0.02 },
 *     threeYearInterestRates: { initialValue: 0.05, a: 0.2, b: 0.05, sigma: 0.02 },
 *     twoYearInterestRates: { initialValue: 0.05, a: 0.2, b: 0.05, sigma: 0.02 },
 *     oneYearInterestRates: { initialValue: 0.05, a: 0.2, b: 0.05, sigma: 0.02 },
 *     variableInterestRates: { initialValue: 0.06, a: 0.2, b: 0.06, sigma: 0.02 },
 *   },
 * });
 * ```
 */
declare function simulateRentVsBuyMonteCarlo(parameters: SimParams, options?: BaseOptions): ColumnarReturn;
export default simulateRentVsBuyMonteCarlo;
//# sourceMappingURL=simulateRentVsBuyMonteCarlo.d.ts.map