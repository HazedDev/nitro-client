import { RoomWidgetMessage } from "./messages/RoomWidgetMessage";

export interface IRoomWidgetMessageListener {
    processWidgetMessage(arg0: RoomWidgetMessage);
    
}