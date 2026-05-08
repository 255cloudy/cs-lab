import type { BaseSortingLogic } from "./base";

export class InsertionSort implements BaseSortingLogic {
  data: number[];
  constructor(ndarray: number[]) {
    this.data = ndarray;
  }
  result() {
    return [];
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
