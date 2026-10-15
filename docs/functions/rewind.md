[**Journalism v3.1.2**](../index.md)

***

[Journalism](../globals.md) / rewind

# Function: rewind()

> **rewind**\<`T`\>(`object`): `T`

Rewinds the winding order of the specified GeoJSON object to be clockwise. It is based on the D3-geo library's winding order conventions.

## Type Parameters

### T

`T`

## Parameters

### object

`T`

A GeoJSON geometry, feature, feature collection, or null.

## Returns

`T`

A rewound copy; non-polygon geometries are returned unchanged. Polygon coordinates are two-dimensional.

## Examples

```ts
// Rewind a FeatureCollection.
const featureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: [[[-10, -10], [-10, 10], [10, 10], [10, -10], [-10, -10]]]
      }
    }
  ]
};
const rewoundFeatureCollection = rewind(featureCollection);
```

```ts
// Rewind a GeoJSON Feature containing a Polygon geometry.
const feature = {
  type: "Feature",
  properties: { name: "Example Area" },
  geometry: {
    type: "Polygon",
    coordinates: [[[-5, -5], [-5, 5], [5, 5], [5, -5], [-5, -5]]]
  }
};
const rewoundFeature = rewind(feature);
console.log(rewoundFeature);
```
