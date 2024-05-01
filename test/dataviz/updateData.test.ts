import assert from "assert"
import updateDataDW from "../../src/dataviz/updateDataDW.js"
import dataAsCsv from "../../src/format/dataAsCsv.js"

describe("updateDataDW", () => {
    it("should update data in a chart", async () => {
        const apiKey = process.env.dw_key

        if (typeof apiKey === "string") {
            const data = [{ salary: 75000, hireDate: new Date("2022-12-15") }]
            const dataCSV = dataAsCsv(data)

            await updateDataDW("ntURh", apiKey, dataCSV)
        } else {
            console.log("No dw_key in .env")
        }

        // Just making sure it doesn't crash for now.
        assert.strictEqual(true, true)
    })

    it("should update data in a map", async () => {
        const apiKey = process.env.dw_key

        if (typeof apiKey === "string") {
            const data = {
                type: "FeatureCollection",
                features: [
                    {
                        type: "Feature",
                        properties: {},
                        geometry: {
                            coordinates: [
                                [
                                    [11.127454320325711, 20.34856592751224],
                                    [11.127454320325711, -13.781306861158996],
                                    [55.68071875381875, -13.781306861158996],
                                    [55.68071875381875, 20.34856592751224],
                                    [11.127454320325711, 20.34856592751224],
                                ],
                            ],
                            type: "Polygon",
                        },
                    },
                ],
            }

            await updateDataDW("lDO6F", apiKey, JSON.stringify(data))
        } else {
            console.log("No dw_key in .env")
        }

        // Just making sure it doesn't crash for now.
        assert.strictEqual(true, true)
    })
})
