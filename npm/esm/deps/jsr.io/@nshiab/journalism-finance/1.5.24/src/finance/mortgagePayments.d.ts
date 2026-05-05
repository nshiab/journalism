/**
 * Calculates and returns a detailed schedule of fixed-rate mortgage payments. This function is designed to provide a comprehensive breakdown of each payment, including the principal and interest portions, remaining balance, and cumulative amounts paid. It adheres to Canadian mortgage regulations, which typically require semi-annual compounding, but allows for customization of the compounding frequency.
 *
 * The function is flexible, supporting various payment frequencies (weekly, bi-weekly, monthly, semi-monthly, accelerated weekly, accelerated bi-weekly) and allowing for the specification of the mortgage amount, interest rate, term, and amortization period. It also includes options for rounding payment values and enabling debug logging.
 *
 * @param mortgageAmount - The total amount of the mortgage loan.
 * @param rate - The annual interest rate of the mortgage (e.g., `6.00` for 6.00%).
 * @param paymentFrequency - The frequency at which mortgage payments are made. Supported values are: `"weekly"`, `"biWeekly"`, `"monthly"`, `"semiMonthly"`, `"acceleratedWeekly"`, `"acceleratedBiWeekly"`.
 * @param term - The term of the mortgage in years. This is the length of the current mortgage contract.
 * @param amortizationPeriod - The total amortization period of the mortgage in years. This is the total time it will take to pay off the mortgage.
 * @param options - Additional options for customizing the mortgage calculation and output.
 *   @param options.id - An optional string ID to be added to each payment object in the returned array. Useful for tracking payments related to a specific mortgage.
 *   @param options.decimals - The number of decimal places to round the financial values (payment, interest, capital, balance) to. Defaults to `2`.
 *   @param options.annualCompounding - The number of times the mortgage interest should be compounded per year. Defaults to `2` (semi-annual compounding, as is standard in Canada).
 *   @param options.debug - If `true`, enables debug logging to the console, providing additional insights into the calculation process. Defaults to `false`.
 * @returns An array of objects, where each object represents a single mortgage payment and contains:
 *   - `paymentId`: A 0-based index for the payment.
 *   - `payment`: The total amount of the payment.
 *   - `interest`: The portion of the payment that goes towards interest.
 *   - `capital`: The portion of the payment that goes towards the principal (capital).
 *   - `balance`: The remaining mortgage balance after the payment.
 *   - `amountPaid`: The cumulative total amount paid so far.
 *   - `interestPaid`: The cumulative total interest paid so far.
 *   - `capitalPaid`: The cumulative total capital reimbursed so far.
 *   - `id` (optional): The ID provided in `options.id`.
 * @throws {Error} If the `amortizationPeriod` is less than the `term`, as this is an invalid mortgage configuration.
 *
 * @example
 * ```ts
 * // Return the monthly mortgage payments for a $250,000 loan with a 6.00% rate, 5-year term, and 25-year amortization.
 * const payments = mortgagePayments(250_000, 6, "monthly", 5, 25);
 * console.log(payments[0]); // First payment details
 * // Expected output (example):
 * // {
 * //   paymentId: 0,
 * //   payment: 1599.52,
 * //   interest: 1234.66,
 * //   capital: 364.86,
 * //   balance: 249635.14,
 * //   amountPaid: 1599.52,
 * //   interestPaid: 1234.66,
 * //   capitalPaid: 364.86,
 * // }
 * console.log(payments[payments.length - 1]); // Last payment details
 * // Expected output (example):
 * // {
 * //   paymentId: 59,
 * //   payment: 1599.52,
 * //   interest: 1111.58,
 * //   capital: 487.93,
 * //   balance: 224591.84,
 * //   amountPaid: 95970.99,
 * //   interestPaid: 70562.76,
 * //   capitalPaid: 25408.23,
 * // }
 * ```
 * @example
 * ```ts
 * // Attempting to set an amortization period shorter than the term will throw an error.
 * try {
 *   mortgagePayments(200_000, 5, "monthly", 10, 5); // Term (10) > Amortization (5)
 * } catch (error) {
 *   console.error("Error:", error.message);
 *   // Expected output: "Error: The amortizationPeriod should be equal or greater than the term."
 * }
 * ```
 * @category Finance
 */
export default function mortgagePayments(mortgageAmount: number, rate: number, paymentFrequency: "weekly" | "biWeekly" | "monthly" | "semiMonthly" | "acceleratedWeekly" | "acceleratedBiWeekly", term: number, amortizationPeriod: number, options?: {
    id?: string;
    decimals?: number;
    annualCompounding?: number;
    debug?: boolean;
}): {
    id?: string | undefined;
    paymentId: number;
    payment: number;
    interest: number;
    capital: number;
    balance: number;
    amountPaid: number;
    interestPaid: number;
    capitalPaid: number;
}[];
//# sourceMappingURL=mortgagePayments.d.ts.map