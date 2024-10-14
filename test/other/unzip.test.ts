// import assert from "assert"
import unzip from "../../src/other/unzip.ts";
import { copyFileSync, existsSync, mkdirSync } from "node:fs";

const outputPath = "./test/output/";
if (!existsSync(outputPath)) {
  mkdirSync(outputPath);
}

Deno.test("should unzip and put files in a folder", () => {
  unzip("test/data/test.zip", "test/output");
  // How to assert?
});
Deno.test("should unzip, put files in a folder and remove original file", () => {
  copyFileSync("test/data/test.zip", "test/data/testCopy.zip");
  unzip("test/data/testCopy.zip", "test/output", {
    deleteZippedFile: true,
  });
  // How to assert?
});
