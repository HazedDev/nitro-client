import { IConnection } from "./connections/IConnection";

export interface ICommunicationManager {
    dispose();
    createConnection(arg0: any): IConnection;
}