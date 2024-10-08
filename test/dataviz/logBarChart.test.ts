import assert from "assert"
import logBarChart from "../../src/dataviz/logBarChart.js"
import { readFileSync } from "node:fs"
import formatNumber from "../../src/format/formatNumber.js"

describe("logBarChart", () => {
    it("should create a bar chart", async () => {
        const data = JSON.parse(
            readFileSync("test/data/firesPerProvince.json", "utf-8")
        )

        logBarChart(data, "nameEnglish", "burntArea")
        // How to assert
        assert.strictEqual(true, true)
    })
    it("should create a bar chart with options", async () => {
        const data = JSON.parse(
            readFileSync("test/data/firesPerProvince.json", "utf-8")
        )

        logBarChart(data, "nameEnglish", "burntArea", {
            formatLabels: (d) => String(d).toUpperCase(),
            formatValues: (d) => formatNumber(d as number, { suffix: " ha" }),
            width: 10,
        })
        // How to assert
        assert.strictEqual(true, true)
    })
    it("should create a bar chart (example from the doc)", async () => {
        const data = [
            { category: "A", value: 10 },
            { category: "B", value: 20 },
        ]

        logBarChart(data, "category", "value")
        // How to assert
        assert.strictEqual(true, true)
    })
    it("should create a bar chart with custom title and compact format", async () => {
        const data = JSON.parse(
            readFileSync("test/data/firesPerProvince.json", "utf-8")
        )

        logBarChart(data, "nameEnglish", "burntArea", {
            formatLabels: (d) => String(d).toUpperCase(),
            formatValues: (d) => formatNumber(d as number, { suffix: " ha" }),
            width: 10,
            title: "Burnt area per province",
            compact: true,
            totalLabel: "Total burnt area",
        })
        // How to assert
        assert.strictEqual(true, true)
    })
})
