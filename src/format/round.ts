/**
 * Round a number. By default, round to the nearest integer.
 *
 *```js
 * const string = round(1234.567, { decimals: 1 })
 * // returns 1,235.6
 * ```
 * These options can be passed as the last parameter:
 * - decimals: the number of decimals to keep when rounding
 * - nearestInteger: the base to use to round. For example, 123 with the nearestInteger 10 is 120.
 * - try: by default, the function throws an error if the passed value is not a number. With try set to true, no error is thrown but the returned value is NaN.
 *
 * @category Formatting
 */

export default function round(
    number: number,
    options: {
        decimals?: number
        nearestInteger?: number
        try?: boolean
    } = {}
): number {
    const mergedOptions = {
        decimals: 0,
        nearestInteger: 1,
        try: false,
        ...options,
    }

    if (typeof number !== "number") {
        if (options.try) {
            return NaN
        } else {
            throw new Error(`${number} is not a number`)
        }
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
