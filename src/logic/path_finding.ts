import type { BasePathFindingLogic } from "./base";

export class AStar implements BasePathFindingLogic {
    data: number[]
    constructor(dt:[]){
        this.data = dt
    }
    path(){return[]}
}
