import { createBrowserRouter } from "react-router-dom";
import { Main } from "./components/controller/main";
import { buildCategories } from "./registries/registry";



const categories = buildCategories()
interface Child {
    path: string,
    element: React.JSX.Element
}
interface Parent {
    path: string,
    children: Child[]
}
function buildChildren(){
    const res: Parent[] = []
    categories.forEach((cat)=>{
        const newChild:Parent= {
            path: cat.path.toLocaleLowerCase().replace(" ", "_"),
            children: []
        }
        cat.algos.forEach((algo)=>{
            const elProps = {
                visualiser: algo.visualiser,
                logic: algo.logic
            }
            const subcat = {
                path: algo.path,
                element: <algo.element props={elProps}></algo.element>,
            }
            newChild.children.push(subcat)
        })
        res.push(newChild)
    })
    return res
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />, // Your sidebar and wrapper live here
    children: buildChildren()
  },
]);
