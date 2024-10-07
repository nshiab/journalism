import formatNumber from "../../format/formatNumber.js"

export default function getAxisX(
    data: { [key: string]: unknown }[],
    x: string,
    options: {
        xLabels: string
        width: number
    }
) {
    const xLabelFirst = data[0][options.xLabels]
    const xLabelLast = data[data.length - 1][options.xLabels]

    if (!xLabelFirst || !xLabelLast) {
        throw new Error(`The first or last ${x} is null or undefined.`)
    }

    const xLabelFirstString =
        typeof xLabelFirst === "number"
            ? formatNumber(xLabelFirst)
            : xLabelFirst.toString()
    const xLabelLastString =
        typeof xLabelLast === "number"
            ? formatNumber(xLabelLast)
            : xLabelLast.toString()

    options.width = Math.max(
        options.width,
        xLabelFirstString.length + 3 + xLabelLastString.length
    )

    const xAxis = []
    for (let i = 0; i < options.width; i++) {
        if (i < xLabelFirstString.length) {
            xAxis.push(xLabelFirstString[i])
        } else if (i >= options.width - xLabelFirstString.length) {
            xAxis.push(
                xLabelLastString[i - (options.width - xLabelFirstString.length)]
            )
        } else {
            xAxis.push(" ")
        }
    }

    const xTicks = []
    const greyDash = "\x1b[90m─\x1b[0m"
    for (let i = 0; i < options.width; i++) {
        xTicks.push(greyDash)
    }

    return { xAxis, xTicks, xLabelFirstString, xLabelLastString }
}
