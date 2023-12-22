import savePlotChart from "../../src/dataviz/savePlotChart.js"
import * as Plot from "@observablehq/plot"

describe("savePlotChart", () => {
    it("save a chart", async () => {
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
                    marginLeft: 75,
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
    })
})
