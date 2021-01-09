import { IMessageDataWrapper } from '../../../../../../core/communication/messages/IMessageDataWrapper';

export class RoomModerationParser
{
    private _allowMute: number;
    private _allowKick: number;
    private _allowBan: number;

    constructor(wrapper: IMessageDataWrapper)
    {
        this.reset();
        this.parse(wrapper);
    }

    private reset(): void
    {
        this._allowMute = 0;
        this._allowKick = 0;
        this._allowBan  = 0;
    }

    public parse(wrapper: IMessageDataWrapper): void
    {
        this._allowMute = wrapper.readInt();
        this._allowKick = wrapper.readInt();
        this._allowBan  = wrapper.readInt();
    }

    public get allowMute(): number
    {
        return this._allowMute;
    }

    public get allowKick(): number
    {
        return this._allowKick;
    }

    public get allowBan(): number
    {
        return this._allowBan;
    }
}