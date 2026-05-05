/**
 * Saves an [Observable Plot](https://github.com/observablehq/plot) chart as an image file (`.png`) or an SVG file (`.svg`).
 *
 * @param data - An array of data objects that your Observable Plot chart function expects.
 * @param chart - A function that takes the `data` array and returns an SVG or HTML element representing the chart. Inside this function, `d3`, `Plot`, and `journalismFormat` globals are available, with their members destructured (e.g. `formatNumber`, `formatDate`, `round` from journalism-format; `min`, `max`, `mean`, etc. from d3; and all Plot marks).
 * @param path - The file path where the image or SVG will be saved. The file extension (`.png` or `.svg`) determines the output format.
 * @param options - Optional settings to customize the chart's appearance and behavior.
 *   @param options.style - A CSS string to apply custom styles to the chart.
 *   @param options.dark - If `true`, the chart will be rendered with a dark mode theme. Defaults to `false`.
 * @returns A Promise that resolves when the chart has been successfully saved to the specified path.
 *
 * @example
 * ```ts
 * // Save a simple dot plot as a PNG image.
 * import { plot, dot } from "@observablehq/plot";
 *
 * const dataForPng = [{ year: 2024, value: 10 }, { year: 2025, value: 15 }];
 * const chartForPng = (d) => plot({ marks: [dot(d, { x: "year", y: "value" })] });
 * const pngPath = "output/dot-chart.png";
 *
 * await saveChart(dataForPng, chartForPng, pngPath);
 * console.log(`Chart saved to ${pngPath}`);
 * ```
 *
 * @example
 * ```ts
 * // Save a bar chart as an SVG file with a custom background color.
 * import { plot, barY } from "@observablehq/plot";
 *
 * const dataForSvg = [{ city: "New York", population: 8.4 }, { city: "Los Angeles", population: 3.9 }];
 * const chartForSvg = (d) => plot({ marks: [barY(d, { x: "city", y: "population" })] });
 * const svgPath = "output/bar-chart.svg";
 *
 * await saveChart(dataForSvg, chartForSvg, svgPath, { style: "background-color: #f0f0f0;" });
 * console.log(`Chart saved to ${svgPath}`);
 * ```
 *
 * @category Dataviz
 */
export default function saveChart(data: Iterable<any> | ArrayLike<any>, chart: (data: Iterable<any> | ArrayLike<any>) => SVGSVGElement | HTMLElement, path: string, options?: {
    style?: string;
    dark?: boolean;
}): Promise<void>;
//# sourceMappingURL=saveChart.d.ts.map