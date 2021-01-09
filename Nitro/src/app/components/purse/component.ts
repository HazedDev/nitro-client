import { Component, NgZone } from '@angular/core';
import { AppConfiguration } from '../../AppConfiguration';
import { PurseService } from './services/purse.service';

//<div *ngIf="((currency.type >= 0) && isVisible(currency.type))" [value]="currency.amount"></div>

@Component({
	selector: 'nitro-purse-component',
    template: `
    <div class="nitro-purse-component">
        <div class="currencies-container">
            <div nitro-purse-credits-component [value]="credits"></div>
            <ng-container *ngFor="let currency of currencies | keyvalue">
                <div *ngIf="((currency.key >= 0) && isVisible(currency.key))">{{ currency.value }}</div>
            </ng-container>
        </div>
    </div>`
})
export class PurseComponent
{
    constructor(
        private purseService: PurseService,
        private ngZone: NgZone) {}

    public isVisible(type: number): boolean
    {
        if(AppConfiguration.DISPLAYED_CURRENCY_TYPES.indexOf(type) === -1) return false;

        return true;
    }

    public get credits(): number
    {
        return (this.purseService.currencies.get(-1) || 0);
    }

    public get currencies(): Map<number, number>
    {
        return this.purseService.currencies;
    }
}