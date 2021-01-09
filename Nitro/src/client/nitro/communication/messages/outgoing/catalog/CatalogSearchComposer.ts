import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class CatalogSearchComposer implements IMessageComposer
{
    private _data: any[];

    constructor(offerId: number)
    {
        this._data = [ offerId ];
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