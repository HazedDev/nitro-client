import { IMessageComposer } from '../../../../../../core/communication/messages/IMessageComposer';

export class UserFigureComposer implements IMessageComposer
{
    private _data: any[];

    constructor(gender: string, figure: string)
    {
        this._data = [ gender, figure ];
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