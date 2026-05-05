/**
 * Performs a Chi-Squared goodness of fit test to determine if observed frequencies match expected frequencies.
 *
 * The Chi-Squared goodness of fit test examines whether observed frequencies in categorical data differ significantly from expected frequencies. This test helps determine if a sample follows a particular theoretical distribution or pattern.
 *
 * **When to use this function:**
 * - Use for goodness of fit tests to see if observed data matches expected distribution
 * - When testing if a sample follows a specific theoretical distribution
 * - For validating assumptions about population proportions
 * - When comparing actual results against theoretical models
 *
 * **Important Requirements:**
 * - The sum of observed frequencies must equal the sum of expected frequencies (within 0.1% tolerance)
 * - All expected frequencies must be greater than 0
 * - For reliable results, at least 80% of expected frequencies should be ≥ 5
 * - For tests with 1 degree of freedom, all expected frequencies should be ≥ 5
 *
 * @example
 * ```ts
 * // Testing if observed crime types match expected distribution (goodness of fit)
 * const crimeData = [
 *   { crime_type: "theft", observed_count: 120, expected_count: 100 },
 *   { crime_type: "assault", observed_count: 80, expected_count: 90 },
 *   { crime_type: "fraud", observed_count: 45, expected_count: 50 },
 *   { crime_type: "vandalism", observed_count: 55, expected_count: 60 },
 * ];
 * // Note: Total observed = 300, Total expected = 300 ✓
 *
 * const testResult = performChiSquaredGoodnessOfFitTest(
 *   crimeData,
 *   "crime_type",
 *   "observed_count",
 *   "expected_count"
 * );
 *
 * console.log(`Chi-squared: ${testResult.chiSquared.toFixed(3)}`);
 * if (testResult.pValue < 0.05) {
 *   console.log("Observed crime distribution differs significantly from expected");
 * } else {
 *   console.log("Observed crime distribution matches expected pattern");
 * }
 *
 * // Check for any warnings about test assumptions
 * if (testResult.warnings.length > 0) {
 *   console.log("Test assumption warnings:");
 *   testResult.warnings.forEach(warning => console.log("- " + warning));
 * }
 * ```
 *
 * @example
 * ```ts
 * // Testing if dice rolls follow uniform distribution
 * const diceData = [
 *   { face: "1", observed: 18, expected: 20 },
 *   { face: "2", observed: 22, expected: 20 },
 *   { face: "3", observed: 16, expected: 20 },
 *   { face: "4", observed: 25, expected: 20 },
 *   { face: "5", observed: 19, expected: 20 },
 *   { face: "6", observed: 20, expected: 20 },
 * ];
 * // Note: Total observed = 120, Total expected = 120 ✓
 *
 * const result = performChiSquaredGoodnessOfFitTest(
 *   diceData,
 *   "face",
 *   "observed",
 *   "expected"
 * );
 *
 * if (result.pValue > 0.05) {
 *   console.log("Dice appears to be fair (follows uniform distribution)");
 * } else {
 *   console.log("Dice may be biased");
 * }
 * ```
 *
 * @example
 * ```ts
 * // Example that would throw an error due to mismatched totals
 * const invalidData = [
 *   { category: "A", observed: 50, expected: 40 }, // Total observed: 80
 *   { category: "B", observed: 30, expected: 25 }, // Total expected: 65
 * ];
 *
 * try {
 *   performChiSquaredGoodnessOfFitTest(invalidData, "category", "observed", "expected");
 * } catch (error) {
 *   console.log("Error:", error.message);
 *   // "Total observed frequencies (80) must approximately equal total expected frequencies (65)"
 * }
 * ```
 *
 * @param data - An array of objects containing the categorical data and frequency counts.
 * @param categoryKey - The key for the categorical variable.
 * @param observedKey - The key containing the observed frequency count for each category.
 * @param expectedKey - The key containing the expected frequency count for each category.
 * @returns An object containing the chi-squared statistic, degrees of freedom, p-value, and any warnings about test assumptions.
 *
 * @category Statistics
 */
export default function performChiSquaredGoodnessOfFitTest<T extends Record<string, unknown>>(data: T[], categoryKey: keyof T, observedKey: keyof T, expectedKey: keyof T): {
    chiSquared: number;
    degreesOfFreedom: number;
    pValue: number;
    warnings: string[];
};
//# sourceMappingURL=performChiSquaredGoodnessOfFitTest.d.ts.map