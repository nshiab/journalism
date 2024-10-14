import { assertEquals } from "jsr:@std/assert";
import distance from "../../src/geo/distance.ts";

Deno.test("should return the distance in kilometers between Montreal and Toronto", () => {
  const coords = distance(-73.66, 45.51, -79.43, 43.66);
  assertEquals(coords, 500.9620073074585);
});
Deno.test("should return the distance in kilometers between Montreal and Toronto with 3 decimals", () => {
  const coords = distance(-73.66, 45.51, -79.43, 43.66, { decimals: 3 });
  assertEquals(coords, 500.962);
});
Deno.test("should return the distance in kilometers between Montreal and Toronto with no decimals", () => {
  const coords = distance(-73.66, 45.51, -79.43, 43.66, { decimals: 0 });
  assertEquals(coords, 501);
});
