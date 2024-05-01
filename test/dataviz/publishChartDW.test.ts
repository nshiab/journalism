import assert from "assert"
import publishChartDW from "../../src/dataviz/publishChartDW.js"

describe("publishChartDW", () => {
    it("should publish a chart", async () => {
        const apiKey = process.env.DW_KEY

        if (typeof apiKey === "string") {
            await publishChartDW("ntURh", apiKey)
        } else {
            console.log("No DW_KEY in .env")
        }

        // Just making sure it doesn't crash for now.
        assert.strictEqual(true, true)
    })
})
