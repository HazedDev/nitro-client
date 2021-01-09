import { IDisposable } from "../core/common/disposable/IDisposable";
import { IRoomObjectModel } from "./object/IRoomObjectModel";
import { IRoomRenderer } from "./renderer/IRoomRenderer";
import { IRoomRendererBase } from "./renderer/IRoomRendererBase";

export interface IRoomInstance extends IDisposable {
    getRoomObject(objectId: number, category: number): import("./object/IRoomObject").IRoomObject;
    getRoomObjectByIndex(index: number, category: number): import("./object/IRoomObject").IRoomObject;
    getManager(objectCategory: number);
    getRoomObjectsForCategory(_arg_2: number): import("./object/IRoomObject").IRoomObject[];
    getTotalObjectsForManager(category: number): number;
    createRoomObjectAndInitalize(objectId: number, type: string, category: number): import("./object/IRoomObject").IRoomObject;
    model: IRoomObjectModel;
    setRenderer(renderer: IRoomRenderer);
    renderer: IRoomRendererBase;
    update(time: number);
    removeUpdateCategory(category: number);
    id: string;
    addUpdateCategory(category: number);
    managers: any;
    createRoomObject(objectId: number, arg1: number, type: string, category: number): import("./object/IRoomObject").IRoomObject;
    removeRoomObject(objectId: number, category: number);
}