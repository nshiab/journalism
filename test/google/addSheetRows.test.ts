import assert from "assert"
import addSheetRows from "../../src/google/addSheetRows.js"
import getSheetData from "../../src/google/getSheetData.js"
import overwriteSheetData from "../../src/google/overwriteSheetData.js"

const data = [
    { first: "Nael", last: "Shiab" },
    { first: "Andrew", last: "Ryan" },
]

const sheetUrl =
    "https://docs.google.com/spreadsheets/d/1Ar19cP8oGYEzacfrkLWnSH7ZqImILMUrosBwnZ43EQM/edit#gid=0"

// Commented tests because too many requests on API.

describe("addSheetRows", () => {
    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
    const key = process.env.GOOGLE_PRIVATE_KEY

    if (
        typeof email === "string" &&
        email !== "" &&
        typeof key === "string" &&
        key !== ""
    ) {
        // it("should add a row to a sheet", async () => {
        //     await overwriteSheetData(data, sheetUrl)

        //     await addSheetRows(
        //         [{ first: "Dexter", last: "McMillan" }],
        //         sheetUrl
        //     )

        //     const testData = await getSheetData(sheetUrl)

        //     assert.deepStrictEqual(testData, [
        //         ...data,
        //         { first: "Dexter", last: "McMillan" },
        //     ])
        // })
        it("should add a row to a sheet with a specific headerIndex", async () => {
            await overwriteSheetData(data, sheetUrl, {
                prepend: "Hi",
                lastUpdate: true,
                timeZone: "Canada/Eastern",
            })

            await addSheetRows(
                [{ first: "Dexter", last: "McMillan" }],
                sheetUrl,
                {
                    headerIndex: 2,
                }
            )

            const testData = await getSheetData(sheetUrl, { skip: 2 })

            assert.deepStrictEqual(testData, [
                ...data,
                { first: "Dexter", last: "McMillan" },
            ])
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
        it("should add rows with a specific apiEmail and apiKey", async () => {
            await overwriteSheetData(data, sheetUrl)

            await addSheetRows(
                [{ first: "Dexter", last: "McMillan" }],
                sheetUrl,
                {
                    apiEmail: "GG_EMAIL",
                    apiKey: "GG_KEY",
                }
            )

            const testData = await getSheetData(sheetUrl)

            assert.deepStrictEqual(testData, [
                ...data,
                { first: "Dexter", last: "McMillan" },
            ])
        })
    } else {
        console.log("No GG_EMAIL or GG_KEY in process.env")
    }
})
