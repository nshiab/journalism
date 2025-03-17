import { assertEquals } from "jsr:@std/assert";
import getYahooFinanceData from "../../src/finance/getYahooFinanceData.ts";

Deno.test("should return an array of objects with the S&P/TSX Composite index adjusted prices", async () => {
  const data = await getYahooFinanceData(
    "^GSPTSE",
    new Date("2025-03-01"),
    new Date("2025-03-15"),
    "adjclose",
  );

  assertEquals(data, [
    { timestamp: 1741012200000, value: 25001.599609375 },
    { timestamp: 1741098600000, value: 24572 },
    { timestamp: 1741185000000, value: 24870.80078125 },
    { timestamp: 1741271400000, value: 24584 },
    { timestamp: 1741357800000, value: 24758.80078125 },
    { timestamp: 1741613400000, value: 24380.69921875 },
    { timestamp: 1741699800000, value: 24248.19921875 },
    { timestamp: 1741786200000, value: 24423.30078125 },
    { timestamp: 1741872600000, value: 24203.19921875 },
    { timestamp: 1741959000000, value: 24553.400390625 },
  ]);
});
Deno.test("should return an array of objects with the S&P/TSX Composite index open prices", async () => {
  const data = await getYahooFinanceData(
    "^GSPTSE",
    new Date("2025-03-01"),
    new Date("2025-03-15"),
    "open",
  );

  assertEquals(data, [
    { timestamp: 1741012200000, value: 25411.599609375 },
    { timestamp: 1741098600000, value: 24862.19921875 },
    { timestamp: 1741185000000, value: 24555.900390625 },
    { timestamp: 1741271400000, value: 24735 },
    { timestamp: 1741357800000, value: 24547.19921875 },
    { timestamp: 1741613400000, value: 24601.30078125 },
    { timestamp: 1741699800000, value: 24363 },
    { timestamp: 1741786200000, value: 24334 },
    { timestamp: 1741872600000, value: 24375.099609375 },
    { timestamp: 1741959000000, value: 24301.69921875 },
  ]);
});
Deno.test("should return an array of objects with the S&P/TSX Composite index high prices", async () => {
  const data = await getYahooFinanceData(
    "^GSPTSE",
    new Date("2025-03-01"),
    new Date("2025-03-15"),
    "high",
  );

  assertEquals(data, [
    { timestamp: 1741012200000, value: 25559.5 },
    { timestamp: 1741098600000, value: 24862.19921875 },
    { timestamp: 1741185000000, value: 24881.80078125 },
    { timestamp: 1741271400000, value: 24828.400390625 },
    { timestamp: 1741357800000, value: 24825.400390625 },
    { timestamp: 1741613400000, value: 24601.30078125 },
    { timestamp: 1741699800000, value: 24493.5 },
    { timestamp: 1741786200000, value: 24516.30078125 },
    { timestamp: 1741872600000, value: 24467.599609375 },
    { timestamp: 1741959000000, value: 24565.400390625 },
  ]);
});
Deno.test("should return an array of objects with the S&P/TSX Composite index low prices", async () => {
  const data = await getYahooFinanceData(
    "^GSPTSE",
    new Date("2025-03-01"),
    new Date("2025-03-15"),
    "low",
  );

  assertEquals(data, [
    { timestamp: 1741012200000, value: 24885.69921875 },
    { timestamp: 1741098600000, value: 24344.80078125 },
    { timestamp: 1741185000000, value: 24549 },
    { timestamp: 1741271400000, value: 24476.5 },
    { timestamp: 1741357800000, value: 24458.5 },
    { timestamp: 1741613400000, value: 24250 },
    { timestamp: 1741699800000, value: 24155.599609375 },
    { timestamp: 1741786200000, value: 24227.80078125 },
    { timestamp: 1741872600000, value: 24145.599609375 },
    { timestamp: 1741959000000, value: 24293.19921875 },
  ]);
});
Deno.test("should return an array of objects with the S&P/TSX Composite index close prices", async () => {
  const data = await getYahooFinanceData(
    "^GSPTSE",
    new Date("2025-03-01"),
    new Date("2025-03-15"),
    "close",
  );

  assertEquals(data, [
    { timestamp: 1741012200000, value: 25001.599609375 },
    { timestamp: 1741098600000, value: 24572 },
    { timestamp: 1741185000000, value: 24870.80078125 },
    { timestamp: 1741271400000, value: 24584 },
    { timestamp: 1741357800000, value: 24758.80078125 },
    { timestamp: 1741613400000, value: 24380.69921875 },
    { timestamp: 1741699800000, value: 24248.19921875 },
    { timestamp: 1741786200000, value: 24423.30078125 },
    { timestamp: 1741872600000, value: 24203.19921875 },
    { timestamp: 1741959000000, value: 24553.400390625 },
  ]);
});
Deno.test("should return an array of objects with the S&P/TSX Composite index volume", async () => {
  const data = await getYahooFinanceData(
    "^GSPTSE",
    new Date("2025-03-01"),
    new Date("2025-03-15"),
    "volume",
  );

  assertEquals(data, [
    { timestamp: 1741012200000, value: 340862200 },
    { timestamp: 1741098600000, value: 350240700 },
    { timestamp: 1741185000000, value: 323156900 },
    { timestamp: 1741271400000, value: 332961300 },
    { timestamp: 1741357800000, value: 301444800 },
    { timestamp: 1741613400000, value: 459731100 },
    { timestamp: 1741699800000, value: 365186900 },
    { timestamp: 1741786200000, value: 332655500 },
    { timestamp: 1741872600000, value: 343747400 },
    { timestamp: 1741959000000, value: 262196500 },
  ]);
});
