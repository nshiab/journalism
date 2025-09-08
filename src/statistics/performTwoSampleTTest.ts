import jstat from "jstat";

// Extract just the t-distribution functions we need
const { studentt } = jstat;

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
export default function performTwoSampleTTest<
  T extends Record<string, unknown>,
>(
  group1Data: T[],
  group2Data: T[],
  variableKey: keyof T,
  options: {
    tail?: "two-tailed" | "left-tailed" | "right-tailed";
  } = {},
): {
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
} {
  // --- 1. Helper function to safely extract and validate numeric data ---
  const extractNumericValues = (
    data: T[],
    key: keyof T,
    groupName: string,
  ): number[] => {
    const values: number[] = [];

    data.forEach((item, index) => {
      const value = item[key];

      if (typeof value !== "number" || !isFinite(value)) {
        throw new Error(
          `Invalid data in ${groupName} at index ${index}. Expected a finite number for key "${
            String(key)
          }", but received: ${JSON.stringify(value)}.`,
        );
      }

      values.push(value);
    });

    return values;
  };

  // --- 2. Extract values from both groups ---
  const group1Values = extractNumericValues(group1Data, variableKey, "group1");
  const group2Values = extractNumericValues(group2Data, variableKey, "group2");

  const group1SampleSize = group1Values.length;
  const group2SampleSize = group2Values.length;

  if (group1SampleSize < 2) {
    throw new Error("Group 1 must contain at least 2 observations.");
  }
  if (group2SampleSize < 2) {
    throw new Error("Group 2 must contain at least 2 observations.");
  }

  // --- 3. Calculation helpers ---
  const calculateMean = (data: number[]): number =>
    data.reduce((a, b) => a + b, 0) / data.length;

  // Sample variance (with Bessel's correction: n-1 denominator)
  const calculateSampleVariance = (data: number[], mean: number): number => {
    const sumSquaredDeviations = data.reduce(
      (sum, val) => sum + Math.pow(val - mean, 2),
      0,
    );
    return sumSquaredDeviations / (data.length - 1);
  };

  // --- 4. Calculate statistics for both groups ---
  const group1Mean = calculateMean(group1Values);
  const group2Mean = calculateMean(group2Values);
  const group1Variance = calculateSampleVariance(group1Values, group1Mean);
  const group2Variance = calculateSampleVariance(group2Values, group2Mean);
  const group1StdDev = Math.sqrt(group1Variance);
  const group2StdDev = Math.sqrt(group2Variance);
  const meanDifference = group1Mean - group2Mean;

  // --- 5. Check for zero variance in both groups (all values identical) ---
  if (group1Variance === 0 && group2Variance === 0) {
    if (group1Mean === group2Mean) {
      // Groups are identical - no difference
      return {
        group1SampleSize,
        group2SampleSize,
        group1Mean,
        group2Mean,
        group1StdDev,
        group2StdDev,
        group1Variance,
        group2Variance,
        meanDifference,
        degreesOfFreedom: group1SampleSize + group2SampleSize - 2,
        tStatistic: 0,
        pValue: 1,
      };
    } else {
      // Means are different but no variance - infinite t-statistic
      throw new Error(
        "Cannot perform t-test: both groups have zero variance (all values are identical within each group) but different means. This indicates a perfect separation between groups.",
      );
    }
  }

  // --- 6. Extract options with defaults ---
  const { tail = "two-tailed" } = options;

  // --- 7. Calculate t-statistic and degrees of freedom using Welch's t-test (unequal variances) ---
  // Welch's t-test (unequal variances) - more robust and generally preferred
  const standardError = Math.sqrt(
    group1Variance / group1SampleSize + group2Variance / group2SampleSize,
  );
  const tStatistic = meanDifference / standardError;

  // Welch-Satterthwaite equation for degrees of freedom
  const numerator = Math.pow(
    group1Variance / group1SampleSize + group2Variance / group2SampleSize,
    2,
  );
  const denominator =
    Math.pow(group1Variance / group1SampleSize, 2) / (group1SampleSize - 1) +
    Math.pow(group2Variance / group2SampleSize, 2) / (group2SampleSize - 1);
  const degreesOfFreedom = numerator / denominator;

  // --- 8. Calculate P-Value using jStat's t-distribution ---
  let pValue: number;
  if (tail === "two-tailed") {
    const absT = Math.abs(tStatistic);
    pValue = 2 * (1 - studentt.cdf(absT, degreesOfFreedom));
  } else if (tail === "right-tailed") {
    pValue = 1 - studentt.cdf(tStatistic, degreesOfFreedom);
  } else if (tail === "left-tailed") {
    pValue = studentt.cdf(tStatistic, degreesOfFreedom);
  } else {
    throw new Error(
      `Invalid tail option: ${tail}. Use "two-tailed", "left-tailed", or "right-tailed".`,
    );
  }

  return {
    group1SampleSize,
    group2SampleSize,
    group1Mean,
    group2Mean,
    group1StdDev,
    group2StdDev,
    group1Variance,
    group2Variance,
    meanDifference,
    degreesOfFreedom,
    tStatistic,
    pValue,
  };
}
