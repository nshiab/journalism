/**
 * Adjusts a monetary amount for inflation using the Consumer Price Index (CPI).
 *
 * @param amount The initial amount of money to be adjusted.
 * @param amountCPI The Consumer Price Index (CPI) corresponding to the period of the `amount`.
 * @param targetCPI The Consumer Price Index (CPI) for the period to which the amount is being adjusted.
 * @param options Optional settings for the calculation.
 * @param options.decimals The number of decimal places to which the resulting adjusted amount should be rounded. If not specified, the result will not be rounded.
 *
 * @example
 * ```ts
 * // Basic usage: Adjusting $100 from a time when the CPI was 120 to a time when the CPI is 150.
 * const adjustedValue = adjustToInflation(100, 120, 150);
 * console.log(adjustedValue); // Expected output: 125
 * ```
 * @example
 * ```ts
 * // With rounding to two decimal places
 * const adjustedValueRounded = adjustToInflation(100, 120, 150.5, { decimals: 2 });
 * console.log(adjustedValueRounded); // Expected output: 125.42
 * ```
 * @example
 * ```ts
 * // Calculating the value of a 1990 salary in 2023 terms
 * const salary1990 = 45000;
 * const cpi1990 = 60.5; // Hypothetical CPI for 1990
 * const cpi2023 = 135.2; // Hypothetical CPI for 2023
 * const adjustedSalary = adjustToInflation(salary1990, cpi1990, cpi2023, { decimals: 0 });
 * console.log(`A $45,000 salary in 1990 is equivalent to approximately ${adjustedSalary} in 2023.`);
 * // Expected output: "A $45,000 salary in 1990 is equivalent to approximately $100149 in 2023."
 * ```
 * @category Finance
 */

export default function adjustToInflation(
  amount: number,
  amountCPI: number,
  targetCPI: number,
  options: {
    decimals?: number;
  } = {},
): number {
  const inflation = (targetCPI - amountCPI) / amountCPI;
  const adjustedAmount = amount + amount * inflation;

  return typeof options.decimals === "number"
    ? parseFloat(adjustedAmount.toFixed(options.decimals))
    : adjustedAmount;
}
