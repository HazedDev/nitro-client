import { Component, Input } from '@angular/core';
import { CatalogPageData } from '../../../../../client/nitro/communication/messages/parser/catalog/utils/CatalogPageData';

@Component({
	selector: 'nitro-catalog-navigation-set-component',
    template: `
    <div class="nav nav-pills nav-item flex-column">
        <ng-container *ngFor="let child of catalogPage.children">
            <nitro-catalog-navigation-item-component *ngIf="child.visible" [catalogPage]="child" [activePage]="activePage"></nitro-catalog-navigation-item-component>
        </ng-container>
    </div>`
})
export class CatalogNavigationSetComponent
{
    @Input()
    public catalogPage: CatalogPageData = null;

    @Input()
    public activePage: CatalogPageData = null;
}