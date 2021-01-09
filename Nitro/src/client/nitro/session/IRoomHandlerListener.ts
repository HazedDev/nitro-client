export interface IRoomHandlerListener {
    sessionUpdate(roomId: number, RS_CONNECTED: string);
    sessionReinitialize(fromRoomId: number, toRoomId: number);
    getSession(roomId: number);
    events: any;

}