import arraysToData from "../format/arraysToData.ts";

/**
 * Fetches historical financial data for a given stock symbol from Yahoo Finance. This function provides a convenient way to access various financial metrics (e.g., open, high, low, close, adjusted close, volume) at specified intervals (daily, hourly, or minute-by-minute).
 *
 * **Important Note on Data Usage:** The use of a small amount of data from Yahoo Finance is generally tolerated for educational or public interest purposes. However, if you intend to collect and reuse a large volume of this data, especially for commercial purposes, it is crucial to contact the Yahoo Finance team or consider purchasing a premium subscription to ensure compliance with their terms of service.
 *
 * @param symbol - The stock symbol (ticker) for which to fetch data (e.g., 'AAPL' for Apple Inc., '^GSPTSE' for S&P/TSX Composite Index).
 * @param startDate - The start date for the data range (inclusive). Data will be fetched from this date onwards.
 * @param endDate - The end date for the data range (inclusive). Data will be fetched up to this date.
 * @param variable - The specific financial variable to retrieve. Can be one of:
 *   - `"open"`: The opening price for the period.
 *   - `"high"`: The highest price for the period.
 *   - `"low"`: The lowest price for the period.
 *   - `"close"`: The closing price for the period.
 *   - `"adjclose"`: The adjusted closing price, accounting for dividends and stock splits.
 *   - `"volume"`: The trading volume for the period.
 * @param interval - The time interval for the data points. Can be one of:
 *   - `"1d"`: Daily data.
 *   - `"1h"`: Hourly data.
 *   - `"1m"`: Minute-by-minute data.
 * @returns A promise that resolves to an array of objects, where each object contains a `timestamp` (Unix timestamp in milliseconds) and the `value` of the requested financial variable for that period.
 *
 * @example
 * ```ts
 * // Fetch the adjusted close price for the S&P/TSX Composite Index for a specific period.
 * const spTsxData = await getYahooFinanceData(
 *   "^GSPTSE",
 *   new Date("2025-03-01"),
 *   new Date("2025-03-15"),
 *   "adjclose",
 *   "1d"
 * );
 * console.log("S&P/TSX Composite Index Data:", spTsxData);
 * ```
 * @example
 * ```ts
 * // Get hourly trading volume for Apple (AAPL) for a single day.
 * const appleVolumeData = await getYahooFinanceData(
 *   "AAPL",
 *   new Date("2024-07-01T09:30:00"),
 *   new Date("2024-07-01T16:00:00"),
 *   "volume",
 *   "1h"
 * );
 * console.log("Apple Hourly Volume Data:", appleVolumeData);
 * ```
 * @category Finance
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
