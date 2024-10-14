import { assertEquals } from "jsr:@std/assert";
import camelCase from "../../src/format/camelCase.ts";

Deno.test("should format a string to camel case", () => {
  const string = camelCase("Journalism  _ % IS**@ aWeSoMe.");

  assertEquals(string, "journalismIsAwesome");
});
