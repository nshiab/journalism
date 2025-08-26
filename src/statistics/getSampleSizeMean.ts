/**
 * Calculates the required sample size for estimating a population mean with a specified confidence level and margin of error.
 *
 * The function uses the finite population correction formula. It calculates the sample standard deviation from the provided data to estimate the population standard deviation, which is then used in the sample size calculation.
 *
 * **When to use this function:**
 * - Use when you want to estimate the average (mean) value of a numeric variable in a population
 * - When your outcome is continuous/numeric data (income, age, test scores, measurements, etc.)
 * - When you need to answer questions like "What's the average household income?" or "What's the mean temperature?"
 * - When you have existing data to calculate the standard deviation from
 *
 * **Use `getSampleSizeProportion` instead when:**
 * - You want to estimate what percentage/proportion of a population has a certain characteristic
 * - Your outcome is categorical (yes/no, present/absent, pass/fail, etc.)
 * - You need to answer questions like "What percentage of people support this policy?" or "What proportion of records are accurate?"
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
 * // Example with known population size - using a small sample to estimate standard deviation
 * // but knowing the true population size for accurate sample size calculation
 * const pilotData = [
 *   { student_id: 1, score: 85 },
 *   { student_id: 2, score: 92 },
 *   { student_id: 3, score: 78 },
 *   // Only 50 pilot records to estimate variability
 * ];
 * const requiredSample = getSampleSizeMean(
 *   pilotData,
 *   "score",
 *   99,
 *   5,
 *   { populationSize: 10000 } // Total student population is 10,000
 * );
 * console.log(`For 99% confidence with a 5-point margin of error, sample ${requiredSample} test scores from the 10,000 students.`);
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
 * @param data - An array of objects used to calculate the sample standard deviation. Each object must contain the specified key with numeric values.
 * @param key - The key in each data object that contains the numeric values to analyze for calculating the sample size.
 * @param confidenceLevel - The desired confidence level for the sample. Must be 90, 95, or 99. The higher the confidence level, the larger the returned sample size.
 * @param marginOfError - The acceptable margin of error in the same units as the data values. The smaller the margin of error, the larger the returned sample size.
 * @param options - Optional configuration object.
 * @param options.populationSize - The total size of the population. If not provided, the function assumes the provided data represents the entire population and uses data.length as the population size.
 * @returns The minimum required sample size, rounded up to the nearest whole number.
 *
 * @category Statistics
 */
export default function getSampleSizeMean(
  data: { [key: string]: unknown }[],
  key: string,
  confidenceLevel: 90 | 95 | 99,
  marginOfError: number,
  options?: { populationSize?: number },
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

  if (marginOfError <= 0) {
    throw new Error("Invalid margin of error. Must be greater than 0.");
  }

  if (data.length < 2) {
    throw new Error(
      "At least 2 data points are required to calculate sample standard deviation.",
    );
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
    (1 + ((initialSampleSize - 1) / (options?.populationSize ?? data.length)));

  return Math.ceil(finalSampleSize);
}
