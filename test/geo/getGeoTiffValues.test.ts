import assert from "assert"
import getGeoTiffDetails from "../../src/geo/getGeoTiffDetails.js"
import getGeoTiffValues from "../../src/geo/getGeoTiffValues.js"

describe("getGeoTiffValues", () => {
    it("should return the detailed information from a geoTiff", async () => {
        const geoTiffDetails = await getGeoTiffDetails("test/data/MAT.tif")
        const values = await getGeoTiffValues(45.5, -73.57, geoTiffDetails)
        assert.deepStrictEqual(values[0], 6.5)
    })
})
