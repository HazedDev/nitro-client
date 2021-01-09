import { NitroEvent } from '../../../core/events/NitroEvent';
import { IRoomSession } from '../IRoomSession';

export class RoomSessionEvent extends NitroEvent
{
    public static CREATED: string   = 'RSE_CREATED';
    public static STARTED: string   = 'RSE_STARTED';
    public static ENDED: string     = 'RSE_ENDED';
    public static ROOM_DATA: string = 'RSE_ROOM_DATA';

    private _session: IRoomSession;

    constructor(type: string, session: IRoomSession)
    {
        super(type);

        this._session = session;
    }

    public get session(): IRoomSession
    {
        return this._session;
    }
}