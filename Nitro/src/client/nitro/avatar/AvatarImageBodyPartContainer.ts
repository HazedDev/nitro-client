export class AvatarImageBodyPartContainer 
{
    private _image: PIXI.Texture;
    private _regPoint: PIXI.Point;
    private _offset: PIXI.Point;
    private _isCacheable: boolean;

    constructor(k: PIXI.Texture, _arg_2: PIXI.Point, _arg_3: boolean)
    {
        this._image         = k;
        this._regPoint      = _arg_2;
        this._offset        = new PIXI.Point(0, 0);
        this._regPoint      = _arg_2;
        this._isCacheable   = _arg_3;

        this._Str_1225();
    }

    public dispose(): void
    {
        if(this._image) this._image.destroy();

        this._image     = null;
        this._regPoint  = null;
        this._offset    = null;
    }

    private _Str_1225(): void
    {
        this._regPoint.x    = this._regPoint.x;
        this._regPoint.y    = this._regPoint.y;
        this._offset.x      = this._offset.x;
        this._offset.y      = this._offset.y;
    }

    public _Str_1387(k: PIXI.Point): void
    {
        this._regPoint = k;

        this._Str_1225();
    }

    public get image(): PIXI.Texture
    {
        return this._image;
    }

    public set image(k: PIXI.Texture)
    {
        if(this._image && (this._image !== k)) this._image.destroy();

        this._image = k;
    }

    public get _Str_1076(): PIXI.Point
    {
        const clone = this._regPoint.clone();

        clone.x += this._offset.x;
        clone.y += this._offset.y;

        return clone;
    }

    public set offset(k: PIXI.Point)
    {
        this._offset = k;

        this._Str_1225();
    }

    public get _Str_1807(): boolean
    {
        return this._isCacheable;
    }
}