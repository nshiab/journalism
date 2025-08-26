/**
 * Performs a paired z-test to determine if there is a significant difference between two related samples when the population standard deviation of differences is known.
 *
 * The paired z-test is used when comparing measurements from the same subjects before and after a treatment,
 * or when comparing two related conditions, and when the population standard deviation of the differences is known.
 * It tests whether the mean difference between paired observations is significantly different from zero (or a hypothesized difference).
 *
 * **When to use this function:**
 * - Use when you have two measurements from the same subjects (before/after, pre/post treatment)
 * - When comparing two related conditions or matched pairs
 * - When the population standard deviation of differences is known
 * - When you have a large sample size (typically n ≥ 30) or when data differences are normally distributed
 * - When you want to control for individual variation between subjects
 *
 * **Test types:**
 * - **"two-tailed"** (default): Tests if the mean difference is significantly different from the hypothesized difference
 * - **"left-tailed"**: Tests if the mean difference is significantly less than the hypothesized difference
 * - **"right-tailed"**: Tests if the mean difference is significantly greater than the hypothesized difference
 *
 * @example
 * ```ts
 * // A journalist investigating if a new fitness program improves performance scores
 * const fitnessScores = [
 *   { participant_id: 1, name: "Alice", before_score: 75, after_score: 82 },
 *   { participant_id: 2, name: "Bob", before_score: 68, after_score: 71 },
 *   { participant_id: 3, name: "Carol", before_score: 85, after_score: 89 },
 *   { participant_id: 4, name: "David", before_score: 72, after_score: 78 },
 *   { participant_id: 5, name: "Eve", before_score: 79, after_score: 84 },
 *   { participant_id: 6, name: "Frank", before_score: 81, after_score: 83 },
 * ];
 *
 * const knownPopulationStdDev = 5.2; // Known from previous studies
 *
 * const result = performPairedZTest(
 *   fitnessScores,
 *   "before_score",
 *   "after_score",
 *   knownPopulationStdDev
 * );
 *
 * console.log(`Mean difference: ${result.meanDifference.toFixed(2)} points`);
 * console.log(`Z-statistic: ${result.zStatistic.toFixed(3)}`);
 * console.log(`P-value: ${result.pValue.toFixed(4)}`);
 *
 * if (result.pValue < 0.05) {
 *   console.log("The fitness program shows a significant effect on performance scores");
 * } else {
 *   console.log("No significant difference found in performance scores");
 * }
 * ```
 *
 * @example
 * ```ts
 * // Testing if a new medication reduces blood pressure (right-tailed test)
 * const bloodPressureData = [
 *   { patient_id: 1, before_bp: 140, after_bp: 132 },
 *   { patient_id: 2, before_bp: 155, after_bp: 148 },
 *   { patient_id: 3, before_bp: 138, after_bp: 135 },
 *   { patient_id: 4, before_bp: 162, after_bp: 151 },
 *   { patient_id: 5, before_bp: 145, after_bp: 139 },
 * ];
 *
 * const knownStdDev = 8.5; // Known population standard deviation of BP differences
 *
 * // Test if before_bp - after_bp > 0 (reduction in BP)
 * const testResult = performPairedZTest(
 *   bloodPressureData,
 *   "before_bp",
 *   "after_bp",
 *   knownStdDev,
 *   { tail: "right-tailed", hypothesizedDifference: 0 }
 * );
 *
 * console.log(`Mean BP reduction: ${testResult.meanDifference.toFixed(2)} mmHg`);
 * if (testResult.pValue < 0.05) {
 *   console.log("Medication shows significant blood pressure reduction!");
 * } else {
 *   console.log("Medication doesn't show significant blood pressure reduction");
 * }
 * ```
 *
 * @param pairedData - An array of objects containing paired observations. Each object must contain both specified keys with numeric values.
 * @param firstKey - The key for the first measurement in each pair (e.g., "before", "pretest").
 * @param secondKey - The key for the second measurement in each pair (e.g., "after", "posttest").
 * @param populationStdDev - The known population standard deviation of the differences.
 * @param options - Optional configuration object.
 * @param options.tail - The type of test to perform: "two-tailed" (default), "left-tailed", or "right-tailed".
 * @param options.hypothesizedDifference - The hypothesized difference between pairs (default: 0).
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
    hypothesizedDifference?: number;
  } = {},
): {
  sampleSize: number;
  firstMean: number;
  secondMean: number;
  meanDifference: number;
  hypothesizedDifference: number;
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
  const { hypothesizedDifference = 0 } = options;
  if (
    typeof hypothesizedDifference !== "number" ||
    !isFinite(hypothesizedDifference)
  ) {
    throw new Error(
      `Invalid hypothesized difference. Expected a finite number, but received: ${
        JSON.stringify(hypothesizedDifference)
      }.`,
    );
  }

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
  const zStatistic = (meanDifference - hypothesizedDifference) / standardError;

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
    hypothesizedDifference,
    populationStdDev,
    zStatistic,
    pValue,
  };
}
