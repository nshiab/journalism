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
    it("should return the number with + sign", () => {
        const string = formatNumber(1.12, { sign: true })
        assert.strictEqual(string, "+1.12")
    })
    it("should return the number with - sign", () => {
        const string = formatNumber(-2.23, { sign: true })
        assert.strictEqual(string, "-2.23")
    })
    it("should return the number rounded", () => {
        const string = formatNumber(1.5345, { round: true })
        assert.strictEqual(string, "2")
    })
    it("should return the number rounded with 2 decimals", () => {
        const string = formatNumber(1.5345, { nbDecimals: 2 })
        assert.strictEqual(string, "1.53")
    })
    it("should return the number rounded with base 10", () => {
        const string = formatNumber(11523.5345, { nearestInteger: 10 })
        assert.strictEqual(string, "11,520")
    })
    it("should return the number rounded with 2 decimals and + sign", () => {
        const string = formatNumber(1.5345, { nbDecimals: 2, sign: true })
        assert.strictEqual(string, "+1.53")
    })
    it("should return the number rounded with base 10 and + sign", () => {
        const string = formatNumber(11523.5345, {
            nearestInteger: 10,
            sign: true,
        })
        assert.strictEqual(string, "+11,520")
    })
    it("should return the number rounded with 2 decimals and - sign", () => {
        const string = formatNumber(-1.5345, { nbDecimals: 2, sign: true })
        assert.strictEqual(string, "-1.53")
    })
    it("should return the number rounded with base 10 and - sign", () => {
        const string = formatNumber(-11523.5345, {
            nearestInteger: 10,
            sign: true,
        })
        assert.strictEqual(string, "-11,520")
    })

    // Radio-Canada style

    it("should return the number as a string without separator (using 1000)", () => {
        const string = formatNumber(1000, { style: "rc" })
        assert.strictEqual(string, "1000")
    })
    it("should return the number with non-breaking space as a thousand separator (using 10000)", () => {
        const string = formatNumber(10000, { style: "rc" })
        assert.strictEqual(string, "10 000")
    })
    it("should return the number with non-breaking space as a thousand separator (using 100000)", () => {
        const string = formatNumber(100000, { style: "rc" })
        assert.strictEqual(string, "100 000")
    })
    it("should return the number with non-breaking space as a thousand separator and keep decimals (using 1000000000.1234)", () => {
        const string = formatNumber(1000000000.1234, { style: "rc" })
        assert.strictEqual(string, "1 000 000 000,1234")
    })
    it("should return the number with + sign with rc style", () => {
        const string = formatNumber(1.12, { sign: true, style: "rc" })
        assert.strictEqual(string, "+1,12")
    })
    it("should return the number with - sign with rc style", () => {
        const string = formatNumber(-2.23, { sign: true, style: "rc" })
        assert.strictEqual(string, "-2,23")
    })
    it("should return the number rounded with rc style", () => {
        const string = formatNumber(1.5345, { round: true, style: "rc" })
        assert.strictEqual(string, "2")
    })
    it("should return the number rounded with 2 decimals with rc style", () => {
        const string = formatNumber(1.5345, { nbDecimals: 2, style: "rc" })
        assert.strictEqual(string, "1,53")
    })
    it("should return the number rounded with base 10 with rc style", () => {
        const string = formatNumber(11523.5345, {
            nearestInteger: 10,
            style: "rc",
        })
        assert.strictEqual(string, "11 520")
    })
    it("should return the number rounded with 2 decimals, + sign and rc style", () => {
        const string = formatNumber(1.5345, {
            nbDecimals: 2,
            sign: true,
            style: "rc",
        })
        assert.strictEqual(string, "+1,53")
    })
    it("should return the number rounded with base 10, + sign and rc style", () => {
        const string = formatNumber(11523.5345, {
            nearestInteger: 10,
            sign: true,
            style: "rc",
        })
        assert.strictEqual(string, "+11 520")
    })
    it("should return the number rounded with 2 decimals, - sign and rc style", () => {
        const string = formatNumber(-1.5345, {
            nbDecimals: 2,
            sign: true,
            style: "rc",
        })
        assert.strictEqual(string, "-1,53")
    })
    it("should return the number rounded with base 10, - sign and rc style", () => {
        const string = formatNumber(-11523.5345, {
            nearestInteger: 10,
            sign: true,
            style: "rc",
        })
        assert.strictEqual(string, "-11 520")
    })
})
