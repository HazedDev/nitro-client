import { IRoomRenderingCanvas } from '../../../room/renderer/IRoomRenderingCanvas';
import { IVector3D } from '../../../room/utils/IVector3D';
import { RoomId } from '../../../room/utils/RoomId';
import { Vector3D } from '../../../room/utils/Vector3D';
import { Nitro } from '../../Nitro';
import { RoomEngineEvent } from '../events/RoomEngineEvent';
import { RoomEngineObjectEvent } from '../events/RoomEngineObjectEvent';
import { IGetImageListener } from '../IGetImageListener';
import { ImageResult } from '../ImageResult';
import { IRoomEngine } from '../IRoomEngine';
import { IObjectData } from '../object/data/IObjectData';
import { LegacyDataType } from '../object/data/type/LegacyDataType';
import { RoomObjectCategory } from '../object/RoomObjectCategory';
import { RoomObjectVariable } from '../object/RoomObjectVariable';
import { RoomPlaneParser } from '../object/RoomPlaneParser';

export class RoomPreviewer 
{
    public static SCALE_NORMAL: number      = 64;
    public static SCALE_SMALL: number       = 32;
    public static PREVIEW_COUNTER: number   = 0;
    
    private static PREVIEW_CANVAS_ID: number                = 1;
    private static PREVIEW_OBJECT_ID: number                = 1;
    private static PREVIEW_OBJECT_LOCATION_X: number        = 2;
    private static PREVIEW_OBJECT_LOCATION_Y: number        = 2;
    private static ALLOWED_IMAGE_CUT: number                = 0.25;
    private static AUTOMATIC_STATE_CHANGE_INTERVAL: number  = 2500;
    private static ZOOM_ENABLED: boolean                    = true;

    private _roomEngine: IRoomEngine;
    private _previewRoomId: number = 1;
    private _currentPreviewObjectType: number = 0;
    private _currentPreviewObjectCategory: number = 0;
    private _currentPreviewObjectData: string = '';
    private _currentPreviewRectangle: PIXI.Rectangle = null;
    private _currentPreviewCanvasWidth: number = 0;
    private _currentPreviewCanvasHeight: number = 0;
    private _currentPreviewScale: number = 64;
    private _currentPreviewNeedsZoomOut: boolean;
    private _automaticStateChange: boolean;
    private _previousAutomaticStateChangeTime: number;
    private _addViewOffset: PIXI.Point;
    private _disableUpdate: boolean = false;

    constructor(roomEngine: IRoomEngine, roomId: number = 1)
    {
        this._roomEngine    = roomEngine;
        this._previewRoomId = RoomId.makeRoomPreviewerId(roomId);
        this._addViewOffset = new PIXI.Point(0, 0);

        if(this.isRoomEngineReady && this._roomEngine.events)
        {
            this._roomEngine.events.addEventListener(RoomEngineObjectEvent.ADDED, this.onRoomObjectAdded.bind(this));
            this._roomEngine.events.addEventListener(RoomEngineObjectEvent.CONTENT_UPDATED, this.onRoomObjectAdded.bind(this));
            this._roomEngine.events.addEventListener(RoomEngineEvent.INITIALIZED, this.onRoomInitializedonRoomInitialized.bind(this));
        }

        this.createRoomForPreview();
    }

    public dispose(): void
    {
        this.reset(true);

        if(this.isRoomEngineReady && this._roomEngine.events)
        {
            this._roomEngine.events.removeEventListener(RoomEngineObjectEvent.ADDED, this.onRoomObjectAdded.bind(this));
            this._roomEngine.events.removeEventListener(RoomEngineObjectEvent.CONTENT_UPDATED, this.onRoomObjectAdded.bind(this));
            this._roomEngine.events.removeEventListener(RoomEngineEvent.INITIALIZED, this.onRoomInitializedonRoomInitialized.bind(this));
        }
    }

