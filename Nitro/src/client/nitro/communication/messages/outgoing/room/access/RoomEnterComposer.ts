import { IMessageComposer } from '../../../../../../core/communication/messages/IMessageComposer';

export class RoomEnterComposer implements IMessageComposer
{
    private _data: any[];

    constructor(roomId: number, password: string = null)
    {
        this._data = [ roomId, password ];
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