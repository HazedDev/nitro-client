import { RoomWidgetMessage } from '../../../../../client/nitro/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetChangeMottoMessage extends RoomWidgetMessage
{
    public static RWVM_CHANGE_MOTTO_MESSAGE: string = 'RWVM_CHANGE_MOTTO_MESSAGE';

    private _motto: string;

    constructor(k: string)
    {
        super(RoomWidgetChangeMottoMessage.RWVM_CHANGE_MOTTO_MESSAGE);
        
        this._motto = k;
    }

    public get motto(): string
    {
        return this._motto;
    }
}