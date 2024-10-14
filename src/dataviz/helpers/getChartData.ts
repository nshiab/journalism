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
