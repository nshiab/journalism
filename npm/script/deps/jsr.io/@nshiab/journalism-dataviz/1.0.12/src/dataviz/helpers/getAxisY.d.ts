/**
 * Generates the y-axis components for a chart.
 * @param options Options for the y-axis, including height, format function, and min/max values.
 * @returns An object containing the y-axis data.
 */
export default function getAxisY(options: {
    height: number;
    formatY: (d: unknown) => string;
    yMin: number;
    yMax: number;
}): {
    yAxis: string[][];
};
//# sourceMappingURL=getAxisY.d.ts.map