import { Disposable } from '../../core/common/disposable/Disposable';
import { IConnection } from '../../core/communication/connections/IConnection';
import { RoomFowardEvent as RoomForwardEvent } from '../communication/messages/incoming/room/access/RoomFowardEvent';
import { RoomInfoEvent } from '../communication/messages/incoming/room/data/RoomInfoEvent';
import { RoomInfoOwnerEvent } from '../communication/messages/incoming/room/data/RoomInfoOwnerEvent';
import { RoomInfoComposer } from '../communication/messages/outgoing/room/data/RoomInfoComposer';
import { RoomDataParser } from '../communication/messages/parser/room/data/RoomDataParser';
import { INitroNavigator } from './INitroNavigator';

export class NavigatorMessageHandler extends Disposable
{
    private _navigator: INitroNavigator;
    private _connection: IConnection;

    constructor(navigator: INitroNavigator)
    {
        super();

        this._navigator     = navigator;
        this._connection    = null;
    }

    protected onDispose(): void
    {
        this._navigator     = null;
        this._connection    = null;

        super.onDispose();
    }

    public setConnection(connection: IConnection): void
    {
        if(this._connection || !connection) return;

        this._connection = connection;

        connection.addMessageEvent(new RoomForwardEvent(this.onRoomForwardEvent.bind(this)));
        connection.addMessageEvent(new RoomInfoOwnerEvent(this.onRoomInfoOwnerEvent.bind(this)));
        connection.addMessageEvent(new RoomInfoEvent(this.onRoomInfoEvent.bind(this)));
    }

    private onRoomForwardEvent(event: RoomForwardEvent): void
    {
        if(!(event instanceof RoomForwardEvent)) return;

        this._connection.send(new RoomInfoComposer(event.getParser().roomId, false, true));
    }

    private onRoomInfoOwnerEvent(event: RoomInfoOwnerEvent): void
    {
        if(!(event instanceof RoomInfoOwnerEvent)) return;

        this._connection.send(new RoomInfoComposer(event.getParser().roomId, true, false));
    }

    private onRoomInfoEvent(event: RoomInfoEvent): void
    {
        if(!(event instanceof RoomInfoEvent)) return;

        const parser = event.getParser();

        if(!parser) return;

        if(parser.roomEnter)
        {
            // if an ad needs to display, do it here
            // refresh the room info window / display it
        }
        else
        {
            if(parser.roomForward)
            {
                if(parser.data.ownerName !== this._navigator.session.userName)
                {
                    switch(parser.data.doorMode)
                    {
                        case RoomDataParser.DOORBELL_STATE:
                            console.log('DOORBELL');
                            return;
                        case RoomDataParser.PASSWORD_STATE:
                            console.log('PASSWORD');
                            return;
                    }
                }

                this._navigator.goToRoom(parser.data.id);
            }
            else
            {
                // update room data with new data
            }
        }
    }
}