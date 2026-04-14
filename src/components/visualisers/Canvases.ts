// classes in ths file use canvases to visualise the specific type they are supposed to support 

// way to starnadise the classes for stuff that is common across all the classes that use canvases
export interface BaseCanvas {
    draw(): void
}

// used to visualise the sorting classes 
export class CanvasLinear implements BaseCanvas {
    // the 2d context of the canvas 
    // not sure how this will work with off canvas rendering  
    ctx: CanvasRenderingContext2D
    constructor(ctx: CanvasRenderingContext2D){
        this.ctx = ctx
    }
    draw(){}
}
// used to visualise the sorting classes 
export class CanvasGrid implements BaseCanvas {
    // the 2d context of the canvas 
    // not sure how this will work with off canvas rendering  
    ctx: CanvasRenderingContext2D
    constructor(ctx: CanvasRenderingContext2D){
        this.ctx = ctx
    }
    draw(){}
}

// used to visualise the sorting classes 
export class CanvasGraph implements BaseCanvas {
    // the 2d context of the canvas 
    // not sure how this will work with off canvas rendering  
    ctx: CanvasRenderingContext2D
    constructor(ctx: CanvasRenderingContext2D){
        this.ctx = ctx
    }
    draw(){}
}