import { IMessageComposer } from '../../../../../../core/communication/messages/IMessageComposer';

export class RoomUnitSignComposer implements IMessageComposer
{
    private _data: any[];

    constructor(signType: number)
    {
        this._data = [ signType ];
    }

    public getMessageArray(): any[]
    {
        return this._data;
    }

    public dispose(): void
    {
        return;
    }
}