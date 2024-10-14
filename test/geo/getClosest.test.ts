import { assertEquals } from "jsr:@std/assert";
import getClosest from "../../src/geo/getClosest.ts";

type item = {
  name: string;
  lon: number;
  lat: number;
};

type itemDistance = {
  name: string;
  lon: number;
  lat: number;
  distance: number;
};

type itemDistanceProperties = {
  name: string;
  lon: number;
  lat: number;
  properties: {
    distance: number;
  };
};

const geoItems = [
  { name: "Montreal", lon: -73.66, lat: 45.51 },
  { name: "Toronto", lon: -79.43, lat: 43.66 },
];
const ottawa = { lon: -75.71, lat: 45.37 };

Deno.test("should return the closest city from Ottawa", () => {
  const closest = getClosest(
    ottawa.lon,
    ottawa.lat,
    geoItems,
    (d) => (d as item).lon,
    (d) => (d as item).lat,
  ) as item;
  assertEquals(closest, {
    name: "Montreal",
    lon: -73.66,
    lat: 45.51,
  });
});
Deno.test("should return the closest city from Ottawa with the distance in km in the returned object", () => {
  const closest = getClosest(
    ottawa.lon,
    ottawa.lat,
    geoItems,
    (d) => (d as item).lon,
    (d) => (d as item).lat,
    { addDistance: true },
  ) as itemDistance;
  assertEquals(closest, {
    name: "Montreal",
    lon: -73.66,
    lat: 45.51,
    distance: 160.6937083445315,
  });
});
Deno.test("should return the closest city from Ottawa with the rounded distance in km in the returned object", () => {
  const closest = getClosest(
    ottawa.lon,
    ottawa.lat,
    geoItems,
    (d) => (d as item).lon,
    (d) => (d as item).lat,
    { addDistance: true, decimals: 0 },
  ) as itemDistance;
  assertEquals(closest, {
    name: "Montreal",
    lon: -73.66,
    lat: 45.51,
    distance: 161,
  });
});
Deno.test("should return the closest city from Ottawa with the distance in km with 3 decimals in the returned object", () => {
  const closest = getClosest(
    ottawa.lon,
    ottawa.lat,
    geoItems,
    (d) => (d as item).lon,
    (d) => (d as item).lat,
    { addDistance: true, decimals: 3 },
  ) as itemDistance;
  assertEquals(closest, {
    name: "Montreal",
    lon: -73.66,
    lat: 45.51,
    distance: 160.694,
  });
});
Deno.test("should return the closest city from Ottawa with the distance in km with 3 decimals in the properties key.", () => {
  const geoItemsWithProperties = [
    { name: "Montreal", lon: -73.66, lat: 45.51, properties: {} },
    { name: "Toronto", lon: -79.43, lat: 43.66, properties: {} },
  ];

  const closest = getClosest(
    ottawa.lon,
    ottawa.lat,
    geoItemsWithProperties,
    (d) => (d as item).lon,
    (d) => (d as item).lat,
    { addDistance: true, decimals: 3 },
  ) as itemDistanceProperties;
  assertEquals(closest, {
    name: "Montreal",
    lon: -73.66,
    lat: 45.51,
    properties: { distance: 160.694 },
  });
});
