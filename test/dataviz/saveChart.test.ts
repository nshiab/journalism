import { assertEquals } from "jsr:@std/assert";
import { readFileSync } from "node:fs";
import saveChart from "../../src/dataviz/saveChart.ts";
import type { Data } from "@observablehq/plot";
import { dot, geo, line, plot } from "@observablehq/plot";
import rewind from "../../src/geo/rewind.ts";

Deno.test("should save an Observable chart as png", async () => {
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

Deno.test("should save an Observable chart as jpeg", async () => {
  const data = JSON.parse(
    readFileSync("test/data/temperatures.json", "utf-8"),
  ).map((d: { time: string }) => ({ ...d, time: new Date(d.time) }));

  await saveChart(data, (data) =>
    plot({
      title: "Temperature in cities",
      color: { legend: true },
      marks: [line(data, { x: "time", y: "t", stroke: "city" })],
    }), `test/output/temperatures.jpeg`);

  // How to assert
  assertEquals(true, true);
});

Deno.test("should save an Observable chart as svg", async () => {
  const data = JSON.parse(
    readFileSync("test/data/temperatures.json", "utf-8"),
  ).map((d: { time: string }) => ({ ...d, time: new Date(d.time) }));

  await saveChart(data, (data) =>
    plot({
      title: "Temperature in cities",
      color: { legend: true },
      marks: [line(data, { x: "time", y: "t", stroke: "city" })],
    }), `test/output/temperatures.svg`);

  // How to assert
  assertEquals(true, true);
});

Deno.test("should save an Observable map as png", async () => {
  const data = rewind(JSON.parse(
    readFileSync("test/data/CanadianProvincesAndTerritories.json", "utf-8"),
  )) as unknown as Data;

  await saveChart(data, (data: Data) =>
    plot({
      projection: {
        type: "conic-conformal",
        rotate: [100, -60],
        domain: data,
      },
      marks: [
        geo(data, { stroke: "black", fill: "lightblue" }),
      ],
    }), `test/output/map.png`);

  // How to assert
  assertEquals(true, true);
});

Deno.test("should save an Observable map as jpeg", async () => {
  const data = rewind(JSON.parse(
    readFileSync("test/data/CanadianProvincesAndTerritories.json", "utf-8"),
  )) as unknown as Data;

  await saveChart(data, (data: Data) =>
    plot({
      projection: {
        type: "conic-conformal",
        rotate: [100, -60],
        domain: data,
      },
      marks: [
        geo(data, { stroke: "black", fill: "lightblue" }),
      ],
    }), `test/output/map.jpeg`);

  // How to assert
  assertEquals(true, true);
});

Deno.test("should save an Observable map as svg", async () => {
  const data = rewind(JSON.parse(
    readFileSync("test/data/CanadianProvincesAndTerritories.json", "utf-8"),
  )) as unknown as Data;

  await saveChart(data, (data: Data) =>
    plot({
      projection: {
        type: "conic-conformal",
        rotate: [100, -60],
        domain: data,
      },
      marks: [
        geo(data, { stroke: "black", fill: "lightblue" }),
      ],
    }), `test/output/map.svg`);

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
