import { IMessageComposer } from '../../../../../../core/communication/messages/IMessageComposer';

export class RoomInfoComposer implements IMessageComposer
{
    private _data: any[];

    constructor(roomId: number, enterRoom: boolean, forwardRoom: boolean)
    {
        this._data = [ roomId, (enterRoom ? 1 : 0), (forwardRoom ? 1 : 0) ];
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