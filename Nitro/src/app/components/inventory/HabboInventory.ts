import { ComponentRef, Type } from '@angular/core';
import { NitroManager } from '../../../client/core/common/NitroManager';
import { AdvancedMap } from '../../../client/core/utils/AdvancedMap';
import { Nitro } from '../../../client/nitro/Nitro';
import { RoomPreviewer } from '../../../client/nitro/room/preview/RoomPreviewer';
import { RoomSessionEvent } from '../../../client/nitro/session/events/RoomSessionEvent';
import { RoomSessionPropertyUpdateEvent } from '../../../client/nitro/session/events/RoomSessionPropertyUpdateEvent';
import { IRoomSession } from '../../../client/nitro/session/IRoomSession';
import { InventoryComponent } from './component';
import { InventoryCategory } from './enum/InventoryCategory';
import { FurniModel } from './furni/FurniModel';
import { IInventoryModel } from './IInventoryModel';
import { IInventoryView } from './IInventoryView';
import { IncomingMessages } from './IncomingMessages';
import { IUnseenItemTracker } from './IUnseenItemTracker';
import { UnseenItemTracker } from './UnseenItemTracker';

export class HabboInventory extends NitroManager 
{
    private _view: InventoryComponent;

    private _messages: IncomingMessages;
    private _inventories: AdvancedMap<string, IInventoryModel>;
    private _unseenTracker: IUnseenItemTracker;
    private _initedInventoryCategories: string[];
    private _roomPreviewer: RoomPreviewer;
    private _roomSession: IRoomSession;
    private _isInRoom: boolean;

    constructor(view: InventoryComponent)
    {
        super();

        this._view  = view;

        this._messages                  = new IncomingMessages(this);
        this._inventories               = new AdvancedMap();
        this._unseenTracker             = new UnseenItemTracker(Nitro.instance.communication, this.events, this);
        this._initedInventoryCategories = [];
        this._roomPreviewer             = new RoomPreviewer(Nitro.instance.roomEngine, ++RoomPreviewer.PREVIEW_COUNTER);
        this._roomSession               = null;
        this._isInRoom                  = false;
    }

    protected onInit(): void
    {
        Nitro.instance.roomSessionManager.events.addEventListener(RoomSessionEvent.STARTED, this.onRoomSessionEvent.bind(this));
        Nitro.instance.roomSessionManager.events.addEventListener(RoomSessionEvent.ENDED, this.onRoomSessionEvent.bind(this));
        Nitro.instance.roomSessionManager.events.addEventListener(RoomSessionPropertyUpdateEvent.RSDUE_ALLOW_PETS, this.onRoomSessionEvent.bind(this));

        this.setupInventories();
    }

    protected onDispose(): void
    {
        Nitro.instance.roomSessionManager.events.removeEventListener(RoomSessionEvent.STARTED, this.onRoomSessionEvent.bind(this));
        Nitro.instance.roomSessionManager.events.removeEventListener(RoomSessionEvent.ENDED, this.onRoomSessionEvent.bind(this));
        Nitro.instance.roomSessionManager.events.removeEventListener(RoomSessionPropertyUpdateEvent.RSDUE_ALLOW_PETS, this.onRoomSessionEvent.bind(this));

        if(this._unseenTracker)
        {
            this._unseenTracker.dispose();

            this._unseenTracker = null;
        }

        if(this._roomPreviewer)
        {
            this._roomPreviewer.dispose();

            this._roomPreviewer = null;
        }
    }

    private onRoomSessionEvent(event: RoomSessionEvent): void
    {
        if(!event) return;

        switch(event.type)
        {
            case RoomSessionEvent.STARTED:
                this._roomSession = event.session;
                return;
            case RoomSessionEvent.ENDED:
                this._roomSession = null;
                return;
            case RoomSessionPropertyUpdateEvent.RSDUE_ALLOW_PETS:
                return;
        }
    }

    private setupInventories(): void
    {
        this._inventories.reset();

        this._inventories.add(InventoryCategory.FURNI, new FurniModel(this, Nitro.instance.communication, Nitro.instance.roomEngine));
    }

    public createComponent<T extends IInventoryView>(model: IInventoryModel, component: Type<T>): ComponentRef<T>
    {
        if(!model || !component || !this._view) return;

        const inventory = this._view.createComponent(component);

        if(!inventory) return null;

        return inventory;
    }

    public removeComponent<T>(component: ComponentRef<T>): void
    {
        if(!component || !this._view) return;

        this._view.removeComponent(component);
    }

    public getModel(type: string): IInventoryModel
    {
        if(!type || (type === '')) return null;

        return this._inventories.getValue(type);
    }

    public _Str_5943(k: string, _arg_2: boolean = true):void
    {
        if(_arg_2)
        {
            if(this._initedInventoryCategories.indexOf(k) === -1)
            {
                this._initedInventoryCategories.push(k);
            }
        }
        else
        {
            const _local_3 = this._initedInventoryCategories.indexOf(k);
            
            if(_local_3 >= 0) this._initedInventoryCategories.splice(_local_3, 1);

            if(this._view && this._view.visible)
            {
                if(k === InventoryCategory.RENTABLES) return;

                this.requestLoad(k);
            }
        }
    }

    public checkAndLoadInventory(type: string): boolean
    {
        if(this._initedInventoryCategories.indexOf(type) >= 0) return true;

        this.requestLoad(type);

        return false;
    }

    public requestLoad(k: string): void
    {
        const model = this.getModel(k);

        if(!model) return;

        model.requestLoad();
    }

    public get inventories(): AdvancedMap<string, IInventoryModel>
    {
        return this._inventories;
    }

    public get furniModel(): FurniModel
    {
        return (this.getModel(InventoryCategory.FURNI) as FurniModel);
    }
    
    public get unseenTracker(): IUnseenItemTracker
    {
        return this._unseenTracker;
    }

    public get roomPreviewer(): RoomPreviewer
    {
        return this._roomPreviewer;
    }

    public get isInRoom(): boolean
    {
        return this._isInRoom;
    }

    public set isInRoom(flag: boolean)
    {
        this._isInRoom = flag;
    }
}