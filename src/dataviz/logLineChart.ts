import addLines from "./helpers/addLines.js"
import prepChart from "./helpers/prepChart.js"

/**
 * Generates and logs a line chart. The data is expected to be sorted by the x-axis values. The line is an averaged approximation of the data when the width is smaller than the number of data points.
 *
 * @example
 * Basic usage
 * ```typescript
 * const data = [
 *     { date: new Date("2023-01-01"), value: 10 },
 *     { date: new Date("2023-02-01"), value: 20 },
 *     { date: new Date("2023-03-01"), value: 30 },
 *     { date: new Date("2023-04-01"), value: 40 },
 * ]
 *
 * logLineChart(data, "date", "value", {
 *     formatX: (d) => d.toISOString().slice(0, 10),
 * })
 * ```
 *
 * @example
 * Small multiples
 * ```typescript
 * const data = [
 *     { date: new Date("2023-01-01"), value: 10, category: "A" },
 *     { date: new Date("2023-02-01"), value: 20, category: "A" },
 *     { date: new Date("2023-03-01"), value: 30, category: "A" },
 *     { date: new Date("2023-04-01"), value: 40, category: "A" },
 *     { date: new Date("2023-01-01"), value: 15, category: "B" },
 *     { date: new Date("2023-02-01"), value: 25, category: "B" },
 *     { date: new Date("2023-03-01"), value: 35, category: "B" },
 *     { date: new Date("2023-04-01"), value: 45, category: "B" },
 * ]
 *
 * logLineChart(data, "date", "value", {
 *     formatX: (d) => (d as Date).toLocaleDateString(),
 *     formatY: (d) => "$" + (d as number).toString(),
 *     smallMultiples: "category",
 * })
 * ```
 *
 * @param data - An array of objects representing the data to be visualized.
 * @param x - The key for the x-axis values in the data objects.
 * @param y - The key for the y-axis values in the data objects.
 * @param options - An optional object to customize the chart.
 * @param options.formatX - A function to format the x-axis values.
 * @param options.formatY - A function to format the y-axis values.
 * @param options.smallMultiples - A key in the data objects to create small multiples of the chart.
 * @param options.fixedScales - A boolean to determine if small multiple scales should be identical.
 * @param options.smallMultiplesPerRow - The number of small multiples per row.
 * @param options.width - The width of the chart.
 * @param options.height - The height of the chart.
 *
 * @category Dataviz
 */
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
    console.log(
        `\nLine chart of "${y}" over "${x}"${options.smallMultiples ? `, for each "${options.smallMultiples}"` : ""}:`
    )

    prepChart("line", data, x, y, addLines, options)
}
