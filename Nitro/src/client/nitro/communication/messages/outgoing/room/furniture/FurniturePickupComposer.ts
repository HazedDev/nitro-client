import { IMessageComposer } from '../../../../../../core/communication/messages/IMessageComposer';

export class FurniturePickupComposer implements IMessageComposer
{
    private _data: any[];

    constructor(category: number, objectId: number)
    {
        this._data = [ category, objectId ];
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