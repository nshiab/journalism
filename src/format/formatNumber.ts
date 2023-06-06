export default function formatNumber(
    number: number,
    style: "cbc" | "rc" = "cbc"
) {
    if (typeof number !== "number") {
        throw new Error("Not a number")
    }

    const regex = /\B(?=(\d{3})+(?!\d))/g
    const [integers, decimals] = number.toString().split(".")

    if (style === "cbc") {
        const formattedIntegers = integers.replace(regex, ",")
        if (decimals) {
            return `${formattedIntegers}.${decimals}`
        } else {
            return formattedIntegers
        }
    } else if (style === "rc") {
        const string = number.toString()
        if (string.length === 4) {
            return string.replace(".", ",")
        } else {
            const formattedIntegers = integers.replace(regex, " ")
            if (decimals) {
                return `${formattedIntegers},${decimals}`
            } else {
                return formattedIntegers
            }
        }
    } else {
        throw new Error("Unknown style")
    }
}
