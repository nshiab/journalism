/**
 * Performs a paired z-test to determine if there is a significant difference between two related samples when the population standard deviation of differences is known.
 *
 * The paired z-test is used when comparing two measurements from the same subjects or entities,
 * such as before and after an event, policy change, or intervention, and when the population standard deviation of the differences is known.
 * It tests whether the mean difference between paired observations is significantly different from zero.
 *
 * **When to use this function:**
 * - Use when you have two measurements from the same subjects or entities (before/after an event, pre/post policy change)
 * - When comparing two related conditions or matched pairs (same districts, candidates, regions, etc.)
 * - When the population standard deviation of differences is known
 * - When you have a large sample size (typically n ≥ 30) or when data differences are normally distributed
 * - When you want to control for individual variation between subjects
 *
 * **Test types:**
 * - **"two-tailed"** (default): Tests if the mean difference is significantly different from zero
 * - **"left-tailed"**: Tests if the mean difference is significantly less than zero
 * - **"right-tailed"**: Tests if the mean difference is significantly greater than zero
 *
 * @example
 * ```ts
 * // A journalist analyzing if property taxes increased after a new municipal budget
 * const propertyTaxData = [
 *   { property_id: 1, tax_2023: 4500, tax_2024: 4720 },
 *   { property_id: 2, tax_2023: 3200, tax_2024: 3350 },
 *   { property_id: 3, tax_2023: 5800, tax_2024: 6100 },
 *   { property_id: 4, tax_2023: 2900, tax_2024: 3050 },
 *   { property_id: 5, tax_2023: 6200, tax_2024: 6500 },
 *   { property_id: 6, tax_2023: 4100, tax_2024: 4300 },
 * ];
 *
 * const knownPopulationStdDev = 180; // Known standard deviation of tax differences from historical data. This represents typical year-to-year variation in property tax changes. Must be obtained from previous studies or municipal records. This is just an example value.
 *
 * const result = performPairedZTest(
 *   propertyTaxData,
 *   "tax_2023",
 *   "tax_2024",
 *   knownPopulationStdDev
 * );
 *
 * console.log(`Average tax increase: $${result.meanDifference.toFixed(2)}`);
 * console.log(`Z-statistic: ${result.zStatistic.toFixed(3)}`);
 * console.log(`P-value: ${result.pValue.toFixed(4)}`);
 *
 * if (result.pValue < 0.05) {
 *   console.log("Property taxes increased significantly after the new budget");
 * } else {
 *   console.log("No significant change in property taxes");
 * }
 * ```
 *
 * @example
 * ```ts
 * // Testing if campaign spending affects vote share (right-tailed test)
 * const campaignData = [
 *   { district_id: 1, before_ads: 32.5, after_ads: 38.2 },
 *   { district_id: 2, before_ads: 28.9, after_ads: 34.1 },
 *   { district_id: 3, before_ads: 41.3, after_ads: 43.7 },
 *   { district_id: 4, before_ads: 25.6, after_ads: 31.9 },
 *   { district_id: 5, before_ads: 36.8, after_ads: 40.3 },
 * ];
 *
 * const knownStdDev = 4.2; // Known standard deviation of vote share differences from polling research. This represents typical variation in how much vote share changes before/after campaign events. Obtained from electoral studies or polling firms. This is just an example value.
 *
 * // Test if after_ads - before_ads > 0 (increase in vote share)
 * const testResult = performPairedZTest(
 *   campaignData,
 *   "before_ads",
 *   "after_ads",
 *   knownStdDev,
 *   { tail: "right-tailed" }
 * );
 *
 * console.log(`Mean vote share increase: ${testResult.meanDifference.toFixed(2)}%`);
 * if (testResult.pValue < 0.05) {
 *   console.log("Campaign ads show significant increase in vote share!");
 * } else {
 *   console.log("Campaign ads don't show significant increase in vote share");
 * }
 * ```
 *
 * @param pairedData - An array of objects containing paired observations. Each object must contain both specified keys with numeric values.
 * @param firstKey - The key for the first measurement in each pair (e.g., "before_event", "baseline", "pre_policy").
 * @param secondKey - The key for the second measurement in each pair (e.g., "after_event", "follow_up", "post_policy").
 * @param populationStdDev - The known population standard deviation of the differences.
 * @param options - Optional configuration object.
 * @param options.tail - The type of test to perform: "two-tailed" (default), "left-tailed", or "right-tailed".
 * @returns An object containing comprehensive test results including sample statistics, differences, z-statistic, and p-value.
 *
 * @category Statistics
 */
