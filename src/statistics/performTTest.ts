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
 * @param key - The key in each data object that contains the numeric values to analyze for the statistical test.
 * @param hypothesizedMean - The hypothesized population mean to test against (null hypothesis value).
 * @param options - Optional configuration object.
 * @param options.tail - The type of test to perform: "two-tailed" (default), "left-tailed", or "right-tailed".
 * @returns An object containing comprehensive test results including sample statistics, degrees of freedom, t-statistic, and p-value.
 *
 * @category Statistics
 */
export default function performTTest(
  sampleData: { [key: string]: unknown }[],
  key: string,
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
  // --- 1. Helper function to safely extract and validate numeric data ---
  const extractNumericValues = (
    data: { [key: string]: unknown }[],
    sourceName: string,
  ): number[] => {
    return data.map((item, index) => {
      const value = item[key];
      if (typeof value !== "number" || !isFinite(value)) {
        throw new Error(
          `Invalid data in ${sourceName} array at index ${index}. Expected a finite number for key "${
            String(key)
          }", but received: ${JSON.stringify(value)}.`,
        );
      }
      return value;
    });
  };

  // --- 2. Validate hypothesized mean ---
  if (typeof hypothesizedMean !== "number" || !isFinite(hypothesizedMean)) {
    throw new Error(
      `Invalid hypothesized mean. Expected a finite number, but received: ${
        JSON.stringify(hypothesizedMean)
      }.`,
    );
  }

  // --- 3. Extract values and get sample size ---
  const sampleValues = extractNumericValues(sampleData, "sample");
  const sampleSize = sampleValues.length;

  if (sampleSize < 2) {
    throw new Error(
      "Sample must contain at least 2 data points.",
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

  // --- 5. Calculate sample statistics ---
  const sampleMean = calculateMean(sampleValues);
  const sampleVariance = calculateSampleVariance(sampleValues, sampleMean);
  const sampleStdDev = Math.sqrt(sampleVariance);

  // --- 6. Extract tail option with default ---
  const { tail = "two-tailed" } = options;

  // --- 7. Calculate t-statistic ---
  const standardError = sampleStdDev / Math.sqrt(sampleSize);
  const tStatistic = (sampleMean - hypothesizedMean) / standardError;
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
    sampleMean,
    sampleStdDev,
    sampleVariance,
    hypothesizedMean,
    degreesOfFreedom,
    tStatistic,
    pValue,
  };
}
