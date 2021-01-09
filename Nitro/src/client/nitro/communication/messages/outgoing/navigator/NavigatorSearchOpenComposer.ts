import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class NavigatorSearchOpenComposer implements IMessageComposer
{
    private _data: any[];

    constructor(code: string)
    {
        this._data = [ code ];
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