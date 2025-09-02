import { assertEquals } from "jsr:@std/assert";
import getEnvironmentCanadaRecords from "../../src/weather/getEnvironmentCanadaRecords.ts";

Deno.test("should return the temperature records for the given locations without options", async () => {
  const records = await getEnvironmentCanadaRecords(
    [{
      lat: 45.52,
      lon: -73.65,
      name: "Montreal",
    }],
    "DAILY MAXIMUM TEMPERATURE",
    ["2023-07-01", "2023-07-01"],
  );
  // records[0].recordValue = 36.1;
  // records[0].recordYear = 2023;
  // records[0].previousRecordValue = 35.6;
  // records[0].previousRecordYear = 1955;
  assertEquals(records, [
    {
      lat: 45.52,
      lon: -73.65,
      name: "Montreal",
      recordMonth: 7,
      recordDay: 1,
      recordVariable: "DAILY MAXIMUM TEMPERATURE",
      recordValue: 36.1,
      recordYear: 1931,
      previousRecordValue: 33.9,
      previousRecordYear: 1913,
      recordStationName: "MONTRÉAL AREA",
      recordStationId: "VSQC147",
      recordStationLat: 45.52,
      recordStationLon: -73.65,
      recordStationDistance: 0,
      recordStationRecordBegin: "1871-07-01T00:00:00Z",
      recordStationRecordEnd: null,
    },
  ]);
});
Deno.test("should return the temperature records for the given locations with options", async () => {
  const records = await getEnvironmentCanadaRecords(
    [{
      lat: 45.52,
      lon: -73.65,
      name: "Montreal",
    }],
    "DAILY MAXIMUM TEMPERATURE",
    ["2023-07-01", "2023-07-01"],
    {
      delay: 250,
      verbose: true,
    },
  );
  // records[0].recordValue = 40;
  // records[0].recordYear = 2023;
  // records[0].previousRecordValue = 38.9;
  // records[0].previousRecordYear = 1921;
  assertEquals(records, [
    {
      lat: 45.52,
      lon: -73.65,
      name: "Montreal",
      recordMonth: 7,
      recordDay: 1,
      recordVariable: "DAILY MAXIMUM TEMPERATURE",
      recordValue: 36.1,
      recordYear: 1931,
      previousRecordValue: 33.9,
      previousRecordYear: 1913,
      recordStationName: "MONTRÉAL AREA",
      recordStationId: "VSQC147",
      recordStationLat: 45.52,
      recordStationLon: -73.65,
      recordStationDistance: 0,
      recordStationRecordBegin: "1871-07-01T00:00:00Z",
      recordStationRecordEnd: null,
    },
  ]);
});
Deno.test("should return the precipitation records for the given locations with options", async () => {
  const records = await getEnvironmentCanadaRecords(
    [{
      lat: 43.68,
      lon: -79.64,
      name: "Toronto",
    }],
    "DAILY TOTAL PRECIPITATION",
    ["2023-07-01", "2023-07-01"],
    {
      delay: 250,
      verbose: true,
    },
  );
  // records[0].recordValue = 33;
  // records[0].recordYear = 1956;
  // records[0].previousRecordValue = 30.2;
  // records[0].previousRecordYear = 1945;
  assertEquals(records, [
    {
      lat: 43.68,
      lon: -79.64,
      name: "Toronto",
      recordMonth: 7,
      recordDay: 1,
      recordVariable: "DAILY TOTAL PRECIPITATION",
      recordValue: 33,
      recordYear: 1956,
      previousRecordValue: 31.2,
      previousRecordYear: 1953,
      recordStationName: "MISSISSAUGA AREA",
      recordStationId: "VSON24V",
      recordStationLat: 43.59,
      recordStationLon: -79.66,
      recordStationDistance: 10,
      recordStationRecordBegin: "1937-11-01T00:00:00Z",
      recordStationRecordEnd: null,
    },
  ]);
});
Deno.test("should return the snow records for the given locations with options", async () => {
  const records = await getEnvironmentCanadaRecords(
    [{
      lat: 49.2,
      lon: -123.19,
      name: "Vancouver",
    }],
    "DAILY TOTAL SNOWFALL",
    ["2023-07-01", "2023-07-01"],
    {
      delay: 250,
      verbose: true,
    },
  );
  // records[0].recordValue = 0;
  // records[0].recordYear = 2025;
  // records[0].previousRecordValue = 0;
  // records[0].previousRecordYear = 2024;
  assertEquals(records, [
    {
      lat: 49.2,
      lon: -123.19,
      name: "Vancouver",
      recordMonth: 7,
      recordDay: 1,
      recordVariable: "DAILY TOTAL SNOWFALL",
      recordValue: 0,
      recordYear: 2025,
      previousRecordValue: 0,
      previousRecordYear: 2024,
      recordStationName: "RICHMOND AREA",
      recordStationId: "VSBC96V",
      recordStationLat: 49.16,
      recordStationLon: -123.16,
      recordStationDistance: 5,
      recordStationRecordBegin: "1896-02-01T00:00:00Z",
      recordStationRecordEnd: null,
    },
  ]);
});
Deno.test("should return the temperatre records for multiple locations and multiple dates", async () => {
  const records = await getEnvironmentCanadaRecords(
    [
      { lat: 45.52, lon: -73.65, name: "Montreal" },
      { lat: 43.68, lon: -79.64, name: "Toronto" },
      { lat: 49.2, lon: -123.19, name: "Vancouver" },
    ],
    "DAILY MAXIMUM TEMPERATURE",
    ["2023-07-01", "2023-07-3"],
    {
      delay: 250,
      verbose: true,
    },
  );
  console.table(records);
  assertEquals(records.length, 9);
});
