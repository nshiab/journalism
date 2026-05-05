import { max, min } from "d3-array";
import getColors from "./getColors.js";
import drawChart from "./drawChart.js";
import validateDataTypes from "./validateDataTypes.js";
import { formatDate, formatNumber } from "../../../../../journalism-format/1.1.7/src/index.js";
export default function prepChart(type, data, x, y, drawFunction, options = {}) {
    validateDataTypes(data, x, y);
    const formatX = options.formatX
        ? options.formatX
        : data[0][x] instanceof Date
            ? (d) => formatDate(d, "YYYY-MM-DD", { utc: true })
            : function (d) {
                return String(d);
            };
    const formatY = options.formatY
        ? options.formatY
        : (d) => formatNumber(d);
    const width = options.width ?? 75;
    const height = options.height ?? 15;
    const smallMultiplesPerRow = options.smallMultiplesPerRow ?? 2;
    const smallMultiples = options.smallMultiples ?? null;
    const fixedScales = options.fixedScales ?? false;
    if (typeof smallMultiples === "string") {
        const categories = Array.from(new Set(data.map((d) => d[smallMultiples])));
        const colors = getColors(categories);
        const allLabelsX = [];
        let xMin;
        let xMax;
        let yMin;
        let yMax;
        // min and max values for the whole data
        if (fixedScales) {
            const xValues = data.map((d) => {
                const val = d[x];
                return val instanceof Date ? val.getTime() : val;
            });
            xMin = min(xValues);
            xMax = max(xValues);
            const yValues = data.map((d) => d[y]);
            yMin = min(yValues);
            yMax = max(yValues);
            if (xMin === undefined ||
                xMax === undefined ||
                yMin === undefined ||
                yMax === undefined) {
                throw new Error("The min or max value is undefined.");
            }
        }
        if (data.length > Math.round(width / smallMultiplesPerRow)) {
            if (type === "line") {
                console.log("\x1b[2m\n/!\\ Number of values greater than width. Averaged values displayed.\x1b[0m");
            }
            else if (type === "dot") {
                console.log("\x1b[2m\n/!\\ Number of values greater than width. Dots might overlap.\x1b[0m");
            }
        }
        const allCharts = colors?.map((c) => {
            const dataFiltered = data.filter((d) => d[smallMultiples] === c.category);
            // The min and max values for each small multiple
            if (!fixedScales) {
                const xValues = dataFiltered.map((d) => {
                    const val = d[x];
                    return val instanceof Date ? val.getTime() : val;
                });
                xMin = min(xValues);
                xMax = max(xValues);
                const yValues = dataFiltered.map((d) => d[y]);
                yMin = min(yValues);
                yMax = max(yValues);
            }
            const { chart, xLabels } = drawChart(type, drawFunction, dataFiltered, x, y, c.color, {
                title: c.category,
                width: Math.round(width / smallMultiplesPerRow),
                height: height,
                formatX: formatX,
                formatY: formatY,
                xMin,
                xMax,
                yMin,
                yMax,
            });
            allLabelsX.push(...xLabels);
            return chart;
        });
        if (allCharts === undefined) {
            throw new Error("No data to display.");
        }
        // Restructure the charts to make small multiples on multiple columns
        const allChartsRows = [];
        for (let i = 0; i < allCharts.length; i += smallMultiplesPerRow) {
            const charts = allCharts.slice(i, i + smallMultiplesPerRow);
            const combinedRows = [];
            for (let j = 0; j < charts.length; j++) {
                if (j === 0) {
                    combinedRows.push(...charts[j]);
                }
                else {
                    for (let k = 0; k < charts[j].length; k++) {
                        combinedRows[k].push(" ".repeat(3), ...charts[j][k]);
                    }
                }
            }
            allChartsRows.push(...combinedRows);
            allChartsRows.push(" ".repeat(combinedRows[0].length).split(""));
        }
        let chartString = allChartsRows.map((d) => d.join("")).join("\n");
        const allLabelsXUnique = Array.from(new Set(allLabelsX));
        for (let i = 0; i < allLabelsXUnique.length; i++) {
            const regex = new RegExp(allLabelsXUnique[i], "g");
            chartString = chartString.replace(regex, `\x1b[90m${allLabelsXUnique[i]}\x1b[0m`);
        }
        console.log(`\n${chartString}\n`);
    }
    else {
        const xValues = data.map((d) => {
            const val = d[x];
            return val instanceof Date ? val.getTime() : val;
        });
        const xMin = min(xValues);
        const xMax = max(xValues);
        const yValues = data.map((d) => d[y]);
        const yMin = min(yValues);
        const yMax = max(yValues);
        if (xMin === undefined ||
            xMax === undefined ||
            yMin === undefined ||
            yMax === undefined) {
            throw new Error("The min or max value is undefined.");
        }
        if (data.length > width) {
            if (type === "line") {
                console.log("\x1b[2m\n/!\\ Number of values greater than width. Averaged values displayed.\x1b[0m");
            }
            else if (type === "dot") {
                console.log("\x1b[2m\n/!\\ Number of values greater than width. Dots might overlap.\x1b[0m");
            }
        }
        const { chart, xLabels } = drawChart(type, drawFunction, data, x, y, "\x1b[38;5;208m", {
            formatX: formatX,
            formatY: formatY,
            width: width,
            height: height,
            xMin,
            xMax,
            yMin,
            yMax,
        });
        let chartString = chart.map((d) => d.join("")).join("\n");
        const allLabelsXUnique = Array.from(new Set(xLabels));
        for (let i = 0; i < allLabelsXUnique.length; i++) {
            const regex = new RegExp(allLabelsXUnique[i], "g");
            chartString = chartString.replace(regex, `\x1b[90m${allLabelsXUnique[i]}\x1b[0m`);
        }
        console.log(`${chartString}`);
    }
}
