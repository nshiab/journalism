import * as dntShim from "../../../../../../../_dnt.shims.js";
import * as Plot from "@observablehq/plot";
import * as d3 from "d3-array";
import { formatDate, formatNumber, round } from "../../../../journalism-format/1.1.7/src/index.js";
import { createCanvas } from "@napi-rs/canvas";
import { parseHTML } from "linkedom";
import { Resvg } from "@resvg/resvg-js";
import { writeFileSync } from "node:fs";

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
export default async function saveChart(
  // deno-lint-ignore no-explicit-any
  data: Iterable<any> | ArrayLike<any>,
  // deno-lint-ignore no-explicit-any
  chart: (data: Iterable<any> | ArrayLike<any>) => SVGSVGElement | HTMLElement,
  path: string,
  options: { style?: string; dark?: boolean } = {},
): Promise<void> {
  // To satisfy the requirement of async function having an await
  await Promise.resolve();

  const {
    document,
    window,
    Node,
    Element,
    HTMLElement,
    SVGElement,
    CustomEvent,
  } = parseHTML(
    "<!DOCTYPE html><html><body></body></html>",
  );

  const plotMarks = [
    "Area",
    "Arrow",
    "BarX",
    "BarY",
    "Cell",
    "Contour",
    "Density",
    "Dot",
    "Frame",
    "Geo",
    "Hexgrid",
    "Image",
    "Line",
    "Link",
    "Mark",
    "Raster",
    "Rect",
    "RuleX",
    "RuleY",
    "Text",
    "TickX",
    "TickY",
    "Tip",
    "Vector",
    "WaffleX",
    "WaffleY",
    "area",
    "areaX",
    "areaY",
    "arrow",
    "auto",
    "autoSpec",
    "axisFx",
    "axisFy",
    "axisX",
    "axisY",
    "barX",
    "barY",
    "bin",
    "binX",
    "binY",
    "bollinger",
    "bollingerX",
    "bollingerY",
    "boxX",
    "boxY",
    "cell",
    "cellX",
    "cellY",
    "centroid",
    "circle",
    "cluster",
    "column",
    "contour",
    "crosshair",
    "crosshairX",
    "crosshairY",
    "delaunayLink",
    "delaunayMesh",
    "density",
    "differenceX",
    "differenceY",
    "dodgeX",
    "dodgeY",
    "dot",
    "dotX",
    "dotY",
    "filter",
    "find",
    "formatIsoDate",
    "formatMonth",
    "formatWeekday",
    "frame",
    "geo",
    "geoCentroid",
    "graticule",
    "gridFx",
    "gridFy",
    "gridX",
    "gridY",
    "group",
    "groupX",
    "groupY",
    "groupZ",
    "hexagon",
    "hexbin",
    "hexgrid",
    "hull",
    "identity",
    "image",
    "indexOf",
    "initializer",
    "interpolateNearest",
    "interpolateNone",
    "interpolatorBarycentric",
    "interpolatorRandomWalk",
    "legend",
    "line",
    "lineX",
    "lineY",
    "linearRegressionX",
    "linearRegressionY",
    "link",
    "map",
    "mapX",
    "mapY",
    "marks",
    "normalize",
    "normalizeX",
    "normalizeY",
    "numberInterval",
    "plot",
    "pointer",
    "pointerX",
    "pointerY",
    "raster",
    "rect",
    "rectX",
    "rectY",
    "reverse",
    "ruleX",
    "ruleY",
    "scale",
    "select",
    "selectFirst",
    "selectLast",
    "selectMaxX",
    "selectMaxY",
    "selectMinX",
    "selectMinY",
    "shiftX",
    "shiftY",
    "shuffle",
    "sort",
    "sphere",
    "spike",
    "stackX",
    "stackX1",
    "stackX2",
    "stackY",
    "stackY1",
    "stackY2",
    "text",
    "textX",
    "textY",
    "tickX",
    "tickY",
    "timeInterval",
    "tip",
    "transform",
    "tree",
    "treeLink",
    "treeNode",
    "utcInterval",
    "valueof",
    "vector",
    "vectorX",
    "vectorY",
    "voronoi",
    "voronoiMesh",
    "waffleX",
    "waffleY",
    "windowX",
    "windowY",
  ];
  const d3Functions = [
    "min",
    "minIndex",
    "max",
    "maxIndex",
    "mean",
    "median",
    "medianIndex",
    "extent",
  ];

  const keysToSet = [
    "document",
    "window",
    "Node",
    "Element",
    "HTMLElement",
    "SVGElement",
    "CustomEvent",
    "Canvas",
    "Image",
    "Plot",
    "d3",
    "journalismFormat",
    "formatDate",
    "formatNumber",
    "round",
    ...plotMarks,
    ...d3Functions,
  ];

  // deno-lint-ignore no-explicit-any
  const oldGlobals: any = {};
  for (const key of keysToSet) {
    // @ts-ignore: saving globals
    // deno-lint-ignore no-explicit-any
    oldGlobals[key] = (dntShim.dntGlobalThis as any)[key];
  }

  try {
    // Setup globals for the chart function and Plot
    // @ts-ignore: setting globals
    globalThis.document = document;
    // @ts-ignore: setting globals
    globalThis.window = window;
    // @ts-ignore: setting globals
    globalThis.Node = Node;
    // @ts-ignore: setting globals
    globalThis.Element = Element;
    // @ts-ignore: setting globals
    globalThis.HTMLElement = HTMLElement;
    // @ts-ignore: setting globals
    globalThis.SVGElement = SVGElement;
    // @ts-ignore: setting globals
    globalThis.CustomEvent = CustomEvent;
    // @ts-ignore: setting globals
    globalThis.Canvas = class {};
    // @ts-ignore: setting globals
    globalThis.Image = class {};
    // @ts-ignore: setting globals
    globalThis.Plot = Plot;
    // @ts-ignore: setting globals
    globalThis.d3 = d3;
    // @ts-ignore: setting globals
    globalThis.journalismFormat = { formatDate, formatNumber, round };
    // @ts-ignore: setting globals
    globalThis.formatDate = formatDate;
    // @ts-ignore: setting globals
    globalThis.formatNumber = formatNumber;
    // @ts-ignore: setting globals
    globalThis.round = round;

    for (const key of plotMarks) {
      // @ts-ignore: setting globals
      dntShim.dntGlobalThis[key] = Plot[key as keyof typeof Plot];
    }
    for (const key of d3Functions) {
      // @ts-ignore: setting globals
      dntShim.dntGlobalThis[key] = d3[key as keyof typeof d3];
    }

    // @ts-ignore: setup canvas
    document.createElement = ((orig) => (tagName: string) => {
      if (tagName.toLowerCase() === "canvas") {
        return createCanvas(1, 1);
      }
      return orig.call(document, tagName);
    })(document.createElement);

    const element = chart(data);

    let title = "";
    let subtitle = "";
    let caption = "";
    const svgStrings: string[] = [];

    let chartWidth = 640;

    if (element.tagName === "FIGURE" || element.nodeName === "FIGURE") {
      const h2 = element.querySelector("h2");
      if (h2) title = h2.textContent || "";
      const h3 = element.querySelector("h3");
      if (h3) subtitle = h3.textContent || "";
      const figcaption = element.querySelector("figcaption");
      if (figcaption) caption = figcaption.textContent || "";

      // Try to find the main chart width first
      let maxChildWidth = 0;
      for (const svg of element.querySelectorAll("svg")) {
        const widthMatch = svg.outerHTML.match(/width="([\d.]+)"/);
        if (widthMatch) {
          const w = parseFloat(widthMatch[1]);
          if (w > 100) maxChildWidth = Math.max(maxChildWidth, w);
        }
      }
      chartWidth = maxChildWidth || 640;

      // Extract SVGs and Canvases (legends)
      const children = Array.from(element.children);
      for (const child of children as HTMLElement[]) {
        if (child.tagName === "SVG") {
          svgStrings.push(child.outerHTML);
        } else if (child.querySelector("canvas")) {
          // deno-lint-ignore no-explicit-any
          const canvas = child.querySelector("canvas") as any;
          const width = canvas.width;
          const height = canvas.height;
          const dataUrl = canvas.toDataURL();
          svgStrings.push(
            `<svg width="${chartWidth}" height="${height}" viewBox="0 0 ${chartWidth} ${height}"><image x="20" href="${dataUrl}" width="${width}" height="${height}" /></svg>`,
          );
        } else if (
          child.classList.contains("plot-legend") ||
          child.className?.includes("-legend") ||
          child.className?.includes("-swatches")
        ) {
          // Handle HTML Legends (Categorical, etc.)
          const items = child.querySelectorAll(
            '[class*="-swatch"], [class*="-item"]',
          );
          if (items.length > 0) {
            let legendSvg = `<svg width="${chartWidth}" height="${
              Math.ceil(items.length / 5) * 20 + 10
            }" viewBox="0 0 ${chartWidth} ${
              Math.ceil(items.length / 5) * 20 + 10
            }">`;

            let currentX = 0; // The legend wrapper itself will be offset by 20px later
            let currentY = 0;

            items.forEach((item) => {
              const swatch = item.querySelector("svg");
              const text = item.textContent?.trim() || "";

              // Estimate width (swatch + text + padding)
              const itemWidth = 20 + (text.length * 8) + 15;

              if (currentX + itemWidth > chartWidth) {
                currentX = 0; // Reset to 0 for next line
                currentY += 20;
              }

              if (swatch) {
                legendSvg += swatch.outerHTML.replace(
                  "<svg ",
                  `<svg x="${currentX}" y="${currentY}" `,
                );
              }
              legendSvg += `<text x="${currentX + 20}" y="${
                currentY + 12
              }" font-size="12" fill="${
                options.dark ? "#B0B0B0" : "currentColor"
              }">${text}</text>`;

              currentX += itemWidth;
            });
            legendSvg += `</svg>`;
            svgStrings.push(legendSvg);
          }
        } else {
          // Fallback: look for any SVGs or Canvases in children
          const svgs = child.querySelectorAll("svg");
          if (svgs.length > 0) {
            for (const svg of svgs) svgStrings.push(svg.outerHTML);
          } else {
            // deno-lint-ignore no-explicit-any
            const canvas = child.querySelector("canvas") as any;
            if (canvas) {
              const width = canvas.width;
              const height = canvas.height;
              const dataUrl = canvas.toDataURL();
              svgStrings.push(
                `<svg width="${chartWidth}" height="${height}" viewBox="0 0 ${chartWidth} ${height}"><image x="20" href="${dataUrl}" width="${width}" height="${height}" /></svg>`,
              );
            }
          }
        }
      }
    } else if (
      element.tagName === "svg" || element.nodeName === "svg" ||
      element.tagName === "SVG" || element.nodeName === "SVG"
    ) {
      // deno-lint-ignore no-explicit-any
      const svgHtml = (element as any).outerHTML;
      const widthMatch = svgHtml.match(/width="([\d.]+)"/);
      if (widthMatch) chartWidth = parseFloat(widthMatch[1]);
      svgStrings.push(svgHtml);
    } else {
      for (const svg of element.querySelectorAll("svg")) {
        const svgHtml = svg.outerHTML;
        const widthMatch = svgHtml.match(/width="([\d.]+)"/);
        if (widthMatch) {
          chartWidth = Math.max(chartWidth, parseFloat(widthMatch[1]));
        }
        svgStrings.push(svgHtml);
      }
    }

    let maxWidth = chartWidth;
    const svgHeights: number[] = [];

    for (const svgHtml of svgStrings) {
      const widthMatch = svgHtml.match(/width="([\d.]+)"/);
      const heightMatch = svgHtml.match(/height="([\d.]+)"/);
      if (widthMatch) {
        const w = parseFloat(widthMatch[1]);
        maxWidth = Math.max(maxWidth, w);
      }
      if (heightMatch) svgHeights.push(parseFloat(heightMatch[1]));
      else svgHeights.push(400);
    }

    chartWidth = (maxWidth || 640) + 40;

    const components: {
      y: number;
      html: string;
      type: "text" | "svg";
      fontSize?: number;
      fill?: string;
      anchor?: string;
      className?: string;
    }[] = [];

    let currentY = 20;

    if (title) {
      components.push({
        y: currentY + 20,
        html: title,
        type: "text",
        fontSize: 20,
        fill: options.dark ? "#F0F0F0" : "rgb(60, 60, 67)",
        anchor: "start",
        className: "chart-title",
      });
      currentY += 40;
    }

    if (subtitle) {
      components.push({
        y: currentY + 10,
        html: subtitle,
        type: "text",
        fontSize: 14,
        fill: options.dark ? "#B0B0B0" : "rgb(60, 60, 67)",
        anchor: "start",
        className: "chart-subtitle",
      });
      currentY += 30;
    }

    for (let i = 0; i < svgStrings.length; i++) {
      const svgHtml = svgStrings[i];
      const height = svgHeights[i];

      components.push({
        y: currentY,
        html: svgHtml,
        type: "svg",
      });
      currentY += height + 10;
    }

    if (caption) {
      components.push({
        y: currentY + 10,
        html: caption,
        type: "text",
        fontSize: 12,
        fill: options.dark ? "#888" : "rgb(103, 103, 108)",
        anchor: "start",
        className: "chart-caption",
      });
      currentY += 25;
    }

    const totalHeight = currentY + 10;

    const styleTag = `
      <style>
        text { font-family: Inter, -apple-system, "system-ui", "Avenir Next", Avenir, Helvetica, "Helvetica Neue", Ubuntu, Roboto, Noto, "Segoe UI", Arial, sans-serif; }
        .chart-title { font-weight: bold; }
        .chart-caption { font-style: italic; }
        ${
      options.dark
        ? `
        svg { color-scheme: dark; color: #B0B0B0; }
        [aria-label*="axis"] text,
        [aria-label="legend"] text,
        [class*="-ramp"] text,
        [class*="-legend"] text,
        [class*="-swatches"] text {
          fill: #B0B0B0;
        }
        [aria-label*="axis"] line,
        [aria-label*="axis"] path,
        [aria-label="legend"] line,
        [aria-label="legend"] path,
        [class*="-ramp"] line,
        [class*="-ramp"] path,
        [class*="-legend"] line,
        [class*="-legend"] path,
        [class*="-swatches"] line,
        [class*="-swatches"] path {
          stroke: #707070;
        }
        [aria-label*="grid"] line,
        [aria-label*="grid"] path {
          stroke: #505050;
          stroke-opacity: 0.3;
        }
        `
        : ""
    }
        ${options.style || ""}
      </style>`;

    const background = options.dark
      ? `<rect width="100%" height="100%" fill="#121212" />`
      : `<rect width="100%" height="100%" fill="white" />`;

    let masterSvg =
      `<svg width="${chartWidth}" height="${totalHeight}" viewBox="0 0 ${chartWidth} ${totalHeight}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      ${styleTag}
      ${background}
    `;

    for (const comp of components) {
      if (comp.type === "text") {
        const x = 20;
        masterSvg +=
          `<text x="${x}" y="${comp.y}" font-size="${comp.fontSize}" fill="${comp.fill}" text-anchor="${comp.anchor}" ${
            comp.className ? `class="${comp.className}"` : ""
          }>${comp.html}</text>`;
      } else {
        const xOffset = 20;
        masterSvg += comp.html.replace(
          /<svg/i,
          `<svg x="${xOffset}" y="${comp.y}" overflow="visible"`,
        );
      }
    }

    masterSvg += `</svg>`;

    masterSvg = masterSvg.replaceAll("xlink:href", "href");

    const extension = path.split(".").pop()?.toLowerCase();

    if (extension === "svg") {
      writeFileSync(path, masterSvg);
    } else if (extension === "png") {
      const resvg = new Resvg(masterSvg, {
        fitTo: { mode: "width", value: chartWidth * 2 },
        font: {
          loadSystemFonts: true,
          defaultFontFamily: "Arial",
          sansSerifFamily: "Arial",
          serifFamily: "Times New Roman",
        },
      });
      const pngBuffer = resvg.render().asPng();
      writeFileSync(path, pngBuffer);
    } else {
      throw new Error(`Unsupported file extension: .${extension}`);
    }
  } finally {
    for (const key of keysToSet) {
      // @ts-ignore: restoring globals
      dntShim.dntGlobalThis[key] = oldGlobals[key];
    }
  }
}
