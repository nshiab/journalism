import assert from "assert"
import adjustToInflation from "../../src/others/adjustToInflation.js"

// Using this as a reference https://www.bankofcanada.ca/rates/related/inflation-calculator/

describe("adjustToInflation", () => {
    it("should return 100$ in April 1914 adjusted to April 2023 inflation", () => {
        const adjustedAmount = adjustToInflation(100, 6.0, 156.4)
        assert.deepStrictEqual(adjustedAmount, 2606.6666666666665)
    })
})
