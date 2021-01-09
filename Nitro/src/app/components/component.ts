import { Component, ComponentFactoryResolver, ComponentRef, NgZone, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NitroEvent } from '../../client/core/events/NitroEvent';
import { Nitro } from '../../client/nitro/Nitro';
import { RoomEngineEvent } from '../../client/nitro/room/events/RoomEngineEvent';
import { RoomEngineObjectEvent } from '../../client/nitro/room/events/RoomEngineObjectEvent';
import { RoomObjectHSLColorEnabledEvent } from '../../client/nitro/room/events/RoomObjectHSLColorEnabledEvent';
import { RoomZoomEvent } from '../../client/nitro/room/events/RoomZoomEvent';
import { RoomSessionChatEvent } from '../../client/nitro/session/events/RoomSessionChatEvent';
import { RoomSessionDanceEvent } from '../../client/nitro/session/events/RoomSessionDanceEvent';
import { RoomSessionEvent } from '../../client/nitro/session/events/RoomSessionEvent';
import { RoomSessionUserBadgesEvent } from '../../client/nitro/session/events/RoomSessionUserBadgesEvent';
import { IRoomSession } from '../../client/nitro/session/IRoomSession';
import { RoomWidgetEnum } from '../../client/nitro/ui/widget/enums/RoomWidgetEnum';
import { SettingsService } from '../core/settings/service';
import { AlertService } from '../shared/services/alert/service';
import { RoomComponent } from './room/component';
import { RoomAvatarInfoComponent } from './room/widgets/avatarinfo/component';
import { RoomChatInputComponent } from './room/widgets/chatinput/component';
import { RoomInfoStandComponent } from './room/widgets/infostand/component';
import { RoomChatComponent } from './room/widgets/roomchat/component';

@Component({
	selector: 'nitro-main-component',
    template: `
	<div class="nitro-main-component">
		<nitro-toolbar-component [isInRoom]="isInRoom"></nitro-toolbar-component>
		<nitro-purse-component></nitro-purse-component>
		<nitro-catalog-component></nitro-catalog-component>
		<nitro-inventory-component [visible]="inventoryVisible"></nitro-inventory-component>
		<nitro-navigator-component></nitro-navigator-component>
		<nitro-hotelview-component *ngIf="!isInRoom"></nitro-hotelview-component>
		<ng-template #desktopContainer></ng-template>
    </div>`
})
export class MainComponent implements OnInit, OnDestroy
{
    @ViewChild('desktopContainer', { read: ViewContainerRef })
	public desktopContainer: ViewContainerRef;

	public desktops: Map<string, ComponentRef<RoomComponent>> = new Map();

	public isInRoom: boolean = false;

	constructor(
		private alertService: AlertService,
		private settingsService: SettingsService,
		private ngZone: NgZone,
		private componentFactoryResolver: ComponentFactoryResolver) {}

