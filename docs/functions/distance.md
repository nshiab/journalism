[**Journalism v4.0.0**](../index.md)

***

[Journalism](../globals.md) / distance

# Function: distance()

> **distance**(`lon1`, `lat1`, `lon2`, `lat2`, `options?`): `number`

Calculates the Haversine distance between two geographical points (longitude and latitude) in kilometers. The Haversine formula is used to determine the great-circle distance between two points on a sphere given their longitudes and latitudes.

This function is useful for geospatial applications where accurate distance measurements over the Earth's surface are required,.

## Parameters

### lon1

`number`

The longitude of the first point.

### lat1

`number`

The latitude of the first point.

### lon2

`number`

The longitude of the second point.

### lat2

`number`

The latitude of the second point.

### options?

Optional settings for the distance calculation.

#### decimals?

`number`

The number of decimal places to round the result to. If not specified, the result will not be rounded.

## Returns

`number`

The distance between the two points in kilometers.

## Examples

```ts
// Basic usage: Calculate the distance between two cities.
// Montreal (-73.5673, 45.5017) and Toronto (-79.3832, 43.6532)
const dist = distance(-73.5673, 45.5017, -79.3832, 43.6532);
console.log(dist); // Approximately 504.3 km
```

```ts
// Rounding the result to a whole number.
const roundedDist = distance(-73.5673, 45.5017, -79.3832, 43.6532, { decimals: 0 });
console.log(roundedDist); // 504 km
```
