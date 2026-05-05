import jstat from "jstat";

// Extract just the t-distribution functions we need
const { studentt } = jstat;

// --- Helper functions hoisted outside main function for performance ---
/**
 * Safely extracts and validates numeric values from an array of objects
 */
const extractNumericValues = <T extends Record<string, unknown>>(
  data: T[],
  variableKey: keyof T,
): number[] => {
  return data.map((item, index) => {
    const value = item[variableKey];
    if (typeof value !== "number" || !isFinite(value)) {
      throw new Error(
        `Invalid data in sample array at index ${index}. Expected a finite number for key "${
          String(variableKey)
        }", but received: ${JSON.stringify(value)}.`,
      );
    }
    return value;
  });
};

/**
 * Calculates mean and variance in a single pass for optimal performance
 * Uses Welford's online algorithm for numerical stability
 */
const calculateMeanAndVariance = (
  data: number[],
): { mean: number; variance: number } => {
  if (data.length === 0) {
    throw new Error("Cannot calculate statistics for empty array");
  }

  if (data.length === 1) {
    return { mean: data[0], variance: 0 };
  }

  let mean = 0;
  let m2 = 0; // Sum of squares of differences from current mean

  // Welford's online algorithm - numerically stable single-pass calculation
  for (let i = 0; i < data.length; i++) {
    const delta = data[i] - mean;
    mean += delta / (i + 1);
    const delta2 = data[i] - mean;
    m2 += delta * delta2;
  }

  // Sample variance (Bessel's correction: divide by n-1)
  const variance = m2 / (data.length - 1);

  return { mean, variance };
};

/**
 * Performs a one-sample t-test for independent means to determine if a sample mean is significantly different from a hypothesized population mean.
 *
 * The function compares the mean of a sample against a hypothesized population mean when the population standard deviation is unknown. This is the most common scenario in real-world statistical analysis where we only have sample data and need to estimate the population parameters. This is a test for **independent means** (sample vs population), not related/paired samples.
 *
 * **When to use this function:**
 * - Use when you have sample data and want to test if the sample mean differs significantly from a known or hypothesized value
 * - When the population standard deviation is unknown (most common case)
 * - When data is approximately normally distributed OR when you have a large sample size (n ≥ 30-50)
 * - **Robustness to non-normality**: Due to the Central Limit Theorem, the t-test becomes robust to violations of normality as sample size increases. For large samples (n ≥ 30-50), the sampling distribution of the mean approaches normality even if the underlying data is not normally distributed
 * - **Small samples (n < 30)**: Normality assumption is more critical. Consider checking for normality or using non-parametric alternatives (like Wilcoxon signed-rank test) if data is heavily skewed or has extreme outliers
 * - For independent observations (not paired or matched data)
 *
 * **Test types:**
 * - **"two-tailed"** (default): Tests if sample mean is significantly different (higher OR lower) than hypothesized mean
 * - **"left-tailed"**: Tests if sample mean is significantly lower than hypothesized mean
 * - **"right-tailed"**: Tests if sample mean is significantly higher than hypothesized mean
 *
 * @example
 * ```ts
 * // A journalist investigating if basketball players in a local league
 * // score significantly different from the national average of 10 points per game
 * const localPlayers = [
 *   { player_id: 1, name: "John", points_per_game: 15 },
 *   { player_id: 2, name: "Sarah", points_per_game: 12 },
 *   { player_id: 3, name: "Mike", points_per_game: 18 },
 *   { player_id: 4, name: "Lisa", points_per_game: 14 },
 *   { player_id: 5, name: "Tom", points_per_game: 16 },
 *   { player_id: 6, name: "Anna", points_per_game: 13 },
 * ];
 *
 * const nationalAverage = 10; // Known population mean
 *
 * const result = performTTest(localPlayers, "points_per_game", nationalAverage);
 * console.log(`Sample mean: ${result.sampleMean.toFixed(2)} points per game`);
 * console.log(`T-statistic: ${result.tStatistic.toFixed(3)}`);
 * console.log(`P-value: ${result.pValue.toFixed(4)}`);
 *
 * if (result.pValue < 0.05) {
 *   console.log("Local players score significantly different from national average");
 * } else {
 *   console.log("Local players' scoring is consistent with national average");
 * }
 * ```
 *
 * @example
 * ```ts
 * // Testing if a new training program improves performance (right-tailed test)
 * const trainingResults = [
 *   { athlete_id: 1, improvement_score: 8.5 },
 *   { athlete_id: 2, improvement_score: 12.3 },
 *   { athlete_id: 3, improvement_score: 6.7 },
 *   { athlete_id: 4, improvement_score: 15.2 },
 *   { athlete_id: 5, improvement_score: 9.8 },
 * ];
 *
 * const expectedImprovement = 5; // Null hypothesis: no significant improvement
 *
 * const testResult = performTTest(
 *   trainingResults,
 *   "improvement_score",
 *   expectedImprovement,
 *   { tail: "right-tailed" }
 * );
 *
 * console.log(`Sample mean improvement: ${testResult.sampleMean.toFixed(2)}`);
 * if (testResult.pValue < 0.05) {
 *   console.log("Training program shows significant improvement!");
 * } else {
 *   console.log("Training program doesn't show significant improvement");
 * }
 * ```
 *
 * @param sampleData - An array of objects representing the sample data. Each object must contain the specified key with numeric values.
 * @param variableKey - The key in each data object that contains the numeric values to analyze for the statistical test.
 * @param hypothesizedMean - The hypothesized population mean to test against (null hypothesis value).
 * @param options - Optional configuration object.
 * @param options.tail - The type of test to perform: "two-tailed" (default), "left-tailed", or "right-tailed".
 * @returns An object containing comprehensive test results including sample statistics, degrees of freedom, t-statistic, and p-value.
 *
 * @category Statistics
 */
