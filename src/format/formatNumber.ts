import round from "./round.js"

/**
 * Format a number with a specific style.
 *
 *```js
 * const string = formatNumber(1234.567, { sign: true, round: true })
 * // returns "+1,235"
 * ```
 * These options can be passed as the last parameter:
 * - style: "cbc" or "rc"
 * - sign: if true, "–" or "+" are added in front of the number
 * - round: to round the number
 * - decimals: the number of decimals to keep when rounding
 * - significantDigits: The number of digits to keep. Significant digits start being counted at the first non-zero digit. For example, 0.004622 with 1 significant digit will the rounded to 0.005.
 * - fixed: display a fixed number of decimals by keeping 0 digits. For example, if decimals is set to 2 and fixed is true, then 0 will read 0.00.
 * - nearestInteger: the base to use to round. For example, 123 with the nearestInteger 10 is 120.
 * - prefix: a string to add before the number, "$" for example
 * - suffix: a string to add after the number, "%" for example
 *
 * @category Formatting
 */

export default function formatNumber(
    number: number,
    options: {
        style?: "cbc" | "rc"
        sign?: boolean
        round?: boolean
        decimals?: number
        significantDigits?: number
        fixed?: boolean
        nearestInteger?: number
        prefix?: string
        suffix?: string
    } = {}
): string {
    if (typeof number !== "number") {
        throw new Error("Not a number")
    }

    const mergedOptions: {
        style: "cbc" | "rc"
        sign: boolean
        round: boolean
        decimals?: number
        nearestInteger?: number
        significantDigits?: number
        fixed: boolean
        prefix: string
        suffix: string
    } = {
        style: "cbc",
        sign: false,
        round: false,
        fixed: false,
        prefix: "",
        suffix: "",
        ...options,
    }

    if (
        mergedOptions.round ||
        typeof mergedOptions.decimals === "number" ||
        typeof mergedOptions.nearestInteger === "number" ||
        typeof mergedOptions.significantDigits === "number"
    ) {
        number = round(number, {
            decimals: mergedOptions.decimals,
            nearestInteger: mergedOptions.nearestInteger,
            significantDigits: mergedOptions.significantDigits,
        })
    }

    const regex = /\B(?=(\d{3})+(?!\d))/g
    const [integers, decimals] = mergedOptions.fixed
        ? number.toFixed(mergedOptions.decimals).split(".")
        : number.toString().split(".")

    let formattedNumber = ""

    if (mergedOptions.style === "cbc") {
        const formattedIntegers = integers.replace(regex, ",")
        if (decimals) {
            formattedNumber = `${formattedIntegers}.${decimals}`
        } else {
            formattedNumber = formattedIntegers
        }
    } else if (mergedOptions.style === "rc") {
        const string = mergedOptions.fixed
            ? number.toFixed(mergedOptions.decimals)
            : number.toString()
        if (string.length === 4) {
            formattedNumber = string.replace(".", ",")
        } else {
            const formattedIntegers = integers.replace(regex, " ")
            if (decimals) {
                formattedNumber = `${formattedIntegers},${decimals}`
            } else {
                formattedNumber = formattedIntegers
            }
        }
    } else {
        throw new Error("Unknown style")
    }

    if (mergedOptions.sign && number > 0) {
        formattedNumber = `+${formattedNumber}`
    }
    // Always, not just with {sign: true}
    if (number < 0) {
        formattedNumber = formattedNumber.replace("-", "–")
    }

    return `${mergedOptions.prefix}${formattedNumber}${mergedOptions.suffix}`
}
