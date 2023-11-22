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
 * - sign: if true, "-" or "+" are added in front of the number
 * - round: to round the number
 * - decimals: the number of decimals to keep when rounding
 * - fixed: display a fixed number of decimals. For example, if decimals is set to 2 then 0 will read 0.00.
 * - nearestInteger: the base to use to round. For example, 123 with the nearestInteger 10 is 120.
 * - prefix: a string to add before the number, "$" for example
 * - suffix: a string to add after the number, "%" for example
 */

export default function formatNumber(
    number: number,
    options: {
        style?: "cbc" | "rc"
        sign?: boolean
        round?: boolean
        decimals?: number
        fixed?:boolean
        nearestInteger?: number
        prefix?: string
        suffix?: string
    } = {}
) {
    if (typeof number !== "number") {
        throw new Error("Not a number")
    }

    const mergedOptions: {
        style: "cbc" | "rc"
        sign: boolean
        round: boolean
        decimals: number
        fixed:boolean
        nearestInteger: number
        prefix: string
        suffix: string
    } = {
        style: "cbc",
        sign: false,
        round: false,
        decimals: 0,
        fixed:false,
        nearestInteger: 1,
        prefix: "",
        suffix: "",
        ...options,
    }

    if (
        mergedOptions.round ||
        mergedOptions.decimals !== 0 ||
        mergedOptions.nearestInteger !== 1
    ) {
        number = round(number, {
            decimals: mergedOptions.decimals,
            nearestInteger: mergedOptions.nearestInteger,
        })
    }

    const regex = /\B(?=(\d{3})+(?!\d))/g
    const [integers, decimals] = mergedOptions.fixed ? number.toFixed(mergedOptions.decimals).split(".") : number.toString().split(".")

    let formattedNumber = ""

    if (mergedOptions.style === "cbc") {
        const formattedIntegers = integers.replace(regex, ",")
        if (decimals) {
            formattedNumber = `${formattedIntegers}.${decimals}`
        } else {
            formattedNumber = formattedIntegers
        }
    } else if (mergedOptions.style === "rc") {
        const string = mergedOptions.fixed? number.toFixed(mergedOptions.decimals) : number.toString()
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

    return `${mergedOptions.prefix}${formattedNumber}${mergedOptions.suffix}`
}
