import assert from "assert"
import adjustToInflation from "../../src/finance/adjustToInflation.js"

// Using this as a reference https://www.bankofcanada.ca/rates/related/inflation-calculator/

describe("adjustToInflation", () => {
    it("should return 100$ in April 1914 adjusted to April 2023 inflation", () => {
        const adjustedAmount = adjustToInflation(100, 6.0, 156.4)
        assert.deepStrictEqual(adjustedAmount, 2606.6666666666665)
    })
    it("should return 100$ in April 1914 adjusted to April 2023 inflation. It should be rounded to the nearest integer.", () => {
        const adjustedAmount = adjustToInflation(100, 6.0, 156.4, {
            decimals: 0,
        })
        assert.deepStrictEqual(adjustedAmount, 2607)
    })
    it("should return 100$ in April 1914 adjusted to April 2023 inflation. It should be rounded to third decimal.", () => {
        const adjustedAmount = adjustToInflation(100, 6.0, 156.4, {
            decimals: 3,
        })
        assert.deepStrictEqual(adjustedAmount, 2606.667)
    })

    it("should return 100$ in April 2023 adjusted to April 1914 inflation", () => {
        const adjustedAmount = adjustToInflation(100, 156.4, 6.0)
        assert.deepStrictEqual(adjustedAmount, 3.8363171355498764)
    })
    it("should return 100$ in April 2023 adjusted to April 1914 inflation. It should be rounded to the nearest integer.", () => {
        const adjustedAmount = adjustToInflation(100, 156.4, 6.0, {
            decimals: 0,
        })
        assert.deepStrictEqual(adjustedAmount, 4)
    })
    it("should return 100$ in April 2023 adjusted to April 1914 inflation. It should be rounded to third decimal.", () => {
        const adjustedAmount = adjustToInflation(100, 156.4, 6.0, {
            decimals: 3,
        })
        assert.deepStrictEqual(adjustedAmount, 3.836)
    })
})
