/**
 * Round a number. By default, round to the nearest integer.
 *
 * @example
 * Basic usage
 * ```js
 * const result = round(1234.567, { decimals: 1 });
 * // returns 1234.6
 * ```
 *
 * @param number - The number to be rounded.
 * @param options - The options for rounding.
 * @param options.decimals - The number of decimals to keep when rounding.
 * @param options.nearestInteger - The base to use to round. For example, 123 with the nearestInteger 10 is 120.
 * @param options.significantDigits - The number of significant digits to keep. Significant digits start being counted at the first non-zero digit. For example, 0.004622 with 1 significant digit will be rounded to 0.005.
 * @param options.try - By default, the function throws an error if the passed value is not a number. With try set to true, no error is thrown but the returned value is NaN.
 *
 *
 * @category Formatting
 */

export default function round(
    number: number,
    options: {
        decimals?: number
        nearestInteger?: number
        significantDigits?: number
        try?: boolean
    } = {}
): number {
    const optionsToCheck = [
        options.decimals,
        options.nearestInteger,
        options.significantDigits,
    ]
    if (optionsToCheck.filter((d) => typeof d === "number").length > 1) {
        throw new Error(
            "You can't use options decimals, nearestInteger, or significantDigits together. Pick one."
        )
    }

    if (typeof number !== "number") {
        if (options.try === true) {
            return NaN
        } else {
            throw new Error(
                `${number} is not a number. If you want to return NaN instead of throwing an error, pass option {try: true}.`
            )
        }
    }

    if (typeof options.decimals === "number") {
        return parseFloat(number.toFixed(options.decimals))
    } else if (typeof options.nearestInteger === "number") {
        return (
            Math.round(number / options.nearestInteger) * options.nearestInteger
        )
    } else if (typeof options.significantDigits === "number") {
        return parseFloat(number.toPrecision(options.significantDigits))
    } else {
        return Math.round(number)
    }
}
