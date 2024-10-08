import addDots from "./helpers/addDots.js"
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
    const title = `\nDot chart: "${y}" over "${x}"${options.smallMultiples ? `, for each "${options.smallMultiples}"` : ""}`

    console.log(`\x1b[1m${title}\x1b[0m`)

    prepChart("dot", data, x, y, addDots, options)
}
