import { IVector3D } from '../../../room/utils/IVector3D';
import { Vector3D } from '../../../room/utils/Vector3D';

export class RoomWallData 
{
    public static _Str_5077: Vector3D[] = [
        new Vector3D(1, 0, 0),
        new Vector3D(0, 1, 0),
        new Vector3D(-1, 0, 0),
        new Vector3D(0, -1, 0)
    ];

    public static _Str_5543: Vector3D[] = [
        new Vector3D(0, 1, 0),
        new Vector3D(-1, 0, 0),
        new Vector3D(0, -1, 0),
        new Vector3D(1, 0, 0)
    ];

    private _corners: PIXI.Point[];
    private _endPoints: PIXI.Point[];
    private _directions: number[];
    private _lengths: number[];
    private _leftTurns: boolean[];
    private _borders: boolean[];
    private _hideWalls: boolean[];
    private _manuallyLeftCut: boolean[];
    private _manuallyRightCut: boolean[];
    private _addDuplicates: boolean;
    private _count: number;

    constructor()
    {
        this._corners           = [];
        this._endPoints         = [];
        this._directions        = [];
        this._lengths           = [];
        this._leftTurns         = [];
        this._borders           = [];
        this._hideWalls         = [];
        this._manuallyLeftCut   = [];
        this._manuallyRightCut  = [];
        this._addDuplicates     = false;
        this._count             = 0;
    }

    public _Str_17862(k: PIXI.Point, _arg_2: number, _arg_3: number, _arg_4: boolean, _arg_5: boolean): void
    {
        if (((this._addDuplicates) || (this._Str_22484(k, _arg_2, _arg_3, _arg_4, _arg_5))))
        {
            this._corners.push(k);
            this._directions.push(_arg_2);
            this._lengths.push(_arg_3);
            this._borders.push(_arg_4);
            this._leftTurns.push(_arg_5);
            this._hideWalls.push(false);
            this._manuallyLeftCut.push(false);
            this._manuallyRightCut.push(false);
            this._count++;
        }
    }

    private _Str_22484(k: PIXI.Point, _arg_2: number, _arg_3: number, _arg_4: boolean, _arg_5: boolean): boolean
    {
        var _local_6: number;
        while (_local_6 < this._count)
        {
            if (((((((this._corners[_local_6].x == k.x) && (this._corners[_local_6].y == k.y)) && (this._directions[_local_6] == _arg_2)) && (this._lengths[_local_6] == _arg_3)) && (this._borders[_local_6] == _arg_4)) && (this._leftTurns[_local_6] == _arg_5)))
            {
                return false;
            }
            _local_6++;
        }
        return true;
    }

    public get count(): number
    {
        return this._count;
    }

    public _Str_10778(k: number): PIXI.Point
    {
        return this._corners[k];
    }

    public _Str_19138(k: number): PIXI.Point
    {
        this._Str_23674();
        return this._endPoints[k];
    }

    public _Str_13743(k: number): number
    {
        return this._lengths[k];
    }

    public getDirection(k: number): number
    {
        return this._directions[k];
    }

    public _Str_25208(k: number): boolean
    {
        return this._borders[k];
    }

    public _Str_10019(k: number): boolean
    {
        return this._hideWalls[k];
    }

    public _Str_17084(k: number): boolean
    {
        return this._leftTurns[k];
    }

    public _Str_25455(k: number): boolean
    {
        return this._manuallyLeftCut[k];
    }

    public _Str_24163(k: number): boolean
    {
        return this._manuallyRightCut[k];
    }

    public _Str_15901(k: number, _arg_2: boolean): void
    {
        this._hideWalls[k] = _arg_2;
    }

    public _Str_24531(k: number, _arg_2: number): void
    {
        if (_arg_2 < this._lengths[k])
        {
            this._lengths[k] = _arg_2;
            this._manuallyRightCut[k] = true;
        }
    }

    public _Str_23976(k: number, _arg_2: number): void
    {
        var _local_3: IVector3D;
        if (((_arg_2 > 0) && (_arg_2 < this._lengths[k])))
        {
            const corner = this._corners[k];

            _local_3 = RoomWallData._Str_5077[this.getDirection(k)];
            this._corners[k] = new PIXI.Point((corner.x + (_arg_2 * _local_3.x)), (corner.y + (_arg_2 * _local_3.y)));
            this._lengths[k] = (this._lengths[k] - _arg_2);
            this._manuallyLeftCut[k] = true;
        }
    }

    private _Str_23674(): void
    {
        var k: number;
        var _local_2: PIXI.Point;
        var _local_3: PIXI.Point;
        var _local_4:IVector3D;
        var _local_5: number;
        if (this._endPoints.length != this.count)
        {
            this._endPoints = [];
            k = 0;
            while (k < this.count)
            {
                _local_2 = this._Str_10778(k);
                _local_3 = new PIXI.Point(_local_2.x, _local_2.y);
                _local_4 = RoomWallData._Str_5077[this.getDirection(k)];
                _local_5 = this._Str_13743(k);
                _local_3.x = (_local_3.x + (_local_4.x * _local_5));
                _local_3.y = (_local_3.y + (_local_4.y * _local_5));
                this._endPoints.push(_local_3);
                k++;
            }
        }
    }
}