import assert from "assert"
import arraysToData from "../../src/format/arraysToData.js"

describe("arraysToData", () => {
    it("should return an array of objects", () => {
        const rawData = {
            keyA: ["a", "b", "c"],
            keyB: [1, 2, 3],
        }
        const data = arraysToData(rawData)

        assert.deepStrictEqual(data, [
            { keyA: "a", keyB: 1 },
            { keyA: "b", keyB: 2 },
            { keyA: "c", keyB: 3 },
        ])
    })
})
