import { IObjectData } from '../../../../../../client/nitro/room/object/data/IObjectData';
import { RoomWidgetFurniInfostandUpdateEvent } from '../../events/RoomWidgetFurniInfostandUpdateEvent';

export class InfoStandFurniData 
{
    private _id: number = 0;
    private _category: number = 0;
    private _name: string = "";
    private _description: string = "";
    private _image: HTMLElement;
    private _purchaseOfferId: number = -1;
    private _extraParam: string = "";
    private _stuffData: IObjectData = null;
    private _groupId: number;
    private _ownerId: number = 0;
    private _ownerName: string = "";
    private _rentOfferId: number = -1;
    private _availableForBuildersClub: boolean = false;

    public set id(k: number)
    {
        this._id = k;
    }

    public set category(k: number)
    {
        this._category = k;
    }

    public set name(k: string)
    {
        this._name = k;
    }

    public set description(k: string)
    {
        this._description = k;
    }

    public set image(k: HTMLElement)
    {
        this._image = k;
    }

    public set purchaseOfferId(k: number)
    {
        this._purchaseOfferId = k;
    }

    public set extraParam(k: string)
    {
        this._extraParam = k;
    }

    public set stuffData(k: IObjectData)
    {
        this._stuffData = k;
    }

    public set groupId(k: number)
    {
        this._groupId = k;
    }

    public set ownerId(k: number)
    {
        this._ownerId = k;
    }

    public set ownerName(k: string)
    {
        this._ownerName = k;
    }

    public get id(): number
    {
        return this._id;
    }

    public get category(): number
    {
        return this._category;
    }

    public get name(): string
    {
        return this._name;
    }

    public get description(): string
    {
        return this._description;
    }

    public get image(): HTMLElement
    {
        return this._image;
    }

    public get purchaseOfferId(): number
    {
        return this._purchaseOfferId;
    }

    public get extraParam(): string
    {
        return this._extraParam;
    }

    public get stuffData(): IObjectData
    {
        return this._stuffData;
    }

    public get groupId(): number
    {
        return this._groupId;
    }

    public get ownerId(): number
    {
        return this._ownerId;
    }

    public get ownerName(): string
    {
        return this._ownerName;
    }

    public get rentOfferId(): number
    {
        return this._rentOfferId;
    }

    public set rentOfferId(k: number)
    {
        this._rentOfferId = k;
    }

    public get _Str_6098(): boolean
    {
        return this._availableForBuildersClub;
    }

    public populate(k: RoomWidgetFurniInfostandUpdateEvent): void
    {
        this.id                         = k.id;
        this.category                   = k.category;
        this.name                       = k.name;
        this.description                = k.description;
        this.image                      = k.image;
        this.purchaseOfferId            = k.purchaseOfferId;
        this.extraParam                 = k.extraParam;
        this.stuffData                  = k.stuffData;
        this.groupId                    = k.groupId;
        this.ownerName                  = k.ownerName;
        this.ownerId                    = k.ownerId;
        this.rentOfferId                = k.rentOfferId;
        this._availableForBuildersClub  = k.availableForBuildersClub;
    }
}