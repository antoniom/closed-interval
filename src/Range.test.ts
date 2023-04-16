import Range from './Range'

describe('Testing Range class', () => {
  describe('testing with primitives', () => {
    describe('between() static method', () => {
      it('Sets the correct min/max when calling Range.between in the correct order', () => {
        const range = Range.between(5, 15)

        expect(range.getMinimum()).toEqual(5)
        expect(range.getMaximum()).toEqual(15)
      })

      it('Sets the correct min/max when calling Range.between in the opposite order', () => {
        const range = Range.between(15, 5)

        expect(range.getMinimum()).toEqual(5)
        expect(range.getMaximum()).toEqual(15)
      })
    })

    describe('is() static method', () => {
      it('Sets the correct min/max when calling Range.is', () => {
        const range = Range.is(5)

        expect(range.getMinimum()).toEqual(5)
        expect(range.getMaximum()).toEqual(5)
      })
    })

    describe('contains() mathod', () => {
      it('returns true when the passed value is in range', () => {
        const range = Range.between(15, 5)

        expect(range.contains(8)).toBe(true)
      })

      it('returns true when the passed value is in the upper edge of the range', () => {
        const range = Range.between(15, 5)

        expect(range.contains(15)).toBe(true)
      })

      it('returns true when the passed value is in the lower edge of the range', () => {
        const range = Range.between(15, 5)

        expect(range.contains(5)).toBe(true)
      })

      it('returns false when the passed value is out of range', () => {
        const range = Range.between(15, 5)

        expect(range.contains(4)).toBe(false)
      })
    })

    describe('containsRange() mathod', () => {
      it('returns true when the passed range is contained', () => {
        const range1 = Range.between(5, 15)

        const range2 = Range.between(8, 10)

        expect(range1.containsRange(range2)).toBe(true)
      })

      it('returns true when the passed range is contained and touches the minimum edge', () => {
        const range1 = Range.between(5, 15)

        const range2 = Range.between(5, 10)

        expect(range1.containsRange(range2)).toBe(true)
      })

      it('returns true when the passed range is contained and touches the maximum edge', () => {
        const range1 = Range.between(5, 15)

        const range2 = Range.between(14, 15)

        expect(range1.containsRange(range2)).toBe(true)
      })

      it('returns false when the passed range is completely out of the minimum edge', () => {
        const range1 = Range.between(5, 15)

        const range2 = Range.between(1, 3)

        expect(range1.containsRange(range2)).toBe(false)
      })

      it('returns false when the passed range is completely out of the maximum edge', () => {
        const range1 = Range.between(5, 15)

        const range2 = Range.between(21, 25)

        expect(range1.containsRange(range2)).toBe(false)
      })

      it('returns false when the passed range is overlapping', () => {
        const range1 = Range.between(5, 15)

        const range2 = Range.between(3, 25)

        expect(range1.containsRange(range2)).toBe(false)
      })

      it('returns false when the passed range is partially overlapping the minimum edge', () => {
        const range1 = Range.between(5, 15)

        const range2 = Range.between(3, 8)

        expect(range1.containsRange(range2)).toBe(false)
      })

      it('returns false when the passed range is partially overlapping the maximum edge', () => {
        const range1 = Range.between(5, 15)

        const range2 = Range.between(13, 18)

        expect(range1.containsRange(range2)).toBe(false)
      })
    })

    describe('elementCompareTo', () => {
      const range = Range.between(5, 15)
      it('returns -1 when the passed element is before the minimum edge', () => {
        expect(range.elementCompareTo(2)).toEqual(-1)
      })

      it('returns 0 when the passed element is at the minimum edge', () => {
        expect(range.elementCompareTo(5)).toEqual(0)
      })

      it('returns 0 when the passed element is in the range', () => {
        expect(range.elementCompareTo(9)).toEqual(0)
      })

      it('returns 0 when the passed element is at the maximum edge', () => {
        expect(range.elementCompareTo(15)).toEqual(0)
      })

      it('returns 1 when the passed element is after the maximum edge', () => {
        expect(range.elementCompareTo(17)).toEqual(1)
      })
    })

    describe('fit', () => {
      const range = Range.between(5, 15)
      it('returns range minimum when the passed element is before the minimum edge', () => {
        expect(range.fit(2)).toEqual(5)
      })

      it('returns range minimum when the passed element is at the minimum edge', () => {
        expect(range.fit(5)).toEqual(5)
      })

      it('returns the element itself when in the range', () => {
        expect(range.fit(9)).toEqual(9)
      })

      it('returns range maximum when the passed element is at the maximum edge', () => {
        expect(range.fit(15)).toEqual(15)
      })

      it('returns range maximum when the passed element is after the maximum edge', () => {
        expect(range.fit(17)).toEqual(15)
      })
    })

    describe('intersectionWith', () => {
      const range = Range.between(5, 15)

      it('throws an exception when there is no overlapping (minimum edge)', () => {
        const otherRange = Range.between(0, 3)
        expect(() => range.intersectionWith(otherRange)).toThrow()
      })

      it('returns a range when the minimum edge of the range meets the maximum edge of the passed range', () => {
        const otherRange = Range.between(0, 5)
        const newRange = range.intersectionWith(otherRange)

        expect(newRange.getMinimum()).toBe(5)
        expect(newRange.getMaximum()).toBe(5)
      })

      it('returns a range when the range partially contains the passed range (minimum edge)', () => {
        const otherRange = Range.between(0, 8)
        const newRange = range.intersectionWith(otherRange)

        expect(newRange.getMinimum()).toBe(5)
        expect(newRange.getMaximum()).toBe(8)
      })

      it('returns a range when the range contains the passed range', () => {
        const otherRange = Range.between(6, 8)
        const newRange = range.intersectionWith(otherRange)

        expect(newRange.getMinimum()).toBe(6)
        expect(newRange.getMaximum()).toBe(8)
      })

      it('returns a range when the range partially contains the passed range (maximum edge)', () => {
        const otherRange = Range.between(6, 18)
        const newRange = range.intersectionWith(otherRange)

        expect(newRange.getMinimum()).toBe(6)
        expect(newRange.getMaximum()).toBe(15)
      })

      it('returns a range when the maximum edge of the range meets the minimum edge of the passed range', () => {
        const otherRange = Range.between(15, 15)
        const newRange = range.intersectionWith(otherRange)

        expect(newRange.getMinimum()).toBe(15)
        expect(newRange.getMaximum()).toBe(15)
      })

      it('throws an exception when there is no overlapping (maximum edge)', () => {
        const otherRange = Range.between(17, 18)
        expect(() => range.intersectionWith(otherRange)).toThrow()
      })

      it('returns a range when the range is contained in the passed range', () => {
        const otherRange = Range.between(1, 18)
        const newRange = range.intersectionWith(otherRange)

        expect(newRange.getMinimum()).toBe(5)
        expect(newRange.getMaximum()).toBe(15)
      })
    })

    describe('isAfter', () => {
      const range = Range.between(5, 15)
      it('returns true when the range is after the passed element', () => {
        expect(range.isAfter(2)).toBe(true)
      })

      it('returns false when the minimum edge of the range equals the passed element', () => {
        expect(range.isAfter(5)).toBe(false)
      })

      it('returns false when the range contains the passed element', () => {
        expect(range.isAfter(9)).toBe(false)
      })

      it('returns false when the maximum edge of the range equals the passed element', () => {
        expect(range.isAfter(15)).toBe(false)
      })

      it('returns false when the range is before the passed element', () => {
        expect(range.isAfter(17)).toBe(false)
      })
    })

    describe('isAfterRange', () => {
      const range = Range.between(5, 15)
      it('returns true when the range is after the passed range', () => {
        const otherRange = Range.between(0, 3)
        expect(range.isAfterRange(otherRange)).toBe(true)
      })

      it('returns false when the minimum edge of the range meets the maximum edge of the passed range', () => {
        const otherRange = Range.between(0, 5)
        expect(range.isAfterRange(otherRange)).toBe(false)
      })

      it('returns false when the range partially contains the passed range (minimum edge)', () => {
        const otherRange = Range.between(0, 8)
        expect(range.isAfterRange(otherRange)).toBe(false)
      })

      it('returns false when the range contains the passed range', () => {
        const otherRange = Range.between(6, 8)
        expect(range.isAfterRange(otherRange)).toBe(false)
      })

      it('returns false when the range partially contains the passed range (maximum edge)', () => {
        const otherRange = Range.between(6, 18)
        expect(range.isAfterRange(otherRange)).toBe(false)
      })

      it('returns false when the maximum edge of the range meets the minimum edge of the passed range', () => {
        const otherRange = Range.between(15, 18)
        expect(range.isAfterRange(otherRange)).toBe(false)
      })

      it('returns false when the range is before the passed range', () => {
        const otherRange = Range.between(17, 18)
        expect(range.isAfterRange(otherRange)).toBe(false)
      })
    })

    describe('isBefore', () => {
      const range = Range.between(5, 15)
      it('returns false when the range is after the passed element', () => {
        expect(range.isBefore(2)).toBe(false)
      })

      it('returns false when the minimum edge of the range equals the passed element', () => {
        expect(range.isBefore(5)).toBe(false)
      })

      it('returns false when the range contains the passed element', () => {
        expect(range.isBefore(9)).toBe(false)
      })

      it('returns false when the maximum edge of the range equals the passed element', () => {
        expect(range.isBefore(15)).toBe(false)
      })

      it('returns true when the range is before the passed element', () => {
        expect(range.isBefore(17)).toBe(true)
      })
    })

    describe('isBeforeRange', () => {
      const range = Range.between(5, 15)
      it('returns false when the range is after the passed range', () => {
        const otherRange = Range.between(0, 3)
        expect(range.isBeforeRange(otherRange)).toBe(false)
      })

      it('returns false when the minimum edge of the range meets the maximum edge of the passed range', () => {
        const otherRange = Range.between(0, 5)
        expect(range.isBeforeRange(otherRange)).toBe(false)
      })

      it('returns false when the range partially contains the passed range (minimum edge)', () => {
        const otherRange = Range.between(0, 8)
        expect(range.isBeforeRange(otherRange)).toBe(false)
      })

      it('returns false when the range contains the passed range', () => {
        const otherRange = Range.between(6, 8)
        expect(range.isBeforeRange(otherRange)).toBe(false)
      })

      it('returns false when the range partially contains the passed range (maximum edge)', () => {
        const otherRange = Range.between(6, 18)
        expect(range.isBeforeRange(otherRange)).toBe(false)
      })

      it('returns false when the maximum edge of the range meets the minimum edge of the passed range', () => {
        const otherRange = Range.between(15, 18)
        expect(range.isBeforeRange(otherRange)).toBe(false)
      })

      it('returns true when the range is before the passed range', () => {
        const otherRange = Range.between(17, 18)
        expect(range.isBeforeRange(otherRange)).toBe(true)
      })
    })

    describe('isEndedBy', () => {
      const range = Range.between(5, 15)
      it('returns false when the passed element is before the range', () => {
        expect(range.isEndedBy(2)).toBe(false)
      })

      it('returns false when the minimum edge of the range equals the passed element', () => {
        expect(range.isEndedBy(5)).toBe(false)
      })

      it('returns false when the passed element is contained in the range', () => {
        expect(range.isEndedBy(9)).toBe(false)
      })

      it('returns true when the maximum edge of the range equals the passed element', () => {
        expect(range.isEndedBy(15)).toBe(true)
      })

      it('returns false when the passed element is after the range', () => {
        expect(range.isEndedBy(17)).toBe(false)
      })
    })

    describe('isOverlappedBy', () => {
      const range = Range.between(5, 15)
      it('returns false when the range is after the passed range', () => {
        const otherRange = Range.between(0, 3)
        expect(range.isOverlappedBy(otherRange)).toBe(false)
      })

      it('returns true when the minimum edge of the range meets the maximum edge of the passed range', () => {
        const otherRange = Range.between(0, 5)
        expect(range.isOverlappedBy(otherRange)).toBe(true)
      })

      it('returns true when the range partially contains the passed range (minimum edge)', () => {
        const otherRange = Range.between(0, 8)
        expect(range.isOverlappedBy(otherRange)).toBe(true)
      })

      it('returns true when the range contains the passed range', () => {
        const otherRange = Range.between(6, 8)
        expect(range.isOverlappedBy(otherRange)).toBe(true)
      })

      it('returns true when the range partially contains the passed range (maximum edge)', () => {
        const otherRange = Range.between(6, 18)
        expect(range.isOverlappedBy(otherRange)).toBe(true)
      })

      it('returns true when the maximum edge of the range meets the minimum edge of the passed range', () => {
        const otherRange = Range.between(15, 18)
        expect(range.isOverlappedBy(otherRange)).toBe(true)
      })

      it('returns false when the range is before the passed range', () => {
        const otherRange = Range.between(17, 18)
        expect(range.isOverlappedBy(otherRange)).toBe(false)
      })
    })

    describe('isStartedBy', () => {
      const range = Range.between(5, 15)
      it('returns false when the passed element is before the range', () => {
        expect(range.isStartedBy(2)).toBe(false)
      })

      it('returns true when the minimum edge of the range equals the passed element', () => {
        expect(range.isStartedBy(5)).toBe(true)
      })

      it('returns false when the passed element is contained in the range', () => {
        expect(range.isStartedBy(9)).toBe(false)
      })

      it('returns false when the maximum edge of the range equals the passed element', () => {
        expect(range.isStartedBy(15)).toBe(false)
      })

      it('returns false when the passed element is after the range', () => {
        expect(range.isStartedBy(17)).toBe(false)
      })
    })

    describe('toString', () => {
      const range = Range.between(5, 15)
      it('returns a bracketed string containing the range edges', () => {
        expect(range.toString()).toEqual('[5..15]')
      })
    })
  })
})
