/**
 * Round a number. By default, round to the nearest integer.
 *
 *```js
 * const string = round(1234.567, { nbDecimals: 1 })
 * // returns 1,235.6
 * ```
 * These options can be passed as the last parameter:
 * - nbDecimals : the number of decimals to keep when rounding
 * - nearestInteger: the base to use to round. For example, 123 with the nearestInteger 10 is 120.
 */

export default function round(
    number: number,
    options: {
        nbDecimals?: number
        nearestInteger?: number
    } = {}
): number {
    const mergedOptions = {
        nbDecimals: 0,
        nearestInteger: 1,
        ...options,
    }

    if (mergedOptions.nbDecimals > 0 && mergedOptions.nearestInteger > 1) {
        throw new Error(
            "You can't use nbDecimals and nearestInteger at the same time. Use just one option."
        )
    }

    if (mergedOptions.nearestInteger === 1) {
        return parseFloat(number.toFixed(mergedOptions.nbDecimals))
    } else {
        return (
            Math.round(number / mergedOptions.nearestInteger) *
            mergedOptions.nearestInteger
        )
    }
}
