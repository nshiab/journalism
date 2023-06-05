import assert from "assert"
import formatNumber from "../../src/format/formatNumber.js"

describe("formatNumber", () => {
    it("should return the number as a string", () => {
        const string = formatNumber(10)
        assert.strictEqual(string, "10")
    })
    it("should return the number with coma as a thousand separator (using 1000)", () => {
        const string = formatNumber(1000)
        assert.strictEqual(string, "1,000")
    })
    it("should return the number with coma as a thousand separator (using 10000)", () => {
        const string = formatNumber(10000)
        assert.strictEqual(string, "10,000")
    })
    it("should return the number with coma as a thousand separator (using 100000)", () => {
        const string = formatNumber(100000)
        assert.strictEqual(string, "100,000")
    })
    it("should return the number with coma as a thousand separator and keep decimals (using 1000000000.1234)", () => {
        const string = formatNumber(1000000000.1234)
        assert.strictEqual(string, "1,000,000,000.1234")
    })

    // Radio-Canada style

    it("should return the number as a string without separator (using 1000)", () => {
        const string = formatNumber(1000, "rc")
        assert.strictEqual(string, "1000")
    })
    it("should return the number with non-breaking space as a thousand separator (using 10000)", () => {
        const string = formatNumber(10000, "rc")
        assert.strictEqual(string, "10 000")
    })
    it("should return the number with non-breaking space as a thousand separator (using 100000)", () => {
        const string = formatNumber(100000, "rc")
        assert.strictEqual(string, "100 000")
    })
    it("should return the number with non-breaking space as a thousand separator and keep decimals (using 1000000000.1234)", () => {
        const string = formatNumber(1000000000.1234, "rc")
        assert.strictEqual(string, "1 000 000 000,1234")
    })
})
