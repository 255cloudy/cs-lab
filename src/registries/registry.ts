// type  Categories =  "Sort"| "Greedy" | "dynamic Programming"
import type { BaseSortingLogic } from "@/logic/base"
import type { BaseSearchinLogic } from "@/logic/base"
import type { BasePathFindingLogic } from "@/logic/base"
import type {BaseCanvas} from "../components/visualisers/Canvases"
import { InsertionSort } from "@/logic/sorting"
import { selectionSort } from "@/logic/sorting"
import { BinarySearch, DepthFirstSearch, BreadthFirstSearch } from "@/logic/searching"
import { CanvasSort, CanvasGrid, CanvasGraph } from "../components/visualisers/Canvases"
import type { ElementType } from "react"
import Sorting from "@/pages/sorting"
import Search from "@/pages/searching"
import PathFinding from "@/pages/path_finding"
export interface RegistyEntry {
    category: string, 
    subcats : SubCategoryEntries[]
}
// add all your registry entries here to be built
export const registry:RegistyEntry[] = [
    {
        category: "Sorting",
        subcats: [
            {
                name: "Insertion Sort",
                visualiser: CanvasSort,
                logic: InsertionSort,
                element: Sorting,
                path:"insertion_sort"
            },
            {
                name: "Selection Sort",
                visualiser: CanvasSort,
                logic: selectionSort,
                element: Sorting,
                path:"selection_sort"
            },
        ],
    },
    {
        category: "Searching",
        subcats: [
            {
                name: "Binary Search",
                visualiser: CanvasGraph,
                logic: BinarySearch,
                element: Search,
                path:"selection_sort"
            },
            {
                name: "Depth first Search (DFS)",
                visualiser: CanvasGraph,
                logic: DepthFirstSearch,
                element: Search,
                path: "dfs",
            },
            {
                name: "Breath first Search (DFS)",
                visualiser: CanvasGraph,
                logic: BreadthFirstSearch,
                element: Search,
                path: "bfs"
            }

        ]
    },
    {
        category: "Path Finding",
        subcats: [
            {
                name: "A*",
                visualiser: CanvasGrid,
                logic: selectionSort,
                element: PathFinding,
                path: "a*"
            },
            {
                name: "Dijkstras algorithim",
                visualiser: CanvasGrid,
                logic: selectionSort,
                element: PathFinding,
                path: "dijkstra"
            }
        ],
    }
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

