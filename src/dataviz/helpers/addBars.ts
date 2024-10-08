import formatNumber from "../../format/formatNumber.js"

export default function makeBars(
    data: { [key: string]: unknown }[],
    color: string,
    labels: string,
    values: string,
    formatLabels: (d: unknown) => string,
    formatValues: (d: unknown) => string,
    width: number
) {
    const chartData = []

    let labelsData = data.map((d) => formatLabels(d[labels]))
    const maxLength = Math.max(...labelsData.map((d) => d.length))
    labelsData = labelsData.map((d) => d.padStart(maxLength, " "))

    const valuesData = data.map((d) => {
        if (typeof d[values] === "number") {
            return d[values] as number
        } else {
            throw new Error(`${d[values]} is not a number`)
        }
    })
    const maxVal = Math.max(...valuesData)
    const sumVal = valuesData.reduce((acc, d) => acc + d, 0)

    const grey = "\x1b[90m"
    const reset = "\x1b[0m"

    for (let i = 0; i < labelsData.length; i++) {
        if (i === 0) {
            chartData.push(" ".repeat(maxLength) + grey + " ┌" + reset)
        }

        const nbCharacters = Math.round((valuesData[i] / maxVal) * width)
        chartData.push(
            labelsData[i] +
                grey +
                " ┤" +
                reset +
                color +
                "█".repeat(nbCharacters) +
                reset +
                " " +
                formatValues(valuesData[i]) +
                " " +
                grey +
                formatNumber((valuesData[i] / sumVal) * 100, {
                    decimals: 2,
                    suffix: "%",
                }) +
                reset
        )
        if (i === labelsData.length - 1) {
            chartData.push(" ".repeat(maxLength) + grey + " └" + reset)
        } else {
            chartData.push(" ".repeat(maxLength) + grey + " │" + reset)
        }
    }

    const total = `Total "${values}": ${formatValues(sumVal)}`
    console.log(
        `\n${" ".repeat(Math.round(maxLength + 1 + width / 2 - total.length / 2))}${grey}${total}${reset}`
    )

    return chartData
}
