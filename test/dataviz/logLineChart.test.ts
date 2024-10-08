import assert from "assert"
import logLineChart from "../../src/dataviz/logLineChart.js"
import { readFileSync } from "node:fs"
import formatDate from "../../src/format/formatDate.js"
import formatNumber from "../../src/format/formatNumber.js"

describe("logLineChart", () => {
    it("should create a line chart", async () => {
        const data = JSON.parse(
            readFileSync("test/data/temperatures.json", "utf-8")
        )
            .map((d: { time: string }) => ({ ...d, time: new Date(d.time) }))
            .filter((d: { city: string }) => d.city === "Montreal")

        logLineChart(data, "time", "t", {
            formatX: (d) => formatDate(d as Date, "YYYY-MM-DD", { utc: true }),
            formatY: (d) => formatNumber(d as number, { decimals: 0 }),
        })
        // How to assert
        assert.strictEqual(true, true)
    })
    it("should create a line chart with categories", async () => {
        const data = JSON.parse(
            readFileSync("test/data/temperatures.json", "utf-8")
        ).map((d: { time: string }) => ({ ...d, time: new Date(d.time) }))

        logLineChart(data, "time", "t", {
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
    it("should create a line chart with categories and a fixed scale", async () => {
        const data = JSON.parse(
            readFileSync("test/data/temperatures.json", "utf-8")
        ).map((d: { time: string }) => ({ ...d, time: new Date(d.time) }))

        logLineChart(data, "time", "t", {
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
    it("should create a line chart with few points (example from the docs)", async () => {
        const data = [
            { date: new Date("2023-01-01"), value: 10 },
            { date: new Date("2023-02-01"), value: 20 },
            { date: new Date("2023-03-01"), value: 30 },
            { date: new Date("2023-04-01"), value: 40 },
        ]

        logLineChart(data, "date", "value", {
            formatX: (d) => (d as Date).toISOString().slice(0, 10),
        })

        // How to assert
        assert.strictEqual(true, true)
    })
    it("should create a line chart with few points and small multiples (example from the docs)", async () => {
        const data = [
            { date: new Date("2023-01-01"), value: 10, category: "A" },
            { date: new Date("2023-02-01"), value: 20, category: "A" },
            { date: new Date("2023-03-01"), value: 30, category: "A" },
            { date: new Date("2023-04-01"), value: 40, category: "A" },
            { date: new Date("2023-01-01"), value: 15, category: "B" },
            { date: new Date("2023-02-01"), value: 25, category: "B" },
            { date: new Date("2023-03-01"), value: 35, category: "B" },
            { date: new Date("2023-04-01"), value: 45, category: "B" },
        ]

        logLineChart(data, "date", "value", {
            formatX: (d) => (d as Date).toISOString().slice(0, 10),
            smallMultiples: "category",
        })

        // How to assert
        assert.strictEqual(true, true)
    })
})
