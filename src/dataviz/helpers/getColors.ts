export default function getColors(
    data: { [key: string]: unknown }[],
    categories?: string
) {
    const colorCodes = [
        "\x1b[31m", // Red
        "\x1b[32m", // Green
        "\x1b[33m", // Yellow
        "\x1b[34m", // Blue
        "\x1b[35m", // Magenta
        "\x1b[36m", // Cyan
        "\x1b[91m", // Bright Red
        "\x1b[92m", // Bright Green
        "\x1b[93m", // Bright Yellow
        "\x1b[94m", // Bright Blue
        "\x1b[95m", // Bright Magenta
        "\x1b[96m", // Bright Cyan
    ]
    const cats = categories ?? null
    const colors =
        typeof cats === "string"
            ? Array.from(new Set(data.map((d) => d[cats]))).map((d, i) => ({
                  category: d,
                  color: colorCodes[i % colorCodes.length],
              }))
            : undefined

    return colors
}
