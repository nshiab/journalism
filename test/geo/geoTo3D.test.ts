import assert from "assert"
import geoTo3D from "../../src/geo/geoTo3D.js"

describe("geoTo3D", () => {
    it("should return 3D coordinates based on lat/lon as an object", () => {
        const coords = geoTo3D(45.5019, 73.5674, 1)
        assert.deepStrictEqual(coords, {
            x: 0.6722566585728339,
            y: 0.7132736917934053,
            z: 0.19827159554483506,
        })
    })
    it("should return 3D coordinates based on lat/lon as an array", () => {
        const coords = geoTo3D(45.5019, 73.5674, 1, { toArray: true })
        assert.deepStrictEqual(
            coords,
            [0.6722566585728339, 0.7132736917934053, 0.19827159554483506]
        )
    })
    it("should return 3D coordinates based on lat/lon as an object with 2 decimals", () => {
        const coords = geoTo3D(45.5019, 73.5674, 1, { nbDecimals: 2 })
        assert.deepStrictEqual(coords, { x: 0.67, y: 0.71, z: 0.2 })
    })
    it("should return 3D coordinates based on lat/lon as an array with 2 decimals", () => {
        const coords = geoTo3D(45.5019, 73.5674, 1, {
            nbDecimals: 2,
            toArray: true,
        })
        assert.deepStrictEqual(coords, [0.67, 0.71, 0.2])
    })
})
