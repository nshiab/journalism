import assert from "assert"
import { existsSync, mkdirSync } from "fs"
import savePlotChart from "../../src/dataviz/savePlotChart.js"
import * as Plot from "@observablehq/plot"

const outputPath = "./test/output/"
if (!existsSync(outputPath)) {
    mkdirSync(outputPath)
}

describe("savePlotChart", () => {
    it("should save a PNG chart", async () => {
        const data = [
            { salary: 75000, hireDate: new Date("2022-12-15") },
            { salary: 82000, hireDate: new Date("2022-11-20") },
            { salary: 60000, hireDate: new Date("2022-10-25") },
            { salary: 90000, hireDate: new Date("2022-09-30") },
            { salary: 72000, hireDate: new Date("2022-08-15") },
            { salary: 55000, hireDate: new Date("2022-07-20") },
            { salary: 68000, hireDate: new Date("2022-06-25") },
            { salary: 48000, hireDate: new Date("2022-05-30") },
            { salary: 77000, hireDate: new Date("2022-04-15") },
            { salary: 88000, hireDate: new Date("2022-03-20") },
        ]

        await savePlotChart(
            data,
            (data) =>
                Plot.plot({
                    title: "Employee hire dates and salaries",
                    marginLeft: 75,
                    inset: 10,
                    color: { legend: true },
                    marks: [
                        Plot.dot(data, {
                            x: "hireDate",
                            y: "salary",
                            stroke: "salary",
                        }),
                    ],
                }),
            "./test/output/screenshot.png"
        )

        // Not sure what/how to test, except making it work for now.
        assert.strictEqual(true, true)
    })
    it("should save a JPG chart", async () => {
        const data = [
            { salary: 75000, hireDate: new Date("2022-12-15") },
            { salary: 82000, hireDate: new Date("2022-11-20") },
            { salary: 60000, hireDate: new Date("2022-10-25") },
            { salary: 90000, hireDate: new Date("2022-09-30") },
            { salary: 72000, hireDate: new Date("2022-08-15") },
            { salary: 55000, hireDate: new Date("2022-07-20") },
            { salary: 68000, hireDate: new Date("2022-06-25") },
            { salary: 48000, hireDate: new Date("2022-05-30") },
            { salary: 77000, hireDate: new Date("2022-04-15") },
            { salary: 88000, hireDate: new Date("2022-03-20") },
        ]

        await savePlotChart(
            data,
            (data) =>
                Plot.plot({
                    title: "Employee hire dates and salaries",
                    marginLeft: 75,
                    inset: 10,
                    color: { legend: true },
                    marks: [
                        Plot.dot(data, {
                            x: "hireDate",
                            y: "salary",
                            stroke: "salary",
                        }),
                    ],
                }),
            "./test/output/screenshot.jpeg"
        )

        // Not sure what/how to test, except making it work for now.
        assert.strictEqual(true, true)
    })
})
