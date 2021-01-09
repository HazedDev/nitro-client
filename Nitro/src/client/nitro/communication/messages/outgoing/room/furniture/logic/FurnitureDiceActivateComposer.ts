import { IMessageComposer } from '../../../../../../../core/communication/messages/IMessageComposer';

export class FurnitureDiceActivateComposer implements IMessageComposer
{
    private _data: any[];

    constructor(itemId: number)
    {
        this._data = [ itemId ];
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