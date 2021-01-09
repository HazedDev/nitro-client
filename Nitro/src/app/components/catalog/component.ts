import { Component, ComponentFactoryResolver, ComponentRef, NgZone, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { IMessageComposer } from '../../../client/core/communication/messages/IMessageComposer';
import { CatalogClubEvent } from '../../../client/nitro/communication/messages/incoming/catalog/CatalogClubEvent';
import { CatalogModeEvent } from '../../../client/nitro/communication/messages/incoming/catalog/CatalogModeEvent';
import { CatalogPageEvent } from '../../../client/nitro/communication/messages/incoming/catalog/CatalogPageEvent';
import { CatalogPagesEvent } from '../../../client/nitro/communication/messages/incoming/catalog/CatalogPagesEvent';
import { CatalogPurchaseEvent } from '../../../client/nitro/communication/messages/incoming/catalog/CatalogPurchaseEvent';
import { CatalogPurchaseFailedEvent } from '../../../client/nitro/communication/messages/incoming/catalog/CatalogPurchaseFailedEvent';
import { CatalogPurchaseUnavailableEvent } from '../../../client/nitro/communication/messages/incoming/catalog/CatalogPurchaseUnavailableEvent';
import { CatalogSearchEvent } from '../../../client/nitro/communication/messages/incoming/catalog/CatalogSearchEvent';
import { CatalogSoldOutEvent } from '../../../client/nitro/communication/messages/incoming/catalog/CatalogSoldOutEvent';
import { CatalogUpdatedEvent } from '../../../client/nitro/communication/messages/incoming/catalog/CatalogUpdatedEvent';
import { CatalogModeComposer } from '../../../client/nitro/communication/messages/outgoing/catalog/CatalogModeComposer';
import { CatalogPageComposer } from '../../../client/nitro/communication/messages/outgoing/catalog/CatalogPageComposer';
import { CatalogPageParser } from '../../../client/nitro/communication/messages/parser/catalog/CatalogPageParser';
import { CatalogPageData } from '../../../client/nitro/communication/messages/parser/catalog/utils/CatalogPageData';
import { CatalogPageOfferData } from '../../../client/nitro/communication/messages/parser/catalog/utils/CatalogPageOfferData';
import { Nitro } from '../../../client/nitro/Nitro';
import { RoomPreviewer } from '../../../client/nitro/room/preview/RoomPreviewer';
import { Vector3D } from '../../../client/room/utils/Vector3D';
import { SettingsService } from '../../core/settings/service';
import { RoomPreviewComponent } from '../../shared/components/roompreview/component';
import { CatalogLayout } from './layouts/component';
import { CatalogLayoutDefaultComponent } from './layouts/default/component';
import { CatalogLayoutFrontPageFeaturedComponent } from './layouts/frontpagefeatured/component';
import { CatalogLayoutPetsComponent } from './layouts/pets/component';
import { CatalogLayoutPets2Component } from './layouts/pets2/component';
import { CatalogLayoutTrophiesComponent } from './layouts/trophies/component';
import { CatalogService } from './services/catalog.service';

@Component({
	selector: 'nitro-catalog-component',
    template: `
    <div *ngIf="visible" [draggable] dragHandle=".card-header" class="card nitro-catalog-component">
        <div *ngIf="isLoading" class="loading-overlay"></div>
        <div class="catalog-header" [ngStyle]="{ 'background-image': pageHeaderImage }">
            <div class="header-overlay"></div>
            <div class="card-header">
                <div class="header-title">Catalog</div>
                <div class="header-close" (click)="hide()"><i class="fas fa-times"></i></div>
            </div>
            <div class="header-details">
                <div class="page-header">{{ pageHeaderText }}</div>
                <div class="page-desc" [innerHTML]="pageHeaderDescription"></div>
            </div>
            <div class="header-tabs">
                <div *ngIf="catalogRoot && (catalogRoot.children.length > 0)" class="nav nav-tabs nav-fill w-100 px-4">
                    <ng-container *ngFor="let child of catalogRoot.children">
                        <div class="nav-item nav-link" [ngClass]="{ 'active': (activeTabData === child) }" (click)="selectTab(child)">{{ child.localization }}</div>
                    </ng-container>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div nitro-catalog-navigation-component [catalogPage]="activeTabData" [activePage]="activePageData"></div>
            <div class="flex-grow-1 layout-container">
                <ng-container #layoutContainer></ng-container>
            </div>
        </div>
    </div>`
})
export class CatalogComponent implements OnInit, OnDestroy
{
    public static NORMAL: string = 'NORMAL';

    @ViewChild('layoutContainer', { read: ViewContainerRef })
    public layoutContainer: ViewContainerRef;

    public catalogMode: number = -1;
    public catalogRoot: CatalogPageData = null;
    public roomPreviewer: RoomPreviewer = null;

    public activeTabData: CatalogPageData = null;
    public activePageData: CatalogPageData = null;
    public activePageParser: CatalogPageParser = null;
    public activeOffer: CatalogPageOfferData = null;
    public activeLayout: ComponentRef<CatalogLayout> = null;

    public tabSubscription: Subscription = null;
    public pageSubscription: Subscription = null;
    public offerSubscription: Subscription = null;
    public purchaseSubscription: Subscription = null;

    public isLoadRequested: boolean = false;
    public isLoading: boolean = false;

    constructor(
        private catalogService: CatalogService,
        private settingsService: SettingsService,
        private ngZone: NgZone,
        private componentFactoryResolver: ComponentFactoryResolver) {}

    public ngOnInit(): void
    {
        this.ngZone.runOutsideAngular(() =>
        {
            Nitro.instance.communication.registerMessageEvent(new CatalogClubEvent(this.onCatalogClubEvent.bind(this)));
            Nitro.instance.communication.registerMessageEvent(new CatalogModeEvent(this.onCatalogModeEvent.bind(this)));
            Nitro.instance.communication.registerMessageEvent(new CatalogPageEvent(this.onCatalogPageEvent.bind(this)));
            Nitro.instance.communication.registerMessageEvent(new CatalogPagesEvent(this.onCatalogPagesEvent.bind(this)));
            Nitro.instance.communication.registerMessageEvent(new CatalogPurchaseEvent(this.onCatalogPurchaseEvent.bind(this)));
            Nitro.instance.communication.registerMessageEvent(new CatalogPurchaseFailedEvent(this.onCatalogPurchaseFailedEvent.bind(this)));
            Nitro.instance.communication.registerMessageEvent(new CatalogPurchaseUnavailableEvent(this.onCatalogPurchaseUnavailableEvent.bind(this)));
            Nitro.instance.communication.registerMessageEvent(new CatalogSearchEvent(this.onCatalogSearchEvent.bind(this)));
            Nitro.instance.communication.registerMessageEvent(new CatalogSoldOutEvent(this.onCatalogSoldOutEvent.bind(this)));
            Nitro.instance.communication.registerMessageEvent(new CatalogUpdatedEvent(this.onCatalogUpdatedEvent.bind(this)));

            if(!this.roomPreviewer)
            {
                this.roomPreviewer = new RoomPreviewer(Nitro.instance.roomEngine, ++RoomPreviewComponent.PREVIEW_COUNTER);
            }
        });

        this.tabSubscription    = this.catalogService.tabEmitter.subscribe((tab: CatalogPageData) => (tab && this.onTabSelected(tab)));
        this.pageSubscription   = this.catalogService.pageEmitter.subscribe((page: CatalogPageData) => (page && this.onPageSelected(page)));
        this.offerSubscription  = this.catalogService.offerEmitter.subscribe((offer: CatalogPageOfferData) => (offer && this.onOfferSelected(offer)));
    }

    public ngOnDestroy(): void
    {
        this.ngZone.runOutsideAngular(() =>
        {
            if(this.roomPreviewer) this.roomPreviewer.dispose();
        });

        if(this.tabSubscription) this.tabSubscription.unsubscribe();
        if(this.pageSubscription) this.pageSubscription.unsubscribe();
        if(this.offerSubscription) this.offerSubscription.unsubscribe();
    }

    private onCatalogClubEvent(event: CatalogClubEvent): void
    {
        console.log(event);
    }

    private onCatalogModeEvent(event: CatalogModeEvent): void
    {
        if(!event) return;

        const parser = event.getParser();

        if(!parser) return;

        this.ngZone.run(() => (this.catalogMode = parser.mode));
    }

    private onCatalogPageEvent(event: CatalogPageEvent): void
    {
        if(!event) return;

        const parser = event.getParser();

        if(!parser) return;

        this.activePageParser = parser;

        this.ngZone.run(() =>
        {
            if(this.activeLayout) this.removeLayout(this.activeLayout);
            
            const layout = this.generatePageLayout(parser.layoutCode);
    
            if(layout)
            {
                layout.instance.catalogPage     = this.activePageData;
                layout.instance.pageParser      = this.activePageParser;
                layout.instance.roomPreviewer   = this.roomPreviewer;
                
                this.activeLayout = layout;
            }

            this.isLoading = false;
        });
    }

    private onCatalogPagesEvent(event: CatalogPagesEvent): void
    {
        if(!event) return;

        const parser = event.getParser();

        if(!parser) return;

        this.ngZone.run(() =>
        {
            this.catalogRoot = parser.root;

            this.selectFirstTab();
        });
    }

    private onCatalogPurchaseEvent(event: CatalogPurchaseEvent): void
    {
        if(!event) return;

        const parser = event.getParser();

        if(!parser) return;

        this.catalogService.receivePurchase(parser.offer);
    }

    private onCatalogPurchaseFailedEvent(event: CatalogPurchaseFailedEvent): void
    {
        if(!event) return;

        const parser = event.getParser();

        if(!parser) return;

        console.log(parser);
    }

    private onCatalogPurchaseUnavailableEvent(event: CatalogPurchaseUnavailableEvent): void
    {
        if(!event) return;

        const parser = event.getParser();

        if(!parser) return;

        console.log(parser);
    }

    private onCatalogSearchEvent(event: CatalogSearchEvent): void
    {
        if(!event) return;

        const parser = event.getParser();

        if(!parser) return;
    }

    private onCatalogSoldOutEvent(event: CatalogSoldOutEvent): void
    {
        if(!event) return;

        const parser = event.getParser();

        if(!parser) return;
    }

    private onCatalogUpdatedEvent(event: CatalogUpdatedEvent): void
    {
        if(!event) return;

        const parser = event.getParser();

        if(!parser) return;
    }

    public onTabSelected(tab: CatalogPageData): void
    {
        if(!tab) return;

        this.activeTabData = tab;

        this.selectFirstPage(tab);
    }

    public onPageSelected(page: CatalogPageData): void
    {
        if(!page || !this.canSelectPage(page)) return;

        this.activePageData = page;

        if(page.pageId >= 0) this.requestPage(page.pageId);
    }

    public onOfferSelected(offer: CatalogPageOfferData): void
    {
        if(!offer) return;

        this.activeOffer = offer;

        if(this.activeLayout) this.activeLayout.instance.activeOffer = offer;

        this.ngZone.runOutsideAngular(() =>
        {
            if(this.roomPreviewer)
            {
                const product = offer.products[0];
    
                if(product)
                {
                    if(product.productType === 's')
                    {
                        this.roomPreviewer.addFurnitureIntoRoom(product.furniClassId, new Vector3D(90));
                    }
    
                    else if(product.productType === 'i')
                    {
                        this.roomPreviewer.addWallItemIntoRoom(product.furniClassId, new Vector3D(90), null);
                    }
                }
            }
        });
    }

    public selectTab(tab: CatalogPageData): void
    {
        if(tab) this.catalogService.selectTab(tab);
    }

    private selectFirstTab(): void
    {
        if(!this.catalogRoot) return;

        const child = (this.catalogRoot.children && this.catalogRoot.children[0]);

        if(child) this.selectTab(child);
    }

    private selectFirstPage(page: CatalogPageData): void
    {
        if(!page) return;

        const child = (page.children && page.children[0]);

        if(child) this.catalogService.selectPage(child);
    }

    private setCatalogMode(mode: string): void
    {
        if(!mode) return;

        this.isLoadRequested = true;

        this.send(new CatalogModeComposer(mode));
    }

    public requestPage(pageId: number): void
    {
        this.isLoading = true;

        this.requestPageData(pageId, -1, CatalogComponent.NORMAL);
    }

    public requestPageData(pageId: number, offerId: number, catalogType: string): void
    {
        this.send(new CatalogPageComposer(pageId, offerId, catalogType));
    }

    private generatePageLayout(type: string): ComponentRef<CatalogLayout>
    {
        if(!type) return null;

        const layout = this.getLayoutForType(type);

        if(!layout) return null;

        const componentFactory  = this.componentFactoryResolver.resolveComponentFactory(layout);
        const componentRef      = this.layoutContainer.createComponent(componentFactory);

        if(!componentRef) return null;

        return componentRef;
    }

    private getLayoutForType(type: string): typeof CatalogLayout
    {
        if(!type) return null;

        switch(type)
        {
            case CatalogLayoutFrontPageFeaturedComponent.LAYOUT_CODE:
                return CatalogLayoutFrontPageFeaturedComponent;
            case CatalogLayoutTrophiesComponent.LAYOUT_CODE:
                return CatalogLayoutTrophiesComponent;
            case CatalogLayoutPetsComponent.LAYOUT_CODE:
                return CatalogLayoutPetsComponent;
            case CatalogLayoutPets2Component.LAYOUT_CODE:
                return CatalogLayoutPets2Component;
            case CatalogLayoutDefaultComponent.LAYOUT_CODE:
            default:
                return CatalogLayoutDefaultComponent;
        }
    }

    private removeLayout(layout: ComponentRef<CatalogLayout>): void
    {
        if(!layout) return;

        const index = this.layoutContainer.indexOf(layout.hostView);

        if(index === -1) return;

        this.layoutContainer.remove(index);

        this.ngZone.runOutsideAngular(() =>
        {
            if(this.roomPreviewer) this.roomPreviewer.reset(false);
        });
    }

    private canSelectPage(page: CatalogPageData): boolean
    {
        if(!page || !page.visible) return false;

        return true;
    }

    private send(composer: IMessageComposer): void
    {
        if(!composer) return;

        Nitro.instance.communication.connection.send(composer);
    }

    public hide(): void
    {
        this.settingsService.hideCatalog();
    }

    public get visible(): boolean
    {
        const visible = this.settingsService.catalogVisible;

        if(visible)
        {
            if(!this.isLoadRequested) this.setCatalogMode(CatalogComponent.NORMAL);
        }

        return visible;
    }

    public get pageHeaderText(): string
    {
        const layout = ((this.activeLayout && this.activeLayout.instance) || null);

        if(layout) return layout.headerText;

        return null;
    }

    public get pageHeaderDescription(): string
    {
        const layout = ((this.activeLayout && this.activeLayout.instance) || null);

        if(layout) return layout.headerDescription;

        return null;
    }

    public get pageHeaderImage(): string
    {
        const layout = ((this.activeLayout && this.activeLayout.instance) || null);

        if(layout) return `url('${ layout.headerImage }')`;

        return null;
    }
}