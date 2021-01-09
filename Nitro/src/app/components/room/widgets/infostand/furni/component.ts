import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { RoomControllerLevel } from '../../../../../../client/nitro/session/enum/RoomControllerLevel';
import { RoomWidgetEnumItemExtradataParameter } from '../../../../../../client/nitro/ui/widget/enums/RoomWidgetEnumItemExtradataParameter';
import { RoomWidgetFurniInfoUsagePolicyEnum } from '../../../../../../client/nitro/ui/widget/enums/RoomWidgetFurniInfoUsagePolicyEnum';
import { RoomWidgetFurniInfostandUpdateEvent } from '../../events/RoomWidgetFurniInfostandUpdateEvent';
import { RoomWidgetFurniActionMessage } from '../../messages/RoomWidgetFurniActionMessage';
import { RoomInfoStandComponent } from '../component';

@Component({
	selector: 'nitro-room-infostand-furni-component',
    template: `
    <div class="nitro-room-infostand-furni-component" [ngClass]="{ 'active': visible }">
        <div class="card">
            <div class="card-header">
                <div class="header-title">{{ name }}</div>
                <div class="header-close" (click)="hide()"><i class="fas fa-times"></i></div>
            </div>
            <div class="card-body">
                <div #imageContainer class="body-image"></div>
                <div class="furni-description">{{ description }}</div>
                {{ ownerName }}
            </div>
        </div>
        <div class="button-container btn-group">
            <button *ngIf="canMove" type="button" class="btn btn-primary" (click)="processButtonAction('move')">move</button>
            <button *ngIf="canRotate" type="button" class="btn btn-primary" (click)="processButtonAction('rotate')">rotate</button>
            <button *ngIf="(pickupMode !== 0)" type="button" class="btn btn-primary" (click)="processButtonAction('pickup')">pickup ({{ pickupMode }})</button>
            <button *ngIf="canUse" type="button" class="btn btn-primary" (click)="processButtonAction('use')">use</button>
        </div>
    </div>`
})
export class RoomInfoStandFurniComponent
{
    private static PICKUP_MODE_NONE: number     = 0;
    private static PICKUP_MODE_EJECT: number    = 1;
    private static PICKUP_MODE_FULL: number     = 2;

    @Input()
    public widget: RoomInfoStandComponent;

    @ViewChild('imageContainer')
    public imageContainer: ElementRef<HTMLDivElement>;

    public name         = '';
    public description  = '';
    public ownerName    = '';
    public ownerId      = -1;
    public pickupMode   = 0;
    public canMove      = false;
    public canRotate    = false;
    public canUse       = false;
    public visible      = false;

    public show(): void
    {
        if(!this.visible) this.visible = true;
    }

    public hide(): void
    {
        if(this.visible) this.visible = false;
    }

    public update(event: RoomWidgetFurniInfostandUpdateEvent): void
    {
        this.name           = event.name;
        this.description    = event.description;
        this.ownerId        = event.ownerId;
        this.ownerName      = event.ownerName;

        if(event.image)
        {
            this.imageElement.innerHTML = '';

            this.imageElement.appendChild(event.image);
        }

        let canMove     = false;
        let canRotate   = false;
        let canUse      = false;

        if((event.roomControllerLevel >= RoomControllerLevel.GUEST) || event.isOwner || event.isRoomOwner || event.isAnyRoomOwner)
        {
            canMove     = true;
            canRotate   = (!event.isWallItem);
        }
        
        let _local_6 = (event.roomControllerLevel >= RoomControllerLevel.GUEST);

        if((((event.usagePolicy === RoomWidgetFurniInfoUsagePolicyEnum._Str_18353) || ((event.usagePolicy === RoomWidgetFurniInfoUsagePolicyEnum._Str_18194) && _local_6)) || ((event.extraParam === RoomWidgetEnumItemExtradataParameter.JUKEBOX) && _local_6)) || ((event.extraParam == RoomWidgetEnumItemExtradataParameter.USABLE_PRODUCT) && _local_6))
        {
            canUse = true;
        }

        this.canMove    = canMove;
        this.canRotate  = canRotate;
        this.canUse     = canUse;

        this.togglePickupButton(event);
    }

    private togglePickupButton(event: RoomWidgetFurniInfostandUpdateEvent): void
    {
        if(!event) return;

        this.pickupMode = RoomInfoStandFurniComponent.PICKUP_MODE_NONE;

        if(event.isOwner || event.isAnyRoomOwner)
        {
            this.pickupMode = RoomInfoStandFurniComponent.PICKUP_MODE_FULL;
        }

        else if(event.isRoomOwner || (event.roomControllerLevel >= RoomControllerLevel.GUILD_ADMIN))
        {
            this.pickupMode = RoomInfoStandFurniComponent.PICKUP_MODE_EJECT;
        }

        if(event.isStickie) this.pickupMode = RoomInfoStandFurniComponent.PICKUP_MODE_NONE;
    }

    public processButtonAction(action: string): void
    {
        if(!action || (action === '')) return;

        let messageType: string = null;

        switch(action)
        {
            case 'move':
                messageType = RoomWidgetFurniActionMessage.RWFAM_MOVE;
                break;
            case 'rotate':
                messageType = RoomWidgetFurniActionMessage.RWFUAM_ROTATE;
                break;
            case 'pickup':
                if(this.pickupMode === RoomInfoStandFurniComponent.PICKUP_MODE_FULL)
                {
                    messageType = RoomWidgetFurniActionMessage.RWFAM_PICKUP;
                }
                else
                {
                    messageType = RoomWidgetFurniActionMessage.RWFAM_EJECT;
                }
                break;
            case 'use':
                messageType = RoomWidgetFurniActionMessage.RWFAM_USE;
                break;
        }

        if(!messageType) return;

        this.widget.messageListener.processWidgetMessage(new RoomWidgetFurniActionMessage(messageType, this.widget.furniData.id, this.widget.furniData.category, this.widget.furniData.purchaseOfferId, null));
    }

    public get imageElement(): HTMLDivElement
    {
        return ((this.imageContainer && this.imageContainer.nativeElement) || null);
    }
}