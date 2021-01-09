import { IConnection } from '../../../core/communication/connections/IConnection';
import { RoomUnitChatEvent } from '../../communication/messages/incoming/room/unit/chat/RoomUnitChatEvent';
import { RoomUnitChatShoutEvent } from '../../communication/messages/incoming/room/unit/chat/RoomUnitChatShoutEvent';
import { RoomUnitChatWhisperEvent } from '../../communication/messages/incoming/room/unit/chat/RoomUnitChatWhisperEvent';
import { RoomSessionChatEvent } from '../events/RoomSessionChatEvent';
import { IRoomHandlerListener } from '../IRoomHandlerListener';
import { BaseHandler } from './BaseHandler';

export class RoomChatHandler extends BaseHandler
{
    constructor(connection: IConnection, listener: IRoomHandlerListener)
    {
        super(connection, listener);

        connection.addMessageEvent(new RoomUnitChatEvent(this.onRoomUnitChatEvent.bind(this)));
        connection.addMessageEvent(new RoomUnitChatShoutEvent(this.onRoomUnitChatEvent.bind(this)));
        connection.addMessageEvent(new RoomUnitChatWhisperEvent(this.onRoomUnitChatEvent.bind(this)));
    }

    private onRoomUnitChatEvent(event: RoomUnitChatEvent): void
    {
        if(!this.listener) return;

        const session = this.listener.getSession(this.roomId);

        if(!session) return;

        const parser = event.getParser();

        if(!parser) return;

        let chatType: number = RoomSessionChatEvent.CHAT_NORMAL;

        if(event instanceof RoomUnitChatShoutEvent) chatType = RoomSessionChatEvent.CHAT_SHOUT;
        else if(event instanceof RoomUnitChatWhisperEvent) chatType = RoomSessionChatEvent.CHAT_WHISPER;

        const chatEvent = new RoomSessionChatEvent(RoomSessionChatEvent.CHAT_EVENT, session, parser.unitId, parser.message, chatType, parser.bubble);

        this.listener.events.dispatchEvent(chatEvent);
    }
}