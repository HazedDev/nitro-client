import { IMessageComposer } from '../../../../../../core/communication/messages/IMessageComposer';

export class UserHomeRoomComposer implements IMessageComposer
{
    private _data: any[];

    constructor(roomId: number)
    {
        this._data = [ roomId ];
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