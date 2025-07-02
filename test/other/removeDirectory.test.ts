import { existsSync } from "node:fs";
import { assertEquals } from "jsr:@std/assert";
import createDirectory from "../../src/other/createDirectory.ts";
import removeDirectory from "../../src/other/removeDirectory.ts";

const outputPath = "./test/output/folderToRemove";
const outputPathRecursive =
  "./test/output/folderToRemove/subfolder/subsubfolder";
const outputPathHidden =
  "./test/output/folderToRemove/differentSubfolder/.hiddenFolder/";

Deno.test("should remove a folder that exists", () => {
  // First create the folder
  createDirectory(outputPath);
  assertEquals(existsSync(outputPath), true);

  // Then remove it
  removeDirectory(outputPath);
  assertEquals(existsSync(outputPath), false);
});

Deno.test("should not throw an error if the folder doesn't exist", () => {
  // Ensure folder doesn't exist first
  removeDirectory(outputPath);
  assertEquals(existsSync(outputPath), false);

  // Try to remove again - should not throw
  removeDirectory(outputPath);
  assertEquals(existsSync(outputPath), false);
});

Deno.test("should not throw an error if the path has / at the end", () => {
  // Create and then remove with trailing slash
  createDirectory(outputPath);
  removeDirectory(outputPath + "/");
  assertEquals(existsSync(outputPath), false);
});

Deno.test("should remove folders recursively", () => {
  // Create nested folders
  createDirectory(outputPathRecursive);
  assertEquals(existsSync(outputPathRecursive), true);

  // Remove from the top level
  removeDirectory(outputPath);
  assertEquals(existsSync(outputPath), false);
  assertEquals(existsSync(outputPathRecursive), false);
});

Deno.test("should remove folders recursively even if the path contains hidden folders", () => {
  // Create hidden folder structure
  createDirectory(outputPathHidden);
  assertEquals(existsSync(outputPathHidden), true);

  // Remove it
  removeDirectory(outputPath);
  assertEquals(existsSync(outputPathHidden), false);
  assertEquals(existsSync(outputPath), false);
});

Deno.test("should not throw an error when trying to remove a non-existent file", () => {
  // This should not throw an error due to force: true
  removeDirectory("nonexistent.csv");
  // No assertion needed - just ensuring no error is thrown
});
