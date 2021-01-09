import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class CatalogPurchaseComposer implements IMessageComposer
{
    private _data: any[];

    constructor(pageId: number, offerId: number, extraData: string, amount: number)
    {
        this._data = [ pageId, offerId, extraData, amount ];
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