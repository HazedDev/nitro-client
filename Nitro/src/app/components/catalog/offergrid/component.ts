import { Component, Input } from '@angular/core';
import { CatalogPageData } from '../../../../client/nitro/communication/messages/parser/catalog/utils/CatalogPageData';
import { CatalogPageOfferData } from '../../../../client/nitro/communication/messages/parser/catalog/utils/CatalogPageOfferData';

@Component({
    selector: '[nitro-catalog-offer-grid-component]',
    template: `
    <div class="nitro-catalog-offer-grid-component">
        <div class="grid-items">
            <div class="item-detail" nitro-catalog-offer-grid-item-component *ngFor="let offer of offers" [catalogPage]="catalogPage" [offer]="offer" [ngClass]="{ 'active': (offer === activeOffer) }"></div>
        </div>
    </div>`
})
export class CatalogOfferGridComponent
{
    @Input()
    public catalogPage: CatalogPageData = null;

    @Input()
    public offers: CatalogPageOfferData[] = [];

    @Input()
    public activeOffer: CatalogPageOfferData = null;
}