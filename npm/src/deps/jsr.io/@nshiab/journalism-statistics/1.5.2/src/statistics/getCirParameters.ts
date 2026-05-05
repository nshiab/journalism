/**
 * Estimates the parameters of the Cox-Ingersoll-Ross (CIR) model based on historical values using ordinary least squares on the discretized process.
 *
 * The CIR model is a mean-reverting stochastic process often used to model interest rates or other variables that tend to move toward a long-term average. This function returns the speed of mean reversion (`a`), the long-term mean (`b`), and the volatility (`sigma`).
 *
 * **When to use this function:**
 * - To model interest rates, where rates are likely to revert to a mean but stay positive.
 * - When you need to estimate the behavior of a mean-reverting process from historical data points.
 * - To determine parameters for simulating potential future paths using `getCirPath`.
 *
 * @param values - An array of numerical data points (e.g., historical interest rates).
 * @param periodsPerYear - The number of data points per year (e.g., 252 for daily, 12 for monthly).
 * @returns An object containing the estimated speed of mean reversion (`a`), long-term mean (`b`), and volatility (`sigma`). Note that `a` is silently clamped to a minimum of 0.001 and `b` to a minimum of 0.
 * @throws {Error} If `values` contains fewer than four data points, if `periodsPerYear` is not positive, if any value is negative, or if the data is degenerate (collinear).
 *
 * @example
 * ```ts
 * const rates = [0.02, 0.021, 0.019, 0.022, 0.023];
 * const periodsPerYear = 12; // Monthly data
 *
 * const { a, b, sigma } = getCirParameters(rates, periodsPerYear);
 * ```
 */
export default function getCirParameters(
  values: number[],
  periodsPerYear: number,
): { a: number; b: number; sigma: number } {
  const n = values.length;
  if (n < 4) throw new Error("Need at least four data points.");
  if (periodsPerYear <= 0) {
    throw new Error("periodsPerYear must be positive.");
  }
  if (values.some((v) => v < 0)) {
    throw new Error("All values must be non-negative.");
  }

  const dt = 1 / periodsPerYear;

  let sumY = 0, sumX1 = 0, sumX2 = 0;
  let sumX1Sq = 0, sumX2Sq = 0, sumX1X2 = 0;
  let sumX1Y = 0, sumX2Y = 0;

  for (let i = 0; i < n - 1; i++) {
    const r_t = values[i];
    const r_next = values[i + 1];
    const sqrtR = Math.sqrt(Math.max(r_t, 0.0001));

    const y = (r_next - r_t) / sqrtR;
    const x1 = dt / sqrtR;
    const x2 = sqrtR * dt;

    sumY += y;
    sumX1 += x1;
    sumX2 += x2;
    sumX1Sq += x1 * x1;
    sumX2Sq += x2 * x2;
    sumX1X2 += x1 * x2;
    sumX1Y += x1 * y;
    sumX2Y += x2 * y;
  }

  // Solve the system for [a*b, -a] using Cramer's Rule or basic substitution
  const denominator = sumX1Sq * sumX2Sq - sumX1X2 * sumX1X2;

  if (Math.abs(denominator) < Number.EPSILON) {
    throw new Error("Degenerate data: Cannot estimate parameters.");
  }

  const ab_val = (sumX1Y * sumX2Sq - sumX1X2 * sumX2Y) / denominator;
  const minus_a = (sumX1Sq * sumX2Y - sumX1Y * sumX1X2) / denominator;

  const a = -minus_a;
  let b = 0;
  if (Math.abs(a) > Number.EPSILON) {
    b = ab_val / a;
  }

  // Estimate Sigma (Standard Deviation of the residuals)
  let residualSumSq = 0;
  for (let i = 0; i < n - 1; i++) {
    const r_t = values[i];
    const r_next = values[i + 1];
    const expectedNext = r_t + a * (b - r_t) * dt;
    const error = (r_next - expectedNext) / Math.sqrt(Math.max(r_t, 0.0001));
    residualSumSq += error * error;
  }

  const sigma = Math.sqrt(residualSumSq / ((n - 3) * dt));

  return {
    a: Math.max(a, 0.001), // Speed of reversion
    b: Math.max(b, 0), // Long-term mean
    sigma: sigma, // Volatility
  };
}
