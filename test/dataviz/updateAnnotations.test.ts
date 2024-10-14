import "@std/dotenv/load";
import { assertEquals } from "jsr:@std/assert";
import updateAnnotationsDW from "../../src/dataviz/updateAnnotationsDW.ts";

const apiKey = Deno.env.get("DATAWRAPPER_KEY");
if (typeof apiKey === "string" && apiKey !== "") {
  Deno.test("should update annotations in a chart", async () => {
    await updateAnnotationsDW("Ga9oq", [
      {
        x: "2024/08/30 01:52",
        y: "14496235",
        text: "This is an annotation!",
      },
      {
        x: "2024/06/29",
        y: "15035128",
        dy: 50,
        text: "This is also some text, but with an arrow!",
        connectorLine: {
          enabled: true,
          type: "straight",
          arrowHead: "lines",
        },
        mobileFallback: false,
      },
    ]);

    // Just making sure it doesn't crash for now.
    assertEquals(true, true);
  });
} else {
  console.log("No DATAWRAPPER_KEY in process.env");
}
const differentApiKey = Deno.env.get("DW_KEY");
if (typeof differentApiKey === "string" && differentApiKey !== "") {
  Deno.test("should update annotations in a chart with a specific API key", async () => {
    await updateAnnotationsDW(
      "Ga9oq",
      [
        {
          x: "2024/08/30 01:52",
          y: "14496235",
          text: "This is an annotation!",
        },
        {
          x: "2024/06/29",
          y: "15035128",
          dy: 50,
          text: "This is also some text, but with an arrow!",
          connectorLine: {
            enabled: true,
            type: "straight",
            arrowHead: "lines",
          },
          mobileFallback: false,
        },
      ],
      { apiKey: "DW_KEY" },
    );

    // Just making sure it doesn't crash for now.
    assertEquals(true, true);
  });
} else {
  console.log("No DW_KEY in process.env");
}
