import { SocketConnection } from "../connections/SocketConnection";
import { IMessageDataWrapper } from "../messages/IMessageDataWrapper";

export interface ICodec {
    decode(arg0: SocketConnection): IMessageDataWrapper[];
    encode(header: number, arg1: any);
    
}