[**Journalism v4.0.3**](../index.md)

***

[Journalism](../globals.md) / getGeoTiffValues

# Function: getGeoTiffValues()

> **getGeoTiffValues**(`lat`, `lon`, `geoTiffDetails`): `Promise`\<`Uint8Array`\<`ArrayBufferLike`\> \| `Uint16Array`\<`ArrayBufferLike`\> \| `Uint32Array`\<`ArrayBufferLike`\> \| `Int8Array`\<`ArrayBufferLike`\> \| `Int16Array`\<`ArrayBufferLike`\> \| `Int32Array`\<`ArrayBufferLike`\> \| `Float32Array`\<`ArrayBufferLike`\> \| `Float64Array`\<`ArrayBufferLike`\>\>

Defined in: [journalism-geo/src/geo/getGeoTiffValues.ts:31](https://github.com/nshiab/journalism-geo/blob/v1.0.26/src/geo/getGeoTiffValues.ts#L31)

Extracts values at specific latitude and longitude coordinates from a GeoTIFF image. This function works in conjunction with the `getGeoTiffDetails` function, using the details returned by it.

## Parameters

### lat

`number`

The latitude coordinate for which to extract the value.

### lon

`number`

The longitude coordinate for which to extract the value.

### geoTiffDetails

An object containing the GeoTIFF image details, typically obtained from `getGeoTiffDetails`.

#### bbox

`number`[]

#### bboxHeight

`number`

#### bboxWidth

`number`

#### image

`unknown`

#### pixelHeight

`number`

#### pixelWidth

`number`

## Returns

`Promise`\<`Uint8Array`\<`ArrayBufferLike`\> \| `Uint16Array`\<`ArrayBufferLike`\> \| `Uint32Array`\<`ArrayBufferLike`\> \| `Int8Array`\<`ArrayBufferLike`\> \| `Int16Array`\<`ArrayBufferLike`\> \| `Int32Array`\<`ArrayBufferLike`\> \| `Float32Array`\<`ArrayBufferLike`\> \| `Float64Array`\<`ArrayBufferLike`\>\>

A Promise that resolves to the pixel value at the specified coordinates, or a `TypedArray` if multiple bands are present.

## Example

```ts
// Basic usage

const geoTiffDetails = await getGeoTiffDetails("./some-file.tif")
const value = await getGeoTiffValues(45.50, -73.57, geoTiffDetails)
console.log(value) // 255
```

## Throws

If the coordinates are outside the GeoTIFF's bounding box or if there's an issue reading the raster data.
