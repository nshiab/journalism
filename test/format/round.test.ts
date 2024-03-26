import assert from "assert"
import round from "../../src/format/round.js"

describe("round", () => {
    it("should keep an integer as integer", () => {
        const rounded = round(1)
        assert.strictEqual(rounded, 1)
    })
    it("should round 1.2 to 1", () => {
        const rounded = round(1.2)
        assert.strictEqual(rounded, 1)
    })
    it("should round 1.5 to 2", () => {
        const rounded = round(1.5)
        assert.strictEqual(rounded, 2)
    })
    it("should round 1.8 to 2", () => {
        const rounded = round(1.8)
        assert.strictEqual(rounded, 2)
    })
    it("should round 1.1234567 to 1.1", () => {
        const rounded = round(1.1234567, { decimals: 1 })
        assert.strictEqual(rounded, 1.1)
    })
    it("should round 1.1234567 to 1.12346", () => {
        const rounded = round(1.1234567, { decimals: 5 })
        assert.strictEqual(rounded, 1.12346)
    })
    it("should round 12345 to the closest 10", () => {
        const rounded = round(12345, { nearestInteger: 10 })
        assert.strictEqual(rounded, 12350)
    })
    it("should round 12345 to the closest 100", () => {
        const rounded = round(12345, { nearestInteger: 100 })
        assert.strictEqual(rounded, 12300)
    })
    it("should throw an error if the passed value is not a number", () => {
        // @ts-expect-error we test for the error
        assert.throws(() => round("a"))
    })
    it("should return NaN when the passed value is not a number and try is set to true", () => {
        // @ts-expect-error we test for try true
        const rounded = round("a", { try: true })
        assert.strictEqual(rounded, NaN)
    })
})
