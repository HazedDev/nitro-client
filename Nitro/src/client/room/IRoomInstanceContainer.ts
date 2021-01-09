import { IRoomObjectManager } from "./IRoomObjectManager";
import { IRoomObject } from "./object/IRoomObject";

export interface IRoomInstanceContainer {
    createRoomObjectManager(category: number): IRoomObjectManager

    createRoomObjectAndInitalize(id: string, objectId: number, type: string, category: number): IRoomObject
}