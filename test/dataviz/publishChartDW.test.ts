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
})
