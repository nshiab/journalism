// import assert from "assert"
import unzip from "../../src/other/unzip.js"
import { existsSync, mkdirSync } from "fs"

const outputPath = "./test/output/"
if (!existsSync(outputPath)) {
    mkdirSync(outputPath)
}

describe("unzip", () => {
    it("should unzip and put files in a folder", () => {
        unzip("test/data/test.zip", "test/output")
        // How to assert?
    })
})
