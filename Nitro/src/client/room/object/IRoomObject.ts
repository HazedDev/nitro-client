import { IDisposable } from "src/client/core/common/disposable/IDisposable";
import { RoomObjectUpdateMessage } from "../messages/RoomObjectUpdateMessage";
import { IVector3D } from "../utils/IVector3D";
import { IRoomObjectModel } from "./IRoomObjectModel";
import { IRoomObjectEventHandler } from "./logic/IRoomObjectEventHandler";
import { IRoomObjectMouseHandler } from "./logic/IRoomObjectMouseHandler";
import { IRoomObjectSpriteVisualization } from "./visualization/IRoomObjectSpriteVisualization";
import { IRoomObjectVisualization } from "./visualization/IRoomObjectVisualization";

export interface IRoomObject extends IDisposable {
    setValue?(OBJECT_ROOM_ID: string, roomId: string);

    getLocation(): IVector3D

    setLocation(vector: IVector3D): void

    getDirection(): IVector3D

    setDirection(vector: IVector3D): void

    getState(index: number): number

    setState(state: number, index?: number): boolean

    setVisualization(visualization: IRoomObjectVisualization): void

    setLogic(logic: IRoomObjectEventHandler): void

    processUpdateMessage(message: RoomObjectUpdateMessage): void

    update?(): void

    id: number

    instanceId: number

    type: string

    model: IRoomObjectModel

    visualization: IRoomObjectVisualization | IRoomObjectSpriteVisualization | any

    getBoundingRectangle?(): PIXI.Rectangle

    mouseHandler: IRoomObjectMouseHandler

    logic: IRoomObjectEventHandler

    location: IVector3D

    direction: IVector3D

    updateCounter: number

    isReady: boolean
}