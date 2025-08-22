/**
 * Calculates the required sample size for estimating a population mean with a specified confidence level and margin of error.
 *
 * The function uses the finite population correction formula. It calculates the sample standard deviation from the provided data to estimate the population standard deviation, which is then used in the sample size calculation.
 *
 * @example
 * ```ts
 * // A journalist analyzing income data wants to know how many records to sample
 * // to estimate the average income with confidence
 * const incomeData = [
 *   { household_id: 1, annual_income: 45000 },
 *   { household_id: 2, annual_income: 52000 },
 *   { household_id: 3, annual_income: 38000 },
 *   // ... thousands more records
 * ];
 * const sampleSize = getSampleSizeMean(incomeData, "annual_income", 95, 2000);
 * console.log(`You need to analyze ${sampleSize} income records to estimate the average income within $2,000 with 95% confidence`);
 * ```
 *
 * @example
 * ```ts
 * // Example for analyzing test scores
 * const testScores = [
 *   { student_id: 1, score: 85 },
 *   { student_id: 2, score: 92 },
 *   { student_id: 3, score: 78 },
 *   // ... more test data
 * ];
 * const requiredSample = getSampleSizeMean(testScores, "score", 99, 5);
 * console.log(`For 99% confidence with a 5-point margin of error, sample ${requiredSample} test scores.`);
 * ```
 *
 * @param data - An array of objects representing the population data. Each object must contain the specified key with numeric values.
 * @param key - The key in each data object that contains the numeric values to analyze for calculating the sample size.
 * @param confidenceLevel - The desired confidence level for the sample. Must be 90, 95, or 99. The higher the confidence level, the larger the returned sample size.
 * @param marginOfError - The acceptable margin of error in the same units as the data values. The smaller the margin of error, the larger the returned sample size.
 * @returns The minimum required sample size, rounded up to the nearest whole number.
 *
 * @category Statistics
 */
export default function getSampleSizeMean(
  data: { [key: string]: unknown }[],
  key: string,
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

  const values = data.map((d) => {
    const value = d[key];
    if (typeof value !== "number") {
      throw new Error(
        `Invalid value for key "${key}": ${value}. Values must be numbers.`,
      );
    }
    return value;
  });

  const sampleMean = values.reduce(
    (sum, value) => sum + value,
    0,
  ) / values.length;
  const sumOfSquaredDifferences = values.reduce((sum, value) => {
    const diff = value - sampleMean;
    return sum + diff * diff;
  }, 0);
  const sampleVariance = sumOfSquaredDifferences / (values.length - 1);
  const sampleStdDev = Math.sqrt(sampleVariance);

  const numerator = Math.pow(zScore, 2) * Math.pow(sampleStdDev, 2);
  const denominator = Math.pow(marginOfError, 2);
  const initialSampleSize = numerator / denominator;

  const finalSampleSize = initialSampleSize /
    (1 + ((initialSampleSize - 1) / data.length));

  return Math.ceil(finalSampleSize);
}