	public ngOnInit(): void
	{
		this.ngZone.runOutsideAngular(() =>
		{
			Nitro.instance.ticker.add(this.update, this);

			if(Nitro.instance.roomEngine.events)
			{
				Nitro.instance.roomEngine.events.addEventListener(RoomEngineEvent.INITIALIZED, this.onRoomEngineEvent.bind(this));
				Nitro.instance.roomEngine.events.addEventListener(RoomEngineEvent.DISPOSED, this.onRoomEngineEvent.bind(this));
				Nitro.instance.roomEngine.events.addEventListener(RoomZoomEvent.ROOM_ZOOM, this.onRoomEngineEvent.bind(this));
				Nitro.instance.roomEngine.events.addEventListener(RoomObjectHSLColorEnabledEvent.ROOM_BACKGROUND_COLOR, this.onRoomEngineEvent.bind(this));

				Nitro.instance.roomEngine.events.addEventListener(RoomEngineObjectEvent.SELECTED, this.onRoomEngineObjectEvent.bind(this));
				Nitro.instance.roomEngine.events.addEventListener(RoomEngineObjectEvent.DESELECTED, this.onRoomEngineObjectEvent.bind(this));
				Nitro.instance.roomEngine.events.addEventListener(RoomEngineObjectEvent.ADDED, this.onRoomEngineObjectEvent.bind(this));
				Nitro.instance.roomEngine.events.addEventListener(RoomEngineObjectEvent.REMOVED, this.onRoomEngineObjectEvent.bind(this));
				Nitro.instance.roomEngine.events.addEventListener(RoomEngineObjectEvent.PLACED, this.onRoomEngineObjectEvent.bind(this));
				Nitro.instance.roomEngine.events.addEventListener(RoomEngineObjectEvent.REQUEST_MOVE, this.onRoomEngineObjectEvent.bind(this));
				Nitro.instance.roomEngine.events.addEventListener(RoomEngineObjectEvent.REQUEST_ROTATE, this.onRoomEngineObjectEvent.bind(this));
				Nitro.instance.roomEngine.events.addEventListener(RoomEngineObjectEvent.MOUSE_ENTER, this.onRoomEngineObjectEvent.bind(this));
				Nitro.instance.roomEngine.events.addEventListener(RoomEngineObjectEvent.MOUSE_LEAVE, this.onRoomEngineObjectEvent.bind(this));
			}

			if(Nitro.instance.roomSessionManager.events)
			{
				Nitro.instance.roomSessionManager.events.addEventListener(RoomSessionEvent.CREATED, this.onRoomSessionEvent.bind(this));
				Nitro.instance.roomSessionManager.events.addEventListener(RoomSessionEvent.STARTED, this.onRoomSessionEvent.bind(this));
				Nitro.instance.roomSessionManager.events.addEventListener(RoomSessionEvent.ROOM_DATA, this.onRoomSessionEvent.bind(this));
				Nitro.instance.roomSessionManager.events.addEventListener(RoomSessionEvent.ENDED, this.onRoomSessionEvent.bind(this));
				Nitro.instance.roomSessionManager.events.addEventListener(RoomSessionChatEvent.CHAT_EVENT, this.onRoomSessionEvent.bind(this));
				Nitro.instance.roomSessionManager.events.addEventListener(RoomSessionDanceEvent.RSDE_DANCE, this.onRoomSessionEvent.bind(this));
				Nitro.instance.roomSessionManager.events.addEventListener(RoomSessionUserBadgesEvent.RSUBE_BADGES, this.onRoomSessionEvent.bind(this));
			}
		});
	}

