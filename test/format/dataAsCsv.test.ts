import { assertEquals } from "jsr:@std/assert";
import dataAsCsv from "../../src/format/dataAsCsv.ts";

Deno.test("should return a CSV string", () => {
  const data = [
    { firstName: "Graeme", lastName: "Bruce" },
    { firstName: "Nael", lastName: "Shiab" },
  ];
  const csv = dataAsCsv(data);

  assertEquals(
    csv,
    "firstName,lastName\nGraeme,Bruce\nNael,Shiab",
  );
});
