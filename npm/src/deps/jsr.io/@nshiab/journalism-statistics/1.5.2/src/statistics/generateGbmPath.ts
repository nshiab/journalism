/**
 * Generates a simulated path for an asset using the Geometric Brownian Motion (GBM) model.
 *
 * Geometric Brownian Motion is a continuous-time stochastic process in which the logarithm of the randomly varying quantity follows a Brownian motion with drift. It is widely used in mathematical finance to model stock prices, as it ensures that values remain positive and accounts for compounded returns.
 *
 * **When to use this function:**
 * - To simulate future value paths for a stock, index, or other financial asset
 * - For risk management and stress testing by generating multiple potential scenarios
 * - To visualize the impact of volatility and drift on an investment over time
 *
 * **Note:** You can use `getGbmParameters` to estimate the `mu` and `sigma` parameters from historical data before generating a path.
 *
 * @param startValue - The initial value of the asset at the beginning of the simulation
 * @param mu - The expected annualized drift (average growth rate) of the asset
 * @param sigma - The annualized volatility (degree of variation) of the asset
 * @param years - The total duration of the simulation in years
 * @param periodsPerYear - The number of simulation steps per year (e.g., 252 for daily trading days, 12 for monthly data, 52 for weekly)
 * @returns An array of numerical values representing the simulated path, including the `startValue`
 *
 * @example
 * ```ts
 * import getGbmParameters from "./getGbmParameters";
 *
 * const historicalValues = [100, 102, 101, 105, 107, 110];
 * const periodsPerYear = 252; // Daily data
 *
 * // Estimate parameters from historical data
 * const { mu, sigma } = getGbmParameters(historicalValues, periodsPerYear);
 *
 * // Generate a simulated path for the next year
 * const startValue = historicalValues[historicalValues.length - 1];
 * const path = generateGbmPath(startValue, mu, sigma, 1, periodsPerYear);
 * console.log(`Simulated path: ${path.map(v => v.toFixed(2)).join(', ')}`);
 * ```
 */
export default function generateGbmPath(
  startValue: number,
  mu: number,
  sigma: number,
  years: number,
  periodsPerYear: number,
): number[] {
  // Input guard rails
  if (startValue <= 0 || sigma < 0 || periodsPerYear <= 0) {
    throw new Error(
      "Invalid inputs: startValue and periodsPerYear must be > 0, sigma must be >= 0.",
    );
  }

  const dt = 1 / periodsPerYear;
  const totalSteps = Math.round(years * periodsPerYear); // Ensures integer steps
  const path: number[] = new Array(totalSteps + 1); // Pre-allocating array size is faster than .push()

  path[0] = startValue;
  let currentValue = startValue;

  // HOISTED: Calculate the constant drift term once
  // Using (sigma * sigma) is marginally faster than Math.pow(sigma, 2)
  const drift = (mu - (sigma * sigma) / 2) * dt;
  const volSqrtDt = sigma * Math.sqrt(dt); // Hoisted static volatility term

  for (let i = 1; i <= totalSteps; i++) {
    const diffusion = volSqrtDt * randNormal();
    currentValue = currentValue * Math.exp(drift + diffusion);
    path[i] = currentValue;
  }

  return path;
}

// Module-level cache for the Box-Muller optimization
let cachedNormal: number | null = null;

function randNormal(): number {
  // If we have a cached value from the previous call, use it
  if (cachedNormal !== null) {
    const val = cachedNormal;
    cachedNormal = null; // Clear cache
    return val;
  }

  const u = 1 - Math.random(); // (0, 1]
  const v = Math.random();

  const radius = Math.sqrt(-2.0 * Math.log(u));
  const theta = 2.0 * Math.PI * v;

  // Cache the sine value for the next call
  cachedNormal = radius * Math.sin(theta);

  // Return the cosine value
  return radius * Math.cos(theta);
}
