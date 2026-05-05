"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = prepChart;
const d3_array_1 = require("d3-array");
const getColors_js_1 = __importDefault(require("./getColors.js"));
const drawChart_js_1 = __importDefault(require("./drawChart.js"));
const validateDataTypes_js_1 = __importDefault(require("./validateDataTypes.js"));
const index_js_1 = require("../../../../../journalism-format/1.1.7/src/index.js");
function prepChart(type, data, x, y, drawFunction, options = {}) {
    (0, validateDataTypes_js_1.default)(data, x, y);
    const formatX = options.formatX
        ? options.formatX
        : data[0][x] instanceof Date
            ? (d) => (0, index_js_1.formatDate)(d, "YYYY-MM-DD", { utc: true })
            : function (d) {
                return String(d);
            };
    const formatY = options.formatY
        ? options.formatY
        : (d) => (0, index_js_1.formatNumber)(d);
    const width = options.width ?? 75;
    const height = options.height ?? 15;
    const smallMultiplesPerRow = options.smallMultiplesPerRow ?? 2;
    const smallMultiples = options.smallMultiples ?? null;
    const fixedScales = options.fixedScales ?? false;
    if (typeof smallMultiples === "string") {
        const categories = Array.from(new Set(data.map((d) => d[smallMultiples])));
        const colors = (0, getColors_js_1.default)(categories);
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
            xMin = (0, d3_array_1.min)(xValues);
            xMax = (0, d3_array_1.max)(xValues);
            const yValues = data.map((d) => d[y]);
            yMin = (0, d3_array_1.min)(yValues);
            yMax = (0, d3_array_1.max)(yValues);
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
                xMin = (0, d3_array_1.min)(xValues);
                xMax = (0, d3_array_1.max)(xValues);
                const yValues = dataFiltered.map((d) => d[y]);
                yMin = (0, d3_array_1.min)(yValues);
                yMax = (0, d3_array_1.max)(yValues);
            }
            const { chart, xLabels } = (0, drawChart_js_1.default)(type, drawFunction, dataFiltered, x, y, c.color, {
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
        const xMin = (0, d3_array_1.min)(xValues);
        const xMax = (0, d3_array_1.max)(xValues);
        const yValues = data.map((d) => d[y]);
        const yMin = (0, d3_array_1.min)(yValues);
        const yMax = (0, d3_array_1.max)(yValues);
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
        const { chart, xLabels } = (0, drawChart_js_1.default)(type, drawFunction, data, x, y, "\x1b[38;5;208m", {
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
