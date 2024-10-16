import "@std/dotenv/load";
import { assertEquals } from "jsr:@std/assert";
import updateDataDW from "../../src/dataviz/updateDataDW.ts";
import dataAsCsv from "../../src/format/dataAsCsv.ts";

const apiKey = Deno.env.get("DATAWRAPPER_KEY");
if (typeof apiKey === "string" && apiKey !== "") {
  Deno.test("should update data in a chart", async () => {
    const data = [{ salary: 75000, hireDate: new Date("2022-12-15") }];
    const dataCSV = dataAsCsv(data);

    await updateDataDW("ntURh", dataCSV);

    // Just making sure it doesn't crash for now.
    assertEquals(true, true);
  });

  Deno.test("should update data in a map", async () => {
    const data = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            coordinates: [
              [
                [11.127454320325711, 20.34856592751224],
                [11.127454320325711, -13.781306861158996],
                [55.68071875381875, -13.781306861158996],
                [55.68071875381875, 20.34856592751224],
                [11.127454320325711, 20.34856592751224],
              ],
            ],
            type: "Polygon",
          },
        },
      ],
    };

    await updateDataDW("lDO6F", JSON.stringify(data));

    // Just making sure it doesn't crash for now.
    assertEquals(true, true);
  });
} else {
  console.log("No DATAWRAPPER_KEY in process.env");
}
const differentApiKey = Deno.env.get("DW_KEY");
if (typeof differentApiKey === "string" && differentApiKey !== "") {
  Deno.test("should update data in a chart with a specific API key", async () => {
    const data = [{ salary: 75000, hireDate: new Date("2022-12-15") }];
    const dataCSV = dataAsCsv(data);

    await updateDataDW("ntURh", dataCSV, { apiKey: "DW_KEY" });

    // Just making sure it doesn't crash for now.
    assertEquals(true, true);
  });
} else {
  console.log("No DW_KEY in process.env");
}
