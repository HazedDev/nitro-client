export class BadgeInfo
{
    private _image: PIXI.Texture;
    private _placeHolder: boolean;

    constructor(image: PIXI.Texture, placeHolder: boolean)
    {
        this._image         = image;
        this._placeHolder   = placeHolder;
    }

    public get image(): PIXI.Texture
    {
        return this._image;
    }

    public get placeHolder(): boolean
    {
        return this._placeHolder;
    }
}