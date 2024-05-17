import assert from "assert"
import publishChartDW from "../../src/dataviz/publishChartDW.js"

describe("publishChartDW", () => {
    const apiKey = process.env.DATAWRAPPER_KEY
    if (typeof apiKey === "string" && apiKey !== "") {
        it("should publish a chart", async () => {
            await publishChartDW("ntURh")

            // Just making sure it doesn't crash for now.
            assert.strictEqual(true, true)
        })
    } else {
        console.log("No DATAWRAPPER_KEY in process.env")
    }
    const differentApiKey = process.env.DW_KEY
    if (typeof differentApiKey === "string" && differentApiKey !== "") {
        it("should publish a chart with a specific API key", async () => {
            await publishChartDW("ntURh", { apiKey: "DW_KEY" })

            // Just making sure it doesn't crash for now.
            assert.strictEqual(true, true)
        })
    } else {
        console.log("No DW_KEY in process.env")
    }
})
