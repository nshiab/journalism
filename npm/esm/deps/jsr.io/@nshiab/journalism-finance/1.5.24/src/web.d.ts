/**
 * This module provides a collection of functions to be used in web applications.
 *
 * To import a function, use:
 * ```ts
 * import { functionName } from "@nshiab/journalism-finance/web";
 * ```
 *
 * @module
 */
import adjustToInflation from "./finance/adjustToInflation.js";
import mortgagePayments from "./finance/mortgagePayments.js";
import mortgageInsurancePremium from "./finance/mortgageInsurancePremium.js";
import mortgageMaxAmount from "./finance/mortgageMaxAmount.js";
import variableMortgagePayments from "./finance/variableMortgagePayments.js";
import simulateRentVsBuy from "./finance/simulateRentVsBuy.js";
import simulateRentVsBuyMonteCarlo, { WINNER_CATEGORIES } from "./finance/simulateRentVsBuyMonteCarlo.js";
import getMortgagePenalty from "./finance/getMortgagePenalty.js";
import getRentVsBuyCholeskyMatrix from "./finance/helpers/rentVsBuy/getRentVsBuyCholeskyMatrix.js";
import getSalesTax from "./finance/getSalesTax.js";
import getIncomeTax from "./finance/getIncomeTax.js";
import { decodeMonteCarloMonthlyIterations, decodeMonteCarloMonthlyQuantiles, decodeMonteCarloValues, decodeMonteCarloWinners } from "./finance/decodeMonteCarloResults.js";
import type { BaseOptions, ColumnarResult, ColumnarReturn, MqCategory, MqGroup, MqVariable, SimParams, WinnersColumnar } from "./finance/simulateRentVsBuyMonteCarlo.js";
import type { StochasticData, StochasticVariable } from "./finance/helpers/rentVsBuy/getRentVsBuyCholeskyMatrix.js";
import getLandTransferTax from "./finance/getLandTransferTax.js";
export { adjustToInflation, decodeMonteCarloMonthlyIterations, decodeMonteCarloMonthlyQuantiles, decodeMonteCarloValues, decodeMonteCarloWinners, getIncomeTax, getLandTransferTax, getMortgagePenalty, getRentVsBuyCholeskyMatrix, getSalesTax, mortgageInsurancePremium, mortgageMaxAmount, mortgagePayments, simulateRentVsBuy, simulateRentVsBuyMonteCarlo, variableMortgagePayments, WINNER_CATEGORIES, };
export type { BaseOptions, ColumnarResult, ColumnarReturn, MqCategory, MqGroup, MqVariable, SimParams, StochasticData, StochasticVariable, WinnersColumnar, };
//# sourceMappingURL=web.d.ts.map