import assert from "assert"
import getHumidex from "../../src/weather/getHumidex"

describe("getHumidex", () => {
    it("should return the humidex given temperature and humidity", () => {
        const humidex = getHumidex(30, 86)
        assert.equal(humidex, 41)
    })
})
