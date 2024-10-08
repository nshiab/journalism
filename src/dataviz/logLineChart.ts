import { max, min, Numeric } from "d3-array"
import formatNumber from "../format/formatNumber.js"
import createLine from "./helpers/createLine.js"
import getColors from "./helpers/getColors.js"

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
        `\nLine chart: "${y}" over "${x}"${options.smallMultiples ? `, for each "${options.smallMultiples}` : ""}"}\n`
    )

    const formatX =
        options.formatX ??
        function (d) {
            return String(d)
        }
    const formatY =
        options.formatY ??
        function (d) {
            return String(d)
        }
    const width = options.width ?? 75
    const height = options.height ?? 15
    // const smallMultiplesPerRow = options.smallMultiplesPerRow ?? 3
    const smallMultiples = options.smallMultiples ?? null
    const fixedScales = options.fixedScales ?? false

    if (typeof smallMultiples === "string") {
        const categories = Array.from(
            new Set(data.map((d) => d[smallMultiples]))
        ) as string[]
        const colors = getColors(categories)

        const allLabelsX: string[] = []

        let warning = false

        let xMin: number
        let xMax: number
        let yMin: number
        let yMax: number

        // min and max values for the whole data
        if (fixedScales) {
            const xValues = data.map((d) => d[x])
            xMin = min(xValues as Numeric[]) as number
            xMax = max(xValues as Numeric[]) as number

            const yValues = data.map((d) => d[y])
            yMin = min(yValues as Numeric[]) as number
            yMax = max(yValues as Numeric[]) as number

            if (
                xMin === undefined ||
                xMax === undefined ||
                yMin === undefined ||
                yMax === undefined
            ) {
                throw new Error("The min or max value is undefined.")
            }
        }

        const allCharts = colors?.map((c) => {
            const dataFiltered = data.filter(
                (d) => d[smallMultiples] === c.category
            )

            // The min and max values for each small multiple
            if (!fixedScales) {
                const xValues = dataFiltered
                    .map((d) => d[x])
                    .filter((d) => typeof d === "number")
                xMin = Math.min(...xValues)
                xMax = Math.max(...xValues)

                const yValues = dataFiltered
                    .map((d) => d[y])
                    .filter((d) => typeof d === "number")
                yMin = Math.min(...yValues)
                yMax = Math.max(...yValues)
            }

            if (!warning && dataFiltered.length > width) {
                console.log(
                    `\x1b[90m/!\\ The number of data points (${formatNumber(data.length)}) data is longer than the width ${width}. Multiple "${y}" values are averaged for each "${x}". Increase the width or use a dot chart for a more accuracy.\x1b[0m`
                )
                warning = true
            }

            const { chart, xLabels } = createLine(dataFiltered, x, y, c.color, {
                width: width,
                height: height,
                formatX: formatX,
                formatY: formatY,
                xMin,
                xMax,
                yMin,
                yMax,
            })
            allLabelsX.push(...xLabels)
            return chart
        })

        if (allCharts === undefined) {
            throw new Error("No data to display.")
        }

        let chartString = allCharts
            .map((d) => d.map((j) => j.join("")).join("\n"))
            .join("\n")

        for (let i = 0; i < allLabelsX.length; i++) {
            chartString = chartString
                .replaceAll(allLabelsX[i], `\x1b[90m${allLabelsX[i]}\x1b[0m`)
                .replaceAll(allLabelsX[i], `\x1b[90m${allLabelsX[i]}\x1b[0m`)
        }

        console.log(`\n${chartString}\n`)
    } else {
        const xValues = data.map((d) => d[x])
        const xMin = min(xValues as Numeric[]) as number
        const xMax = max(xValues as Numeric[]) as number

        const yValues = data.map((d) => d[y])
        const yMin = min(yValues as Numeric[]) as number
        const yMax = max(yValues as Numeric[]) as number

        if (
            xMin === undefined ||
            xMax === undefined ||
            yMin === undefined ||
            yMax === undefined
        ) {
            throw new Error("The min or max value is undefined.")
        }

        const { chart, xLabels } = createLine(data, x, y, "\x1b[38;5;208m", {
            formatX: formatX,
            formatY: formatY,
            width: width,
            height: height,
            xMin,
            xMax,
            yMin,
            yMax,
        })

        let chartString = chart.map((d) => d.join("")).join("\n")

        for (let i = 0; i < xLabels.length; i++) {
            chartString = chartString.replace(
                xLabels[i],
                `\x1b[90m${xLabels[i]}\x1b[0m`
            )
        }

        console.log(`\n${chartString}\n`)
    }
}
