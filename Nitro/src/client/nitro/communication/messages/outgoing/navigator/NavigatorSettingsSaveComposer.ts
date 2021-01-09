import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class NavigatorSettingsSaveComposer implements IMessageComposer
{
    private _data: any[];

    constructor(x: number, y: number, width: number, height: number, leftSideOpen: boolean, mode: number)
    {
        this._data = [ x, y, width, height, leftSideOpen, mode ];
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