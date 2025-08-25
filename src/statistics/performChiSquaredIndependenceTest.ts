/**
 * Performs a Chi-Squared independence test to determine if two categorical variables are statistically independent.
 *
 * The Chi-Squared independence test examines whether there is a statistically significant association between two categorical variables by comparing observed frequencies in a contingency table against expected frequencies calculated under the assumption of independence.
 *
 * **When to use this function:**
 * - Use for testing independence between two categorical variables (e.g., gender vs voting preference)
 * - When you have categorical data organized in frequency counts
 * - When testing hypotheses about associations between variables
 * - For analyzing cross-tabulated survey data
 *
 * @example
 * ```ts
 * // A journalist investigating if voting preference is independent of age group
 * const votingData = [
 *   { age_group: "18-30", candidate: "A", count: 45 },
 *   { age_group: "18-30", candidate: "B", count: 55 },
 *   { age_group: "31-50", candidate: "A", count: 60 },
 *   { age_group: "31-50", candidate: "B", count: 40 },
 *   { age_group: "51+", candidate: "A", count: 70 },
 *   { age_group: "51+", candidate: "B", count: 30 },
 * ];
 *
 * const result = performChiSquaredIndependenceTest(votingData, "age_group", "candidate", "count");
 *
 * console.log(`Chi-squared statistic: ${result.chiSquared.toFixed(3)}`);
 * console.log(`Degrees of freedom: ${result.degreesOfFreedom}`);
 * console.log(`P-value: ${result.pValue.toFixed(4)}`);
 *
 * if (result.pValue < 0.05) {
 *   console.log("Voting preference is significantly associated with age group");
 * } else {
 *   console.log("Voting preference is independent of age group");
 * }
 *
 * // Check for any warnings about test assumptions
 * if (result.warnings.length > 0) {
 *   console.log("Test assumption warnings:");
 *   result.warnings.forEach(warning => console.log("- " + warning));
 * }
 * ```
 *
 * @example
 * ```ts
 * // Testing association between education level and income category
 * const educationIncomeData = [
 *   { education: "high_school", income: "low", count: 150 },
 *   { education: "high_school", income: "medium", count: 100 },
 *   { education: "high_school", income: "high", count: 50 },
 *   { education: "college", income: "low", count: 80 },
 *   { education: "college", income: "medium", count: 120 },
 *   { education: "college", income: "high", count: 100 },
 *   { education: "graduate", income: "low", count: 30 },
 *   { education: "graduate", income: "medium", count: 70 },
 *   { education: "graduate", income: "high", count: 150 },
 * ];
 *
 * const result = performChiSquaredIndependenceTest(
 *   educationIncomeData,
 *   "education",
 *   "income",
 *   "count"
 * );
 *
 * if (result.pValue < 0.01) {
 *   console.log("Strong evidence that education and income are associated");
 * }
 * ```
 *
 * @param data - An array of objects containing the categorical data and frequency counts.
 * @param rowVariable - The key for the first categorical variable (rows in contingency table).
 * @param colVariable - The key for the second categorical variable (columns in contingency table).
 * @param countKey - The key containing the frequency count for each combination.
 * @returns An object containing the chi-squared statistic, degrees of freedom, p-value, contingency table details, and any warnings about test assumptions.
 *
 * @category Statistics
 */
