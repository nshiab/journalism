/**
 * Performs a Z-test to determine if a sample mean is significantly different from a population mean.
 *
 * The function compares the mean of a sample against the mean of a known population to test the null hypothesis. It automatically applies the finite population correction (FPC) when the sample size exceeds 5% of the population size, which provides more accurate results for smaller populations.
 *
 * **When to use this function:**
 * - Use when you have a complete population dataset and want to test if a sample represents that population
 * - When you need to validate whether observed differences between sample and population means are statistically significant
 * - When data is approximately normally distributed or sample size is large (Central Limit Theorem applies)
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
 * @param key - The key in each data object that contains the numeric values to analyze for the statistical test.
 * @param options - Optional configuration object.
 * @param options.tail - The type of test to perform: "two-tailed" (default), "left-tailed", or "right-tailed".
 * @returns An object containing comprehensive test results including population and sample statistics, population variance and standard deviation, test statistics (z-score), p-value, and whether finite population correction was applied.
 *
 * @category Statistics
 */
export default function performZTest(
  populationData: { [key: string]: unknown }[],
  sampleData: { [key: string]: unknown }[],
  key: string,
  options: { tail?: "two-tailed" | "left-tailed" | "right-tailed" } = {},
): {
  populationSize: number;
  sampleSize: number;
  populationMean: number;
  sampleMean: number;
  populationStdDev: number;
  populationVariance: number;
  fpcApplied: boolean;
  zScore: number;
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

  // --- 2. Extract values and get sizes using the new helper ---
  const populationValues = extractNumericValues(populationData, "population");
  const sampleValues = extractNumericValues(sampleData, "sample");
  const populationSize = populationValues.length;
  const sampleSize = sampleValues.length;

  if (populationSize < 2 || sampleSize < 2) {
    throw new Error(
      "Population and sample must contain at least 2 data points.",
    );
  }

  // --- 3. Calculation helpers ---
  const calculateMean = (data: number[]): number =>
    data.reduce((a, b) => a + b, 0) / data.length;
  const calculateVariance = (data: number[], mean: number): number => {
    return calculateMean(data.map((val) => Math.pow(val - mean, 2)));
  };

  // --- 4. Calculate all necessary statistics ---
  const populationMean = calculateMean(populationValues);
  const sampleMean = calculateMean(sampleValues);
  const populationVariance = calculateVariance(
    populationValues,
    populationMean,
  );
  const populationStdDev = Math.sqrt(populationVariance);

  // --- 5. Extract tail option with default ---
  const { tail = "two-tailed" } = options;

  // --- 6. Perform the Z-Test ---
  let standardError = populationStdDev / Math.sqrt(sampleSize);
  let fpcApplied = false;

  if (sampleSize / populationSize > 0.05) {
    const fpc = Math.sqrt((populationSize - sampleSize) / (populationSize - 1));
    standardError *= fpc;
    fpcApplied = true;
  }

  const zScore = (sampleMean - populationMean) / standardError;

  // --- 7. Calculate P-Value based on tail type ---
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

  let pValue: number;
  if (tail === "two-tailed") {
    // Two-tailed: P(|Z| > |z|) = 2 * P(Z > |z|)
    const absZ = Math.abs(zScore);
    pValue = 2 * (1 - cdf(absZ));
  } else if (tail === "right-tailed") {
    // Right-tailed: P(Z > z) = 1 - P(Z ≤ z)
    pValue = 1 - cdf(zScore);
  } else if (tail === "left-tailed") {
    // Left-tailed: P(Z < z) = P(Z ≤ z)
    pValue = cdf(zScore);
  } else {
    throw new Error(
      `Invalid tail option: ${tail}. Use "two-tailed", "left-tailed", or "right-tailed".`,
    );
  }

  return {
    populationSize,
    sampleSize,
    populationMean,
    sampleMean,
    populationStdDev,
    populationVariance,
    fpcApplied,
    zScore,
    pValue,
  };
}
