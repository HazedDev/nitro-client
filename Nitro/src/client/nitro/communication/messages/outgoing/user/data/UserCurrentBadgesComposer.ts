import { IMessageComposer } from '../../../../../../core/communication/messages/IMessageComposer';

export class UserCurrentBadgesComposer implements IMessageComposer
{
    private _data: any[];

    constructor(userId: number)
    {
        this._data = [ userId ];
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