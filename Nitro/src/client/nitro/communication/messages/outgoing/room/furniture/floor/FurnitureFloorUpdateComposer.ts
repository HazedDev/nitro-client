import { IMessageComposer } from '../../../../../../../core/communication/messages/IMessageComposer';

export class FurnitureFloorUpdateComposer implements IMessageComposer
{
    private _data: any[];

    constructor(itemId: number, x: number, y: number, direction: number)
    {
        this._data = [ itemId, x, y, direction ];
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