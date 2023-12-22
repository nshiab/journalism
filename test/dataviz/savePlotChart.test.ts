import savePlotChart from "../../src/dataviz/savePlotChart.js"
import * as Plot from "@observablehq/plot"

describe("savePlotChart", () => {
    it("save a chart", async () => {
        const data = [
            { age: 35, salary: 75000, department: "Engineering" },
            { age: 42, salary: 82000, department: "Sales" },
            { age: 28, salary: 60000, department: "Marketing" },
            { age: 55, salary: 90000, department: "HR" },
            { age: 49, salary: 72000, department: "Finance" },
            { age: 31, salary: 55000, department: "Engineering" },
            { age: 40, salary: 68000, department: "Sales" },
            { age: 23, salary: 48000, department: "HR" },
            { age: 37, salary: 77000, department: "Marketing" },
            { age: 45, salary: 88000, department: "Engineering" },
            { age: 33, salary: 71000, department: "Finance" },
            { age: 50, salary: 82000, department: "HR" },
            { age: 26, salary: 63000, department: "Sales" },
            { age: 41, salary: 76000, department: "Marketing" },
            { age: 29, salary: 59000, department: "Engineering" },
            { age: 38, salary: 79000, department: "Finance" },
            { age: 47, salary: 85000, department: "HR" },
            { age: 32, salary: 64000, department: "Sales" },
            { age: 44, salary: 83000, department: "Marketing" },
            { age: 30, salary: 60000, department: "Engineering" },
        ]

        await savePlotChart(
            data,
            (data) =>
                Plot.plot({
                    color: { legend: true },
                    marks: [
                        Plot.dot(data, {
                            x: "age",
                            y: "salary",
                            stroke: "salary",
                        }),
                    ],
                }),
            "./test/output/screenshot.png"
        )
    })
})
