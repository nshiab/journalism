// Based on https://observablehq.com/@fil/rewind

// @deno-types="npm:@types/d3-geo@3"
import { geoArea, geoContains, geoStream, geoTransform } from "npm:d3-geo@3";
// @deno-types="npm:@types/d3-geo@3"
import type { GeoPermissibleObjects } from "npm:d3-geo@3";

/**
 * Rewinds the winding order of the specified GeoJSON object to be clockwise.
 *
 * @param object The GeoJSON object to rewind.
 */
export default function rewind(
  object: GeoPermissibleObjects,
): GeoPermissibleObjects {
  const projection = geoRewindStream();
  const stream = projection.stream;
  let project;
  if (!stream) throw new Error("invalid projection");
  switch (object && object.type) {
    case "Feature":
      project = projectFeature;
      break;
    case "FeatureCollection":
      project = projectFeatureCollection;
      break;
    default:
      project = projectGeometry;
      break;
  }
  return project(object, stream);
}

function geoRewindStream() {
  let ring;
  // @ts-ignore To do
  let polygon;
  return geoTransform({
    polygonStart() {
      this.stream.polygonStart();
      polygon = [];
    },
    lineStart() {
      // @ts-ignore To do
      if (polygon) polygon.push(ring = []);
      else this.stream.lineStart();
    },
    lineEnd() {
      // @ts-ignore To do
      if (!polygon) this.stream.lineEnd();
    },
    point(x, y) {
      // @ts-ignore To do
      if (polygon) ring.push([x, y]);
      else this.stream.point(x, y);
    },
    polygonEnd() {
      // @ts-ignore To do
      for (const [i, ring] of polygon.entries()) {
        ring.push(ring[0].slice());
        if (
          i
            // a hole must contain the first point of the polygon
            ? !geoContains(
              { type: "Polygon", coordinates: [ring] },
              // @ts-ignore To do
              polygon[0][0],
            )
            // @ts-ignore To do
            : polygon[1]
            // the outer ring must contain the first point of its first hole (if any)
            ? !geoContains(
              { type: "Polygon", coordinates: [ring] },
              // @ts-ignore To do
              polygon[1][0],
            )
            // a single ring polygon must be smaller than a hemisphere (optional)
            : geoArea({ type: "Polygon", coordinates: [ring] }) >
              2 * Math.PI
        ) {
          ring.reverse();
        }

        this.stream.lineStart();
        ring.pop();
        for (const [x, y] of ring) this.stream.point(x, y);
        this.stream.lineEnd();
      }
      this.stream.polygonEnd();
      polygon = null;
    },
  });
}

// @ts-ignore To do
function projectFeatureCollection(o, stream) {
  // @ts-ignore To do
  return { ...o, features: o.features.map((f) => projectFeature(f, stream)) };
}

// @ts-ignore To do
function projectFeature(o, stream) {
  return { ...o, geometry: projectGeometry(o.geometry, stream) };
}

// @ts-ignore To do
function projectGeometryCollection(o, stream) {
  return {
    ...o,
    // @ts-ignore To do
    geometries: o.geometries.map((o) => projectGeometry(o, stream)),
  };
}

// @ts-ignore To do
function projectGeometry(o, stream) {
  return !o
    ? null
    : o.type === "GeometryCollection"
    ? projectGeometryCollection(o, stream)
    : o.type === "Polygon" || o.type === "MultiPolygon"
    ? projectPolygons(o, stream)
    : o;
}

// @ts-ignore To do
function projectPolygons(o, stream) {
  // @ts-ignore To do
  let coordinates = [];
  // @ts-ignore To do
  let polygon, line;
  geoStream(
    o,
    stream({
      polygonStart() {
        coordinates.push(polygon = []);
      },
      polygonEnd() {},
      lineStart() {
        polygon.push(line = []);
      },
      lineEnd() {
        // @ts-ignore To do
        line.push(line[0].slice());
      },
      // @ts-ignore To do
      point(x, y) {
        line.push([x, y]);
      },
    }),
  );
  // @ts-ignore To do
  if (o.type === "Polygon") coordinates = coordinates[0];
  return { ...o, coordinates };
}
