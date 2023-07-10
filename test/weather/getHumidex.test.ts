import assert from "assert"
import getHumidex from "../../src/weather/getHumidex.js"

describe("getHumidex", () => {
    it("should return the humidex (35) given temperature (27 C) and humidity (70%)", () => {
        const humidex = getHumidex(27, 70)
        assert.equal(humidex, 35)
    })
    it("should return the humidex (41) given temperature (30 C) and humidity (70%)", () => {
        const humidex = getHumidex(30, 70)
        assert.equal(humidex, 41)
    })
    it("should return the humidex (29) given temperature (21 C) and humidity (100%)", () => {
        const humidex = getHumidex(21, 100)
        assert.equal(humidex, 29)
    })
    it("should return the humidex (59) given temperature (35 C) and humidity (95%)", () => {
        const humidex = getHumidex(35, 95)
        assert.equal(humidex, 59)
    })
    it("should return the temperature (21 C) (with humidity (20%)) if humidex is less than the temperature", () => {
        const humidex = getHumidex(21, 20)
        assert.equal(humidex, 21)
    })
    it("should throw error when humidex is not between 0 and 100", () => {
        assert.throws(() => getHumidex(30, 105))
    })
})