export default function performTTest<T extends Record<string, unknown>>(
  sampleData: T[],
  variableKey: keyof T,
  hypothesizedMean: number,
  options: { tail?: "two-tailed" | "left-tailed" | "right-tailed" } = {},
): {
  sampleSize: number;
  sampleMean: number;
  sampleStdDev: number;
  sampleVariance: number;
  hypothesizedMean: number;
  degreesOfFreedom: number;
  tStatistic: number;
  pValue: number;
} {
  // --- 1. Validate hypothesized mean ---
  if (typeof hypothesizedMean !== "number" || !isFinite(hypothesizedMean)) {
    throw new Error(
      `Invalid hypothesized mean. Expected a finite number, but received: ${
        JSON.stringify(hypothesizedMean)
      }.`,
    );
  }

  // --- 2. Extract and validate sample values ---
  const sampleValues = extractNumericValues(sampleData, variableKey);
  const sampleSize = sampleValues.length;

  if (sampleSize < 2) {
    throw new Error(
      "Sample must contain at least 2 data points.",
    );
  }

  // --- 3. Calculate sample statistics using single-pass algorithm ---
  const { mean: sampleMean, variance: sampleVariance } =
    calculateMeanAndVariance(sampleValues);
  const sampleStdDev = Math.sqrt(sampleVariance);

  // --- 4. Extract tail option with default ---
  const { tail = "two-tailed" } = options;

  // --- 5. Handle edge case: zero standard deviation ---
  if (sampleStdDev === 0) {
    // All sample values are identical
    // If sample mean equals hypothesized mean, no difference (p = 1)
    // If they differ, perfect significance (p = 0)
    const pValue = sampleMean === hypothesizedMean ? 1 : 0;
    const tStatistic = sampleMean === hypothesizedMean
      ? 0
      : (sampleMean > hypothesizedMean ? Infinity : -Infinity);

    return {
      sampleSize,
      sampleMean,
      sampleStdDev,
      sampleVariance,
      hypothesizedMean,
      degreesOfFreedom: sampleSize - 1,
      tStatistic,
      pValue,
    };
  }

  // --- 6. Calculate t-statistic ---
  const standardError = sampleStdDev / Math.sqrt(sampleSize);
  const tStatistic = (sampleMean - hypothesizedMean) / standardError;
  const degreesOfFreedom = sampleSize - 1;

  // --- 7. Calculate P-Value using jStat's t-distribution ---
  let pValue: number;
  if (tail === "two-tailed") {
    // Two-tailed: P(|T| > |t|) = 2 * P(T > |t|)
    const absT = Math.abs(tStatistic);
    pValue = 2 * (1 - studentt.cdf(absT, degreesOfFreedom));
  } else if (tail === "right-tailed") {
    // Right-tailed: P(T > t) = 1 - P(T ≤ t)
    pValue = 1 - studentt.cdf(tStatistic, degreesOfFreedom);
  } else if (tail === "left-tailed") {
    // Left-tailed: P(T < t) = P(T ≤ t)
    pValue = studentt.cdf(tStatistic, degreesOfFreedom);
  } else {
    throw new Error(
      `Invalid tail option: ${tail}. Use "two-tailed", "left-tailed", or "right-tailed".`,
    );
  }

  return {
    sampleSize,
    sampleMean,
    sampleStdDev,
    sampleVariance,
    hypothesizedMean,
    degreesOfFreedom,
    tStatistic,
    pValue,
  };
}
