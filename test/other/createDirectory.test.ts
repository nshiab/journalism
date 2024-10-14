import { existsSync } from "node:fs";
import { assertEquals } from "jsr:@std/assert";
import createDirectory from "../../src/other/createDirectory.ts";

const outputPath = "./test/output/folder";
const outputPathRecursive = "./test/output/folder/subfolder/subsubfolder";
const outputPathFile = "./test/output/folder/differentSubfolder/text.csv";
const outputPathWithoutFile = "./test/output/folder/differentSubfolder/";
const outputPathHidden =
  "./test/output/folder/differentSubfolder/.hiddenFolder/";

Deno.test("should create a folder that doesn't exist", () => {
  createDirectory(outputPath);
  assertEquals(existsSync(outputPath), true);
});
Deno.test("should not throw an error if the folder already exists", () => {
  createDirectory(outputPath);
  assertEquals(existsSync(outputPath), true);
});
Deno.test("should not throw an error if the path has / at the end", () => {
  createDirectory(outputPath + "/");
  assertEquals(existsSync(outputPath), true);
});
Deno.test("should create folders recursively", () => {
  createDirectory(outputPathRecursive);
  assertEquals(existsSync(outputPathRecursive), true);
});
Deno.test("should create folders recursively even if the path directs to a file that doesn't exist", () => {
  createDirectory(outputPathFile);
  const result = {
    file: existsSync(outputPathFile),
    folder: existsSync(outputPathWithoutFile),
  };
  assertEquals(result, { file: false, folder: true });
});
Deno.test("should create folders recursively even if the path contains hidden folders", () => {
  createDirectory(outputPathHidden);
  assertEquals(existsSync(outputPathHidden), true);
});
Deno.test("should do nothing if the path is just a file folders", () => {
  createDirectory("data.csv");
  assertEquals(existsSync(outputPathHidden), true);
});
