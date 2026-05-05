"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = logToSheet;
const node_process_1 = __importDefault(require("node:process"));
const node_fs_1 = require("node:fs");
const google_auth_library_1 = require("google-auth-library");
const google_spreadsheet_1 = require("google-spreadsheet");
/**
 * Authenticates with Google Sheets and returns a worksheet object.
 * @param sheetUrl The URL of the Google Sheet.
 * @param options Optional authentication options.
 * @returns A GoogleSpreadsheetWorksheet object.
 */
async function logToSheet(sheetUrl, options = {}) {
    const urlItems = sheetUrl.split("/");
    const spreadsheetId = urlItems[5];
    const sheetId = urlItems[6].split("=")[1];
    const emailVar = options.apiEmail ?? "GOOGLE_SERVICE_ACCOUNT_EMAIL";
    const keyVar = options.apiKey ?? "GOOGLE_PRIVATE_KEY";
    let email = node_process_1.default.env[emailVar];
    let key = node_process_1.default.env[keyVar];
    // Support GOOGLE_APPLICATION_CREDENTIALS
    if (node_process_1.default.env.GOOGLE_APPLICATION_CREDENTIALS !== undefined &&
        node_process_1.default.env.GOOGLE_APPLICATION_CREDENTIALS !== "" &&
        (0, node_fs_1.existsSync)(node_process_1.default.env.GOOGLE_APPLICATION_CREDENTIALS)) {
        const creds = JSON.parse((0, node_fs_1.readFileSync)(node_process_1.default.env.GOOGLE_APPLICATION_CREDENTIALS, "utf-8"));
        email = creds.client_email;
        key = creds.private_key;
    }
    if (email === undefined || email === "") {
        throw new Error(`process.env.${emailVar} is undefined or ''.`);
    }
    if (key === undefined || key === "") {
        throw new Error(`process.env.${keyVar} is undefined or ''.`);
    }
    const jwt = new google_auth_library_1.JWT({
        email,
        key,
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const spreadsheet = new google_spreadsheet_1.GoogleSpreadsheet(spreadsheetId, jwt);
    await spreadsheet.loadInfo();
    // @ts-expect-error sheetId is a string, but indexes are number?
    const sheet = spreadsheet.sheetsById[sheetId];
    if (sheet === undefined) {
        throw new Error(`Sheet with ID ${sheetId} not found. Make sure the sheet URL ends with just one gid=ID.`);
    }
    return sheet;
}
