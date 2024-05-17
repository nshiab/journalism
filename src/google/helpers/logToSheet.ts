import { JWT } from "google-auth-library"
import {
    GoogleSpreadsheet,
    GoogleSpreadsheetWorksheet,
} from "google-spreadsheet"

export default async function logToSheet(
    sheetUrl: string,
    options: { apiEmail?: string; apiKey?: string }
) {
    const urlItems = sheetUrl.split("/")
    const spreadsheetId = urlItems[5]
    const sheetId = urlItems[6].split("=")[1]

    const emailVar = options.apiEmail ?? "GOOGLE_SERVICE_ACCOUNT_EMAIL"
    const keyVar = options.apiKey ?? "GOOGLE_PRIVATE_KEY"
    const email = process.env[emailVar]
    const key = process.env[keyVar]

    if (email === undefined) {
        throw new Error(`process.env.${emailVar} is undefined.`)
    }
    if (key === undefined) {
        throw new Error(`process.env.${keyVar} is undefined.`)
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
