import { IDisposable } from "../core/common/disposable/IDisposable";
import { IAvatarRenderManager } from './avatar/IAvatarRenderManager';
import { IRoomEngine } from "./room/IRoomEngine";

export interface INitro extends IDisposable {
    init();
    roomSessionManager: any;
    sessionDataManager: any;
	roomEngine: IRoomEngine;
    communication: any;
    avatar: IAvatarRenderManager;
    stage: any;
    core: any;
    resizeTo?: Window | HTMLElement;
    ticker?: any;
    time?: number;
    renderer?: any;
    events?: any;
}