/**
 * Generates the y-axis components for a chart.
 * @param options Options for the y-axis, including height, format function, and min/max values.
 * @returns An object containing the y-axis data.
 */
export default function getAxisY(
  options: {
    height: number;
    formatY: (d: unknown) => string;
    yMin: number;
    yMax: number;
  },
) {
  let yMinString = options.formatY(options.yMin);
  let yMaxString = options.formatY(options.yMax);

  const yTicksLength = Math.max(yMinString.length, yMaxString.length);
  if (yMinString.length < yTicksLength) {
    yMinString = yMinString.padStart(yTicksLength, " ");
  }
  if (yMaxString.length < yTicksLength) {
    yMaxString = yMaxString.padStart(yTicksLength, " ");
  }

  const yAxis = [];
  const yPadding = Array.from({ length: yTicksLength }).map(() => " ");
  const greyPipe = "\x1b[90m│\x1b[0m";
  for (let i = 0; i < options.height; i++) {
    if (i === 0) {
      yAxis.push([`\x1b[90m${yMaxString}\x1b[0m`, greyPipe]);
    } else if (i === options.height - 1) {
      yAxis.push([`\x1b[90m${yMinString}\x1b[0m`, greyPipe]);
    } else {
      yAxis.push([...yPadding, greyPipe]);
    }
  }
  // For the two last lines, the x-axis
  yAxis.push([...yPadding, "\x1b[90m└\x1b[0m"]);
  yAxis.push([...yPadding, " "]);

  // For the top frame
  yAxis.unshift([...yPadding]);

  return { yAxis };
}
