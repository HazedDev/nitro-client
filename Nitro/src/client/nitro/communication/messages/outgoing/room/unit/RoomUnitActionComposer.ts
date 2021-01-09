import { IMessageComposer } from '../../../../../../core/communication/messages/IMessageComposer';

export class RoomUnitActionComposer implements IMessageComposer
{
    private _data: any[];

    constructor(actionType: number)
    {
        this._data = [ actionType ];
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