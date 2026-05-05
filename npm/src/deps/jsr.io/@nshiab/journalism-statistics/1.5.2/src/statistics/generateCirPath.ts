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
export default function generateCirPath(
  startValue: number,
  a: number,
  b: number,
  sigma: number,
  years: number,
  periodsPerYear: number,
): number[] {
  if (startValue < 0) throw new Error("Start value must be non-negative.");
  if (a < 0 || b < 0 || sigma < 0) {
    throw new Error("Parameters a, b, and sigma must be non-negative.");
  }
  if (years <= 0 || periodsPerYear <= 0) {
    throw new Error("Years and periods per year must be strictly positive.");
  }

  const dt = 1 / periodsPerYear;
  const totalSteps = Math.round(years * periodsPerYear);
  const path: number[] = [startValue];

  let currentRate = startValue;

  for (let i = 1; i <= totalSteps; i++) {
    const epsilon = normalRandom();

    const drift = a * (b - currentRate) * dt;
    const diffusion = sigma * Math.sqrt(Math.max(currentRate, 0)) *
      Math.sqrt(dt) * epsilon;

    currentRate += drift + diffusion;

    // CIR theoretically stays positive, but floating point errors
    // can nudge it. We floor it at 0.00001 (0.001%) for stability.
    path.push(Math.max(currentRate, 0.00001));
  }

  return path;
}

function normalRandom(): number {
  const u = 1 - Math.random();
  const v = 1 - Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}
