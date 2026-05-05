export default function addDots(
  data: { [key: string]: unknown }[],
  y: string,
  yMin: number,
  yMax: number,
  color: string,
  chartData: string[][],
  options: {
    width: number;
    height: number;
  },
) {
  for (let i = 0; i < data.length; i++) {
    // Handle case where data.length is 1 to avoid division by zero
    const xIndexRaw = data.length === 1
      ? Math.round(options.width / 2)
      : Math.round((i / (data.length - 1)) * options.width);
    const xIndex = Math.min(xIndexRaw, options.width - 1);
    const yValue = data[i][y];
    if (typeof yValue !== "number") {
      throw new Error(`The value of ${y} is not a number.`);
    }
    // Handle case where yMax equals yMin to avoid division by zero
    const yIndexRaw = yMax === yMin
      ? Math.round(options.height / 2)
      : Math.round(((yValue - yMin) / (yMax - yMin)) * options.height);
    const yIndex = Math.min(yIndexRaw, options.height - 1);
    chartData[options.height - yIndex - 1][xIndex] = `${color}•\x1b[0m`;
  }
}
