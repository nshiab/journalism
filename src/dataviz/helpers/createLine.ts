import addLines from "./addLines.js"
import getAxisX from "./getAxisX.js"
import getAxisY from "./getAxisY.js"
import getChartData from "./getChartData.js"

export default function createLine(
    data: { [key: string]: unknown }[],
    x: string,
    y: string,
    color: string,
    options: {
        width: number
        height: number
        xMin: number
        xMax: number
        yMin: number
        yMax: number
        formatX: (d: unknown) => string
        formatY: (d: unknown) => string
    }
) {
    const { xAxis, xTicks, xLabels } = getAxisX(data, x, {
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

    const chartData = getChartData(options.height, options.width)

    addLines(data, y, options.yMin, options.yMax, color, chartData, {
        width: options.width,
        height: options.height,
    })

    const chart = [...chartData, xTicks, xAxis]
    // We add the y-axis and y-ticks
    for (let i = 0; i < chart.length; i++) {
        chart[i].unshift(...yAxis[i])
    }

    return { chart, xLabels }
}
