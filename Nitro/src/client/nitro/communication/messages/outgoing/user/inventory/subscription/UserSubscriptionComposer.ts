import { IMessageComposer } from '../../../../../../../core/communication/messages/IMessageComposer';

export class UserSubscriptionComposer implements IMessageComposer
{
    private _data: any[];

    constructor(type: string)
    {
        this._data = [ type ];
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