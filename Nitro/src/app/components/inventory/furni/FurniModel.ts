import { ComponentRef } from '@angular/core';
import { INitroCommunicationManager } from '../../../../client/nitro/communication/INitroCommunicationManager';
import { FurnitureList2Composer } from '../../../../client/nitro/communication/messages/outgoing/inventory/furni/FurnitureList2Composer';
import { FurnitureListComposer } from '../../../../client/nitro/communication/messages/outgoing/inventory/furni/FurnitureListComposer';
import { FurnitureListItemParser } from '../../../../client/nitro/communication/messages/parser/inventory/furniture/utils/FurnitureListItemParser';
import { RoomObjectPlacementSource } from '../../../../client/nitro/room/enums/RoomObjectPlacementSource';
import { IRoomEngine } from '../../../../client/nitro/room/IRoomEngine';
import { IObjectData } from '../../../../client/nitro/room/object/data/IObjectData';
import { RoomObjectCategory } from '../../../../client/nitro/room/object/RoomObjectCategory';
import { FurniCategory } from '../enum/FurniCategory';
import { InventoryCategory } from '../enum/InventoryCategory';
import { UnseenItemCategoryEnum } from '../enum/UnseenItemCategoryEnum';
import { HabboInventory } from '../HabboInventory';
import { IInventoryModel } from '../IInventoryModel';
import { FurnitureItem } from '../items/FurnitureItem';
import { GroupItem } from '../items/GroupItem';
import { InventoryFurniComponent } from './FurniView';

export class FurniModel implements IInventoryModel
{
    private _controller: HabboInventory;
    private _communication: INitroCommunicationManager;
    private _roomEngine: IRoomEngine;
    private _furniData: GroupItem[];
    private _itemIdInFurniPlacing: number;
    private _isObjectMoverRequested: boolean;
    private _isListInitialized: boolean;
    private _view: ComponentRef<InventoryFurniComponent>;

    constructor(controller: HabboInventory, communication: INitroCommunicationManager, roomEngine: IRoomEngine)
    {
        this._controller                = controller;
        this._communication             = communication;
        this._roomEngine                = roomEngine;
        this._furniData                 = [];
        this._itemIdInFurniPlacing      = -1;
        this._isObjectMoverRequested    = false;
        this._isListInitialized         = false;
        this._view                      = null;
    }

    public show(): void
    {
        if(this.createView())
        {
            this._controller.checkAndLoadInventory(this.type);
        }
    }

    public hide(): void
    {
        this.destroyView();
    }

    public createView(): boolean
    {
        if(this._view || !this._controller) return false;

        this._view = this._controller.createComponent(this, InventoryFurniComponent);

        if(this._view)
        {
            this._view.instance.model = this;

            return true;
        }

        return false;
    }

    public destroyView(): void
    {
        if(!this._view || !this._controller) return;
        
        this._controller.removeComponent(this._view);

        this._view = null;
    }

    public _Str_24428(fragment: Map<number, FurnitureListItemParser>): void
    {
        this._controller._Str_5943(this.type);

        const existingSet           = this.getAllItemIds();
        const addedSet: number[]    = [];
        const removedSet: number[]  = [];

        for(let key of fragment.keys())
        {
            if(existingSet.indexOf(key) === -1) addedSet.push(key);
        }

        for(let itemId of existingSet)
        {
            if(!fragment.get(itemId)) removedSet.push(itemId);
        }

        const emptyExistingSet = (existingSet.length === 0);

        for(let itemId of removedSet)
        {
            this.removeItemById(itemId);
        }

        for(let itemId of addedSet)
        {
            const parser = fragment.get(itemId);

            if(!parser) continue;

            const item = new FurnitureItem(parser);

            this.addFurnitureItem(item, true);
        }

        if(!emptyExistingSet)
        {
            if(addedSet.length)
            {
                // run lock checking in sub sets, trading, marketplace etc
            }
        }

        //this._view.instance.detectChanges();

        this.setListInitialized();
    }

