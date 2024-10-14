import { assertEquals } from "jsr:@std/assert";
import arraysToData from "../../src/format/arraysToData.ts";

Deno.test("should return an array of objects", () => {
  const rawData = {
    keyA: ["a", "b", "c"],
    keyB: [1, 2, 3],
  };
  const data = arraysToData(rawData);

  assertEquals(data, [
    { keyA: "a", keyB: 1 },
    { keyA: "b", keyB: 2 },
    { keyA: "c", keyB: 3 },
  ]);
});