    private createRoomForPreview(): void
    {
        if(this.isRoomEngineReady)
        {
            let size = 7;

            const planeParser = new RoomPlaneParser();

            planeParser.initializeTileMap((size + 2), (size + 2));

            let y = 1;

            while(y < (1 + size))
            {
                let x = 1;

                while(x < (1 + size))
                {
                    planeParser.setTileHeight(x, y, 0);

                    x++;
                }

                y++;
            }

            planeParser.initializeFromTileData();

            this._roomEngine.createRoomInstance(this._previewRoomId, planeParser.getMapData());

            planeParser.dispose();
        }
    }

    public reset(k: boolean): void
    {
        if(this.isRoomEngineReady)
        {
            this._roomEngine.removeRoomObjectFloor(this._previewRoomId, RoomPreviewer.PREVIEW_OBJECT_ID);
            this._roomEngine.removeRoomObjectWall(this._previewRoomId, RoomPreviewer.PREVIEW_OBJECT_ID);
            this._roomEngine.removeRoomObjectUser(this._previewRoomId, RoomPreviewer.PREVIEW_OBJECT_ID);

            if(!k) this.updatePreviewRoomView();
        }

        this._currentPreviewObjectCategory = RoomObjectCategory.MINIMUM;
    }

    public addFurnitureIntoRoom(classId: number, direction: IVector3D, objectData: IObjectData = null, extras: string = null): number
    {
        if(!objectData) objectData = new LegacyDataType();

        if(this.isRoomEngineReady)
        {
            if((this._currentPreviewObjectCategory === RoomObjectCategory.FLOOR) && (this._currentPreviewObjectType === classId)) return RoomPreviewer.PREVIEW_OBJECT_ID;

            this.reset(false);

            this._currentPreviewObjectType      = classId;
            this._currentPreviewObjectCategory  = RoomObjectCategory.FLOOR;
            this._currentPreviewObjectData      = '';

            if(this._roomEngine.addFurnitureFloor(this._previewRoomId, RoomPreviewer.PREVIEW_OBJECT_ID, classId, new Vector3D(RoomPreviewer.PREVIEW_OBJECT_LOCATION_X, RoomPreviewer.PREVIEW_OBJECT_LOCATION_Y, 0), direction, 0, objectData, NaN, -1, 0, -1, '', true, false))
            {
                this._previousAutomaticStateChangeTime  = Nitro.instance.time;
                this._automaticStateChange              = true;

                if(extras)
                {
                    const roomObject = this._roomEngine.getRoomObject(this._previewRoomId, RoomPreviewer.PREVIEW_OBJECT_ID, this._currentPreviewObjectCategory);

                    if(roomObject) roomObject.model.setValue(RoomObjectVariable.FURNITURE_EXTRAS, extras);
                }

                this.updatePreviewRoomView();

                return RoomPreviewer.PREVIEW_OBJECT_ID;
            }
        }

        return -1;
    }

    public addWallItemIntoRoom(classId: number, direction: IVector3D, objectData: string): number
    {
        if(this.isRoomEngineReady)
        {
            if((this._currentPreviewObjectCategory === RoomObjectCategory.WALL) && (this._currentPreviewObjectType === classId) && (this._currentPreviewObjectData === objectData)) return RoomPreviewer.PREVIEW_OBJECT_ID;

            this.reset(false);

            this._currentPreviewObjectType      = classId;
            this._currentPreviewObjectCategory  = RoomObjectCategory.WALL;
            this._currentPreviewObjectData      = objectData;

            if(this._roomEngine.addFurnitureWall(this._previewRoomId, RoomPreviewer.PREVIEW_OBJECT_ID, classId, new Vector3D(0.5, 2.3, 1.8), direction, 0, objectData, 0, 0, -1, '', false))
            {
                this._previousAutomaticStateChangeTime  = Nitro.instance.time;
                this._automaticStateChange              = true;

                this.updatePreviewRoomView();
                
                return RoomPreviewer.PREVIEW_OBJECT_ID;
            }
        }

        return -1;
    }

