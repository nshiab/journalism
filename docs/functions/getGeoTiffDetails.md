[**Journalism v4.0.1**](../index.md)

***

[Journalism](../globals.md) / getGeoTiffDetails

# Function: getGeoTiffDetails()

> **getGeoTiffDetails**(`path`): `Promise`\<\{ `bbox`: `number`[]; `bboxHeight`: `number`; `bboxWidth`: `number`; `image`: `GeoTIFFImage`; `pixelHeight`: `number`; `pixelWidth`: `number`; \}\>

Extracts detailed information from a GeoTIFF file, which can then be used with the `getGeoTiffValues` function.

## Parameters

### path

`string`

The absolute path to the GeoTIFF file.

## Returns

`Promise`\<\{ `bbox`: `number`[]; `bboxHeight`: `number`; `bboxWidth`: `number`; `image`: `GeoTIFFImage`; `pixelHeight`: `number`; `pixelWidth`: `number`; \}\>

A Promise that resolves to an object containing the GeoTIFF image, bounding box, pixel dimensions, and bounding box dimensions.

## Examples

```ts
// Basic usage
const geoTiffDetails = await getGeoTiffDetails("./some-file.tif")
console.log(geoTiffDetails.bbox) // [ -73.8, 45.4, -73.5, 45.6 ]
```

```ts
// Using the output with `getGeoTiffValues`

const geoTiffDetails = await getGeoTiffDetails("./some-file.tif")
const value = await getGeoTiffValues(45.50, -73.57, geoTiffDetails)
console.log(value) // 255
```
