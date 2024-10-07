import assert from "assert"
import logChart from "../../src/dataviz/logChart.js"
import { readFileSync } from "node:fs"

describe("logChart", () => {
    it("should create a dots chart", async () => {
        const data = JSON.parse(
            readFileSync("test/data/temperatures.json", "utf-8")
        ).map((d: { time: string }) => ({ ...d, time: new Date(d.time) }))

        logChart(data, "dot", "time", "t", { xLabels: "utcTime" })

        // How to assert
        assert.strictEqual(true, true)
    })

    it("should create a dots chart with categories", async () => {
        const data = JSON.parse(
            readFileSync("test/data/temperatures.json", "utf-8")
        ).map((d: { time: string }) => ({ ...d, time: new Date(d.time) }))

        logChart(data, "dot", "time", "t", {
            xLabels: "utcTime",
            categories: "city",
        })

        // How to assert
        assert.strictEqual(true, true)
    })

    it("should create a lines chart", async () => {
        const data = JSON.parse(
            readFileSync("test/data/temperatures.json", "utf-8")
        ).map((d: { time: string }) => ({ ...d, time: new Date(d.time) }))

        logChart(data, "line", "time", "t", {
            xLabels: "utcTime",
        })

        // How to assert
        assert.strictEqual(true, true)
    })

    it("should create a lines chart", async () => {
        const data = JSON.parse(
            readFileSync("test/data/temperatures.json", "utf-8")
        ).map((d: { time: string }) => ({ ...d, time: new Date(d.time) }))

        logChart(data, "line", "time", "t", {
            xLabels: "utcTime",
            categories: "city",
        })

        // How to assert
        assert.strictEqual(true, true)
    })

    it("should create a bar chart", async () => {
        const data = JSON.parse(
            readFileSync("test/data/firesPerProvince.json", "utf-8")
        )

        logChart(data, "barHorizontal", "burntArea", "nameEnglish")

        // How to assert
        assert.strictEqual(true, true)
    })
})