export default function performPairedZTest(
  pairedData: { [key: string]: unknown }[],
  firstKey: string,
  secondKey: string,
  populationStdDev: number,
  options: {
    tail?: "two-tailed" | "left-tailed" | "right-tailed";
  } = {},
): {
  sampleSize: number;
  firstMean: number;
  secondMean: number;
  meanDifference: number;
  populationStdDev: number;
  zStatistic: number;
  pValue: number;
} {
  // --- 1. Helper function to safely extract and validate numeric data ---
  const extractPairedNumericValues = (
    data: { [key: string]: unknown }[],
    key1: string,
    key2: string,
  ): { first: number[]; second: number[] } => {
    const first: number[] = [];
    const second: number[] = [];

    data.forEach((item, index) => {
      const value1 = item[key1];
      const value2 = item[key2];

      if (typeof value1 !== "number" || !isFinite(value1)) {
        throw new Error(
          `Invalid data at index ${index}. Expected a finite number for key "${key1}", but received: ${
            JSON.stringify(value1)
          }.`,
        );
      }
      if (typeof value2 !== "number" || !isFinite(value2)) {
        throw new Error(
          `Invalid data at index ${index}. Expected a finite number for key "${key2}", but received: ${
            JSON.stringify(value2)
          }.`,
        );
      }

      first.push(value1);
      second.push(value2);
    });

    return { first, second };
  };

  // --- 2. Validate inputs ---
  if (
    typeof populationStdDev !== "number" || !isFinite(populationStdDev) ||
    populationStdDev <= 0
  ) {
    throw new Error(
      `Invalid population standard deviation. Expected a positive finite number, but received: ${
        JSON.stringify(populationStdDev)
      }.`,
    );
  }

  // --- 3. Extract paired values ---
  const { first, second } = extractPairedNumericValues(
    pairedData,
    firstKey,
    secondKey,
  );
  const sampleSize = first.length;

  if (sampleSize < 2) {
    throw new Error(
      "Paired data must contain at least 2 pairs.",
    );
  }

  // --- 4. Calculation helpers ---
  const calculateMean = (data: number[]): number =>
    data.reduce((a, b) => a + b, 0) / data.length;

  // --- 5. Calculate differences (first - second) ---
  const differences = first.map((val, i) => val - second[i]);

  // --- 6. Calculate statistics ---
  const firstMean = calculateMean(first);
  const secondMean = calculateMean(second);
  const meanDifference = calculateMean(differences);

  // --- 7. Extract tail option with default ---
  const { tail = "two-tailed" } = options;

  // --- 8. Calculate z-statistic ---
  const standardError = populationStdDev / Math.sqrt(sampleSize);
  const zStatistic = meanDifference / standardError;

  // --- 9. Calculate P-Value using standard normal distribution ---
  const erf = (x: number): number => {
    const a1 = 0.254829592;
    const a2 = -0.284496736;
    const a3 = 1.421413741;
    const a4 = -1.453152027;
    const a5 = 1.061405429;
    const p = 0.3275911;
    const sign = x >= 0 ? 1 : -1;
    x = Math.abs(x);
    const t = 1.0 / (1.0 + p * x);
    const y = 1.0 -
      (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    return sign * y;
  };

  const cdf = (val: number): number => 0.5 * (1 + erf(val / Math.sqrt(2)));

  // --- 10. Calculate P-Value based on tail type ---
  let pValue: number;
  if (tail === "two-tailed") {
    // Two-tailed: P(|Z| > |z|) = 2 * P(Z > |z|)
    const absZ = Math.abs(zStatistic);
    pValue = 2 * (1 - cdf(absZ));
  } else if (tail === "right-tailed") {
    // Right-tailed: P(Z > z) = 1 - P(Z ≤ z)
    pValue = 1 - cdf(zStatistic);
  } else if (tail === "left-tailed") {
    // Left-tailed: P(Z < z) = P(Z ≤ z)
    pValue = cdf(zStatistic);
  } else {
    throw new Error(
      `Invalid tail option: ${tail}. Use "two-tailed", "left-tailed", or "right-tailed".`,
    );
  }

  return {
    sampleSize,
    firstMean,
    secondMean,
    meanDifference,
    populationStdDev,
    zStatistic,
    pValue,
  };
}
