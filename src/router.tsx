import { createBrowserRouter } from "react-router-dom";
import { Main } from "./components/controller/main";
import { registry } from "./registries/registry";

interface Child {
  path: string;
  element: React.JSX.Element;
}
interface Parent {
  path: string;
  children: Child[];
}

function buildChildren() {
  const res: Parent[] = [];
  registry.forEach((cat) => {
    // create the parent that we will populate dynamically
    const newChild: Parent = {
      path: cat.category.toLocaleLowerCase().replace(" ", "_"),
      children: [],
    };
    cat.subcats.forEach((algo) => {
      const isIndex = newChild.children.length === 0 ? true : false;
      const elProps = {
        visualiser: algo.visualiser,
        logic: algo.logic,
      };
      const subcat = {
        path: algo.path.toLowerCase().replace(" ", "_"),
        element: <algo.element {...elProps}></algo.element>,
        index: isIndex,
      };
      newChild.children.push(subcat);
    });
    res.push(newChild);
  });
  return res;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: buildChildren(),
  },
]);
