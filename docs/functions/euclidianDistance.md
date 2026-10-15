[**Journalism v4.0.0**](../index.md)

***

[Journalism](../globals.md) / euclidianDistance

# Function: euclidianDistance()

> **euclidianDistance**(`x1`, `y1`, `x2`, `y2`): `number`

Calculates the Euclidean distance between two points in a 2D Cartesian coordinate system. The Euclidean distance is the shortest straight-line distance between two points, often referred to as the "as the crow flies" distance.

This function applies the Pythagorean theorem to compute the distance.

## Parameters

### x1

`number`

The x-coordinate of the first point.

### y1

`number`

The y-coordinate of the first point.

### x2

`number`

The x-coordinate of the second point.

### y2

`number`

The y-coordinate of the second point.

## Returns

`number`

The Euclidean distance between the two points.

## Examples

```ts
// Basic usage: Calculate the distance between (0,0) and (3,4).
const dist1 = euclideanDistance(0, 0, 3, 4);
console.log(dist1); // 5
```

```ts
// Calculate the distance between two points with negative coordinates.
const dist2 = euclideanDistance(-1, -1, 2, 3);
console.log(dist2); // 5
```

```ts
// Distance between identical points should be zero.
const dist3 = euclideanDistance(5, 10, 5, 10);
console.log(dist3); // 0
```
