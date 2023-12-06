/**
 * Compute the adjusted to inflation amount of money, based on the Consumer Price Index. The options (last parameter) are optional.
 *
 *```js
 * // $100 in 1914 (CPI of 6.0) to 2023 value (CPI of 156.4)
 * const adjustedAmount = adjustToInflation(100, 6.0, 156.4, { decimals: 0 })
 * // returns 2607 dollars
 * ```
 * @category Finance
 */

export default function adjustToInflation(
    amount: number,
    amountCPI: number,
    targetCPI: number,
    options: {
        decimals?: number
    } = {}
) {
    const inflation = (targetCPI - amountCPI) / amountCPI
    const adjustedAmount = amount + amount * inflation

    return typeof options.decimals === "number"
        ? parseFloat(adjustedAmount.toFixed(options.decimals))
        : adjustedAmount
}
