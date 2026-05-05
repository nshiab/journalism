/**
 * Performs a Chi-Squared independence test to determine if two categorical variables are statistically independent or associated.
 *
 * The Chi-Squared independence test examines whether there is a statistically significant association between two categorical variables by comparing observed frequencies against expected frequencies calculated under the assumption of independence.
 *
 * **When to use this function:**
 * - Use for testing independence between two categorical variables (e.g., gender vs voting preference)
 * - When you have categorical data organized in frequency counts
 * - When testing hypotheses about associations between variables
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
 * } else {
 *   console.log("No strong evidence of association between education and income");
 * }
 * ```
 *
 * @param data - An array of objects containing the categorical data and frequency counts.
 * @param firstVariableKey - The key for the first categorical variable.
 * @param secondVariableKey - The key for the second categorical variable.
 * @param countKey - The key containing the frequency count for each combination.
 * @returns An object containing the chi-squared statistic, degrees of freedom, p-value, contingency table details, and any warnings about test assumptions.
 *
 * @category Statistics
 */
export default function performChiSquaredIndependenceTest<T extends Record<string, unknown>>(data: T[], firstVariableKey: keyof T, secondVariableKey: keyof T, countKey: keyof T): {
    chiSquared: number;
    degreesOfFreedom: number;
    pValue: number;
    warnings: string[];
};
//# sourceMappingURL=performChiSquaredIndependenceTest.d.ts.map