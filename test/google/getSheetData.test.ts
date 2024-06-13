import assert from "assert"
import overwriteSheetData from "../../src/google/overwriteSheetData.js"
import getSheetData from "../../src/google/getSheetData.js"

const sheetUrl =
    "https://docs.google.com/spreadsheets/d/1Ar19cP8oGYEzacfrkLWnSH7ZqImILMUrosBwnZ43EQM/edit#gid=0"

const originalData = [
    { first: "Nael", last: "Shiab" },
    { first: "Andrew", last: "Ryan" },
    { first: "Graeme", last: "Bruce" },
    { first: "Dexter", last: "McMillan" },
]

// Commented tests because too many requests on API.

describe("getSheetData", () => {
    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
    const key = process.env.GOOGLE_PRIVATE_KEY

    if (
        typeof email === "string" &&
        email !== "" &&
        typeof key === "string" &&
        key !== ""
    ) {
        // it("should return the data from a sheet as an array of object", async () => {
        //     await overwriteSheetData(originalData, sheetUrl)

        //     const data = await getSheetData(sheetUrl)

        //     assert.deepStrictEqual(data, originalData)
        // })
        // it("should return the data from a sheet as a csv", async () => {
        //     const data = await getSheetData(sheetUrl, { csv: true })

        //     assert.deepStrictEqual(
        //         data,
        //         "first,last\r\nNael,Shiab\r\nAndrew,Ryan\r\nGraeme,Bruce\r\nDexter,McMillan"
        //     )
        // })
        // it("should return the data as a csv after skipping the first row", async () => {
        //     const data = await getSheetData(sheetUrl, { skip: 1, csv: true })

        //     assert.deepStrictEqual(
        //         data,
        //         "first,last\r\nNael,Shiab\r\nAndrew,Ryan\r\nGraeme,Bruce\r\nDexter,McMillan"
        //     )
        // })

        it("should return the data as an array of objects after skipping the first row", async () => {
            await overwriteSheetData(originalData, sheetUrl, {
                prepend: "Contact me for more info",
            })

            const data = await getSheetData(sheetUrl, { skip: 1 })

            assert.deepStrictEqual(data, originalData)
        })
    } else {
        console.log(
            "No GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_PRIVATE_KEY in process.env"
        )
    }

    // const differentEmail = process.env.GG_EMAIL
    // const differentKey = process.env.GG_KEY

    // if (
    //     typeof differentEmail === "string" &&
    //     differentEmail !== "" &&
    //     typeof differentKey === "string" &&
    //     differentKey !== ""
    // ) {
    //     it("should return the data as an array of objects after skipping the first row, with a specific apiEmail and apiKey", async () => {
    //         await overwriteSheetData(originalData, sheetUrl, {
    //             prepend: "Contact me for more info",
    //             apiEmail: "GG_EMAIL",
    //             apiKey: "GG_KEY",
    //         })
    //         const data = await getSheetData(sheetUrl, {
    //             skip: 1,
    //             apiEmail: "GG_EMAIL",
    //             apiKey: "GG_KEY",
    //         })

    //         assert.deepStrictEqual(data, originalData)
    //     })
    // } else {
    //     console.log("No GG_EMAIL or GG_KEY in process.env")
    // }
})
