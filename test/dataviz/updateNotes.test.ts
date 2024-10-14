import "@std/dotenv/load";
import { assertEquals } from "jsr:@std/assert";
import updateNotesDW from "../../src/dataviz/updateNotesDW.ts";
import formatDate from "../../src/format/formatDate.ts";

const apiKey = Deno.env.get("DATAWRAPPER_KEY");
if (typeof apiKey === "string" && apiKey !== "") {
  Deno.test("should update the note in a chart", async () => {
    const dateString = formatDate(
      new Date(),
      "Month DD, YYYY, at HH:MM period",
      { abbreviations: true },
    );
    const note = `This chart was last updated on ${dateString}`;

    await updateNotesDW("ntURh", note);

    // Just making sure it doesn't crash for now.
    assertEquals(true, true);
  });
} else {
  console.log("No DATAWRAPPER_KEY in process.env");
}
const differentApiKey = Deno.env.get("DW_KEY");
if (typeof differentApiKey === "string" && differentApiKey !== "") {
  Deno.test("should update the note in a chart with a specific API key", async () => {
    const dateString = formatDate(
      new Date(),
      "Month DD, YYYY, at HH:MM period",
      { abbreviations: true },
    );
    const note = `This chart was last updated on ${dateString}`;

    await updateNotesDW("ntURh", note, { apiKey: "DW_KEY" });

    // Just making sure it doesn't crash for now.
    assertEquals(true, true);
  });
} else {
  console.log("No DW_KEY in process.env");
}
