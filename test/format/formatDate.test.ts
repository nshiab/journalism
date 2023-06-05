import assert from "assert"
import { formatDate } from "../../src/index.js"

describe("formatDate", () => {
    it("should return the date", () => {
        const newDate = new Date()
        const dateFormatted = formatDate(newDate)
        assert.deepStrictEqual(dateFormatted, newDate)
    })
})