    public addAvatarIntoRoom(figure: string, effect: number): number
    {
        if(this.isRoomEngineReady)
        {
            this.reset(false);

            this._currentPreviewObjectType      = 1;
            this._currentPreviewObjectCategory  = RoomObjectCategory.UNIT;
            this._currentPreviewObjectData      = figure;

            if(this._roomEngine.addRoomObjectUser(this._previewRoomId, RoomPreviewer.PREVIEW_OBJECT_ID, new Vector3D(RoomPreviewer.PREVIEW_OBJECT_LOCATION_X, RoomPreviewer.PREVIEW_OBJECT_LOCATION_Y, 0), new Vector3D(90, 0, 0), 135, 1, figure))
            {
                this._previousAutomaticStateChangeTime  = Nitro.instance.time;
                this._automaticStateChange              = true;
                
                this.updateUserGesture(1);
                this.updateUserEffect(effect);
                this.updateUserPosture('std');
            }

            this.updatePreviewRoomView();

            return RoomPreviewer.PREVIEW_OBJECT_ID;
        }

        return -1;
    }

    public updateUserPosture(type: string, parameter: string = ''): void
    {
        if(this.isRoomEngineReady) this._roomEngine.updateRoomObjectUserPosture(this._previewRoomId, RoomPreviewer.PREVIEW_OBJECT_ID, type, parameter);
    }

    public updateUserGesture(gestureId: number): void
    {
        if(this.isRoomEngineReady) this._roomEngine.updateRoomObjectUserGesture(this._previewRoomId, RoomPreviewer.PREVIEW_OBJECT_ID, gestureId);
    }

    public updateUserEffect(effectId: number): void
    {
        if(this.isRoomEngineReady) this._roomEngine.updateRoomObjectUserEffect(this._previewRoomId, RoomPreviewer.PREVIEW_OBJECT_ID, effectId);
    }

    public updateObjectUserFigure(figure: string, gender: string = null, subType: string = null, isRiding: boolean = false): boolean
    {
        if(this.isRoomEngineReady) return this._roomEngine.updateRoomObjectUserFigure(this._previewRoomId, RoomPreviewer.PREVIEW_OBJECT_ID, figure, gender, subType, isRiding);

        return false;
    }

    public updateObjectUserAction(action: string, value: number, parameter: string = null): void
    {
        if(this.isRoomEngineReady) this._roomEngine.updateRoomObjectUserAction(this._previewRoomId, RoomPreviewer.PREVIEW_OBJECT_ID, action, value, parameter);
    }

    public changeRoomObjectState(): void
    {
        if(this.isRoomEngineReady)
        {
            this._automaticStateChange = false;

            if(this._currentPreviewObjectCategory !== RoomObjectCategory.UNIT) this._roomEngine.changeObjectState(this._previewRoomId, RoomPreviewer.PREVIEW_OBJECT_ID, this._currentPreviewObjectCategory);
        }
    }

    private checkAutomaticRoomObjectStateChange(): void
    {
        if(this._automaticStateChange)
        {
            const time = Nitro.instance.time;

            if(time > (this._previousAutomaticStateChangeTime + RoomPreviewer.AUTOMATIC_STATE_CHANGE_INTERVAL))
            {
                this._previousAutomaticStateChangeTime = time;

                if(this.isRoomEngineReady) this._roomEngine.changeObjectState(this._previewRoomId, RoomPreviewer.PREVIEW_OBJECT_ID, this._currentPreviewObjectCategory);
            }
        }
    }