	public ngOnDestroy(): void
	{
		this.ngZone.runOutsideAngular(() =>
		{
			Nitro.instance.ticker.remove(this.update, this);

			if(Nitro.instance.roomEngine.events)
			{
				Nitro.instance.roomEngine.events.removeEventListener(RoomEngineEvent.INITIALIZED, this.onRoomEngineEvent.bind(this));
				Nitro.instance.roomEngine.events.removeEventListener(RoomEngineEvent.DISPOSED, this.onRoomEngineEvent.bind(this));
				Nitro.instance.roomEngine.events.removeEventListener(RoomZoomEvent.ROOM_ZOOM, this.onRoomEngineEvent.bind(this));
				Nitro.instance.roomEngine.events.removeEventListener(RoomObjectHSLColorEnabledEvent.ROOM_BACKGROUND_COLOR, this.onRoomEngineEvent.bind(this));

				Nitro.instance.roomEngine.events.removeEventListener(RoomEngineObjectEvent.SELECTED, this.onRoomEngineObjectEvent.bind(this));
				Nitro.instance.roomEngine.events.removeEventListener(RoomEngineObjectEvent.DESELECTED, this.onRoomEngineObjectEvent.bind(this));
				Nitro.instance.roomEngine.events.removeEventListener(RoomEngineObjectEvent.ADDED, this.onRoomEngineObjectEvent.bind(this));
				Nitro.instance.roomEngine.events.removeEventListener(RoomEngineObjectEvent.REMOVED, this.onRoomEngineObjectEvent.bind(this));
				Nitro.instance.roomEngine.events.removeEventListener(RoomEngineObjectEvent.PLACED, this.onRoomEngineObjectEvent.bind(this));
				Nitro.instance.roomEngine.events.removeEventListener(RoomEngineObjectEvent.REQUEST_MOVE, this.onRoomEngineObjectEvent.bind(this));
				Nitro.instance.roomEngine.events.removeEventListener(RoomEngineObjectEvent.REQUEST_ROTATE, this.onRoomEngineObjectEvent.bind(this));
				Nitro.instance.roomEngine.events.removeEventListener(RoomEngineObjectEvent.MOUSE_ENTER, this.onRoomEngineObjectEvent.bind(this));
				Nitro.instance.roomEngine.events.removeEventListener(RoomEngineObjectEvent.MOUSE_LEAVE, this.onRoomEngineObjectEvent.bind(this));
			}

			if(Nitro.instance.roomSessionManager.events)
			{
				Nitro.instance.roomSessionManager.events.removeEventListener(RoomSessionEvent.CREATED, this.onRoomSessionEvent.bind(this));
				Nitro.instance.roomSessionManager.events.removeEventListener(RoomSessionEvent.STARTED, this.onRoomSessionEvent.bind(this));
				Nitro.instance.roomSessionManager.events.removeEventListener(RoomSessionEvent.ROOM_DATA, this.onRoomSessionEvent.bind(this));
				Nitro.instance.roomSessionManager.events.removeEventListener(RoomSessionEvent.ENDED, this.onRoomSessionEvent.bind(this));
				Nitro.instance.roomSessionManager.events.removeEventListener(RoomSessionChatEvent.CHAT_EVENT, this.onRoomSessionEvent.bind(this));
				Nitro.instance.roomSessionManager.events.removeEventListener(RoomSessionDanceEvent.RSDE_DANCE, this.onRoomSessionEvent.bind(this));
			}
		});
	}

	public getDesktop(roomId: string): RoomComponent
    {
        if(!roomId) return null;

        const existing = this.desktops.get(roomId);

        if(!existing) return null;
        
        return existing.instance;
	}

	public createDesktopForSession(session: IRoomSession): RoomComponent
    {
        if(!session) return null;

        const roomId = this.getRoomId(session.roomId);

        let desktop = this.getDesktop(roomId);

		if(desktop) return desktop;

		let desktopRef: ComponentRef<RoomComponent> = null;

		this.ngZone.run(() =>
		{
			const componentFactory = this.componentFactoryResolver.resolveComponentFactory(RoomComponent);

			desktopRef	= this.desktopContainer.createComponent(componentFactory);
			desktop 	= desktopRef.instance;
		});

		if(!desktop) return;

		desktop.roomSession 		= session;
		desktop.connection			= Nitro.instance.communication.connection;
		desktop.roomEngine			= Nitro.instance.roomEngine;
		desktop.avatarRenderManager	= Nitro.instance.avatar;
		desktop.sessionDataManager	= Nitro.instance.sessionDataManager;
		desktop.roomSessionManager	= Nitro.instance.roomSessionManager;

		desktop.events.addEventListener(RoomComponent.ROOM_VIEW_READY, this.onRoomViewReady.bind(this));

		this.desktops.set(roomId, desktopRef);

        return desktop;
	}
	
	public destroyDesktop(roomId: string): void
    {
        const desktop = this.desktops.get(roomId);

		if(!desktop) return;
		
		this.desktopContainer.remove(this.desktopContainer.indexOf(desktop.hostView));

        this.desktops.delete(roomId);
	}

	public update(time: number): void
    {
        if(!this.desktops || !this.desktops.size) return;

        for(let desktop of this.desktops.values())
        {
			if(!desktop) continue;
			
			const instance = desktop.instance;

			instance.update();
        }
	}

