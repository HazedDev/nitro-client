import { IAssetData } from "src/client/core/asset/interfaces";

export interface IRoomObjectVisualizationFactory {
    getVisualizationData(assetName: string, visualization: string, arg2: IAssetData);
    getVisualization(visualization: string);

}