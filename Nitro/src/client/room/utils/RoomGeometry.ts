import { IRoomGeometry } from './IRoomGeometry';
import { IVector3D } from './IVector3D';
import { Vector3D } from './Vector3D';

export class RoomGeometry implements IRoomGeometry
{
    public static SCALE_ZOOMED_IN: number = 64;
    public static SCALE_ZOOMED_OUT: number = 32;

    private _updateId: number = 0;
    private _x: Vector3D;
    private _y: Vector3D;
    private _z: Vector3D;
    private _directionAxis: Vector3D;
    private _location: Vector3D;
    private _direction: Vector3D;
    private _depth: Vector3D;
    private _scale: number = 1;
    private _x_scale: number = 1;
    private _y_scale: number = 1;
    private _z_scale: number = 1;
    private _x_scale_internal: number = 1;
    private _y_scale_internal: number = 1;
    private _z_scale_internal: number = 1;
    private _loc: Vector3D;
    private _dir: Vector3D;
    private _clipNear: number = -500;
    private _clipFar: number = 500;
    private _displacements: Map<string, IVector3D> = null;

    constructor(scale: number, direction: IVector3D, location: IVector3D, _arg_4: IVector3D = null)
    {
        this.scale = scale;
        this._x = new Vector3D();
        this._y = new Vector3D();
        this._z = new Vector3D();
        this._directionAxis = new Vector3D();
        this._location = new Vector3D();
        this._direction = new Vector3D();
        this._depth = new Vector3D();
        this._x_scale_internal = 1;
        this._y_scale_internal = 1;
        this.x_scale = 1;
        this.y_scale = 1;
        this._z_scale_internal = (Math.sqrt((1 / 2)) / Math.sqrt((3 / 4)));
        this.z_scale = 1;
        this.location = new Vector3D(location.x, location.y, location.z);
        this.direction = new Vector3D(direction.x, direction.y, direction.z);
        if (_arg_4 != null)
        {
            this.setDepthVector(_arg_4);
        }
        else
        {
            this.setDepthVector(direction);
        }
        this._displacements = new Map();
    }

    public static getIntersectionVector(k: IVector3D, _arg_2: IVector3D, _arg_3: IVector3D, _arg_4: IVector3D): IVector3D
    {
        var _local_5: number = Vector3D.dotProduct(_arg_2, _arg_4);
        if (Math.abs(_local_5) < 1E-5)
        {
            return null;
        }
        var _local_6: Vector3D = Vector3D.dif(k, _arg_3);
        var _local_7: number = (-(Vector3D.dotProduct(_arg_4, _local_6)) / _local_5);
        var _local_8: Vector3D = Vector3D.sum(k, Vector3D.product(_arg_2, _local_7));
        return _local_8;
    }


    public get updateId(): number
    {
        return this._updateId;
    }

    public get scale(): number
    {
        return this._scale / Math.sqrt(0.5);
    }

    public get directionAxis(): IVector3D
    {
        return this._directionAxis;
    }

    public get location(): IVector3D
    {
        this._location.assign(this._loc);
        this._location.x = (this._location.x * this._x_scale);
        this._location.y = (this._location.y * this._y_scale);
        this._location.z = (this._location.z * this._z_scale);
        return this._location;
    }

    public get direction(): IVector3D
    {
        return this._direction;
    }

    public set x_scale(k: number)
    {
        if (this._x_scale != (k * this._x_scale_internal))
        {
            this._x_scale = (k * this._x_scale_internal);
            this._updateId++;
        }
    }

    public set y_scale(k: number)
    {
        if (this._y_scale != (k * this._y_scale_internal))
        {
            this._y_scale = (k * this._y_scale_internal);
            this._updateId++;
        }
    }

    public set z_scale(k: number)
    {
        if (this._z_scale != (k * this._z_scale_internal))
        {
            this._z_scale = (k * this._z_scale_internal);
            this._updateId++;
        }
    }

    public set scale(k: number)
    {
        if (k <= 1)
        {
            k = 1;
        }
        k = (k * Math.sqrt(0.5));
        if (k != this._scale)
        {
            this._scale = k;
            this._updateId++;
        }
    }

