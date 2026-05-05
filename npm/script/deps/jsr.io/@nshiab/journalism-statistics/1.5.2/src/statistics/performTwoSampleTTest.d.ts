/**
 * Performs a two-sample t-test for independent means to determine if there is a significant difference between two independent groups.
 *
 * The two-sample t-test compares the means of two independent groups when the population standard deviations are unknown.
 * It tests whether the difference between the two group means is significantly different from zero. This is a test for **independent means** (unrelated groups), not paired/related samples.
 *
 * **When to use this function:**
 * - Use when you have two separate, independent groups to compare
 * - When comparing measurements from different subjects, entities, or populations
 * - When the population standard deviations are unknown (most common case)
 * - When data in both groups are approximately normally distributed OR when you have large sample sizes (n ≥ 30-50 per group)
 * - **Robustness to non-normality**: Due to the Central Limit Theorem, the two-sample t-test becomes robust to violations of normality as sample sizes increase. For large samples (n ≥ 30-50 per group), the sampling distribution of the difference in means approaches normality even if the underlying data is not normally distributed
 * - **Small samples (n < 30 per group)**: Normality assumption is more critical for both groups. Consider checking for normality or using non-parametric alternatives (like Mann-Whitney U test) if data is heavily skewed or has extreme outliers
 * - For independent observations (not paired, matched, or related data)
 *
 * **Test types:**
 * - **"two-tailed"** (default): Tests if the group means are significantly different from each other
 * - **"left-tailed"**: Tests if group 1 mean is significantly less than group 2 mean
 * - **"right-tailed"**: Tests if group 1 mean is significantly greater than group 2 mean
 *
 * @example
 * ```ts
 * // A journalist comparing average housing prices between two different cities
 * const city1Prices = [
 *   { property_id: 1, price: 450000 },
 *   { property_id: 2, price: 520000 },
 *   { property_id: 3, price: 380000 },
 *   { property_id: 4, price: 610000 },
 *   { property_id: 5, price: 475000 },
 * ];
 *
 * const city2Prices = [
 *   { property_id: 101, price: 520000 },
 *   { property_id: 102, price: 580000 },
 *   { property_id: 103, price: 490000 },
 *   { property_id: 104, price: 660000 },
 *   { property_id: 105, price: 530000 },
 *   { property_id: 106, price: 615000 },
 * ];
 *
 * const result = performTwoSampleTTest(city1Prices, city2Prices, "price");
 * console.log(`City 1 average: $${result.group1Mean.toFixed(0)}`);
 * console.log(`City 2 average: $${result.group2Mean.toFixed(0)}`);
 * console.log(`Mean difference: $${result.meanDifference.toFixed(0)}`);
 * console.log(`T-statistic: ${result.tStatistic.toFixed(3)}`);
 * console.log(`P-value: ${result.pValue.toFixed(4)}`);
 *
 * if (result.pValue < 0.05) {
 *   console.log("Significant difference in housing prices between cities");
 * } else {
 *   console.log("No significant difference in housing prices between cities");
 * }
 * ```
 *
 * @example
 * ```ts
 * // Testing if male candidates receive higher campaign donations than female candidates (right-tailed)
 * const maleCandidates = [
 *   { candidate_id: 1, donation_total: 25000 },
 *   { candidate_id: 2, donation_total: 32000 },
 *   { candidate_id: 3, donation_total: 18000 },
 *   { candidate_id: 4, donation_total: 41000 },
 * ];
 *
 * const femaleCandidates = [
 *   { candidate_id: 101, donation_total: 22000 },
 *   { candidate_id: 102, donation_total: 28000 },
 *   { candidate_id: 103, donation_total: 19000 },
 *   { candidate_id: 104, donation_total: 35000 },
 *   { candidate_id: 105, donation_total: 24000 },
 * ];
 *
 * // Test if male average > female average
 * const testResult = performTwoSampleTTest(
 *   maleCandidates,
 *   femaleCandidates,
 *   "donation_total",
 *   { tail: "right-tailed" }
 * );
 *
 * console.log(`Male average: $${testResult.group1Mean.toFixed(0)}`);
 * console.log(`Female average: $${testResult.group2Mean.toFixed(0)}`);
 * if (testResult.pValue < 0.05) {
 *   console.log("Male candidates receive significantly higher donations");
 * } else {
 *   console.log("No significant difference in donation amounts by gender");
 * }
 * ```
 *
 * @param group1Data - An array of objects containing observations for the first group. Each object must contain the specified key with a numeric value.
 * @param group2Data - An array of objects containing observations for the second group. Each object must contain the specified key with a numeric value.
 * @param variableKey - The key for the measurement in both group objects (e.g., "income", "score", "price").
 * @param options - Optional configuration object.
 * @param options.tail - The type of test to perform: "two-tailed" (default), "left-tailed", or "right-tailed".
 * @returns An object containing comprehensive test results including sample statistics for both groups, mean difference, degrees of freedom, t-statistic, and p-value.
 *
 * @category Statistics
 */
export default function performTwoSampleTTest<T1 extends Record<string, unknown>, T2 extends Record<string, unknown>, K extends keyof T1 & keyof T2>(group1Data: T1[], group2Data: T2[], variableKey: K, options?: {
    tail?: "two-tailed" | "left-tailed" | "right-tailed";
}): {
    group1SampleSize: number;
    group2SampleSize: number;
    group1Mean: number;
    group2Mean: number;
    group1StdDev: number;
    group2StdDev: number;
    group1Variance: number;
    group2Variance: number;
    meanDifference: number;
    degreesOfFreedom: number;
    tStatistic: number;
    pValue: number;
};
//# sourceMappingURL=performTwoSampleTTest.d.ts.map