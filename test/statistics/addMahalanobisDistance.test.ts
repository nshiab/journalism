import assert from "assert"
import addMahalanobisDistance from "../../src/statistics/addMahalanobisDistance.js"
import wineQuality from "../data/wine-quality.json" with { type: "json" }
import arraysToData from "../../src/format/arraysToData.js"

const wines = arraysToData(wineQuality) as Record<string, number>[]

describe("addMahalanobisDistance", () => {
    it("should add the Mahalanobis distance with two variables (example from doc)", () => {
        const data = [
            { "fixed acidity": 6.5, alcohol: 13 },
            { "fixed acidity": 7.1, alcohol: 12.2 },
            { "fixed acidity": 7.3, alcohol: 11.4 },
            { "fixed acidity": 7.2, alcohol: 11.3 },
            { "fixed acidity": 7.5, alcohol: 10.5 },
        ]

        const origin = { "fixed acidity": 7.2, alcohol: 11.3 }

        const dataWithDist = addMahalanobisDistance(origin, data).sort(
            (a, b) => a.mahaDist - b.mahaDist
        )

        assert.deepStrictEqual(dataWithDist, [
            { "fixed acidity": 7.2, alcohol: 11.3, mahaDist: 0 },
            {
                "fixed acidity": 7.5,
                alcohol: 10.5,
                mahaDist: 0.939177365543612,
            },
            { "fixed acidity": 7.3, alcohol: 11.4, mahaDist: 1.2633328837091 },
            { "fixed acidity": 6.5, alcohol: 13, mahaDist: 2.0790687857292087 },
            {
                "fixed acidity": 7.1,
                alcohol: 12.2,
                mahaDist: 2.411833147969197,
            },
        ])
    })
    it("should add the Mahalanobis distance and the similarity with two variables (example from doc)", () => {
        const data = [
            { "fixed acidity": 6.5, alcohol: 13 },
            { "fixed acidity": 7.1, alcohol: 12.2 },
            { "fixed acidity": 7.3, alcohol: 11.4 },
            { "fixed acidity": 7.2, alcohol: 11.3 },
            { "fixed acidity": 7.5, alcohol: 10.5 },
        ]

        const origin = { "fixed acidity": 7.2, alcohol: 11.3 }

        const dataWithDist = addMahalanobisDistance(origin, data, {
            similarity: true,
        }).sort((a, b) => a.mahaDist - b.mahaDist)

        assert.deepStrictEqual(dataWithDist, [
            { "fixed acidity": 7.2, alcohol: 11.3, mahaDist: 0, similarity: 1 },
            {
                "fixed acidity": 7.5,
                alcohol: 10.5,
                mahaDist: 0.939177365543612,
                similarity: 0.6105960454460067,
            },
            {
                "fixed acidity": 7.3,
                alcohol: 11.4,
                mahaDist: 1.2633328837091,
                similarity: 0.4761939130105882,
            },
            {
                "fixed acidity": 6.5,
                alcohol: 13,
                mahaDist: 2.0790687857292087,
                similarity: 0.13797155185472976,
            },
            {
                "fixed acidity": 7.1,
                alcohol: 12.2,
                mahaDist: 2.411833147969197,
                similarity: 0,
            },
        ])
    })
    it("should add the Mahalanobis distance with two variables", () => {
        const winesTwoVariables = addMahalanobisDistance(
            { "fixed acidity": 7.2, alcohol: 11.3 },
            wines.map((d) => ({
                "fixed acidity": d["fixed acidity"],
                alcohol: d.alcohol,
            }))
        )

        assert.deepStrictEqual(
            winesTwoVariables
                .sort((a, b) => a.mahaDist - b.mahaDist)
                .slice(0, 20),
            [
                { "fixed acidity": 7.2, alcohol: 11.3, mahaDist: 0 },
                { "fixed acidity": 7.2, alcohol: 11.3, mahaDist: 0 },
                { "fixed acidity": 7.2, alcohol: 11.3, mahaDist: 0 },
                { "fixed acidity": 7.2, alcohol: 11.3, mahaDist: 0 },
                { "fixed acidity": 7.2, alcohol: 11.3, mahaDist: 0 },
                { "fixed acidity": 7.2, alcohol: 11.3, mahaDist: 0 },
                {
                    "fixed acidity": 7.2,
                    alcohol: 11.4,
                    mahaDist: 0.0818684538906817,
                },
                {
                    "fixed acidity": 7.2,
                    alcohol: 11.4,
                    mahaDist: 0.0818684538906817,
                },
                {
                    "fixed acidity": 7.2,
                    alcohol: 11.4,
                    mahaDist: 0.0818684538906817,
                },
                {
                    "fixed acidity": 7.2,
                    alcohol: 11.4,
                    mahaDist: 0.0818684538906817,
                },
                {
                    "fixed acidity": 7.2,
                    alcohol: 11.4,
                    mahaDist: 0.0818684538906817,
                },
                {
                    "fixed acidity": 7.2,
                    alcohol: 11.2,
                    mahaDist: 0.08186845389068316,
                },
                {
                    "fixed acidity": 7.2,
                    alcohol: 11.2,
                    mahaDist: 0.08186845389068316,
                },
                {
                    "fixed acidity": 7.2,
                    alcohol: 11.2,
                    mahaDist: 0.08186845389068316,
                },
                {
                    "fixed acidity": 7.2,
                    alcohol: 11.2,
                    mahaDist: 0.08186845389068316,
                },
                {
                    "fixed acidity": 7.3,
                    alcohol: 11.3,
                    mahaDist: 0.11938949696447326,
                },
                {
                    "fixed acidity": 7.3,
                    alcohol: 11.3,
                    mahaDist: 0.11938949696447326,
                },
                {
                    "fixed acidity": 7.3,
                    alcohol: 11.3,
                    mahaDist: 0.11938949696447326,
                },
                {
                    "fixed acidity": 7.3,
                    alcohol: 11.3,
                    mahaDist: 0.11938949696447326,
                },
                {
                    "fixed acidity": 7.3,
                    alcohol: 11.3,
                    mahaDist: 0.11938949696447326,
                },
            ]
        )
    })
    it("should add the Mahalanobis distance with three variables", () => {
        const winesThreeVariables = addMahalanobisDistance(
            { "fixed acidity": 7.2, "residual sugar": 10, alcohol: 11.3 },
            wines.map((d) => ({
                "fixed acidity": d["fixed acidity"],
                "residual sugar": d["residual sugar"],
                alcohol: d.alcohol,
            }))
        )

        assert.deepStrictEqual(
            winesThreeVariables
                .sort((a, b) => a.mahaDist - b.mahaDist)
                .slice(0, 20),
            [
                {
                    "fixed acidity": 7.3,
                    "residual sugar": 9.9,
                    alcohol: 11.2,
                    mahaDist: 0.15211898985777253,
                },
                {
                    "fixed acidity": 7.1,
                    "residual sugar": 10.4,
                    alcohol: 11.5,
                    mahaDist: 0.258374450680126,
                },
                {
                    "fixed acidity": 7.1,
                    "residual sugar": 10.4,
                    alcohol: 11.5,
                    mahaDist: 0.258374450680126,
                },
                {
                    "fixed acidity": 7.4,
                    "residual sugar": 8.8,
                    alcohol: 11.4,
                    mahaDist: 0.3509326214219846,
                },
                {
                    "fixed acidity": 7,
                    "residual sugar": 10.6,
                    alcohol: 11.5,
                    mahaDist: 0.3524583078351125,
                },
                {
                    "fixed acidity": 7.2,
                    "residual sugar": 8.25,
                    alcohol: 11.4,
                    mahaDist: 0.35570907154269077,
                },
                {
                    "fixed acidity": 7.2,
                    "residual sugar": 8.25,
                    alcohol: 11.4,
                    mahaDist: 0.35570907154269077,
                },
                {
                    "fixed acidity": 7.1,
                    "residual sugar": 11,
                    alcohol: 11.5,
                    mahaDist: 0.3614011883562717,
                },
                {
                    "fixed acidity": 7.1,
                    "residual sugar": 10.7,
                    alcohol: 10.9,
                    mahaDist: 0.36187829739532607,
                },
                {
                    "fixed acidity": 7.3,
                    "residual sugar": 9.4,
                    alcohol: 11,
                    mahaDist: 0.3670396282506128,
                },
                {
                    "fixed acidity": 7,
                    "residual sugar": 10.3,
                    alcohol: 11.6,
                    mahaDist: 0.37711889896404494,
                },
                {
                    "fixed acidity": 6.9,
                    "residual sugar": 9.2,
                    alcohol: 11.5,
                    mahaDist: 0.3841386116999462,
                },
                {
                    "fixed acidity": 6.9,
                    "residual sugar": 9.2,
                    alcohol: 11.5,
                    mahaDist: 0.3841386116999462,
                },
                {
                    "fixed acidity": 7,
                    "residual sugar": 9.9,
                    alcohol: 11,
                    mahaDist: 0.38689142951340966,
                },
                {
                    "fixed acidity": 7,
                    "residual sugar": 10.5,
                    alcohol: 11.6,
                    mahaDist: 0.40205414372952375,
                },
                {
                    "fixed acidity": 7.1,
                    "residual sugar": 9.9,
                    alcohol: 10.9,
                    mahaDist: 0.4042132879607567,
                },
                {
                    "fixed acidity": 7.5,
                    "residual sugar": 9.2,
                    alcohol: 11.4,
                    mahaDist: 0.40573226900894505,
                },
                {
                    "fixed acidity": 6.9,
                    "residual sugar": 9.05,
                    alcohol: 11.3,
                    mahaDist: 0.408298689114341,
                },
                {
                    "fixed acidity": 7,
                    "residual sugar": 10.05,
                    alcohol: 11.7,
                    mahaDist: 0.422912021672298,
                },
                {
                    "fixed acidity": 7,
                    "residual sugar": 10.05,
                    alcohol: 11.7,
                    mahaDist: 0.422912021672298,
                },
            ]
        )
    })
    it("should add the Mahalanobis distance with four variables", () => {
        const winesFourVariables = addMahalanobisDistance(
            {
                "fixed acidity": 7.2,
                "residual sugar": 10,
                density: 0.99,
                alcohol: 11.3,
            },
            wines.map((d) => ({
                "fixed acidity": d["fixed acidity"],
                "residual sugar": d["residual sugar"],
                density: d["density"],
                alcohol: d.alcohol,
            }))
        )

        assert.deepStrictEqual(
            winesFourVariables
                .sort((a, b) => a.mahaDist - b.mahaDist)
                .slice(0, 20),
            [
                {
                    "fixed acidity": 7.8,
                    "residual sugar": 7.4,
                    density: 0.99278,
                    alcohol: 11,
                    mahaDist: 3.9496595560083083,
                },
                {
                    "fixed acidity": 7.8,
                    "residual sugar": 7.4,
                    density: 0.99278,
                    alcohol: 11,
                    mahaDist: 3.9496595560083083,
                },
                {
                    "fixed acidity": 7.8,
                    "residual sugar": 5,
                    density: 0.99186,
                    alcohol: 11,
                    mahaDist: 4.005469854521244,
                },
                {
                    "fixed acidity": 8.5,
                    "residual sugar": 11.1,
                    density: 0.99507,
                    alcohol: 10.5,
                    mahaDist: 4.139289176161463,
                },
                {
                    "fixed acidity": 6.8,
                    "residual sugar": 11.6,
                    density: 0.99314,
                    alcohol: 11.7,
                    mahaDist: 4.178435781478545,
                },
                {
                    "fixed acidity": 6.8,
                    "residual sugar": 11.6,
                    density: 0.99314,
                    alcohol: 11.7,
                    mahaDist: 4.178435781478545,
                },
                {
                    "fixed acidity": 7.4,
                    "residual sugar": 10.7,
                    density: 0.9954,
                    alcohol: 9.7,
                    mahaDist: 4.195989340259887,
                },
                {
                    "fixed acidity": 7.4,
                    "residual sugar": 10.7,
                    density: 0.9954,
                    alcohol: 9.7,
                    mahaDist: 4.195989340259887,
                },
                {
                    "fixed acidity": 7,
                    "residual sugar": 4.7,
                    density: 0.99202,
                    alcohol: 10.5,
                    mahaDist: 4.204290225808204,
                },
                {
                    "fixed acidity": 6.8,
                    "residual sugar": 2.8,
                    density: 0.9904,
                    alcohol: 11.2,
                    mahaDist: 4.215083974795555,
                },
                {
                    "fixed acidity": 7.5,
                    "residual sugar": 6.55,
                    density: 0.99244,
                    alcohol: 11.1,
                    mahaDist: 4.226226186779647,
                },
                {
                    "fixed acidity": 6.7,
                    "residual sugar": 7.9,
                    density: 0.99119,
                    alcohol: 12.2,
                    mahaDist: 4.2266645557673135,
                },
                {
                    "fixed acidity": 7.4,
                    "residual sugar": 6.1,
                    density: 0.99244,
                    alcohol: 10.9,
                    mahaDist: 4.237768458235507,
                },
                {
                    "fixed acidity": 7,
                    "residual sugar": 2.6,
                    density: 0.99047,
                    alcohol: 11.2,
                    mahaDist: 4.253607108031713,
                },
                {
                    "fixed acidity": 7,
                    "residual sugar": 2.6,
                    density: 0.99047,
                    alcohol: 11.2,
                    mahaDist: 4.253607108031713,
                },
                {
                    "fixed acidity": 6.8,
                    "residual sugar": 8.7,
                    density: 0.99146,
                    alcohol: 12.3,
                    mahaDist: 4.290423122865777,
                },
                {
                    "fixed acidity": 7.3,
                    "residual sugar": 6.65,
                    density: 0.99244,
                    alcohol: 11.1,
                    mahaDist: 4.296832594719177,
                },
                {
                    "fixed acidity": 8,
                    "residual sugar": 8.4,
                    density: 0.99192,
                    alcohol: 12.3,
                    mahaDist: 4.302535403573767,
                },
                {
                    "fixed acidity": 6.9,
                    "residual sugar": 8.3,
                    density: 0.99139,
                    alcohol: 12.3,
                    mahaDist: 4.3026489840442625,
                },
                {
                    "fixed acidity": 6.7,
                    "residual sugar": 3.6,
                    density: 0.99144,
                    alcohol: 10.5,
                    mahaDist: 4.303308901431428,
                },
            ]
        )
    })
})
