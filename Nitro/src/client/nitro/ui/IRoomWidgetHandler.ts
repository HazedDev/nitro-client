import { IDisposable } from "src/client/core/common/disposable/IDisposable";
import { NitroEvent } from "src/client/core/events/NitroEvent";
import { RoomWidgetMessage } from "./widget/messages/RoomWidgetMessage";

export interface IRoomWidgetHandler extends IDisposable {
    widget?: any;
    processWidgetMessage(message: RoomWidgetMessage);
    type: string;
    processEvent(event: NitroEvent);
    eventTypes: any;
    messageTypes: any;
    container: any;
}