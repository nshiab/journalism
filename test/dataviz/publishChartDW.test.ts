import assert from "assert"
import publishChartDW from "../../src/dataviz/publishChartDW.js"

describe("publishChartDW", () => {
    const apiKey = process.env.DW_KEY
    if (typeof apiKey === "string") {
        it("should publish a chart", async () => {
            await publishChartDW("ntURh", apiKey)

            // Just making sure it doesn't crash for now.
            assert.strictEqual(true, true)
        })
    } else {
        console.log("No DW_KEY in .env")
    }
})
