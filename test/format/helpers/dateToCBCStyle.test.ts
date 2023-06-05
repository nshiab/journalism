import assert from "assert"
import dateToCBCStyle from "../../../src/format/helpers/dateToCBCStyle.js"

describe("dateToCBCStyle", () => {
    it("should replace AM by a.m.", () => {
        {
            const styledDate = dateToCBCStyle(
                "January 5, 2023, at 11:08 AM",
                false
            )
            assert.strictEqual(styledDate, "January 5, 2023, at 11:08 a.m.")
        }
    })
    it("should replace PM by p.m.", () => {
        {
            const styledDate = dateToCBCStyle(
                "January 5, 2023, at 11:08 PM",
                false
            )
            assert.strictEqual(styledDate, "January 5, 2023, at 11:08 p.m.")
        }
    })
    it("should remove :00", () => {
        {
            const styledDate = dateToCBCStyle(
                "January 5, 2023, at 1:00 PM",
                false
            )
            assert.strictEqual(styledDate, "January 5, 2023, at 1 p.m.")
        }
    })
    it("should replace the full month by an abbreviation", () => {
        {
            const styledDate = dateToCBCStyle(
                "January 5, 2023, at 11:08 PM",
                true
            )
            assert.strictEqual(styledDate, "Jan. 5, 2023, at 11:08 p.m.")
        }
    })
})
