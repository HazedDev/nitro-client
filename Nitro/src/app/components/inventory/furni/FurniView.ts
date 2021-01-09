import { Component, NgZone } from '@angular/core';
import { Nitro } from '../../../../client/nitro/Nitro';
import { RoomObjectVariable } from '../../../../client/nitro/room/object/RoomObjectVariable';
import { RoomPreviewer } from '../../../../client/nitro/room/preview/RoomPreviewer';
import { Vector3D } from '../../../../client/room/utils/Vector3D';
import { FurniCategory } from '../enum/FurniCategory';
import { GroupItem } from '../items/GroupItem';
import { FurniModel } from './FurniModel';

@Component({
	selector: '[nitro-inventory-furni-component]',
    template: `
    <div class="nitro-inventory-furni-component">
        <div class="d-flex">
            <div class="d-flex flex-grow-1 grid-container">
                <div class="grid-items">
                    <div class="item-detail" *ngFor="let groupItem of groupItems" [ngClass]="{ 'unseen': groupItem.unseen }" [ngStyle]="{ 'background-image': getIconUrl(groupItem) }" (click)="selectGroup(groupItem)">
                        <div class="badge badge-secondary" *ngIf="groupItem.items.length > 1">{{ groupItem.items.length }}</div>
                    </div>
                </div>
            </div>
            <div class="furni-container">
                <div class="room-previewer" nitro-room-preview-component [roomPreviewer]="roomPreviewer" [width]="170" [height]="130"></div>
                <div class="container-info">
                    <span>Name</span>
                    <span>Desc</span>
                    <button type="button" class="btn btn-light">Place</button>
                </div>
            </div>
        </div>
    </div>`
})
export class InventoryFurniComponent
{
    public model: FurniModel = null;

    private _selectedGroup: GroupItem = null;

    constructor(
        private ngZone: NgZone) {}

    public selectFirstGroup(): void
    {
        if(!this.model) return;

        const group = this.model.getFirstUnlockedGroup();

        this.selectGroup(group);
    }

    public selectGroup(groupItem: GroupItem): void
    {
        this.model.lockAllGroups();

        let furnitureItem = groupItem.getItemByIndex(0);

        if(!furnitureItem) return;

        console.log(furnitureItem);

        groupItem.unlocked = true;

        this._selectedGroup = groupItem;

        this.ngZone.runOutsideAngular(() =>
        {
            if(this.roomPreviewer)
            {
                let wallType        = Nitro.instance.roomEngine.getRoomInstanceVariable<string>(Nitro.instance.roomEngine.activeRoomId, RoomObjectVariable.ROOM_WALL_TYPE);
                let floorType       = Nitro.instance.roomEngine.getRoomInstanceVariable<string>(Nitro.instance.roomEngine.activeRoomId, RoomObjectVariable.ROOM_FLOOR_TYPE);
                let landscapeType   = Nitro.instance.roomEngine.getRoomInstanceVariable<string>(Nitro.instance.roomEngine.activeRoomId, RoomObjectVariable.ROOM_LANDSCAPE_TYPE);
                
                wallType        = (wallType && wallType.length) ? wallType : '101';
                floorType       = (floorType && floorType.length) ? floorType : '101';
                landscapeType   = (landscapeType && landscapeType.length) ? landscapeType : '1.1';

                this.roomPreviewer.reset(false);
                this.roomPreviewer.updateObjectRoom(floorType, wallType, landscapeType);

                if((furnitureItem.category === FurniCategory._Str_3639) || (furnitureItem.category === FurniCategory._Str_3683) || (furnitureItem.category === FurniCategory._Str_3432))
                {
                    this.roomPreviewer.updateRoomWallsAndFloorVisibility(true, true);

                    floorType       = ((furnitureItem.category === FurniCategory._Str_3639) ? groupItem.stuffData.getLegacyString() : floorType);
                    wallType        = ((furnitureItem.category === FurniCategory._Str_3639) ? groupItem.stuffData.getLegacyString() : wallType);
                    landscapeType   = ((furnitureItem.category === FurniCategory._Str_3432) ? groupItem.stuffData.getLegacyString() : landscapeType);

                    this.roomPreviewer.updateObjectRoom(floorType, wallType, landscapeType);

                    if(furnitureItem.category === FurniCategory._Str_3432)
                    {
                        // insert a window if the type is landscape
                        //_local_19 = this._model.controller._Str_18225("ads_twi_windw", ProductTypeEnum.WALL);
                        //this._roomPreviewer._Str_12087(_local_19.id, new Vector3D(90, 0, 0), _local_19._Str_4558);
                    }
                }
                else
                {
                    if(groupItem.isWallItem)
                    {
                        this.roomPreviewer.updateRoomWallsAndFloorVisibility(true, true);
                        this.roomPreviewer.addWallItemIntoRoom(groupItem.type, new Vector3D(90), furnitureItem.stuffData.getLegacyString());
                    }
                    else
                    {
                        this.roomPreviewer.updateRoomWallsAndFloorVisibility(false, true);
                        this.roomPreviewer.addFurnitureIntoRoom(groupItem.type, new Vector3D(90), groupItem.stuffData, (groupItem.extra.toString()))
                    }
                }
            }
        });
    }

    public getIconUrl(groupItem: GroupItem): string
    {
        const imageUrl = ((groupItem && groupItem.iconUrl) || null);

        if(imageUrl && (imageUrl !== '')) return `url('${ imageUrl }')`;

        return null;
    }

    public get groupItems(): GroupItem[]
    {
        return this.model.furniData;
    }

    public get roomPreviewer(): RoomPreviewer
    {
        return ((this.model && this.model.controller.roomPreviewer) || null);
    }
}