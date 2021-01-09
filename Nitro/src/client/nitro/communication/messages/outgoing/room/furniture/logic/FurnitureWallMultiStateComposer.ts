import { IMessageComposer } from '../../../../../../../core/communication/messages/IMessageComposer';

export class FurnitureWallMultiStateComposer implements IMessageComposer
{
    private _data: any[];

    constructor(itemId: number, state: number)
    {
        this._data = [ itemId, state ];
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