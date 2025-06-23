import { assertEquals } from "jsr:@std/assert";
import formatNumber from "../../src/format/formatNumber.ts";

Deno.test("should return the number as a string", () => {
  const string = formatNumber(10);
  assertEquals(string, "10");
});
Deno.test("should return the number with coma as a thousand separator (using 1000)", () => {
  const string = formatNumber(1000);
  assertEquals(string, "1,000");
});
Deno.test("should return the number with coma as a thousand separator (using 10000)", () => {
  const string = formatNumber(10000);
  assertEquals(string, "10,000");
});
Deno.test("should return the number with coma as a thousand separator (using 100000)", () => {
  const string = formatNumber(100000);
  assertEquals(string, "100,000");
});
Deno.test("should return the number with coma as a thousand separator and keep decimals (using 1000000000.1234)", () => {
  const string = formatNumber(1000000000.1234);
  assertEquals(string, "1,000,000,000.1234");
});
Deno.test("should return the number with + sign", () => {
  const string = formatNumber(1.12, { sign: true });
  assertEquals(string, "+1.12");
});
Deno.test("should return the number with - sign", () => {
  const string = formatNumber(-2.23, { sign: true });
  assertEquals(string, "-2.23");
});
Deno.test("should return 0 even if with option sign to true", () => {
  const string = formatNumber(0, { sign: true });
  assertEquals(string, "0");
});
Deno.test("should return the number rounded", () => {
  const string = formatNumber(1.5345, { round: true });
  assertEquals(string, "2");
});
Deno.test("should return the number rounded with 2 decimals", () => {
  const string = formatNumber(1.5345, { decimals: 2 });
  assertEquals(string, "1.53");
});
Deno.test("should return the number rounded with 2 fixed decimals", () => {
  const string = formatNumber(1.5042, { decimals: 2, fixed: true });
  assertEquals(string, "1.50");
});
Deno.test("should return the number rounded with base 10", () => {
  const string = formatNumber(11523.5345, { nearestInteger: 10 });
  assertEquals(string, "11,520");
});
Deno.test("should return the number rounded with 2 decimals and + sign", () => {
  const string = formatNumber(1.5345, { decimals: 2, sign: true });
  assertEquals(string, "+1.53");
});
Deno.test("should return the number rounded with base 10 and + sign", () => {
  const string = formatNumber(11523.5345, {
    nearestInteger: 10,
    sign: true,
  });
  assertEquals(string, "+11,520");
});
Deno.test("should return the number rounded with 2 decimals and - sign", () => {
  const string = formatNumber(-1.5345, { decimals: 2, sign: true });
  assertEquals(string, "-1.53");
});
Deno.test("should return the number rounded with 2 fixed decimals and - sign", () => {
  const string = formatNumber(-1.5023, {
    decimals: 2,
    fixed: true,
    sign: true,
  });
  assertEquals(string, "-1.50");
});
Deno.test("should return the number rounded with base 10 and - sign", () => {
  const string = formatNumber(-11523.5345, {
    nearestInteger: 10,
    sign: true,
  });
  assertEquals(string, "-11,520");
});
Deno.test("should return the number with prefix", () => {
  const string = formatNumber(-11523, {
    prefix: "$",
  });
  assertEquals(string, "$-11,523");
});
Deno.test("should return the number with suffix", () => {
  const string = formatNumber(35, {
    suffix: " C",
  });
  assertEquals(string, "35 C");
});
Deno.test("should return the number with a prefix and a suffix", () => {
  const string = formatNumber(35, {
    prefix: "Temp.: ",
    suffix: " C",
  });
  assertEquals(string, "Temp.: 35 C");
});

// Radio-Canada style

