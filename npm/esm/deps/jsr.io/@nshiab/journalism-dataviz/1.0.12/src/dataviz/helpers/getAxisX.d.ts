/**
 * Generates the x-axis components for a chart.
 * @param type The type of chart ('line' or 'dot').
 * @param x The key for the x-axis variable.
 * @param options Options for the x-axis, including min/max values, width, and format function.
 * @returns An object containing the x-axis, x-ticks, top frame, and x-labels.
 */
export default function getAxisX(type: "line" | "dot", x: string, options: {
    xMin: unknown;
    xMax: unknown;
    width: number;
    formatX: (d: unknown) => string;
}): {
    xAxis: string[];
    xTicks: string[];
    topFrame: string[];
    xLabels: string[];
};
//# sourceMappingURL=getAxisX.d.ts.map