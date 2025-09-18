import process from "node:process";
import { existsSync, readFileSync } from "node:fs";

import { JWT } from "google-auth-library";
import {
  GoogleSpreadsheet,
  type GoogleSpreadsheetWorksheet,
} from "google-spreadsheet";

/**
 * Authenticates with Google Sheets and returns a worksheet object.
 * @param sheetUrl The URL of the Google Sheet.
 * @param options Optional authentication options.
 * @returns A GoogleSpreadsheetWorksheet object.
 */
export default async function logToSheet(
  sheetUrl: string,
  options: { apiEmail?: string; apiKey?: string } = {},
) {
  const urlItems = sheetUrl.split("/");
  const spreadsheetId = urlItems[5];
  const sheetId = urlItems[6].split("=")[1];

  const emailVar = options.apiEmail ?? "GOOGLE_SERVICE_ACCOUNT_EMAIL";
  const keyVar = options.apiKey ?? "GOOGLE_PRIVATE_KEY";
  let email = process.env[emailVar];
  let key = process.env[keyVar];

  // Support GOOGLE_APPLICATION_CREDENTIALS
  if (
    process.env.GOOGLE_APPLICATION_CREDENTIALS !== undefined &&
    process.env.GOOGLE_APPLICATION_CREDENTIALS !== "" &&
    existsSync(process.env.GOOGLE_APPLICATION_CREDENTIALS)
  ) {
    const creds = JSON.parse(
      readFileSync(process.env.GOOGLE_APPLICATION_CREDENTIALS, "utf-8"),
    );
    email = creds.client_email;
    key = creds.private_key;
  }

  if (email === undefined || email === "") {
    throw new Error(`process.env.${emailVar} is undefined or ''.`);
  }
  if (key === undefined || key === "") {
    throw new Error(`process.env.${keyVar} is undefined or ''.`);
  }

  const jwt = new JWT({
    email,
    key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const spreadsheet = new GoogleSpreadsheet(spreadsheetId, jwt);

  await spreadsheet.loadInfo();

  // @ts-expect-error sheetId is a string, but indexes are number?
  const sheet = spreadsheet.sheetsById[sheetId];

  if (sheet === undefined) {
    throw new Error(
      `Sheet with ID ${sheetId} not found. Make sure the sheet URL ends with just one gid=ID.`,
    );
  }

  return sheet as GoogleSpreadsheetWorksheet;
}
