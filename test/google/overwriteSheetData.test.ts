import assert from "assert"
import getSheetData from "../../src/google/getSheetData.js"
import overwriteSheetData from "../../src/google/overwriteSheetData.js"

const sheetUrl =
    "https://docs.google.com/spreadsheets/d/1Ar19cP8oGYEzacfrkLWnSH7ZqImILMUrosBwnZ43EQM/edit#gid=0"

const data = [
    { first: "Nael", last: "Shiab" },
    { first: "Andrew", last: "Ryan" },
]

// Commented tests because too many requests on API.

describe("overwriteSheetData", () => {
    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
    const key = process.env.GOOGLE_PRIVATE_KEY

    if (
        typeof email === "string" &&
        email !== "" &&
        typeof key === "string" &&
        key !== ""
    ) {
        // it("should overwrite the data in a sheet", async () => {
        //     await overwriteSheetData(data, sheetUrl)

        //     const csv = await getSheetData(sheetUrl, { csv: true })

        //     assert.deepStrictEqual(csv, "first,last\r\nNael,Shiab\r\nAndrew,Ryan")
        // })
        // it("should overwrite the data in a sheet as raw values", async () => {
        //     await overwriteSheetData(data, sheetUrl, { raw: true })

        //     const csv = await getSheetData(sheetUrl, { csv: true })

        //     assert.deepStrictEqual(csv, "first,last\r\nNael,Shiab\r\nAndrew,Ryan")
        // })
        // it("should overwrite the data in a sheet with a lastUpdate option", async () => {
        //     await overwriteSheetData(data, sheetUrl, { lastUpdate: true })

        //     const csv = await getSheetData(sheetUrl, { csv: true })

        //     assert.deepStrictEqual(
        //         (csv as string).replace(
        //             /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/,
        //             "DATE"
        //         ).replace(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}/, "DATE"),,
        //         "Last update:,DATE UTC\r\nfirst,last\r\nNael,Shiab\r\nAndrew,Ryan"
        //     )
        // })
        // it("should overwrite the data in a sheet with a lastUpdate option and a specific time zone", async () => {
        //     await overwriteSheetData(data, sheetUrl, {
        //         lastUpdate: true,
        //         timeZone: "Canada/Eastern",
        //     })

        //     const csv = await getSheetData(sheetUrl, { csv: true })

        //     assert.deepStrictEqual(
        //         (csv as string).replace(
        //             /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/,
        //             "DATE"
        //         ).replace(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}/, "DATE"),,
        //         "Last update:,DATE ET\r\nfirst,last\r\nNael,Shiab\r\nAndrew,Ryan"
        //     )
        // })
        // it("should overwrite the data in a sheet with a prepended text", async () => {
        //     await overwriteSheetData(data, sheetUrl, {
        //         prepend: "Contact me for more info",
        //     })

        //     const csv = await getSheetData(sheetUrl, { csv: true })

        //     assert.deepStrictEqual(
        //         csv,
        //         "Contact me for more info,\r\nfirst,last\r\nNael,Shiab\r\nAndrew,Ryan"
        //     )
        // })

        it("should overwrite the data in a sheet with a prepended text and lastUpdate with a specific time zone", async () => {
            await overwriteSheetData(data, sheetUrl, {
                prepend: "Contact me for more info",
                lastUpdate: true,
                timeZone: "Canada/Eastern",
            })

            const csv = await getSheetData(sheetUrl, { csv: true })

            assert.deepStrictEqual(
                (csv as string)
                    .replace(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/, "DATE")
                    .replace(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}/, "DATE"),
                "Contact me for more info,\r\nLast update:,DATE ET\r\nfirst,last\r\nNael,Shiab\r\nAndrew,Ryan"
            )
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
    //     it("should overwrite the data in a sheet with a prepended text and lastUpdate with a specific time zone, using a specific apiEmail and apiKey", async () => {
    //         await overwriteSheetData(data, sheetUrl, {
    //             prepend: "Contact me for more info",
    //             lastUpdate: true,
    //             timeZone: "Canada/Eastern",
    //             apiEmail: "GG_EMAIL",
    //             apiKey: "GG_KEY",
    //         })

    //         const csv = await getSheetData(sheetUrl, {
    //             csv: true,
    //             apiEmail: "GG_EMAIL",
    //             apiKey: "GG_KEY",
    //         })

    //         assert.deepStrictEqual(
    //             (csv as string)
    //                 .replace(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/, "DATE")
    //                 .replace(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}/, "DATE"),
    //             "Contact me for more info,\r\nLast update:,DATE ET\r\nfirst,last\r\nNael,Shiab\r\nAndrew,Ryan"
    //         )
    //     })
    // } else {
    //     console.log("No GG_EMAIL or GG_KEY in process.env")
    // }
})
