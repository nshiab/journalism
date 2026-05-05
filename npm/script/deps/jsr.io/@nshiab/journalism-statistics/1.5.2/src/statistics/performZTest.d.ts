/**
 * Performs a one-sample Z-test to determine if a sample mean is significantly different from a population mean.
 *
 * The function compares the mean of a sample against the mean of a known population to test the null hypothesis. It automatically applies the finite population correction (FPC) when the sample size exceeds 5% of the population size, which provides more accurate results for smaller populations. This is a **one-sample Z-test** comparing a sample against a known population, not a comparison between two independent samples.
 *
 * **When to use this function:**
 * - Use when you have a complete population dataset and want to test if a sample represents that population
 * - When you need to validate whether observed differences between sample and population means are statistically significant
 * - When data is approximately normally distributed or sample size is large (Central Limit Theorem applies)
 * - For independent observations (not paired or matched data)
 *
 * **Test types:**
 * - **"two-tailed"** (default): Tests if sample mean is significantly different (higher OR lower) than population mean
 * - **"left-tailed"**: Tests if sample mean is significantly lower than population mean
 * - **"right-tailed"**: Tests if sample mean is significantly higher than population mean
 *
 * @example
 * ```ts
 * // A journalist investigating if Democratic candidates receive significantly
 * // different donation amounts compared to all political candidates (two-tailed test)
 * const allCandidates = [
 *   { candidate_id: 1, party: "Democratic", donation_amount: 2500 },
 *   { candidate_id: 2, party: "Republican", donation_amount: 3200 },
 *   { candidate_id: 3, party: "Independent", donation_amount: 1800 },
 *   { candidate_id: 4, party: "Democratic", donation_amount: 2800 },
 *   // ... complete population of all candidates (5,000 records)
 * ];
 *
 * const democraticCandidates = [
 *   { candidate_id: 1, party: "Democratic", donation_amount: 2500 },
 *   { candidate_id: 4, party: "Democratic", donation_amount: 2800 },
 *   { candidate_id: 7, party: "Democratic", donation_amount: 3100 },
 *   // ... all Democratic candidates (1,200 records)
 * ];
 *
 * const result = performZTest(allCandidates, democraticCandidates, "donation_amount");
 * console.log(`Population mean donation: $${result.populationMean.toFixed(2)}`);
 * console.log(`Democratic candidates mean: $${result.sampleMean.toFixed(2)}`);
 * console.log(`P-value: ${result.pValue.toFixed(4)}`);
 * if (result.pValue < 0.05) {
 *   console.log("Democratic candidates receive significantly different donations than average");
 * } else {
 *   console.log("Democratic candidates' donations are consistent with overall average");
 * }
 * ```
 *
 * @example
 * ```ts
 * // Testing if corporate donors give MORE than average (right-tailed test)
 * const allDonors = [
 *   { donor_id: 1, type: "individual", amount: 500 },
 *   { donor_id: 2, type: "corporate", amount: 5000 },
 *   { donor_id: 3, type: "PAC", amount: 2500 },
 *   // ... complete donor population
 * ];
 *
 * const corporateDonors = [
 *   { donor_id: 2, type: "corporate", amount: 5000 },
 *   { donor_id: 8, type: "corporate", amount: 7500 },
 *   // ... all corporate donors
 * ];
 *
 * const testResult = performZTest(allDonors, corporateDonors, "amount", { tail: "right-tailed" });
 * console.log(`All donors mean donation: $${testResult.populationMean.toFixed(2)}`);
 * console.log(`Corporate donors mean: $${testResult.sampleMean.toFixed(2)}`);
 * if (testResult.pValue < 0.05) {
 *   console.log("Corporate donors give significantly MORE than average");
 * } else {
 *   console.log("Corporate donors don't give significantly more than average");
 * }
 * ```
 *
 * @param populationData - An array of objects representing the complete population data. Each object must contain the specified key with numeric values.
 * @param sampleData - An array of objects representing the sample data to test against the population. Each object must contain the specified key with numeric values.
 * @param variableKey - The key in each data object that contains the numeric values to analyze for the statistical test.
 * @param options - Optional configuration object.
 * @param options.tail - The type of test to perform: "two-tailed" (default), "left-tailed", or "right-tailed".
 * @returns An object containing comprehensive test results including population and sample statistics, population variance and standard deviation, test statistics (z-score), p-value, and whether finite population correction was applied.
 *
 * @category Statistics
 */
export default function performZTest<T extends Record<string, unknown>>(populationData: T[], sampleData: T[], variableKey: keyof T, options?: {
    tail?: "two-tailed" | "left-tailed" | "right-tailed";
}): {
    populationSize: number;
    sampleSize: number;
    populationMean: number;
    sampleMean: number;
    populationStdDev: number;
    populationVariance: number;
    fpcApplied: boolean;
    zScore: number;
    pValue: number;
};
//# sourceMappingURL=performZTest.d.ts.map