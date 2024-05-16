import assert from "assert"
import updateAnnotationsDW from "../../src/dataviz/updateAnnotationsDW.js"

describe("updateAnnotationsDW", () => {
    const apiKey = process.env.DW_KEY
    if (typeof apiKey === "string" && apiKey !== "") {
        it("should update annotations in a chart", async () => {
            await updateAnnotationsDW("Ga9oq", apiKey, [
                {
                    x: "2024/08/30 01:52",
                    y: "14496235",
                    text: "This is an annotation!",
                },
                {
                    x: "2024/06/29",
                    y: "15035128",
                    dy: 50,
                    text: "This is also some text, but with an arrow!",
                    connectorLine: {
                        enabled: true,
                        type: "straight",
                        arrowHead: "lines",
                    },
                    mobileFallback: false,
                },
            ])

            // Just making sure it doesn't crash for now.
            assert.strictEqual(true, true)
        })
    } else {
        console.log("No DW_KEY in .env")
    }
})
