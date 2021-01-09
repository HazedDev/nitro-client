import { IEventDispatcher } from "src/client/core/events/IEventDispatcher";
import { RoomObjectUpdateMessage } from "../../messages/RoomObjectUpdateMessage";
import { IRoomObject } from "../IRoomObject";

export interface IRoomObjectEventHandler {
    getEventTypes();
    eventDispatcher: IEventDispatcher;
    useObject();
    update(time: number);
    setObject(object: IRoomObject | null): void

    processUpdateMessage(message: RoomObjectUpdateMessage): void
}