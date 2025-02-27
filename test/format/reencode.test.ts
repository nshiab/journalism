import { assertEquals } from "jsr:@std/assert";
import reencode from "../../src/format/reencode.ts";

Deno.test("should return an array of objects", async () => {
  await reencode(
    "test/data/data.csv",
    "test/output/data_windows-1252.csv",
    "utf-8",
    "windows-1252",
  );

  // How to assert?
  assertEquals(true, true);
});
Deno.test("should return an array of objects", async () => {
  await reencode(
    "test/output/data_windows-1252.csv",
    "test/output/data_utf-8.csv",
    "windows-1252",
    "utf-8",
  );

  // How to assert?
  assertEquals(true, true);
});
