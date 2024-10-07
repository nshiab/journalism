export default function addDots(
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
    const categories = options.categories ?? null

    let warning = false
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
        if (options.colors && categories) {
            const color = options.colors.find(
                (d) => d.category === data[i][categories]
            )
            if (!color) {
                throw new Error(
                    `The category ${data[i][categories]} is not in the colors.`
                )
            }
            if (chartData[options.height - yIndex - 1][xIndex] !== " ") {
                if (!warning) {
                    console.log(
                        "\x1b[90m/!\\ Some categories are overlapping.\x1b[0m"
                    )
                    warning = true
                }
            }
            chartData[options.height - yIndex - 1][xIndex] =
                `${color.color}•\x1b[0m`
        } else {
            chartData[options.height - yIndex - 1][xIndex] = "\x1b[34m•\x1b[0m"
        }
    }
}
