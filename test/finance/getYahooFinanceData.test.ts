import { assertEquals } from "jsr:@std/assert";
import getYahooFinanceData from "../../src/finance/getYahooFinanceData.ts";

Deno.test("should return an array of objects with the S&P/TSX Composite index adjusted prices with a daily interval", async () => {
  const data = await getYahooFinanceData(
    "^GSPTSE",
    new Date("2025-03-01"),
    new Date("2025-03-15"),
    "adjclose",
    "1d",
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
Deno.test("should return an array of objects with the S&P/TSX Composite index open prices with a daily interval", async () => {
  const data = await getYahooFinanceData(
    "^GSPTSE",
    new Date("2025-03-01"),
    new Date("2025-03-15"),
    "open",
    "1d",
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
Deno.test("should return an array of objects with the S&P/TSX Composite index high prices with a daily interval", async () => {
  const data = await getYahooFinanceData(
    "^GSPTSE",
    new Date("2025-03-01"),
    new Date("2025-03-15"),
    "high",
    "1d",
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
Deno.test("should return an array of objects with the S&P/TSX Composite index low prices with a daily interval", async () => {
  const data = await getYahooFinanceData(
    "^GSPTSE",
    new Date("2025-03-01"),
    new Date("2025-03-15"),
    "low",
    "1d",
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
Deno.test("should return an array of objects with the S&P/TSX Composite index close prices with a daily interval", async () => {
  const data = await getYahooFinanceData(
    "^GSPTSE",
    new Date("2025-03-01"),
    new Date("2025-03-15"),
    "close",
    "1d",
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
Deno.test("should return an array of objects with the S&P/TSX Composite index volume with a daily interval", async () => {
  const data = await getYahooFinanceData(
    "^GSPTSE",
    new Date("2025-03-01"),
    new Date("2025-03-15"),
    "volume",
    "1d",
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
Deno.test("should return an array of objects with the S&P/TSX Composite index high prices with an hourly interval", async () => {
  const data = await getYahooFinanceData(
    "^GSPTSE",
    new Date("2025-04-07T00:00:00Z"),
    new Date("2025-04-08T00:00:00Z"),
    "high",
    "1h",
  );

  assertEquals(data, [
    { timestamp: 1744032600000, value: 23477.8203125 },
    { timestamp: 1744036200000, value: 23111.1796875 },
    { timestamp: 1744039800000, value: 22879.98046875 },
    { timestamp: 1744043400000, value: 22906.80078125 },
    { timestamp: 1744047000000, value: 23069.73046875 },
    { timestamp: 1744050600000, value: 22986.859375 },
    { timestamp: 1744054200000, value: 22954.33984375 },
    { timestamp: 1744142400000, value: 22506.900390625 },
  ]);
});
Deno.test("should return an array of objects with the S&P/TSX Composite index high prices with a minute interval", async () => {
  const data = await getYahooFinanceData(
    "^GSPTSE",
    new Date("2025-04-08T14:00:00Z"),
    new Date("2025-04-08T14:10:00Z"),
    "high",
    "1m",
  );

  assertEquals(data, [
    { timestamp: 1744120800000, value: 23316.599609375 },
    { timestamp: 1744120860000, value: 23327.099609375 },
    { timestamp: 1744120920000, value: 23326.7109375 },
    { timestamp: 1744120980000, value: 23381.76953125 },
    { timestamp: 1744121040000, value: 23379.44921875 },
    { timestamp: 1744121100000, value: 23387.330078125 },
    { timestamp: 1744121160000, value: 23391.19921875 },
    { timestamp: 1744121220000, value: 23344.359375 },
    { timestamp: 1744121280000, value: 23348.240234375 },
    { timestamp: 1744121340000, value: 23354.1796875 },
    { timestamp: 1744142400000, value: 22506.900390625 },
  ]);
});
Deno.test("should return an array of objects with the S&P/TSX Composite index adjusted prices with a daily interval", async () => {
  const tenDaysAgo = new Date(Date.now() - 1000 * 60 * 60 * 24 * 10);
  const data = await getYahooFinanceData(
    "^GSPTSE",
    tenDaysAgo,
    new Date(),
    "adjclose",
    "1d",
  );

  assertEquals(Array.isArray(data), true);
});
