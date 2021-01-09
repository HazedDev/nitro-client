export class PlaneBitmapData 
{
    private _bitmap: PIXI.Graphics;
    private _timeStamp: number;

    constructor(k: PIXI.Graphics, _arg_2: number)
    {
        this._bitmap    = k;
        this._timeStamp = _arg_2;
    }

    public dispose(): void
    {
        this._bitmap = null;
    }

    public get bitmap(): PIXI.Graphics
    {
        return this._bitmap;
    }

    public get timeStamp(): number
    {
        return this._timeStamp;
    }
}