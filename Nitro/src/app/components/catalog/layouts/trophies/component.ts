import { Component } from '@angular/core';
import { CatalogPageOfferData } from '../../../../../client/nitro/communication/messages/parser/catalog/utils/CatalogPageOfferData';
import { CatalogLayout } from '../component';

@Component({
    selector: 'nitro-catalog-layout-trophies-component',
    template: `
    <div class="d-flex flex-column w-100 h-100 nitro-catalog-layout-trophies-component">
        <div class="d-flex flex-row justify-content-center align-items-center layout-header">
            <div class="justify-content-center align-items-center">preview trophy</div>
        </div>
        <div class="d-flex flex-row">
            <div class="w-100">color options</div>
        </div>
        <div class="d-flex flex-row">
            <div class="w-100">trophy textarea here</div>
        </div>
    </div>`
})
export class CatalogLayoutTrophiesComponent extends CatalogLayout
{
    public static LAYOUT_CODE: string = 'trophies';

    public trophyOffers: CatalogPageOfferData[] = [];
}