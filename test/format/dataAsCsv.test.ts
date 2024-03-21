import assert from "assert"
import dataAsCsv from "../../src/format/dataAsCsv.js"

describe("dataAsCsv", () => {
    it("should return a CSV string", () => {
        const data = [
            { firstName: "Graeme", lastName: "Bruce" },
            { firstName: "Nael", lastName: "Shiab" },
        ]
        const csv = dataAsCsv(data)

        assert.deepStrictEqual(
            csv,
            "firstName,lastName\nGraeme,Bruce\nNael,Shiab"
        )
    })
})
