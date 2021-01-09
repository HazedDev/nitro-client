import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { RoomWidgetUserInfostandUpdateEvent } from '../../events/RoomWidgetUserInfostandUpdateEvent';
import { RoomInfoStandComponent } from '../component';

@Component({
	selector: 'nitro-room-infostand-user-component',
    template: `
    <div class="nitro-room-infostand-user-component" [ngClass]="{ 'active': visible }">
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
                                <nitro-badge *ngIf="(badge !== '')" [badge]="badge"></nitro-badge>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-2">
                    <div *ngIf="isOwnProfile" class="motto-container">
                        <i class="icon pencil-icon"></i>
                        <span *ngIf="!isEditingMotto" class="motto" (click)="toggleMottoEditor()">{{ ((motto === '') ? '&nbsp;' : motto) }}</span>
                        <input *ngIf="isEditingMotto" type="text" class="motto-input" [value]="motto" autofocus="true" />
                    </div>
                    <div *ngIf="!isOwnProfile" class="motto-container">
                        <span class="motto">{{ ((motto === '') ? '&nbsp;' : motto) }}</span>
                    </div>
                </div>
                <div class="row mt-2">
                    <span class="activity-points">Achievement Score: {{ activityPoints }}</span>
                </div>
            </div>
        </div>
    </div>`
})
export class RoomInfoStandUserComponent
{
    @Input()
    public widget: RoomInfoStandComponent;

    @ViewChild('imageContainer')
    public imageContainer: ElementRef<HTMLDivElement>;

    public name             = '';
    public motto            = '';
    public badges: string[] = [];
    public activityPoints   = 0;
    public isEditingMotto   = false;
    public visible          = false;

    public show(): void
    {
        if(!this.visible) this.visible = true;
    }

    public hide(): void
    {
        if(this.visible) this.visible = false;
    }

    public update(event: RoomWidgetUserInfostandUpdateEvent): void
    {
        this.name           = event.name;
        this.motto          = event.motto;
        this.badges         = event.badges;
        this.activityPoints = event.activityPoints;
        this.isEditingMotto = false;

        this.badges.splice(1, 0, '');

        this.setImage(event.figure);
    }

    public resetBadges(): void
    {
        if(!this.visible) return;
        
        this.badges = this.widget.userData.badges;

        this.badges.splice(1, 0, '');
    }

    private setImage(figure: string): void
    {
        if(!figure) return;

        const image = this.widget.handler.getUserImage(figure);

        this.imageElement.innerHTML = '';

        this.imageElement.appendChild(image);
    }

    public toggleMottoEditor(): void
    {
        this.isEditingMotto = !this.isEditingMotto;
    }

    public get imageElement(): HTMLDivElement
    {
        return ((this.imageContainer && this.imageContainer.nativeElement) || null);
    }

    public get isOwnProfile(): boolean
    {
        return (this.widget.userData.type === RoomWidgetUserInfostandUpdateEvent.OWN_USER);
    }
}