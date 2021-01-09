import { Component, Input } from '@angular/core';
import { CatalogPageData } from '../../../../client/nitro/communication/messages/parser/catalog/utils/CatalogPageData';

@Component({
	selector: '[nitro-catalog-navigation-component]',
    template: `
    <div class="nitro-catalog-navigation-component">
        <div class="scroll-container">
            <nitro-catalog-navigation-set-component *ngIf="catalogPage" [catalogPage]="catalogPage" [activePage]="activePage"></nitro-catalog-navigation-set-component>
        </div>
    </div>`
})
export class CatalogNavigationComponent
{
    @Input()
    public catalogPage: CatalogPageData = null;

    @Input()
    public activePage: CatalogPageData = null;
}