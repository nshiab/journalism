import assert from "assert"
import euclideanDistance from "../../src/statistics/euclidianDistance.js"

describe("euclideanDistance", () => {
    it("should return 0 when both points are the same", () => {
        const distance = euclideanDistance(0, 0, 0, 0)
        assert.strictEqual(distance, 0)
    })

    it("should return the correct distance for points on the x-axis", () => {
        const distance = euclideanDistance(0, 0, 3, 0)
        assert.strictEqual(distance, 3)
    })

    it("should return the correct distance for points on the y-axis", () => {
        const distance = euclideanDistance(0, 0, 0, 4)
        assert.strictEqual(distance, 4)
    })

    it("should return the correct distance for points in the first quadrant", () => {
        const distance = euclideanDistance(0, 0, 3, 4)
        assert.strictEqual(distance, 5)
    })

    it("should return the correct distance for points in different quadrants", () => {
        const distance = euclideanDistance(-1, -1, 2, 3)
        assert.strictEqual(distance, 5)
    })
})
