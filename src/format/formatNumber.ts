import round from "./round.js"

export default function formatNumber(
    number: number,
    options: {
        style?: "cbc" | "rc"
        sign?: boolean
        round?: boolean
        nbDecimals?: number
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
        nbDecimals: number
        nearestInteger: number
        prefix: string
        suffix: string
    } = {
        style: "cbc",
        sign: false,
        round: false,
        nbDecimals: 0,
        nearestInteger: 1,
        prefix: "",
        suffix: "",
        ...options,
    }

    if (
        mergedOptions.round ||
        mergedOptions.nbDecimals !== 0 ||
        mergedOptions.nearestInteger !== 1
    ) {
        number = round(number, {
            nbDecimals: mergedOptions.nbDecimals,
            nearestInteger: mergedOptions.nearestInteger,
        })
    }

    const regex = /\B(?=(\d{3})+(?!\d))/g
    const [integers, decimals] = number.toString().split(".")

    let formattedNumber = ""

    if (mergedOptions.style === "cbc") {
        const formattedIntegers = integers.replace(regex, ",")
        if (decimals) {
            formattedNumber = `${formattedIntegers}.${decimals}`
        } else {
            formattedNumber = formattedIntegers
        }
    } else if (mergedOptions.style === "rc") {
        const string = number.toString()
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
