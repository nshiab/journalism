import { existsSync } from "fs"
import assert from "assert"
import createDirectory from "../../src/other/createDirectory.js"

const outputPath = "./test/output/folder"
const outputPathRecursive = "./test/output/folder/subfolder/subsubfolder"
const outputPathFile = "./test/output/folder/differentSubfolder/text.csv"
const outputPathWithoutFile = "./test/output/folder/differentSubfolder/"
const outputPathHidden =
    "./test/output/folder/differentSubfolder/.hiddenFolder/"

describe("createDirectory", () => {
    it("should create a folder that doesn't exist", () => {
        createDirectory(outputPath)
        assert.deepStrictEqual(existsSync(outputPath), true)
    })
    it("should not throw an error if the folder already exists", () => {
        createDirectory(outputPath)
        assert.deepStrictEqual(existsSync(outputPath), true)
    })
    it("should not throw an error if the path has / at the end", () => {
        createDirectory(outputPath + "/")
        assert.deepStrictEqual(existsSync(outputPath), true)
    })
    it("should create folders recursively", () => {
        createDirectory(outputPathRecursive)
        assert.deepStrictEqual(existsSync(outputPathRecursive), true)
    })
    it("should create folders recursively even if the path directs to a file that doesn't exist", () => {
        createDirectory(outputPathFile)
        const result = {
            file: existsSync(outputPathFile),
            folder: existsSync(outputPathWithoutFile),
        }
        assert.deepStrictEqual(result, { file: false, folder: true })
    })
    it("should create folders recursively even if the path contains hidden folders", () => {
        createDirectory(outputPathHidden)
        assert.deepStrictEqual(existsSync(outputPathHidden), true)
    })
    it("should do nothing if the path is just a file folders", () => {
        createDirectory("data.csv")
        assert.deepStrictEqual(existsSync(outputPathHidden), true)
    })
})
