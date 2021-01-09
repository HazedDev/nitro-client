import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class CatalogPageComposer implements IMessageComposer
{
    private _data: any[];

    constructor(pageId: number, offerId: number, catalogType: string)
    {
        this._data = [ pageId, offerId, catalogType ];
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