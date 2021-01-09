import { Component, ElementRef, Input, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Nitro } from '../../../client/nitro/Nitro';
import { RoomEngineAnimateIconEvent } from '../../../client/nitro/room/events/RoomEngineAnimateIconEvent';
import { RoomEngineEvent } from '../../../client/nitro/room/events/RoomEngineEvent';
import { Dispose } from '../../../client/nitro/window/motion/Dispose';
import { DropBounce } from '../../../client/nitro/window/motion/DropBounce';
import { EaseOut } from '../../../client/nitro/window/motion/EaseOut';
import { JumpBy } from '../../../client/nitro/window/motion/JumpBy';
import { Motions } from '../../../client/nitro/window/motion/Motions';
import { Queue } from '../../../client/nitro/window/motion/Queue';
import { Wait } from '../../../client/nitro/window/motion/Wait';
import { SettingsService } from '../../core/settings/service';
import { SessionService } from '../../security/services/session.service';
import { ToolbarIconEnum } from './enums/ToolbarIconEnum';

@Component({
	selector: 'nitro-toolbar-component',
    template: `
    <div class="nitro-toolbar-component">
        <div class="card">
            <div class="card-header">
                <div class="header-title">Nitro</div>
            </div>
            <div class="card-body">
                <div nitro-toolbar-cameracontrols-component></div>
                <ul #navigationList class="list-group">
                    <li class="list-group-item" *ngIf="isInRoom" ><i class="icon icon-habbo"></i></li>
                    <li class="list-group-item" *ngIf="!isInRoom"><i class="icon icon-house"></i></li>
                    <li class="list-group-item" (click)="toggleNavigator()"><i class="icon icon-rooms"></i></li>
                    <li class="list-group-item" (click)="toggleInventory()"><i class="icon icon-inventory"></i></li>
                    <li class="list-group-item" (click)="toggleCatalog()"><i class="icon icon-catalog"></i></li>
                    <li class="list-group-item avatar-image"><nitro-avatar-image [figure]="figure" [headOnly]="true" [direction]="2" [scale]="0.5"></nitro-avatar-image></li>
                </ul>
            </div>
        </div>
    </div>`
})
export class ToolbarComponent implements OnInit, OnDestroy
{
    @Input()
    public isInRoom: boolean = false;

    @ViewChild('navigationList')
    public navigationList: ElementRef<HTMLElement>;

    constructor(
        private sessionService: SessionService,
        private settingsService: SettingsService,
        private ngZone: NgZone) {}

    public ngOnInit(): void
    {
        this.ngZone.runOutsideAngular(() =>
        {
            Nitro.instance.roomEngine.events.addEventListener(RoomEngineAnimateIconEvent.ANIMATE, this.onRoomEngineEvent.bind(this));
        });
    }

    public ngOnDestroy(): void
    {
        this.ngZone.runOutsideAngular(() =>
        {
            Nitro.instance.roomEngine.events.removeEventListener(RoomEngineAnimateIconEvent.ANIMATE, this.onRoomEngineEvent.bind(this));
        });
    }

    public toggleCatalog(): void
    {
        this.settingsService.toggleCatalog();
    }

    public toggleInventory(): void
    {
        this.settingsService.toggleInventory();
    }

    public toggleNavigator(): void
    {
        this.settingsService.toggleNavigator();
    }

    private onRoomEngineEvent(event: RoomEngineEvent): void
    {
        if(!event) return;

        switch(event.type)
        {
            case RoomEngineAnimateIconEvent.ANIMATE:
                const iconEvent = (event as RoomEngineAnimateIconEvent);

                this.animateToIcon(iconEvent.icon, iconEvent.image, iconEvent.x, iconEvent.y);
                return;
        }
    }

    public animateToIcon(icon: string, image: HTMLImageElement, x: number, y: number): void
    {
        if(!icon || !image || !this.navigationListElement) return;

        const iconName  = this.getIconName(icon);
        const target    = (this.navigationListElement.getElementsByClassName(iconName)[0] as HTMLElement);

        if(target)
        {
            image.className         = 'toolbar-icon-animation';
            image.style.visibility  = 'visible';
            image.style.left        = (x + 'px');
            image.style.top         = (y + 'px');

            document.body.append(image);

            const targetBounds  = target.getBoundingClientRect();
            const imageBounds   = image.getBoundingClientRect();

            let left    = (imageBounds.x - targetBounds.x);
            let top     = (imageBounds.y - targetBounds.y);
            let squared = Math.sqrt(((left * left) + (top * top)));
            var wait    = (500 - Math.abs(((((1 / squared) * 100) * 500) * 0.5)));
            var height  = 20;

            const motionName = (`ToolbarBouncing[${ iconName }]`);

            if(!Motions._Str_19320(motionName))
            {
                Motions._Str_4598(new Queue(new Wait((wait + 8)), new DropBounce(target, 400, 12))).tag = motionName;
            }

            var _local_19 = new Queue(new EaseOut(new JumpBy(image, wait, ((targetBounds.x - imageBounds.x) + height), (targetBounds.y - imageBounds.y), 100, 1), 1), new Dispose(image));
            
            Motions._Str_4598(_local_19);
        }
    }

    public getIconName(icon: string): string
    {
        switch(icon)
        {
            case ToolbarIconEnum.INVENTORY:
                return 'icon-inventory';
            default:
                return null;
        }
    }

    public get figure(): string
    {
        return this.sessionService.figure;
    }

    public get navigationListElement(): HTMLElement
    {
        return ((this.navigationList && this.navigationList.nativeElement) || null);
    }
}