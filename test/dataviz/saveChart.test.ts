import { assertEquals } from "jsr:@std/assert";
import { readFileSync } from "node:fs";
import saveChart from "../../src/dataviz/saveChart.ts";
import type { Data } from "@observablehq/plot";
import { dot, line, plot } from "@observablehq/plot";

Deno.test("should save an Observable chart", async () => {
  const data = JSON.parse(
    readFileSync("test/data/temperatures.json", "utf-8"),
  ).map((d: { time: string }) => ({ ...d, time: new Date(d.time) }));

  await saveChart(data, (data) =>
    plot({
      title: "Temperature in cities",
      color: { legend: true },
      marks: [line(data, { x: "time", y: "t", stroke: "city" })],
    }), `test/output/temperatures.png`);

  // How to assert
  assertEquals(true, true);
});

Deno.test("shoud save an Observable chart (example from the docs)", async () => {
  const data = [{ year: 2024, value: 10 }, { year: 2025, value: 15 }];

  const chart = (data: Data) =>
    plot({
      marks: [
        dot(data, { x: "year", y: "value" }),
      ],
    });

  const path = "test/output/chart.png";

  await saveChart(data, chart, path);

  // How to assert
  assertEquals(true, true);
});
