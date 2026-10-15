[**Journalism v3.1.2**](../index.md)

***

[Journalism](../globals.md) / DurationTracker

# Class: DurationTracker

A utility class for tracking the progress and estimating the remaining time of iterative processes. It calculates the average duration of completed iterations and uses this to project the time left for the remaining tasks. This is particularly useful for long-running operations where users need feedback on progress.

The tracker provides methods to mark the start of an iteration and to log the estimated remaining time. The log message can be customized with a prefix and suffix.

## Example

```ts
// Basic usage: Tracking a loop with 100 iterations.
const totalItems = 100;
const tracker = new DurationTracker(totalItems, {
  prefix: "Processing... Estimated time remaining: ",
  suffix: " until completion."
});

for (let i = 0; i < totalItems; i++) {
  tracker.start();
  // Simulate some work
  await new Promise(resolve => setTimeout(resolve, Math.random() * 100));
  tracker.log();
}
console.log("Processing complete!");
```

## Param

**length**

The total number of iterations or items to process. This is used to calculate the remaining items.

## Param

**options**

Optional settings for the tracker.

## Param

**options.prefix**

A string to prepend to the logged remaining time message. Defaults to an empty string.

## Param

**options.suffix**

A string to append to the logged remaining time message. Defaults to an empty string.

## Constructors

### Constructor

> **new DurationTracker**(`length`, `options?`): `DurationTracker`

Creates an instance of DurationTracker.

#### Parameters

##### length

`number`

The total number of iterations.

##### options?

Optional settings for the tracker.

###### prefix?

`string`

###### suffix?

`string`

#### Returns

`DurationTracker`

## Properties

### length

> **length**: `number`

The total number of iterations.

***

### prefix

> **prefix**: `string`

Optional prefix for the log message.

***

### suffix

> **suffix**: `string`

Option suffix for the log message.

## Methods

### log()

> **log**(): `void`

Logs the estimated remaining time based on the average duration of previous iterations.

#### Returns

`void`

#### Example

```ts
const totalItems = 100;
const tracker = new DurationTracker(totalItems);
for (let i = 0; i < totalItems; i++) {
  tracker.start();
  // Simulate some work
  await new Promise(resolve => setTimeout(resolve, Math.random() * 100));
  tracker.log(); // Log the estimated remaining time for each iteration
}
```

***

### start()

> **start**(): `void`

Starts the timer for the current iteration.

#### Returns

`void`

#### Example

```ts
const totalItems = 100;
const tracker = new DurationTracker(totalItems);
for (let i = 0; i < totalItems; i++) {
  tracker.start(); // Mark the start of each iteration
  // Simulate some work
  await new Promise(resolve => setTimeout(resolve, Math.random() * 100));
  tracker.log();
}
```
