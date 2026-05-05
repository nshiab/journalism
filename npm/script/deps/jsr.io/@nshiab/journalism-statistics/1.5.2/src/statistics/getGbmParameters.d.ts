/**
 * Calculates the parameters (drift `mu` and volatility `sigma`) for a Geometric Brownian Motion (GBM) model based on historical data.
 *
 * Geometric Brownian Motion is a continuous-time stochastic process often used to model stock prices and other financial assets. This function estimates the drift and volatility from a series of observed values, assuming the returns follow a log-normal distribution.
 *
 * **When to use this function:**
 * - To estimate parameters for simulating future asset paths using GBM
 * - When you have a sequence of historical prices or values and need to determine their annualized growth rate (drift) and risk (volatility)
 * - To model potential future scenarios for a stock, index, or commodity based on historical trends
 *
 * @param values - An array of numerical values (e.g., historical prices)
 * @param periodsPerYear - The number of data points per year (e.g., 252 for daily trading days, 12 for monthly data, 52 for weekly)
 * @returns An object containing the annualized drift (`mu`) and annualized volatility (`sigma`)
 *
 * @example
 * ```ts
 * const prices = [100, 102, 101, 105, 107, 110];
 * const periodsPerYear = 252; // Daily data
 *
 * const { mu, sigma } = calculateGbmParameters(prices, periodsPerYear);
 * console.log(`Annualized Drift (mu): ${mu.toFixed(4)}`);
 * console.log(`Annualized Volatility (sigma): ${sigma.toFixed(4)}`);
 * ```
 */
export default function getGbmParameters(values: number[], periodsPerYear: number): {
    mu: number;
    sigma: number;
};
//# sourceMappingURL=getGbmParameters.d.ts.map