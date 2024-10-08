import assert from "assert"
import logDotChart from "../../src/dataviz/logDotChart.js"
import { readFileSync } from "node:fs"
import formatDate from "../../src/format/formatDate.js"
import formatNumber from "../../src/format/formatNumber.js"

describe("logDotChart", () => {
    it("should create a dot chart", async () => {
        const data = JSON.parse(
            readFileSync("test/data/temperatures.json", "utf-8")
        )
            .map((d: { time: string }) => ({ ...d, time: new Date(d.time) }))
            .filter((d: { city: string }) => d.city === "Montreal")

        logDotChart(data, "time", "t", {
            formatX: (d) => formatDate(d as Date, "YYYY-MM-DD", { utc: true }),
            formatY: (d) => formatNumber(d as number, { decimals: 0 }),
        })
        // How to assert
        assert.strictEqual(true, true)
    })
    it("should create a dot chart with categories", async () => {
        const data = JSON.parse(
            readFileSync("test/data/temperatures.json", "utf-8")
        ).map((d: { time: string }) => ({ ...d, time: new Date(d.time) }))

        logDotChart(data, "time", "t", {
            smallMultiples: "city",
            smallMultiplesPerRow: 2,
            width: 50,
            height: 10,
            formatX: (d) => formatDate(d as Date, "YYYY-MM-DD", { utc: true }),
            formatY: (d) => formatNumber(d as number, { decimals: 0 }),
        })

        // How to assert
        assert.strictEqual(true, true)
    })
    it("should create a dot chart with categories and a fixed scale", async () => {
        const data = JSON.parse(
            readFileSync("test/data/temperatures.json", "utf-8")
        ).map((d: { time: string }) => ({ ...d, time: new Date(d.time) }))

        logDotChart(data, "time", "t", {
            smallMultiples: "city",
            smallMultiplesPerRow: 2,
            width: 50,
            height: 10,
            fixedScales: true,
            formatX: (d) => formatDate(d as Date, "YYYY-MM-DD", { utc: true }),
            formatY: (d) => formatNumber(d as number, { decimals: 0 }),
        })

        // How to assert
        assert.strictEqual(true, true)
    })
})
