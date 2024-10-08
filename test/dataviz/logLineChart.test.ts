import assert from "assert"
import logLineChart from "../../src/dataviz/logLineChart.js"
import { readFileSync } from "node:fs"
import formatDate from "../../src/format/formatDate.js"

describe("logLineChart", () => {
    it("should create a lines chart", async () => {
        const data = JSON.parse(
            readFileSync("test/data/temperatures.json", "utf-8")
        ).map((d: { time: string }) => ({ ...d, time: new Date(d.time) }))

        logLineChart(data, "time", "t", {
            formatX: (d) => formatDate(d as Date, "YYYY-MM-DD", { utc: true }),
        })
        // How to assert
        assert.strictEqual(true, true)
    })

    // it("should create a lines chart with categories", async () => {
    //     const data = JSON.parse(
    //         readFileSync("test/data/temperatures.json", "utf-8")
    //     ).map((d: { time: string }) => ({ ...d, time: new Date(d.time) }))

    //     logLineChart(data, "time", "t", {
    //         xLabels: "utcTime",
    //         smallMultiples: "city",
    //     })

    //     // How to assert
    //     assert.strictEqual(true, true)
    // })

    // it("should create a lines chart with an fixed scales", async () => {
    //     const data = JSON.parse(
    //         readFileSync("test/data/temperatures.json", "utf-8")
    //     ).map((d: { time: string }) => ({ ...d, time: new Date(d.time) }))

    //     logLineChart(data, "time", "t", {
    //         xLabels: "utcTime",
    //         smallMultiples: "city",
    //         fixedScales: true,
    //     })

    //     // How to assert
    //     assert.strictEqual(true, true)
    // })
})
