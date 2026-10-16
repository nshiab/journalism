[**Journalism v4.0.2**](../index.md)

***

[Journalism](../globals.md) / geoToBlenderPoint

# Function: geoToBlenderPoint()

## Call Signature

> **geoToBlenderPoint**(`lon`, `lat`, `projection`, `options?`): `object`

Converts one longitude/latitude coordinate into Blender coordinates.

Flat projection functions are placed on Blender's X/Y plane with Z up and north toward positive Y.
The `"orthographic"` projection exports the coordinate in 3D on a sphere using `geoTo3D`.

When fitting a flat projection with `fitExtent`/`fitSize`, run the GeoJSON through `rewind` from `@nshiab/journalism-dataviz` first. Many data sources wind their polygons the wrong way for `d3-geo`, which makes the fit collapse to a near-zero scale and places every point at nearly the same spot. Use the same fitted projection here as the one passed to `geoToBlender` so the point lines up with the borders.

### Parameters

#### lon

`number`

The longitude of the geographical point, in degrees.

#### lat

`number`

The latitude of the geographical point, in degrees.

#### projection

`"orthographic"` \| ((`coordinates`) => \[`number`, `number`\] \| `null`)

A flat projection function or `"orthographic"` for a 3D globe point.

#### options?

Optional settings for orthographic radius, coordinate rounding, and return shape.

##### decimals?

`number`

The number of decimal places to round coordinates to.

##### radius?

`number`

For `"orthographic"`, the radius of the sphere in Blender units.

**Default**

```ts
10
```

##### toArray?

`false`

If `true`, the function returns `[x, y, z]` instead of `{ x, y, z }`.

**Default**

```ts
false
```

### Returns

`object`

Blender coordinates.

#### x

> **x**: `number`

#### y

> **y**: `number`

#### z

> **z**: `number`

### Example

```ts
import { geoToBlenderPoint } from "@nshiab/journalism-geo";
import { rewind } from "@nshiab/journalism-dataviz";
import { geoConicConformal } from "d3-geo";
import { readFile } from "node:fs/promises";

const geojson = JSON.parse(await readFile("./data/canada.geojson", "utf8"));
// Rewind so fitExtent measures the real extent instead of collapsing.
const domain = rewind(geojson);
const projection = geoConicConformal()
  .rotate([100, -60])
  .fitExtent([[-5, -5], [5, 5]], domain);
const point = geoToBlenderPoint(-73.5674, 45.5019, projection, {
  decimals: 3,
});
```

## Call Signature

> **geoToBlenderPoint**(`lon`, `lat`, `projection`, `options`): \[`number`, `number`, `number`\]

Converts one longitude/latitude coordinate into Blender coordinates.

Flat projection functions are placed on Blender's X/Y plane with Z up and north toward positive Y.
The `"orthographic"` projection exports the coordinate in 3D on a sphere using `geoTo3D`.

### Parameters

#### lon

`number`

The longitude of the geographical point, in degrees.

#### lat

`number`

The latitude of the geographical point, in degrees.

#### projection

`"orthographic"` \| ((`coordinates`) => \[`number`, `number`\] \| `null`)

A flat projection function or `"orthographic"` for a 3D globe point.

#### options

Optional settings for orthographic radius, coordinate rounding, and return shape.

##### decimals?

`number`

The number of decimal places to round coordinates to.

##### radius?

`number`

For `"orthographic"`, the radius of the sphere in Blender units.

**Default**

```ts
10
```

##### toArray

`true`

If `true`, the function returns `[x, y, z]` instead of `{ x, y, z }`.

**Default**

```ts
false
```

### Returns

\[`number`, `number`, `number`\]

Blender coordinates.

### Example

```ts
import { geoToBlenderPoint } from "@nshiab/journalism-geo";

const point = geoToBlenderPoint(-73.5674, 45.5019, "orthographic", {
  radius: 10,
  decimals: 3,
  toArray: true,
});
```
