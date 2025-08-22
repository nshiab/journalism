/**
 * Calculates the required sample size for estimating a population proportion with a specified confidence level and margin of error.
 *
 * The function uses the finite population correction formula when the population size is known, which provides more accurate sample size calculations for smaller populations. It assumes a worst-case scenario proportion of 0.5 (50%) to ensure the calculated sample size is sufficient regardless of the actual population proportion.
 *
 * @example
 * ```ts
 * // A journalist has a dataset of 1,000 records and wants to know how many
 * // data points to manually double-check to ensure their analysis is accurate
 * const datasetRecords = [...]; // Array of 1,000 data records from investigation
 * const recordsToVerify = getSampleSizeProportion(datasetRecords, 95, 5);
 * console.log(`You need to manually verify ${recordsToVerify} records to be 95% confident in your analysis with a 5% margin of error`); // 278
 * ```
 *
 * @example
 * ```ts
 * // Example for survey planning
 * const cityPopulation = new Array(50000).fill(0);
 * const requiredSample = getSampleSizeProportion(cityPopulation, 95, 4);
 * console.log(`For a city survey with 95% confidence and 4% margin of error, you need ${requiredSample} respondents.`); // 594
 * ```
 *
 * @param data - An array representing the population. The length of this array is used as the population size in the finite population correction formula.
 * @param confidenceLevel - The desired confidence level for the sample. Must be 90, 95, or 99. The higher the confidence level, the larger the returned sample size.
 * @param marginOfError - The acceptable margin of error as a percentage (1-100). The smaller the margin of error, the larger the returned sample size.
 * @returns The minimum required sample size, rounded up to the nearest whole number.
 *
 * @category Statistics
 */
export default function getSampleSizeProportion(
  data: unknown[],
  confidenceLevel: 90 | 95 | 99,
  marginOfError: number,
): number {
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
    (1 + ((sampleSize - 1) / data.length));

  return Math.ceil(finalSampleSize);
}
