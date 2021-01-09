import { RoomWidgetMessage } from '../../../../../client/nitro/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetGetObjectLocationMessage extends RoomWidgetMessage
{
    public static RWGOI_MESSAGE_GET_OBJECT_LOCATION: string = 'RWGOI_MESSAGE_GET_OBJECT_LOCATION';
    public static RWGOI_MESSAGE_GET_GAME_OBJECT_LOCATION: string = 'RWGOI_MESSAGE_GET_GAME_OBJECT_LOCATION';

    private _objectId: number;
    private _objectType: number;

    constructor(k: string, _arg_2: number, _arg_3: number)
    {
        super(k);
        
        this._objectId = _arg_2;
        this._objectType = _arg_3;
    }

    public get _Str_1577(): number
    {
        return this._objectId;
    }

    public get _Str_1723(): number
    {
        return this._objectType;
    }
}