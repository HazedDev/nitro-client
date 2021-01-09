import { IMessageComposer } from '../../../../../../core/communication/messages/IMessageComposer';

export class RoomUnitWalkComposer implements IMessageComposer
{
    private _data: any[];

    constructor(x: number, y: number)
    {
        this._data = [ x, y ];
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