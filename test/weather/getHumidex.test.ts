import assert from "assert"
import getHumidex from "../../src/weather/getHumidex.js"

describe("getHumidex", () => {
    it("should return the humidex given temperature and humidity", () => {
        const humidex = getHumidex(30, 70)
        assert.equal(humidex, 41)
    })
    it("should throw error when humidex is not between 0 and 100", () => {
        assert.throws(() => getHumidex(30, 105))
    })
})
