import { assertEquals } from "jsr:@std/assert";
import logLineChart from "../../src/dataviz/logLineChart.ts";
import { readFileSync } from "node:fs";
import formatDate from "../../src/format/formatDate.ts";
import formatNumber from "../../src/format/formatNumber.ts";
import { csvParse } from "d3-dsv";

Deno.test("should create a line chart", () => {
  const data = JSON.parse(
    readFileSync("test/data/temperatures.json", "utf-8"),
  )
    .map((d: { time: string; t: number }) => ({
      ...d,
      time: new Date(d.time),
      t: d.t * 1000,
    }))
    .filter((d: { city: string }) => d.city === "Montreal");

  logLineChart(data, "time", "t");
  // How to assert
  assertEquals(true, true);
});
Deno.test("should create a line chart with formatting options", () => {
  const data = JSON.parse(
    readFileSync("test/data/temperatures.json", "utf-8"),
  )
    .map((d: { time: string }) => ({ ...d, time: new Date(d.time) }))
    .filter((d: { city: string }) => d.city === "Montreal");

  logLineChart(data, "time", "t", {
    formatX: (d) => formatDate(d as Date, "Month DD", { utc: true }),
    formatY: (d) => formatNumber(d as number, { decimals: 0, suffix: "°C" }),
  });
  // How to assert
  assertEquals(true, true);
});
Deno.test("should create a line chart with categories", () => {
  const data = JSON.parse(
    readFileSync("test/data/temperatures.json", "utf-8"),
  ).map((d: { time: string }) => ({ ...d, time: new Date(d.time) }));

  logLineChart(data, "time", "t", {
    smallMultiples: "city",
    smallMultiplesPerRow: 2,
    width: 50,
    height: 10,
    formatX: (d) => formatDate(d as Date, "YYYY-MM-DD", { utc: true }),
    formatY: (d) => formatNumber(d as number, { decimals: 0 }),
  });

  // How to assert
  assertEquals(true, true);
});
Deno.test("should create a line chart with categories and a fixed scale", () => {
  const data = JSON.parse(
    readFileSync("test/data/temperatures.json", "utf-8"),
  ).map((d: { time: string }) => ({ ...d, time: new Date(d.time) }));

  logLineChart(data, "time", "t", {
    smallMultiples: "city",
    smallMultiplesPerRow: 2,
    width: 50,
    height: 10,
    fixedScales: true,
    formatX: (d) => formatDate(d as Date, "YYYY-MM-DD", { utc: true }),
    formatY: (d) => formatNumber(d as number, { decimals: 0 }),
  });

  // How to assert
  assertEquals(true, true);
});
Deno.test("should create a line chart with few points (example from the docs)", () => {
  const data = [
    { date: new Date("2023-01-01"), value: 10 },
    { date: new Date("2023-02-01"), value: 20 },
    { date: new Date("2023-03-01"), value: 30 },
    { date: new Date("2023-04-01"), value: 40 },
  ];

  logLineChart(data, "date", "value", {
    formatX: (d) => (d as Date).toISOString().slice(0, 10),
  });

  // How to assert
  assertEquals(true, true);
});
Deno.test("should create a line chart with few points and small multiples (example from the docs)", () => {
  const data = [
    { date: new Date("2023-01-01"), value: 10, category: "A" },
    { date: new Date("2023-02-01"), value: 20, category: "A" },
    { date: new Date("2023-03-01"), value: 30, category: "A" },
    { date: new Date("2023-04-01"), value: 40, category: "A" },
    { date: new Date("2023-01-01"), value: 15, category: "B" },
    { date: new Date("2023-02-01"), value: 25, category: "B" },
    { date: new Date("2023-03-01"), value: 35, category: "B" },
    { date: new Date("2023-04-01"), value: 45, category: "B" },
  ];

  logLineChart(data, "date", "value", {
    formatX: (d) => (d as Date).toISOString().slice(0, 10),
    smallMultiples: "category",
  });

  // How to assert
  assertEquals(true, true);
});
Deno.test("should create another line chart from strings", () => {
  const data = csvParse(
    readFileSync("test/data/aircraftByEvents.csv", "utf-8"),
  ).map((d: { [key: string]: string }) => ({
    ...d,
    count: parseInt(d.count),
    occurenceYear: parseInt(d.occurenceYear),
  }));

  logLineChart(data, "occurenceYear", "count", {
    smallMultiples: "aircraftEvent",
  });

  // How to assert
  assertEquals(true, true);
});
