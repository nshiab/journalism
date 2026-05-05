/**
 * Calculates the mortgage prepayment penalty.
 *
 * For variable mortgages, the penalty is typically three months of interest.
 * For fixed mortgages, the penalty is usually the greater of three months of interest or the Interest Rate Differential (IRD).
 *
 * @param parameters - The mortgage details.
 * @param parameters.remainingMonthsToTerm - Number of months left in the current mortgage term.
 * @param parameters.mortgageBalance - The current outstanding mortgage balance.
 * @param parameters.postedInterestRate - The original posted interest rate when the mortgage was signed.
 * @param parameters.rateAdjustmentFixed - The adjustment applied to the fixed posted interest rate (added to the posted rate).
 * @param parameters.rateAdjustmentVariable - The adjustment applied to the variable posted interest rate (added to the posted rate).
 * @param parameters.currentPostedRates - A record mapping term lengths (in years) to current posted interest rates.
 * @param parameters.mortgageType - Either "fixed" or "variable".
 * @returns The calculated mortgage penalty rounded to 2 decimal places.
 * @throws Error if no current posted rate is found for the remaining term length.
 *
 * @example
 * ```ts
 * const penalty = getMortgagePenalty({
 *   remainingMonthsToTerm: 24,
 *   mortgageBalance: 300000,
 *   postedInterestRate: 0.05,
 *   rateAdjustmentFixed: -0.0125,
 *   rateAdjustmentVariable: 0,
 *   currentPostedRates: { 1: 0.045, 2: 0.0475, 3: 0.05, 4: 0.0525, 5: 0.055 },
 *   mortgageType: "fixed",
 * });
 * ```
 *
 * @example
 * ```ts
 * const penalty = getMortgagePenalty({
 *   remainingMonthsToTerm: 36,
 *   mortgageBalance: 250000,
 *   postedInterestRate: 0.06,
 *   rateAdjustmentFixed: 0,
 *   rateAdjustmentVariable: 0.0025,
 *   currentPostedRates: {}, // Not used for variable
 *   mortgageType: "variable",
 * });
 * ```
 */
export default function getMortgagePenalty(parameters: {
    remainingMonthsToTerm: number;
    mortgageBalance: number;
    postedInterestRate: number;
    rateAdjustmentFixed: number;
    rateAdjustmentVariable: number;
    currentPostedRates: Record<number, number>;
    mortgageType: "fixed" | "variable";
}): number;
//# sourceMappingURL=getMortgagePenalty.d.ts.map