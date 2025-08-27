import jstat from "jstat";

// Extract just the chi-square distribution functions we need
const { chisquare } = jstat;

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
export default function performChiSquaredGoodnessOfFitTest(
  data: { [key: string]: unknown }[],
  categoryKey: string,
  observedKey: string,
  expectedKey: string,
): {
  chiSquared: number;
  degreesOfFreedom: number;
  pValue: number;
  warnings: string[];
} {
  // --- 1. Input validation ---
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error("Data must be a non-empty array.");
  }

  // --- 2. Helper function to extract and validate data ---
  const extractValue = (
    item: { [key: string]: unknown },
    key: string,
    index: number,
    expectedType: string,
  ): string | number => {
    const value = item[key];
    if (expectedType === "number") {
      if (typeof value !== "number" || !isFinite(value) || value < 0) {
        throw new Error(
          `Invalid data at index ${index}. Expected a non-negative finite number for key "${key}", but received: ${
            JSON.stringify(value)
          }.`,
        );
      }
      return value;
    } else if (expectedType === "string") {
      if (typeof value !== "string" && typeof value !== "number") {
        throw new Error(
          `Invalid data at index ${index}. Expected a string or number for key "${key}", but received: ${
            JSON.stringify(value)
          }.`,
        );
      }
      return value;
    }
    throw new Error(
      `Invalid expectedType: ${expectedType}. Must be "number" or "string".`,
    );
  };

  // --- 3. Process data ---
  const observedFreqs: { [category: string]: number } = {};
  const expectedFreqs: { [category: string]: number } = {};

  data.forEach((item, index) => {
    const category = String(extractValue(item, categoryKey, index, "string"));
    const observed = extractValue(item, observedKey, index, "number") as number;
    const expected = extractValue(item, expectedKey, index, "number") as number;

    if (!observedFreqs[category]) {
      observedFreqs[category] = 0;
      expectedFreqs[category] = 0;
    }
    observedFreqs[category] += observed;
    expectedFreqs[category] += expected;
  });

  // --- 4. Validate expected frequencies and totals ---
  const categories = Object.keys(observedFreqs);
  categories.forEach((category) => {
    if (expectedFreqs[category] <= 0) {
      throw new Error(
        `Expected frequency must be greater than 0 for category "${category}".`,
      );
    }
  });

  // Check if total observed equals total expected (allowing small rounding differences)
  const totalObserved = Object.values(observedFreqs).reduce(
    (sum, freq) => sum + freq,
    0,
  );
  const totalExpected = Object.values(expectedFreqs).reduce(
    (sum, freq) => sum + freq,
    0,
  );
  const totalDifference = Math.abs(totalObserved - totalExpected);
  const relativeDifference = totalDifference /
    Math.max(totalObserved, totalExpected);

  // Allow up to 0.1% difference to account for rounding
  if (relativeDifference > 0.001) {
    throw new Error(
      `Total observed frequencies (${totalObserved}) must approximately equal total expected frequencies (${totalExpected}). ` +
        `For goodness of fit tests, both totals should represent the same sample size.`,
    );
  }

  // --- 5. Check for low expected frequencies and generate warnings ---
  const warnings: string[] = [];
  const expectedValues = Object.values(expectedFreqs);
  const totalCategories = expectedValues.length;

  // Check if any expected frequencies are less than 1
  const belowOne = expectedValues.filter((freq) => freq < 1);
  if (belowOne.length > 0) {
    warnings.push(
      `Warning: ${belowOne.length} expected frequencies are less than 1. Chi-squared test assumptions may be violated.`,
    );
  }

  // Check if less than 80% of expected frequencies are >= 5
  const atLeastFive = expectedValues.filter((freq) => freq >= 5);
  const percentageAtLeastFive = (atLeastFive.length / totalCategories) * 100;

  if (percentageAtLeastFive < 80) {
    warnings.push(
      `Warning: Only ${
        percentageAtLeastFive.toFixed(1)
      }% of expected frequencies are ≥ 5 (recommended: ≥ 80%). Results may be unreliable.`,
    );
  }

  // Special check for df = 1 cases
  if (totalCategories === 2) {
    const belowFive = expectedValues.filter((freq) => freq < 5);
    if (belowFive.length > 0) {
      warnings.push(
        `Warning: For tests with 1 degree of freedom, all expected frequencies should be ≥ 5. Found ${belowFive.length} frequencies below 5.`,
      );
    }
  }

  // Check for very small expected frequencies that might cause numerical issues
  const verySmall = expectedValues.filter((freq) => freq < 0.5);
  if (verySmall.length > 0) {
    warnings.push(
      `Warning: ${verySmall.length} expected frequencies are very small (< 0.5). Consider combining categories or collecting more data.`,
    );
  }

  // --- 6. Calculate chi-squared statistic ---
  let chiSquared = 0;
  categories.forEach((category) => {
    const observed = observedFreqs[category];
    const expected = expectedFreqs[category];
    chiSquared += Math.pow(observed - expected, 2) / expected;
  });

  // --- 7. Degrees of freedom for goodness of fit test ---
  const degreesOfFreedom = categories.length - 1;

  // --- 8. Calculate p-value ---
  let pValue: number;
  if (degreesOfFreedom === 0) {
    // With 0 degrees of freedom, the test is meaningless
    // If observed exactly equals expected, perfect fit (p = 1)
    // If not, then it's a deterministic mismatch (p = 0)
    pValue = chiSquared === 0 ? 1 : 0;
  } else {
    pValue = calculateChiSquaredPValue(chiSquared, degreesOfFreedom);
  }

  return {
    chiSquared,
    degreesOfFreedom,
    pValue,
    warnings,
  };
}

/**
 * Calculate the p-value for a chi-squared statistic using jStat's chi-squared distribution.
 */
function calculateChiSquaredPValue(
  chiSquared: number,
  degreesOfFreedom: number,
): number {
  if (degreesOfFreedom <= 0) {
    throw new Error("Degrees of freedom must be greater than 0.");
  }

  if (chiSquared < 0) {
    throw new Error("Chi-squared statistic cannot be negative.");
  }

  // For very small chi-squared values, return 1 (no significance)
  if (chiSquared === 0) return 1;

  // Use jStat's chi-square distribution CDF for accurate p-value calculation
  // P-value = P(X >= chiSquared) = 1 - P(X <= chiSquared) = 1 - CDF(chiSquared)
  const pValue = 1 - chisquare.cdf(chiSquared, degreesOfFreedom);

  // Handle numerical issues: ensure p-value is within valid range [0, 1]
  return Math.max(Number.MIN_VALUE, Math.min(1, pValue));
}
