import { Component, Input } from '@angular/core';
import { CatalogPageData } from '../../../../../client/nitro/communication/messages/parser/catalog/utils/CatalogPageData';
import { CatalogPageOfferData } from '../../../../../client/nitro/communication/messages/parser/catalog/utils/CatalogPageOfferData';
import { CatalogProductOfferData } from '../../../../../client/nitro/communication/messages/parser/catalog/utils/CatalogProductOfferData';
import { CatalogService } from '../../services/catalog.service';

@Component({
    selector: '[nitro-catalog-offer-grid-item-component]',
    template: `
    <div class="nitro-catalog-offer-grid-item-component" [ngStyle]="{ 'background-image': offerImage }" (click)="selectOffer()">
        <div class="badge badge-secondary" *ngIf="offerCount > 1">{{ offerCount }}</div>
    </div>`
})
export class CatalogOfferGridItemComponent
{
    @Input()
    public catalogPage: CatalogPageData = null;
    
    @Input()
    public offer: CatalogPageOfferData = null;

    constructor(
        private catalogService: CatalogService) {}

    public selectOffer(): void
    {
        if(this.offer) this.catalogService.selectOffer(this.offer);
    }

    public getFirstProduct(): CatalogProductOfferData
    {
        const product = ((this.offer && this.offer.products[0]) || null);

        if(!product) return null;

        return product;
    }

    public hasMultipleItems(): boolean
    {
        return (this.offer.products.length > 1);
    }

    public get offerName(): string
    {
        return ((this.offer && this.offer.localizationId) || '');
    }

    public get offerImage(): string
    {
        if(!this.hasMultipleItems())
        {
            const product   = this.getFirstProduct();
            const furniData = this.catalogService.getFurnitureDataForProductOffer(product);

            if(furniData) return 'url(' + this.catalogService.getFurnitureDataIconUrl(furniData) + ')';
        }

        return null;
    }

    public get offerCount(): number
    {
        if(!this.hasMultipleItems())
        {
            const product = this.getFirstProduct();

            if(product) return product.productCount;
        }

        return 1;
    }
}