    public getRoomCanvas(width: number, height: number): PIXI.DisplayObject
    {
        if(this.isRoomEngineReady)
        {
            const displayObject = this._roomEngine.getRoomInstanceDisplay(this._previewRoomId, RoomPreviewer.PREVIEW_CANVAS_ID, width, height, this._currentPreviewScale);

            this._roomEngine.setRoomInstanceRenderingCanvasMask(this._previewRoomId, RoomPreviewer.PREVIEW_CANVAS_ID, true);

            const geometry = this._roomEngine.getRoomInstanceGeometry(this._previewRoomId, RoomPreviewer.PREVIEW_CANVAS_ID);

            if(geometry) geometry.adjustLocation(new Vector3D(RoomPreviewer.PREVIEW_OBJECT_LOCATION_X, RoomPreviewer.PREVIEW_OBJECT_LOCATION_Y, 0), 30);

            this._currentPreviewCanvasWidth     = width;
            this._currentPreviewCanvasHeight    = height;

            return displayObject;
        }

        return null;
    }

    public modifyRoomCanvas(width: number, height: number): void
    {
        if(this.isRoomEngineReady)
        {
            this._currentPreviewCanvasWidth     = width;
            this._currentPreviewCanvasHeight    = height;

            this._roomEngine.initializeRoomInstanceRenderingCanvas(this._previewRoomId, RoomPreviewer.PREVIEW_CANVAS_ID, width, height);
        }
    }

    public set addViewOffset(point: PIXI.Point)
    {
        this._addViewOffset = point;
    }

    public get addViewOffset(): PIXI.Point
    {
        return this._addViewOffset;
    }

    private updatePreviewObjectBoundingRectangle(point: PIXI.Point): void
    {
        const objectBounds = this._roomEngine.getRoomObjectBoundingRectangle(this._previewRoomId, RoomPreviewer.PREVIEW_OBJECT_ID, this._currentPreviewObjectCategory, RoomPreviewer.PREVIEW_CANVAS_ID);

        if(objectBounds && point)
        {
            objectBounds.x += -(this._currentPreviewCanvasWidth >> 1);
            objectBounds.y += -(this._currentPreviewCanvasHeight >> 1);

            objectBounds.x += -(point.x);
            objectBounds.y += -(point.y);

            if(!this._currentPreviewRectangle)
            {
                this._currentPreviewRectangle = objectBounds;
            }
            else
            {
                const bounds = this._currentPreviewRectangle.clone().enlarge(objectBounds);

                if(((((bounds.width - this._currentPreviewRectangle.width) > ((this._currentPreviewCanvasWidth - this._currentPreviewRectangle.width) >> 1)) || ((bounds.height - this._currentPreviewRectangle.height) > ((this._currentPreviewCanvasHeight - this._currentPreviewRectangle.height) >> 1))) || (this._currentPreviewRectangle.width < 1)) || (this._currentPreviewRectangle.height < 1)) this._currentPreviewRectangle = bounds;
            }
        }
    }

