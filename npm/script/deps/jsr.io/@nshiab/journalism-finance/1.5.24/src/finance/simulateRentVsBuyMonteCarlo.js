"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WINNER_CATEGORIES = void 0;
const index_js_1 = require("../../../../journalism-format/1.1.7/src/index.js");
const simulateRentVsBuy_js_1 = __importDefault(require("./simulateRentVsBuy.js"));
const getMinimumDownPayment_js_1 = __importDefault(require("./getMinimumDownPayment.js"));
const index_js_2 = require("../../../../journalism-statistics/1.5.2/src/index.js");
const randNormal_js_1 = __importDefault(require("./helpers/rentVsBuy/randNormal.js"));
/** Category names indexed by `WinnersColumnar.category` byte (0 = renter, 1 = buyerFixed, 2 = buyerVariable). */
exports.WINNER_CATEGORIES = [
    "renter",
    "buyerFixed",
    "buyerVariable",
];
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
function simulateRentVsBuyMonteCarlo(parameters, options = {}) {
    if (options.details?.iterations &&
        (!options.details.iterationsGroups ||
            options.details.iterationsGroups.length === 0)) {
        throw new Error("simulateRentVsBuyMonteCarlo: details.iterations requires details.iterationsGroups to be set and not empty.");
    }
    const downPaymentMin = (0, getMinimumDownPayment_js_1.default)(parameters.stochasticParameters.appreciation.initialValue);
    if (parameters.buyer.downPayment < downPaymentMin) {
        throw new Error(`The down payment is less than the minimum required down payment (${parameters.buyer.downPayment} < ${downPaymentMin}).`);
    }
    const winnersMonthIndex = new Float64Array(parameters.iterations);
    const winnersAmount = new Float64Array(parameters.iterations);
    const winnersCategory = new Uint8Array(parameters.iterations);
    const nbMonths = parameters.numberOfYears * 12;
    // Columnar map for values (populated in prepRatesGbm / prepRatesCir).
    const valuesColumnar = options.values
        ? new Map()
        : null;
    // Single column-major flat buffer shared between monthlyIterations and monthlyQuantiles.
    // Layout: detailsColumnar.get(key)[monthIndex * iterations + iterationIndex] = amount.
    // Column-major enables a contiguous subarray per month for sorting (quantiles) then
    // a single transpose pass to produce the row-major monthlyIterations output.
    const detailsColumnar = (options.details?.iterations || options.details?.quantiles)
        ? new Map()
        : null;
    // onRecord streams values directly into detailsColumnar, bypassing result-object
    // allocation in toResults. currentI is updated at the start of each iteration
    // so the closure always writes to the correct column.
    let currentI = 0;
    const onRecord = detailsColumnar
        ? (cat, grp, vr, mi, amt) => {
            const key = `${cat}|${grp}|${vr}`;
            let bucket = detailsColumnar.get(key);
            if (!bucket) {
                bucket = new Float64Array(nbMonths * parameters.iterations);
                detailsColumnar.set(key, bucket);
            }
            bucket[mi * parameters.iterations + currentI] = amt;
        }
        : undefined;
    const numVars = 16;
    const dt = 1 / 12;
    const populateValuesColumnar = (iteration, variable, path) => {
        if (valuesColumnar) {
            let bucket = valuesColumnar.get(variable);
            if (!bucket) {
                bucket = new Float64Array(parameters.iterations * nbMonths);
                valuesColumnar.set(variable, bucket);
            }
            for (let j = 0; j < nbMonths; j++) {
                bucket[iteration * nbMonths + j] = path[j];
            }
        }
    };
    const start = options.verbose ? Date.now() : null;
    const verboseStep = options.verboseStep || 1;
    for (let i = 0; i < parameters.iterations; i++) {
        currentI = i;
        if (options.verbose && i % verboseStep === 0) {
            console.log(`Simulation ${i} / ${parameters.iterations}`);
        }
        const paths = Array.from({ length: numVars }, () => new Float64Array(nbMonths + 1));
        // Seed initial values
        paths[0][0] = parameters.stochasticParameters.employmentIncome.initialValue;
        paths[1][0] = parameters.stochasticParameters.market.initialValue;
        paths[2][0] = parameters.stochasticParameters.rent.initialValue;
        paths[3][0] = parameters.stochasticParameters.ownerInsurance.initialValue;
        paths[4][0] = parameters.stochasticParameters.renterInsurance.initialValue;
        paths[5][0] = parameters.stochasticParameters.maintenance.initialValue;
        paths[6][0] = parameters.stochasticParameters.propertyTax.initialValue;
        paths[7][0] = parameters.stochasticParameters.condoFee.initialValue;
        paths[8][0] = parameters.stochasticParameters.appreciation.initialValue;
        paths[9][0] = parameters.stochasticParameters.sellingFixedFees.initialValue;
        paths[10][0] =
            parameters.stochasticParameters.fiveYearInterestRates.initialValue;
        paths[11][0] =
            parameters.stochasticParameters.fourYearInterestRates.initialValue;
        paths[12][0] =
            parameters.stochasticParameters.threeYearInterestRates.initialValue;
        paths[13][0] =
            parameters.stochasticParameters.twoYearInterestRates.initialValue;
        paths[14][0] =
            parameters.stochasticParameters.oneYearInterestRates.initialValue;
        paths[15][0] =
            parameters.stochasticParameters.variableInterestRates.initialValue;
        const Z = new Float64Array(numVars);
        for (let m = 0; m < nbMonths; m++) {
            for (let v = 0; v < numVars; v++) {
                Z[v] = (0, randNormal_js_1.default)();
            }
            const X = (0, index_js_2.getCorrelatedShocks)(parameters.choleskyMatrix, Array.from(Z));
            // 0-9 are GBM
            paths[0][m + 1] = (0, index_js_2.stepGbm)(paths[0][m], parameters.stochasticParameters.employmentIncome.mu, parameters.stochasticParameters.employmentIncome.sigma, dt, X[0]);
            paths[1][m + 1] = (0, index_js_2.stepGbm)(paths[1][m], parameters.stochasticParameters.market.mu, parameters.stochasticParameters.market.sigma, dt, X[1]);
            paths[2][m + 1] = (0, index_js_2.stepGbm)(paths[2][m], parameters.stochasticParameters.rent.mu, parameters.stochasticParameters.rent.sigma, dt, X[2]);
            paths[3][m + 1] = (0, index_js_2.stepGbm)(paths[3][m], parameters.stochasticParameters.ownerInsurance.mu, parameters.stochasticParameters.ownerInsurance.sigma, dt, X[3]);
            paths[4][m + 1] = (0, index_js_2.stepGbm)(paths[4][m], parameters.stochasticParameters.renterInsurance.mu, parameters.stochasticParameters.renterInsurance.sigma, dt, X[4]);
            paths[5][m + 1] = (0, index_js_2.stepGbm)(paths[5][m], parameters.stochasticParameters.maintenance.mu, parameters.stochasticParameters.maintenance.sigma, dt, X[5]);
            paths[6][m + 1] = (0, index_js_2.stepGbm)(paths[6][m], parameters.stochasticParameters.propertyTax.mu, parameters.stochasticParameters.propertyTax.sigma, dt, X[6]);
            paths[7][m + 1] = (0, index_js_2.stepGbm)(paths[7][m], parameters.stochasticParameters.condoFee.mu, parameters.stochasticParameters.condoFee.sigma, dt, X[7]);
            paths[8][m + 1] = (0, index_js_2.stepGbm)(paths[8][m], parameters.stochasticParameters.appreciation.mu, parameters.stochasticParameters.appreciation.sigma, dt, X[8]);
            paths[9][m + 1] = (0, index_js_2.stepGbm)(paths[9][m], parameters.stochasticParameters.sellingFixedFees.mu, parameters.stochasticParameters.sellingFixedFees.sigma, dt, X[9]);
            // 10-15 are CIR
            paths[10][m + 1] = (0, index_js_2.stepCir)(paths[10][m], parameters.stochasticParameters.fiveYearInterestRates.a, parameters.stochasticParameters.fiveYearInterestRates.b, parameters.stochasticParameters.fiveYearInterestRates.sigma, dt, X[10]);
            paths[11][m + 1] = (0, index_js_2.stepCir)(paths[11][m], parameters.stochasticParameters.fourYearInterestRates.a, parameters.stochasticParameters.fourYearInterestRates.b, parameters.stochasticParameters.fourYearInterestRates.sigma, dt, X[11]);
            paths[12][m + 1] = (0, index_js_2.stepCir)(paths[12][m], parameters.stochasticParameters.threeYearInterestRates.a, parameters.stochasticParameters.threeYearInterestRates.b, parameters.stochasticParameters.threeYearInterestRates.sigma, dt, X[12]);
            paths[13][m + 1] = (0, index_js_2.stepCir)(paths[13][m], parameters.stochasticParameters.twoYearInterestRates.a, parameters.stochasticParameters.twoYearInterestRates.b, parameters.stochasticParameters.twoYearInterestRates.sigma, dt, X[13]);
            paths[14][m + 1] = (0, index_js_2.stepCir)(paths[14][m], parameters.stochasticParameters.oneYearInterestRates.a, parameters.stochasticParameters.oneYearInterestRates.b, parameters.stochasticParameters.oneYearInterestRates.sigma, dt, X[14]);
            paths[15][m + 1] = (0, index_js_2.stepCir)(paths[15][m], parameters.stochasticParameters.variableInterestRates.a, parameters.stochasticParameters.variableInterestRates.b, parameters.stochasticParameters.variableInterestRates.sigma, dt, X[15]);
        }
        populateValuesColumnar(i, "employment income", paths[0]);
        populateValuesColumnar(i, "market returns", paths[1]);
        populateValuesColumnar(i, "rent", paths[2]);
        populateValuesColumnar(i, "owner insurance", paths[3]);
        populateValuesColumnar(i, "renter insurance", paths[4]);
        populateValuesColumnar(i, "maintenance costs", paths[5]);
        populateValuesColumnar(i, "property taxes", paths[6]);
        populateValuesColumnar(i, "condo fees", paths[7]);
        populateValuesColumnar(i, "property appreciation", paths[8]);
        populateValuesColumnar(i, "selling fixed fees", paths[9]);
        populateValuesColumnar(i, "five year interest rates", paths[10]);
        populateValuesColumnar(i, "four year interest rates", paths[11]);
        populateValuesColumnar(i, "three year interest rates", paths[12]);
        populateValuesColumnar(i, "two year interest rates", paths[13]);
        populateValuesColumnar(i, "one year interest rates", paths[14]);
        populateValuesColumnar(i, "variable interest rates", paths[15]);
        const getRatesFromPath = (path) => {
            const r = new Array(nbMonths);
            for (let m = 0; m < nbMonths; m++) {
                r[m] = path[m] === 0 ? 0 : (path[m + 1] - path[m]) / path[m];
            }
            return r;
        };
        const iterationResults = (0, simulateRentVsBuy_js_1.default)({
            startingYear: parameters.startingYear,
            numberOfYears: parameters.numberOfYears,
            tfsaContributions: parameters.tfsaContributions,
            couple: parameters.couple,
            city: parameters.city,
            renter: {
                startingMonthlyRent: parameters.stochasticParameters.rent.initialValue,
                securityDeposit: parameters.renter.securityDeposit,
                startingMonthlyInsurance: parameters.stochasticParameters.renterInsurance.initialValue,
            },
            buyer: {
                downPayment: parameters.buyer.downPayment,
                purchasePrice: parameters.stochasticParameters.appreciation.initialValue,
                fixedRateAdjustment: parameters.buyer.fixedRateAdjustment,
                variableRateAdjustment: parameters.buyer.variableRateAdjustment,
                firstTimeOwner: parameters.buyer.firstTimeOwner,
                purchaseFixedFees: parameters.buyer.purchaseFixedFees,
                startingAnnualMaintenanceCost: parameters.stochasticParameters.maintenance.initialValue,
                startingAnnualPropertyTax: parameters.stochasticParameters.propertyTax.initialValue,
                startingMonthlyCondoFees: parameters.stochasticParameters.condoFee.initialValue,
                startingMonthlyInsurance: parameters.stochasticParameters.ownerInsurance.initialValue,
                sellingFixedFees: parameters.stochasticParameters.sellingFixedFees.initialValue,
                sellingCommissionRate: parameters.buyer.sellingCommissionRate,
                floorRate: parameters.buyer.floorRate,
                investsSavings: parameters.buyer.investsSavings,
            },
            annualInvestmentFeeRate: parameters.annualInvestmentFeeRate,
            values: {
                employmentIncome: Array.from(paths[0].slice(0, nbMonths)),
                fiveYearInterestRates: Array.from(paths[10].slice(0, nbMonths)),
                fourYearInterestRates: Array.from(paths[11].slice(0, nbMonths)),
                threeYearInterestRates: Array.from(paths[12].slice(0, nbMonths)),
                twoYearInterestRates: Array.from(paths[13].slice(0, nbMonths)),
                oneYearInterestRates: Array.from(paths[14].slice(0, nbMonths)),
                variableInterestRates: Array.from(paths[15].slice(0, nbMonths)),
            },
            rates: {
                marketReturnRate: getRatesFromPath(paths[1]),
                rentIncrease: getRatesFromPath(paths[2]),
                renterInsuranceIncrease: getRatesFromPath(paths[4]),
                ownerInsuranceIncrease: getRatesFromPath(paths[3]),
                maintenanceIncrease: getRatesFromPath(paths[5]),
                propertyTaxIncrease: getRatesFromPath(paths[6]),
                condoFeeIncrease: getRatesFromPath(paths[7]),
                appreciationIncrease: getRatesFromPath(paths[8]),
                sellingFixedFeesIncrease: getRatesFromPath(paths[9]),
            },
        }, {
            winVariableOnly: !options.details?.iterations &&
                !options.details?.quantiles,
            onRecord,
            winVariable: parameters.winVariable,
            groups: options.details?.iterationsGroups,
            adjustToInflation: options.adjustToInflation,
        });
        // The results array always contains exactly 1 entry per category, pushed in
        // order: renter, buyerFixed, buyerVariable. Stride is always 1.
        const r0 = iterationResults[0]; // renter
        const r1 = iterationResults[1]; // buyerFixed
        const r2 = iterationResults[2]; // buyerVariable
        const w = r0.amount >= r1.amount && r0.amount >= r2.amount
            ? r0
            : r1.amount >= r2.amount
                ? r1
                : r2;
        winnersMonthIndex[i] = w.monthIndex;
        winnersAmount[i] = w.amount;
        winnersCategory[i] = exports.WINNER_CATEGORIES.indexOf(w.category);
    }
    if (start) {
        (0, index_js_1.prettyDuration)(start, { log: true, prefix: "Completed in " });
    }
    const toColumnarResult = (m, rows, cols) => {
        const data = {};
        const keys = [];
        for (const [k, v] of m) {
            data[k] = v;
            keys.push(k);
        }
        return { data, rows, cols, keys };
    };
    const empty = () => ({
        data: {},
        rows: 0,
        cols: nbMonths,
        keys: [],
    });
    // Compute monthly quantiles from the column-major detailsColumnar buffer.
    // Per-month slice is buf.subarray(mi * n, (mi+1) * n) — contiguous, cache-friendly.
    let monthlyQuantilesResult = empty();
    if (detailsColumnar && options.details?.quantiles) {
        const qs = options.details.quantiles;
        const nqs = qs.length;
        const n = parameters.iterations;
        // Pre-compute floor/ceil indices and interpolation weights for each quantile.
        const qLower = new Int32Array(nqs);
        const qUpper = new Int32Array(nqs);
        const qWeight = new Float64Array(nqs);
        for (let qi = 0; qi < nqs; qi++) {
            const idx = qs[qi] * (n - 1);
            qLower[qi] = Math.floor(idx);
            qUpper[qi] = Math.ceil(idx);
            qWeight[qi] = idx - qLower[qi];
        }
        const monthlyQuantilesColumnar = new Map();
        const sortBuf = new Float64Array(n);
        for (const [key, buf] of detailsColumnar) {
            const out = new Float64Array(nqs * nbMonths);
            monthlyQuantilesColumnar.set(key, out);
            for (let mi = 0; mi < nbMonths; mi++) {
                // Contiguous subarray for this month across all iterations.
                sortBuf.set(buf.subarray(mi * n, (mi + 1) * n));
                sortBuf.sort(); // Float64Array.prototype.sort natively performs a numeric sort
                for (let qi = 0; qi < nqs; qi++) {
                    const lo = qLower[qi];
                    const hi = qUpper[qi];
                    const w = qWeight[qi];
                    out[qi * nbMonths + mi] = lo === hi
                        ? sortBuf[lo]
                        : sortBuf[lo] + w * (sortBuf[hi] - sortBuf[lo]);
                }
            }
        }
        monthlyQuantilesResult = toColumnarResult(monthlyQuantilesColumnar, qs.length, nbMonths);
    }
    // Produce row-major monthlyIterations via a single transpose of detailsColumnar.
    // Input layout:  buf[mi * iterations + i]  (column-major)
    // Output layout: out[i  * nbMonths   + mi] (row-major, as decodeMonteCarloMonthlyIterations expects)
    let monthlyIterationsResult = empty();
    if (detailsColumnar && options.details?.iterations) {
        const n = parameters.iterations;
        const rowMajor = new Map();
        for (const [key, buf] of detailsColumnar) {
            const out = new Float64Array(n * nbMonths);
            for (let mi = 0; mi < nbMonths; mi++) {
                const base = mi * n;
                for (let i = 0; i < n; i++) {
                    out[i * nbMonths + mi] = buf[base + i];
                }
            }
            rowMajor.set(key, out);
        }
        monthlyIterationsResult = toColumnarResult(rowMajor, n, nbMonths);
    }
    return {
        values: valuesColumnar
            ? toColumnarResult(valuesColumnar, parameters.iterations, nbMonths)
            : empty(),
        winners: {
            monthIndex: winnersMonthIndex,
            amount: winnersAmount,
            category: winnersCategory,
        },
        details: {
            monthlyIterations: monthlyIterationsResult,
            monthlyQuantiles: monthlyQuantilesResult,
        },
    };
}
exports.default = simulateRentVsBuyMonteCarlo;
