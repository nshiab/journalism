import { expect, test } from "vite-plus/test";
import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import * as journalism from "../src/index.ts";
import * as web from "../src/web.ts";

test("combines library functions into an offline analysis workflow", () => {
  const directory = mkdtempSync(join(tmpdir(), "journalism-"));
  try {
    const output = join(directory, "data");
    journalism.createDirectory(output);
    expect(existsSync(output)).toBe(true);
    expect(journalism.formatNumber(journalism.getHumidex(20, 30))).toBe("20");
    expect(web.formatNumber(web.getHumidex(20, 30))).toBe("20");
    expect(web.getHumidex).toBe(journalism.getHumidex);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test("keeps browser exports separate from filesystem and service functions", () => {
  expect(web.downloadCSV).toBeTypeOf("function");
  expect(web.zipToUrls).toBeTypeOf("function");
  expect(journalism).not.toHaveProperty("downloadCSV");
  expect(journalism).not.toHaveProperty("zipToUrls");
  for (const name of ["createDirectory", "askGemini", "getSheetData", "getYahooFinanceData"]) {
    expect(journalism).toHaveProperty(name);
    expect(web).not.toHaveProperty(name);
  }
});

test("exposes the current Google API without deprecated functions or private helpers", () => {
  expect(journalism.openSpreadsheet).toBeTypeOf("function");
  expect(journalism.getSheetData).toBeTypeOf("function");
  expect(journalism.pushToSheet).toBeTypeOf("function");
  for (const name of [
    "addSheetRows",
    "overwriteSheetData",
    "clearSheet",
    "parseSheetUrl",
    "findHeaderRow",
  ]) {
    expect(journalism).not.toHaveProperty(name);
    expect(web).not.toHaveProperty(name);
  }
});
