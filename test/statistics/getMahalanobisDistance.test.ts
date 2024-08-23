import assert from "assert"
import getCovarianceMatrix from "../../src/statistics/getCovarianceMatrix.js"
import getMahalanobisDistance from "../../src/statistics/getMahalanobisDistance.js"
import wineQuality from "../data/wine-quality.json" with { type: "json" }
import arraysToData from "../../src/format/arraysToData.js"

const data = arraysToData(wineQuality) as Record<string, number>[]

describe("getMahalanobisDistance", () => {
    it("should return the distance with two variables", () => {
        const twoVariables = data.map((d) => [d["fixed acidity"], d.alcohol])
        const invertedCovarianceMatrix = getCovarianceMatrix(twoVariables, {
            invert: true,
        })
        const distance = getMahalanobisDistance(
            [6.5, 11],
            [7, 8.8],
            invertedCovarianceMatrix
        )
        assert.deepStrictEqual(distance, 1.8276746425479757)
    })
    it("should return the distance with three variables", () => {
        const twoVariables = data.map((d) => [
            d["fixed acidity"],
            d["residual sugar"],
            d.alcohol,
        ])
        const invertedCovarianceMatrix = getCovarianceMatrix(twoVariables, {
            invert: true,
        })
        const distance = getMahalanobisDistance(
            [6.5, 10, 11],
            [7, 20.7, 8.8],
            invertedCovarianceMatrix
        )
        assert.deepStrictEqual(distance, 2.3312505752256536)
    })
    it("should return the distance with four variables", () => {
        const twoVariables = data.map((d) => [
            d["fixed acidity"],
            d["residual sugar"],
            d.density,
            d.alcohol,
        ])
        const invertedCovarianceMatrix = getCovarianceMatrix(twoVariables, {
            invert: true,
        })
        const distance = getMahalanobisDistance(
            [6.5, 10, 0.99, 11],
            [7, 20.7, 1.001, 8.8],
            invertedCovarianceMatrix
        )
        assert.deepStrictEqual(distance, 5.894939604153916)
    })
})
