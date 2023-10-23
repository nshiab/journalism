import assert from "assert"
import getClosest from "../../src/geo/getClosest.js"

interface item {
    name: string
    lon: number
    lat: number
}

describe("getClosest", () => {
    const geoItems = [
        { name: "Montreal", lon: -73.66, lat: 45.51 },
        { name: "Toronto", lon: -79.43, lat: 43.66 },
    ]
    const ottawa = { lon: -75.71, lat: 45.37 }

    it("should return the closest city from Ottawa", () => {
        const closest = getClosest(
            ottawa.lon,
            ottawa.lat,
            geoItems,
            (d) => (d as item).lon,
            (d) => (d as item).lat
        )
        assert.deepStrictEqual(closest, {
            name: "Montreal",
            lon: -73.66,
            lat: 45.51,
        })
    })
    it("should return the closest city from Ottawa with the distance in km in the returned object", () => {
        const closest = getClosest(
            ottawa.lon,
            ottawa.lat,
            geoItems,
            (d) => (d as item).lon,
            (d) => (d as item).lat,
            { addDistance: true }
        )
        assert.deepStrictEqual(closest, {
            name: "Montreal",
            lon: -73.66,
            lat: 45.51,
            distance: 160.6937083445315,
        })
    })
    it("should return the closest city from Ottawa with the rounded distance in km in the returned object", () => {
        const closest = getClosest(
            ottawa.lon,
            ottawa.lat,
            geoItems,
            (d) => (d as item).lon,
            (d) => (d as item).lat,
            { addDistance: true, decimals: 0 }
        )
        assert.deepStrictEqual(closest, {
            name: "Montreal",
            lon: -73.66,
            lat: 45.51,
            distance: 161,
        })
    })
    it("should return the closest city from Ottawa with the distance in km with 3 decimals in the returned object", () => {
        const closest = getClosest(
            ottawa.lon,
            ottawa.lat,
            geoItems,
            (d) => (d as item).lon,
            (d) => (d as item).lat,
            { addDistance: true, decimals: 3 }
        )
        assert.deepStrictEqual(closest, {
            name: "Montreal",
            lon: -73.66,
            lat: 45.51,
            distance: 160.694,
        })
    })
    it("should return the closest city from Ottawa with the distance in km with 3 decimals in the properties key.", () => {
        const geoItemsWithProperties = [
            { name: "Montreal", lon: -73.66, lat: 45.51, properties: {} },
            { name: "Toronto", lon: -79.43, lat: 43.66, properties: {} },
        ]

        const closest = getClosest(
            ottawa.lon,
            ottawa.lat,
            geoItemsWithProperties,
            (d) => (d as item).lon,
            (d) => (d as item).lat,
            { addDistance: true, decimals: 3 }
        )
        assert.deepStrictEqual(closest, {
            name: "Montreal",
            lon: -73.66,
            lat: 45.51,
            properties: { distance: 160.694 },
        })
    })
})
