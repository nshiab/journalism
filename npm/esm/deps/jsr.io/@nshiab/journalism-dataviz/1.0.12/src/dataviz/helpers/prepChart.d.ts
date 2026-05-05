export default function prepChart(type: "line" | "dot", data: {
    [key: string]: unknown;
}[], x: string, y: string, drawFunction: (data: {
    [key: string]: unknown;
}[], y: string, yMin: number, yMax: number, color: string, chartData: string[][], options: {
    width: number;
    height: number;
}) => void, options?: {
    formatX?: (d: unknown) => string;
    formatY?: (d: unknown) => string;
    smallMultiples?: string;
    fixedScales?: boolean;
    smallMultiplesPerRow?: number;
    width?: number;
    height?: number;
}): void;
//# sourceMappingURL=prepChart.d.ts.map