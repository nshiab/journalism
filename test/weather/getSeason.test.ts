import assert from "assert"
import getSeason from "../../src/weather/getSeason.js"

describe("getSeason", () => {
    it("should return astronomical winter for 2024-01-15", () => {
        const season = getSeason({ date: new Date(2024, 0, 15) })
        assert.equal(season, "winter")
    })
    it("should return astronomical winter for 2024-02-15", () => {
        const season = getSeason({ date: new Date(2024, 1, 15) })
        assert.equal(season, "winter")
    })
    it("should return astronomical winter for 2024-03-20", () => {
        const season = getSeason({ date: new Date(2024, 2, 20) })
        assert.equal(season, "winter")
    })
    it("should return astronomical spring for 2024-03-21", () => {
        const season = getSeason({ date: new Date(2024, 2, 21) })
        assert.equal(season, "spring")
    })
    it("should return astronomical spring for 2024-04-15", () => {
        const season = getSeason({ date: new Date(2024, 3, 15) })
        assert.equal(season, "spring")
    })
    it("should return astronomical spring for 2024-06-20", () => {
        const season = getSeason({ date: new Date(2023, 5, 20) })
        assert.equal(season, "spring")
    })
    it("should return astronomical summer for 2024-06-21", () => {
        const season = getSeason({ date: new Date(2024, 5, 21) })
        assert.equal(season, "summer")
    })
    it("should return astronomical summer for 2024-07-15", () => {
        const season = getSeason({ date: new Date(2024, 6, 15) })
        assert.equal(season, "summer")
    })
    it("should return astronomical summer for 2024-08-15", () => {
        const season = getSeason({ date: new Date(2024, 7, 15) })
        assert.equal(season, "summer")
    })
    it("should return astronomical summer for 2024-09-20", () => {
        const season = getSeason({ date: new Date(2024, 8, 20) })
        assert.equal(season, "summer")
    })
    it("should return astronomical fall for 2024-09-21", () => {
        const season = getSeason({ date: new Date(2024, 8, 21) })
        assert.equal(season, "fall")
    })
    it("should return astronomical fall for 2024-10-15", () => {
        const season = getSeason({ date: new Date(2024, 9, 15) })
        assert.equal(season, "fall")
    })
    it("should return astronomical fall for 2024-11-15", () => {
        const season = getSeason({ date: new Date(2024, 10, 15) })
        assert.equal(season, "fall")
    })
    it("should return astronomical fall for 2024-12-20", () => {
        const season = getSeason({ date: new Date(2024, 11, 20) })
        assert.equal(season, "fall")
    })
    it("should return astronomical winter for 2024-12-21", () => {
        const season = getSeason({ date: new Date(2024, 11, 21) })
        assert.equal(season, "winter")
    })
    // meteorogical
    it("should return meteorogical winter for 2024-01-01", () => {
        const season = getSeason({
            date: new Date(2024, 0, 1),
            type: "meteorological",
        })
        assert.equal(season, "winter")
    })
    it("should return meteorogical winter for 2024-01-31", () => {
        const season = getSeason({
            date: new Date(2024, 0, 31),
            type: "meteorological",
        })
        assert.equal(season, "winter")
    })
    it("should return meteorogical winter for 2024-02-28", () => {
        const season = getSeason({
            date: new Date(2024, 1, 28),
            type: "meteorological",
        })
        assert.equal(season, "winter")
    })
    it("should return meteorogical spring for 2024-03-01", () => {
        const season = getSeason({
            date: new Date(2024, 2, 1),
            type: "meteorological",
        })
        assert.equal(season, "spring")
    })
    it("should return meteorogical spring for 2024-04-01", () => {
        const season = getSeason({
            date: new Date(2024, 3, 1),
            type: "meteorological",
        })
        assert.equal(season, "spring")
    })
    it("should return meteorogical spring for 2024-05-01", () => {
        const season = getSeason({
            date: new Date(2024, 4, 1),
            type: "meteorological",
        })
        assert.equal(season, "spring")
    })
    it("should return meteorogical spring for 2024-05-31", () => {
        const season = getSeason({
            date: new Date(2024, 4, 31),
            type: "meteorological",
        })
        assert.equal(season, "spring")
    })
    it("should return meteorogical summer for 2024-06-01", () => {
        const season = getSeason({
            date: new Date(2024, 5, 1),
            type: "meteorological",
        })
        assert.equal(season, "summer")
    })
    it("should return meteorogical summer for 2024-07-01", () => {
        const season = getSeason({
            date: new Date(2024, 6, 1),
            type: "meteorological",
        })
        assert.equal(season, "summer")
    })
    it("should return meteorogical summer for 2024-08-01", () => {
        const season = getSeason({
            date: new Date(2024, 7, 1),
            type: "meteorological",
        })
        assert.equal(season, "summer")
    })
    it("should return meteorogical summer for 2024-08-31", () => {
        const season = getSeason({
            date: new Date(2024, 7, 31),
            type: "meteorological",
        })
        assert.equal(season, "summer")
    })
    it("should return meteorogical fall for 2024-09-01", () => {
        const season = getSeason({
            date: new Date(2024, 8, 1),
            type: "meteorological",
        })
        assert.equal(season, "fall")
    })
    it("should return meteorogical fall for 2024-10-01", () => {
        const season = getSeason({
            date: new Date(2024, 9, 1),
            type: "meteorological",
        })
        assert.equal(season, "fall")
    })
    it("should return meteorogical fall for 2024-11-01", () => {
        const season = getSeason({
            date: new Date(2024, 10, 1),
            type: "meteorological",
        })
        assert.equal(season, "fall")
    })
    it("should return meteorogical fall for 2024-11-30", () => {
        const season = getSeason({
            date: new Date(2024, 10, 30),
            type: "meteorological",
        })
        assert.equal(season, "fall")
    })
    it("should return meteorogical winter for 2024-12-01", () => {
        const season = getSeason({
            date: new Date(2024, 11, 1),
            type: "meteorological",
        })
        assert.equal(season, "winter")
    })
    // southern
    it("should return astronomical summer for 2024-01-01 for southern hemisphere", () => {
        const season = getSeason({
            date: new Date(2024, 0, 1),
            hemisphere: "southern",
        })
        assert.equal(season, "summer")
    })
    it("should return astronomical fall for 2024-04-01 for southern hemisphere", () => {
        const season = getSeason({
            date: new Date(2024, 3, 1),
            hemisphere: "southern",
        })
        assert.equal(season, "fall")
    })
    it("should return astronomical winter for 2024-07-01 for southern hemisphere", () => {
        const season = getSeason({
            date: new Date(2024, 6, 1),
            hemisphere: "southern",
        })
        assert.equal(season, "winter")
    })
    it("should return astronomical spring for 2024-10-01 for southern hemisphere", () => {
        const season = getSeason({
            date: new Date(2024, 9, 1),
            hemisphere: "southern",
        })
        assert.equal(season, "spring")
    })
})
