import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class NavigatorSearchSaveComposer implements IMessageComposer
{
    private _data: any[];

    constructor(code: string, data: string)
    {
        this._data = [ code, data ];
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