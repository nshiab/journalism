export default function addLines(
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
  const chartValues: { x: number; y: number }[] = [];
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

    chartValues.push({ x: xIndex, y: yIndex });
  }

  const avgValues: { x: number; y: number | null }[] = [];
  for (let x = 0; x < options.width; x++) {
    const values = chartValues.filter((d) => d.x === x).map((d) => d.y);
    pushAvgValue(avgValues, values, x, options);
  }

  fillEmpty(avgValues);

  drawLine(avgValues, chartData, color, options);
}

function pushAvgValue(
  avgValues: { x: number; y: number | null }[],
  values: number[],
  x: number,
  options: { height: number },
) {
  if (values.length === 0) {
    avgValues.push({
      x: x,
      y: null,
    });
  } else {
    avgValues.push({
      x: x,
      y: Math.min(
        Math.round(values.reduce((a, b) => a + b) / values.length),
        options.height - 1,
      ),
    });
  }
}

function draw(
  chartData: string[][],
  currY: number | null,
  nextY: number | null,
  x: number,
  color: string,
  options: { height: number },
) {
  if (typeof currY === "number" && typeof nextY === "number") {
    if (nextY === currY) {
      chartData[options.height - currY - 1][x] = `${color}─\x1b[0m`;
    } else if (nextY < currY) {
      chartData[options.height - currY - 1][x] = `${color}┐\x1b[0m`;
      for (let y = currY - 1; y > nextY; y--) {
        chartData[options.height - y - 1][x] = `${color}│\x1b[0m`;
      }
      chartData[options.height - nextY - 1][x] = `${color}└\x1b[0m`;
    } else if (nextY > currY) {
      chartData[options.height - currY - 1][x] = `${color}┘\x1b[0m`;
      for (let y = currY + 1; y < nextY; y++) {
        chartData[options.height - y - 1][x] = `${color}│\x1b[0m`;
      }
      chartData[options.height - nextY - 1][x] = `${color}┌\x1b[0m`;
    } else {
      throw new Error("This should not happen.");
    }
  } else if (typeof currY === "number") {
    chartData[options.height - currY - 1][x] = "•";
  }
}

function fillEmpty(avgValues: { x: number; y: number | null }[]) {
  let prevY = null;
  for (let x = 0; x < avgValues.length; x++) {
    if (avgValues[x].y === null) {
      avgValues[x].y = prevY;
    } else {
      prevY = avgValues[x].y;
    }
  }
}

function drawLine(
  avgValues: { x: number; y: number | null }[],
  chartData: string[][],
  color: string,
  options: { width: number; height: number },
) {
  for (let x = 0; x < avgValues.length; x++) {
    if (x === options.width - 1) {
      continue;
    } else {
      const currY = avgValues[x].y;
      const nextY = avgValues[x + 1].y;

      draw(chartData, currY, nextY, x, color, options);
    }
  }
}
