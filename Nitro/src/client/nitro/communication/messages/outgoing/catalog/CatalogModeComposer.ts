import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class CatalogModeComposer implements IMessageComposer
{
    private _data: any[];

    constructor(mode: string)
    {
        this._data = [ mode ];
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