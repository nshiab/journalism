/**
 * Generates the x-axis components for a chart.
 * @param type The type of chart ('line' or 'dot').
 * @param x The key for the x-axis variable.
 * @param options Options for the x-axis, including min/max values, width, and format function.
 * @returns An object containing the x-axis, x-ticks, top frame, and x-labels.
 */
export default function getAxisX(
  type: "line" | "dot",
  x: string,
  options: {
    xMin: unknown;
    xMax: unknown;
    width: number;
    formatX: (d: unknown) => string;
  },
) {
  const xLabelFirst = options.formatX(options.xMin);
  const xLabelLast = options.formatX(options.xMax);

  if (!xLabelFirst || !xLabelLast) {
    throw new Error(`The first or last ${x} is null or undefined.`);
  }

  if (xLabelFirst.length + 3 + xLabelLast.length > options.width) {
    throw new Error(
      `The x labels "${xLabelFirst}" and "${xLabelLast}" are overlapping. Format them using formatX or increase the width.`,
    );
  }

  const xAxis = [];
  for (let i = 0; i < options.width; i++) {
    if (i < xLabelFirst.length) {
      xAxis.push(xLabelFirst[i]);
    } else if (i >= options.width - xLabelLast.length) {
      xAxis.push(xLabelLast[i - (options.width - xLabelLast.length)]);
    } else {
      xAxis.push(" ");
    }
  }

  const xTicks = [];
  const greyDash = "\x1b[90m─\x1b[0m";
  const padding = type === "line" ? 1 : 0;
  for (let i = 0; i < options.width - padding; i++) {
    xTicks.push(greyDash);
  }
  const topFrame = [];
  for (let i = 0; i <= options.width - padding; i++) {
    if (i === 0) {
      topFrame.push("\x1b[90m┌\x1b[0m");
    } else {
      topFrame.push(greyDash);
    }
  }

  return { xAxis, xTicks, topFrame, xLabels: [xLabelFirst, xLabelLast] };
}
