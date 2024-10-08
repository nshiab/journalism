import makeBars from "./helpers/makeBars.js"

/**
 * Generates and logs a bar chart. The data is expected to be sorted.
 *
 * @example
 * ```typescript
 * const data = [
 *   { category: 'A', value: 10 },
 *   { category: 'B', value: 20 },
 * ];
 * logBarChart(data, 'category', 'value');
 * ```
 *
 * @param data - An array of objects representing the data to be visualized.
 * @param labels - The key in the data objects to be used for the labels.
 * @param values - The key in the data objects to be used for the values.
 * @param options - Optional configuration for the chart.
 * @param options.formatLabels - A function to format the labels. Defaults to converting the label to a string.
 * @param options.formatValues - A function to format the values. Defaults to converting the value to a string.
 * @param options.width - The width of the chart. Defaults to 40.
 *
 * @category Dataviz
 *
 */
export default function logBarChart(
    data: { [key: string]: unknown }[],
    labels: string,
    values: string,
    options: {
        formatLabels?: (d: unknown) => string
        formatValues?: (d: unknown) => string
        width?: number
    } = {}
) {
    const title = `\nBar chart: "${values}" per "${labels}"`
    console.log(`\x1b[1m${title}\x1b[0m`)

    const formatLabels =
        options.formatLabels ??
        function (d) {
            return String(d)
        }
    const formatValues =
        options.formatValues ??
        function (d) {
            return String(d)
        }
    const width = options.width ?? 40

    const chartData = makeBars(
        data,
        "\x1b[38;5;55m", // Darker purple color
        labels,
        values,
        formatLabels,
        formatValues,
        width
    )
    console.log(chartData.join("\n"))
}
