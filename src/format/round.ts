/**
 * Round a number. By default, round to the nearest integer.
 *
 *```js
 * const string = round(1234.567, { decimals: 1 })
 * // returns 1,235.6
 * ```
 * These options can be passed as the last parameter:
 * - decimals : the number of decimals to keep when rounding
 * - nearestInteger: the base to use to round. For example, 123 with the nearestInteger 10 is 120.
 */

export default function round(
    number: number,
    options: {
        decimals?: number
        nearestInteger?: number
    } = {}
): number {
    const mergedOptions = {
        decimals: 0,
        nearestInteger: 1,
        ...options,
    }

    if (mergedOptions.decimals > 0 && mergedOptions.nearestInteger > 1) {
        throw new Error(
            "You can't use decimals and nearestInteger at the same time. Use just one option."
        )
    }

    if (mergedOptions.nearestInteger === 1) {
        return parseFloat(number.toFixed(mergedOptions.decimals))
    } else {
        return (
            Math.round(number / mergedOptions.nearestInteger) *
            mergedOptions.nearestInteger
        )
    }
}
