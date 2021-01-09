import { IGraphicAsset } from '../../../../../../room/object/visualization/utils/IGraphicAsset';

export class PlaneMaskBitmap 
{
    public static _Str_3268: number = -1;
    public static _Str_3271: number = 1;

    private _asset: IGraphicAsset;
    private _normalMinX: number;
    private _normalMaxX: number;
    private _normalMinY: number;
    private _normalMaxY: number;

    constructor(k: IGraphicAsset, _arg_2: number = -1, _arg_3: number = 1, _arg_4: number = -1, _arg_5: number = 1)
    {
        this._normalMinX    = _arg_2;
        this._normalMaxX    = _arg_3;
        this._normalMinY    = _arg_4;
        this._normalMaxY    = _arg_5;
        this._asset         = k;
    }

    public get asset(): IGraphicAsset
    {
        return this._asset;
    }

    public get normalMinX():Number
    {
        return this._normalMinX;
    }

    public get normalMaxX():Number
    {
        return this._normalMaxX;
    }

    public get normalMinY():Number
    {
        return this._normalMinY;
    }

    public get normalMaxY():Number
    {
        return this._normalMaxY;
    }

    public dispose(): void
    {
        this._asset = null;
    }
}