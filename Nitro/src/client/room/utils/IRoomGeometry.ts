import { IVector3D } from "./IVector3D";
import { Vector3D } from "./Vector3D";

export interface IRoomGeometry {
    adjustLocation(arg0: Vector3D, arg1: number);
    isZoomedIn();
    performZoomOut();
    performZoomIn();
    directionAxis: IVector3D;
    getCoordinatePosition(_normal: Vector3D);
    getScreenPoint(arg0: IVector3D);
    getPlanePosition(_local_17: PIXI.Point, _local_8: IVector3D, _local_9: IVector3D, _local_10: IVector3D): PIXI.Point;
    direction: any;
    scale: any;
    getScreenPosition(location: IVector3D): IVector3D;
    updateId: number;

}