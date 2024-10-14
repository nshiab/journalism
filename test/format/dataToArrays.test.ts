import { assertEquals } from "jsr:@std/assert";
import dataToArrays from "../../src/format/dataToArrays.ts";

Deno.test("should return an object made of arrays", () => {
  const rawData = [
    { keyA: "a", keyB: 1 },
    { keyA: "b", keyB: 2 },
    { keyA: "c", keyB: 3 },
  ];
  const data = dataToArrays(rawData);

  assertEquals(data, {
    keyA: ["a", "b", "c"],
    keyB: [1, 2, 3],
  });
});
