import { type GoogleSpreadsheetWorksheet } from "google-spreadsheet";
/**
 * Authenticates with Google Sheets and returns a worksheet object.
 * @param sheetUrl The URL of the Google Sheet.
 * @param options Optional authentication options.
 * @returns A GoogleSpreadsheetWorksheet object.
 */
export default function logToSheet(sheetUrl: string, options?: {
    apiEmail?: string;
    apiKey?: string;
}): Promise<GoogleSpreadsheetWorksheet>;
//# sourceMappingURL=logToSheet.d.ts.map