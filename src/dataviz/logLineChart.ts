import addLines from "./helpers/addLines.js"
import prepChart from "./helpers/prepChart.js"

export default function logLineChart(
    data: { [key: string]: unknown }[],
    x: string,
    y: string,
    options: {
        formatX?: (d: unknown) => string
        formatY?: (d: unknown) => string
        smallMultiples?: string
        fixedScales?: boolean
        smallMultiplesPerRow?: number
        width?: number
        height?: number
    } = {}
) {
    const title = `\nLine chart: "${y}" over "${x}"${options.smallMultiples ? `, for each "${options.smallMultiples}"` : ""}\n`
    console.log(`\x1b[1m${title}\x1b[0m`)

    prepChart("line", data, x, y, addLines, options)
}
