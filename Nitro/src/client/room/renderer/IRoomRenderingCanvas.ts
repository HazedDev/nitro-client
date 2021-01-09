import { IDisposable } from "src/client/core/common/disposable/IDisposable";
import { RoomObjectEventHandler } from "src/client/nitro/room/RoomObjectEventHandler";

export interface IRoomRenderingCanvas extends IDisposable {
	canvasUpdated: any;
    setMouseListener(_roomObjectEventHandler: RoomObjectEventHandler);
    setMask(flag: boolean);
    setScale(scale: number, point: PIXI.Point, offsetPoint: PIXI.Point);
    scale: number;
    _Str_21232(x: number, y: number, type: string, altKey: boolean, ctrlKey: boolean, shiftKey: boolean, buttonDown: boolean);
    _Str_20787();
    _Str_22174();
    height: number;
    width: number;
    _Str_14588();
    id: number;
    screenOffsetY: any;
    screenOffsetX: number;
    getSortableSpriteList();
    displayObject: PIXI.DisplayObject;
    initialize(width: number, height: number);
    geometry: any;
    
    render(time: number): void

    update(time?: number): void
}