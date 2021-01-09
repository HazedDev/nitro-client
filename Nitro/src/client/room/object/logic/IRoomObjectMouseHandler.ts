import { RoomSpriteMouseEvent } from "../../events/RoomSpriteMouseEvent";
import { IRoomGeometry } from "../../utils/IRoomGeometry";
import { IRoomObjectEventHandler } from "./IRoomObjectEventHandler";

export interface IRoomObjectMouseHandler extends IRoomObjectEventHandler {
    mouseEvent(event: RoomSpriteMouseEvent, geometry: IRoomGeometry);
}