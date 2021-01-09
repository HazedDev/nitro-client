import { Component } from '@angular/core';
import { SessionService } from '../../security/services/session.service';

@Component({
	selector: 'nitro-hotelview-component',
    template: `
    <div class="nitro-hotelview-component">
        <div class="hotel-image"></div>
        <div class="avatar-image"><nitro-avatar-image [figure]="figure" [direction]="2"></nitro-avatar-image></div>
    </div>`
})
export class HotelViewComponent
{
    constructor(
        private sessionService: SessionService) {}

    public get figure(): string
    {
        return this.sessionService.figure;
    }
}