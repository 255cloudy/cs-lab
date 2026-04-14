import {FlaskConical} from "lucide-react"
import {motion} from "framer-motion"
import { SidebarTrigger, SidebarSeparator } from "../ui/sidebar"
export function TopBar(){
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <SidebarSeparator orientation="vertical" className="mr-2 h-4" />
            <div className="flex item-center justify-center p-3 w-full  bg-background text-foreground"> 
                <h1 className="text-foreground mr-4">Welcome To Cs Lab</h1>
                <motion.div
                     animate={{ rotate: 360 }}
                     transition={{
                         duration: 2,
                         repeat: Infinity,
                         repeatDelay: 1, // This is your "stop for a while" (1 second)
                         ease: "easeInOut",
                     }}
                 >
                     <FlaskConical/>
                </motion.div>
                
            </div>          
        </header>
    )
}