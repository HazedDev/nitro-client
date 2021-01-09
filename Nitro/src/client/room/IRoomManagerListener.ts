export interface IRoomManagerListener {
    onRoomEngineInitalized(arg0: boolean);
    initalizeTemporaryObjectsByType(type: string, arg1: boolean);
    objectInitialized(RoomId: string, ObjectId: number, category: any);
}