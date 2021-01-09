import { RoomWidgetMessage } from '../../../../../client/nitro/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetDanceMessage extends RoomWidgetMessage
{
    public static RWCM_MESSAGE_DANCE: string = 'RWCM_MESSAGE_DANCE';
    public static _Str_13814: number = 0;
    public static _Str_17699: number[] = [2, 3, 4];

    private _style: number = 0;

    constructor(k: number)
    {
        super(RoomWidgetDanceMessage.RWCM_MESSAGE_DANCE);
        
        this._style = k;
    }

    public get style(): number
    {
        return this._style;
    }
}