    private getAllItemIds(): number[]
    {
        const itemIds: number[] = [];

        for(let groupItem of this._furniData)
        {
            let totalCount = groupItem.getTotalCount();

            if(groupItem.category === FurniCategory._Str_12351) totalCount = 1;

            let i = 0;

            while(i < totalCount)
            {
                itemIds.push(groupItem.getItemByIndex(i).id);

                i++;
            }
        }

        return itemIds;
    }

    private addFurnitureItem(k: FurnitureItem, _arg_2: boolean): void
    {
        let groupItem: GroupItem = null;

        if(!k.isGroupable)
        {
            groupItem = this._Str_22387(k, _arg_2);
        }
        else
        {
            groupItem = this._Str_23860(k, _arg_2);
        }

        if(!_arg_2) groupItem.unseen = true;
    }

    private _Str_22387(k: FurnitureItem, _arg_2: boolean): GroupItem
    {
        const groupItems: GroupItem[] = [];

        for(let groupItem of this._furniData)
        {
            if(groupItem.type === k.type) groupItems.push(groupItem);
        }

        for(let groupItem of groupItems)
        {
            if(groupItem.getItemById(k.id)) return groupItem;
        }

        const unseen    = this._Str_3613(k);
        const groupItem = this.createGroupItem(k.type, k.category, k.stuffData, k._Str_2794, _arg_2);

        groupItem.push(k, unseen);

        if(unseen)
        {
            groupItem.unseen = true;

            this.unshift(groupItem);
        }
        else
        {
            this.push(groupItem);
        }

        return groupItem;
    }

    private _Str_23860(item: FurnitureItem, _arg_2: boolean): GroupItem
    {
        let existingGroup: GroupItem = null;

        for(let groupItem of this._furniData)
        {
            if((groupItem.type === item.type) && (groupItem.isWallItem == item.isWallItem) && groupItem.isGroupable)
            {
                if(item.category === FurniCategory._Str_5186)
                {
                    if(groupItem.stuffData.getLegacyString() === item.stuffData.getLegacyString())
                    {
                        existingGroup = groupItem;

                        break;
                    }
                }

                else if(item.category === FurniCategory._Str_12454)
                {
                    if(item.stuffData.compare(groupItem.stuffData))
                    {
                        existingGroup = groupItem;

                        break;
                    }
                }

                else
                {
                    existingGroup = groupItem;

                    break;
                }
            }
        }

        const unseen = this._Str_3613(item);

        if(existingGroup)
        {
            existingGroup.push(item, unseen);

            if(unseen)
            {
                existingGroup.unseen = true;

                this.moveToFront(existingGroup);
            }

            return existingGroup;
        }

        existingGroup = this.createGroupItem(item.type, item.category, item.stuffData, item._Str_2794, _arg_2);
        
        existingGroup.push(item, unseen);

        if(unseen)
        {
            existingGroup.unseen = true;

            this.unshift(existingGroup);
        }
        else
        {
            this.push(existingGroup);
        }

        return existingGroup;
    }

    public _Str_5298(): void
    {
        if(this._itemIdInFurniPlacing > -1)
        {
            this._roomEngine.cancelRoomObjectPlacement();

            this._isObjectMoverRequested    = false;
            this._itemIdInFurniPlacing      = -1;
        }
    }

    public removeItemById(k: number): GroupItem
    {
        let i = 0;

        while(i < this._furniData.length)
        {
            const groupItem = this._furniData[i];
            const item      = groupItem.remove(k);

            if(item)
            {
                if(this._itemIdInFurniPlacing === item.ref)
                {
                    this._Str_5298();

                    if(!this._Str_5337())
                    {
                        //this._controller._Str_4731();
                    }
                }

                if(groupItem.getTotalCount() <= 0)
                {
                    this._furniData.splice(i, 1);

                    // if(((this._view) && (this._view.grid)))
                    // {
                    //     this._view.grid._Str_9854(groupItem);
                    // }

                    //if(groupItem._Str_2365) this._Str_14744();

                    groupItem.dispose();
                }
                else
                {
                    //this._view._Str_2944();
                }

                //this._view._Str_7636();

                return groupItem;
            }

            i++;
        }

        return null;
    }

    private _Str_3613(item: FurnitureItem): boolean
    {
        let category = 0;

        if(item.rentable) category = UnseenItemCategoryEnum.RENTABLE;
        else category = UnseenItemCategoryEnum.FURNI;

        return this._controller.unseenTracker._Str_3613(category, item.id);
    }

