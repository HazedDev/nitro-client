export interface IRoomObjectLogicFactory {
    events: any;
    registerEventFunction(arg0: (event: import("../../events/RoomObjectEvent").RoomObjectEvent) => void);
    getLogic(logic: string);
}