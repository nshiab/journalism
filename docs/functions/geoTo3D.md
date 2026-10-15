[**Journalism v4.0.0**](../index.md)

***

[Journalism](../globals.md) / geoTo3D

# Function: geoTo3D()

## Call Signature

> **geoTo3D**(`lon`, `lat`, `radius`, `options`): \[`number`, `number`, `number`\]

Converts geographical coordinates (longitude and latitude) into 3D Cartesian (x, y, z) coordinates based on a specified radius.

The conversion assumes a spherical Earth model. The `radius` parameter determines the size of the sphere on which the points are projected.

### Parameters

#### lon

`number`

The longitude of the geographical point, in degrees.

#### lat

`number`

The latitude of the geographical point, in degrees.

#### radius

`number`

The radius of the sphere on which to project the coordinates.

#### options

Optional settings for the conversion.

##### decimals?

`number`

The number of decimal places to round the x, y, and z coordinates to. If not specified, no rounding is applied.

##### toArray

`true`

If `true`, the function will return the coordinates as an array `[x, y, z]` instead of an object `{ x, y, z }`. Defaults to `false`.

### Returns

\[`number`, `number`, `number`\]

An object `{ x, y, z }` or an array `[x, y, z]` representing the 3D Cartesian coordinates.

### Examples

```ts
// Basic usage: Convert geographical coordinates to 3D object coordinates.
// Longitude: -73.5674 (Montreal), Latitude: 45.5019 (Montreal), Radius: 1
const coordsObject = geoTo3D(-73.5674, 45.5019, 1, { decimals: 2 });
console.log(coordsObject); // Expected output: { x: -0.67, y: 0.71, z: 0.2 }
```

```ts
// Convert geographical coordinates to 3D array coordinates.
const coordsArray = geoTo3D(-73.5674, 45.5019, 1, { decimals: 2, toArray: true });
console.log(coordsArray); // Expected output: [-0.67, 0.71, 0.2]
```

```ts
// Using a larger radius for visualization purposes.
const earthCoords = geoTo3D(0, 0, 6371, { decimals: 0 }); // Earth's approximate radius in km
console.log(earthCoords); // Expected output: { x: 0, y: 6371, z: 0 } (for 0,0 lat/lon)
```

## Call Signature

> **geoTo3D**(`lon`, `lat`, `radius`, `options?`): `object`

Converts geographical coordinates (longitude and latitude) into 3D Cartesian (x, y, z) coordinates based on a specified radius.

The conversion assumes a spherical Earth model. The `radius` parameter determines the size of the sphere on which the points are projected.

### Parameters

#### lon

`number`

The longitude of the geographical point, in degrees.

#### lat

`number`

The latitude of the geographical point, in degrees.

#### radius

`number`

The radius of the sphere on which to project the coordinates.

#### options?

Optional settings for the conversion.

##### decimals?

`number`

The number of decimal places to round the x, y, and z coordinates to. If not specified, no rounding is applied.

##### toArray?

`false`

If `true`, the function will return the coordinates as an array `[x, y, z]` instead of an object `{ x, y, z }`. Defaults to `false`.

### Returns

`object`

An object `{ x, y, z }` or an array `[x, y, z]` representing the 3D Cartesian coordinates.

#### x

> **x**: `number`

#### y

> **y**: `number`

#### z

> **z**: `number`

### Examples

```ts
// Basic usage: Convert geographical coordinates to 3D object coordinates.
// Longitude: -73.5674 (Montreal), Latitude: 45.5019 (Montreal), Radius: 1
const coordsObject = geoTo3D(-73.5674, 45.5019, 1, { decimals: 2 });
console.log(coordsObject); // Expected output: { x: -0.67, y: 0.71, z: 0.2 }
```

```ts
// Convert geographical coordinates to 3D array coordinates.
const coordsArray = geoTo3D(-73.5674, 45.5019, 1, { decimals: 2, toArray: true });
console.log(coordsArray); // Expected output: [-0.67, 0.71, 0.2]
```

```ts
// Using a larger radius for visualization purposes.
const earthCoords = geoTo3D(0, 0, 6371, { decimals: 0 }); // Earth's approximate radius in km
console.log(earthCoords); // Expected output: { x: 0, y: 6371, z: 0 } (for 0,0 lat/lon)
```
