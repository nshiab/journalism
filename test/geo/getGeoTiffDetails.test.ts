import assert from "assert"
import getGeoTiffDetails from "../../src/geo/getGeoTiffDetails.js"

describe("getGeoTiffDetails", () => {
    it("should return the detailed information from a geoTiff", async () => {
        const geoTiffDetails = await getGeoTiffDetails("test/data/MAT.tif")
        // @ts-expect-error it's okay
        delete geoTiffDetails.image
        assert.deepStrictEqual(geoTiffDetails, {
            bbox: [
                -179.187500033, 14.431998000000007, -52.604166666, 83.223664685,
            ],
            pixelWidth: 3038,
            pixelHeight: 1651,
            bboxWidth: 126.583333367,
            bboxHeight: 68.791666685,
        })
    })
})
