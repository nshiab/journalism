"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = variableMortgagePayments;
const index_js_1 = require("../../../../journalism-format/1.1.7/src/index.js");
/**
 * Calculates and returns a detailed schedule of variable-rate monthly mortgage payments (VRM). This function models a Variable Rate Mortgage where the payment amount stays FIXED for the term, but rate changes affect how much goes to interest vs. principal. If rates rise too high, payments may not cover interest, causing negative amortization (balance increases).
 *
 * @param mortgageAmount - The total amount of the mortgage loan.
 * @param rates - An array of annual interest rates (e.g., `[6.00, 6.00, 5.50, 5.50, ...]` for rates in percentages). The array must contain at least as many rates as there are payments in the term. Each element corresponds to the rate for that payment period (0-based index).
 * @param term - The term of the mortgage in years. This is the length of the current mortgage contract.
 * @param amortizationPeriod - The total amortization period of the mortgage in years. This is the total time it will take to pay off the mortgage.
 * @param options - Additional options for customizing the mortgage calculation and output.
 *   @param options.id - An optional string ID to be added to each payment object in the returned array. Useful for tracking payments related to a specific mortgage.
 *   @param options.decimals - The number of decimal places to round the financial values (payment, interest, capital, balance) to. Defaults to `2`.
 *   @param options.annualCompounding - The number of times the mortgage interest should be compounded per year. Defaults to `12` (monthly compounding). Set to `2` for semi-annual compounding as is standard in Canada.
 *   @param options.debug - If `true`, enables debug logging to the console, providing additional insights into the calculation process. Defaults to `false`.
 * @returns An array of objects, where each object represents a single mortgage payment and contains:
 *   - `paymentId`: A 0-based index for the payment.
 *   - `payment`: The total amount of the payment (fixed for the term).
 *   - `interest`: The portion that goes towards interest (varies with rate changes).
 *   - `capital`: The portion that goes towards the principal (can be negative during negative amortization).
 *   - `balance`: The remaining mortgage balance after the payment (can increase if interest exceeds payment).
 *   - `amountPaid`: The cumulative total amount paid so far.
 *   - `interestPaid`: The cumulative total interest paid so far.
 *   - `capitalPaid`: The cumulative total capital reimbursed so far (can be negative).
 *   - `rate`: The annual interest rate in effect for this payment.
 *   - `id` (optional): The ID provided in `options.id`.
 * @throws {Error} If the `amortizationPeriod` is less than the `term`, as this is an invalid mortgage configuration.
 * @throws {Error} If the `rates` array does not contain enough rates for all payments in the term.
 *
 * @example
 * ```ts
 * // VRM: Payment stays fixed, but rate changes affect interest/principal split
 * // If rates rise high enough, balance can increase (negative amortization)
 * const rates = [
 *   ...Array(12).fill(6),    // Months 0-11 at 6%
 *   ...Array(12).fill(5.5),  // Months 12-23 at 5.5% (more goes to principal)
 *   ...Array(36).fill(7.5)   // Months 24-59 at 7.5% (might trigger negative amortization)
 * ];
 * const payments = variableMortgagePayments(250_000, rates, 5, 25);
 * console.log(payments[0]);  // Payment amount set based on initial rate
 * console.log(payments[12]); // Same payment, but less interest (rate dropped)
 * console.log(payments[24]); // Same payment, but more interest (rate increased)
 * ```
 * @category Finance
 */
function variableMortgagePayments(mortgageAmount, rates, term, amortizationPeriod, options = {}) {
    if (amortizationPeriod < term) {
        throw new Error("The amortizationPeriod should be equal or greater than the term.");
    }
    // Calculate number of monthly payments in the term
    const numberOfPaymentsinTerm = 12 * term;
    // Check if we have enough rates for all payments
    if (rates.length < numberOfPaymentsinTerm) {
        throw new Error(`Not enough rates provided. Expected at least ${numberOfPaymentsinTerm} rates for a ${term}-year term, but got ${rates.length}.`);
    }
    options = {
        decimals: 2,
        annualCompounding: 12,
        ...options,
    };
    const annualCompounding = options.annualCompounding;
    if (typeof annualCompounding !== "number" ||
        annualCompounding <= 0) {
        throw new Error("annualCompounding must be a positive number.");
    }
    // Helper function to calculate monthly periodic rate from annual rate
    const calculateMonthlyRate = (rate) => {
        const nominalRate = rate / 100;
        const annualEffectiveRate = Math.pow(1 + nominalRate / annualCompounding, annualCompounding);
        return Math.pow(annualEffectiveRate, 1 / 12) - 1;
    };
    // Calculate FIXED payment amount based on initial rate and amortization period
    // This payment stays the same for the entire term (VRM characteristic)
    const initialRate = rates[0];
    const initialMonthlyRate = calculateMonthlyRate(initialRate);
    const totalPaymentsInAmortization = amortizationPeriod * 12;
    const fixedPayment = initialMonthlyRate === 0
        ? mortgageAmount / totalPaymentsInAmortization
        : (initialMonthlyRate * mortgageAmount) /
            (1 - Math.pow(1 + initialMonthlyRate, -totalPaymentsInAmortization));
    const paymentSchedule = [];
    let amountPaid = 0;
    let interestPaid = 0;
    let capitalPaid = 0;
    let currentBalance = mortgageAmount;
    for (let i = 0; i < numberOfPaymentsinTerm; i++) {
        const currentRate = rates[i];
        const monthlyRate = calculateMonthlyRate(currentRate);
        // Calculate the interest owed for this payment based on CURRENT rate
        const interest = currentBalance * monthlyRate;
        // VRM: Payment is FIXED, so capital is what's left after paying interest
        // If interest exceeds payment, capital becomes negative (negative amortization)
        let capital = fixedPayment - interest;
        let balance = currentBalance - capital;
        // If balance went negative (overpayment), adjust to pay exact remaining balance
        if (balance < 0) {
            capital = currentBalance;
            balance = 0;
        }
        // Update cumulative values
        amountPaid += capital + interest;
        interestPaid += interest;
        capitalPaid += capital;
        currentBalance = balance;
        paymentSchedule.push({
            paymentId: i,
            payment: (0, index_js_1.round)(capital + interest, options),
            interest: (0, index_js_1.round)(interest, options),
            capital: (0, index_js_1.round)(capital, options),
            balance: (0, index_js_1.round)(balance, options),
            amountPaid: (0, index_js_1.round)(amountPaid, options),
            interestPaid: (0, index_js_1.round)(interestPaid, options),
            capitalPaid: (0, index_js_1.round)(capitalPaid, options),
            rate: currentRate,
        });
        if (options.debug) {
            console.log({
                paymentId: i,
                currentRate,
                monthlyRate,
                fixedPayment,
                interest,
                capital,
                balance,
                negativeAmortization: capital < 0,
            });
        }
        // If the balance is zero, stop the loop
        if (balance <= 0) {
            break;
        }
    }
    // If there is an id as options, add it to the objects before returning
    return options.id
        ? paymentSchedule.map((d) => {
            return { ...d, id: options.id };
        })
        : paymentSchedule;
}
