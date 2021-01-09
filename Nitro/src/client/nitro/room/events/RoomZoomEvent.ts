import { RoomEngineEvent } from './RoomEngineEvent';

export class RoomZoomEvent extends RoomEngineEvent 
{
    public static ROOM_ZOOM: string = 'REE_ROOM_ZOOM';

    private _level: number;

    constructor(roomId: number, level: number)
    {
        super(RoomZoomEvent.ROOM_ZOOM, roomId);

        this._level = level;
    }

    public get level(): number
    {
        return this._level;
    }
}