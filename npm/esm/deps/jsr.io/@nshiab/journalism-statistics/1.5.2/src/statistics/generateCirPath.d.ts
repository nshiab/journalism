/**
 * Generates a path of values following the Cox-Ingersoll-Ross (CIR) model.
 *
 * The CIR model is a mean-reverting stochastic process used to model variables that tend to return to a long-term average over time, such as interest rates or volatility.
 *
 * **When to use this function:**
 * - To simulate future interest rate paths for financial modeling.
 * - To test how a mean-reverting system might evolve over time.
 * - When you have parameters (`a`, `b`, `sigma`) and wish to generate potential future scenarios.
 *
 * @param startValue - The initial value of the process (e.g., current interest rate).
 * @param a - The speed of mean reversion.
 * @param b - The long-term mean to which the process reverts.
 * @param sigma - The volatility of the process.
 * @param years - The number of years to simulate.
 * @param periodsPerYear - The number of simulation steps per year (e.g., 12 for monthly).
 * @returns An array representing the simulated path of values.
 * @throws {Error} If parameters are invalid (e.g. negative values where prohibited or zero simulation length).
 *
 * @example
 * ```ts
 * const rates = [0.02, 0.021, 0.019, 0.022, 0.023];
 * const periodsPerYear = 12;
 *
 * // First, estimate parameters from historical data
 * const { a, b, sigma } = getCirParameters(rates, periodsPerYear);
 *
 * // Then, generate a future path
 * const initialRate = rates[rates.length - 1];
 * const path = generateCirPath(initialRate, a, b, sigma, 1, 12);
 * ```
 */
export default function generateCirPath(startValue: number, a: number, b: number, sigma: number, years: number, periodsPerYear: number): number[];
//# sourceMappingURL=generateCirPath.d.ts.map