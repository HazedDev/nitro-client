import { AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, NgZone, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { IEventDispatcher } from '../../../../../client/core/events/IEventDispatcher';
import { ConversionTrackingWidget } from '../../../../../client/nitro/ui/widget/ConversionTrackingWidget';
import { RoomWidgetFurniInfostandUpdateEvent } from '../events/RoomWidgetFurniInfostandUpdateEvent';
import { RoomWidgetPetInfostandUpdateEvent } from '../events/RoomWidgetPetInfostandUpdateEvent';
import { RoomWidgetRentableBotInfostandUpdateEvent } from '../events/RoomWidgetRentableBotInfostandUpdateEvent';
import { RoomWidgetRoomObjectUpdateEvent } from '../events/RoomWidgetRoomObjectUpdateEvent';
import { RoomWidgetUserInfostandUpdateEvent } from '../events/RoomWidgetUserInfostandUpdateEvent';
import { InfoStandWidgetHandler } from '../handlers/InfoStandWidgetHandler';
import { RoomWidgetRoomObjectMessage } from '../messages/RoomWidgetRoomObjectMessage';
import { RoomInfoStandBotComponent } from './bot/component';
import { RoomInfoStandFurniComponent } from './furni/component';
import { InfoStandFurniData } from './furni/InfoStandFurniData';
import { RoomInfoStandPetComponent } from './pet/component';
import { InfoStandPetData } from './pet/InfoStandPetData';
import { RoomInfoStandRentableBotComponent } from './rentablebot/component';
import { InfoStandRentableBotData } from './rentablebot/InfoStandRentableBotData';
import { RoomInfoStandUserComponent } from './user/component';
import { InfoStandUserData } from './user/InfoStandUserData';

@Component({
	selector: 'nitro-room-infostand-component',
    template: `
    <div class="nitro-room-infostand-component">
        <div #infostandsContainer></div>
    </div>`
})
export class RoomInfoStandComponent extends ConversionTrackingWidget implements AfterViewInit
{
    @ViewChild('infostandsContainer', { read: ViewContainerRef })
    public infostandsContainer: ViewContainerRef;

    public botView: RoomInfoStandBotComponent                   = null;
    public furniView: RoomInfoStandFurniComponent               = null;
    public petView: RoomInfoStandPetComponent                   = null;
    public rentableBotView: RoomInfoStandRentableBotComponent   = null;
    public userView: RoomInfoStandUserComponent                 = null;

    public furniData    = new InfoStandFurniData();
    public userData     = new InfoStandUserData();
    public petData      = new InfoStandPetData();
    public botData      = new InfoStandRentableBotData();

    constructor(
        private ngZone: NgZone,
        private componentFactoryResolver: ComponentFactoryResolver,
        private changeDetector: ChangeDetectorRef)
    {
        super();
    }

    public ngAfterViewInit(): void
    {
        this.setupInfostands();

        this.changeDetector.detectChanges();
    }

    private setupInfostands(): void
    {
        this.botView            = this.createView(RoomInfoStandBotComponent);
        this.furniView          = this.createView(RoomInfoStandFurniComponent);
        this.petView            = this.createView(RoomInfoStandPetComponent);
        this.rentableBotView    = this.createView(RoomInfoStandRentableBotComponent);
        this.userView           = this.createView(RoomInfoStandUserComponent);
    }

    private createView<T>(component: Type<T>): T
    {
        if(!component) return null;

        const componentFactory  = this.componentFactoryResolver.resolveComponentFactory(component);
        const viewRef           = this.infostandsContainer.createComponent(componentFactory);
        const view              = (viewRef.instance as T);

        //@ts-ignore
        view.widget = this;

        return view;
    }

    public registerUpdateEvents(eventDispatcher: IEventDispatcher): void
    {
        if(!eventDispatcher) return;

        eventDispatcher.addEventListener(RoomWidgetRoomObjectUpdateEvent.OBJECT_SELECTED, this.objectSelectedHandler.bind(this));
        eventDispatcher.addEventListener(RoomWidgetRoomObjectUpdateEvent.OBJECT_DESELECTED, this.objectDeselectedHandler.bind(this));
        eventDispatcher.addEventListener(RoomWidgetRoomObjectUpdateEvent.USER_REMOVED, this.objectRemovedHandler.bind(this));
        eventDispatcher.addEventListener(RoomWidgetRoomObjectUpdateEvent.FURNI_REMOVED, this.objectRemovedHandler.bind(this));
        eventDispatcher.addEventListener(RoomWidgetUserInfostandUpdateEvent.OWN_USER, this.userInfostandUpdateHandler.bind(this));
        eventDispatcher.addEventListener(RoomWidgetUserInfostandUpdateEvent.PEER, this.userInfostandUpdateHandler.bind(this));
        eventDispatcher.addEventListener(RoomWidgetUserInfostandUpdateEvent.BOT, this.botInfostandUpdateHandler.bind(this));
        eventDispatcher.addEventListener(RoomWidgetFurniInfostandUpdateEvent.FURNI, this.furniInfostandUpdateHandler.bind(this));
        eventDispatcher.addEventListener(RoomWidgetRentableBotInfostandUpdateEvent.RENTABLE_BOT, this.rentableBotInfostandUpdateHandler.bind(this));
        eventDispatcher.addEventListener(RoomWidgetPetInfostandUpdateEvent.PET_INFO, this.petInfostandUpdateHandler.bind(this));
        
        super.registerUpdateEvents(eventDispatcher);
    }

    public unregisterUpdateEvents(eventDispatcher: IEventDispatcher): void
    {
        if(!eventDispatcher) return;

        eventDispatcher.removeEventListener(RoomWidgetRoomObjectUpdateEvent.OBJECT_SELECTED, this.objectSelectedHandler.bind(this));
        eventDispatcher.removeEventListener(RoomWidgetRoomObjectUpdateEvent.OBJECT_DESELECTED, this.objectDeselectedHandler.bind(this));
        eventDispatcher.removeEventListener(RoomWidgetRoomObjectUpdateEvent.USER_REMOVED, this.objectRemovedHandler.bind(this));
        eventDispatcher.removeEventListener(RoomWidgetRoomObjectUpdateEvent.FURNI_REMOVED, this.objectRemovedHandler.bind(this));
        eventDispatcher.removeEventListener(RoomWidgetUserInfostandUpdateEvent.OWN_USER, this.userInfostandUpdateHandler.bind(this));
        eventDispatcher.removeEventListener(RoomWidgetUserInfostandUpdateEvent.PEER, this.userInfostandUpdateHandler.bind(this));
        eventDispatcher.removeEventListener(RoomWidgetUserInfostandUpdateEvent.BOT, this.botInfostandUpdateHandler.bind(this));
        eventDispatcher.removeEventListener(RoomWidgetFurniInfostandUpdateEvent.FURNI, this.furniInfostandUpdateHandler.bind(this));
        eventDispatcher.removeEventListener(RoomWidgetRentableBotInfostandUpdateEvent.RENTABLE_BOT, this.rentableBotInfostandUpdateHandler.bind(this));
        eventDispatcher.removeEventListener(RoomWidgetPetInfostandUpdateEvent.PET_INFO, this.petInfostandUpdateHandler.bind(this));

        super.unregisterUpdateEvents(eventDispatcher);
    }

    public hideAllInfoStands(): void
    {
        if(this.botView) this.botView.hide();
        if(this.furniView) this.furniView.hide();
        if(this.petView) this.petView.hide();
        if(this.rentableBotView) this.rentableBotView.hide();
        if(this.userView) this.userView.hide();
    }

    public close(): void
    {
        this.ngZone.run(() => this.hideAllInfoStands());
    }

    private objectSelectedHandler(k: RoomWidgetRoomObjectUpdateEvent): void
    {
        this.messageListener.processWidgetMessage(new RoomWidgetRoomObjectMessage(RoomWidgetRoomObjectMessage.GET_OBJECT_INFO, k.id, k.category));
    }

    private objectDeselectedHandler(k: RoomWidgetRoomObjectUpdateEvent): void
    {
        this.close();
    }

    private objectRemovedHandler(event: RoomWidgetRoomObjectUpdateEvent): void
    {
        let remove = false;

        switch (event.type)
        {
            case RoomWidgetRoomObjectUpdateEvent.FURNI_REMOVED:
                if(this.furniView && this.furniView.visible)
                {
                    remove = (event.id === this.furniData.id);

                    break;
                }
            case RoomWidgetRoomObjectUpdateEvent.USER_REMOVED:
                if(this.userView && this.userView.visible)
                {
                    remove = (event.id === this.userData._Str_3313);

                    break;
                }

                if(this.petView && this.petView.visible)
                {
                    remove = (event.id === this.petData._Str_2707);

                    break;
                }

                if(this.botView && this.botView.visible)
                {
                    remove = (event.id === this.userData._Str_3313);

                    break;
                }

                if(this.rentableBotView && this.rentableBotView.visible)
                {
                    remove = (event.id === this.userData._Str_3313);

                    break;
                }
                break;
        }

        if(remove) this.close();
    }

    private userInfostandUpdateHandler(event: RoomWidgetUserInfostandUpdateEvent): void
    {
        if(!event || !this.userView) return;

        this.ngZone.run(() =>
        {
            this.userData.populate(event);

            this.userView.update(event);

            this.hideAllInfoStands();

            this.userView.show();
        });
    }

    private botInfostandUpdateHandler(event: RoomWidgetUserInfostandUpdateEvent): void
    {
        if(!event) return;

        this.ngZone.run(() =>
        {
            this.userData.populate(event);

            this.hideAllInfoStands();

            this.botView.show();
        });
    }

    private furniInfostandUpdateHandler(event: RoomWidgetFurniInfostandUpdateEvent): void
    {
        if(!event) return;

        this.ngZone.run(() =>
        {
            this.furniData.populate(event);

            this.furniView.update(event);

            this.hideAllInfoStands();

            this.furniView.show();
        });
    }

    private rentableBotInfostandUpdateHandler(event: RoomWidgetRentableBotInfostandUpdateEvent): void
    {
        if(!event || !this.userView) return;

        this.ngZone.run(() =>
        {
            this.botData.populate(event);

            this.rentableBotView.update(event);

            this.hideAllInfoStands();

            this.rentableBotView.show();
        });
    }

    private petInfostandUpdateHandler(event: RoomWidgetPetInfostandUpdateEvent): void
    {
        if(!event) return;

        this.ngZone.run(() =>
        {
            this.petData.populate(event);

            this.hideAllInfoStands();

            this.petView.show();
        });
    }

    public updateUserBadges(userId: number, badges: string[]): void
    {
        if(userId !== this.userData.userId) return;

        this.userData.badges = badges;

        if(!this.userData._Str_18577())
        {
            this.ngZone.run(() => this.userView.resetBadges());
        }
    }

    public get handler(): InfoStandWidgetHandler
    {
        return (this.widgetHandler as InfoStandWidgetHandler);
    }
}