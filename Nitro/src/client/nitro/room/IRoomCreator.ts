import { IVector3D } from "src/client/room/utils/IVector3D";
import { Vector3D } from "src/client/room/utils/Vector3D";
import { IObjectData } from "./object/data/IObjectData";
import { RoomMapData } from "./object/RoomMapData";
import { FurnitureStackingHeightMap } from "./utils/FurnitureStackingHeightMap";
import { LegacyWallGeometry } from './utils/LegacyWallGeometry';

export interface IRoomCreator {
    addFurnitureWall(roomId: number, itemId: number, spriteId: number, location: IVector3D, direction: Vector3D, state: number, stuffData: string, secondsToExpiration: number, usagePolicy: number, userId: number, username: string);
    addFurnitureFloor(roomId: number, itemId: number, spriteId: number, location: Vector3D, direction: Vector3D, state: number, data: IObjectData, NaN: number, expires: number, usagePolicy: number, userId: number, username: string, arg12: boolean, arg13: boolean, stackHeight: number);
    addFurnitureFloorByTypeName(roomId: number, itemId: number, spriteName: string, location: Vector3D, direction: Vector3D, state: number, data: IObjectData, NaN: number, expires: number, usagePolicy: number, userId: number, username: string, arg12: boolean, arg13: boolean, stackHeight: number);
    updateRoomObjectUserLocation(_currentRoomId: number, id: number, location: IVector3D, goal?: IVector3D, canStandUp?: boolean, height?: number, direction?: Vector3D, headDirection?: number);
    updateRoomObjectUserGesture(_currentRoomId: number, unitId: number, gesture: number);
    updateRoomObjectUserPetGesture(_currentRoomId: number, id: number, value: string);
    updateRoomObjectUserFlatControl(_currentRoomId: number, id: number, value: string);
    getRoomInstance(_currentRoomId: number);
    removeRoomObjectUser(_currentRoomId: number, unitId: number);
    getPetTypeId(figure: string);
    updateRoomObjectUserFigure(_currentRoomId: number, roomIndex: number, figure: string, sex: string, subType?: string, isRiding?: boolean);
    updateRoomObjectUserOwn(_currentRoomId: number, roomIndex: number);
    setRoomSessionOwnUser(_currentRoomId: number, roomIndex: number);
    addRoomObjectUser(_currentRoomId: number, roomIndex: number, location: Vector3D, direction: Vector3D, dir: number, userType: number, figure: string);
    updateRoomObjectUserEffect(_currentRoomId: number, unitId: number, effectId: number, delay: number);
    updateRoomObjectUserAction(_currentRoomId: number, unitId: number, FIGURE_DANCE: string, danceId: number);
    updateRoomObjectWallItemData(_currentRoomId: number, furnitureId: number, data: string);
    updateRoomObjectWallExpiration(_currentRoomId: number, itemId: number, secondsToExpiration: number);
    updateRoomObjectWall(_currentRoomId: number, itemId: number, location: any, direction: Vector3D, state: number, stuffData: string);
    removeRoomObjectWall(_currentRoomId: number, itemId: number, userId: number);
    updateRoomObjectFloor(_currentRoomId: number, itemId: number, location: IVector3D, direction: IVector3D, state: any, data: IObjectData);
    updateRoomObjectFloorExpiration(_currentRoomId: number, itemId: number, expires: number);
    updateRoomObjectFloorHeight(_currentRoomId: number, itemId: number, stackHeight: number);
    removeRoomObjectFloor(_currentRoomId: number, itemId: number, arg2: number, arg3: boolean);
    getRoomObjectUser(_currentRoomId: number, id: number);
    updateRoomObjectUserPosture(_currentRoomId: number, id: number, posture: string, args?: string);
    rollRoomObjectFloor(_currentRoomId: number, id: number, location: IVector3D, targetLocation: IVector3D);
    updateRoomInstancePlaneThickness(_currentRoomId: number, thicknessWall: number, thicknessFloor: number);
    updateRoomInstancePlaneVisibility(_currentRoomId: number, visibleWall: boolean, visibleFloor: boolean);
    _Str_17722(_currentRoomId: number, arg1: string);
    getFurnitureStackingHeightMap(_currentRoomId: number);
    setFurnitureStackingHeightMap(_currentRoomId: number, heightMap: FurnitureStackingHeightMap);
    createRoomInstance(_currentRoomId: number, roomMap: RoomMapData);
    getLegacyWallGeometry(_currentRoomId: number): LegacyWallGeometry;
    updateRoomInstancePlaneType(_currentRoomId: number, floorType: string, wallType: string, landscapeType: string);
    setRoomInstanceModelName(roomId: number, name: string);
    destroyRoom(_currentRoomId: number);
    
}