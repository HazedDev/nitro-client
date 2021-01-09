import { IRoomSession } from "./IRoomSession";

export interface IRoomSessionManager {
    createSession(roomId: number, password: string);
    getSession(roomId: number);
    init();
    dispose();
    events: any;
    startSession(roomSession: IRoomSession);

}