    public set location(k: IVector3D)
    {
        if (k == null)
        {
            return;
        }
        if (this._loc == null)
        {
            this._loc = new Vector3D();
        }
        var _local_2: number = this._loc.x;
        var _local_3: number = this._loc.y;
        var _local_4: number = this._loc.z;
        this._loc.assign(k);
        this._loc.x = (this._loc.x / this._x_scale);
        this._loc.y = (this._loc.y / this._y_scale);
        this._loc.z = (this._loc.z / this._z_scale);
        if ((((!(this._loc.x == _local_2)) || (!(this._loc.y == _local_3))) || (!(this._loc.z == _local_4))))
        {
            this._updateId++;
        }
    }

    public set direction(k: IVector3D)
    {
        var _local_21: number;
        var _local_22: number;
        var _local_23: Vector3D;
        var _local_24: Vector3D;
        var _local_25: Vector3D;
        if (k == null)
        {
            return;
        }
        if (this._dir == null)
        {
            this._dir = new Vector3D();
        }
        var _local_2: number = this._dir.x;
        var _local_3: number = this._dir.y;
        var _local_4: number = this._dir.z;
        this._dir.assign(k);
        this._direction.assign(k);
        if ((((!(this._dir.x == _local_2)) || (!(this._dir.y == _local_3))) || (!(this._dir.z == _local_4))))
        {
            this._updateId++;
        }
        var _local_5: Vector3D = new Vector3D(0, 1, 0);
        var _local_6: Vector3D = new Vector3D(0, 0, 1);
        var _local_7: Vector3D = new Vector3D(1, 0, 0);
        var _local_8: number = ((k.x / 180) * Math.PI);
        var _local_9: number = ((k.y / 180) * Math.PI);
        var _local_10: number = ((k.z / 180) * Math.PI);
        var _local_11: number = Math.cos(_local_8);
        var _local_12: number = Math.sin(_local_8);
        var _local_13: Vector3D = Vector3D.sum(Vector3D.product(_local_5, _local_11), Vector3D.product(_local_7, -(_local_12)));
        var _local_14: Vector3D = new Vector3D(_local_6.x, _local_6.y, _local_6.z);
        var _local_15: Vector3D = Vector3D.sum(Vector3D.product(_local_5, _local_12), Vector3D.product(_local_7, _local_11));
        var _local_16: number = Math.cos(_local_9);
        var _local_17: number = Math.sin(_local_9);
        var _local_18: Vector3D = new Vector3D(_local_13.x, _local_13.y, _local_13.z);
        var _local_19: Vector3D = Vector3D.sum(Vector3D.product(_local_14, _local_16), Vector3D.product(_local_15, _local_17));
        var _local_20: Vector3D = Vector3D.sum(Vector3D.product(_local_14, -(_local_17)), Vector3D.product(_local_15, _local_16));
        if (_local_10 != 0)
        {
            _local_21 = Math.cos(_local_10);
            _local_22 = Math.sin(_local_10);
            _local_23 = Vector3D.sum(Vector3D.product(_local_18, _local_21), Vector3D.product(_local_19, _local_22));
            _local_24 = Vector3D.sum(Vector3D.product(_local_18, -(_local_22)), Vector3D.product(_local_19, _local_21));
            _local_25 = new Vector3D(_local_20.x, _local_20.y, _local_20.z);
            this._x.assign(_local_23);
            this._y.assign(_local_24);
            this._z.assign(_local_25);
            this._directionAxis.assign(this._z);
        }
        else
        {
            this._x.assign(_local_18);
            this._y.assign(_local_19);
            this._z.assign(_local_20);
            this._directionAxis.assign(this._z);
        }
    }

    public dispose(): void
    {
        this._x = null;
        this._y = null;
        this._z = null;
        this._loc = null;
        this._dir = null;
        this._directionAxis = null;
        this._location = null;
        if (this._displacements != null)
        {
            this._displacements.clear();
            this._displacements = null;
        }
    }

