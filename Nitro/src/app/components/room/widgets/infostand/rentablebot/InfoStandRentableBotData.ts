import { RoomWidgetRentableBotInfostandUpdateEvent } from '../../events/RoomWidgetRentableBotInfostandUpdateEvent';

export class InfoStandRentableBotData 
{
    private _userId: number = 0;
    private _name: string = "";
    private _badges: string[];
    private _carryItem: number = 0;
    private _userRoomId: number = 0;
    private _amIOwner: boolean;
    private _amIAnyRoomController: boolean;
    private _botSkills: number[];

    constructor()
    {
        this._badges = [];
    }

    public set userId(k: number)
    {
        this._userId = k;
    }

    public set name(k: string)
    {
        this._name = k;
    }

    public set badges(k: string[])
    {
        this._badges = k;
    }

    public set _Str_3249(k: number)
    {
        this._carryItem = k;
    }

    public set _Str_3313(k: number)
    {
        this._userRoomId = k;
    }

    public set _Str_3246(k: boolean)
    {
        this._amIOwner = k;
    }

    public set _Str_3529(k: boolean)
    {
        this._amIAnyRoomController = k;
    }

    public get userId(): number
    {
        return this._userId;
    }

    public get name(): string
    {
        return this._name;
    }

    public get badges(): string[]
    {
        return this._badges.slice();
    }

    public get _Str_3249(): number
    {
        return this._carryItem;
    }

    public get _Str_3313(): number
    {
        return this._userRoomId;
    }

    public get _Str_3246(): boolean
    {
        return this._amIOwner;
    }

    public get _Str_3529(): boolean
    {
        return this._amIAnyRoomController;
    }

    public get _Str_2899(): number[]
    {
        return this._botSkills;
    }

    public set _Str_2899(k: number[])
    {
        this._botSkills = k;
    }

    public populate(k:RoomWidgetRentableBotInfostandUpdateEvent): void
    {
        this.userId = k._Str_2394;
        this.name = k.name;
        this.badges = k.badges;
        this._Str_3249 = k._Str_3249;
        this._Str_3313 = k._Str_3313;
        this._Str_3246 = k._Str_3246;
        this._Str_3529 = k._Str_3529;
        this._Str_2899 = k._Str_2899;
    }
}