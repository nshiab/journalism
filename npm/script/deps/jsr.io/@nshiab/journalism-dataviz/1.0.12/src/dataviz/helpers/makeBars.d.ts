/**
 * Generates the bar chart data as an array of strings, ready for console logging.
 * @param data The data for the bar chart.
 * @param color The color for the bars.
 * @param labels The key for the labels in the data.
 * @param values The key for the values in the data.
 * @param formatLabels A function to format the labels.
 * @param formatValues A function to format the values.
 * @param width The width of the bars.
 * @param compact If true, the chart will be compact.
 * @param totalLabel An optional label for the total sum.
 * @returns An array of strings representing the bar chart.
 */
export default function makeBars(data: {
    [key: string]: unknown;
}[], color: string, labels: string, values: string, formatLabels: (d: unknown) => string, formatValues: (d: number) => string, width: number, compact: boolean, totalLabel?: string): string[];
//# sourceMappingURL=makeBars.d.ts.map