import assert from "assert"
import { downloadFile } from "../../src/index.js"
import { readFileSync } from "fs"

describe("dowloadFile", () => {
    it("should download a file", async function () {
        await downloadFile(
            "https://raw.githubusercontent.com/nshiab/journalism/main/test/data/data.json",
            "./test/output/data.json"
        )
        const originalData = JSON.parse(
            readFileSync("./test/data/data.json", "utf-8")
        )
        const downloadedData = JSON.parse(
            readFileSync("./test/output/data.json", "utf-8")
        )

        assert.deepStrictEqual(downloadedData, originalData)
    })
})
