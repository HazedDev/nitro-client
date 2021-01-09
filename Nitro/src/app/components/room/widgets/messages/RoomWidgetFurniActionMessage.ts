import { RoomWidgetMessage } from '../../../../../client/nitro/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetFurniActionMessage extends RoomWidgetMessage
{
    public static RWFUAM_ROTATE: string = 'RWFUAM_ROTATE';
    public static RWFAM_MOVE: string = 'RWFAM_MOVE';
    public static RWFAM_PICKUP: string = 'RWFAM_PICKUP';
    public static RWFAM_EJECT: string = 'RWFAM_EJECT';
    public static RWFAM_USE: string = 'RWFAM_USE';
    public static RWFAM_OPEN_WELCOME_GIFT: string = 'RWFAM_OPEN_WELCOME_GIFT';
    public static RWFAM_SAVE_STUFF_DATA: string = 'RWFAM_SAVE_STUFF_DATA';

    private _furniId: number;
    private _furniCategory: number;
    private _offerId: number;
    private _objectData: string;

    constructor(type: string, id: number, category: number, offerId: number =- 1, objectData: string = null)
    {
        super(type);

        this._furniId       = id;
        this._furniCategory = category;
        this._offerId       = offerId;
        this._objectData    = objectData;
    }

    public get furniId(): number
    {
        return this._furniId;
    }

    public get furniCategory(): number
    {
        return this._furniCategory;
    }

    public get objectData(): string
    {
        return this._objectData;
    }

    public get _Str_2451(): number
    {
        return this._offerId;
    }
}