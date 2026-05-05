/**
 * Calculates the next value in a Geometric Brownian Motion (GBM) process.
 * @param currentValue - The current value of the process.
 * @param mu - The drift coefficient.
 * @param sigma - The volatility coefficient.
 * @param dt - The time step.
 * @param shock - A standard normal random variable (Z).
 * @returns The next value in the process.
 */
export default function stepGbm(
  currentValue: number,
  mu: number,
  sigma: number,
  dt: number,
  shock: number,
): number {
  const drift = (mu - (sigma * sigma) / 2) * dt;
  const diffusion = sigma * Math.sqrt(dt) * shock;
  return currentValue * Math.exp(drift + diffusion);
}
