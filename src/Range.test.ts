import Range from './Range'
import { Comparable } from './types'

describe('Testing Range class', () => {
  class Num implements Comparable<Num> {
    constructor(private value: number) {}

    getValue() {
      return this.value
    }

    compareTo(n: Num) {
      if (n.getValue() > this.value) {
        return -1
      } else if (n.getValue() < this.value) {
        return 1
      } else {
        return 0
      }
    }

    toString() {
      return this.value
    }
  }

  describe('between() static method', () => {
    it('Sets the correct min/max when calling Range.between in the correct order', () => {
      const range = Range.between(new Num(5), new Num(15))

      expect(range.getMinimum().getValue()).toEqual(5)
      expect(range.getMaximum().getValue()).toEqual(15)
    })

    it('Sets the correct min/max when calling Range.between in the opposite order', () => {
      const range = Range.between(new Num(15), new Num(5))

      expect(range.getMinimum().getValue()).toEqual(5)
      expect(range.getMaximum().getValue()).toEqual(15)
    })
  })

  describe('is() static method', () => {
    it('Sets the correct min/max when calling Range.is', () => {
      const range = Range.is(new Num(5))

      expect(range.getMinimum().getValue()).toEqual(5)
      expect(range.getMaximum().getValue()).toEqual(5)
    })
  })

  describe('contains() mathod', () => {
    it('returns true when the passed value is in range', () => {
      const range = Range.between(new Num(15), new Num(5))

      expect(range.contains(new Num(8))).toBe(true)
    })

    it('returns true when the passed value is in the upper edge of the range', () => {
      const range = Range.between(new Num(15), new Num(5))

      expect(range.contains(new Num(15))).toBe(true)
    })

    it('returns true when the passed value is in the lower edge of the range', () => {
      const range = Range.between(new Num(15), new Num(5))

      expect(range.contains(new Num(5))).toBe(true)
    })

    it('returns false when the passed value is out of range', () => {
      const range = Range.between(new Num(15), new Num(5))

      expect(range.contains(new Num(4))).toBe(false)
    })
  })

  describe('containsRange() mathod', () => {
    it('returns true when the passed range is contained', () => {
      const range1 = Range.between(new Num(5), new Num(15))

      const range2 = Range.between(new Num(8), new Num(10))

      expect(range1.containsRange(range2)).toBe(true)
    })

    it('returns true when the passed range is contained and touches the minimum edge', () => {
      const range1 = Range.between(new Num(5), new Num(15))

      const range2 = Range.between(new Num(5), new Num(10))

      expect(range1.containsRange(range2)).toBe(true)
    })

    it('returns true when the passed range is contained and touches the maximum edge', () => {
      const range1 = Range.between(new Num(5), new Num(15))

      const range2 = Range.between(new Num(14), new Num(15))

      expect(range1.containsRange(range2)).toBe(true)
    })

    it('returns false when the passed range is completely out of the minimum edge', () => {
      const range1 = Range.between(new Num(5), new Num(15))

      const range2 = Range.between(new Num(1), new Num(3))

      expect(range1.containsRange(range2)).toBe(false)
    })

    it('returns false when the passed range is completely out of the maximum edge', () => {
      const range1 = Range.between(new Num(5), new Num(15))

      const range2 = Range.between(new Num(21), new Num(25))

      expect(range1.containsRange(range2)).toBe(false)
    })

    it('returns false when the passed range is overlapping', () => {
      const range1 = Range.between(new Num(5), new Num(15))

      const range2 = Range.between(new Num(3), new Num(25))

      expect(range1.containsRange(range2)).toBe(false)
    })

    it('returns false when the passed range is partially overlapping the minimum edge', () => {
      const range1 = Range.between(new Num(5), new Num(15))

      const range2 = Range.between(new Num(3), new Num(8))

      expect(range1.containsRange(range2)).toBe(false)
    })

    it('returns false when the passed range is partially overlapping the maximum edge', () => {
      const range1 = Range.between(new Num(5), new Num(15))

      const range2 = Range.between(new Num(13), new Num(18))

      expect(range1.containsRange(range2)).toBe(false)
    })
  })

  describe('elementCompareTo', () => {
    const range = Range.between(new Num(5), new Num(15))
    it('returns -1 when the passed element is before the minimum edge', () => {
      expect(range.elementCompareTo(new Num(2))).toEqual(-1)
    })

    it('returns 0 when the passed element is at the minimum edge', () => {
      expect(range.elementCompareTo(new Num(5))).toEqual(0)
    })

    it('returns 0 when the passed element is in the range', () => {
      expect(range.elementCompareTo(new Num(9))).toEqual(0)
    })

    it('returns 0 when the passed element is at the maximum edge', () => {
      expect(range.elementCompareTo(new Num(15))).toEqual(0)
    })

    it('returns 1 when the passed element is after the maximum edge', () => {
      expect(range.elementCompareTo(new Num(17))).toEqual(1)
    })
  })

  describe('fit', () => {
    const range = Range.between(new Num(5), new Num(15))
    it('returns range minimum when the passed element is before the minimum edge', () => {
      expect(range.fit(new Num(2)).getValue()).toEqual(5)
    })

    it('returns range minimum when the passed element is at the minimum edge', () => {
      expect(range.fit(new Num(5)).getValue()).toEqual(5)
    })

    it('returns the element itself when in the range', () => {
      expect(range.fit(new Num(9)).getValue()).toEqual(9)
    })

    it('returns range maximum when the passed element is at the maximum edge', () => {
      expect(range.fit(new Num(15)).getValue()).toEqual(15)
    })

    it('returns range maximum when the passed element is after the maximum edge', () => {
      expect(range.fit(new Num(17)).getValue()).toEqual(15)
    })
  })

  describe('intersectionWith', () => {
    const range = Range.between(new Num(5), new Num(15))

    it('throws an exception when there is no overlapping (minimum edge)', () => {
      const otherRange = Range.between(new Num(0), new Num(3))
      expect(() => range.intersectionWith(otherRange)).toThrow()
    })

    it('returns a range when the minimum edge of the range meets the maximum edge of the passed range', () => {
      const otherRange = Range.between(new Num(0), new Num(5))
      const newRange = range.intersectionWith(otherRange)

      expect(newRange.getMinimum().getValue()).toBe(5)
      expect(newRange.getMaximum().getValue()).toBe(5)
    })

    it('returns a range when the range partially contains the passed range (minimum edge)', () => {
      const otherRange = Range.between(new Num(0), new Num(8))
      const newRange = range.intersectionWith(otherRange)

      expect(newRange.getMinimum().getValue()).toBe(5)
      expect(newRange.getMaximum().getValue()).toBe(8)
    })

    it('returns a range when the range contains the passed range', () => {
      const otherRange = Range.between(new Num(6), new Num(8))
      const newRange = range.intersectionWith(otherRange)

      expect(newRange.getMinimum().getValue()).toBe(6)
      expect(newRange.getMaximum().getValue()).toBe(8)
    })

    it('returns a range when the range partially contains the passed range (maximum edge)', () => {
      const otherRange = Range.between(new Num(6), new Num(18))
      const newRange = range.intersectionWith(otherRange)

      expect(newRange.getMinimum().getValue()).toBe(6)
      expect(newRange.getMaximum().getValue()).toBe(15)
    })

    it('returns a range when the maximum edge of the range meets the minimum edge of the passed range', () => {
      const otherRange = Range.between(new Num(15), new Num(15))
      const newRange = range.intersectionWith(otherRange)

      expect(newRange.getMinimum().getValue()).toBe(15)
      expect(newRange.getMaximum().getValue()).toBe(15)
    })

    it('throws an exception when there is no overlapping (maximum edge)', () => {
      const otherRange = Range.between(new Num(17), new Num(18))
      expect(() => range.intersectionWith(otherRange)).toThrow()
    })

    it('returns a range when the range is contained in the passed range', () => {
      const otherRange = Range.between(new Num(1), new Num(18))
      const newRange = range.intersectionWith(otherRange)

      expect(newRange.getMinimum().getValue()).toBe(5)
      expect(newRange.getMaximum().getValue()).toBe(15)
    })
  })

  describe('isAfter', () => {
    const range = Range.between(new Num(5), new Num(15))
    it('returns true when the range is after the passed element', () => {
      expect(range.isAfter(new Num(2))).toBe(true)
    })

    it('returns false when the minimum edge of the range equals the passed element', () => {
      expect(range.isAfter(new Num(5))).toBe(false)
    })

    it('returns false when the range contains the passed element', () => {
      expect(range.isAfter(new Num(9))).toBe(false)
    })

    it('returns false when the maximum edge of the range equals the passed element', () => {
      expect(range.isAfter(new Num(15))).toBe(false)
    })

    it('returns false when the range is before the passed element', () => {
      expect(range.isAfter(new Num(17))).toBe(false)
    })
  })

  describe('isAfterRange', () => {
    const range = Range.between(new Num(5), new Num(15))
    it('returns true when the range is after the passed range', () => {
      const otherRange = Range.between(new Num(0), new Num(3))
      expect(range.isAfterRange(otherRange)).toBe(true)
    })

    it('returns false when the minimum edge of the range meets the maximum edge of the passed range', () => {
      const otherRange = Range.between(new Num(0), new Num(5))
      expect(range.isAfterRange(otherRange)).toBe(false)
    })

    it('returns false when the range partially contains the passed range (minimum edge)', () => {
      const otherRange = Range.between(new Num(0), new Num(8))
      expect(range.isAfterRange(otherRange)).toBe(false)
    })

    it('returns false when the range contains the passed range', () => {
      const otherRange = Range.between(new Num(6), new Num(8))
      expect(range.isAfterRange(otherRange)).toBe(false)
    })

    it('returns false when the range partially contains the passed range (maximum edge)', () => {
      const otherRange = Range.between(new Num(6), new Num(18))
      expect(range.isAfterRange(otherRange)).toBe(false)
    })

    it('returns false when the maximum edge of the range meets the minimum edge of the passed range', () => {
      const otherRange = Range.between(new Num(15), new Num(18))
      expect(range.isAfterRange(otherRange)).toBe(false)
    })

    it('returns false when the range is before the passed range', () => {
      const otherRange = Range.between(new Num(17), new Num(18))
      expect(range.isAfterRange(otherRange)).toBe(false)
    })
  })

  describe('isBefore', () => {
    const range = Range.between(new Num(5), new Num(15))
    it('returns false when the range is after the passed element', () => {
      expect(range.isBefore(new Num(2))).toBe(false)
    })

    it('returns false when the minimum edge of the range equals the passed element', () => {
      expect(range.isBefore(new Num(5))).toBe(false)
    })

    it('returns false when the range contains the passed element', () => {
      expect(range.isBefore(new Num(9))).toBe(false)
    })

    it('returns false when the maximum edge of the range equals the passed element', () => {
      expect(range.isBefore(new Num(15))).toBe(false)
    })

    it('returns true when the range is before the passed element', () => {
      expect(range.isBefore(new Num(17))).toBe(true)
    })
  })

  describe('isBeforeRange', () => {
    const range = Range.between(new Num(5), new Num(15))
    it('returns false when the range is after the passed range', () => {
      const otherRange = Range.between(new Num(0), new Num(3))
      expect(range.isBeforeRange(otherRange)).toBe(false)
    })

    it('returns false when the minimum edge of the range meets the maximum edge of the passed range', () => {
      const otherRange = Range.between(new Num(0), new Num(5))
      expect(range.isBeforeRange(otherRange)).toBe(false)
    })

    it('returns false when the range partially contains the passed range (minimum edge)', () => {
      const otherRange = Range.between(new Num(0), new Num(8))
      expect(range.isBeforeRange(otherRange)).toBe(false)
    })

    it('returns false when the range contains the passed range', () => {
      const otherRange = Range.between(new Num(6), new Num(8))
      expect(range.isBeforeRange(otherRange)).toBe(false)
    })

    it('returns false when the range partially contains the passed range (maximum edge)', () => {
      const otherRange = Range.between(new Num(6), new Num(18))
      expect(range.isBeforeRange(otherRange)).toBe(false)
    })

    it('returns false when the maximum edge of the range meets the minimum edge of the passed range', () => {
      const otherRange = Range.between(new Num(15), new Num(18))
      expect(range.isBeforeRange(otherRange)).toBe(false)
    })

    it('returns true when the range is before the passed range', () => {
      const otherRange = Range.between(new Num(17), new Num(18))
      expect(range.isBeforeRange(otherRange)).toBe(true)
    })
  })

  describe('isEndedBy', () => {
    const range = Range.between(new Num(5), new Num(15))
    it('returns false when the passed element is before the range', () => {
      expect(range.isEndedBy(new Num(2))).toBe(false)
    })

    it('returns false when the minimum edge of the range equals the passed element', () => {
      expect(range.isEndedBy(new Num(5))).toBe(false)
    })

    it('returns false when the passed element is contained in the range', () => {
      expect(range.isEndedBy(new Num(9))).toBe(false)
    })

    it('returns true when the maximum edge of the range equals the passed element', () => {
      expect(range.isEndedBy(new Num(15))).toBe(true)
    })

    it('returns false when the passed element is after the range', () => {
      expect(range.isEndedBy(new Num(17))).toBe(false)
    })
  })

  describe('isOverlappedBy', () => {
    const range = Range.between(new Num(5), new Num(15))
    it('returns false when the range is after the passed range', () => {
      const otherRange = Range.between(new Num(0), new Num(3))
      expect(range.isOverlappedBy(otherRange)).toBe(false)
    })

    it('returns true when the minimum edge of the range meets the maximum edge of the passed range', () => {
      const otherRange = Range.between(new Num(0), new Num(5))
      expect(range.isOverlappedBy(otherRange)).toBe(true)
    })

    it('returns true when the range partially contains the passed range (minimum edge)', () => {
      const otherRange = Range.between(new Num(0), new Num(8))
      expect(range.isOverlappedBy(otherRange)).toBe(true)
    })

    it('returns true when the range contains the passed range', () => {
      const otherRange = Range.between(new Num(6), new Num(8))
      expect(range.isOverlappedBy(otherRange)).toBe(true)
    })

    it('returns true when the range partially contains the passed range (maximum edge)', () => {
      const otherRange = Range.between(new Num(6), new Num(18))
      expect(range.isOverlappedBy(otherRange)).toBe(true)
    })

    it('returns true when the maximum edge of the range meets the minimum edge of the passed range', () => {
      const otherRange = Range.between(new Num(15), new Num(18))
      expect(range.isOverlappedBy(otherRange)).toBe(true)
    })

    it('returns false when the range is before the passed range', () => {
      const otherRange = Range.between(new Num(17), new Num(18))
      expect(range.isOverlappedBy(otherRange)).toBe(false)
    })
  })

  describe('isStartedBy', () => {
    const range = Range.between(new Num(5), new Num(15))
    it('returns false when the passed element is before the range', () => {
      expect(range.isStartedBy(new Num(2))).toBe(false)
    })

    it('returns true when the minimum edge of the range equals the passed element', () => {
      expect(range.isStartedBy(new Num(5))).toBe(true)
    })

    it('returns false when the passed element is contained in the range', () => {
      expect(range.isStartedBy(new Num(9))).toBe(false)
    })

    it('returns false when the maximum edge of the range equals the passed element', () => {
      expect(range.isStartedBy(new Num(15))).toBe(false)
    })

    it('returns false when the passed element is after the range', () => {
      expect(range.isStartedBy(new Num(17))).toBe(false)
    })
  })

  describe('toString', () => {
    const range = Range.between(new Num(5), new Num(15))
    it('returns a bracketed string containing the range edges', () => {
      expect(range.toString()).toEqual('[5..15]')
    })
  })
})
