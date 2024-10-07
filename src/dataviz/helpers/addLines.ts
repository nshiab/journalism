export default function addLines(
    data: { [key: string]: unknown }[],
    y: string,
    yMin: number,
    yMax: number,
    chartData: string[][],
    options: {
        categories?: string
        colors?: { color: string; category: unknown }[]
        width: number
        height: number
    }
) {
    if (data.length > options.width) {
        console.log(
            "\x1b[90m/!\\ The data is longer than the width. This is an approximation.\x1b[0m"
        )
    }

    const categories = options.categories ?? null

    const chartValues: { x: number; y: number; categories?: unknown }[] = []
    for (let i = 0; i < data.length; i++) {
        const xIndexRaw = Math.round((i / (data.length - 1)) * options.width)
        const xIndex = Math.min(xIndexRaw, options.width - 1)
        const yValue = data[i][y]
        if (typeof yValue !== "number") {
            throw new Error(`The value of ${y} is not a number.`)
        }
        const yIndexRaw = Math.round(
            ((yValue - yMin) / (yMax - yMin)) * options.height
        )
        const yIndex = Math.min(yIndexRaw, options.height - 1)

        if (categories === null) {
            chartValues.push({ x: xIndex, y: yIndex })
        } else {
            chartValues.push({
                x: xIndex,
                y: yIndex,
                categories: data[i][categories],
            })
        }
    }

    const categoriesValues = Array.from(
        new Set(chartValues.map((d) => d.categories))
    ).filter((d) => d !== undefined)

    const avgValues: { x: number; y: number | null; categorie?: unknown }[] = []
    for (let x = 0; x < options.width; x++) {
        if (categoriesValues.length > 0) {
            for (const c of categoriesValues) {
                const values = chartValues
                    .filter((d) => d.x === x && d.categories === c)
                    .map((d) => d.y)
                pushAvgValue(avgValues, values, x, { ...options, category: c })
            }
        } else {
            const values = chartValues.filter((d) => d.x === x).map((d) => d.y)
            pushAvgValue(avgValues, values, x, options)
        }
    }

    if (categoriesValues.length > 0 && options.colors) {
        for (const c of categoriesValues) {
            const color = options.colors.find((d) => d.category === c)?.color
            if (!color) {
                throw new Error(`The category ${c} is not in the colors.`)
            }
            drawLine(
                avgValues.filter((d) => d.categorie === c),
                chartData,
                color,
                options
            )
        }
    } else {
        drawLine(avgValues, chartData, "\x1b[34m", options)
    }
}

function pushAvgValue(
    avgValues: { x: number; y: number | null; categorie?: unknown }[],
    values: number[],
    x: number,
    options: { height: number; category?: unknown }
) {
    if (values.length === 0) {
        avgValues.push({
            x: x,
            y: null,
        })
    } else {
        avgValues.push({
            x: x,
            y: Math.min(
                Math.round(values.reduce((a, b) => a + b) / values.length),
                options.height - 1
            ),
            categorie: options.category,
        })
    }
}

function draw(
    chartData: string[][],
    currY: number | null,
    nextY: number | null,
    x: number,
    color: string,
    options: { height: number }
) {
    if (typeof currY === "number" && typeof nextY === "number") {
        if (nextY === currY) {
            chartData[options.height - currY - 1][x] = `${color}─\x1b[0m`
        } else if (nextY < currY) {
            chartData[options.height - currY - 1][x] = `${color}┐\x1b[0m`
            for (let y = currY - 1; y > nextY; y--) {
                chartData[options.height - y - 1][x] = `${color}│\x1b[0m`
            }
            chartData[options.height - nextY - 1][x] = `${color}└\x1b[0m`
        } else if (nextY > currY) {
            chartData[options.height - currY - 1][x] = `${color}┘\x1b[0m`
            for (let y = currY + 1; y < nextY; y++) {
                chartData[options.height - y - 1][x] = `${color}│\x1b[0m`
            }
            chartData[options.height - nextY - 1][x] = `${color}┌\x1b[0m`
        } else {
            throw new Error("This should not happen.")
        }
    } else if (typeof currY === "number") {
        chartData[options.height - currY - 1][x] = "•"
    }
}

let warning = false

function drawLine(
    avgValues: { x: number; y: number | null }[],
    chartData: string[][],
    color: string,
    options: { width: number; height: number }
) {
    for (let x = 0; x < avgValues.length; x++) {
        if (x === options.width - 1) {
            continue
        } else {
            const currY = avgValues[x].y
            const nextY = avgValues[x + 1].y

            if (
                typeof currY === "number" &&
                chartData[options.height - currY - 1][x] !== " "
            ) {
                if (!warning) {
                    console.log(
                        "\x1b[90m/!\\ Some categories are overlapping.\x1b[0m"
                    )
                }
                warning = true
            }

            draw(chartData, currY, nextY, x, color, options)
        }
    }
}
