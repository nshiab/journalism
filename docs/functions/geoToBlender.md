[**Journalism v4.0.2**](../index.md)

***

[Journalism](../globals.md) / geoToBlender

# Function: geoToBlender()

> **geoToBlender**(`geojsonPath`, `projection`, `outputPath`, `options?`): `Promise`\<`string`\>

Converts GeoJSON borders into an OBJ file that can be imported in Blender.

Polygon rings, MultiPolygon rings, LineStrings, and MultiLineStrings are exported as OBJ line geometry.
Polygon and MultiPolygon rings are always closed into loops (a closing coordinate is appended when the source data omits it), while LineStrings and MultiLineStrings are left exactly as provided.
Flat projection functions are placed on Blender's X/Y plane with Z up and north toward positive Y.
The `"orthographic"` projection exports borders in 3D on a sphere using `geoTo3D`.
Set `maxSegmentLength` to add extra vertices along long orthographic segments.

When fitting a flat projection with `fitExtent`/`fitSize`, run the GeoJSON through `rewind` from `@nshiab/journalism-dataviz` first. Many data sources wind their polygons the wrong way for `d3-geo`, which makes the fit collapse to a near-zero scale and produces an empty-looking OBJ.

## Parameters

### geojsonPath

`string`

The path to the GeoJSON file to convert.

### projection

`"orthographic"` \| ((`coordinates`) => \[`number`, `number`\] \| `null`)

A flat projection function or `"orthographic"` for 3D globe borders.

### outputPath

`string`

The path where the OBJ file will be written.

### options?

Optional settings for orthographic radius, coordinate rounding, and orthographic segment densification.

#### decimals?

`number`

The number of decimal places to round OBJ coordinates to.

#### maxSegmentLength?

`number`

The maximum angular distance, in degrees, between generated vertices for `"orthographic"`.
By default, segments are not densified.

#### radius?

`number`

For `"orthographic"`, the radius of the sphere in Blender units.

**Default**

```ts
10
```

## Returns

`Promise`\<`string`\>

A Promise that resolves to the output path.

## Example

```ts
import { geoToBlender } from "@nshiab/journalism-geo";
import { rewind } from "@nshiab/journalism-dataviz";
import { geoConicConformal } from "d3-geo";
import { readFile } from "node:fs/promises";

const geojsonPath = "./data/canada.geojson";
const geojson = JSON.parse(await readFile(geojsonPath, "utf8"));
// Rewind so fitExtent measures the real extent instead of collapsing.
const domain = rewind(geojson);
const projection = geoConicConformal()
  .rotate([100, -60])
  .fitExtent([[-5, -5], [5, 5]], domain);
await geoToBlender(geojsonPath, projection, "./output/canada.obj", {
  decimals: 3,
});
```
