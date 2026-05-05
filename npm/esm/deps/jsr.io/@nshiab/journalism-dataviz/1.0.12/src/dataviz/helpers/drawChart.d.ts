/**
 * Draws a chart based on the specified type and data.
 * @param type The type of chart to draw, either 'line' or 'dot'.
 * @param drawFunction The function used to draw the specific chart elements (dots or lines).
 * @param data The data to be plotted.
 * @param x The key for the x-axis values in the data.
 * @param y The key for the y-axis values in the data.
 * @param color The color to use for the chart elements.
 * @param options Configuration options for the chart, including dimensions, axis formatting, and title.
 * @returns An object containing the chart data as a 2D array of strings and the x-axis labels.
 */
export default function drawChart(type: "line" | "dot", drawFunction: (data: {
    [key: string]: unknown;
}[], y: string, yMin: number, yMax: number, color: string, chartData: string[][], options: {
    width: number;
    height: number;
}) => void, data: {
    [key: string]: unknown;
}[], x: string, y: string, color: string, options: {
    title?: string;
    width: number;
    height: number;
    xMin: number;
    xMax: number;
    yMin: number;
    yMax: number;
    formatX: (d: unknown) => string;
    formatY: (d: unknown) => string;
}): {
    chart: string[][];
    xLabels: string[];
};
//# sourceMappingURL=drawChart.d.ts.map