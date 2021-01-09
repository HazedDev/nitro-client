import { RoomWidgetMessage } from '../../../../../client/nitro/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetChangePostureMessage extends RoomWidgetMessage
{
    public static RWCPM_MESSAGE_CHANGE_POSTURE: string = 'RWCPM_MESSAGE_CHANGE_POSTURE';

    public static _Str_1553: number = 0;
    public static _Str_2016: number = 1;

    private _posture: number;

    constructor(k: number)
    {
        super(RoomWidgetChangePostureMessage.RWCPM_MESSAGE_CHANGE_POSTURE);

        this._posture = k;
    }

    public get posture(): number
    {
        return this._posture;
    }
}