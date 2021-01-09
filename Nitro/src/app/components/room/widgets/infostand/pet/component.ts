import { Component, Input } from '@angular/core';
import { RoomInfoStandComponent } from '../component';
import { InfoStandPetData } from './InfoStandPetData';

@Component({
	selector: 'nitro-room-infostand-pet-component',
    template: `
    <div class="nitro-room-infostand-pet-component" [ngClass]="{ 'active': visible }">
        pet
    </div>`
})
export class RoomInfoStandPetComponent
{
    @Input()
    public widget: RoomInfoStandComponent;

    @Input()
    public data: InfoStandPetData;

    public visible = false;

    public show(): void
    {
        if(!this.visible) this.visible = true;
    }

    public hide(): void
    {
        if(this.visible) this.visible = false;
    }
}