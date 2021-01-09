import { IMessageComposer } from '../../../../../../core/communication/messages/IMessageComposer';

export class FurniturePostItPlaceComposer implements IMessageComposer
{
    private _data: any[];

    constructor(itemId: number, wallLocation: string)
    {
        this._data = [ itemId, wallLocation ];
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