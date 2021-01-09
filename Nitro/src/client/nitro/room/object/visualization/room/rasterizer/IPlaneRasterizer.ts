import { IVector3D } from "src/client/room/utils/IVector3D";

export interface IPlaneRasterizer {
    _Str_8988(_Str_576: string);
    render(_local_8: PIXI.Graphics, _Str_576: string, _local_5: number, _local_6: number, scale: any, _local_7: any, _Str_13946: boolean, _Str_20541: number, _Str_19707: number, _Str_21079: number, _Str_22024: number, _arg_2: number): import("../utils/PlaneBitmapData").PlaneBitmapData;
    getTextureIdentifier(k: number, normal: IVector3D): string;

}