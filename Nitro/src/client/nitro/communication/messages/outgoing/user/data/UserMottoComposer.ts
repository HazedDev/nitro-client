import { IMessageComposer } from '../../../../../../core/communication/messages/IMessageComposer';

export class UserMottoComposer implements IMessageComposer
{
    private _data: any[];

    constructor(motto: string)
    {
        this._data = [ motto ];
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