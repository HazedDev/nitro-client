import { IEventDispatcher } from "src/client/core/events/IEventDispatcher";
import { IRoomObjectEventHandler } from "src/client/room/object/logic/IRoomObjectEventHandler";
import { RoomObjectLogicBase } from "src/client/room/object/logic/RoomObjectLogicBase";

export interface IRoomObjectLogicFactory
{
    getLogic(type: string): IRoomObjectEventHandler;

    registerEventFunction(func: Function): void;

    removeEventFunction(func: Function): void;

    getLogicType(type: string): typeof RoomObjectLogicBase;

    events(): IEventDispatcher;
}