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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function countMatchingPixels(
  img1: Uint8ClampedArray | number[],
  img2: Uint8ClampedArray | number[],
): number {
  let matchingPixels = 0;

  // We use the length of the shorter array, ensuring we only check complete pixels
  const length = Math.min(img1.length, img2.length);

  // Increment by 4 to jump to the start of the next pixel
  for (let i = 0; i < length; i += 4) {
    const rMatch = img1[i] === img2[i];
    const gMatch = img1[i + 1] === img2[i + 1];
    const bMatch = img1[i + 2] === img2[i + 2];
    const aMatch = img1[i + 3] === img2[i + 3];

    if (rMatch && gMatch && bMatch && aMatch) {
      matchingPixels++;
    }
  }

  return matchingPixels;
}
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
  imWeights: number[] | undefined;
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
    return this._generateWeights();
    // figure out whre the data starts and ends
  }
  // all this functio  n does is draw the images in the canvas
  async draw() {
    if (this.imBitmap) {
      console.log("bitmap ok ");
      this.ctx.drawImage(this.imBitmap, 0, 0);
    }
    // TODO : do some error reporting or logging
  }
  //   probbably a function ill use once when i load the image
  _generateWeights() {
    if (this.imArray) {
      const arrayLen = this.imArray?.length / 4;
      const weights = Array.from({ length: arrayLen }, (_, i) => i);
      this.imWeights = weights;
      return weights;
    }
  }
  //   this function will wnsure that when the array is reset a new bitmap image will be setup to make sure that the correct thing is drawn to the screen
  async setArray(newArray: Uint8ClampedArray) {
    if (newArray.length !== this.imArray?.length) {
      //raise some error
      // TODO: add a custom error to deal with this mismatch in length
      console.error("array provided incompatible");
      return;
    }
    // update the bitmap
    if (this.imBitmap) {
      const newImageData = new ImageData(newArray, this.imBitmap.width, this.imBitmap.height);
      this.imBitmap = await createImageBitmap(newImageData);
      this.imArray = newArray;
    }
  }
  //   this is the function that will get the new weights pixel data and reorganise the image array
  async setWeights(newWeights: number[]) {
    // check that the weights are consistent with the data of our image
    if (this.imArray && this.imWeights) {
      // check the indeces are correct
      if (newWeights.length === this.imWeights.length) {
        const tmpArray: Uint8ClampedArray = new Uint8ClampedArray(this.imArray.length);
        const src32 = new Uint32Array(this.imArray.buffer);
        const dest32 = new Uint32Array(tmpArray.buffer);
        for (let i = 0; i < newWeights.length; i++) {
          const newPxLoc = newWeights[i];
          const currPxLoc = this.imWeights[i];
          dest32[newPxLoc] = src32[currPxLoc];
          // console.log(`shifted ${newPxLoc} from ${currPxLoc}`);
        }
        // do this last ??
        this.imWeights = newWeights;
        await this.setArray(tmpArray);
      }
    }
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
