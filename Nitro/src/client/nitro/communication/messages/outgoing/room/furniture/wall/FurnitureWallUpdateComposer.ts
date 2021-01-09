import { IMessageComposer } from '../../../../../../../core/communication/messages/IMessageComposer';

export class FurnitureWallUpdateComposer implements IMessageComposer
{
    private _data: any[];

    constructor(itemId: number, location: string)
    {
        this._data = [ itemId, location ];
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