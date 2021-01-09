import { IMessageComposer } from '../../../../../../core/communication/messages/IMessageComposer';

export class RoomUnitGiveHandItemComposer implements IMessageComposer
{
    private _data: any[];

    constructor(unitId: number)
    {
        this._data = [ unitId ];
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