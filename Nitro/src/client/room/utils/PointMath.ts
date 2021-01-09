export class PointMath 
{
    public static sum(k: PIXI.Point, _arg_2: PIXI.Point): PIXI.Point
    {
        return new PIXI.Point((k.x + _arg_2.x), (k.y + _arg_2.y));
    }

    public static _Str_15193(k: PIXI.Point, _arg_2: PIXI.Point): PIXI.Point
    {
        return new PIXI.Point((k.x - _arg_2.x), (k.y - _arg_2.y));
    }

    public static _Str_6038(k: PIXI.Point, _arg_2: number): PIXI.Point
    {
        return new PIXI.Point((k.x * _arg_2), (k.y * _arg_2));
    }
}