// type  Categories =  "Sort"| "Greedy" | "dynamic Programming"
import type { BaseSortingLogic } from "@/logic/base"
import type { BaseSearchinLogic } from "@/logic/base"
import type { BasePathFindingLogic } from "@/logic/base"
import type {BaseCanvas} from "../components/visualisers/Canvases"
import { InsertionSort } from "@/logic/sorting"
import { selectionSort } from "@/logic/sorting"
import { BinarySearch, DepthFirstSearch, BreadthFirstSearch } from "@/logic/searching"
import { CanvasLinear, CanvasGrid, CanvasGraph } from "../components/visualisers/Canvases"
import type { ElementType } from "react"
import Sorting from "@/pages/sorting"
import Search from "@/pages/searching"
import PathFinding from "@/pages/path_finding"
export interface RegistyEntry {
    category: string, 
    name: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    visualiser: new (...args: any[]) => BaseCanvas,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    logic: new (...args: any[]) => BaseSortingLogic|BasePathFindingLogic|BaseSearchinLogic;
    element: ElementType,
    path: string,
}
// add all your registry entries here to be built
export const registry:RegistyEntry[] = [
    {
        category: "Sorting",
        name: "Insertion Sort",
        visualiser: CanvasLinear,
        logic: InsertionSort,
        element: Sorting,
        path:"insertion_sort"
    },
        {
        category: "Sorting",
        name: "Selection Sort",
        visualiser: CanvasLinear,
        logic: selectionSort,
        element: Sorting,
        path:"selection_sort"
    },
    
    {
        category: "Searching",
        name: "Binary Search",
        visualiser: CanvasGraph,
        logic: BinarySearch,
        element: Search,
        path:"selection_sort"
    },
    {
        category: "Searching",
        name: "Depth first Search (DFS)",
        visualiser: CanvasGraph,
        logic: DepthFirstSearch,
        element: Search,
        path: "dfs",
    },
    {
        category: "Searching",
        name: "Breath first Search (DFS)",
        visualiser: CanvasGraph,
        logic: BreadthFirstSearch,
        element: Search,
        path: "bfs"
    },
    {
        category: "Path Finding",
        name: "A*",
        visualiser: CanvasGrid,
        logic: selectionSort,
        element: PathFinding,
        path: "a*"
    },
    {
        category: "Path Finding",
        name: "Dijkstras algorithim",
        visualiser: CanvasGrid,
        logic: selectionSort,
        element: PathFinding,
        path: "dijkstra"
        
    },
]
interface SubCategoryEntries {
    name: string,
    path: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    visualiser: new (...args: any[]) => BaseCanvas,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    logic: new (...args: any[]) => BaseSortingLogic|BasePathFindingLogic|BaseSearchinLogic;
    element: ElementType,
}
interface SidebarEntries {
    category: string,
    path: string,
    algos: SubCategoryEntries[]
}


export function buildCategories(){
    const cats:string[] = []
    const results:SidebarEntries[] = []
    registry.forEach(entry => {
        const cat = entry.category
        // learn how to unroll the properties directly excluding some
        const subCat: SubCategoryEntries = {
                    name: entry.name,
                    path: entry.path,
                    visualiser: entry.visualiser,
                    logic: entry.logic,
                    element: entry.element
                }
        if( cats.includes(cat)){
            const item  = results.find(item => item.category === cat)
            
            if(item){
                item.algos.push(subCat)
            }
        }else{
            const computedPath = cat.replaceAll(" ", "_")
            const newItem:SidebarEntries = {
                category: cat,
                path: computedPath,
                algos:[]
            }
            cats.push(cat)
            newItem.algos.push(subCat)
            results.push(newItem)
        }
    });
    return results
}


