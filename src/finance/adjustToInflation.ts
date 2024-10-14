/**
 * Compute the adjusted to inflation amount of money, based on the Consumer Price Index. The options (last parameter) are optional.
 *
 * @example
 * Basic usage
 * ```js
 * const adjustedAmount = adjustToInflation(100, 6.0, 156.4, { decimals: 0 })
 * // returns 2607 dollars
 * ```
 *
 * @param amount - The initial amount of money.
 * @param amountCPI - The Consumer Price Index (CPI) at the time of the initial amount.
 * @param targetCPI - The Consumer Price Index (CPI) at the target time.
 * @param options - Optional parameters.
 * @param options.decimals - Number of decimal places to round the result to.
 *
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
