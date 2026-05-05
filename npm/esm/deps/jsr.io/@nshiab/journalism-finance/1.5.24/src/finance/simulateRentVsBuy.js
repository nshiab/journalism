import computeBalances from "./helpers/rentVsBuy/computeBalances.js";
import computeExpenses from "./helpers/rentVsBuy/computeExpenses.js";
import computeGains from "./helpers/rentVsBuy/computeGains.js";
import computeSale from "./helpers/rentVsBuy/computeSale.js";
import getPersona from "./helpers/rentVsBuy/getPersona.js";
import incrementParameters from "./helpers/rentVsBuy/incrementParameters.js";
import precomputeMortgagePayments from "./helpers/rentVsBuy/precomputeMortgagePayments.js";
import toResults from "./helpers/rentVsBuy/toResults.js";
import mortgageInsurancePremium from "./mortgageInsurancePremium.js";
import getMinimumDownPayment from "./getMinimumDownPayment.js";
import getSalesTax from "./getSalesTax.js";
import getLandTransferTax, { getProvinceFromCity, } from "./getLandTransferTax.js";
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
export default function simulateRentVsBuy(parameters, options = {}) {
    const results = [];
    if (options.winVariableOnly && !options.winVariable) {
        throw new Error("simulateRentVsBuy: winVariableOnly requires winVariable to be set.");
    }
    const province = getProvinceFromCity(parameters.city);
    const downPaymentMin = getMinimumDownPayment(parameters.buyer.purchasePrice);
    if (parameters.buyer.downPayment < downPaymentMin) {
        throw new Error(`The down payment is less than the minimum required down payment (${parameters.buyer.downPayment} < ${downPaymentMin}).`);
    }
    // We keep track of amounts in structured objects
    const renter = getPersona({
        startingMonthlyRent: parameters.renter.startingMonthlyRent,
        securityDeposit: parameters.renter.securityDeposit,
        startingMonthlyInsurance: parameters.renter.startingMonthlyInsurance,
        downPayment: 0,
        purchasePrice: 0,
        homeValue: 0,
        insurancePremium: 0,
        fixedRateAdjustment: 0,
        variableRateAdjustment: 0,
        purchaseFixedFees: 0,
        landTransferTax: 0,
        startingAnnualMaintenanceCost: 0,
        startingAnnualPropertyTax: 0,
        startingMonthlyCondoFees: 0,
        sellingFixedFees: 0,
        sellingCommissionRate: 0,
        floorRate: 0,
        investsSavings: true, // Renter always invests savings
    });
    const insurancePremium = mortgageInsurancePremium(parameters.buyer.purchasePrice, parameters.buyer.downPayment);
    const landTransferTax = getLandTransferTax(parameters.city, parameters.buyer.purchasePrice, 2026, parameters.buyer.firstTimeOwner);
    const buyerFixed = getPersona({
        startingMonthlyRent: 0,
        securityDeposit: 0,
        startingMonthlyInsurance: parameters.buyer.startingMonthlyInsurance,
        downPayment: parameters.buyer.downPayment,
        purchasePrice: parameters.buyer.purchasePrice,
        insurancePremium,
        landTransferTax,
        homeValue: parameters.buyer.purchasePrice,
        fixedRateAdjustment: parameters.buyer.fixedRateAdjustment,
        variableRateAdjustment: 0, // No variable rate adjustment for fixed mortgage
        purchaseFixedFees: parameters.buyer.purchaseFixedFees,
        startingAnnualMaintenanceCost: parameters.buyer.startingAnnualMaintenanceCost,
        startingAnnualPropertyTax: parameters.buyer.startingAnnualPropertyTax,
        startingMonthlyCondoFees: parameters.buyer.startingMonthlyCondoFees,
        sellingFixedFees: parameters.buyer.sellingFixedFees,
        sellingCommissionRate: parameters.buyer.sellingCommissionRate,
        floorRate: parameters.buyer.floorRate,
        investsSavings: parameters.buyer.investsSavings,
    });
    const buyerVariable = getPersona({
        startingMonthlyRent: 0,
        securityDeposit: 0,
        startingMonthlyInsurance: parameters.buyer.startingMonthlyInsurance,
        downPayment: parameters.buyer.downPayment,
        purchasePrice: parameters.buyer.purchasePrice,
        homeValue: parameters.buyer.purchasePrice,
        insurancePremium,
        landTransferTax,
        fixedRateAdjustment: 0, // No fixed rate adjustment for variable mortgage
        variableRateAdjustment: parameters.buyer.variableRateAdjustment,
        purchaseFixedFees: parameters.buyer.purchaseFixedFees,
        startingAnnualMaintenanceCost: parameters.buyer.startingAnnualMaintenanceCost,
        startingAnnualPropertyTax: parameters.buyer.startingAnnualPropertyTax,
        startingMonthlyCondoFees: parameters.buyer.startingMonthlyCondoFees,
        sellingFixedFees: parameters.buyer.sellingFixedFees,
        sellingCommissionRate: parameters.buyer.sellingCommissionRate,
        floorRate: parameters.buyer.floorRate,
        investsSavings: parameters.buyer.investsSavings,
    });
    // We precompute the mortgage payments for the buyer for the entire period
    const { allFixedMortgagePayments, allVariableMortgagePayments } = precomputeMortgagePayments(parameters.numberOfYears, parameters.buyer.purchasePrice - parameters.buyer.downPayment, parameters.buyer.fixedRateAdjustment, parameters.buyer.variableRateAdjustment, parameters.values.fiveYearInterestRates, parameters.values.variableInterestRates, parameters.buyer.floorRate);
    const numberOfMonths = parameters.numberOfYears * 12;
    let cumulativeInflationFactor = 1;
    // Pre-compute the sales tax multiplier for home selling costs (constant for
    // a given province + year, used inside computeSale every month).
    // Use a large divisor (10000) to avoid toFixed(4) precision loss on rates
    // like Quebec's PST of 0.09975 — getSalesTax(1) would truncate it to 0.0998.
    const salesTaxMultiplier = getSalesTax(10000, province, 2025).totalTax /
        10000;
    // Pre-allocate objects that are mutated each month to avoid per-iteration heap allocations.
    const currentPostedRates = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
    };
    const flooredRatesFixed = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
    };
    const flooredRatesVariable = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
    };
    for (let monthIndex = 0; monthIndex < numberOfMonths; monthIndex++) {
        const year = parameters.startingYear + Math.floor(monthIndex / 12);
        const inflationMultiplier = 1 / cumulativeInflationFactor;
        const currentFixedMortgagePayment = allFixedMortgagePayments[monthIndex];
        const currentVariableMortgagePayment = allVariableMortgagePayments[monthIndex];
        const currentMarketReturnRate = parameters.rates.marketReturnRate[monthIndex];
        // We compute the expenses
        const { totalMonthlyExpenses: renterTotalMonthlyExpenses, } = computeExpenses(monthIndex, renter, null);
        const { totalMonthlyExpenses: buyerFixedTotalMonthlyExpenses, } = computeExpenses(monthIndex, buyerFixed, currentFixedMortgagePayment);
        const { totalMonthlyExpenses: buyerVariableTotalMonthlyExpenses, } = computeExpenses(monthIndex, buyerVariable, currentVariableMortgagePayment);
        // We compute the monthly savings
        const maxMonthlyExpenses = Math.max(renterTotalMonthlyExpenses, buyerFixedTotalMonthlyExpenses, buyerVariableTotalMonthlyExpenses);
        // We compute the gains
        computeGains(year, renter, null, currentMarketReturnRate, renterTotalMonthlyExpenses, maxMonthlyExpenses, parameters.tfsaContributions, parameters.couple, parameters.annualInvestmentFeeRate);
        computeGains(year, buyerFixed, currentFixedMortgagePayment, currentMarketReturnRate, buyerFixedTotalMonthlyExpenses, maxMonthlyExpenses, parameters.tfsaContributions, parameters.couple, parameters.annualInvestmentFeeRate);
        computeGains(year, buyerVariable, currentVariableMortgagePayment, currentMarketReturnRate, buyerVariableTotalMonthlyExpenses, maxMonthlyExpenses, parameters.tfsaContributions, parameters.couple, parameters.annualInvestmentFeeRate);
        // Now we simulate a sale of all assets
        // Mutate pre-allocated objects to avoid per-iteration heap allocations.
        currentPostedRates[1] = parameters.values.oneYearInterestRates[monthIndex];
        currentPostedRates[2] = parameters.values.twoYearInterestRates[monthIndex];
        currentPostedRates[3] =
            parameters.values.threeYearInterestRates[monthIndex];
        currentPostedRates[4] = parameters.values.fourYearInterestRates[monthIndex];
        currentPostedRates[5] = parameters.values.fiveYearInterestRates[monthIndex];
        // Pre-apply floor rate for fixed buyer.
        const fixedAdj = parameters.buyer.fixedRateAdjustment;
        const fixedFloor = parameters.buyer.floorRate;
        flooredRatesFixed[1] = Math.max(fixedFloor, currentPostedRates[1] + fixedAdj);
        flooredRatesFixed[2] = Math.max(fixedFloor, currentPostedRates[2] + fixedAdj);
        flooredRatesFixed[3] = Math.max(fixedFloor, currentPostedRates[3] + fixedAdj);
        flooredRatesFixed[4] = Math.max(fixedFloor, currentPostedRates[4] + fixedAdj);
        flooredRatesFixed[5] = Math.max(fixedFloor, currentPostedRates[5] + fixedAdj);
        // Variable buyer has no fixed-rate adjustment.
        const variableFloor = parameters.buyer.floorRate;
        flooredRatesVariable[1] = Math.max(variableFloor, currentPostedRates[1]);
        flooredRatesVariable[2] = Math.max(variableFloor, currentPostedRates[2]);
        flooredRatesVariable[3] = Math.max(variableFloor, currentPostedRates[3]);
        flooredRatesVariable[4] = Math.max(variableFloor, currentPostedRates[4]);
        flooredRatesVariable[5] = Math.max(variableFloor, currentPostedRates[5]);
        computeSale(monthIndex, renter, parameters.values.employmentIncome[monthIndex], null, null, null, options.winVariableOnly ?? false, numberOfMonths, province, parameters.couple, salesTaxMultiplier);
        computeSale(monthIndex, buyerFixed, parameters.values.employmentIncome[monthIndex], currentFixedMortgagePayment, flooredRatesFixed, "fixed", options.winVariableOnly ?? false, numberOfMonths, province, parameters.couple, salesTaxMultiplier);
        computeSale(monthIndex, buyerVariable, parameters.values.employmentIncome[monthIndex], currentVariableMortgagePayment, flooredRatesVariable, "variable", options.winVariableOnly ?? false, numberOfMonths, province, parameters.couple, salesTaxMultiplier);
        // We compute the balances
        computeBalances(renter, options.winVariableOnly ?? false, monthIndex, numberOfMonths);
        computeBalances(buyerFixed, options.winVariableOnly ?? false, monthIndex, numberOfMonths);
        computeBalances(buyerVariable, options.winVariableOnly ?? false, monthIndex, numberOfMonths);
        // We push all results for this month
        toResults("renter", renter, results, monthIndex, numberOfMonths, options.winVariableOnly ?? false, null, parameters.values.employmentIncome[monthIndex], inflationMultiplier, options.onRecord, options.winVariable, options.groups);
        toResults("buyerFixed", buyerFixed, results, monthIndex, numberOfMonths, options.winVariableOnly ?? false, currentFixedMortgagePayment, parameters.values.employmentIncome[monthIndex], inflationMultiplier, options.onRecord, options.winVariable, options.groups);
        toResults("buyerVariable", buyerVariable, results, monthIndex, numberOfMonths, options.winVariableOnly ?? false, currentVariableMortgagePayment, parameters.values.employmentIncome[monthIndex], inflationMultiplier, options.onRecord, options.winVariable, options.groups);
        // We increment the parameters for next month
        incrementParameters(monthIndex, renter, parameters.rates);
        incrementParameters(monthIndex, buyerFixed, parameters.rates);
        incrementParameters(monthIndex, buyerVariable, parameters.rates);
        if (options.adjustToInflation) {
            cumulativeInflationFactor *= 1 +
                parameters.rates[options.adjustToInflation][monthIndex];
        }
    }
    return results;
}
