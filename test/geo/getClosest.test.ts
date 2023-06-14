import assert from "assert"
import getClosest from "../../src/geo/getClosest.js"

interface item {
    name: string
    lat: number
    lon: number
}

describe("getClosest", () => {
    const geoItems = [
        { name: "Montreal", lat: 45.51, lon: -73.66 },
        { name: "Toronto", lat: 43.66, lon: -79.43 },
    ]
    const ottawa = { lat: 45.37, lon: -75.71 }

    it("should return the closest city from Ottawa", () => {
        const closest = getClosest(
            ottawa.lat,
            ottawa.lon,
            geoItems,
            (d) => (d as item).lat,
            (d) => (d as item).lon
        )
        assert.deepStrictEqual(closest, {
            name: "Montreal",
            lat: 45.51,
            lon: -73.66,
        })
    })
    it("should return the closest city from Ottawa with the distance in km in the returned object", () => {
        const closest = getClosest(
            ottawa.lat,
            ottawa.lon,
            geoItems,
            (d) => (d as item).lat,
            (d) => (d as item).lon,
            { addDistance: true }
        )
        assert.deepStrictEqual(closest, {
            name: "Montreal",
            lat: 45.51,
            lon: -73.66,
            distance: 160.6937083445315,
        })
    })
    it("should return the closest city from Ottawa with the rounded distance in km in the returned object", () => {
        const closest = getClosest(
            ottawa.lat,
            ottawa.lon,
            geoItems,
            (d) => (d as item).lat,
            (d) => (d as item).lon,
            { addDistance: true, nbDecimals: 0 }
        )
        assert.deepStrictEqual(closest, {
            name: "Montreal",
            lat: 45.51,
            lon: -73.66,
            distance: 161,
        })
    })
    it("should return the closest city from Ottawa with the distance in km with 3 decimals in the returned object", () => {
        const closest = getClosest(
            ottawa.lat,
            ottawa.lon,
            geoItems,
            (d) => (d as item).lat,
            (d) => (d as item).lon,
            { addDistance: true, nbDecimals: 3 }
        )
        assert.deepStrictEqual(closest, {
            name: "Montreal",
            lat: 45.51,
            lon: -73.66,
            distance: 160.694,
        })
    })
})
