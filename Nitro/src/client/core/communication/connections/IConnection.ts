import { IMessageComposer } from "../messages/IMessageComposer";
import { IMessageConfiguration } from "../messages/IMessageConfiguration";
import { IMessageEvent } from "../messages/IMessageEvent";

export interface IConnection
{
    dispose();
    processReceivedData();
    disposed: any;
    dataBuffer: any;
    init(SOCKET_URL: string);
    authenticated();
    removeMessageEvent(event: IMessageEvent);
    send(arg0: IMessageComposer);
    addMessageEvent(arg0: IMessageEvent);

    addEventListener(type: string, callback: Function): void;

    removeEventListener(type: string, callback: any): void;
    
    dispatchEvent(event: Event): boolean;

    registerMessages(configuration: IMessageConfiguration): void;
}