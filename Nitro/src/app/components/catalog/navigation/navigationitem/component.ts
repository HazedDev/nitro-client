import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CatalogPageData } from '../../../../../client/nitro/communication/messages/parser/catalog/utils/CatalogPageData';
import { AppConfiguration } from '../../../../AppConfiguration';
import { CatalogService } from '../../services/catalog.service';

@Component({
	selector: 'nitro-catalog-navigation-item-component',
    template: `
    <div class="nav-item">
        <div class="nav-link" [ngClass]="{ 'active': isActive }" (click)="selectPage()">
            <span><img class="icon" [src]="iconUrl" /> {{ catalogPage.localization }}</span>
            <i *ngIf="catalogPage.children && catalogPage.children.length" class="fas" [ngClass]="{ 'fa-sort-down': !isToggled, 'fa-sort-up': isToggled }"></i>
        </div>
        <nitro-catalog-navigation-set-component *ngIf="isToggled && catalogPage.children && (catalogPage.children.length > 0)" [catalogPage]="catalogPage" [activePage]="activePage"></nitro-catalog-navigation-set-component>
    </div>`
})
export class CatalogNavigationItemComponent implements OnInit, OnDestroy
{
    @Input()
    public catalogPage: CatalogPageData = null;

    @Input()
    public activePage: CatalogPageData = null;

    public subscription: Subscription = null;
    public isToggled: boolean = false;

    constructor(
        private catalogService: CatalogService) {}

    public ngOnInit(): void
    {
        if(this.catalogPage.children.length)
        {
            this.subscription = this.catalogService.pageEmitter.subscribe((page: CatalogPageData) =>
            {
                if(page === this.catalogPage)
                {
                    this.isToggled = !this.isToggled;
                }
                else
                {
                    const descendant = this.catalogService.isDescendant(this.catalogPage, page);

                    this.isToggled = descendant;
                }
            });
        }
    }

    public ngOnDestroy(): void
    {
        if(this.subscription) this.subscription.unsubscribe();
    }

    public selectPage(): void
    {
        if(this.catalogPage) this.catalogService.selectPage(this.catalogPage);
    }

    public get iconUrl(): string
    {
        return (AppConfiguration.CATALOG_ICON_URL.replace('%name%', (this.catalogPage.icon || 0).toString()))
    }

    public get isActive(): boolean
    {
        return (this.activePage === this.catalogPage);
    }
}