    private validatePreviewSize(point: PIXI.Point): PIXI.Point
    {
        if(((this._currentPreviewRectangle.width < 1) || (this._currentPreviewRectangle.height < 1)))
        {
            return point;
        }

        if (this.isRoomEngineReady)
        {
            const geometry = this._roomEngine.getRoomInstanceGeometry(this._previewRoomId, RoomPreviewer.PREVIEW_CANVAS_ID);

            if((this._currentPreviewRectangle.width > (this._currentPreviewCanvasWidth * (1 + RoomPreviewer.ALLOWED_IMAGE_CUT))) || (this._currentPreviewRectangle.height > (this._currentPreviewCanvasHeight * (1 + RoomPreviewer.ALLOWED_IMAGE_CUT))))
            {
                if(RoomPreviewer.ZOOM_ENABLED)
                {
                    if(this._roomEngine.getRoomInstanceRenderingCanvasScale(this._previewRoomId, RoomPreviewer.PREVIEW_CANVAS_ID) !== 0.5)
                    {
                        this._roomEngine.setRoomInstanceRenderingCanvasScale(this._previewRoomId, RoomPreviewer.PREVIEW_CANVAS_ID, 0.5, null, null);

                        this._currentPreviewScale  = RoomPreviewer.SCALE_SMALL;
                        this._currentPreviewNeedsZoomOut = true;

                        point.x = (point.x >> 1);
                        point.y = (point.y >> 1);

                        this._currentPreviewRectangle.x         = (this._currentPreviewRectangle.x >> 2);
                        this._currentPreviewRectangle.y         = (this._currentPreviewRectangle.y >> 2);
                        this._currentPreviewRectangle.width     = (this._currentPreviewRectangle.width >> 2);
                        this._currentPreviewRectangle.height    = (this._currentPreviewRectangle.height >> 2);
                    }
                }
                else
                {
                    if(geometry.isZoomedIn())
                    {
                        geometry.performZoomOut();

                        this._currentPreviewScale = RoomPreviewer.SCALE_SMALL;
                        this._currentPreviewNeedsZoomOut = true;

                        point.x = (point.x >> 1);
                        point.y = (point.y >> 1);

                        this._currentPreviewRectangle.x         = (this._currentPreviewRectangle.x >> 2);
                        this._currentPreviewRectangle.y         = (this._currentPreviewRectangle.y >> 2);
                        this._currentPreviewRectangle.width     = (this._currentPreviewRectangle.width >> 2);
                        this._currentPreviewRectangle.height    = (this._currentPreviewRectangle.height >> 2);
                    }
                }
            }

            else if ((((this._currentPreviewRectangle.width << 1) < ((this._currentPreviewCanvasWidth * (1 + RoomPreviewer.ALLOWED_IMAGE_CUT)) - 5)) && ((this._currentPreviewRectangle.height << 1) < ((this._currentPreviewCanvasHeight * (1 + RoomPreviewer.ALLOWED_IMAGE_CUT)) - 5))))
            {
                if(RoomPreviewer.ZOOM_ENABLED)
                {
                    if((this._roomEngine.getRoomInstanceRenderingCanvasScale(this._previewRoomId, RoomPreviewer.PREVIEW_CANVAS_ID) !== 1) && !this._currentPreviewNeedsZoomOut)
                    {
                        this._roomEngine.setRoomInstanceRenderingCanvasScale(this._previewRoomId, RoomPreviewer.PREVIEW_CANVAS_ID, 1, null, null);

                        this._currentPreviewScale = RoomPreviewer.SCALE_NORMAL;

                        point.x = (point.x << 1);
                        point.y = (point.y << 1);
                    }
                }
                else
                {
                    if(!geometry.isZoomedIn() && !this._currentPreviewNeedsZoomOut)
                    {
                        geometry.performZoomIn();

                        this._currentPreviewScale = RoomPreviewer.SCALE_NORMAL;

                        point.x = (point.x << 1);
                        point.y = (point.y << 1);
                    }
                }
            }
        }

        return point;
    }

    public zoomIn(): void
    {
        if(this.isRoomEngineReady)
        {
            if(RoomPreviewer.ZOOM_ENABLED)
            {
                this._roomEngine.setRoomInstanceRenderingCanvasScale(this._previewRoomId, RoomPreviewer.PREVIEW_CANVAS_ID, 1);
            }

            const geometry = this._roomEngine.getRoomInstanceGeometry(this._previewRoomId, RoomPreviewer.PREVIEW_CANVAS_ID);

            geometry.performZoomIn();
        }

        this._currentPreviewScale = RoomPreviewer.SCALE_NORMAL;
    }

    public zoomOut(): void
    {
        if(this.isRoomEngineReady)
        {
            if (RoomPreviewer.ZOOM_ENABLED)
            {
                this._roomEngine.setRoomInstanceRenderingCanvasScale(this._previewRoomId, RoomPreviewer.PREVIEW_CANVAS_ID, 0.5);
            }
            else
            {
                const geometry = this._roomEngine.getRoomInstanceGeometry(this._previewRoomId, RoomPreviewer.PREVIEW_CANVAS_ID);

                geometry.performZoomOut();
            }
        }

        this._currentPreviewScale = RoomPreviewer.SCALE_SMALL;
    }

