import { assertEquals } from "jsr:@std/assert";
import dateToCBCStyle from "../../../src/format/helpers/dateToCBCStyle.ts";

Deno.test("should replace AM by a.m.", () => {
  {
    const styledDate = dateToCBCStyle(
      "January 5, 2023, at 11:08 AM",
      false,
    );
    assertEquals(styledDate, "January 5, 2023, at 11:08 a.m.");
  }
});
Deno.test("should replace PM by p.m.", () => {
  {
    const styledDate = dateToCBCStyle(
      "January 5, 2023, at 11:08 PM",
      false,
    );
    assertEquals(styledDate, "January 5, 2023, at 11:08 p.m.");
  }
});
Deno.test("should remove :00", () => {
  {
    const styledDate = dateToCBCStyle(
      "January 5, 2023, at 1:00 PM",
      false,
    );
    assertEquals(styledDate, "January 5, 2023, at 1 p.m.");
  }
});
Deno.test("should replace the full month by an abbreviation", () => {
  {
    const styledDate = dateToCBCStyle(
      "January 5, 2023, at 11:08 PM",
      true,
    );
    assertEquals(styledDate, "Jan. 5, 2023, at 11:08 p.m.");
  }
});
