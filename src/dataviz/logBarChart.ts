import formatNumber from "../format/formatNumber.ts";
import makeBars from "./helpers/makeBars.ts";

/**
 * Generates and logs a text-based bar chart to the console. This function is useful for quickly visualizing data distributions or comparisons directly within a terminal or log output, without needing a graphical interface. It's particularly effective for presenting categorical data or showing the relative magnitudes of different items.
 *
 * The chart is constructed using ASCII characters, making it universally compatible across various terminal environments. It can display data for various categories and their corresponding numerical values, with extensive options for custom formatting of labels and values, controlling the chart's width, and adding a descriptive title or a total label. For optimal visualization, it's recommended that the input `data` be sorted by the `values` key in descending order, though the function does not enforce this.
 *
 * @param data - An array of objects, where each object represents a bar in the chart. Each object should contain keys corresponding to the `labels` and `values` parameters.
 * @param labels - The key in the data objects whose values will be used as textual labels for each bar (e.g., 'category', 'name', 'country').
 * @param values - The key in the data objects whose numerical values will determine the length of each bar and be displayed alongside the labels (e.g., 'sales', 'count', 'percentage').
 * @param options - Optional configuration for customizing the appearance and behavior of the chart.
 * @param options.formatLabels - A function to format the labels displayed on the chart. It receives the raw label value as input and should return a string. Defaults to converting the label to a string.
 * @param options.formatValues - A function to format the numerical values displayed next to the bars. It receives the raw numerical value as input and should return a string. Defaults to formatting the number using `formatNumber` (which adds commas for thousands, etc.).
 * @param options.width - The maximum width of the bars in characters. The bars will scale proportionally to this width. A larger width allows for more detailed visualization. Defaults to `40`.
 * @param options.title - An optional title to display above the chart. If not provided, a default title based on `labels` and `values` keys will be generated.
 * @param options.totalLabel - An optional label to display for the total sum of all values at the bottom of the chart. If provided, the sum of all `values` will be calculated and displayed next to this label.
 * @param options.compact - If `true`, the chart will be rendered in a more compact format, reducing vertical spacing between bars. Defaults to `false`.
 *
 * @example
 * ```ts
 * // Visualize sales data for different regions.
 * const salesData = [
 *   { region: 'North', sales: 1200 },
 *   { region: 'South', sales: 800 },
 *   { region: 'East', sales: 1500 },
 *   { region: 'West', sales: 950 }
 * ];
 * logBarChart(salesData, 'region', 'sales', { title: 'Regional Sales Overview' });
 * ```
 * @example
 * ```ts
 * // Display product popularity with custom value formatting and a compact layout.
 * const productPopularity = [
 *   { product: 'Laptop', views: 5000 },
 *   { product: 'Mouse', views: 1500 },
 *   { product: 'Keyboard', views: 2500 }
 * ];
 * logBarChart(productPopularity, 'product', 'views', {
 *   formatValues: (v) => `${v / 1000}K`,
 *   width: 30,
 *   compact: true,
 *   totalLabel: 'Total Views'
 * });
 * ```
 * @returns {void}
 * @category Dataviz
 */
export default function logBarChart(
  data: { [key: string]: unknown }[],
  labels: string,
  values: string,
  options: {
    formatLabels?: (d: unknown) => string;
    formatValues?: (d: number) => string;
    width?: number;
    title?: string;
    totalLabel?: string;
    compact?: boolean;
  } = {},
): void {
  if (options.title) {
    console.log(`\n${options.title}`);
  } else {
    console.log(`\nBar chart of "${values}" per "${labels}":`);
  }

  const formatLabels = options.formatLabels ??
    function (d) {
      return String(d);
    };
  const formatValues = options.formatValues ??
    function (d) {
      return formatNumber(d);
    };
  const width = options.width ?? 40;

  const chartData = makeBars(
    data,
    "\x1b[38;5;55m", // Darker purple color
    labels,
    values,
    formatLabels,
    formatValues,
    width,
    options.compact ?? false,
    options.totalLabel,
  );
  console.log(chartData.join("\n"));
}
