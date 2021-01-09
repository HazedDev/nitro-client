import { NitroManager } from '../../core/common/NitroManager';
import { NitroConfiguration } from '../../NitroConfiguration';
import { INitroCommunicationManager } from '../communication/INitroCommunicationManager';
import { AvailabilityStatusMessageEvent } from '../communication/messages/incoming/availability/AvailabilityStatusMessageEvent';
import { UserPermissionsEvent } from '../communication/messages/incoming/user/access/UserPermissionsEvent';
import { UserFigureEvent } from '../communication/messages/incoming/user/data/UserFigureEvent';
import { UserInfoEvent } from '../communication/messages/incoming/user/data/UserInfoEvent';
import { Nitro } from '../Nitro';
import { BadgeImageManager } from './BadgeImageManager';
import { SecurityLevel } from './enum/SecurityLevel';
import { FurnitureDataParser } from './furniture/FurnitureDataParser';
import { IFurnitureData } from './furniture/IFurnitureData';
import { IFurnitureDataListener } from './furniture/IFurnitureDataListener';
import { ISessionDataManager } from './ISessionDataManager';

export class SessionDataManager extends NitroManager implements ISessionDataManager
{
    private _communication: INitroCommunicationManager;

    private _userId: number;
    private _name: string;
    private _figure: string;
    private _gender: string;
    private _realName: string;

    private _clubLevel: number;
    private _securityLevel: number;
    private _isAmbassador: boolean;

    private _systemOpen: boolean;
    private _systemShutdown: boolean;
    private _isAuthenticHabbo: boolean;

    private _floorItems: Map<number, IFurnitureData>;
    private _wallItems: Map<number, IFurnitureData>;
    private _furnitureData: FurnitureDataParser;

    private _furnitureReady: boolean;
    private _furnitureListenersNotified: boolean;
    private _pendingFurnitureListeners: IFurnitureDataListener[];

    private _badgeImageManager: BadgeImageManager;

    constructor(communication: INitroCommunicationManager)
    {
        super();
        
        this._communication             = communication;

        this.resetUserInfo();

        this._clubLevel                     = 0;
        this._securityLevel                 = 0;
        this._isAmbassador                  = false;

        this._systemOpen                    = false;
        this._systemShutdown                = false;
        this._isAuthenticHabbo              = false;

        this._floorItems                    = new Map();
        this._wallItems                     = new Map();
        this._furnitureData                 = null;

        this._furnitureReady                = false;
        this._furnitureListenersNotified    = false;
        this._pendingFurnitureListeners     = [];

        this._badgeImageManager             = null;
    }

    protected onInit(): void
    {
        this.loadFurnitureData();
        this.loadBadgeImageManager();

        this._communication.registerMessageEvent(new UserFigureEvent(this.onUserFigureEvent.bind(this)));
        this._communication.registerMessageEvent(new UserInfoEvent(this.onUserInfoEvent.bind(this)));
        this._communication.registerMessageEvent(new UserPermissionsEvent(this.onUserPermissionsEvent.bind(this)));
        this._communication.registerMessageEvent(new AvailabilityStatusMessageEvent(this.onAvailabilityStatusMessageEvent.bind(this)));
    }

    protected onDispose(): void
    {
        this._communication.removeMessageEvent(new UserFigureEvent(this.onUserFigureEvent.bind(this)));
        this._communication.removeMessageEvent(new UserInfoEvent(this.onUserInfoEvent.bind(this)));
        this._communication.removeMessageEvent(new UserPermissionsEvent(this.onUserPermissionsEvent.bind(this)));
        this._communication.removeMessageEvent(new AvailabilityStatusMessageEvent(this.onAvailabilityStatusMessageEvent.bind(this)));

        this.destroyFurnitureData();

        super.onDispose();
    }

    private resetUserInfo(): void
    {
        this._userId    = 0;
        this._name      = null;
        this._figure    = null;
        this._gender    = null;
        this._realName  = null;
    }

    private loadFurnitureData(): void
    {
        this.destroyFurnitureData();

        this._furnitureData = new FurnitureDataParser(this._floorItems, this._wallItems);

        this._furnitureData.addEventListener(FurnitureDataParser.FURNITURE_DATA_READY, this.onFurnitureDataReadyEvent.bind(this));

        this._furnitureData.loadFurnitureData(NitroConfiguration.FURNIDATA_URL);
    }

    private loadBadgeImageManager(): void
    {
        if(this._badgeImageManager) return;

        this._badgeImageManager = new BadgeImageManager(Nitro.instance.core.asset, this.events);
    }

    public getAllFurnitureData(listener: IFurnitureDataListener): IFurnitureData[]
    {
        if(!this._floorItems || !this._floorItems.size)
        {
            if(this._pendingFurnitureListeners.indexOf(listener) === -1) this._pendingFurnitureListeners.push(listener);

            return;
        }

        const furnitureData: IFurnitureData[] = [];

        for(let data of this._floorItems.values())
        {
            if(!data) continue;

            furnitureData.push(data);
        }

        for(let data of this._wallItems.values())
        {
            if(!data) continue;

            furnitureData.push(data);
        }

        if(!furnitureData || !furnitureData.length) return null;

        return furnitureData;
    }

    public removePendingFurniDataListener(listener: IFurnitureDataListener): void
    {
        if(!this._pendingFurnitureListeners) return;

        const index = this._pendingFurnitureListeners.indexOf(listener);

        if(index === -1) return;

        this._pendingFurnitureListeners.splice(index, 1);
    }

