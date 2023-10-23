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
})
