import getAxisX from "./getAxisX.js"
import getAxisY from "./getAxisY.js"
import getChartData from "./getChartData.js"

export default function drawChart(
    type: "line" | "dot",
    drawFunction: (
        data: { [key: string]: unknown }[],
        y: string,
        yMin: number,
        yMax: number,
        color: string,
        chartData: string[][],
        options: {
            width: number
            height: number
        }
    ) => void,
    data: { [key: string]: unknown }[],
    x: string,
    y: string,
    color: string,
    options: {
        title?: string
        width: number
        height: number
        xMin: number
        xMax: number
        yMin: number
        yMax: number
        formatX: (d: unknown) => string
        formatY: (d: unknown) => string
    }
): { chart: string[][]; xLabels: string[] } {
    const { xAxis, xTicks, xLabels, topFrame } = getAxisX(type, x, {
        xMin: options.xMin,
        xMax: options.xMax,
        formatX: options.formatX,
        width: options.width,
    })

    const { yAxis } = getAxisY(data, y, {
        height: options.height,
        formatY: options.formatY,
        yMin: options.yMin,
        yMax: options.yMax,
    })

    const chartData = getChartData(type, options.height, options.width)

    drawFunction(data, y, options.yMin, options.yMax, color, chartData, {
        width: options.width,
        height: options.height,
    })

    const chart = [topFrame, ...chartData, xTicks, xAxis]
    // We add the y-axis and y-ticks
    for (let i = 0; i < chart.length; i++) {
        chart[i].unshift(...yAxis[i])
    }

    // We close the frame
    for (let i = 0; i < chart.length; i++) {
        if (i === 0) {
            chart[i].push("\x1b[90m┐\x1b[0m")
        } else if (i > 0 && i < chart.length - 2) {
            chart[i].push("\x1b[90m│\x1b[0m")
        } else if (i === chart.length - 2) {
            chart[i].push("\x1b[90m┘\x1b[0m")
        }
    }

    if (options.title) {
        chart.unshift([
            `${options.title}`
                .padEnd(chart[0].length, " ")
                .replace(options.title, `\x1b[2m${options.title}\x1b[0m`),
        ])
    }

    return { chart, xLabels }
}
