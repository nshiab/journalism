import assert from "assert"
import clearSheet from "../../src/google/clearSheet.js"
import getSheetData from "../../src/google/getSheetData.js"
import overwriteSheetData from "../../src/google/overwriteSheetData.js"

const data = [
    { first: "Nael", last: "Shiab" },
    { first: "Andrew", last: "Ryan" },
]

const sheetUrl =
    "https://docs.google.com/spreadsheets/d/1Ar19cP8oGYEzacfrkLWnSH7ZqImILMUrosBwnZ43EQM/edit#gid=0"

// Commented tests because too many requests on API.

describe("clearSheet", () => {
    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
    const key = process.env.GOOGLE_PRIVATE_KEY

    if (
        typeof email === "string" &&
        email !== "" &&
        typeof key === "string" &&
        key !== ""
    ) {
        it("should clear a sheet", async () => {
            await overwriteSheetData(data, sheetUrl, {
                prepend: "Hi",
                lastUpdate: true,
                timeZone: "Canada/Eastern",
            })

            await clearSheet(sheetUrl)

            const testData = await getSheetData(sheetUrl)

            assert.deepStrictEqual(testData, [])
        })
    } else {
        console.log(
            "No GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_PRIVATE_KEY in process.env"
        )
    }

    const differentEmail = process.env.GG_EMAIL
    const differentKey = process.env.GG_KEY

    if (
        typeof differentEmail === "string" &&
        differentEmail !== "" &&
        typeof differentKey === "string" &&
        differentKey !== ""
    ) {
        it("should clear a sheet with a specific apiEmail and apiKey", async () => {
            await overwriteSheetData(data, sheetUrl, {
                prepend: "Hi",
                lastUpdate: true,
                timeZone: "Canada/Eastern",
            })

            await clearSheet(sheetUrl, {
                apiEmail: "GG_EMAIL",
                apiKey: "GG_KEY",
            })

            const testData = await getSheetData(sheetUrl)

            assert.deepStrictEqual(testData, [])
        })
    } else {
        console.log("No GG_EMAIL or GG_KEY in process.env")
    }
})
