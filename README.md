# closed-interval

closed-interval is a TypeScript port of the [Apache Commons Range class](https://commons.apache.org/proper/commons-lang/apidocs/org/apache/commons/lang3/Range.html) offered for the JVM based languages.

The API aims to be identical to Apache Commons, with a few exceptions where the TypeScript implementation is simpler or not applicable.

## Example usage

As usual, install the package

```
npm i closed-interval
```

and use the `Range` class in your code:

```js
import Range from 'closed-interval'

// or as a CommonJS module
// const { default: Range } = require('closed-interval')

const range = Range.between(10, 100)
const containsOtherRange = range.contains(Range.between(40, 50)) // true
const isOverlappedByOtherRange = range.isOverlappedBy(Range.between(40, 50)) // false
```

## API

Since the API closely resembles the implementation of Apache Commons, the documentation below borrows most of its descriptions from the relevant javadoc.

### Range.between

```typescript

Range.between<T>(fromInclusive: T, toInclusive: T, comparator: Comparator<T> | null = null): Range<T>
```

**_Deprecated_**
Use [Range.of](#rangeof)

### Range.of

```typescript

Range.of<T>(fromInclusive: T, toInclusive: T, comparator: Comparator<T> | null = null): Range<T>
```

Creates a range with the specified minimum and maximum values (both inclusive).

The range uses the natural ordering of the elements (when applicable) to determine where values lie in the range unless a comparator is passed.

The arguments may be passed in the order (min,max) or (max,min). The getMinimum and getMaximum methods will return the correct values.

### Range.is

```typescript

Range.is<T>(element: T, comparator: Comparator<T> | null = null): Range<T>
```

Creates a range using the specified element as both the minimum and maximum in this range.

The range uses the natural ordering of the elements (when applicable) to determine where values lie in the range unless a comparator is passed.

### contains

```typescript

contains(element: T): boolean
```

Checks whether the specified element occurs within this range.

### containsRange

```typescript

containsRange(other: Range<T>): boolean
```

Checks whether this range contains all the elements of the specified range.

This method may fail if the ranges have two different comparators.

### elementCompareTo

```typescript

elementCompareTo(element: T): -1 | 0 | 1
```

Checks where the specified element occurs relative to this range.

### fit

```typescript

fit(element: T): T
```

Fits the given element into this range by returning the given element or, if out of bounds, the range minimum if below, or the range maximum if above.

### getComparator

```typescript

getComparator(): Comparator<T>
```

Gets the comparator being used to determine if objects are within the range.

Natural ordering uses an internal comparator implementation, thus this method never returns null.

### getMaximum

```typescript

getMaximum(): T
```

Gets the maximum value in this range.

### getMinimum

```typescript

getMinimum(): T
```

Gets the minimum value in this range.

### intersectionWith

```typescript

intersectionWith(other: Range<T>): Range<T>
```

Calculate the intersection of this and an overlapping Range.

### isAfter

```typescript

isAfter(element: T): boolean
```

Checks whether this range is after the specified element.

### isAfterRange

```typescript

isAfterRange(otherRange: Range<T>): boolean
```

Checks whether this range is completely after the specified range.

This method may fail if the ranges have two different comparators.

### isBefore

```typescript

isBefore(element: T): boolean
```

Checks whether this range is before the specified element.

### isBeforeRange

```typescript

isBeforeRange(otherRange: Range<T>): boolean
```

Checks whether this range is completely before the specified range.

This method may fail if the ranges have two different comparators.

### isEndedBy

```typescript

isEndedBy(element: T): boolean
```

Checks whether this range ends with the specified element.

### isNaturalOrdering

```typescript

isNaturalOrdering(): boolean
```

Whether or not the Range is using the natural ordering of the elements.

Natural ordering uses an internal comparator implementation, thus this method is the only way to check if a null comparator was specified.

### isOverlappedBy

```typescript

isOverlappedBy(otherRange: Range<T>): boolean
```

Checks whether this range is overlapped by the specified range.

Two ranges overlap if there is at least one element in common.

This method may fail if the ranges have two different comparators.

### isStartedBy

```typescript

isStartedBy(element: T): boolean
```

Checks whether this range starts with the specified element.

### toString

```typescript

toString(): string
```

Gets the range as a string.

The format of the string is '[min..max]'.
