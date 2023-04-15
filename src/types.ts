export interface Comparable<T> {
  compareTo(x: Comparable<T>): -1 | 0 | 1
}

export interface Comparator<T> {
  compare(o1: Comparable<T>, o2: Comparable<T>): -1 | 0 | 1
}

export type AcceptableTypes<T> = T extends number | string ? T : Comparable<T>
