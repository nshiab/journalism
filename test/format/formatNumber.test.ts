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
    it("should return the number with – sign", () => {
        const string = formatNumber(-2.23, { sign: true })
        assert.strictEqual(string, "–2.23")
    })
    it("should return 0 even if with option sign to true", () => {
        const string = formatNumber(0, { sign: true })
        assert.strictEqual(string, "0")
    })
    it("should return the number rounded", () => {
        const string = formatNumber(1.5345, { round: true })
        assert.strictEqual(string, "2")
    })
    it("should return the number rounded with 2 decimals", () => {
        const string = formatNumber(1.5345, { decimals: 2 })
        assert.strictEqual(string, "1.53")
    })
    it("should return the number rounded with 2 fixed decimals", () => {
        const string = formatNumber(1.5042, { decimals: 2, fixed: true })
        assert.strictEqual(string, "1.50")
    })
    it("should return the number rounded with base 10", () => {
        const string = formatNumber(11523.5345, { nearestInteger: 10 })
        assert.strictEqual(string, "11,520")
    })
    it("should return the number rounded with 2 decimals and + sign", () => {
        const string = formatNumber(1.5345, { decimals: 2, sign: true })
        assert.strictEqual(string, "+1.53")
    })
    it("should return the number rounded with base 10 and + sign", () => {
        const string = formatNumber(11523.5345, {
            nearestInteger: 10,
            sign: true,
        })
        assert.strictEqual(string, "+11,520")
    })
    it("should return the number rounded with 2 decimals and – sign", () => {
        const string = formatNumber(-1.5345, { decimals: 2, sign: true })
        assert.strictEqual(string, "–1.53")
    })
    it("should return the number rounded with 2 fixed decimals and – sign", () => {
        const string = formatNumber(-1.5023, {
            decimals: 2,
            fixed: true,
            sign: true,
        })
        assert.strictEqual(string, "–1.50")
    })
    it("should return the number rounded with base 10 and – sign", () => {
        const string = formatNumber(-11523.5345, {
            nearestInteger: 10,
            sign: true,
        })
        assert.strictEqual(string, "–11,520")
    })
    it("should return the number with prefix", () => {
        const string = formatNumber(-11523, {
            prefix: "$",
        })
        assert.strictEqual(string, "$–11,523")
    })
    it("should return the number with suffix", () => {
        const string = formatNumber(35, {
            suffix: " C",
        })
        assert.strictEqual(string, "35 C")
    })
    it("should return the number with a prefix and a suffix", () => {
        const string = formatNumber(35, {
            prefix: "Temp.: ",
            suffix: " C",
        })
        assert.strictEqual(string, "Temp.: 35 C")
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
    it("should return the number with – sign with rc style", () => {
        const string = formatNumber(-2.23, { sign: true, style: "rc" })
        assert.strictEqual(string, "–2,23")
    })
    it("should return the number rounded with rc style", () => {
        const string = formatNumber(1.5345, { round: true, style: "rc" })
        assert.strictEqual(string, "2")
    })
    it("should return the number rounded with 2 decimals with rc style", () => {
        const string = formatNumber(1.5345, { decimals: 2, style: "rc" })
        assert.strictEqual(string, "1,53")
    })
    it("should return the number rounded with 2 fixed decimals with rc style", () => {
        const string = formatNumber(1.5042, {
            decimals: 2,
            fixed: true,
            style: "rc",
        })
        assert.strictEqual(string, "1,50")
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
            decimals: 2,
            sign: true,
            style: "rc",
        })
        assert.strictEqual(string, "+1,53")
    })
    it("should return the number rounded, with 2 fixed decimals, +sign and rc style", () => {
        const string = formatNumber(1.2, {
            decimals: 2,
            fixed: true,
            sign: true,
            style: "rc",
        })
        assert.strictEqual(string, "+1,20")
    })
    it("should return the number rounded with base 10, + sign and rc style", () => {
        const string = formatNumber(11523.5345, {
            nearestInteger: 10,
            sign: true,
            style: "rc",
        })
        assert.strictEqual(string, "+11 520")
    })
    it("should return the number rounded with 2 decimals, – sign and rc style", () => {
        const string = formatNumber(-1.5345, {
            decimals: 2,
            sign: true,
            style: "rc",
        })
        assert.strictEqual(string, "–1,53")
    })
    it("should return the number rounded with base 10, – sign and rc style", () => {
        const string = formatNumber(-11523.5345, {
            nearestInteger: 10,
            sign: true,
            style: "rc",
        })
        assert.strictEqual(string, "–11 520")
    })
    it("should return the number with prefix and rc style", () => {
        const string = formatNumber(-11523, {
            prefix: "$",
            style: "rc",
        })
        assert.strictEqual(string, "$–11 523")
    })
    it("should return the number with suffix and rc style", () => {
        const string = formatNumber(35.2, {
            suffix: " C",
            style: "rc",
        })
        assert.strictEqual(string, "35,2 C")
    })
    it("should return the number with a prefix, a suffix and rc style", () => {
        const string = formatNumber(35.6, {
            prefix: "Temp.: ",
            suffix: " C",
            style: "rc",
        })
        assert.strictEqual(string, "Temp.: 35,6 C")
    })
    it("should return the number round with 1 significant digit", () => {
        const string = formatNumber(0.01578, { significantDigits: 1 })
        assert.strictEqual(string, "0.02")
    })
    it("should return the number round with 2 significant digits and a positive sign", () => {
        const string = formatNumber(0.01578, {
            significantDigits: 2,
            sign: true,
        })
        assert.strictEqual(string, "+0.016")
    })
    it("should return the number round with 2 significant digits and a negative sign", () => {
        const string = formatNumber(-0.01578, {
            significantDigits: 2,
            sign: true,
        })
        assert.strictEqual(string, "–0.016")
    })
    it("should return the number round with 2 significant digits and a percentage sign", () => {
        const string = formatNumber(1.3922092532695824, {
            suffix: "%",
            significantDigits: 2,
        })
        assert.strictEqual(string, "1.4%")
    })
})
