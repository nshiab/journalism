import addLines from "./helpers/addLines.ts";
import prepChart from "./helpers/prepChart.ts";

/**
 * Generates and logs a text-based line chart to the console. This function is particularly useful for visualizing trends over time providing a quick and accessible way to understand data progression directly within a terminal or log output.
 *
 * The chart is rendered using ASCII characters, ensuring broad compatibility. It supports custom formatting for both x and y-axis values, and can generate small multiples to compare trends across different categories. When the chart's width is smaller than the number of data points, the line represents an averaged approximation of the data, providing a smoothed view of the trend. For optimal visualization, it's recommended that the input `data` be sorted by the x-axis values.
 *
 * @param data - An array of objects representing the data to be visualized. Each object should contain keys corresponding to the `x` and `y` parameters.
 * @param x - The key in the data objects whose values will be plotted on the x-axis. These values are typically numerical or temporal.
 * @param y - The key in the data objects whose values will be plotted on the y-axis. These values are typically numerical.
 * @param options - An optional object to customize the chart's appearance and behavior.
 * @param options.formatX - A function to format the x-axis values for display. It receives the raw x-value as input and should return a string.
 * @param options.formatY - A function to format the y-axis values for display. It receives the raw y-value as input and should return a string.
 * @param options.smallMultiples - A key in the data objects to create small multiples (separate charts) for each unique value of this key. This is useful for comparing trends across different categories.
 * @param options.fixedScales - If `true` and `smallMultiples` is used, all small multiple charts will share the same x and y scales, allowing for direct comparison of magnitudes. If `false`, each small multiple will have its own independent scales. Defaults to `false`.
 * @param options.smallMultiplesPerRow - The number of small multiples to display per row when `smallMultiples` is used. Defaults to `3`.
 * @param options.width - The width of the chart in characters. This affects the horizontal resolution of the chart. Defaults to `60`.
 * @param options.height - The height of the chart in lines. This affects the vertical resolution of the chart. Defaults to `20`.
 * @param options.title - The title of the chart. If not provided, a default title based on `x`, `y`, and `smallMultiples` (if applicable) will be generated.
 *
 * @example
 * // -- Basic Usage --
 *
 * // Visualize a simple time series of values.
 * const timeSeriesData = [
 *     { date: new Date("2023-01-01"), value: 10 },
 *     { date: new Date("2023-02-01"), value: 20 },
 *     { date: new Date("2023-03-01"), value: 30 },
 *     { date: new Date("2023-04-01"), value: 40 },
 * ];
 *
 * logLineChart(timeSeriesData, "date", "value", {
 *     formatX: (d) => (d as Date).toISOString().slice(0, 10),
 *     title: "Monthly Data Trend",
 * });
 *
 * @example
 * // -- Small Multiples --
 *
 * // Compare trends across different categories using small multiples.
 * const multiCategoryData = [
 *     { date: new Date("2023-01-01"), value: 10, category: "A" },
 *     { date: new Date("2023-02-01"), value: 20, category: "A" },
 *     { date: new Date("2023-03-01"), value: 30, category: "A" },
 *     { date: new Date("2023-04-01"), value: 40, category: "A" },
 *     { date: new Date("2023-01-01"), value: 15, category: "B" },
 *     { date: new Date("2023-02-01"), value: 25, category: "B" },
 *     { date: new Date("2023-03-01"), value: 35, category: "B" },
 *     { date: new Date("2023-04-01"), value: 45, category: "B" },
 * ];
 *
 * logLineChart(multiCategoryData, "date", "value", {
 *     formatX: (d) => (d as Date).toLocaleDateString(),
 *     formatY: (d) => "$" + (d as number).toString(),
 *     smallMultiples: "category",
 *     smallMultiplesPerRow: 2,
 *     fixedScales: true,
 *     title: "Sales Trend by Category",
 * });
 *
 * @category Dataviz
 */
export default function logLineChart(
  data: { [key: string]: unknown }[],
  x: string,
  y: string,
  options: {
    formatX?: (d: unknown) => string;
    formatY?: (d: unknown) => string;
    smallMultiples?: string;
    fixedScales?: boolean;
    smallMultiplesPerRow?: number;
    width?: number;
    height?: number;
    title?: string;
  } = {},
) {
  if (options.title) {
    console.log(`\n${options.title}`);
  } else {
    console.log(
      `\nLine chart of "${y}" over "${x}"${
        options.smallMultiples ? `, for each "${options.smallMultiples}"` : ""
      }:`,
    );
  }

  prepChart("line", data, x, y, addLines, options);
}
