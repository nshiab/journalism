import { chromium } from "playwright-chromium";
import type { Data } from "@observablehq/plot";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

/**
 * Saves an [Observable Plot](https://github.com/observablehq/plot) chart as an image file (`.png` or `.jpeg`). You can also save a SVG file (`.svg`), but only the main SVG element will be saved, not the other HTML elements (legend, title, etc.).
 *
 * @example
 * Basic usage:
 * ```ts
 * import { saveChart } from "@nshiab/journalism"
 * import type { Data } from "@observablehq/plot";
 * import { plot, dot } from "@observablehq/plot";
 *
 * const data = [{ year: 2024, value: 10 }, { year: 2025, value: 15 }];
 *
 * const chart = (data: Data) =>
 *   plot({
 *     marks: [
 *       dot(data, { x: "year", y: "value" }),
 *     ],
 *   });
 *
 * const path = "output/chart.png";
 *
 * await saveChart(data, chart, path);
 * ```
 *
 * @param data - An array of data objects.
 * @param chart - A function that takes the data array and returns an SVG or HTML element representing the chart.
 * @param path - The file path where the image will be saved.
 *
 * @category Dataviz
 */

export default async function saveChart(
  data: Data,
  chart: (data: Data) => SVGSVGElement | HTMLElement,
  path: string,
) {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  console.log(JSON.stringify(import.meta));

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  console.log({ __filename, __dirname });

  const d3Path = resolve(__dirname, "./imports/d3@7.js");
  const plotPath = resolve(__dirname, "./imports/plot@0.6.js");

  console.log({ d3Path, plotPath });

  await page.addScriptTag({
    content: readFileSync(
      d3Path,
      "utf-8",
    ),
  });
  await page.addScriptTag({
    content: readFileSync(
      plotPath,
      "utf-8",
    ),
  });
  await page.addScriptTag({
    content: `
    const chartDiv = document.createElement("div");
    chartDiv.setAttribute("id", "chart");
    chartDiv.style.display = "inline-block";
    document.body.appendChild(chartDiv);

    const { Area, Arrow, BarX, BarY, Cell, Contour, Density, Dot, Frame, Geo, Hexgrid, Image, Line, Link, Mark, Raster, Rect, RuleX, RuleY, Text, TickX, TickY, Tip, Vector, WaffleX, WaffleY, area, areaX, areaY, arrow, auto, autoSpec, axisFx, axisFy, axisX, axisY, barX, barY, bin, binX, binY, bollinger, bollingerX, bollingerY, boxX, boxY, cell, cellX, cellY, centroid, circle, cluster, column, contour, crosshair, crosshairX, crosshairY, delaunayLink, delaunayMesh, density, differenceX, differenceY, dodgeX, dodgeY, dot, dotX, dotY, filter, find, formatIsoDate, formatMonth, formatNumber, formatWeekday, frame, geo, geoCentroid, graticule, gridFx, gridFy, gridX, gridY, group, groupX, groupY, groupZ, hexagon, hexbin, hexgrid, hull, identity, image, indexOf, initializer, interpolateNearest, interpolateNone, interpolatorBarycentric, interpolatorRandomWalk, legend, line, lineX, lineY, linearRegressionX, linearRegressionY, link, map, mapX, mapY, marks, normalize, normalizeX, normalizeY, numberInterval, plot, pointer, pointerX, pointerY, raster, rect, rectX, rectY, reverse, ruleX, ruleY, scale, select, selectFirst, selectLast, selectMaxX, selectMaxY, selectMinX, selectMinY, shiftX, shiftY, shuffle, sort, sphere, spike, stackX, stackX1, stackX2, stackY, stackY1, stackY2, text, textX, textY, tickX, tickY, timeInterval, tip, transform, tree, treeLink, treeNode, utcInterval, valueof, vector, vectorX, vectorY, voronoi, voronoiMesh, waffleX, waffleY, windowX, windowY } = Plot;

    const makeChart = ${chart.toString()};
    `,
  });

  await page.evaluate(
    (data) => {
      // @ts-expect-error - makeChart is defined in the previous script tag
      const chart = makeChart(data);
      const chartDiv = document.querySelector("#chart");
      if (!chartDiv) {
        throw new Error("Chart div not found");
      }
      chartDiv.appendChild(chart);
    },
    data,
  );

  const pathSplit = path.split(".");
  const extension = pathSplit[pathSplit.length - 1].toLowerCase();

  if (extension === "jpeg" || extension === "png") {
    await page.locator("#chart").screenshot({
      path,
    });
  } else if (extension === "svg") {
    if (await page.locator("#chart > figure > svg").isVisible()) {
      const svg = await page.locator("#chart > figure > svg").evaluate((node) =>
        node.outerHTML
      );
      writeFileSync(
        path,
        svg.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"'),
      );
    } else {
      const svg = await page.locator("#chart > svg").evaluate((node) =>
        node.outerHTML
      );
      writeFileSync(
        path,
        svg.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"'),
      );
    }
  } else {
    throw new Error("Unsupported file extension. Use .jpeg, .png, or .svg");
  }

  await context.close();
  await browser.close();
}
