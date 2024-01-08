import assert from "assert"
import dataToArrays from "../../src/format/dataToArrays.js"

describe("dataToArrays", () => {
    it("should return an object made of arrays", () => {
        const rawData = [
            { keyA: "a", keyB: 1 },
            { keyA: "b", keyB: 2 },
            { keyA: "c", keyB: 3 },
        ]
        const data = dataToArrays(rawData)

        assert.deepStrictEqual(data, {
            keyA: ["a", "b", "c"],
            keyB: [1, 2, 3],
        })
    })
})
