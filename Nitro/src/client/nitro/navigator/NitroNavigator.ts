import { NitroManager } from '../../core/common/NitroManager';
import { INitroCommunicationManager } from '../communication/INitroCommunicationManager';
import { IRoomSessionManager } from '../session/IRoomSessionManager';
import { ISessionDataManager } from '../session/ISessionDataManager';
import { INitroNavigator } from './INitroNavigator';
import { NavigatorMessageHandler } from './NavigatorMessageHandler';

export class NitroNavigator extends NitroManager implements INitroNavigator
{
    private _communication: INitroCommunicationManager;
    private _session: ISessionDataManager;
    private _roomSession: IRoomSessionManager;
    private _navigatorMessageHandler: NavigatorMessageHandler;

    constructor(communication: INitroCommunicationManager, session: ISessionDataManager, roomSession: IRoomSessionManager)
    {
        super();

        this._communication             = communication;
        this._session                   = session;
        this._roomSession               = roomSession;
        this._navigatorMessageHandler   = new NavigatorMessageHandler(this);
    }

    protected onInit(): void
    {
        this._navigatorMessageHandler.setConnection(this._communication.connection);
    }

    public goToRoom(roomId: number, password: string = null): void
    {
        if(!this._roomSession) return;

        this._roomSession.createSession(roomId, password);
    }

    public get communication(): INitroCommunicationManager
    {
        return this._communication;
    }

    public get session(): ISessionDataManager
    {
        return this._session;
    }

    public get roomSession(): IRoomSessionManager
    {
        return this._roomSession;
    }
}