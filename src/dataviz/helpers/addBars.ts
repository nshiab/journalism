import formatNumber from "../../format/formatNumber.js"

export default function makeBars(
    data: { [key: string]: unknown }[],
    x: string,
    y: string,
    options: {
        width?: number
        xDecimals?: number
    }
) {
    for (const d of data) {
        if (typeof d[x] !== "number") {
            throw new Error(`The value of ${x} is not a number.`)
        } else if (typeof d[y] !== "string") {
            throw new Error(`The value of ${y} is not a string.`)
        }
    }

    const chartData = []

    const yValues = data.map((d) => d[y] as string) // tested above
    const maxLength = Math.max(...yValues.map((d) => d.length))
    const yValuesString = yValues.map((d) => d.padStart(maxLength, " "))

    const xMax = Math.max(...data.map((d) => d[x] as number)) // tested above
    const xSum = data.reduce((acc, d) => acc + (d[x] as number), 0)

    for (let i = 0; i < yValues.length; i++) {
        if (i === 0) {
            chartData.push(" ".repeat(maxLength) + " ┌")
        }

        const xValue = data[i][x] as number
        const xPerc = formatNumber((xValue / xSum) * 100, {
            decimals: 2,
            suffix: "%",
        })
        const nbCharacters = Math.round((xValue / xMax) * (options.width ?? 75))

        chartData.push(
            yValuesString[i] +
                " ┤" +
                "\x1b[34m" +
                "█".repeat(nbCharacters) +
                "\x1b[0m" +
                " " +
                formatNumber(xValue, { decimals: options.xDecimals }) +
                " | " +
                xPerc
        )
        if (i !== yValues.length - 1) {
            chartData.push(" ".repeat(maxLength) + " │")
        }
        if (i === yValues.length - 1) {
            chartData.push(" ".repeat(maxLength) + " └")
        }
    }
    return chartData
}
