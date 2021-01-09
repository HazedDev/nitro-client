import { IMessageDataWrapper } from '../../../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../../../core/communication/messages/IMessageParser';

export class UserSubscriptionParser implements IMessageParser
{
    private _name: string;
    private _days: number;
    private _int1: number;
    private _months: number;
    private _years: number;
    private _bool1: boolean;
    private _bool2: boolean;
    private _int2: number;
    private _int3: number;
    private _totalSeconds: number;

    public flush(): boolean
    {
        this._name          = null;
        this._days          = 0;
        this._int1          = 0;
        this._months        = 0;
        this._years         = 0;
        this._bool1         = false;
        this._bool2         = false;
        this._int2          = 0;
        this._int3          = 0;
        this._totalSeconds  = 0;

        return true;
    }
    
    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._name          = wrapper.readString();
        this._days          = wrapper.readInt();
        this._int1          = wrapper.readInt();
        this._months        = wrapper.readInt();
        this._years         = wrapper.readInt();
        this._bool1         = wrapper.readBoolean();
        this._bool2         = wrapper.readBoolean();
        this._int2          = wrapper.readInt();
        this._int3          = wrapper.readInt();
        this._totalSeconds  = wrapper.readInt();

        return true;
    }

    public get name(): string
    {
        return this._name;
    }

    public get days(): number
    {
        return this._days;
    }

    public get int1(): number
    {
        return this._int1;
    }

    public get months(): number
    {
        return this._months;
    }

    public get years(): number
    {
        return this._years;
    }

    public get bool1(): boolean
    {
        return this._bool1;
    }

    public get bool2(): boolean
    {
        return this._bool2;
    }

    public get int2(): number
    {
        return this._int2;
    }

    public get int3(): number
    {
        return this._int3;
    }

    public get totalSeconds(): number
    {
        return this._totalSeconds;
    }
}