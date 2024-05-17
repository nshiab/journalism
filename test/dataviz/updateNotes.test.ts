import assert from "assert"
import updateNotesDW from "../../src/dataviz/updateNotesDW.js"
import formatDate from "../../src/format/formatDate.js"

describe("updateNotesDW", () => {
    const apiKey = process.env.DATAWRAPPER_KEY
    if (typeof apiKey === "string" && apiKey !== "") {
        it("should update the note in a chart", async () => {
            const apiKey = process.env.DATAWRAPPER_KEY

            if (typeof apiKey === "string") {
                const dateString = formatDate(
                    new Date(),
                    "Month DD, YYYY, at HH:MM period",
                    { abbreviations: true }
                )
                const note = `This chart was last updated on ${dateString}`

                await updateNotesDW("ntURh", note)
            } else {
                console.log("No DATAWRAPPER_KEY in process.env")
            }

            // Just making sure it doesn't crash for now.
            assert.strictEqual(true, true)
        })
    } else {
        console.log("No DATAWRAPPER_KEY in process.env")
    }
})
