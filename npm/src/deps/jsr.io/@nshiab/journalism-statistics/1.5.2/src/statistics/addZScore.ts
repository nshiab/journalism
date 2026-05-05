/**
 * Calculates the Z-score for a specific numeric variable within an array of objects and adds it as a new property to each object. The Z-score is a statistical measure that indicates how many standard deviations a data point is from the mean of the dataset.
 *
 * The function modifies the input `data` array by adding a new key to each object, which by default is `zScore`. You can customize the name of this new key by using the `newKey` option.
 *
 * @param data - An array of objects. Each object should contain the variable for which the Z-score is to be calculated.
 * @param variable - The key (as a string) of the numeric variable for which the Z-score will be computed.
 * @param options - Optional settings for the Z-score calculation.
 * @param options.newKey - The name of the new key to be added to each object, representing the Z-score. If not provided, it defaults to `'zScore'`.
 * @returns The input `data` array, with the Z-score added to each object under the specified key.
 * @throws {Error} If the specified `variable` is not found in an object or its value is not a number.
 *
 * @example
 * ```ts
 * // Basic usage with a list of student grades
 * const studentData = [
 *   { student: 'Alice', grade: 85 },
 *   { student: 'Bob', grade: 92 },
 *   { student: 'Charlie', grade: 78 },
 *   { student: 'David', grade: 95 },
 *   { student: 'Eve', grade: 62 }
 * ];
 *
 * // Calculate the Z-score for the 'grade' variable
 * addZScore(studentData, 'grade');
 *
 * console.log(studentData);
 * // Expected output:
 * // [
 * //   { student: 'Alice', grade: 85, zScore: 0.25 },
 * //   { student: 'Bob', grade: 92, zScore: 0.83 },
 * //   { student: 'Charlie', grade: 78, zScore: -0.33 },
 * //   { student: 'David', grade: 95, zScore: 1.08 },
 * //   { student: 'Eve', grade: 62, zScore: -1.83 }
 * // ]
 * ```
 * @example
 * ```ts
 * // Using a custom key for the Z-score
 * addZScore(studentData, 'grade', { newKey: 'gradeZScore' });
 *
 * console.log(studentData);
 * // Expected output with a custom key:
 * // [
 * //   { student: 'Alice', grade: 85, gradeZScore: 0.25 },
 * //   { student: 'Bob', grade: 92, gradeZScore: 0.83 },
 * //   { student: 'Charlie', grade: 78, gradeZScore: -0.33 },
 * //   { student: 'David', grade: 95, gradeZScore: 1.08 },
 * //   { student: 'Eve', grade: 62, gradeZScore: -1.83 }
 * // ]
 * ```
 * @category Statistics
 */

// Function overload: when a custom newKey is provided
export default function addZScore<
  T extends Record<string, unknown>,
  K extends string,
>(
  data: T[],
  variable: string,
  options: { newKey: K },
): (
  & T
  & {
    [P in K]: number;
  }
)[];

/**
 * Calculates the Z-score for a specific numeric variable within an array of objects using the default 'zScore' key name.
 *
 * @param data - An array of objects. Each object should contain the variable for which the Z-score is to be calculated.
 * @param variable - The key (as a string) of the numeric variable for which the Z-score will be computed.
 * @param options - Optional settings (newKey defaults to undefined, using 'zScore').
 * @returns The input data array with zScore properties added to each object.
 */
export default function addZScore<T extends Record<string, unknown>>(
  data: T[],
  variable: string,
  options?: { newKey?: undefined },
): (T & {
  zScore: number;
})[];

// Implementation
export default function addZScore<
  T extends Record<string, unknown>,
  K extends string = "zScore",
>(
  data: T[],
  variable: string,
  options: { newKey?: K } = {},
): (T & { [P in K]: number })[] {
  // Average
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    const val = data[i][variable];
    if (typeof val !== "number") {
      throw new Error(`This is not a number: ${data[i][variable]}`);
    }
    sum += val;
  }
  const mean = sum / data.length;

  // Standard deviation
  const sqdDistFromMean = data
    .map((d) => Math.pow((d[variable] as number) - mean, 2)) // we checked the type above
    .reduce((acc, curr) => (acc += curr), 0);

  const stdDev = Math.sqrt(sqdDistFromMean / data.length);

  // Z-Score
  const newKey = (options.newKey ?? "zScore") as K;
  for (let i = 0; i < data.length; i++) {
    (data[i] as Record<string, unknown>)[newKey] =
      ((data[i][variable] as number) - mean) / stdDev; // we checked the type above
  }

  return data as (T & { [P in K]: number })[];
}
