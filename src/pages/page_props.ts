import type{ BaseCanvas } from "@/components/visualisers/Canvases";
import type { BasePathFindingLogic, BaseSortingLogic, BaseSearchinLogic } from "@/logic/base";
export interface PageProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    visualiser: new (...args: any[]) => BaseCanvas,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    logic: new (...args: any[]) => BaseSortingLogic|BasePathFindingLogic|BaseSearchinLogic,
}