import { assertEquals } from "jsr:@std/assert";
import euclideanDistance from "../../src/statistics/euclidianDistance.ts";

Deno.test("should return 0 when both points are the same", () => {
  const distance = euclideanDistance(0, 0, 0, 0);
  assertEquals(distance, 0);
});

Deno.test("should return the correct distance for points on the x-axis", () => {
  const distance = euclideanDistance(0, 0, 3, 0);
  assertEquals(distance, 3);
});

Deno.test("should return the correct distance for points on the y-axis", () => {
  const distance = euclideanDistance(0, 0, 0, 4);
  assertEquals(distance, 4);
});

Deno.test("should return the correct distance for points in the first quadrant", () => {
  const distance = euclideanDistance(0, 0, 3, 4);
  assertEquals(distance, 5);
});

Deno.test("should return the correct distance for points in different quadrants", () => {
  const distance = euclideanDistance(-1, -1, 2, 3);
  assertEquals(distance, 5);
});
