[**Journalism v4.0.0**](../index.md)

***

[Journalism](../globals.md) / printTable

# Function: printTable()

> **printTable**(`data`, `options?`): `void`

Prints a formatted table to the console with support for word wrapping within cells.
Unlike console.table(), this function properly handles multi-line content within cells,
making it ideal for displaying data with long text values.

This function has been created for the [simple-data-analysis library](https://github.com/nshiab/simple-data-analysis), but can be used independently for any array of objects.

## Parameters

### data

`object`[]

An array of objects representing the rows of the table. Each object should have string keys.

### options?

Optional configuration for table rendering.

#### maxColumnWidth?

`number`

The maximum width for any column (default: 75). Values exceeding this width will be wrapped at word boundaries.

#### minColumnWidth?

`number`

The minimum width for any column (default: 3).

#### typesRowIndex?

`number`

The index of a row that contains type annotations (e.g. "VARCHAR/string"). This row will be rendered in grey. If omitted, no row is treated as a types row.

## Returns

`void`

void - The table is printed directly to the console.

## Examples

```typescript
const data = [
  { name: "Alice", description: "A software engineer with expertise in TypeScript" },
  { name: "Bob", description: "A product manager" }
];
printTable(data, { maxColumnWidth: 30 });
// Outputs a nicely formatted table with word-wrapped description column
```

```typescript
// With types row
const types = { name: "VARCHAR/string", age: "INTEGER/number" };
const data = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 }
];
printTable([types, ...data], { typesRowIndex: 0 });
```
