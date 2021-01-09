import { Component } from '@angular/core';
import { CatalogLayout } from '../component';

@Component({
    selector: 'nitro-catalog-layout-default-component',
    template: `
    <div class="d-flex flex-column w-100 h-100 nitro-catalog-layout-default-component">
        <div *ngIf="!activeOffer" class="d-flex flex-column justify-content-around align-items-center layout-header">
            <img *ngIf="pageImage" [src]="pageImage" />
            <span *ngIf="pageDescription" [innerHTML]="pageDescription"></span>
        </div>
        <div *ngIf="activeOffer" class="position-relative layout-header">
            <div class="w-100 h-100 position-absolute" nitro-room-preview-component [roomPreviewer]="roomPreviewer" width="374" [height]="230"></div>
            <span class="position-absolute offer-name">{{ activeOffer.localizationId }}</span>
            <div class="w-100 h-100 position-absolute" nitro-catalog-purchase-component [catalogPage]="catalogPage" [offer]="activeOffer" [roomPreviewer]="roomPreviewer"></div>
        </div>
        <div class="d-flex flex-row">
            <div class="w-100" nitro-catalog-offer-grid-component [catalogPage]="catalogPage" [offers]="(pageParser && pageParser.offers)" [activeOffer]="activeOffer"></div>
        </div>
    </div>`
})
export class CatalogLayoutDefaultComponent extends CatalogLayout
{
    public static LAYOUT_CODE: string = 'default_3x3';
}