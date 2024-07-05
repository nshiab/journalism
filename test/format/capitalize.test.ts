import assert from "assert"
import capitalize from "../../src/format/capitalize.js"

describe("capitalize", () => {
    it("should capitalize the first character of a string", () => {
        const string = capitalize("journalism")

        assert.deepStrictEqual(string, "Journalism")
    })
})
