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
      subtitle: "Daily temperatures in 2000",
      caption: "Source: Environment Canada",
      color: { legend: true },
      marks: [line(data, { x: "time", y: "t", stroke: "city" })],
    }), `test/output/temperatures.png`);

  // How to assert
  assertEquals(true, true);
});
Deno.test("should save an Observable chart as png with style options", async () => {
  const data = JSON.parse(
    readFileSync("test/data/temperatures.json", "utf-8"),
  ).map((d: { time: string }) => ({ ...d, time: new Date(d.time) }));

  await saveChart(
    data,
    (data) =>
      plot({
        title: "Temperature in cities",
        subtitle: "Daily temperatures in 2000",
        caption: "Source: Environment Canada",
        color: { legend: true },
        x: { label: "Date" },
        grid: true,
        marks: [line(data, { x: "time", y: "t", stroke: "city" })],
      }),
    `test/output/temperatures-styled.png`,
    {
      style: `
  body {
    background-color: #121212; /* Very dark grey for the background */
    color: #E0E0E0; /* Soft light grey for text */
  }

  h2, h3 {
    color: #F0F0F0; /* Slightly brighter grey for headings */
  }

  svg text {
    fill: #B0B0B0; /* Medium grey for text within the SVG */
  }

  g[aria-label="y-axis tick"],
  g[aria-label="x-axis tick"] {
    stroke: #707070; /* Neutral grey for axis ticks */
  }

  g[aria-label="x-grid"] > line,
  g[aria-label="y-grid"] > line {
    stroke: #505050; /* Subtle grey for grid lines */
    stroke-opacity: 0.3;
  }`,
    },
  );

  // How to assert
  assertEquals(true, true);
});
Deno.test("should save an Observable chart as png with dark style", async () => {
  const data = JSON.parse(
    readFileSync("test/data/temperatures.json", "utf-8"),
  ).map((d: { time: string }) => ({ ...d, time: new Date(d.time) }));

  await saveChart(
    data,
    (data) =>
      plot({
        title: "Temperature in cities",
        subtitle: "Daily temperatures in 2000",
        caption: "Source: Environment Canada",
        color: { legend: true },
        x: { label: "Date" },
        grid: true,
        marks: [line(data, { x: "time", y: "t", stroke: "city" })],
      }),
    `test/output/temperatures-dark.png`,
    {
      dark: true,
    },
  );

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

Deno.test("should save an Observable chart as svg with facets", async () => {
  const data = JSON.parse(
    readFileSync("test/data/temperatures.json", "utf-8"),
  ).map((d: { time: string }) => ({ ...d, time: new Date(d.time) }));

  await saveChart(data, (data: Data) =>
    plot({
      title: "My chart",
      color: { legend: true, type: "diverging" },
      facet: { data: data, y: "city" },
      marginRight: 100,
      marks: [
        dot(data, { x: "time", y: "t", fill: "t", facet: "auto" }),
      ],
    }), `test/output/temperaturesFacet.svg`);

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
Deno.test("should save an Observable dark map as png", async () => {
  const data = rewind(JSON.parse(
    readFileSync("test/data/CanadianProvincesAndTerritories.json", "utf-8"),
  )) as unknown as Data;

  await saveChart(
    data,
    (data: Data) =>
      plot({
        projection: {
          type: "conic-conformal",
          rotate: [100, -60],
          domain: data,
        },
        marks: [
          geo(data, { stroke: "black", fill: "lightblue" }),
        ],
      }),
    `test/output/map-dark.png`,
    { dark: true },
  );

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
