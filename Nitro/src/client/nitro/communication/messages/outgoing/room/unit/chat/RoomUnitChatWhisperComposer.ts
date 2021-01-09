import { IMessageComposer } from '../../../../../../../core/communication/messages/IMessageComposer';

export class RoomUnitChatWhisperComposer implements IMessageComposer
{
    private _data: any[];

    constructor(recipientName: string, message: string, styleId: number)
    {
        this._data = [ (recipientName + ' ' + message), styleId ];
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