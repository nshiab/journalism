import getAxisX from "./helpers/getAxisX.js"
import getAxisY from "./helpers/getAxisY.js"
import getChartData from "./helpers/getChartData.js"
import addDots from "./helpers/addDots.js"
import getColors from "./helpers/getColors.js"
import addLines from "./helpers/addLines.js"
import { capitalize } from "../bundle.js"
import makeBars from "./helpers/addBars.js"

export default function logChart(
    data: { [key: string]: unknown }[],
    type: "dot" | "barHorizontal" | "line",
    x: string,
    y: string,
    options: {
        categories?: string
        xLabels?: string
        width?: number
        height?: number
        yDecimals?: number
        xDecimals?: number
    } = {}
) {
    if (type === "barHorizontal") {
        console.log(`\nBar chart: "${x}" per "${y}"\n`)
        options.width = options.width ?? 40
    } else {
        console.log(`\n${capitalize(type)} chart: "${y}" over "${x}"\n`)
        options.width = options.width ?? 75
    }

    options.xLabels = options.xLabels ?? x

    options.height = options.height ?? 15

    if (type === "barHorizontal") {
        const chartData = makeBars(data, x, y, options)
        console.log(chartData.join("\n"))
    } else if (type === "dot" || type === "line") {
        const { xAxis, xTicks, xLabelFirstString, xLabelLastString } = getAxisX(
            data,
            x,
            {
                xLabels: options.xLabels,
                width: options.width,
            }
        )

        const { yAxis, yMin, yMax } = getAxisY(data, y, {
            height: options.height,
            yDecimals: options.yDecimals,
        })

        const chartData = getChartData(options.height, options.width)

        const colors = getColors(data, options.categories)

        if (type === "dot") {
            addDots(data, y, yMin, yMax, chartData, {
                categories: options.categories,
                colors: colors,
                width: options.width,
                height: options.height,
            })
        } else if (type === "line") {
            addLines(data, y, yMin, yMax, chartData, {
                categories: options.categories,
                colors: colors,
                width: options.width,
                height: options.height,
            })
        }

        if (colors) {
            console.log(
                colors.map((d) => `${d.color}•\x1b[0m ${d.category}`).join("  ")
            )
        }

        const chart = [...chartData, xTicks, xAxis]
        // We add the y-axis and y-ticks
        for (let i = 0; i < chart.length; i++) {
            chart[i].unshift(...yAxis[i])
        }

        const chartString = chart
            .map((d) => d.join(""))
            .join("\n")
            .replace(xLabelFirstString, `\x1b[90m${xLabelFirstString}\x1b[0m`)
            .replace(xLabelLastString, `\x1b[90m${xLabelLastString}\x1b[0m`)

        console.log(`\n${chartString}\n`)
    } else {
        throw new Error(`The type ${type} is not supported.`)
    }
}