    public updateAvatarDirection(direction: number, headDirection: number): void
    {
        if(this.isRoomEngineReady)
        {
            this._roomEngine.updateRoomObjectUserLocation(this._previewRoomId, RoomPreviewer.PREVIEW_OBJECT_ID, new Vector3D(RoomPreviewer.PREVIEW_OBJECT_LOCATION_X, RoomPreviewer.PREVIEW_OBJECT_LOCATION_Y, 0), new Vector3D(RoomPreviewer.PREVIEW_OBJECT_LOCATION_X, RoomPreviewer.PREVIEW_OBJECT_LOCATION_Y, 0), false, 0, new Vector3D((direction * 45), 0, 0), (headDirection * 45));
        }
    }

    public updateObjectRoom(floorType: string = null, wallType: string = null, landscapeType: string = null, _arg_4: boolean = false): boolean
    {
        if(this.isRoomEngineReady) return this._roomEngine.updateRoomInstancePlaneType(this._previewRoomId, floorType, wallType, landscapeType, _arg_4);

        return false;
    }

    public updateRoomWallsAndFloorVisibility(wallsVisible: boolean, floorsVisible: boolean = true): void
    {
        if(this.isRoomEngineReady) this._roomEngine.updateRoomInstancePlaneVisibility(this._previewRoomId, wallsVisible, floorsVisible);
    }

    private getCanvasOffset(point: PIXI.Point): PIXI.Point
    {
        if(((this._currentPreviewRectangle.width < 1) || (this._currentPreviewRectangle.height < 1))) return point;

        let x       = (-(this._currentPreviewRectangle.left + this._currentPreviewRectangle.right) >> 1);
        let y       = (-(this._currentPreviewRectangle.top + this._currentPreviewRectangle.bottom) >> 1);
        let height  = ((this._currentPreviewCanvasHeight - this._currentPreviewRectangle.height) >> 1);

        if(height > 10)
        {
            y = (y + Math.min(15, (height - 10)));
        }
        else
        {
            if(this._currentPreviewObjectCategory !== RoomObjectCategory.UNIT)
            {
                y = (y + (5 - Math.max(0, (height / 2))));
            }
            else
            {
                y = (y - (5 - Math.min(0, (height / 2))));
            }
        }

        y = (y + this._addViewOffset.y);
        x = (x + this._addViewOffset.x);

        let offsetX = (x - point.x);
        let offsetY = (y - point.y);

        if((offsetX !== 0) || (offsetY !== 0))
        {
            const _local_7 = Math.sqrt(((offsetX * offsetX) + (offsetY * offsetY)));

            if(_local_7 > 10)
            {
                x = (point.x + ((offsetX * 10) / _local_7));
                y = (point.y + ((offsetY * 10) / _local_7));
            }

            return new PIXI.Point(x, y);
        }

        return null;
    }

    public updatePreviewRoomView(k: boolean = false): void
    {
        if(this._disableUpdate && !k) return;

        this.checkAutomaticRoomObjectStateChange();

        if(this.isRoomEngineReady)
        {
            let offset = this._roomEngine.getRoomInstanceRenderingCanvasOffset(this._previewRoomId, RoomPreviewer.PREVIEW_CANVAS_ID);

            if(offset)
            {
                this.updatePreviewObjectBoundingRectangle(offset);

                if(this._currentPreviewRectangle)
                {
                    const _local_3 = this._currentPreviewScale;

                    offset = this.validatePreviewSize(offset);
                    
                    const _local_4 = this.getCanvasOffset(offset);

                    if(_local_4)
                    {
                        this._roomEngine.setRoomInstanceRenderingCanvasOffset(this._previewRoomId, RoomPreviewer.PREVIEW_CANVAS_ID, _local_4);
                    }

                    if(this._currentPreviewScale !== _local_3) this._currentPreviewRectangle = null;
                }
            }
        }
    }

