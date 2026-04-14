import { Card, CardDescription, CardHeader, CardTitle, CardAction, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRef, useEffect, useState } from "react"
import type { PageProps } from "./page_props"
import { ButtonGroup } from "@/components/ui/button-group"
import type { BaseCanvas } from "@/components/visualisers/Canvases"
import type { BaseSearchinLogic, BaseSortingLogic } from "@/logic/base"

export default function Sorting(props: PageProps){
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [visualiser, setVisualiser] = useState<BaseCanvas>()
    const [logic, setLogic] = useState<BaseSortingLogic>()
    const [imageLoaded, setImageLoaded] = useState<boolean>(false)
    const [data, setData] = useState([])
    
    useEffect(()=>{
        // initialise canvas
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d")
        if(!ctx) return
        // initialise  the visualiser
        const tmpVisualiser = new props.visualiser(ctx)
        setVisualiser(tmpVisualiser)
        const tmpLogic = new props.logic([])
        // prepare the data 

    }, [])

    console.log(props)
    return (
    <>
        <span>Sorting</span>
        <Card>
            <CardHeader>
                <CardTitle>
                    Doing crazy stuff for once 
                </CardTitle>
                <CardDescription>
                    The most useless coding language in the world
                </CardDescription>
                <CardAction>
                    <Button variant="link">Sign Up</Button>
                </CardAction>
            </CardHeader>
            <CardContent className="flex align-center">
                <canvas width={480} height={270} ref={canvasRef}  ></canvas>
                <ButtonGroup>
                    <Button variant={"outline"}>
                        <span>Next</span>
                    </Button>
                    <Button variant={"outline"}>
                        <span>finish</span>
                    </Button>
                    <Button variant={"outline"}>
                        <span>animate</span>
                    </Button>
                </ButtonGroup>
            </CardContent>
        </Card>
    </>)
}