    private onUserFigureEvent(event: UserFigureEvent): void
    {
        if(!(event instanceof UserFigureEvent) || !event.connection) return;

        this._figure    = event.getParser().figure;
        this._gender    = event.getParser().gender;
    }

    private onUserInfoEvent(event: UserInfoEvent): void
    {
        if(!(event instanceof UserInfoEvent) || !event.connection) return;

        this.resetUserInfo();

        const userInfo = event.getParser().userInfo;

        if(!userInfo) return;

        this._userId    = userInfo.userId;
        this._name      = userInfo.username;
        this._figure    = userInfo.figure;
        this._gender    = userInfo.gender;
        this._realName  = userInfo.realName;
    }

    private onUserPermissionsEvent(event: UserPermissionsEvent): void
    {
        if(!(event instanceof UserPermissionsEvent) || !event.connection) return;

        this._clubLevel     = event.getParser().clubLevel;
        this._securityLevel = event.getParser().securityLevel;
        this._isAmbassador  = event.getParser().isAmbassador;
    }

    private onAvailabilityStatusMessageEvent(event: AvailabilityStatusMessageEvent): void
    {
        if(!(event instanceof AvailabilityStatusMessageEvent) || !event.connection) return;

        const parser = event.getParser();

        if(!parser) return;

        this._systemOpen        = parser.isOpen;
        this._systemShutdown    = parser.onShutdown;
        this._isAuthenticHabbo  = parser.isAuthenticUser;

        if(this._isAuthenticHabbo && this._furnitureReady && !this._furnitureListenersNotified)
        {
            this._furnitureListenersNotified = true;

            if(this._pendingFurnitureListeners && this._pendingFurnitureListeners.length)
            {
                for(let listener of this._pendingFurnitureListeners) listener && listener.loadFurnitureData();
            }
        }
    }

    private onFurnitureDataReadyEvent(event: Event): void
    {
        this._furnitureData.removeEventListener(FurnitureDataParser.FURNITURE_DATA_READY, this.onFurnitureDataReadyEvent.bind(this));

        this._furnitureReady = true;

        if(this._isAuthenticHabbo && !this._furnitureListenersNotified)
        {
            this._furnitureListenersNotified = true;

            if(this._pendingFurnitureListeners && this._pendingFurnitureListeners.length)
            {
                for(let listener of this._pendingFurnitureListeners) listener && listener.loadFurnitureData();
            }
        }
    }

    private destroyFurnitureData(): void
    {
        if(!this._furnitureData) return;

        this._furnitureData.dispose();

        this._furnitureData = null;
    }

    public getFloorItemData(id: number): IFurnitureData
    {
        const existing = this._floorItems.get(id);

        if(!existing) return null;

        return existing;
    }

    public getFloorItemDataByName(name: string): IFurnitureData
    {
        if(!name || !this._floorItems || !this._floorItems.size) return null;

        for(let item of this._floorItems.values())
        {
            if(!item || (item.className !== name)) continue;

            return item;
        }
    }

    public getWallItemData(id: number): IFurnitureData
    {
        const existing = this._wallItems.get(id);

        if(!existing) return null;

        return existing;
    }

    public getWallItemDataByName(name: string): IFurnitureData
    {
        if(!name || !this._wallItems || !this._wallItems.size) return null;

        for(let item of this._wallItems.values())
        {
            if(!item || (item.className !== name)) continue;

            return item;
        }
    }

    public getBadgeImage(name: string): PIXI.Texture
    {
        return this._badgeImageManager.getBadgeImage(name);
    }

    public getGroupBadgeImage(name: string): PIXI.Texture
    {
        return this._badgeImageManager.getBadgeImage(name, BadgeImageManager.GROUP_BADGE);
    }

    public loadBadgeImage(name: string): string
    {
        return this._badgeImageManager._Str_5831(name);
    }

    public loadGroupBadgeImage(name: string): string
    {
        return this._badgeImageManager._Str_5831(name, BadgeImageManager.GROUP_BADGE);
    }

    public isUserIgnored(userName: string): boolean
    {
        return false;
    }

    public hasSecurity(level: number): boolean
    {
        return this._securityLevel >= level;
    }

    public giveRespect(userId: number): void
    {
        // if (((k >= 0) && (this._Str_3437 > 0)))
        // {
        //     this.send(new _Str_10714(k));
        //     this._Str_3437 = (this._Str_3437 - 1);
        // }
    }

    public givePetRespect(petId: number): void
    {
        // if (((k >= 0) && (this._Str_3973 > 0)))
        // {
        //     this.send(new _Str_8184(k));
        //     this._Str_3973 = (this._Str_3973 - 1);
        // }
    }

    public get communication(): INitroCommunicationManager
    {
        return this._communication;
    }

    public get userId(): number
    {
        return this._userId;
    }

    public get userName(): string
    {
        return this._name;
    }

    public get figure(): string
    {
        return this._figure;
    }

    public get gender(): string
    {
        return this._gender;
    }

    public get realName(): string
    {
        return this._realName;
    }

    public get clubLevel(): number
    {
        return this._clubLevel;
    }

    public get securityLevel(): number
    {
        return this._securityLevel;
    }

    public get isAmbassador(): boolean
    {
        return this._isAmbassador;
    }

    public get isSystemOpen(): boolean
    {
        return this._systemOpen;
    }

    public get isSystemShutdown(): boolean
    {
        return this._systemShutdown;
    }

    public get isAuthenticHabbo(): boolean
    {
        return this._isAuthenticHabbo;
    }

    public get isModerator(): boolean
    {
        return (this._securityLevel >= SecurityLevel._Str_3569);
    }
}