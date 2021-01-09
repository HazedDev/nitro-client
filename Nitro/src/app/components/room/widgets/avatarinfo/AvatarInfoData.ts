import { RoomWidgetUserInfostandUpdateEvent } from '../events/RoomWidgetUserInfostandUpdateEvent';

export class AvatarInfoData 
{
    private _isIgnored: boolean = false;
    private _canTrade: boolean = false;
    private _canTradeReason: number = 0;
    private _canBeKicked: boolean = false;
    private _canBeBanned: boolean = false;
    private _canBeMuted: boolean = false;
    private _canBeAskedAsFriend: boolean = false;
    private _amIOwner: boolean = false;
    private _amIAnyRoomController: boolean = false;
    private _respectLeft: number = 0;
    private _isOwnUser: boolean = false;
    private _allowNameChange: boolean = false;
    private _isGuildRoom: boolean = false;
    private _carryItemType: number = 0;
    private _myRoomControllerLevel: number = 0;
    private _targetRoomControllerLevel: number = 0;
    private _isFriend: boolean = false;
    private _isAmbassador: boolean = false;

    public get _Str_3655(): boolean
    {
        return this._isIgnored;
    }

    public get _Str_5751(): boolean
    {
        return this._canTrade;
    }

    public get _Str_6622(): number
    {
        return this._canTradeReason;
    }

    public get _Str_5990(): boolean
    {
        return this._canBeKicked;
    }

    public get _Str_6701(): boolean
    {
        return this._canBeBanned;
    }

    public get canBeAskedForAFriend(): boolean
    {
        return this._canBeAskedAsFriend;
    }

    public get _Str_3246(): boolean
    {
        return this._amIOwner;
    }

    public get _Str_3529(): boolean
    {
        return this._amIAnyRoomController;
    }

    public get _Str_3577(): number
    {
        return this._respectLeft;
    }

    public get _Str_11453(): boolean
    {
        return this._isOwnUser;
    }

    public get allowNameChange(): boolean
    {
        return this._allowNameChange;
    }

    public get _Str_3672(): boolean
    {
        return this._isGuildRoom;
    }

    public get _Str_8826(): number
    {
        return this._carryItemType;
    }

    public get roomControllerLevel(): number
    {
        return this._myRoomControllerLevel;
    }

    public get _Str_5599(): number
    {
        return this._targetRoomControllerLevel;
    }

    public set _Str_3655(k: boolean)
    {
        this._isIgnored = k;
    }

    public set _Str_5751(k: boolean)
    {
        this._canTrade = k;
    }

    public set _Str_6622(k: number)
    {
        this._canTradeReason = k;
    }

    public set _Str_5990(k: boolean)
    {
        this._canBeKicked = k;
    }

    public set _Str_6701(k: boolean)
    {
        this._canBeBanned = k;
    }

    public get _Str_6394(): boolean
    {
        return this._canBeMuted;
    }

    public set _Str_6394(k: boolean)
    {
        this._canBeMuted = k;
    }

    public set canBeAskedForAFriend(k: boolean)
    {
        this._canBeAskedAsFriend = k;
    }

    public set _Str_3246(k: boolean)
    {
        this._amIOwner = k;
    }

    public set _Str_3529(k: boolean)
    {
        this._amIAnyRoomController = k;
    }

    public set _Str_3577(k: number)
    {
        this._respectLeft = k;
    }

    public set _Str_11453(k: boolean)
    {
        this._isOwnUser = k;
    }

    public set allowNameChange(k: boolean)
    {
        this._allowNameChange = k;
    }

    public set _Str_3672(k: boolean)
    {
        this._isGuildRoom = k;
    }

    public set _Str_8826(k: number)
    {
        this._carryItemType = k;
    }

    public set roomControllerLevel(k: number)
    {
        this._myRoomControllerLevel = k;
    }

    public set _Str_5599(k: number)
    {
        this._targetRoomControllerLevel = k;
    }

    public get isFriend(): boolean
    {
        return this._isFriend;
    }

    public get _Str_4050(): boolean
    {
        return this._isAmbassador;
    }

    public populate(k: RoomWidgetUserInfostandUpdateEvent): void
    {
        this._amIAnyRoomController = k.isModerator;
        this._myRoomControllerLevel = k.roomControllerLevel;
        this._amIOwner = k.isRoomOwner;
        this._canBeAskedAsFriend = k.canBeAskedForAFriend;
        this._canBeKicked = k._Str_5990;
        this._canBeBanned = k._Str_6701;
        this._canBeMuted = k._Str_6394;
        this._canTrade = k.canTrade;
        this._canTradeReason = k._Str_6622;
        this._isIgnored = k.isIgnored;
        this._respectLeft = k._Str_3577;
        this._isOwnUser = (k.type === RoomWidgetUserInfostandUpdateEvent.OWN_USER);
        this._allowNameChange = k._Str_4330;
        this._isGuildRoom = k.isGuildRoom;
        this._targetRoomControllerLevel = k.flatControl;
        this._carryItemType = k.carryId;
        this._isFriend = k.isFriend;
        this._isAmbassador = k.isAmbassador;
    }
}