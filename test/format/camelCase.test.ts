import assert from "assert"
import camelCase from "../../src/format/camelCase.js"

describe("camelCase", () => {
    it("should format a string to camel case", () => {
        const string = camelCase("Journalism  _ % IS**@ aWeSoMe.")

        assert.deepStrictEqual(string, "journalismIsAwesome")
    })
})
