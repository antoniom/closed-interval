import { Comparable, Comparator } from './types'

const makeComparator = <T>(): Comparator<T> => ({
  compare(o1, o2) {
    return o1.compareTo(o2)
  },
})

class Range<C extends Comparable<C>> {
  private minimum: C
  private maximum: C
  private comparator: Comparator<C>

  private constructor(
    fromInclusive: C,
    toInclusive: C,
    comp: Comparator<C> | null = null
  ) {
    this.comparator = comp === null ? makeComparator<C>() : comp

    if (this.comparator.compare(fromInclusive, toInclusive) === -1) {
      this.minimum = fromInclusive
      this.maximum = toInclusive
    } else {
      this.minimum = toInclusive
      this.maximum = fromInclusive
    }
  }

  public static between<C2 extends Comparable<C2>>(
    fromInclusive: C2,
    toInclusive: C2,
    comparator: Comparator<C2> | null = null
  ): Range<C2> {
    return new Range(fromInclusive, toInclusive, comparator)
  }

  public static is<C2 extends Comparable<C2>>(
    element: C2,
    comparator: Comparator<C2> | null = null
  ): Range<C2> {
    return Range.between(element, element, comparator)
  }

  public contains(element: C): boolean {
    return (
      this.comparator.compare(this.minimum, element) <= 0 &&
      this.comparator.compare(this.maximum, element) >= 0
    )
  }

  public containsRange(other: Range<C>): boolean {
    return (
      this.comparator.compare(this.minimum, other.getMinimum()) <= 0 &&
      this.comparator.compare(this.maximum, other.getMaximum()) >= 0
    )
  }

  public elementCompareTo(element: C): -1 | 0 | 1 {
    if (this.comparator.compare(this.minimum, element) === 1) {
      return -1
    }
    if (this.comparator.compare(this.maximum, element) === -1) {
      return 1
    }
    return 0
  }

  public fit(element: C): C {
    if (this.elementCompareTo(element) === -1) {
      return this.minimum
    }
    if (this.elementCompareTo(element) === 1) {
      return this.maximum
    }
    return element
  }

  public getMaximum(): C {
    return this.maximum
  }

  public getMinimum(): C {
    return this.minimum
  }

  public getComparator(): Comparator<C> {
    return this.comparator
  }

  public intersectionWith(other: Range<C>): Range<C> {
    if (!this.isOverlappedBy(other)) {
      throw new Error(
        `Cannot calculate intersection with non-overlapping range ${other}`
      )
    }
    const min =
      this.getComparator().compare(this.minimum, other.getMinimum()) < 0
        ? other.getMinimum()
        : this.minimum
    const max =
      this.getComparator().compare(this.maximum, other.getMaximum()) < 0
        ? this.maximum
        : other.getMaximum()
    return Range.between(min, max, this.getComparator())
  }

  public isAfter(element: C): boolean {
    return this.comparator.compare(element, this.minimum) < 0
  }

  public isAfterRange(otherRange: Range<C>): boolean {
    return this.isAfter(otherRange.getMaximum())
  }

  public isBefore(element: C): boolean {
    return this.comparator.compare(element, this.maximum) > 0
  }

  public isBeforeRange(otherRange: Range<C>): boolean {
    return this.isBefore(otherRange.getMinimum())
  }

  public isEndedBy(element: C): boolean {
    return this.comparator.compare(element, this.maximum) === 0
  }

  public isOverlappedBy(otherRange: Range<C>): boolean {
    return (
      otherRange.contains(this.minimum) ||
      otherRange.contains(this.maximum) ||
      this.contains(otherRange.getMinimum())
    )
  }

  public isStartedBy(element: C): boolean {
    return this.comparator.compare(element, this.minimum) === 0
  }

  public toString(): string {
    return `[${this.minimum}..${this.maximum}]`
  }
}

export default Range
