import { JWT } from "google-auth-library"
import {
    GoogleSpreadsheet,
    GoogleSpreadsheetWorksheet,
} from "google-spreadsheet"

export default async function logToSheet(sheetUrl: string) {
    const urlItems = sheetUrl.split("/")
    const spreadsheetId = urlItems[5]
    const sheetId = urlItems[6].split("=")[1]

    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
    const key = process.env.GOOGLE_PRIVATE_KEY

    if (email === undefined || key === undefined) {
        throw new Error(
            `process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL or process.env.GOOGLE_PRIVATE_KEY is undefined.`
        )
    }

    const jwt = new JWT({
        email,
        key,
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    })

    const spreadsheet = new GoogleSpreadsheet(spreadsheetId, jwt)

    await spreadsheet.loadInfo()

    // @ts-expect-error sheetId is a string, but indexes are number?
    const sheet = spreadsheet.sheetsById[sheetId]

    return sheet as GoogleSpreadsheetWorksheet
}