    public setDisplacement(k: IVector3D, _arg_2: IVector3D): void
    {
        var _local_3: string;
        var _local_4: Vector3D;
        if (((k == null) || (_arg_2 == null)))
        {
            return;
        }
        if (this._displacements != null)
        {
            _local_3 = Math.trunc(Math.round(k.x)) + '_' + Math.trunc(Math.round(k.y)) + '_' + Math.trunc(Math.round(k.z));
            this._displacements.delete(_local_3);
            _local_4 = new Vector3D();
            _local_4.assign(_arg_2);
            this._displacements.set(_local_3, _local_4);
            this._updateId++;
        }
    }

    private getDisplacenent(k: IVector3D): IVector3D
    {
        var _local_2: string;
        if (this._displacements != null)
        {
            _local_2 = Math.trunc(Math.round(k.x)) + '_' + Math.trunc(Math.round(k.y)) + '_' + Math.trunc(Math.round(k.z));
            return this._displacements.get(_local_2);
        }
        return null;
    }

    public setDepthVector(k: IVector3D): void
    {
        var _local_18: number;
        var _local_19: number;
        var _local_20: Vector3D;
        var _local_21: Vector3D;
        var _local_22: Vector3D;
        var _local_2: Vector3D = new Vector3D(0, 1, 0);
        var _local_3: Vector3D = new Vector3D(0, 0, 1);
        var _local_4: Vector3D = new Vector3D(1, 0, 0);
        var _local_5: number = ((k.x / 180) * Math.PI);
        var _local_6: number = ((k.y / 180) * Math.PI);
        var _local_7: number = ((k.z / 180) * Math.PI);
        var _local_8: number = Math.cos(_local_5);
        var _local_9: number = Math.sin(_local_5);
        var _local_10: Vector3D = Vector3D.sum(Vector3D.product(_local_2, _local_8), Vector3D.product(_local_4, -(_local_9)));
        var _local_11: Vector3D = new Vector3D(_local_3.x, _local_3.y, _local_3.z);
        var _local_12: Vector3D = Vector3D.sum(Vector3D.product(_local_2, _local_9), Vector3D.product(_local_4, _local_8));
        var _local_13: number = Math.cos(_local_6);
        var _local_14: number = Math.sin(_local_6);
        var _local_15: Vector3D = new Vector3D(_local_10.x, _local_10.y, _local_10.z);
        var _local_16: Vector3D = Vector3D.sum(Vector3D.product(_local_11, _local_13), Vector3D.product(_local_12, _local_14));
        var _local_17: Vector3D = Vector3D.sum(Vector3D.product(_local_11, -(_local_14)), Vector3D.product(_local_12, _local_13));
        if (_local_7 != 0)
        {
            _local_18 = Math.cos(_local_7);
            _local_19 = Math.sin(_local_7);
            _local_20 = Vector3D.sum(Vector3D.product(_local_15, _local_18), Vector3D.product(_local_16, _local_19));
            _local_21 = Vector3D.sum(Vector3D.product(_local_15, -(_local_19)), Vector3D.product(_local_16, _local_18));
            _local_22 = new Vector3D(_local_17.x, _local_17.y, _local_17.z);
            this._depth.assign(_local_22);
        }
        else
        {
            this._depth.assign(_local_17);
        }
        this._updateId++;
    }

    public adjustLocation(k: IVector3D, _arg_2: number): void
    {
        if (((k == null) || (this._z == null)))
        {
            return;
        }
        var _local_3: Vector3D = Vector3D.product(this._z, -(_arg_2));
        var _local_4: Vector3D = new Vector3D((k.x + _local_3.x), (k.y + _local_3.y), (k.z + _local_3.z));
        this.location = _local_4;
    }

    public getCoordinatePosition(k: IVector3D): IVector3D
    {
        if (k == null)
        {
            return null;
        }
        var _local_2: number = Vector3D.scalarProjection(k, this._x);
        var _local_3: number = Vector3D.scalarProjection(k, this._y);
        var _local_4: number = Vector3D.scalarProjection(k, this._z);
        var _local_5: Vector3D = new Vector3D(_local_2, _local_3, _local_4);
        return _local_5;
    }

