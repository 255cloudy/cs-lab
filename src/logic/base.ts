export interface BaseSortingLogic {
  data: number[];
  swaps: number;
  sort(steps: number): number[];
  // reset the stuff in the data
  reset(ndarray: number[]): void;
  // classic swap
  swap(index1: number, index2: number): void;
}
export interface BaseSearchinLogic {
  get(): number[];
}
export interface BasePathFindingLogic {
  path(): number[];
}
