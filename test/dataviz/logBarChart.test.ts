import { assertEquals } from "jsr:@std/assert";
import logBarChart from "../../src/dataviz/logBarChart.ts";
import { readFileSync } from "node:fs";
import formatNumber from "../../src/format/formatNumber.ts";

Deno.test("should create a bar chart", () => {
  const data = JSON.parse(
    readFileSync("test/data/firesPerProvince.json", "utf-8"),
  );

  logBarChart(data, "nameEnglish", "burntArea");
  // How to assert
  assertEquals(true, true);
});
Deno.test("should create a bar chart with options", () => {
  const data = JSON.parse(
    readFileSync("test/data/firesPerProvince.json", "utf-8"),
  );

  logBarChart(data, "nameEnglish", "burntArea", {
    formatLabels: (d) => String(d).toUpperCase(),
    formatValues: (d) => formatNumber(d as number, { suffix: " ha" }),
    width: 10,
  });
  // How to assert
  assertEquals(true, true);
});
Deno.test("should create a bar chart (example from the doc)", () => {
  const data = [
    { category: "A", value: 10 },
    { category: "B", value: 20 },
  ];

  logBarChart(data, "category", "value");
  // How to assert
  assertEquals(true, true);
});
Deno.test("should create a bar chart with custom title and compact format", () => {
  const data = JSON.parse(
    readFileSync("test/data/firesPerProvince.json", "utf-8"),
  );

  logBarChart(data, "nameEnglish", "burntArea", {
    formatLabels: (d) => String(d).toUpperCase(),
    formatValues: (d) => formatNumber(d as number, { suffix: " ha" }),
    width: 10,
    title: "Burnt area per province",
    compact: true,
    totalLabel: "Total burnt area",
  });
  // How to assert
  assertEquals(true, true);
});
