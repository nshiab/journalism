import { assertEquals } from "jsr:@std/assert";
import dateToRCStyle from "../../../src/format/helpers/dateToRCStyle.ts";

Deno.test("should translate in French", () => {
  {
    const styledDate = dateToRCStyle("5 January 2023 à 11 h 08", false);
    assertEquals(styledDate, "5 janvier 2023 à 11 h 08");
  }
});
Deno.test("should translate in French with an abbreviation", () => {
  {
    const styledDate = dateToRCStyle("5 January 2023 à 11 h 08", true);
    assertEquals(styledDate, "5 janv. 2023 à 11 h 08");
  }
});
Deno.test("should remove ' h 00'", () => {
  {
    const styledDate = dateToRCStyle("5 January 2023 à 11 h 00", true);
    assertEquals(styledDate, "5 janv. 2023 à 11 h");
  }
});
