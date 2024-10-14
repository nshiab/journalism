import { assertEquals, assertThrows } from "jsr:@std/assert";
import round from "../../src/format/round.ts";

Deno.test("should keep an integer as integer", () => {
  const rounded = round(1);
  assertEquals(rounded, 1);
});
Deno.test("should round 1.2 to 1", () => {
  const rounded = round(1.2);
  assertEquals(rounded, 1);
});
Deno.test("should round 1.5 to 2", () => {
  const rounded = round(1.5);
  assertEquals(rounded, 2);
});
Deno.test("should round 1.8 to 2", () => {
  const rounded = round(1.8);
  assertEquals(rounded, 2);
});
Deno.test("should round 1.1234567 to 1.1", () => {
  const rounded = round(1.1234567, { decimals: 1 });
  assertEquals(rounded, 1.1);
});
Deno.test("should round 1.1234567 to 1.12346", () => {
  const rounded = round(1.1234567, { decimals: 5 });
  assertEquals(rounded, 1.12346);
});
Deno.test("should round 12345 to the closest 10", () => {
  const rounded = round(12345, { nearestInteger: 10 });
  assertEquals(rounded, 12350);
});
Deno.test("should round 12345 to the closest 100", () => {
  const rounded = round(12345, { nearestInteger: 100 });
  assertEquals(rounded, 12300);
});
Deno.test("should round 12345 with 1 significant digit", () => {
  const rounded = round(12345, { significantDigits: 1 });
  assertEquals(rounded, 10000);
});
Deno.test("should round 15000 with 1 significant digit", () => {
  const rounded = round(15000, { significantDigits: 1 });
  assertEquals(rounded, 20000);
});
Deno.test("should round 0.012345 with 2 significant digit", () => {
  const rounded = round(0.012345, { significantDigits: 2 });
  assertEquals(rounded, 0.012);
});
Deno.test("should round 0.0378 with 2 significant digit", () => {
  const rounded = round(0.038, { significantDigits: 2 });
  assertEquals(rounded, 0.038);
});
Deno.test("should round -12345 with 1 significant digit", () => {
  const rounded = round(-12345, { significantDigits: 1 });
  assertEquals(rounded, -10000);
});
Deno.test("should round -15000 with 1 significant digit", () => {
  const rounded = round(-15000, { significantDigits: 1 });
  assertEquals(rounded, -20000);
});
Deno.test("should round -0.012345 with 2 significant digit", () => {
  const rounded = round(-0.012345, { significantDigits: 2 });
  assertEquals(rounded, -0.012);
});
Deno.test("should round -0.0378 with 2 significant digit", () => {
  const rounded = round(-0.038, { significantDigits: 2 });
  assertEquals(rounded, -0.038);
});
Deno.test("should throw an error if the passed value is not a number", () => {
  // @ts-expect-error we test for the error
  assertThrows(() => round("a"));
});
Deno.test("should return NaN when the passed value is not a number and try is set to true", () => {
  // @ts-expect-error we test for try true
  const rounded = round("a", { try: true });
  assertEquals(rounded, NaN);
});
