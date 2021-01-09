import { AfterViewChecked, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { NitroEvent } from '../client/core/events/NitroEvent';
import { AvatarRenderEvent } from '../client/nitro/avatar/events/AvatarRenderEvent';
import { NitroCommunicationDemoEvent } from '../client/nitro/communication/demo/NitroCommunicationDemoEvent';
import { Nitro } from '../client/nitro/Nitro';
import { RoomEngineEvent } from '../client/nitro/room/events/RoomEngineEvent';

@Component({
    selector: 'app-root',
    template: `
    <div id="nitro">
        <nitro-loading *ngIf="!isReady" [message]="message" [percentage]="percentage" [hideProgress]="hideProgress"></nitro-loading>
        <nitro-main-component *ngIf="isReady"></nitro-main-component>
    </div>`
})
export class AppComponent implements OnInit, OnDestroy, AfterViewChecked
{
    public message: string          = 'Starting';
    public percentage: number       = 0;
    public hideProgress: boolean    = false;
    public isRoomEngineReady: boolean   = false;
    public isAvatarRenderReady: boolean = false;
    public isError: boolean         = false;

    constructor(
        private ngZone: NgZone) {}
    ngAfterViewChecked(): void {
       
    }

    public ngOnInit(): void
    {
        this.ngZone.runOutsideAngular(() =>
        {
            if (!Nitro.instance)
            {
                Nitro.bootstrap({
                    configurationUrl: '',
                    sso: (new URLSearchParams(window.location.search).get('sso') || null)
                });
            }

            Nitro.instance.events.addEventListener(NitroCommunicationDemoEvent.CONNECTION_ESTABLISHED, this.onNitroEvent.bind(this));
            Nitro.instance.events.addEventListener(NitroCommunicationDemoEvent.CONNECTION_HANDSHAKING, this.onNitroEvent.bind(this));
            Nitro.instance.events.addEventListener(NitroCommunicationDemoEvent.CONNECTION_HANDSHAKE_FAILED, this.onNitroEvent.bind(this));
            Nitro.instance.events.addEventListener(NitroCommunicationDemoEvent.CONNECTION_AUTHENTICATED, this.onNitroEvent.bind(this));
            Nitro.instance.events.addEventListener(NitroCommunicationDemoEvent.CONNECTION_ERROR, this.onNitroEvent.bind(this));
            Nitro.instance.events.addEventListener(NitroCommunicationDemoEvent.CONNECTION_CLOSED, this.onNitroEvent.bind(this));
            Nitro.instance.roomEngine.events.addEventListener(RoomEngineEvent.ENGINE_INITIALIZED, this.onNitroEvent.bind(this));
            Nitro.instance.avatar.events.addEventListener(AvatarRenderEvent.AVATAR_RENDER_READY, this.onNitroEvent.bind(this));

            Nitro.instance.core.asset.downloadAssets(Nitro.CONFIGURATION.PRELOAD_ASSETS, (status: boolean) =>
            {
                Nitro.instance.communication.init();
            });
        });
    }

    public ngOnDestroy(): void
    {
        this.ngZone.runOutsideAngular(() =>
        {
            Nitro.instance.events.removeEventListener(NitroCommunicationDemoEvent.CONNECTION_ESTABLISHED, this.onNitroEvent.bind(this));
            Nitro.instance.events.removeEventListener(NitroCommunicationDemoEvent.CONNECTION_HANDSHAKING, this.onNitroEvent.bind(this));
            Nitro.instance.events.removeEventListener(NitroCommunicationDemoEvent.CONNECTION_HANDSHAKE_FAILED, this.onNitroEvent.bind(this));
            Nitro.instance.events.removeEventListener(NitroCommunicationDemoEvent.CONNECTION_AUTHENTICATED, this.onNitroEvent.bind(this));
            Nitro.instance.events.removeEventListener(NitroCommunicationDemoEvent.CONNECTION_ERROR, this.onNitroEvent.bind(this));
            Nitro.instance.events.removeEventListener(NitroCommunicationDemoEvent.CONNECTION_CLOSED, this.onNitroEvent.bind(this));
            Nitro.instance.roomEngine.events.removeEventListener(RoomEngineEvent.ENGINE_INITIALIZED, this.onNitroEvent.bind(this));
            Nitro.instance.avatar.events.removeEventListener(AvatarRenderEvent.AVATAR_RENDER_READY, this.onNitroEvent.bind(this));
        });
    }

    private onNitroEvent(event: NitroEvent): void
    {
        if(!event) return;

        switch(event.type)
        {
			case NitroCommunicationDemoEvent.CONNECTION_HANDSHAKING:
                this.ngZone.run(() =>
                {
                    this.message        = 'Handshaking';
                    this.percentage     = 25;
                    this.hideProgress   = false;
                });
				break;
			case NitroCommunicationDemoEvent.CONNECTION_HANDSHAKE_FAILED:
                this.ngZone.run(() =>
                {
                    this.isError        = true;
                    this.message        = 'Handshake Failed';
                    this.percentage     = 0;
                    this.hideProgress   = true;
                });
				break;
			case NitroCommunicationDemoEvent.CONNECTION_AUTHENTICATED:
                this.ngZone.run(() =>
                {
                    this.message        = 'Preparing Nitro';
                    this.percentage     = 50;
                    this.hideProgress   = false;
                });

                Nitro.instance.init();
				break;
			case NitroCommunicationDemoEvent.CONNECTION_ERROR:
                this.ngZone.run(() =>
                {
                    this.isError        = true;
                    this.message        = 'Connection Error';
                    this.percentage     = 0;
                    this.hideProgress   = true;
                });
				break;
			case NitroCommunicationDemoEvent.CONNECTION_CLOSED:
                this.ngZone.run(() =>
                {
                    this.isError        = true;
                    this.message        = 'Connection Closed';
                    this.percentage     = 0;
                    this.hideProgress   = true;
                });
                break;
            case RoomEngineEvent.ENGINE_INITIALIZED:
                this.ngZone.run(() =>
                {
                    this.isRoomEngineReady      = true;
                    this.message                = (!this.isAvatarRenderReady) ? 'Waiting for AvatarRender' : 'Ready';
                    this.percentage             = (!this.isAvatarRenderReady) ? 75 : 100;
                    this.hideProgress           = false;
                });

                Nitro.instance.communication.connection.onReady();
                break;
            case AvatarRenderEvent.AVATAR_RENDER_READY:
                this.ngZone.run(() =>
                {
                    this.isAvatarRenderReady    = true;
                    this.message                = (!this.isRoomEngineReady) ? 'Waiting for RoomEngine' : 'Ready';
                    this.percentage             = (!this.isRoomEngineReady) ? 75 : 100;
                    this.hideProgress           = false;
                });
                break;
        }
    }

    public get isReady(): boolean
    {
        return ((this.isRoomEngineReady && this.isAvatarRenderReady) || false);
    }
}
