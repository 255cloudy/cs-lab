import { ScrollArea } from "../ui/scroll-area";
import { useEffect, useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import axios from "axios";
const imagesUrl = "http://localhost:3000/api/images";

type CustomImage = {
  name: string;
  original: string;
  thumbnail: string;
};
interface ImagViewerP {
  cb: (name: string) => void;
}
async function getImageUrls(url: string): Promise<CustomImage[]> {
  const res = await axios.get<CustomImage[]>(url);
  return res.data;
}

export function ImageViewer(props: ImagViewerP) {
  // use my own custom hook maybe
  const [images, setImages] = useState<CustomImage[]>([]);
  useEffect(() => {
    let isMounted = true;
    // apparently you cant just async on the useeffect function messes up
    // the cleanup return mechanisim
    const loadData = async () => {
      // im sure there is a better way to do this
      // TODO: Improve the building of the image data
      const fullDetails = await getImageUrls(imagesUrl);
      // To avoid writing stale data
      if (isMounted) {
        setImages([...fullDetails]);
      }
    };
    // call the function immediately interesting way to do async
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <>
      <ScrollArea className="h-96 w-full border-t p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {images.map((item) => (
            <div
              className="group space-y-2"
              key={item.name}
              onClick={() => props.cb(item.original)}
            >
              <div className="overflow-hidden rounded-lg">
                <AspectRatio ratio={16 / 9}>
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </AspectRatio>
                <p className="text-sm font-medium">{item.name}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </>
  );
}