export default function performChiSquaredIndependenceTest(
  data: { [key: string]: unknown }[],
  rowVariable: string,
  colVariable: string,
  countKey: string,
): {
  chiSquared: number;
  degreesOfFreedom: number;
  pValue: number;
  observedFrequencies: { [key: string]: { [key: string]: number } };
  expectedFrequencies: { [key: string]: { [key: string]: number } };
  contingencyTable: {
    rows: string[];
    columns: string[];
    rowTotals: number[];
    colTotals: number[];
    grandTotal: number;
  };
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

  // --- 3. Build contingency table ---
  const contingencyData: { [row: string]: { [col: string]: number } } = {};
  const rowCategories = new Set<string>();
  const colCategories = new Set<string>();

  data.forEach((item, index) => {
    const rowValue = String(extractValue(item, rowVariable, index, "string"));
    const colValue = String(extractValue(item, colVariable, index, "string"));
    const count = extractValue(item, countKey, index, "number") as number;

    rowCategories.add(rowValue);
    colCategories.add(colValue);

    if (!contingencyData[rowValue]) {
      contingencyData[rowValue] = {};
    }
    if (!contingencyData[rowValue][colValue]) {
      contingencyData[rowValue][colValue] = 0;
    }
    contingencyData[rowValue][colValue] += count;
  });

  const rows = Array.from(rowCategories).sort();
  const columns = Array.from(colCategories).sort();

  // --- 4. Calculate totals ---
  const rowTotals = rows.map((row) =>
    columns.reduce((sum, col) => sum + (contingencyData[row]?.[col] || 0), 0)
  );
  const colTotals = columns.map((col) =>
    rows.reduce((sum, row) => sum + (contingencyData[row]?.[col] || 0), 0)
  );
  const grandTotal = rowTotals.reduce((sum, total) => sum + total, 0);

  if (grandTotal === 0) {
    throw new Error("Total count cannot be zero.");
  }

  // --- 5. Calculate expected frequencies ---
  const expectedFrequencies: { [row: string]: { [col: string]: number } } = {};
  rows.forEach((row, i) => {
    expectedFrequencies[row] = {};
    columns.forEach((col, j) => {
      expectedFrequencies[row][col] = (rowTotals[i] * colTotals[j]) /
        grandTotal;
    });
  });

  // --- 6. Check for low expected frequencies and generate warnings ---
  const warnings: string[] = [];
  const expectedValues: number[] = [];

  // Collect all expected frequency values
  rows.forEach((row) => {
    columns.forEach((col) => {
      expectedValues.push(expectedFrequencies[row][col]);
    });
  });

  const totalCells = expectedValues.length;

  // Calculate degrees of freedom for independence test (needed for warnings)
  const degreesOfFreedom = (rows.length - 1) * (columns.length - 1);

  // Check if any expected frequencies are less than 1
  const belowOne = expectedValues.filter((freq) => freq < 1);
  if (belowOne.length > 0) {
    warnings.push(
      `Warning: ${belowOne.length} expected frequencies are less than 1. Chi-squared test assumptions may be violated.`,
    );
  }

  // Check if less than 80% of expected frequencies are >= 5
  const atLeastFive = expectedValues.filter((freq) => freq >= 5);
  const percentageAtLeastFive = (atLeastFive.length / totalCells) * 100;

  if (percentageAtLeastFive < 80) {
    warnings.push(
      `Warning: Only ${
        percentageAtLeastFive.toFixed(1)
      }% of expected frequencies are ≥ 5 (recommended: ≥ 80%). Results may be unreliable.`,
    );
  }

  // Special check for df = 1 cases (2x2 tables)
  if (degreesOfFreedom === 1) {
    const belowFive = expectedValues.filter((freq) => freq < 5);
    if (belowFive.length > 0) {
      warnings.push(
        `Warning: For 2×2 contingency tables, all expected frequencies should be ≥ 5. Found ${belowFive.length} frequencies below 5.`,
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

  // --- 7. Calculate chi-squared statistic ---
  let chiSquared = 0;
  rows.forEach((row) => {
    columns.forEach((col) => {
      const observed = contingencyData[row]?.[col] || 0;
      const expected = expectedFrequencies[row][col];
      if (expected > 0) {
        chiSquared += Math.pow(observed - expected, 2) / expected;
      }
    });
  });

  // --- 8. Calculate p-value ---
  const pValue = calculateChiSquaredPValue(chiSquared, degreesOfFreedom);

  return {
    chiSquared,
    degreesOfFreedom,
    pValue,
    observedFrequencies: contingencyData,
    expectedFrequencies,
    contingencyTable: {
      rows,
      columns,
      rowTotals,
      colTotals,
      grandTotal,
    },
    warnings,
  };
}

/**
 * Calculate the p-value for a chi-squared statistic using the chi-squared distribution.
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

  // Use Wilson-Hilferty normal approximation for more robust calculation
  if (degreesOfFreedom >= 1) {
    // Wilson-Hilferty transformation
    const h = 2 / (9 * degreesOfFreedom);
    const z = (Math.pow(chiSquared / degreesOfFreedom, 1 / 3) - (1 - h)) /
      Math.sqrt(h);

    // Convert to p-value using normal distribution
    const pValue = 1 - normalCDF(z);

    // Ensure p-value is within valid range
    return Math.max(0, Math.min(1, pValue));
  }

  // Fallback for edge cases
  return chiSquared > 10 ? 0.01 : 0.1;
}

/**
 * Normal cumulative distribution function
 */
function normalCDF(x: number): number {
  return 0.5 * (1 + erf(x / Math.sqrt(2)));
}

// Error function helper
function erf(x: number): number {
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
}
