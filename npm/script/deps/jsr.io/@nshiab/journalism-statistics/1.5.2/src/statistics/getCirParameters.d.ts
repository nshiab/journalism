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
export default function getCirParameters(values: number[], periodsPerYear: number): {
    a: number;
    b: number;
    sigma: number;
};
//# sourceMappingURL=getCirParameters.d.ts.map