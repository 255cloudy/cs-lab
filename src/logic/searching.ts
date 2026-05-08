import type { BaseSearchinLogic } from "./base";

export class BinarySearch implements BaseSearchinLogic {
  data: number[];
  constructor(data: number[]) {
    this.data = data;
  }
  get() {
    return [];
  }
}
export class BreadthFirstSearch implements BaseSearchinLogic {
  data: number[];
  constructor(data: number[]) {
    this.data = data;
  }
  get() {
    return [];
  }
}
export class DepthFirstSearch implements BaseSearchinLogic {
  data: number[];
  constructor(data: number[]) {
    this.data = data;
  }
  get() {
    return [];
  }
}
