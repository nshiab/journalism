import { assertEquals } from "jsr:@std/assert";
import camelCase from "../../src/format/camelCase.ts";

Deno.test("should format a string to camel case", () => {
  const string = camelCase("Journalism  _ % IS**@ aWeSoMe.");

  assertEquals(string, "journalismIsAwesome");
});

Deno.test("should handle a simple string", () => {
  const string = camelCase("hello world");
  assertEquals(string, "helloWorld");
});

Deno.test("should handle punctuation and mixed case", () => {
  const string = camelCase("  --Some@Thing is- happening--  ");
  assertEquals(string, "someThingIsHappening");
});

Deno.test("should handle a single word", () => {
  const string = camelCase("Journalism");
  assertEquals(string, "journalism");
});
