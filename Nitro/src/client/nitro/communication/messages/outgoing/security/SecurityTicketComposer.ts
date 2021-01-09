import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class SecurityTicketComposer implements IMessageComposer
{
    private _data: any[];

    constructor(ticket: string)
    {
        this._data = [ ticket ];
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