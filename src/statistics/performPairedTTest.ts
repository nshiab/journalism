/**
 * Performs a paired t-test to determine if there is a significant difference between two related samples.
 *
 * The paired t-test is used when comparing two measurements from the same subjects or entities,
 * such as before and after an event, policy change, or intervention. It tests whether the mean difference between paired observations
 * is significantly different from zero.
 *
 * **When to use this function:**
 * - Use when you have two measurements from the same subjects or entities (before/after an event, pre/post policy change)
 * - When comparing two related conditions or matched pairs (same districts, candidates, regions, etc.)
 * - When you want to control for individual variation between subjects
 * - When data differences are approximately normally distributed
 *
 * **Test types:**
 * - **"two-tailed"** (default): Tests if the mean difference is significantly different from zero
 * - **"left-tailed"**: Tests if the mean difference is significantly less than zero
 * - **"right-tailed"**: Tests if the mean difference is significantly greater than zero
 *
 * @example
 * ```ts
 * // A journalist investigating if parking fines increased after new enforcement policy
 * const parkingFineData = [
 *   { district_id: 1, fines_before: 125, fines_after: 142 },
 *   { district_id: 2, fines_before: 98, fines_after: 108 },
 *   { district_id: 3, fines_before: 156, fines_after: 175 },
 *   { district_id: 4, fines_before: 87, fines_after: 95 },
 *   { district_id: 5, fines_before: 203, fines_after: 228 },
 *   { district_id: 6, fines_before: 134, fines_after: 149 },
 * ];
 *
 * const result = performPairedTTest(parkingFineData, "fines_before", "fines_after");
 * console.log(`Mean increase in fines: ${result.meanDifference.toFixed(2)} per month`);
 * console.log(`T-statistic: ${result.tStatistic.toFixed(3)}`);
 * console.log(`P-value: ${result.pValue.toFixed(4)}`);
 *
 * if (result.pValue < 0.05) {
 *   console.log("Parking fines increased significantly after the new policy");
 * } else {
 *   console.log("No significant change in parking fines");
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
 * // Test if after_ads - before_ads > 0 (increase in vote share)
 * const testResult = performPairedTTest(
 *   campaignData,
 *   "before_ads",
 *   "after_ads",
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
 * @param options - Optional configuration object.
 * @param options.tail - The type of test to perform: "two-tailed" (default), "left-tailed", or "right-tailed".
 * @returns An object containing comprehensive test results including sample statistics, differences, degrees of freedom, t-statistic, and p-value.
 *
 * @category Statistics
 */
export default function performPairedTTest(
  pairedData: { [key: string]: unknown }[],
  firstKey: string,
  secondKey: string,
  options: {
    tail?: "two-tailed" | "left-tailed" | "right-tailed";
  } = {},
): {
  sampleSize: number;
  firstMean: number;
  secondMean: number;
  meanDifference: number;
  differenceStdDev: number;
  differenceVariance: number;
  degreesOfFreedom: number;
  tStatistic: number;
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

  // --- 2. Extract paired values ---
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

  // Sample variance (with Bessel's correction: n-1 denominator)
  const calculateSampleVariance = (data: number[], mean: number): number => {
    const sumSquaredDeviations = data.reduce(
      (sum, val) => sum + Math.pow(val - mean, 2),
      0,
    );
    return sumSquaredDeviations / (data.length - 1);
  };

  // --- 5. Calculate differences (first - second) ---
  const differences = first.map((val, i) => val - second[i]);

  // --- 6. Calculate statistics ---
  const firstMean = calculateMean(first);
  const secondMean = calculateMean(second);
  const meanDifference = calculateMean(differences);
  const differenceVariance = calculateSampleVariance(
    differences,
    meanDifference,
  );
  const differenceStdDev = Math.sqrt(differenceVariance);

  // --- 6. Extract tail option with default ---
  const { tail = "two-tailed" } = options;

  // --- 7. Calculate t-statistic ---
  const standardError = differenceStdDev / Math.sqrt(sampleSize);
  const tStatistic = meanDifference / standardError;
  const degreesOfFreedom = sampleSize - 1;

  // --- 8. Calculate P-Value using t-distribution ---
  // Implementation of the incomplete beta function for t-distribution CDF
  const betaIncomplete = (x: number, a: number, b: number): number => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;

    // Use continued fraction approximation for the incomplete beta function
    // This is a simplified implementation suitable for t-distribution calculations
    const precision = 1e-10;
    let result = 0;
    let term = 1;
    let n = 0;

    // Series expansion for B(x;a,b)/B(a,b)
    while (Math.abs(term) > precision && n < 1000) {
      if (n === 0) {
        term = Math.pow(x, a) * Math.pow(1 - x, b) / a;
      } else {
        term *= x * (a + n - 1) / (a + 2 * n - 1) * (b - n) / (n + 1);
      }
      result += term;
      n++;
    }

    return result;
  };

  // t-distribution CDF using the relationship with incomplete beta function
  const tCdf = (t: number, df: number): number => {
    if (df <= 0) throw new Error("Degrees of freedom must be positive");

    // For large degrees of freedom, approximate with standard normal
    if (df > 1000) {
      // Standard normal CDF approximation
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
          (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t *
            Math.exp(-x * x);
        return sign * y;
      };
      return 0.5 * (1 + erf(t / Math.sqrt(2)));
    }

    // For small degrees of freedom, use the exact t-distribution formula
    if (t === 0) return 0.5;

    const x = df / (df + t * t);
    const prob = 0.5 * betaIncomplete(x, df / 2, 0.5);

    return t > 0 ? 1 - prob : prob;
  };

  // --- 9. Calculate P-Value based on tail type ---
  let pValue: number;
  if (tail === "two-tailed") {
    // Two-tailed: P(|T| > |t|) = 2 * P(T > |t|)
    const absT = Math.abs(tStatistic);
    pValue = 2 * (1 - tCdf(absT, degreesOfFreedom));
  } else if (tail === "right-tailed") {
    // Right-tailed: P(T > t) = 1 - P(T ≤ t)
    pValue = 1 - tCdf(tStatistic, degreesOfFreedom);
  } else if (tail === "left-tailed") {
    // Left-tailed: P(T < t) = P(T ≤ t)
    pValue = tCdf(tStatistic, degreesOfFreedom);
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
    differenceStdDev,
    differenceVariance,
    degreesOfFreedom,
    tStatistic,
    pValue,
  };
}
