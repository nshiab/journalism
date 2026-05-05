"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = precomputeMortgagePayments;
const index_js_1 = require("../../../../../../journalism-format/1.1.7/src/index.js");
const mortgagePayments_js_1 = __importDefault(require("../../mortgagePayments.js"));
const variableMortgagePayments_js_1 = __importDefault(require("../../variableMortgagePayments.js"));
function precomputeMortgagePayments(numberOfYears, startingMortgageAmount, fixedRateAdjustment, variableRateAdjustment, fixedInterestRates, variableInterestRates, floorRate) {
    const TERM_YEARS = 5;
    const TERM_MONTHS = TERM_YEARS * 12;
    const AMORTIZATION_YEARS = 25;
    // We precompute all mortgage payments for the entire period for fixed-rate mortgages
    const allFixedMortgagePayments = [];
    for (let month = 0; month < numberOfYears * 12; month += TERM_MONTHS) {
        const effectiveInterestRate = (0, index_js_1.round)(Math.max(floorRate, fixedInterestRates[month] + fixedRateAdjustment) *
            100, { decimals: 2 });
        const mortgageAmount = allFixedMortgagePayments[allFixedMortgagePayments.length - 1]
            ? allFixedMortgagePayments[allFixedMortgagePayments.length - 1].balance
            : startingMortgageAmount;
        const payments = (0, mortgagePayments_js_1.default)(mortgageAmount, effectiveInterestRate, "monthly", TERM_YEARS, AMORTIZATION_YEARS - (month / 12), { decimals: 2 });
        const effInterestRate = (0, index_js_1.round)(effectiveInterestRate / 100, { decimals: 4 });
        const postedIntRate = fixedInterestRates[month];
        for (let i = 0; i < payments.length; i++) {
            const payment = payments[i];
            allFixedMortgagePayments.push({
                paymentId: payment.paymentId,
                payment: payment.payment,
                interest: payment.interest,
                capital: payment.capital,
                balance: payment.balance,
                amountPaid: payment.amountPaid,
                interestPaid: payment.interestPaid,
                capitalPaid: payment.capitalPaid,
                effectiveInterestRate: effInterestRate,
                postedInterestRate: postedIntRate,
                fixedRateAdjustment: fixedRateAdjustment,
                variableRateAdjustment: 0, // No rate adjustment for fixed-rate mortgages
            });
        }
    }
    const allVariableMortgagePayments = [];
    if (variableInterestRates.length < numberOfYears * 12) {
        throw new Error("Not enough variable interest rates provided");
    }
    for (let month = 0; month < numberOfYears * 12; month += TERM_MONTHS) {
        const mortgageAmount = allVariableMortgagePayments[allVariableMortgagePayments.length - 1]
            ? allVariableMortgagePayments[allVariableMortgagePayments.length - 1]
                .balance
            : startingMortgageAmount;
        const monthlyEffectiveRates = new Array(TERM_MONTHS);
        for (let i = 0; i < TERM_MONTHS; i++) {
            monthlyEffectiveRates[i] = (0, index_js_1.round)(Math.max(floorRate, variableInterestRates[month + i] + variableRateAdjustment) * 100, { decimals: 2 });
        }
        const payments = (0, variableMortgagePayments_js_1.default)(mortgageAmount, monthlyEffectiveRates, TERM_YEARS, AMORTIZATION_YEARS - (month / 12), {
            decimals: 2,
        });
        for (let i = 0; i < payments.length; i++) {
            const payment = payments[i];
            allVariableMortgagePayments.push({
                paymentId: payment.paymentId,
                payment: payment.payment,
                interest: payment.interest,
                capital: payment.capital,
                balance: payment.balance,
                amountPaid: payment.amountPaid,
                interestPaid: payment.interestPaid,
                capitalPaid: payment.capitalPaid,
                effectiveInterestRate: (0, index_js_1.round)(payment.rate / 100, { decimals: 4 }),
                postedInterestRate: variableInterestRates[month + i],
                fixedRateAdjustment: 0, // No rate adjustment for variable-rate mortgages
                variableRateAdjustment: variableRateAdjustment,
            });
        }
    }
    return { allFixedMortgagePayments, allVariableMortgagePayments };
}
