import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { RoomWidgetRentableBotInfostandUpdateEvent } from '../../events/RoomWidgetRentableBotInfostandUpdateEvent';
import { RoomInfoStandComponent } from '../component';

@Component({
	selector: 'nitro-room-infostand-rentablebot-component',
    template: `
    <div class="nitro-room-infostand-rentablebot-component" [ngClass]="{ 'active': visible }">
        <div class="card">
            <div class="card-header">
                <div class="header-title">{{ name }}</div>
                <div class="header-close" (click)="hide()"><i class="fas fa-times"></i></div>
            </div>
            <div class="card-body">
                <div class="row flex-nowrap">
                    <div #imageContainer class="body-image"></div>
                    <div class="flex-grow-1">
                        <div class="badge-container">
                            <div *ngFor="let badge of badges" class="badge-item">
                                <nitro-badge [badge]="badge"></nitro-badge>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-2" *ngIf="(motto !== '')">
                    <span class="motto">{{ motto }}</span>
                </div>
                <div class="row mt-2">
                    <span class="owner">Owner: {{ ownerName }}</span>
                </div>
            </div>
        </div>
    </div>`
})
export class RoomInfoStandRentableBotComponent
{
    @Input()
    public widget: RoomInfoStandComponent;

    @ViewChild('imageContainer')
    public imageContainer: ElementRef<HTMLDivElement>;

    public name             = '';
    public motto            = '';
    public badges: string[] = [];
    public ownerName        = '';
    public visible          = false;

    public show(): void
    {
        if(!this.visible) this.visible = true;
    }

    public hide(): void
    {
        if(this.visible) this.visible = false;
    }

    public update(event: RoomWidgetRentableBotInfostandUpdateEvent): void
    {
        this.name       = event.name;
        this.motto      = event.motto;
        this.ownerName  = event.ownerName;
        this.badges     = event.badges;

        this.setImage(event.figure);
    }

    private setImage(figure: string): void
    {
        if(!figure) return;

        const image = this.widget.handler.getUserImage(figure);

        this.imageElement.innerHTML = '';

        this.imageElement.appendChild(image);
    }

    public get imageElement(): HTMLDivElement
    {
        return ((this.imageContainer && this.imageContainer.nativeElement) || null);
    }
}