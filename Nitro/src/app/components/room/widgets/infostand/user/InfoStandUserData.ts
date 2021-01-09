import { RoomWidgetUserInfostandUpdateEvent } from '../../events/RoomWidgetUserInfostandUpdateEvent';

export class InfoStandUserData 
{
    private _userId: number = 0;
    private _userName: string = "";
    private _badges: string[];
    private _groupId: number = 0;
    private _groupName: string = "";
    private _groupBadgeId: string = "";
    private _respectLeft: number = 0;
    private _carryItem: number = 0;
    private _userRoomId: number = 0;
    private _type: string;
    private _petRespectLeft: number = 0;

    constructor()
    {
        this._badges = [];
    }

    public set userId(k: number)
    {
        this._userId = k;
    }

    public set userName(k: string)
    {
        this._userName = k;
    }

    public set badges(k: string[])
    {
        this._badges = k;
    }

    public set groupId(k: number)
    {
        this._groupId = k;
    }

    public set groupName(k: string)
    {
        this._groupName = k;
    }

    public set _Str_5235(k: string)
    {
        this._groupBadgeId = k;
    }

    public set _Str_3577(k: number)
    {
        this._respectLeft = k;
    }

    public set _Str_3249(k: number)
    {
        this._carryItem = k;
    }

    public set _Str_3313(k: number)
    {
        this._userRoomId = k;
    }

    public set type(k: string)
    {
        this._type = k;
    }

    public set _Str_2985(k: number)
    {
        this._petRespectLeft = k;
    }

    public get userId(): number
    {
        return this._userId;
    }

    public get userName(): string
    {
        return this._userName;
    }

    public get badges(): string[]
    {
        return this._badges.slice();
    }

    public get groupId(): number
    {
        return this._groupId;
    }

    public get groupName(): string
    {
        return this._groupName;
    }

    public get _Str_5235(): string
    {
        return this._groupBadgeId;
    }

    public get _Str_3577(): number
    {
        return this._respectLeft;
    }

    public get _Str_3249(): number
    {
        return this._carryItem;
    }

    public get _Str_3313(): number
    {
        return this._userRoomId;
    }

    public get type(): string
    {
        return this._type;
    }

    public get _Str_2985(): number
    {
        return this._petRespectLeft;
    }

    public _Str_18577(): boolean
    {
        return (this.type === RoomWidgetUserInfostandUpdateEvent.BOT);
    }

    public populate(k: RoomWidgetUserInfostandUpdateEvent): void
    {
        this.userId = k.webID;
        this.userName = k.name;
        this.badges = k.badges;
        this.groupId = k.groupId;
        this.groupName = k.groupName;
        this._Str_5235 = k._Str_5235;
        this._Str_3577 = k._Str_3577;
        this._Str_3249 = k.carryId;
        this._Str_3313 = k.roomIndex;
        this.type = k.type;
    }
}