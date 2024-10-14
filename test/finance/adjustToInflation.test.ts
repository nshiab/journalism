import { assertEquals } from "jsr:@std/assert";
import adjustToInflation from "../../src/finance/adjustToInflation.ts";

// Using this as a reference https://www.bankofcanada.ca/rates/related/inflation-calculator/

Deno.test("should return 100$ in April 1914 adjusted to April 2023 inflation", () => {
  const adjustedAmount = adjustToInflation(100, 6.0, 156.4);
  assertEquals(adjustedAmount, 2606.6666666666665);
});
Deno.test("should return 100$ in April 1914 adjusted to April 2023 inflation. It should be rounded to the nearest integer.", () => {
  const adjustedAmount = adjustToInflation(100, 6.0, 156.4, {
    decimals: 0,
  });
  assertEquals(adjustedAmount, 2607);
});
Deno.test("should return 100$ in April 1914 adjusted to April 2023 inflation. It should be rounded to third decimal.", () => {
  const adjustedAmount = adjustToInflation(100, 6.0, 156.4, {
    decimals: 3,
  });
  assertEquals(adjustedAmount, 2606.667);
});

Deno.test("should return 100$ in April 2023 adjusted to April 1914 inflation", () => {
  const adjustedAmount = adjustToInflation(100, 156.4, 6.0);
  assertEquals(adjustedAmount, 3.8363171355498764);
});
Deno.test("should return 100$ in April 2023 adjusted to April 1914 inflation. It should be rounded to the nearest integer.", () => {
  const adjustedAmount = adjustToInflation(100, 156.4, 6.0, {
    decimals: 0,
  });
  assertEquals(adjustedAmount, 4);
});
Deno.test("should return 100$ in April 2023 adjusted to April 1914 inflation. It should be rounded to third decimal.", () => {
  const adjustedAmount = adjustToInflation(100, 156.4, 6.0, {
    decimals: 3,
  });
  assertEquals(adjustedAmount, 3.836);
});
