export default function validateDataTypes(
  data: { [key: string]: unknown }[],
  x: string,
  y: string,
) {
  if (data.length === 0) {
    throw new Error("Data array is empty.");
  }

  // Check all rows to validate data types
  for (let i = 0; i < data.length; i++) {
    const row = data[i];

    // Validate x values
    const xValue = row[x];
    if (xValue === undefined || xValue === null) {
      throw new Error(`Row ${i}: x-axis value "${x}" is undefined or null.`);
    }

    const isValidX = typeof xValue === "number" || xValue instanceof Date;

    if (!isValidX) {
      throw new Error(
        `Row ${i}: x-axis value "${x}" must be a number or Date. Got: ${typeof xValue} (${xValue})`,
      );
    }

    // Validate y values
    const yValue = row[y];
    if (yValue === undefined || yValue === null) {
      throw new Error(`Row ${i}: y-axis value "${y}" is undefined or null.`);
    }

    const isValidY = typeof yValue === "number";

    if (!isValidY) {
      throw new Error(
        `Row ${i}: y-axis value "${y}" must be a number. Got: ${typeof yValue} (${yValue})`,
      );
    }
  }
}
