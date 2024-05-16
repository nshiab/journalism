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

    if (typeof email !== "string" || typeof key !== "string") {
        throw new Error(
            `You need environment variables GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY available in process.env. If you don't have credentials, see https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication. DON'T COMMIT THESE VARIABLES. ADD YOUR .ENV TO .GITIGNORE.`
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
