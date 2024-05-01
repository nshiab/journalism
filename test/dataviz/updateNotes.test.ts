import assert from "assert"
import updateNotesDW from "../../src/dataviz/updateNotesDW.js"
import formatDate from "../../src/format/formatDate.js"

describe("updateNotesDW", () => {
    it("should update the note in a chart", async () => {
        const apiKey = process.env.dw_key

        if (typeof apiKey === "string") {
            const dateString = formatDate(
                new Date(),
                "Month DD, YYYY, at HH:MM period",
                { abbreviations: true }
            )
            const note = `This chart was last updated on ${dateString}`

            await updateNotesDW("ntURh", apiKey, note)
        } else {
            console.log("No dw_key in .env")
        }

        // Just making sure it doesn't crash for now.
        assert.strictEqual(true, true)
    })
})
