import assert from "assert"
import distance from "../../src/geo/distance.js"

describe("distance", () => {
    it("should return the distance in kilometers between Montreal and Toronto", () => {
        const coords = distance(45.51, -73.66, 43.66, -79.43)
        assert.deepStrictEqual(coords, 500.9620073074585)
    })
    it("should return the distance in kilometers between Montreal and Toronto with 3 decimals", () => {
        const coords = distance(45.51, -73.66, 43.66, -79.43, { nbDecimals: 3 })
        assert.deepStrictEqual(coords, 500.962)
    })
    it("should return the distance in kilometers between Montreal and Toronto with no decimals", () => {
        const coords = distance(45.51, -73.66, 43.66, -79.43, { nbDecimals: 0 })
        assert.deepStrictEqual(coords, 501)
    })
})
