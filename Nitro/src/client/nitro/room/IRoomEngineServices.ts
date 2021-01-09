import { IConnection } from "src/client/core/communication/connections/IConnection";
import { Vector3D } from "src/client/room/utils/Vector3D";
import { IObjectData } from "./object/data/IObjectData";
import { SelectedRoomObjectData } from "./utils/SelectedRoomObjectData";

export interface IRoomEngineServices {
    _Str_16645(typeId: number, category: number, arg2: boolean, instanceData?: string, stuffData?: IObjectData, state?: number, frameNumber?: number, posture?: string);
    addRoomInstanceFloorHole(roomId: number, objectId: number);
    removeRoomInstanceFloorHole(roomId: number, objectId: number);
    updateMousePointer(type: string, objectId: number, objectType: string);
    loadRoomObjectBadgeImage(roomId: number, objectId: number, objectCategory: any, badgeId: string, groupBadge: boolean);
    getRoomObjectCategoryForType(type: string);
    sessionDataManager: any;
    getActiveRoomInstanceRenderingCanvas();
    getRoomObjectCursor(roomId: number);
    getRoomInstance(roomId: number);
    getRoomTileObjectMap(roomId: number);
    setPlacedRoomObjectData(roomId: number, arg1: SelectedRoomObjectData);
    getFurnitureStackingHeightMap(roomId: number): import("./utils/FurnitureStackingHeightMap").FurnitureStackingHeightMap;
    roomSessionManager: any;
    _Str_7972(arg0: boolean);
    getLegacyWallGeometry(roomId: number);
    events: any;
    connection: IConnection;
    getRoomObjectSelectionArrow(k: number);
    _Str_17948();
    updateRoomObjectMask(roomId: number, id: number, arg2: boolean);
    removeRoomObjectFloor(roomId: number, objectId: number);
    removeRoomObjectWall(roomId: number, objectId: number);
    removeRoomObjectUser(roomId: number, objectId: number);
    getSelectedRoomObjectData(roomId: number): SelectedRoomObjectData;
    setSelectedRoomObjectData(roomId: number, selectedData: SelectedRoomObjectData);
    isDecorating: any;
    addRoomObjectUser(roomId: number, id: number, arg2: Vector3D, arg3: Vector3D, arg4: number, typeId: number, _Str_4766: string);
    addFurnitureWall(roomId: number, id: number, typeId: number, loc: Vector3D, dir: Vector3D, arg5: number, _Str_4766: string, arg7: number);
    getRoomObject(roomId: number, id: number, category: number);
    addFurnitureFloor(roomId: number, id: number, typeId: number, loc: Vector3D, dir: Vector3D, arg5: number, stuffData: IObjectData, arg7: number, arg8: number, arg9: number, arg10: number, arg11: string, arg12: boolean);

}