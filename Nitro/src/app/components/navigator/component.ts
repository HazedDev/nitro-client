import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { NavigatorCategoriesEvent } from '../../../client/nitro/communication/messages/incoming/navigator/NavigatorCategoriesEvent';
import { NavigatorCollapsedEvent } from '../../../client/nitro/communication/messages/incoming/navigator/NavigatorCollapsedEvent';
import { NavigatorEventCategoriesEvent } from '../../../client/nitro/communication/messages/incoming/navigator/NavigatorEventCategoriesEvent';
import { NavigatorLiftedEvent } from '../../../client/nitro/communication/messages/incoming/navigator/NavigatorLiftedEvent';
import { NavigatorMetadataEvent } from '../../../client/nitro/communication/messages/incoming/navigator/NavigatorMetadataEvent';
import { NavigatorSearchesEvent } from '../../../client/nitro/communication/messages/incoming/navigator/NavigatorSearchesEvent';
import { NavigatorSearchEvent } from '../../../client/nitro/communication/messages/incoming/navigator/NavigatorSearchEvent';
import { NavigatorSettingsEvent } from '../../../client/nitro/communication/messages/incoming/navigator/NavigatorSettingsEvent';
import { NavigatorTopLevelContext } from '../../../client/nitro/communication/messages/parser/navigator/utils/NavigatorTopLevelContext';
import { Nitro } from '../../../client/nitro/Nitro';
import { RoomSessionEvent } from '../../../client/nitro/session/events/RoomSessionEvent';
import { SettingsService } from '../../core/settings/service';

@Component({
	selector: 'nitro-navigator-component',
    template: `
    <ng-container *ngIf="visible">
        <div [draggable] dragHandle=".card-header" class="nitro-navigator-component">
            <div class="card">
                <div class="card-header">
                    <div class="header-title">Navigator</div>
                    <div class="header-close" (click)="hide()"><i class="fas fa-times"></i></div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <ng-container *ngFor="let context of topLevelContexts">
                            <button type="button" class="btn btn-primary" [ngClass]="{ 'btn-active': (currentContext === context) }" (click)="setCurrentContext(context)">{{ context.code }}</button>
                        </ng-container>
                    </div>
                </div>
            </div>
        </div>
    </ng-container>`
})
export class NavigatorComponent implements OnInit, OnDestroy
{
    public topLevelContexts: NavigatorTopLevelContext[] = [];
    public currentContext: NavigatorTopLevelContext     = null;
    public isLoaded: boolean                            = false;

    constructor(
        private settingsService: SettingsService,
        private ngZone: NgZone) {}

    public ngOnInit(): void
    {
        this.ngZone.runOutsideAngular(() =>
        {
            Nitro.instance.roomSessionManager.events.addEventListener(RoomSessionEvent.CREATED, this.onRoomSessionEvent.bind(this));

            Nitro.instance.communication.registerMessageEvent(new NavigatorCategoriesEvent(this.onNavigatorCategoriesEvent.bind(this)));
            Nitro.instance.communication.registerMessageEvent(new NavigatorCollapsedEvent(this.onNavigatorCollapsedEvent.bind(this)));
            Nitro.instance.communication.registerMessageEvent(new NavigatorEventCategoriesEvent(this.onNavigatorEventCategoriesEvent.bind(this)));
            Nitro.instance.communication.registerMessageEvent(new NavigatorLiftedEvent(this.onNavigatorLiftedEvent.bind(this)));
            Nitro.instance.communication.registerMessageEvent(new NavigatorMetadataEvent(this.onNavigatorMetadataEvent.bind(this)));
            Nitro.instance.communication.registerMessageEvent(new NavigatorSearchesEvent(this.onNavigatorSearchesEvent.bind(this)));
            Nitro.instance.communication.registerMessageEvent(new NavigatorSearchEvent(this.onNavigatorSearchEvent.bind(this)));
            Nitro.instance.communication.registerMessageEvent(new NavigatorSettingsEvent(this.onNavigatorSettingsEvent.bind(this)));

            //Nitro.instance.communication.connection.send(new NavigatorInitComposer());
        });
    }

    public ngOnDestroy(): void
    {
        this.ngZone.runOutsideAngular(() =>
        {
            Nitro.instance.roomSessionManager.events.removeEventListener(RoomSessionEvent.CREATED, this.onRoomSessionEvent.bind(this));
        });
    }

    private onRoomSessionEvent(event: RoomSessionEvent): void
	{
		if(!event) return;

		switch(event.type)
		{
			case RoomSessionEvent.CREATED:
				this.ngZone.run(() => this.hide());
				return;
		}
    }
    
    private onNavigatorCategoriesEvent(event: NavigatorCategoriesEvent): void
    {
        console.log(event);
    }

    private onNavigatorCollapsedEvent(event: NavigatorCollapsedEvent): void
    {
        console.log(event);
    }

    private onNavigatorEventCategoriesEvent(event: NavigatorEventCategoriesEvent): void
    {
        console.log(event);
    }

    private onNavigatorLiftedEvent(event: NavigatorLiftedEvent): void
    {
        console.log(event);
    }

    private onNavigatorMetadataEvent(event: NavigatorMetadataEvent): void
    {
        if(!event) return;

        const parser = event.getParser();

        if(!parser) return;

        this.ngZone.run(() =>
        {
            this.topLevelContexts = parser.topLevelContexts;

            this.isLoaded = true;

            if(this.topLevelContexts.length > 0) this.setCurrentContext(this.topLevelContexts[0]);
        });
    }

    private onNavigatorSearchesEvent(event: NavigatorSearchesEvent): void
    {
        console.log(event);
    }

    private onNavigatorSearchEvent(event: NavigatorSearchEvent): void
    {
        console.log(event);
    }

    private onNavigatorSettingsEvent(event: NavigatorSettingsEvent): void
    {
        console.log(event);
    }

    public setCurrentContext(context: NavigatorTopLevelContext): void
    {
        if(!context || (this.currentContext === context)) return;

        this.currentContext = context;
    }

    public hide(): void
    {
        this.settingsService.hideNavigator();
    }

    public get visible(): boolean
    {
        return this.settingsService.navigatorVisible;
    }
}