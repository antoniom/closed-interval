import { Comparator } from './types'

const makeComparator =
  <T>() =>
  (v1: T, v2: T) => {
    if (v1 < v2) {
      return -1
    } else if (v1 > v2) {
      return 1
    } else {
      return 0
    }
  }

class Range<T> {
  protected minimum: T
  protected maximum: T
  protected comparator: Comparator<T>

  protected constructor(
    fromInclusive: T,
    toInclusive: T,
    private customComparator: Comparator<T> | null = null
  ) {
    this.comparator =
      customComparator === null ? makeComparator<T>() : customComparator

    if (this.comparator(fromInclusive, toInclusive) === -1) {
      this.minimum = fromInclusive
      this.maximum = toInclusive
    } else {
      this.minimum = toInclusive
      this.maximum = fromInclusive
    }
  }

  public static between<T>(
    fromInclusive: T,
    toInclusive: T,
    comparator: Comparator<T> | null = null
  ): Range<T> {
    return new Range(fromInclusive, toInclusive, comparator)
  }

  public static is<T>(
    element: T,
    comparator: Comparator<T> | null = null
  ): Range<T> {
    return Range.between(element, element, comparator)
  }

  public contains(element: T): boolean {
    return (
      this.comparator(this.minimum, element) <= 0 &&
      this.comparator(this.maximum, element) >= 0
    )
  }

  public containsRange(other: Range<T>): boolean {
    return (
      this.contains(other.getMinimum()) && this.contains(other.getMaximum())
    )
  }

  public elementCompareTo(element: T): -1 | 0 | 1 {
    if (this.comparator(this.minimum, element) === 1) {
      return -1
    }
    if (this.comparator(this.maximum, element) === -1) {
      return 1
    }
    return 0
  }

  public fit(element: T): T {
    if (this.elementCompareTo(element) === -1) {
      return this.minimum
    }
    if (this.elementCompareTo(element) === 1) {
      return this.maximum
    }
    return element
  }

  public getComparator(): Comparator<T> {
    return this.comparator
  }

  public getMaximum(): T {
    return this.maximum
  }

  public getMinimum(): T {
    return this.minimum
  }

  public intersectionWith(other: Range<T>): Range<T> {
    if (!this.isOverlappedBy(other)) {
      throw new Error(
        `Cannot calculate intersection with non-overlapping range ${other}`
      )
    }
    const min =
      this.getComparator()(this.minimum, other.getMinimum()) < 0
        ? other.getMinimum()
        : this.minimum
    const max =
      this.getComparator()(this.maximum, other.getMaximum()) < 0
        ? this.maximum
        : other.getMaximum()
    return Range.between(min, max, this.getComparator())
  }

  public isAfter(element: T): boolean {
    return this.comparator(element, this.minimum) < 0
  }

  public isAfterRange(otherRange: Range<T>): boolean {
    return this.isAfter(otherRange.getMaximum())
  }

  public isBefore(element: T): boolean {
    return this.comparator(element, this.maximum) > 0
  }

  public isBeforeRange(otherRange: Range<T>): boolean {
    return this.isBefore(otherRange.getMinimum())
  }

  public isEndedBy(element: T): boolean {
    return this.comparator(element, this.maximum) === 0
  }

  public isNaturalOrdering(): boolean {
    return this.customComparator === null
  }

  public isOverlappedBy(otherRange: Range<T>): boolean {
    return (
      otherRange.contains(this.minimum) ||
      otherRange.contains(this.maximum) ||
      this.contains(otherRange.getMinimum())
    )
  }

  public isStartedBy(element: T): boolean {
    return this.comparator(element, this.minimum) === 0
  }

  public toString(): string {
    return `[${this.minimum}..${this.maximum}]`
  }
}

export default Range
