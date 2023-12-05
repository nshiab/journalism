import assert from "assert"
import maxMortgageAmount from "../../src/finance/maxMortgageAmount.js"

// Tested against https://itools-ioutils.fcac-acfc.gc.ca/MQ-HQ/MQCalc-EAPHCalc-eng.aspx

describe("maxMortgageAmount", () => {
    it("should...", () => {
        const results = maxMortgageAmount(100_000, 25_000, 5.25)
        console.log(results)
        // assert.deepStrictEqual(results, {})
    })
})
