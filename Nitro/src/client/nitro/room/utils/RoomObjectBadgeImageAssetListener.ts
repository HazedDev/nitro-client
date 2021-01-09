import { IRoomObject } from '../../../room/object/IRoomObject';

export class RoomObjectBadgeImageAssetListener
{
    private _object: IRoomObject;
    private _groupBadge: boolean;

    constructor(object: IRoomObject, groupBadge: boolean)
    {
        this._object        = object;
        this._groupBadge    = groupBadge;
    }

    public get object(): IRoomObject
    {
        return this._object;
    }

    public get groupBadge(): boolean
    {
        return this._groupBadge;
    }
}