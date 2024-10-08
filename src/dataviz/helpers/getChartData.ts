export default function getChartData(height: number, width: number) {
    const chartData = []
    for (let i = 0; i < height; i++) {
        const row = []
        for (let j = 0; j < width; j++) {
            row.push(" ")
        }
        chartData.push(row)
    }

    return chartData
}
