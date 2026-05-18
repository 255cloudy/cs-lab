import type { BaseSortingLogic } from "./base";

export function isSorted(arr: number[]) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) return false;
  }
  return true;
}

export class InsertionSort implements BaseSortingLogic {
  data: number[];
  swaps: number;
  constructor(ndarray: number[]) {
    this.data = ndarray;
    this.swaps = 0;
  }
  // reset the stuff in the data
  reset(ndarray: number[]) {
    this.data = ndarray;
    this.swaps = 0;
  }
  // classic swap
  swap(index1: number, index2: number) {
    const tmp = this.data[index1];
    this.data[index1] = this.data[index2];
    this.data[index2] = tmp;
    this.swaps++;
  }

  // this is a possible infinite loop if not careful
  sort(steps: number) {
    const limit = steps === 0 ? this.data.length : steps;
    for (let i = 0; i < limit; i++) {
      for (let j = 1; j > 0; j--) {
        if (this.data[i] > this.data[j]) this.swap(i, j);
      }
    }
    return this.data;
  }
}

export class selectionSort implements BaseSortingLogic {
  data: number[];
  constructor(ndarray: number[]) {
    this.data = ndarray;
  }
  result() {
    return [];
  }
}
