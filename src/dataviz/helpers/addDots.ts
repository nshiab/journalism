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
    const xIndexRaw = Math.round((i / (data.length - 1)) * options.width);
    const xIndex = Math.min(xIndexRaw, options.width - 1);
    const yValue = data[i][y];
    if (typeof yValue !== "number") {
      throw new Error(`The value of ${y} is not a number.`);
    }
    const yIndexRaw = Math.round(
      ((yValue - yMin) / (yMax - yMin)) * options.height,
    );
    const yIndex = Math.min(yIndexRaw, options.height - 1);
    chartData[options.height - yIndex - 1][xIndex] = `${color}•\x1b[0m`;
  }
}
