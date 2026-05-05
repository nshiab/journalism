"use strict";
/**
 * @module
 *
 * The Journalism library (finance functions)
 *
 * To install the library with Deno, use:
 * ```bash
 * deno add jsr:@nshiab/journalism-finance
 * ```
 *
 * To install the library with Node.js, use:
 * ```bash
 * npx jsr add @nshiab/journalism-finance
 * ```
 *
 * To import a function, use:
 * ```ts
 * import { functionName } from "@nshiab/journalism-finance";
 * ```
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.variableMortgagePayments = exports.simulateRentVsBuyMonteCarlo = exports.simulateRentVsBuy = exports.mortgagePayments = exports.mortgageMaxAmount = exports.mortgageInsurancePremium = exports.getYahooFinanceData = exports.getSalesTax = exports.getRentVsBuyCholeskyMatrix = exports.getMortgagePenalty = exports.getMinimumDownPayment = exports.getLandTransferTax = exports.getIncomeTax = exports.decodeMonteCarloWinners = exports.decodeMonteCarloValues = exports.decodeMonteCarloMonthlyQuantiles = exports.decodeMonteCarloMonthlyIterations = exports.adjustToInflation = void 0;
const adjustToInflation_js_1 = __importDefault(require("./finance/adjustToInflation.js"));
exports.adjustToInflation = adjustToInflation_js_1.default;
const mortgagePayments_js_1 = __importDefault(require("./finance/mortgagePayments.js"));
exports.mortgagePayments = mortgagePayments_js_1.default;
const mortgageInsurancePremium_js_1 = __importDefault(require("./finance/mortgageInsurancePremium.js"));
exports.mortgageInsurancePremium = mortgageInsurancePremium_js_1.default;
const mortgageMaxAmount_js_1 = __importDefault(require("./finance/mortgageMaxAmount.js"));
exports.mortgageMaxAmount = mortgageMaxAmount_js_1.default;
const getMinimumDownPayment_js_1 = __importDefault(require("./finance/getMinimumDownPayment.js"));
exports.getMinimumDownPayment = getMinimumDownPayment_js_1.default;
const getYahooFinanceData_js_1 = __importDefault(require("./finance/getYahooFinanceData.js"));
exports.getYahooFinanceData = getYahooFinanceData_js_1.default;
const variableMortgagePayments_js_1 = __importDefault(require("./finance/variableMortgagePayments.js"));
exports.variableMortgagePayments = variableMortgagePayments_js_1.default;
const simulateRentVsBuy_js_1 = __importDefault(require("./finance/simulateRentVsBuy.js"));
exports.simulateRentVsBuy = simulateRentVsBuy_js_1.default;
const simulateRentVsBuyMonteCarlo_js_1 = __importDefault(require("./finance/simulateRentVsBuyMonteCarlo.js"));
exports.simulateRentVsBuyMonteCarlo = simulateRentVsBuyMonteCarlo_js_1.default;
const getRentVsBuyCholeskyMatrix_js_1 = __importDefault(require("./finance/helpers/rentVsBuy/getRentVsBuyCholeskyMatrix.js"));
exports.getRentVsBuyCholeskyMatrix = getRentVsBuyCholeskyMatrix_js_1.default;
const getMortgagePenalty_js_1 = __importDefault(require("./finance/getMortgagePenalty.js"));
exports.getMortgagePenalty = getMortgagePenalty_js_1.default;
const getSalesTax_js_1 = __importDefault(require("./finance/getSalesTax.js"));
exports.getSalesTax = getSalesTax_js_1.default;
const getIncomeTax_js_1 = __importDefault(require("./finance/getIncomeTax.js"));
exports.getIncomeTax = getIncomeTax_js_1.default;
const decodeMonteCarloResults_js_1 = require("./finance/decodeMonteCarloResults.js");
Object.defineProperty(exports, "decodeMonteCarloMonthlyIterations", { enumerable: true, get: function () { return decodeMonteCarloResults_js_1.decodeMonteCarloMonthlyIterations; } });
Object.defineProperty(exports, "decodeMonteCarloMonthlyQuantiles", { enumerable: true, get: function () { return decodeMonteCarloResults_js_1.decodeMonteCarloMonthlyQuantiles; } });
Object.defineProperty(exports, "decodeMonteCarloValues", { enumerable: true, get: function () { return decodeMonteCarloResults_js_1.decodeMonteCarloValues; } });
Object.defineProperty(exports, "decodeMonteCarloWinners", { enumerable: true, get: function () { return decodeMonteCarloResults_js_1.decodeMonteCarloWinners; } });
const getLandTransferTax_js_1 = __importDefault(require("./finance/getLandTransferTax.js"));
exports.getLandTransferTax = getLandTransferTax_js_1.default;
