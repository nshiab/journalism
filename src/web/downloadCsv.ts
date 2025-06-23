import { csvFormat } from "d3-dsv";

/**
 * Triggers a download of the provided data as a CSV file in the browser.
 *
 * @example
 * ```ts
 * import downloadCSV from "./downloadCsv.ts";
 *
 * const data = [
 *   { name: "Alice", age: 30, city: "New York" },
 *   { name: "Bob", age: 25, city: "Los Angeles" }
 * ];
 * downloadCSV(data, "data.csv");
 * ```
 *
 * @param data - An array of objects to be converted to CSV.
 * @param filename - The name for the downloaded CSV file (e.g., "data.csv").
 */
export default function downloadCSV(
  data: { [key: string]: unknown }[],
  filename: string,
) {
  const csvContent = csvFormat(data);
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
