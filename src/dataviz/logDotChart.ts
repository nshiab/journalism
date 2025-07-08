import addDots from "./helpers/addDots.ts";
import prepChart from "./helpers/prepChart.ts";

/**
 * Generates and logs a text-based dot chart to the console. This function is ideal for visualizing the relationship between two numerical variables. It provides a quick, terminal-friendly way to inspect data trends and distributions.
 *
 * The chart is rendered using ASCII characters, ensuring compatibility across various terminal environments. It supports custom formatting for both x and y-axis values, and can generate small multiples to compare distributions across different categories. While the function expects data to be sorted by the x-axis values for proper rendering, it does not enforce this.
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
 * ```ts
 * // Visualize a time series of values.
 * const timeSeriesData = [
 *     { date: new Date("2023-01-01"), value: 10 },
 *     { date: new Date("2023-02-01"), value: 20 },
 *     { date: new Date("2023-03-01"), value: 30 },
 *     { date: new Date("2023-04-01"), value: 40 },
 * ];
 *
 * logDotChart(timeSeriesData, "date", "value", {
 *     formatX: (d) => (d as Date).toISOString().slice(0, 10),
 *     formatY: (d) => "$" + (d as number).toString(),
 *     title: "Monthly Sales Trend",
 * });
 * ```
 *
 * @example
 * ```ts
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
 * logDotChart(multiCategoryData, "date", "value", {
 *     formatX: (d) => (d as Date).toISOString().slice(0, 10),
 *     formatY: (d) => "$" + (d as number).toString(),
 *     smallMultiples: "category",
 *     smallMultiplesPerRow: 2,
 *     fixedScales: true,
 *     title: "Sales Trend by Category",
 * });
 * ```
 *
 * @category Dataviz
 */
export default function logDotChart(
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
    title?: number;
  } = {},
) {
  if (options.title) {
    console.log(`\n${options.title}`);
  } else {
    console.log(
      `\nDot chart of "${y}" over "${x}"${
        options.smallMultiples ? `, for each "${options.smallMultiples}"` : ""
      }:`,
    );
  }

  prepChart("dot", data, x, y, addDots, options);
}
