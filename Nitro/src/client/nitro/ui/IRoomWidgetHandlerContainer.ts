import { IConnection } from 'src/client/core/communication/connections/IConnection';
import { IRoomObject } from 'src/client/room/object/IRoomObject';
import { IAvatarRenderManager } from '../avatar/IAvatarRenderManager';
import { IRoomEngine } from '../room/IRoomEngine';
import { IRoomSession } from '../session/IRoomSession';
import { ISessionDataManager } from '../session/ISessionDataManager';

export interface IRoomWidgetHandlerContainer {
    getRoomViewRect();
    isOwnerOfFurniture(roomObject: IRoomObject);
    sessionDataManager: ISessionDataManager;
    connection: IConnection;
    avatarRenderManager: IAvatarRenderManager;
    events: any;
    getFirstCanvasId();
    roomSession: IRoomSession;
    roomEngine: IRoomEngine;

}