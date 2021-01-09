import { FurnitureListItemParser } from '../../../../client/nitro/communication/messages/parser/inventory/furniture/utils/FurnitureListItemParser';
import { Nitro } from '../../../../client/nitro/Nitro';
import { IObjectData } from '../../../../client/nitro/room/object/data/IObjectData';
import { IFurnitureItem } from './IFurnitureItem';

export class FurnitureItem implements IFurnitureItem
{
    private _expirationTimeStamp: number;
    private _isWallItem: boolean;
    private _songId: number;
    private _locked: boolean;
    private _id: number;
    private _ref: number;
    private _category: number;
    private _type: number;
    private _stuffData: IObjectData;
    private _extra: number;
    private _recyclable: boolean;
    private _tradeable: boolean;
    private _groupable: boolean;
    private _sellable: boolean;
    private _secondsToExpiration: number;
    private _hasRentPeriodStarted: boolean;
    private _creationDay: number;
    private _creationMonth: number;
    private _creationYear: number;
    private _slotId: string;
    private _isRented: boolean;
    private _flatId: number;
    private _unlocked: boolean;

    constructor(parser: FurnitureListItemParser)
    {
        this._id                    = parser.itemId;
        this._type                  = parser.spriteId;
        this._ref                   = parser.ref;
        this._category              = parser.category;
        this._groupable             = ((parser.isGroupable) && (!(parser.rentable)));
        this._tradeable             = parser.tradable;
        this._recyclable            = parser.isRecycleable;
        this._sellable              = parser.sellable;
        this._stuffData             = parser.stuffData;
        this._extra                 = parser._Str_2794;
        this._secondsToExpiration   = parser.secondsToExpiration;
        this._expirationTimeStamp   = parser._Str_10616;
        this._hasRentPeriodStarted  = parser.hasRentPeriodStarted;
        this._creationDay           = parser._Str_8932;
        this._creationMonth         = parser._Str_9050;
        this._creationYear          = parser._Str_9408;
        this._slotId                = parser.slotId;
        this._songId                = parser._Str_3951;
        this._flatId                = parser.flatId;
        this._isRented              = parser.rentable;
        this._isWallItem            = parser.isWallItem;
        this._unlocked              = true;
    }

    public get rentable(): boolean
    {
        return this._isRented;
    }

    public get id(): number
    {
        return this._id;
    }

    public get ref(): number
    {
        return this._ref;
    }

    public get category(): number
    {
        return this._category;
    }

    public get type(): number
    {
        return this._type;
    }

    public get stuffData(): IObjectData
    {
        return this._stuffData;
    }

    public set stuffData(k: IObjectData)
    {
        this._stuffData = k;
    }

    public get _Str_2794(): number
    {
        return this._extra;
    }

    public get _Str_16260(): boolean
    {
        return this._recyclable;
    }

    public get isTradable(): boolean
    {
        return this._tradeable;
    }

    public get isGroupable(): boolean
    {
        return this._groupable;
    }

    public get sellable(): boolean
    {
        return this._sellable;
    }

    public get secondsToExpiration(): number
    {
        if(this._secondsToExpiration === -1) return -1;

        let time: number = -1;

        if(this._hasRentPeriodStarted)
        {
            time = (this._secondsToExpiration - ((Nitro.instance.time - this._expirationTimeStamp) / 1000));
            
            if(time < 0) time = 0;
        }
        else
        {
            time = this._secondsToExpiration;
        }

        return time;
    }

    public get _Str_8932(): number
    {
        return this._creationDay;
    }

    public get _Str_9050(): number
    {
        return this._creationMonth;
    }

    public get _Str_9408(): number
    {
        return this._creationYear;
    }

    public get slotId(): string
    {
        return this._slotId;
    }

    public get _Str_3951(): number
    {
        return this._songId;
    }

    public get locked(): boolean
    {
        return this._locked;
    }

    public set locked(k: boolean)
    {
        this._locked = k;
    }

    public get flatId(): number
    {
        return this._flatId;
    }

    public get isWallItem(): boolean
    {
        return this._isWallItem;
    }

    public get hasRentPeriodStarted(): boolean
    {
        return this._hasRentPeriodStarted;
    }

    public get _Str_10616(): number
    {
        return this._expirationTimeStamp;
    }

    public get unlocked(): boolean
    {
        return this._unlocked;
    }

    public set unlocked(flag: boolean)
    {
        this._unlocked = flag;
    }

    public update(parser: FurnitureListItemParser): void
    {
        this._type                  = parser.spriteId;
        this._ref                   = parser.ref;
        this._category              = parser.category;
        this._groupable             = (parser.isGroupable && !parser.rentable);
        this._tradeable             = parser.tradable;
        this._recyclable            = parser.isRecycleable;
        this._sellable              = parser.sellable;
        this._stuffData             = parser.stuffData;
        this._extra                 = parser._Str_2794;
        this._secondsToExpiration   = parser.secondsToExpiration;
        this._expirationTimeStamp   = parser._Str_10616;
        this._hasRentPeriodStarted  = parser.hasRentPeriodStarted;
        this._creationDay           = parser._Str_8932;
        this._creationMonth         = parser._Str_9050;
        this._creationYear          = parser._Str_9408;
        this._slotId                = parser.slotId;
        this._songId                = parser._Str_3951;
        this._flatId                = parser.flatId;
        this._isRented              = parser.rentable;
        this._isWallItem            = parser.isWallItem;
    }
}