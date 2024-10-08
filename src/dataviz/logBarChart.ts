import makeBars from "./helpers/addBars.js"

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
