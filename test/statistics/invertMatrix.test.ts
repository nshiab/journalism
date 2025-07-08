import { assertEquals } from "jsr:@std/assert";
import invertMatrix from "../../src/statistics/invertMatrix.ts";

Deno.test("should invert a 2x2 matrix", () => {
  const matrix2x2 = [
    [4, 7],
    [2, 6],
  ];
  const inverted2x2 = invertMatrix(matrix2x2);
  assertEquals(inverted2x2, [
    [0.6, -0.7],
    [-0.2, 0.4],
  ]);
});

Deno.test("should invert a 3x3 matrix", () => {
  const matrix3x3 = [
    [1, 2, 3],
    [0, 1, 4],
    [5, 6, 0],
  ];
  const inverted3x3 = invertMatrix(matrix3x3);
  assertEquals(inverted3x3, [
    [-24.000000000000085, 18.000000000000064, 5.000000000000018],
    [20.00000000000007, -15.000000000000053, -4.000000000000014],
    [-5.000000000000018, 4.000000000000013, 1.0000000000000036],
  ]);
});

Deno.test("should throw an error for a singular matrix", () => {
  const singularMatrix = [
    [1, 2],
    [2, 4],
  ];
  let error: Error | null = null;
  try {
    invertMatrix(singularMatrix);
  } catch (e) {
    error = e as Error;
  }
  assertEquals(error instanceof Error, true);
  assertEquals(error?.message, "Matrix is singular and cannot be inverted");
});
