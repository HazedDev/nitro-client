import { IMessageComposer } from '../../../../../../core/communication/messages/IMessageComposer';

export class RoomUnitDanceComposer implements IMessageComposer
{
    private _data: any[];

    constructor(danceType: number)
    {
        this._data = [ danceType ];
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