    public set disableUpdate(flag: boolean)
    {
        this._disableUpdate = flag;
    }

    public set disableRoomEngineUpdate(flag: boolean)
    {
        if(this.isRoomEngineReady) this._roomEngine.disableUpdate(flag);
    }

    private onRoomInitializedonRoomInitialized(event: RoomEngineEvent): void
    {
        if(!event) return;

        switch (event.type)
        {
            case RoomEngineEvent.INITIALIZED:
                if((event.roomId === this._previewRoomId) && this.isRoomEngineReady)
                {
                    this._roomEngine.updateRoomInstancePlaneType(this._previewRoomId, '110', '99999');
                }
                return;
        }
    }

    private onRoomObjectAdded(event: RoomEngineObjectEvent): void
    {
        if((event.roomId === this._previewRoomId) && (event.objectId === RoomPreviewer.PREVIEW_OBJECT_ID) && (event.category === this._currentPreviewObjectCategory))
        {
            this._currentPreviewRectangle       = null;
            this._currentPreviewNeedsZoomOut    = false;

            const roomObject = this._roomEngine.getRoomObject(event.roomId, event.objectId, event.category);

            if(roomObject && roomObject.model && (event.category === RoomObjectCategory.WALL))
            {
                const sizeZ = roomObject.model.getValue<number>(RoomObjectVariable.FURNITURE_SIZE_Z);
                const centerZ = roomObject.model.getValue<number>(RoomObjectVariable.FURNITURE_CENTER_Z);

                if((sizeZ !== null) || (centerZ !== null))
                {
                    this._roomEngine.updateRoomObjectWallLocation(event.roomId, event.objectId, new Vector3D(0.5, 2.3, (((3.6 - sizeZ) / 2) + centerZ)));
                }
            }
        }
    }

    public updateRoomEngine(): void
    {
        if(this.isRoomEngineReady) this._roomEngine.runUpdate();
    }

    public getRenderingCanvas(): IRoomRenderingCanvas
    {
        const renderingCanvas = this._roomEngine.getRoomInstanceRenderingCanvas(this._previewRoomId, RoomPreviewer.PREVIEW_CANVAS_ID);

        if(!renderingCanvas) return null;

        return renderingCanvas;
    }

    public getGenericRoomObjectImage(type: string, value: string, direction: IVector3D, scale: number, listener:IGetImageListener, bgColor: number = 0, extras: string = null, objectData: IObjectData = null, state: number = -1, frame: number = -1, posture: string = null): ImageResult
    {
        if(this.isRoomEngineReady)
        {
            return this._roomEngine.getGenericRoomObjectImage(type, value, direction, scale, listener, bgColor, extras, objectData, state, frame, posture);
        }

        return null;
    }

    public getRoomObjectImage(direction: IVector3D, scale: number, listener: IGetImageListener, bgColor: number = 0): ImageResult
    {
        if(this.isRoomEngineReady)
        {
            return this._roomEngine.getRoomObjectImage(this._previewRoomId, RoomPreviewer.PREVIEW_OBJECT_ID, this._currentPreviewObjectCategory, direction, scale, listener, bgColor);
        }

        return null;
    }

    public getRoomObjectCurrentImage(): PIXI.RenderTexture
    {
        if(this.isRoomEngineReady)
        {
            const roomObject = this._roomEngine.getRoomObject(this._previewRoomId, RoomPreviewer.PREVIEW_OBJECT_ID, RoomObjectCategory.UNIT);
            
            //@ts-ignore
            if(roomObject && roomObject.visualization) return roomObject.visualization.getImage(0xFFFFFF, -1);
        }

        return null;
    }

    public get isRoomEngineReady(): boolean
    {
        return (this._roomEngine && this._roomEngine.ready);
    }

    public get roomId(): number
    {
        return this._previewRoomId;
    }
}