    private createGroupItem(k: number, category: number, stuffData: IObjectData, extra: number = NaN, flag: boolean = false): GroupItem
    {
        let iconImage: HTMLImageElement = null;

        if(category == FurniCategory._Str_3639)
        {
            // const icon = this._windowManager.assets.getAssetByName("inventory_furni_icon_wallpaper");
            // if (icon != null)
            // {
            //     iconImage = (icon.content as BitmapData).clone();
            // }
        }

        else if(category == FurniCategory._Str_3683)
        {
            // const icon = this._windowManager.assets.getAssetByName("inventory_furni_icon_floor");
            // if (icon != null)
            // {
            //     iconImage = (icon.content as BitmapData).clone();
            // }
        }

        else if(category === FurniCategory._Str_3432)
        {
            // const icon = this._windowManager.assets.getAssetByName("inventory_furni_icon_landscape");
            // if (icon != null)
            // {
            //     iconImage = (icon.content as BitmapData).clone();
            // }
        }

        const groupItem = new GroupItem(this, k, category, this._roomEngine, stuffData, extra);

        groupItem.init();

        return groupItem;
    }

    private unshift(k: GroupItem): void
    {
        this._furniData.unshift(k);
    }

    private push(k: GroupItem): void
    {
        this._furniData.push(k);
    }

    private remove(k: GroupItem): void
    {
        const index = this._furniData.indexOf(k);

        if(index > -1) this._furniData.splice(index, 1);
    }

    private moveToFront(k: GroupItem): void
    {
        this.remove(k);
        this.unshift(k);
    }

    public lockAllGroups(): void
    {
        for(let groupItem of this._furniData) (groupItem && (groupItem.unlocked = false));
    }

    public getFirstUnlockedGroup(): GroupItem
    {
        for(let groupItem of this._furniData)
        {
            if(!groupItem) continue;

            if(groupItem.unlocked) return groupItem;
        }

        return null;
    }

    public _Str_5337(k: boolean = false): boolean
    {
        const groupItem = this.getFirstUnlockedGroup();

        if(!groupItem) return false;

        if(!groupItem.getUnlockedCount()) return false;

        const item = groupItem.getLastItem();

        if(!item) return false;

        if((item.category === FurniCategory._Str_3683) || (item.category === FurniCategory._Str_3639) || (item.category === FurniCategory._Str_3432))
        {
            if(k) return false;

            //this._communication.connection.send(new _Str_5270(_local_3.id));
        }
        else
        {
            this._Str_12029(item);
        }

        return true;
    }

    private _Str_12029(k:FurnitureItem): void
    {
        let category    = 0;
        let isMoving    = false;

        if(k.isWallItem) category = RoomObjectCategory.WALL;
        else category = RoomObjectCategory.FLOOR;

        if((k.category === FurniCategory._Str_5186)) // or external image from furnidata
        {
            isMoving = this._roomEngine._Str_5346(RoomObjectPlacementSource.INVENTORY, k.id, category, k.type, k.stuffData.getLegacyString());
        }
        else
        {
            isMoving = this._roomEngine._Str_5346(RoomObjectPlacementSource.INVENTORY, k.id, category, k.type, k.stuffData.getLegacyString(), k.stuffData);
        }

        if(isMoving)
        {
            this._itemIdInFurniPlacing      = k.ref;
            this._isObjectMoverRequested    = true;
        }
    }

    public requestLoad(): void
    {
        if(this._controller.isInRoom)
        {
            this._communication.connection.send(new FurnitureListComposer());
        }
        else
        {
            this._communication.connection.send(new FurnitureList2Composer());
        }
    }

    private setListInitialized(): void
    {
        if(this._isListInitialized) return;

        this._isListInitialized = true;
    }

    public get controller(): HabboInventory
    {
        return this._controller;
    }

    public get type(): string
    {
        return InventoryCategory.FURNI;
    }

    public get furniData(): GroupItem[]
    {
        return this._furniData;
    }

    public get isListInitialized(): boolean
    {
        return this._isListInitialized;
    }
}