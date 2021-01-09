import { IMessageDataWrapper } from '../../../../../../core/communication/messages/IMessageDataWrapper';

export class UserInfoDataParser
{
    private _userId: number;
    private _username: string;
    private _figure: string;
    private _gender: string;
    private _motto: string;
    private _realName: string;
    private _boolean1: boolean;
    private _respectsReceived: number;
    private _respectsRemaining: number;
    private _respectsPetRemaining: number;
    private _boolean2: boolean;
    private _accountCreated: string;
    private _canChangeName: boolean;
    private _boolean3: boolean;

    constructor(wrapper: IMessageDataWrapper)
    {
        if(!wrapper) throw new Error('invalid_wrapper');

        this.flush();
        this.parse(wrapper);
    }

    public flush(): boolean
    {
        this._userId                = 0;
        this._username              = null;
        this._figure                = null;
        this._gender                = null;
        this._motto                 = null;
        this._realName              = null;
        this._boolean1              = false;
        this._respectsReceived      = 0;
        this._respectsRemaining     = 0;
        this._respectsPetRemaining  = 0;
        this._boolean2              = false;
        this._accountCreated        = null;
        this._canChangeName         = false;
        this._boolean3              = false;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._userId                = wrapper.readInt();
        this._username              = wrapper.readString();
        this._figure                = wrapper.readString();
        this._gender                = wrapper.readString();
        this._motto                 = wrapper.readString();
        this._realName              = wrapper.readString();
        this._boolean1              = wrapper.readBoolean();
        this._respectsReceived      = wrapper.readInt();
        this._respectsRemaining     = wrapper.readInt();
        this._respectsPetRemaining  = wrapper.readInt();
        this._boolean2              = wrapper.readBoolean();
        this._accountCreated        = wrapper.readString();
        this._canChangeName         = wrapper.readBoolean();
        this._boolean3              = wrapper.readBoolean();

        return true;
    }

    public get userId(): number
    {
        return this._userId;
    }

    public get username(): string
    {
        return this._username;
    }

    public get figure(): string
    {
        return this._figure;
    }

    public get gender(): string
    {
        return this._gender;
    }

    public get motto(): string
    {
        return this._motto;
    }

    public get realName(): string
    {
        return this._realName;
    }
}