import assert from "assert"
import dateToRCStyle from "../../../src/format/helpers/dateToRCStyle.js"

describe("dateToRCStyle", () => {
    it("should translate in French", () => {
        {
            const styledDate = dateToRCStyle("5 January 2023 à 11 h 08", false)
            assert.strictEqual(styledDate, "5 janvier 2023 à 11 h 08")
        }
    })
    it("should translate in French with an abbreviation", () => {
        {
            const styledDate = dateToRCStyle("5 January 2023 à 11 h 08", true)
            assert.strictEqual(styledDate, "5 janv. 2023 à 11 h 08")
        }
    })
    it("should remove ' h 00'", () => {
        {
            const styledDate = dateToRCStyle("5 January 2023 à 11 h 00", true)
            assert.strictEqual(styledDate, "5 janv. 2023 à 11 h")
        }
    })
})
