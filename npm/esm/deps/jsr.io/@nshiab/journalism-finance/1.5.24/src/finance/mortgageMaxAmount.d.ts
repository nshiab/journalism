/**
 * Calculates the maximum affordable property purchase price and the corresponding mortgage amount a borrower can qualify for, based on their annual income, down payment, and current mortgage interest rates. This function is designed to simulate mortgage qualification criteria, taking into account various financial factors and debt service ratios.
 *
 * The calculation incorporates a stress test, where the interest rate used for qualification is the higher of the provided rate + 2% or 5.25% (a common benchmark in Canada). It also considers monthly debt payments, heating costs, property taxes, and condo fees to determine the Gross Debt Service (GDS) and Total Debt Service (TDS) ratios, which are critical in mortgage approvals.
 *
 * @param annualIncome - The borrower's gross annual income.
 * @param downPayment - The amount of money the borrower is putting down as a down payment.
 * @param rate - The current mortgage interest rate (e.g., 5.25 for 5.25%).
 * @param options - Additional options to fine-tune the calculation:
 *   @param options.monthlyDebtPayment - The borrower's total monthly payments for other debts (e.g., car loans, credit cards). Defaults to `0`.
 *   @param options.monthlyHeating - The estimated monthly heating costs for the property. Defaults to `175` (a common estimate, e.g., by Royal Bank of Canada).
 *   @param options.monthlyTax - The estimated monthly property tax. Defaults to `1.5%` of the purchase price annually, divided by 12 (a common estimate, e.g., by Royal Bank of Canada).
 *   @param options.monthlyCondoFees - The estimated monthly condo fees, if applicable. Defaults to `0`.
 * @returns An object containing detailed results of the mortgage affordability calculation, including:
 *   - `annualIncome`: The annual income provided.
 *   - `downPayment`: The down payment provided.
 *   - `rate`: The mortgage interest rate provided.
 *   - `rateTested`: The interest rate used for the stress test (higher of `rate + 2%` or `5.25%`).
 *   - `purchasePrice`: The maximum affordable property purchase price.
 *   - `mortgageAmount`: The maximum mortgage amount the borrower qualifies for.
 *   - `insurancePremium`: The calculated mortgage insurance premium (if applicable).
 *   - `monthlyMortgagePayment`: The estimated monthly mortgage payment.
 *   - `grossDebtServiceRatio`: The calculated Gross Debt Service (GDS) ratio.
 *   - `totalDebtServiceRatio`: The calculated Total Debt Service (TDS) ratio.
 *   - `reason`: The limiting factor for the maximum amount (e.g., "debt limit", "downPayment limit", "max purchase price").
 *   - `monthlyDebtPayment`: The monthly debt payment used in the calculation.
 *   - `monthlyHeating`: The monthly heating cost used in the calculation.
 *   - `isHeatingEstimate`: `true` if `monthlyHeating` was an estimate, `false` if provided.
 *   - `monthlyTax`: The monthly property tax used in the calculation.
 *   - `isTaxEstimate`: `true` if `monthlyTax` was an estimate, `false` if provided.
 *   - `monthlyCondoFees`: The monthly condo fees used in the calculation.
 *
 * @example
 * ```ts
 * // Calculate affordability for a borrower with $100,000 annual income, $25,000 down payment, and a 5.25% rate.
 * const results = mortgageMaxAmount(100_000, 25_000, 5.25);
 * console.log(results);
 * // Expected output:
 * // {
 * //   annualIncome: 100000,
 * //   downPayment: 25000,
 * //   rate: 5.25,
 * //   rateTested: 7.25,
 * //   purchasePrice: 307000,
 * //   mortgageAmount: 293280,
 * //   insurancePremium: 11280,
 * //   monthlyMortgagePayment: 2100,
 * //   grossDebtServiceRatio: 0.32,
 * //   totalDebtServiceRatio: 0.32,
 * //   reason: "debt limit",
 * //   monthlyDebtPayment: 0,
 * //   monthlyHeating: 175,
 * //   isHeatingEstimate: true,
 * //   monthlyTax: 385,
 * //   isTaxEstimate: true,
 * //   monthlyCondoFees: 0,
 * // }
 * ```
 * @example
 * ```ts
 * // Calculate affordability with specific monthly debt payments and property taxes.
 * const customExpensesResults = mortgageMaxAmount(120_000, 40_000, 4.5,
 *   {
 *     monthlyDebtPayment: 300,
 *     monthlyTax: 450,
 *     monthlyCondoFees: 200,
 *   },
 * );
 * console.log(customExpensesResults);
 * ```
 * @category Finance
 */
export default function mortgageMaxAmount(annualIncome: number, downPayment: number, rate: number, options?: {
    monthlyDebtPayment?: number;
    monthlyHeating?: number;
    monthlyTax?: number;
    monthlyCondoFees?: number;
}): {
    annualIncome: number;
    downPayment: number;
    rate: number;
    rateTested: number;
    purchasePrice: number;
    mortgageAmount: number;
    insurancePremium: number;
    monthlyMortgagePayment: number;
    grossDebtServiceRatio: number;
    totalDebtServiceRatio: number;
    reason: string;
    monthlyDebtPayment: number;
    monthlyHeating: number;
    isHeatingEstimate: boolean;
    monthlyTax: number;
    isTaxEstimate: boolean;
    monthlyCondoFees: number;
};
//# sourceMappingURL=mortgageMaxAmount.d.ts.map