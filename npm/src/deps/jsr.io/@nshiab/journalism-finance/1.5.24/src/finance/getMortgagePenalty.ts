import { round } from "../../../../journalism-format/1.1.7/src/index.js";

const R2 = { decimals: 2 };

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
export default function getMortgagePenalty(
  parameters: {
    remainingMonthsToTerm: number;
    mortgageBalance: number;
    postedInterestRate: number;
    rateAdjustmentFixed: number;
    rateAdjustmentVariable: number;
    currentPostedRates: Record<number, number>;
    mortgageType: "fixed" | "variable";
  },
): number {
  const {
    remainingMonthsToTerm,
    mortgageBalance,
    postedInterestRate,
    rateAdjustmentFixed,
    rateAdjustmentVariable,
    currentPostedRates,
    mortgageType,
  } = parameters;

  // If term is done, no penalty
  if (remainingMonthsToTerm === 0) {
    return 0;
  }

  if (rateAdjustmentFixed !== 0 && rateAdjustmentVariable !== 0) {
    throw new Error(
      "Both fixed and variable rate adjustments cannot be non-zero at the same time.",
    );
  }

  const effectiveRate = Math.max(
    0,
    postedInterestRate + rateAdjustmentFixed +
      rateAdjustmentVariable,
  );

  if (mortgageType === "variable") {
    // Three months interest penalty
    const threeMonthsPenalty = round(
      (mortgageBalance * effectiveRate * 3) / 12,
      R2,
    );

    return threeMonthsPenalty;
  } else {
    // Looking for current rate
    const remainingYearsToTerm = remainingMonthsToTerm / 12;
    const termForRate = Math.round(remainingYearsToTerm);
    const comparisonRate =
      currentPostedRates[termForRate === 0 ? 1 : termForRate];
    if (comparisonRate === undefined) {
      throw new Error(
        `No current posted rate provided for a ${termForRate} year term.`,
      );
    }

    // Three months interest penalty
    const threeMonthsPenalty = round(
      (mortgageBalance * effectiveRate * 3) / 12,
      R2,
    );

    // IRD (Interest Rate Differential) penalty
    const irdRate = Math.max(
      0,
      effectiveRate - (comparisonRate + rateAdjustmentFixed),
    );
    const fixedMortgagePenalty = round(
      mortgageBalance * irdRate * remainingYearsToTerm,
      R2,
    );

    // Return the greater of three months interest or IRD penalty
    return Math.max(threeMonthsPenalty, fixedMortgagePenalty);
  }
}
