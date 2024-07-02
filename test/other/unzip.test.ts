// import assert from "assert"
import unzip from "../../src/other/unzip.js"
import { existsSync, mkdirSync, copyFileSync } from "fs"

const outputPath = "./test/output/"
if (!existsSync(outputPath)) {
    mkdirSync(outputPath)
}

describe("unzip", () => {
    it("should unzip and put files in a folder", () => {
        unzip("test/data/test.zip", "test/output")
        // How to assert?
    })
    it("should unzip, put files in a folder and remove original file", () => {
        copyFileSync("test/data/test.zip", "test/data/testCopy.zip")
        unzip("test/data/testCopy.zip", "test/output", {
            deleteZippedFile: true,
        })
        // How to assert?
    })
})
