import { IAssetData } from "src/client/core/asset/interfaces";

export interface IRoomObjectVisualizationData {

}

export interface IObjectVisualizationData {
    initialize(asset: IAssetData);
    dispose();
    
}