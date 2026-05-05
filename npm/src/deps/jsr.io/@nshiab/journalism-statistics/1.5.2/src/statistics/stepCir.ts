/**
 * Calculates the next value in a Cox-Ingersoll-Ross (CIR) process.
 * @param currentValue - The current value of the process.
 * @param a - The speed of mean reversion.
 * @param b - The long-term mean level.
 * @param sigma - The volatility coefficient.
 * @param dt - The time step.
 * @param shock - A standard normal random variable (Z).
 * @returns The next value in the process.
 */
export default function stepCir(
  currentValue: number,
  a: number,
  b: number,
  sigma: number,
  dt: number,
  shock: number,
): number {
  const drift = a * (b - currentValue) * dt;
  const diffusion = sigma * Math.sqrt(Math.max(currentValue, 0)) *
    Math.sqrt(dt) * shock;
  return Math.max(currentValue + drift + diffusion, 0.00001); // Bounded to prevent negative rates
}
