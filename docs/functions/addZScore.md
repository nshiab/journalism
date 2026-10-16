[**Journalism v4.0.1**](../index.md)

***

[Journalism](../globals.md) / addZScore

# Function: addZScore()

## Call Signature

> **addZScore**\<`T`, `K`\>(`data`, `variable`, `options`): (`T` & `{ [P in string]: number }`)[]

Calculates the Z-score for a specific numeric variable within an array of objects and adds it as a new property to each object. The Z-score is a statistical measure that indicates how many standard deviations a data point is from the mean of the dataset.

The function modifies the input `data` array by adding a new key to each object, which by default is `zScore`. You can customize the name of this new key by using the `newKey` option.

### Type Parameters

#### T

`T` *extends* `Record`\<`string`, `unknown`\>

#### K

`K` *extends* `string`

### Parameters

#### data

`T`[]

An array of objects. Each object should contain the variable for which the Z-score is to be calculated.

#### variable

`string`

The key (as a string) of the numeric variable for which the Z-score will be computed.

#### options

Optional settings for the Z-score calculation.

##### newKey

`K`

The name of the new key to be added to each object, representing the Z-score. If not provided, it defaults to `'zScore'`.

### Returns

(`T` & `{ [P in string]: number }`)[]

The input `data` array, with the Z-score added to each object under the specified key.

### Throws

If the specified `variable` is not found in an object or its value is not a number.

### Examples

```ts
// Basic usage with a list of student grades
const studentData = [
  { student: 'Alice', grade: 85 },
  { student: 'Bob', grade: 92 },
  { student: 'Charlie', grade: 78 },
  { student: 'David', grade: 95 },
  { student: 'Eve', grade: 62 }
];

// Calculate the Z-score for the 'grade' variable
addZScore(studentData, 'grade');

console.log(studentData);
// Expected output:
// [
//   { student: 'Alice', grade: 85, zScore: 0.25 },
//   { student: 'Bob', grade: 92, zScore: 0.83 },
//   { student: 'Charlie', grade: 78, zScore: -0.33 },
//   { student: 'David', grade: 95, zScore: 1.08 },
//   { student: 'Eve', grade: 62, zScore: -1.83 }
// ]
```

```ts
// Using a custom key for the Z-score
addZScore(studentData, 'grade', { newKey: 'gradeZScore' });

console.log(studentData);
// Expected output with a custom key:
// [
//   { student: 'Alice', grade: 85, gradeZScore: 0.25 },
//   { student: 'Bob', grade: 92, gradeZScore: 0.83 },
//   { student: 'Charlie', grade: 78, gradeZScore: -0.33 },
//   { student: 'David', grade: 95, gradeZScore: 1.08 },
//   { student: 'Eve', grade: 62, gradeZScore: -1.83 }
// ]
```

## Call Signature

> **addZScore**\<`T`\>(`data`, `variable`, `options?`): (`T` & `object`)[]

Calculates the Z-score for a specific numeric variable within an array of objects using the default 'zScore' key name.

### Type Parameters

#### T

`T` *extends* `Record`\<`string`, `unknown`\>

### Parameters

#### data

`T`[]

An array of objects. Each object should contain the variable for which the Z-score is to be calculated.

#### variable

`string`

The key (as a string) of the numeric variable for which the Z-score will be computed.

#### options?

Optional settings (newKey defaults to undefined, using 'zScore').

##### newKey?

`undefined`

### Returns

(`T` & `object`)[]

The input data array with zScore properties added to each object.
