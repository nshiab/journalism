/**
 * Initializes a 2D array representing the chart data grid.
 * @param type The type of chart ('line' or 'dot').
 * @param height The height of the chart grid.
 * @param width The width of the chart grid.
 * @returns A 2D array of strings, initialized with spaces.
 */
export default function getChartData(
  type: "line" | "dot",
  height: number,
  width: number,
) {
  const padding = type === "line" ? 1 : 0;
  const chartData = [];
  for (let i = 0; i < height; i++) {
    const row = [];
    for (let j = 0; j < width - padding; j++) {
      row.push(" ");
    }
    chartData.push(row);
  }

  return chartData;
}
