import { RoomContentLoader } from "../nitro/room/RoomContentLoader";
import { IRoomInstance } from "./IRoomInstance";

export interface IRoomManager {
    update(time: number);
    init();
    dispose();
    getRoomInstance(arg0: string): IRoomInstance;
    removeRoomInstance(arg0: string);
    getRoomInstance(arg0: string): IRoomInstance;
    addUpdateCategory(FLOOR: number);
    setContentLoader(_roomContentLoader: RoomContentLoader);
    createRoomInstance(arg0: string);

}