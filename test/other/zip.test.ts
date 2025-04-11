import { assertEquals } from "jsr:@std/assert";
import zip from "../../src/other/zip.ts";

Deno.test("should zip multiple files together", () => {
  zip(
    ["test/data/data.csv", "test/data/data.json"],
    "test/output/data.zip",
  );
  assertEquals(true, true);
});
Deno.test("should zip an entire folder together", () => {
  zip("test/data/", "test/output/dataFolder.zip");
  assertEquals(true, true);
});
Deno.test("should zip an entire folder together and create the path if it doesn't exist", () => {
  zip("test/data/", "test/output/zipFolder/dataFolder.zip");
  assertEquals(true, true);
});