Deno.test("should return the number as a string without separator (using 1000)", () => {
  const string = formatNumber(1000, { style: "rc" });
  assertEquals(string, "1000");
});
Deno.test("should return the number with non-breaking space as a thousand separator (using 10000)", () => {
  const string = formatNumber(10000, { style: "rc" });
  assertEquals(string, "10 000");
});
Deno.test("should return the number with non-breaking space as a thousand separator (using 100000)", () => {
  const string = formatNumber(100000, { style: "rc" });
  assertEquals(string, "100 000");
});
Deno.test("should return the number with non-breaking space as a thousand separator and keep decimals (using 1000000000.1234)", () => {
  const string = formatNumber(1000000000.1234, { style: "rc" });
  assertEquals(string, "1 000 000 000,1234");
});
Deno.test("should return the number with + sign with rc style", () => {
  const string = formatNumber(1.12, { sign: true, style: "rc" });
  assertEquals(string, "+1,12");
});
Deno.test("should return the number with - sign with rc style", () => {
  const string = formatNumber(-2.23, { sign: true, style: "rc" });
  assertEquals(string, "-2,23");
});
Deno.test("should return the number rounded with rc style", () => {
  const string = formatNumber(1.5345, { round: true, style: "rc" });
  assertEquals(string, "2");
});
Deno.test("should return the number rounded with 2 decimals with rc style", () => {
  const string = formatNumber(1.5345, { decimals: 2, style: "rc" });
  assertEquals(string, "1,53");
});
Deno.test("should return the number rounded with 2 fixed decimals with rc style", () => {
  const string = formatNumber(1.5042, {
    decimals: 2,
    fixed: true,
    style: "rc",
  });
  assertEquals(string, "1,50");
});
Deno.test("should return the number rounded with base 10 with rc style", () => {
  const string = formatNumber(11523.5345, {
    nearestInteger: 10,
    style: "rc",
  });
  assertEquals(string, "11 520");
});
Deno.test("should return the number rounded with 2 decimals, + sign and rc style", () => {
  const string = formatNumber(1.5345, {
    decimals: 2,
    sign: true,
    style: "rc",
  });
  assertEquals(string, "+1,53");
});
Deno.test("should return the number rounded, with 2 fixed decimals, +sign and rc style", () => {
  const string = formatNumber(1.2, {
    decimals: 2,
    fixed: true,
    sign: true,
    style: "rc",
  });
  assertEquals(string, "+1,20");
});
Deno.test("should return the number rounded with base 10, + sign and rc style", () => {
  const string = formatNumber(11523.5345, {
    nearestInteger: 10,
    sign: true,
    style: "rc",
  });
  assertEquals(string, "+11 520");
});
Deno.test("should return the number rounded with 2 decimals, - sign and rc style", () => {
  const string = formatNumber(-1.5345, {
    decimals: 2,
    sign: true,
    style: "rc",
  });
  assertEquals(string, "-1,53");
});
Deno.test("should return the number rounded with base 10, - sign and rc style", () => {
  const string = formatNumber(-11523.5345, {
    nearestInteger: 10,
    sign: true,
    style: "rc",
  });
  assertEquals(string, "-11 520");
});
Deno.test("should return the number with prefix and rc style", () => {
  const string = formatNumber(-11523, {
    prefix: "$",
    style: "rc",
  });
  assertEquals(string, "$-11 523");
});
Deno.test("should return the number with suffix and rc style", () => {
  const string = formatNumber(35.2, {
    suffix: " C",
    style: "rc",
  });
  assertEquals(string, "35,2 C");
});
Deno.test("should return the number with a prefix, a suffix and rc style", () => {
  const string = formatNumber(35.6, {
    prefix: "Temp.: ",
    suffix: " C",
    style: "rc",
  });
  assertEquals(string, "Temp.: 35,6 C");
});
Deno.test("should return the number round with 1 significant digit", () => {
  const string = formatNumber(0.01578, { significantDigits: 1 });
  assertEquals(string, "0.02");
});
Deno.test("should return the number round with 2 significant digits and a positive sign", () => {
  const string = formatNumber(0.01578, {
    significantDigits: 2,
    sign: true,
  });
  assertEquals(string, "+0.016");
});
Deno.test("should return the number round with 2 significant digits and a negative sign", () => {
  const string = formatNumber(-0.01578, {
    significantDigits: 2,
    sign: true,
  });
  assertEquals(string, "-0.016");
});
Deno.test("should return the number round with 2 significant digits and a percentage sign", () => {
  const string = formatNumber(1.3922092532695824, {
    suffix: "%",
    significantDigits: 2,
  });
  assertEquals(string, "1.4%");
});
Deno.test("should return the number not abbreviated", () => {
  const string = formatNumber(15, { abreviation: true });
  assertEquals(string, "15");
});
Deno.test("should return the number abbreviated to K", () => {
  const string = formatNumber(1500, { abreviation: true });
  assertEquals(string, "1.5K");
});
Deno.test("should return the number abbreviated to M", () => {
  const string = formatNumber(1500000, { abreviation: true });
  assertEquals(string, "1.5M");
});
Deno.test("should return the number abbreviated to B", () => {
  const string = formatNumber(1500000000, { abreviation: true });
  assertEquals(string, "1.5B");
});
Deno.test("should return the number abbreviated to T", () => {
  const string = formatNumber(1500000000000, { abreviation: true });
  assertEquals(string, "1.5T");
});
Deno.test("should return the number abbreviated with prefix and suffix", () => {
  const string = formatNumber(1500, {
    abreviation: true,
    prefix: "$",
    suffix: " USD",
  });
  assertEquals(string, "$1.5K USD");
});
Deno.test("should return the number abbreviated with 2 decimals", () => {
  const string = formatNumber(1525, {
    abreviation: true,
    decimals: 2,
    prefix: "$",
    suffix: " USD",
  });
  assertEquals(string, "$1.52K USD");
});
Deno.test("should return the number abbreviated with 3 fixed decimals", () => {
  const string = formatNumber(1510, {
    abreviation: true,
    decimals: 3,
    fixed: true,
    prefix: "$",
    suffix: " USD",
  });
  assertEquals(string, "$1.510K USD");
});
Deno.test("should return the number abbreviated with 0 decimals", () => {
  const string = formatNumber(1525, {
    abreviation: true,
    decimals: 0,
    prefix: "$",
    suffix: " USD",
  });
  assertEquals(string, "$2K USD");
});
Deno.test("should return 0 when abbreviation is true", () => {
  const string = formatNumber(0, {
    abreviation: true,
    decimals: 0,
    prefix: "$",
    suffix: " USD",
  });
  assertEquals(string, "$0 USD");
});
Deno.test("should return the absolute value when sign is strictly false (positive number)", () => {
  const string = formatNumber(123, { sign: false });
  assertEquals(string, "123");
});
Deno.test("should return the absolute value when sign is strictly false (negative number)", () => {
  const string = formatNumber(-456, { sign: false });
  assertEquals(string, "456");
});
Deno.test("should not remove sign if sign is undefined (negative number)", () => {
  const string = formatNumber(-789, {});
  assertEquals(string, "-789");
});
Deno.test("should not remove sign if sign is undefined (positive number)", () => {
  const string = formatNumber(789, {});
  assertEquals(string, "789");
});
Deno.test("should work with sign false and prefix/suffix", () => {
  const string = formatNumber(-1000, {
    sign: false,
    prefix: "$",
    suffix: " USD",
  });
  assertEquals(string, "$1,000 USD");
});
Deno.test("should return the negative number abbreviated to K", () => {
  const string = formatNumber(-1500, { abreviation: true });
  assertEquals(string, "-1.5K");
});
Deno.test("should return the negative number abbreviated to M", () => {
  const string = formatNumber(-1500000, { abreviation: true });
  assertEquals(string, "-1.5M");
});
Deno.test("should return the negative number abbreviated to B", () => {
  const string = formatNumber(-1500000000, { abreviation: true });
  assertEquals(string, "-1.5B");
});
Deno.test("should return the negative number abbreviated to T", () => {
  const string = formatNumber(-1500000000000, { abreviation: true });
  assertEquals(string, "-1.5T");
});
Deno.test("should return the negative number abbreviated with prefix and suffix", () => {
  const string = formatNumber(-1500, {
    abreviation: true,
    prefix: "$",
    suffix: " USD",
  });
  assertEquals(string, "$-1.5K USD");
});
Deno.test("should return the negative number abbreviated with 2 decimals", () => {
  const string = formatNumber(-1525, {
    abreviation: true,
    decimals: 2,
    prefix: "$",
    suffix: " USD",
  });
  assertEquals(string, "$-1.52K USD");
});
Deno.test("should return the negative number abbreviated with 3 fixed decimals", () => {
  const string = formatNumber(-1510, {
    abreviation: true,
    decimals: 3,
    fixed: true,
    prefix: "$",
    suffix: " USD",
  });
  assertEquals(string, "$-1.510K USD");
});
Deno.test("should return the negative number abbreviated with 0 decimals", () => {
  const string = formatNumber(-1525, {
    abreviation: true,
    decimals: 0,
    prefix: "$",
    suffix: " USD",
  });
  assertEquals(string, "$-2K USD");
});
Deno.test("should return CBC-style position for 1", () => {
  const string = formatNumber(1, { position: true });
  assertEquals(string, "first");
});
Deno.test("should return CBC-style position for 2", () => {
  const string = formatNumber(2, { position: true });
  assertEquals(string, "second");
});
Deno.test("should return CBC-style position for 3", () => {
  const string = formatNumber(3, { position: true });
  assertEquals(string, "third");
});
Deno.test("should return CBC-style position for 11", () => {
  const string = formatNumber(11, { position: true });
  assertEquals(string, "11th");
});
Deno.test("should return CBC-style position for 22", () => {
  const string = formatNumber(22, { position: true });
  assertEquals(string, "22nd");
});
Deno.test("should return CBC-style position for 33", () => {
  const string = formatNumber(33, { position: true });
  assertEquals(string, "33rd");
});
Deno.test("should throw for invalid position (0)", () => {
  let error = null;
  try {
    formatNumber(0, { position: true });
  } catch (e) {
    error = e;
  }
  assertEquals(error instanceof Error, true);
});
Deno.test("should throw for invalid position (1.5)", () => {
  let error = null;
  try {
    formatNumber(1.5, { position: true });
  } catch (e) {
    error = e;
  }
  assertEquals(error instanceof Error, true);
});
Deno.test("should return RC-style position for 1", () => {
  const string = formatNumber(1, { position: true, style: "rc" });
  assertEquals(string, "premier");
});
Deno.test("should return RC-style position for 2", () => {
  const string = formatNumber(2, { position: true, style: "rc" });
  assertEquals(string, "deuxième");
});
Deno.test("should return RC-style position for 3", () => {
  const string = formatNumber(3, { position: true, style: "rc" });
  assertEquals(string, "troisième");
});
Deno.test("should return RC-style position for 9", () => {
  const string = formatNumber(9, { position: true, style: "rc" });
  assertEquals(string, "neuvième");
});
Deno.test("should return RC-style position for 10", () => {
  const string = formatNumber(10, { position: true, style: "rc" });
  assertEquals(string, "10e");
});
Deno.test("should return RC-style position for 21", () => {
  const string = formatNumber(21, { position: true, style: "rc" });
  assertEquals(string, "21e");
});
Deno.test("should throw for invalid RC position (0)", () => {
  let error = null;
  try {
    formatNumber(0, { position: true, style: "rc" });
  } catch (e) {
    error = e;
  }
  assertEquals(error instanceof Error, true);
});
Deno.test("should throw for invalid RC position (1.5)", () => {
  let error = null;
  try {
    formatNumber(1.5, { position: true, style: "rc" });
  } catch (e) {
    error = e;
  }
  assertEquals(error instanceof Error, true);
});
