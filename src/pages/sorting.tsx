import axios from "axios";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardAction,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { recomendeddResolution } from "@/components/visualisers/Canvases";
import { useRef, useEffect, useState } from "react";
import type { SortingPageProps } from "./page_props";
import { ButtonGroup } from "@/components/ui/button-group";
import type { CanvasSort } from "@/components/visualisers/Canvases";
import type { BaseSortingLogic } from "@/logic/base";
import { InsertionSort } from "@/logic/sorting";
import { ChevronDown } from "lucide-react";
import { ImageViewer } from "@/components/custom/image_viewer";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
const randImageUrl = "http://localhost:3000/api/random-image";
const getImageData = async (url: string): Promise<Blob> => {
  try {
    const response = await axios.get<Blob>(url, {
      // 'blob' is essential for binary data like JPEGs in the browser
      responseType: "blob",
    });

    // This variable now holds your JPEG data
    const imageBlob: Blob = response.data;
    return imageBlob;
  } catch (error) {
    console.error("Error fetching image:", error);
    throw error;
  }
};

// fisher yates shuffling algorithim
function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export default function Sorting(props: SortingPageProps) {
  const [selectedImage, setSelectedImage] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [logic, setLogic] = useState<BaseSortingLogic>();
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [data, setData] = useState([]);
  const [isShuffled, setShuffled] = useState(false);
  const [canvasDim, setCanvasDim] = useState<{ height: number; width: number }>(
    recomendeddResolution.horizontal,
  );
  const [boxSize, setBoxSize] = useState([10]);
  const [stepSize, setStepSize] = useState([20]);
  const [isDialogueOpen, setDialogueOpen] = useState<boolean>(false);
  const visualiserRef = useRef<CanvasSort>(null);
  const logicRef = useRef<InsertionSort>(null);
  // callback function to get the selected image from the picker
  function getSelectedImage(path: string) {
    // good idea to highlight if there is a selected image
    // TODO: add highlighting to the selected image using the selected image variable
    setSelectedImage(path);
    setShuffled(false);
    setDialogueOpen(false);
  }

  async function sortImageFull() {
    if (logicRef.current && visualiserRef.current) {
      logicRef.current.sort(0);
      visualiserRef.current.setWeights(logicRef.current.data);
      requestAnimationFrame(async () => {
        if (visualiserRef.current) await visualiserRef.current.draw();
      });
    }
  }
  async function imageData(selectedImageUrl: string) {
    const data = await getImageData(selectedImageUrl);
    const img = new Image();
    const objectURL = URL.createObjectURL(data);
    try {
      await new Promise((resolve, reject) => {
        img.src = objectURL;
        img.onload = async () => {
          if (visualiserRef.current && canvasRef.current) {
            const weigts = await visualiserRef.current.setImageData(img);
            if (!logicRef.current) {
              logicRef.current = new props.logic(weigts);
            } else if (weigts) logicRef.current.reset(weigts);
            if (visualiserRef.current.imRes) {
              if (canvasRef.current.width !== visualiserRef.current.imRes.width) {
                canvasRef.current.height = visualiserRef.current.imRes.height;
                canvasRef.current.width = visualiserRef.current.imRes.width;
              }
              await visualiserRef.current.draw();
            }
          }
          resolve(img);
        };
        img.onerror = reject;
      });
    } catch (e) {
      console.error("Decoding failed", e);
    } finally {
      URL.revokeObjectURL(objectURL); // Always clean up memory
    }
  }

  // this effect is for when this component loads
  // supposed to load up visualiser and the sorting utils with data
  useEffect(() => {
    // initialise canvas
    const canvas = canvasRef.current;
    async function getInitialImage() {
      await imageData(randImageUrl);
    }
    // TODO: get some sort of error or loggimg message here
    if (!canvas) return;
    // default to horisontal resolution
    canvas.width = recomendeddResolution.horizontal.width;
    canvas.height = recomendeddResolution.horizontal.height;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    if (!visualiserRef.current && !logicRef.current) {
      visualiserRef.current = new props.visualiser(ctx);
      getInitialImage();
    }
    // const tmpLogic = new props.logic([])
    // prepare the data
  }, []);

  // when selected image changes
  useEffect(() => {
    async function updateImage() {
      await imageData(selectedImage);
    }
    updateImage();
  }, [selectedImage]);

  // when shuffled button is pressed and variable updated
  useEffect(() => {
    async function scrambleImage() {
      if (visualiserRef.current?.imWeights) {
        const shuffledWeights = shuffle(visualiserRef.current.imWeights);
        await visualiserRef.current.setWeights(shuffledWeights);
        await visualiserRef.current.draw();
      }
    }
    if (isShuffled == true) scrambleImage();
  }, [isShuffled]);
  return (
    <>
      <span>Sorting</span>
      <Card>
        <CardHeader>
          <CardTitle>Doing crazy stuff for once</CardTitle>
          <CardDescription>Lets Sort some stuff</CardDescription>
          <CardAction>
            <Dialog open={isDialogueOpen} onOpenChange={setDialogueOpen}>
              <DialogTrigger asChild onClick={() => setDialogueOpen(true)}>
                <Button variant="outline">Choose Image</Button>
                {/* Maybe we should add an animated shevron somewhere here */}
                {/* TODO: Add shevron to make it look cooler */}
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Select your dream image</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <ImageViewer cb={getSelectedImage}></ImageViewer>
                </div>
              </DialogContent>
            </Dialog>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row gap-3">
            <div className="m-2">
              <canvas ref={canvasRef}></canvas>
            </div>
            <div className="flex flex-col gap-2">
              <ButtonGroup className="mt-2 mb-2">
                <Button
                  variant={"outline"}
                  onClick={() => {
                    setShuffled(true);
                  }}
                >
                  <span>Shuffle Image</span>
                </Button>
                <Button variant={"outline"}>
                  <span>Next</span>
                </Button>
                <Button variant={"outline"} onClick={sortImageFull}>
                  <span>finish</span>
                </Button>
                <Button variant={"outline"}>
                  <span>animate</span>
                </Button>
              </ButtonGroup>
              <div className="mx-auto grid w-full max-w-xs gap-3">
                <div className="flex items-center justify-between gap-2">
                  <Label htmlFor="slider-demo-temperature">Box size</Label>
                  <span className="text-sm text-muted-foreground">{boxSize[0]}</span>
                </div>
                <Slider
                  id="slider-demo-temperature"
                  defaultValue={[10]}
                  value={boxSize}
                  onValueChange={setBoxSize}
                  min={10}
                  max={100}
                  step={10}
                />
              </div>
              <div className="mx-auto grid w-full max-w-xs gap-3">
                <div className="flex items-center justify-between gap-2">
                  <Label htmlFor="slider-step">Step size</Label>
                  <span className="text-sm text-muted-foreground">{stepSize[0]}</span>
                </div>
                <Slider
                  id="slider-step"
                  defaultValue={[20]}
                  value={stepSize}
                  onValueChange={setStepSize}
                  min={20}
                  max={200}
                  step={10}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
