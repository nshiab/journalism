import assert from "assert"
import publishChartDW from "../../src/dataviz/publishChartDW.js"

describe("publishChartDW", () => {
    it("should publish a chart", async () => {
        const apiKey = process.env.dw_key

        if (typeof apiKey === "string") {
            await publishChartDW("ntURh", apiKey)
        } else {
            console.log("No dw_key in .env")
        }

        // Just making sure it doesn't crash for now.
        assert.strictEqual(true, true)
    })
})