    public getScreenPosition(k: IVector3D): IVector3D
    {
        var _local_2: Vector3D = Vector3D.dif(k, this._loc);
        _local_2.x = (_local_2.x * this._x_scale);
        _local_2.y = (_local_2.y * this._y_scale);
        _local_2.z = (_local_2.z * this._z_scale);
        var _local_3: number = Vector3D.scalarProjection(_local_2, this._depth);
        if (((_local_3 < this._clipNear) || (_local_3 > this._clipFar)))
        {
            return null;
        }
        var _local_4: number = Vector3D.scalarProjection(_local_2, this._x);
        var _local_5: number = -(Vector3D.scalarProjection(_local_2, this._y));
        _local_4 = (_local_4 * this._scale);
        _local_5 = (_local_5 * this._scale);
        var _local_6: IVector3D = this.getDisplacenent(k);
        if (_local_6 != null)
        {
            _local_2 = Vector3D.dif(k, this._loc);
            _local_2.add(_local_6);
            _local_2.x = (_local_2.x * this._x_scale);
            _local_2.y = (_local_2.y * this._y_scale);
            _local_2.z = (_local_2.z * this._z_scale);
            _local_3 = Vector3D.scalarProjection(_local_2, this._depth);
        }
        _local_2.x = _local_4;
        _local_2.y = _local_5;
        _local_2.z = _local_3;
        return _local_2;
    }

    public getScreenPoint(k: IVector3D): PIXI.Point
    {
        var _local_2: IVector3D = this.getScreenPosition(k);
        if (_local_2 == null)
        {
            return null;
        }
        var _local_3: PIXI.Point = new PIXI.Point(_local_2.x, _local_2.y);
        return _local_3;
    }

    public getPlanePosition(k: PIXI.Point, _arg_2: IVector3D, _arg_3: IVector3D, _arg_4: IVector3D): PIXI.Point
    {
        var _local_15: number;
        var _local_16: number;
        var _local_5: number = (k.x / this._scale);
        var _local_6: number = (-(k.y) / this._scale);
        var _local_7: Vector3D = Vector3D.product(this._x, _local_5);
        _local_7.add(Vector3D.product(this._y, _local_6));
        var _local_8: Vector3D = new Vector3D((this._loc.x * this._x_scale), (this._loc.y * this._y_scale), (this._loc.z * this._z_scale));
        _local_8.add(_local_7);
        var _local_9: IVector3D = this._z;
        var _local_10: Vector3D = new Vector3D((_arg_2.x * this._x_scale), (_arg_2.y * this._y_scale), (_arg_2.z * this._z_scale));
        var _local_11: Vector3D = new Vector3D((_arg_3.x * this._x_scale), (_arg_3.y * this._y_scale), (_arg_3.z * this._z_scale));
        var _local_12: Vector3D = new Vector3D((_arg_4.x * this._x_scale), (_arg_4.y * this._y_scale), (_arg_4.z * this._z_scale));
        var _local_13: IVector3D = Vector3D.crossProduct(_local_11, _local_12);
        var _local_14: Vector3D = new Vector3D();
        _local_14.assign(RoomGeometry.getIntersectionVector(_local_8, _local_9, _local_10, _local_13));
        if (_local_14 != null)
        {
            _local_14.subtract(_local_10);
            _local_15 = ((Vector3D.scalarProjection(_local_14, _arg_3) / _local_11.length) * _arg_3.length);
            _local_16 = ((Vector3D.scalarProjection(_local_14, _arg_4) / _local_12.length) * _arg_4.length);
            return new PIXI.Point(_local_15, _local_16);
        }
        return null;
    }

    public performZoom(): void
    {
        if (this.isZoomedIn())
        {
            this.scale = RoomGeometry.SCALE_ZOOMED_OUT;
        }
        else
        {
            this.scale = RoomGeometry.SCALE_ZOOMED_IN;
        }
    }

    public isZoomedIn(): boolean
    {
        return this.scale == RoomGeometry.SCALE_ZOOMED_IN;
    }

    public performZoomOut(): void
    {
        this.scale = RoomGeometry.SCALE_ZOOMED_OUT;
    }

    public performZoomIn(): void
    {
        this.scale = RoomGeometry.SCALE_ZOOMED_IN;
    }
}