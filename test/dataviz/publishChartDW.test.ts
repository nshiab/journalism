import "@std/dotenv/load";
import { assertEquals } from "jsr:@std/assert";
import publishChartDW from "../../src/dataviz/publishChartDW.ts";

const apiKey = Deno.env.get("DATAWRAPPER_KEY");
if (typeof apiKey === "string" && apiKey !== "") {
  Deno.test("should publish a chart", async () => {
    await publishChartDW("ntURh");

    // Just making sure it doesn't crash for now.
    assertEquals(true, true);
  });
} else {
  console.log("No DATAWRAPPER_KEY in process.env");
}
const differentApiKey = Deno.env.get("DW_KEY");
if (typeof differentApiKey === "string" && differentApiKey !== "") {
  Deno.test("should publish a chart with a specific API key", async () => {
    await publishChartDW("ntURh", { apiKey: "DW_KEY" });

    // Just making sure it doesn't crash for now.
    assertEquals(true, true);
  });
} else {
  console.log("No DW_KEY in process.env");
}
