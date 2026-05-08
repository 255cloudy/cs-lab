// classes in ths file use canvases to visualise the specific type they are supposed to support

// way to starnadise the classes for stuff that is common across all the classes that use canvases
export interface BaseCanvas {
  draw(): void;
}
interface resolution {
  width: number;
  height: number;
}
export const recomendeddResolution = {
  horizontal: {
    width: 600,
    height: 400,
  },
  vertical: {
    width: 480,
    height: 600,
  },
};
// used to visualise the sorting classes
export class CanvasSort implements BaseCanvas {
  // the 2d context of the canvas
  // not sure how this will work with off canvas rendering
  ctx: CanvasRenderingContext2D;
  imData: HTMLImageElement | undefined;
  imRes: resolution | undefined;
  imBitmap: ImageBitmap | undefined;
  imArray: Uint8ClampedArray | undefined;
  blockSize: number;
  constructor(ctx: CanvasRenderingContext2D, blockSize: number) {
    this.ctx = ctx;
    this.blockSize = blockSize;
  }

  _getImgArray(): Uint8ClampedArray | undefined {
    if (this.imRes !== undefined && this.imBitmap !== undefined) {
      const tmpCanvas = new OffscreenCanvas(this.imRes?.width, this.imRes?.height);
      const ctx = tmpCanvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(this.imBitmap, 0, 0);
        const imDtArr = ctx.getImageData(0, 0, tmpCanvas.width, tmpCanvas.height);
        return imDtArr.data;
      }
    }
  }

  async setImageData(imageData: HTMLImageElement) {
    this.imData = imageData;
    this.imRes =
      this.imData.naturalWidth > this.imData.height
        ? recomendeddResolution.horizontal
        : recomendeddResolution.vertical;
    // close to remove it from memory
    // resize the image based on the width and heigh
    this.imBitmap = await createImageBitmap(this.imData, {
      resizeHeight: this.imRes.height,
      resizeWidth: this.imRes.width,
      resizeQuality: "high",
    });

    this.imArray = this._getImgArray();
    // figure out whre the data starts and ends
  }
  // all this functio  n does is draw the images in the canvas
  async draw() {
    if (this.imBitmap) {
      this.ctx.drawImage(this.imBitmap, 0, 0);
      console.log(
        `currHeight : ${this.ctx.getImageData(0, 0, this.imBitmap.width, this.imBitmap.height).height}`,
      );
    }
    // TODO : do some error reporting or logging
  }
}
// used to visualise the sorting classes
export class CanvasGrid implements BaseCanvas {
  // the 2d context of the canvas
  // not sure how this will work with off canvas rendering
  ctx: CanvasRenderingContext2D;
  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }
  draw() {}
}

// used to visualise the sorting classes
export class CanvasGraph implements BaseCanvas {
  // the 2d context of the canvas
  // not sure how this will work with off canvas rendering
  ctx: CanvasRenderingContext2D;
  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }
  draw() {}
}
