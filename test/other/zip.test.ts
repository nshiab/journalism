// import assert from "assert"
import zip from "../../src/other/zip.ts";

Deno.test("should zip multiple files together", () => {
  zip(
    ["test/data/data.csv", "test/data/data.json"],
    "test/output/data.zip",
  );
  // How to assert?
});
Deno.test("should zip an entire folder together", () => {
  zip("test/data/", "test/output/dataFolder.zip");
  // How to assert?
});
Deno.test("should zip an entire folder together and create the path if it doesn't exist", () => {
  zip("test/data/", "test/output/zipFolder/dataFolder.zip");
  // How to assert?
});
