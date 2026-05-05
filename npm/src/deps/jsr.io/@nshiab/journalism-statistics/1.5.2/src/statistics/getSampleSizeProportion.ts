/**
 * Calculates the required sample size for estimating a population proportion with a specified confidence level and margin of error.
 *
 * The function uses the finite population correction formula when the population size is known, which provides more accurate sample size calculations for smaller populations. It assumes a worst-case scenario proportion of 0.5 (50%) to ensure the calculated sample size is sufficient regardless of the actual population proportion.
 *
 * **When to use this function:**
 * - Use when you want to estimate what percentage/proportion of a population has a certain characteristic
 * - When your outcome is categorical (yes/no, pass/fail, present/absent)
 * - When you need to answer questions like "What percentage of voters support this candidate?" or "What proportion of records contain errors?"
 * - When you don't know the actual proportion in advance (this function uses the conservative 50% assumption)
 *
 * **Use `getSampleSizeMean` instead when:**
 * - You want to estimate an average value (mean) rather than a proportion
 * - Your data is continuous/numeric (income, temperature, test scores, etc.)
 * - You need to answer questions like "What's the average salary?" or "What's the mean test score?"
 *
 * @example
 * ```ts
 * // A journalist has a dataset of 1,000 records and wants to know how many
 * // data points to manually double-check to ensure their analysis is accurate
 * const recordsToVerify = getSampleSizeProportion(1000, 95, 5);
 * console.log(`You need to manually verify ${recordsToVerify} records to be 95% confident in your analysis with a 5% margin of error`); // 278
 * ```
 *
 * @example
 * ```ts
 * // Example for survey planning
 * const requiredSample = getSampleSizeProportion(50000, 95, 4);
 * console.log(`For a city survey with 95% confidence and 4% margin of error, you need ${requiredSample} respondents.`); // 594
 * ```
 *
 * @param populationSize - The size of the population from which the sample will be drawn. Used in the finite population correction formula for more accurate sample size calculations.
 * @param confidenceLevel - The desired confidence level for the sample. Must be 90, 95, or 99. The higher the confidence level, the larger the returned sample size.
 * @param marginOfError - The acceptable margin of error as a percentage (1-100). The smaller the margin of error, the larger the returned sample size.
 * @returns The minimum required sample size, rounded up to the nearest whole number.
 *
 * @category Statistics
 */
export default function getSampleSizeProportion(
  populationSize: number,
  confidenceLevel: 90 | 95 | 99,
  marginOfError: number,
): number {
  if (populationSize <= 0) {
    throw new Error("Population size must be greater than 0.");
  }

  let zScore: number;
  if (confidenceLevel === 90) {
    zScore = 1.645;
  } else if (confidenceLevel === 95) {
    zScore = 1.96;
  } else if (confidenceLevel === 99) {
    zScore = 2.576;
  } else {
    throw new Error("Invalid confidence level. Use 90, 95, or 99.");
  }

  if (marginOfError < 1 || marginOfError > 100) {
    throw new Error("Invalid margin of error. Use a value between 1 and 100.");
  }

  const estimatedProportion = 0.5;
  const numerator = Math.pow(zScore, 2) * estimatedProportion *
    (1 - estimatedProportion);
  const denominator = Math.pow(marginOfError / 100, 2);
  const sampleSize = numerator / denominator;

  const finalSampleSize = sampleSize /
    (1 + ((sampleSize - 1) / populationSize));

  return Math.ceil(finalSampleSize);
}
