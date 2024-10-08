export default function getColors(categories: string[]) {
    const colorCodes = [
        "\x1b[38;5;208m", // Orange
        "\x1b[31m", // Red
        "\x1b[32m", // Green
        "\x1b[33m", // Yellow
        "\x1b[34m", // Blue
        "\x1b[35m", // Magenta
        "\x1b[36m", // Cyan
    ]
    const colors = categories.map((d, i) => ({
        category: d,
        color: colorCodes[i % colorCodes.length],
    }))

    return colors
}
