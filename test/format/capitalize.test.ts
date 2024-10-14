import { assertEquals } from "jsr:@std/assert";
import capitalize from "../../src/format/capitalize.ts";

Deno.test("should capitalize the first character of a string", () => {
  const string = capitalize("journalism");

  assertEquals(string, "Journalism");
});
