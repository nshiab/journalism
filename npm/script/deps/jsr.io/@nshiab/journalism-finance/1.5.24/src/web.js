"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WINNER_CATEGORIES = exports.variableMortgagePayments = exports.simulateRentVsBuyMonteCarlo = exports.simulateRentVsBuy = exports.mortgagePayments = exports.mortgageMaxAmount = exports.mortgageInsurancePremium = exports.getSalesTax = exports.getRentVsBuyCholeskyMatrix = exports.getMortgagePenalty = exports.getLandTransferTax = exports.getIncomeTax = exports.decodeMonteCarloWinners = exports.decodeMonteCarloValues = exports.decodeMonteCarloMonthlyQuantiles = exports.decodeMonteCarloMonthlyIterations = exports.adjustToInflation = void 0;
const adjustToInflation_js_1 = __importDefault(require("./finance/adjustToInflation.js"));
exports.adjustToInflation = adjustToInflation_js_1.default;
const mortgagePayments_js_1 = __importDefault(require("./finance/mortgagePayments.js"));
exports.mortgagePayments = mortgagePayments_js_1.default;
const mortgageInsurancePremium_js_1 = __importDefault(require("./finance/mortgageInsurancePremium.js"));
exports.mortgageInsurancePremium = mortgageInsurancePremium_js_1.default;
const mortgageMaxAmount_js_1 = __importDefault(require("./finance/mortgageMaxAmount.js"));
exports.mortgageMaxAmount = mortgageMaxAmount_js_1.default;
const variableMortgagePayments_js_1 = __importDefault(require("./finance/variableMortgagePayments.js"));
exports.variableMortgagePayments = variableMortgagePayments_js_1.default;
const simulateRentVsBuy_js_1 = __importDefault(require("./finance/simulateRentVsBuy.js"));
exports.simulateRentVsBuy = simulateRentVsBuy_js_1.default;
const simulateRentVsBuyMonteCarlo_js_1 = __importStar(require("./finance/simulateRentVsBuyMonteCarlo.js"));
exports.simulateRentVsBuyMonteCarlo = simulateRentVsBuyMonteCarlo_js_1.default;
Object.defineProperty(exports, "WINNER_CATEGORIES", { enumerable: true, get: function () { return simulateRentVsBuyMonteCarlo_js_1.WINNER_CATEGORIES; } });
const getMortgagePenalty_js_1 = __importDefault(require("./finance/getMortgagePenalty.js"));
exports.getMortgagePenalty = getMortgagePenalty_js_1.default;
const getRentVsBuyCholeskyMatrix_js_1 = __importDefault(require("./finance/helpers/rentVsBuy/getRentVsBuyCholeskyMatrix.js"));
exports.getRentVsBuyCholeskyMatrix = getRentVsBuyCholeskyMatrix_js_1.default;
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
