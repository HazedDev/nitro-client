import { Component, Input, NgZone, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActiveToast, ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CatalogPurchaseComposer } from '../../../../client/nitro/communication/messages/outgoing/catalog/CatalogPurchaseComposer';
import { CatalogPageData } from '../../../../client/nitro/communication/messages/parser/catalog/utils/CatalogPageData';
import { CatalogPageOfferData } from '../../../../client/nitro/communication/messages/parser/catalog/utils/CatalogPageOfferData';
import { CatalogPurchaseData } from '../../../../client/nitro/communication/messages/parser/catalog/utils/CatalogPurchaseData';
import { Nitro } from '../../../../client/nitro/Nitro';
import { RoomPreviewer } from '../../../../client/nitro/room/preview/RoomPreviewer';
import { AlertService } from '../../../shared/services/alert/service';
import { ConfirmPurchaseToastComponent } from '../confirmpurchase/component';
import { CatalogService } from '../services/catalog.service';

@Component({
	selector: '[nitro-catalog-purchase-component]',
    template: `
    <div class="nitro-catalog-purchase-component">
        <div class="badge badge-secondary" *ngIf="costCredits"><i class="icon icon-currency--1"></i> {{ costCredits }}</div>
        <div class="badge badge-secondary" *ngIf="costPoints"><i class="icon icon-currency-{{ pointsType }}"></i> {{ costPoints }}</div>
        <div class="button-container btn-group">
            <button type="button" class="btn btn-primary" (click)="adjustQuantity(-1)">-</button>
            <button type="button" class="btn btn-primary">{{ quantity }}</button>
            <button type="button" class="btn btn-primary" (click)="adjustQuantity(1)">+</button>
        </div>
        <button type="button" class="btn btn-primary" (click)="purchase()">buy</button>
    </div>`
})
export class CatalogPurchaseComponent implements OnInit, OnChanges, OnDestroy
{
    @Input()
    public catalogPage: CatalogPageData = null;

    @Input()
    public offer: CatalogPageOfferData = null;

    @Input()
    public roomPreviewer: RoomPreviewer = null;

    public quantity = 1;
    public activeToast: ActiveToast<ConfirmPurchaseToastComponent> = null;
    public actionSubscription: Subscription = null;
    public hideSubscription: Subscription = null;
    public purchaseSubscription: Subscription = null;

    constructor(
        private catalogService: CatalogService,
        private alertService: AlertService,
        private toastrService: ToastrService,
        private ngZone: NgZone) {}

    public ngOnInit(): void
    {
        this.purchaseSubscription = this.catalogService.purchaseEmitter.subscribe((purchase: CatalogPurchaseData) => (purchase && this.onPurchased(purchase)));
    }

    public ngOnDestroy(): void
    {
        this.removeToast();

        if(this.purchaseSubscription) this.purchaseSubscription.unsubscribe();
        if(this.actionSubscription) this.actionSubscription.unsubscribe();
        if(this.hideSubscription) this.hideSubscription.unsubscribe();
    }

    public ngOnChanges(changes: SimpleChanges): void
    {
        const previous  = changes.offer.previousValue;
        const next      = changes.offer.currentValue;

        if(next === previous) return;

        this.quantity = 1;
    }

    private removeToast(): void
    {
        if(!this.activeToast) return;

        this.ngZone.run((() => this.toastrService.clear(this.activeToast.toastId)));
    }

    public adjustQuantity(amount: number = 1, exact: boolean = false): void
    {
        if(!amount)
        {
            this.quantity = 1;

            return;
        }

        if(exact)
        {
            this.quantity = amount;

            return;
        }

        let newQuantity = this.quantity + amount;

        if(newQuantity <= 0) newQuantity = 1;

        this.quantity = newQuantity;
    }

    public purchase(): void
    {
        if(!this.activeToast)
        {
            const config = this.alertService.alertConfig();

            if(!config) return;

            const toast = this.alertService.createToast(ConfirmPurchaseToastComponent, null, 'Confirm Purchase', config);
            
            if(toast)
            {
                this.activeToast = toast;

                this.actionSubscription = this.activeToast
                    .onAction
                    .subscribe((action: string) => (action && this.onAction(action)));

                this.hideSubscription = this.activeToast
                    .onHidden
                    .subscribe(this.onHidden.bind(this));
            }

            if(!this.activeToast) return;
        }

        const instance = this.activeToast.toastRef.componentInstance;

        if(instance)
        {
            if(instance.isLoading) return;
            
            instance.offer          = this.offer;
            instance.roomPreviewer  = this.roomPreviewer;
            instance.quantity       = this.quantity;
            instance.costCredits    = this.costCredits;
            instance.costPoints     = this.costPoints;
            instance.pointsType     = this.pointsType;

            instance.refresh();
        }
    }

    private onPurchased(purchase: CatalogPurchaseData): void
    {
        const toast = ((this.activeToast && this.activeToast.toastRef && this.activeToast.toastRef.componentInstance) || null);
        
        if(!toast) return;

        toast.completePurchase();
        
        this.removeToast();
    }

    private onAction(action: string): void
    {
        if(this.activeToast)
        {
            this.activeToast.toastRef.componentInstance.isLoading = true;
            
            Nitro.instance.communication.connection.send(new CatalogPurchaseComposer(this.catalogPage.pageId, this.offer.offerId, null, this.quantity));
        }
    }

    private onHidden(): void
    {
        if(this.actionSubscription) this.actionSubscription.unsubscribe();
        if(this.hideSubscription) this.hideSubscription.unsubscribe();

        this.activeToast = null;
    }

    public get costCredits(): number
    {
        return ((this.offer.priceCredits && (this.offer.priceCredits * this.quantity)) || 0);
    }

    public get costPoints(): number
    {
        return ((this.offer.priceActivityPoints && (this.offer.priceActivityPoints * this.quantity)) || 0);
    }

    public get pointsType(): number
    {
        return this.offer.priceActivityPoints;
    }
}