import { IMessageComposer } from '../../../../../../core/communication/messages/IMessageComposer';

export class RoomUnitPostureComposer implements IMessageComposer
{
    private _data: any[];

    constructor(posture: number)
    {
        this._data = [ posture ];
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