	private onRoomViewReady(event: NitroEvent): void
	{
		if(!event) return;

		const roomId 	= this.getRoomId(Nitro.instance.roomEngine.activeRoomId);
		const desktop	= this.getDesktop(roomId);

		if(!desktop) return;

		desktop.createWidget(RoomWidgetEnum.CHAT_WIDGET, RoomChatComponent);
		desktop.createWidget(RoomWidgetEnum.INFOSTAND, RoomInfoStandComponent);
		desktop.createWidget(RoomWidgetEnum.LOCATION_WIDGET, null);

		if(!desktop.roomSession.isSpectator)
		{
			desktop.createWidget(RoomWidgetEnum.CHAT_INPUT_WIDGET, RoomChatInputComponent);
			desktop.createWidget(RoomWidgetEnum.AVATAR_INFO, RoomAvatarInfoComponent);
		}
	}

	private onRoomEngineEvent(event: RoomEngineEvent): void
	{
		if(!event) return;

        const roomId = this.getRoomId(event.roomId);

        let desktop = this.getDesktop(roomId);

        if(!desktop)
        {
            const session = Nitro.instance.roomSessionManager.getSession(event.roomId);

            if(session) desktop = this.createDesktopForSession(session);

            if(!desktop) return;
        }

		switch(event.type)
		{
			case RoomEngineEvent.INITIALIZED:
				desktop.prepareCanvas(this.getCanvasId(event.roomId));

                Nitro.instance.roomEngine.setActiveRoomId(event.roomId);
                
				this.ngZone.run(() => this.isInRoom = true);
				return;
			case RoomEngineEvent.DISPOSED:
				this.destroyDesktop(roomId);
				this.ngZone.run(() => this.isInRoom = false);
				return;
			case RoomZoomEvent.ROOM_ZOOM:
                const zoomEvent = (event as RoomZoomEvent);

				Nitro.instance.roomEngine.setRoomInstanceRenderingCanvasScale(Nitro.instance.roomEngine.activeRoomId, this.getCanvasId(Nitro.instance.roomEngine.activeRoomId), ((zoomEvent.level < 1) ? 0.5 : (1 << (Math.floor(zoomEvent.level) - 1))));
				return;
            case RoomObjectHSLColorEnabledEvent.ROOM_BACKGROUND_COLOR:
				const colorEvent = (event as RoomObjectHSLColorEnabledEvent);
				
				if(colorEvent.enable) desktop.setBackgroundColor(colorEvent.hue, colorEvent.saturation, colorEvent.lightness);
                else desktop.setBackgroundColor(0, 0, 0);
                return;
		}
	}

	public onRoomEngineObjectEvent(event: RoomEngineObjectEvent): void
	{
		const roomId    = this.getRoomId(event.roomId);
        const desktop   = this.getDesktop(roomId);

        if(!desktop) return;

        desktop.onRoomEngineObjectEvent(event);
	}

	private onRoomSessionEvent(event: RoomSessionEvent): void
	{
		if(!event) return;

		switch(event.type)
		{
			case RoomSessionEvent.CREATED:
				this.createDesktopForSession(event.session);
				return;
			case RoomSessionEvent.STARTED:
				return;
			case RoomSessionEvent.ROOM_DATA:
				return;
			case RoomSessionEvent.ENDED:
				if(event.session) this.destroyDesktop(this.getRoomId(event.session.roomId));
				return;
			default:
				const desktop = this.getDesktop(this.getRoomId(event.session.roomId));

				if(desktop) desktop.processEvent(event);
				return;
		}
	}
	
	private getRoomId(roomId: number): string
    {
        return 'hard_coded_room_id';
    }

	public getCanvasId(roomId: number): number
	{
		return 1;
	}

	public get inventoryVisible(): boolean
    {
        return this.settingsService.inventoryVisible;
    }
}