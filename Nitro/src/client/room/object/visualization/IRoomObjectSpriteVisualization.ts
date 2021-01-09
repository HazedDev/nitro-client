import { IRoomGeometry } from "../../utils/IRoomGeometry";

export interface IRoomObjectSpriteVisualization {
    getSpriteList();
    sprites: any;
    updateSpriteCounter: number;
    instanceId: number;
    update(_geometry: IRoomGeometry, time: number, arg2: boolean, arg3: boolean);

}