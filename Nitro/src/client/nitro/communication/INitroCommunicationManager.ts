import { IDisposable } from 'src/client/core/common/disposable/IDisposable';
import { IConnection } from '../../core/communication/connections/IConnection';
import { IMessageEvent } from '../../core/communication/messages/IMessageEvent';
import { NitroCommunicationDemo } from './demo/NitroCommunicationDemo';

export interface INitroCommunicationManager extends IDisposable
{
    connectionInit(socketUrl: string): void;

    registerMessageEvent(event: IMessageEvent): IMessageEvent;

    removeMessageEvent(event: IMessageEvent): void;

    demo: NitroCommunicationDemo;

    connection: IConnection;
}