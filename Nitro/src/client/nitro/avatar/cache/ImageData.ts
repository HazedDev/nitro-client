export class ImageData 
{
    private _bitmap: PIXI.Texture;
    private _rect: PIXI.Rectangle;
    private _regPoint: PIXI.Point;
    private _flipH: boolean;
    private _color: number;

    constructor(k: PIXI.Texture, rectangle: PIXI.Rectangle, _arg_3: PIXI.Point, flipH: boolean, color: number)
    {
        this._bitmap    = k;
        this._rect      = rectangle;
        this._regPoint  = _arg_3;
        this._flipH     = flipH;
        this._color     = color;

        if(flipH) this._regPoint.x = (-(this._regPoint.x) + rectangle.width);
    }

    public dispose(): void
    {
        this._bitmap    = null;
        this._regPoint  = null;
        this._color     = null;
    }

    public get bitmap(): PIXI.Texture
    {
        return this._bitmap;
    }

    public get rect(): PIXI.Rectangle
    {
        return this._rect;
    }

    public get _Str_1076(): PIXI.Point
    {
        return this._regPoint;
    }

    public get flipH(): boolean
    {
        return this._flipH;
    }

    public get color(): number
    {
        return this._color;
    }

    public get _Str_1567(): PIXI.Rectangle
    {
        return new PIXI.Rectangle(-(this._regPoint.x), -(this._regPoint.y), this._rect.width, this._rect.height);
    }
}