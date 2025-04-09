import arraysToData from "../format/arraysToData.ts";

/**
 * Fetches historical financial data for a given symbol from Yahoo Finance. The use of a small amount of data is tolerated for educational or public interest purposes, but if you want to collect and reuse a large volume of this data, with or without a commercial purpose, contact the team behind the site or purchase a premium subscription.
 *
 * @example
 * Basic usage
 * ```ts
 * // Fetch the adjusted close price for the S&P/TSX Composite Index.
 * const data = await getYahooFinanceData(
 *   "^GSPTSE",
 *   new Date("2025-03-01"),
 *   new Date("2025-03-15"),
 *   "adjclose",
 * );
 * ```
 *
 * @param symbol - The stock symbol to fetch data for.
 * @param startDate - The start date for the data range.
 * @param endDate - The end date for the data range.
 * @param variable - The specific financial variable to retrieve. Can be one of "open", "high", "low", "close", "adjclose", or "volume".
 * @param interval - The time interval for the data. Can be one of "1d" (daily), "1h" (hourly), or "1m" (minutes).
 * @returns A promise that resolves to an array of objects containing timestamp and value pairs.
 */

export default async function getYahooFinanceData(
  symbol: string,
  startDate: Date,
  endDate: Date,
  variable: "open" | "high" | "low" | "close" | "adjclose" | "volume",
  interval: "1d" | "1h" | "1m",
): Promise<{ timestamp: number; value: number }[]> {
  const period1 = Math.round(startDate.getTime() / 1000);
  const period2 = Math.round(endDate.getTime() / 1000);

  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${
    encodeURIComponent(symbol)
  }?events=capitalGain%7Cdiv%7Csplit&formatted=true&includeAdjustedClose=true&interval=${interval}&period1=${period1}&period2=${period2}&symbol=${symbol}&userYfid=true&lang=en-CA&region=CA`;

  const response = await fetch(url);

  const data = await response.json();

  if (data.chart.result.length === 0) {
    throw new Error("No data found.");
  }
  const timestamp = data.chart.result[0].timestamp.map((d: number) => d * 1000);

  let value;
  if (variable === "adjclose") {
    if (!data.chart.result[0].indicators.adjclose) {
      throw new Error(
        "adjclose data not available. Please use 'open', 'high', 'low', 'close' or 'volume'.",
      );
    }
    value = data.chart.result[0].indicators.adjclose[0].adjclose;
  } else if (
    variable === "open" || variable === "high" || variable === "low" ||
    variable === "close" || variable === "volume"
  ) {
    value = data.chart.result[0].indicators.quote[0][variable];
  } else {
    throw new Error(
      "Unknown variable. Please use 'open', 'high', 'low', 'close', 'adjclose' or 'volume'.",
    );
  }

  const rows = arraysToData({ timestamp, value });

  return rows as { timestamp: number; value: number }[];
}
