import assert from "assert"
import addZScore from "../../src/statistics/addZScore.js"

describe("addZScore", () => {
    it("should compute the zScore", () => {
        const data = [
            { grade: 1 },
            { grade: 4 },
            { grade: 7 },
            { grade: 2 },
            { grade: 6 },
        ]
        addZScore(data, "grade")

        assert.deepStrictEqual(data, [
            { grade: 1, zScoreGrade: -1.3155870289605438 },
            { grade: 4, zScoreGrade: 0 },
            { grade: 7, zScoreGrade: 1.3155870289605438 },
            { grade: 2, zScoreGrade: -0.8770580193070292 },
            { grade: 6, zScoreGrade: 0.8770580193070292 },
        ])
    })
    it("should compute the Z-Score and return the same values as SDA", () => {
        const data = [
            { name: "Chloe", age: 33 },
            { name: "Philip", age: 33 },
            { name: "Sonny", age: 57 },
            { name: "Frazer", age: 64 },
            { name: "Sarah", age: 64 },
            { name: "Frankie", age: 65 },
            { name: "Morgan", age: 33 },
            { name: "Jeremy", age: 34 },
            { name: "Claudia", age: 35 },
            { name: "Evangeline", age: 21 },
            { name: "Amelia", age: 29 },
            { name: "Marie", age: 30 },
            { name: "Kiara", age: 31 },
            { name: "Isobel", age: 31 },
            { name: "Genevieve", age: 32 },
            { name: "Jane", age: 32 },
        ]
        const dataWithScore = addZScore(data, "age")
        dataWithScore.sort(
            (a, b) => (a.zScoreAge as number) - (b.zScoreAge as number)
        )

        assert.deepStrictEqual(data, [
            { name: "Evangeline", age: 21, zScoreAge: -1.2869460097256922 },
            { name: "Amelia", age: 29, zScoreAge: -0.7149700054031624 },
            { name: "Marie", age: 30, zScoreAge: -0.6434730048628461 },
            { name: "Kiara", age: 31, zScoreAge: -0.5719760043225299 },
            { name: "Isobel", age: 31, zScoreAge: -0.5719760043225299 },
            { name: "Genevieve", age: 32, zScoreAge: -0.5004790037822137 },
            { name: "Jane", age: 32, zScoreAge: -0.5004790037822137 },
            { name: "Chloe", age: 33, zScoreAge: -0.42898200324189745 },
            { name: "Philip", age: 33, zScoreAge: -0.42898200324189745 },
            { name: "Morgan", age: 33, zScoreAge: -0.42898200324189745 },
            { name: "Jeremy", age: 34, zScoreAge: -0.3574850027015812 },
            { name: "Claudia", age: 35, zScoreAge: -0.28598800216126496 },
            { name: "Sonny", age: 57, zScoreAge: 1.2869460097256922 },
            { name: "Frazer", age: 64, zScoreAge: 1.787425013507906 },
            { name: "Sarah", age: 64, zScoreAge: 1.787425013507906 },
            { name: "Frankie", age: 65, zScoreAge: 1.858922014048222 },
        ])
    })
})