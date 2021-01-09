import { AfterViewChecked, ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, Input, NgZone, OnChanges, OnDestroy, OnInit, SimpleChanges, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { SettingsService } from '../../core/settings/service';
import { InventoryCategory } from './enum/InventoryCategory';
import { HabboInventory } from './HabboInventory';
import { IInventoryModel } from './IInventoryModel';

@Component({
	selector: 'nitro-inventory-component',
    template: `
    <div *ngIf="visible" [draggable] dragHandle=".card-header" class="card nitro-inventory-component">
        <!-- <div *ngIf="isLoading" class="loading-overlay"></div> -->
        <div class="inventory-header">
            <div class="header-overlay"></div>
            <div class="card-header">
                <div class="header-title">Inventory</div>
                <div class="header-close" (click)="hide()"><i class="fas fa-times"></i></div>
            </div>
            <div class="header-tabs">
                <div class="nav nav-tabs w-100 px-4">
                    <div *ngFor="let type of getInventoryTypes()" class="nav-item nav-link" (click)="showInventory(type)">{{ type }}</div>
                </div>
            </div>
        </div>
        <div class="card-body">
            <ng-container #inventoriesContainer></ng-container>
        </div>
    </div>`
})
export class InventoryComponent implements OnInit, OnDestroy, OnChanges, AfterViewChecked
{
    @Input()
    public visible: boolean = false;

    @ViewChild('inventoriesContainer', { read: ViewContainerRef })
    public inventoriesContainer: ViewContainerRef;

    private _inventoryManager: HabboInventory = null;
    private _selectedInventory: IInventoryModel = null;
    private _needsShowing: boolean = false;

    constructor(
        private settingsService: SettingsService,
        private componentFactoryResolver: ComponentFactoryResolver,
        private changeDetector: ChangeDetectorRef,
        private ngZone: NgZone) {}

    public ngOnInit()
    {
        this._inventoryManager = new HabboInventory(this);

        this._inventoryManager.init();
    }

    public ngOnDestroy()
    {
        if(this._inventoryManager)
        {
            this._inventoryManager.dispose();

            this._inventoryManager = null;
        }
    }

    public ngOnChanges(changes: SimpleChanges): void
    {
        const previous  = (changes.visible.previousValue as boolean);
        const next      = (changes.visible.currentValue as boolean);

        if((next === previous) || (previous === undefined)) return;

        if(next) this.show();
        else this.hide();
    }

    public ngAfterViewChecked(): void
    {
        if(this._needsShowing)
        {
            if(this._selectedInventory) this._selectedInventory.show();

            this._needsShowing = false;

            this.changeDetector.detectChanges();
        }
    }

    public createComponent<T>(component: Type<T>): ComponentRef<T>
    {
        if(!component) return null;

        const factory = this.componentFactoryResolver.resolveComponentFactory(component);

        if(!factory) return null;

        let componentRef: ComponentRef<T> = null;

        if(!NgZone.isInAngularZone())
        {
            this.ngZone.run(() =>
            {
                componentRef = this.inventoriesContainer.createComponent(factory);
            });
        }
        else
        {
            componentRef = this.inventoriesContainer.createComponent(factory);
        }

        if(!componentRef) return null;

        return componentRef;
    }

    public removeComponent<T>(component: ComponentRef<T>): void
    {
        if(!component) return;

        const index = this.inventoriesContainer.indexOf(component.hostView);

        if(index === -1) return;

        this.inventoriesContainer.remove(index);
    }

    private show(): void
    {
        if(!this._selectedInventory) this.selectInventory(InventoryCategory.FURNI);

        this.showInventory();
    }

    public hide(): void
    {
        this.hideInventory();
        this.settingsService.hideInventory();
    }

    private selectInventory(type: string): void
    {
        if(!type) return;

        const model = this._inventoryManager.getModel(type);

        if(!model) return;

        this.hideInventory();

        this._selectedInventory = model;
    }

    public showInventory(): void
    {
        if(!this._selectedInventory) return;

        this._needsShowing = true;
    }

    private hideInventory(): void
    {
        if(!this._selectedInventory) return;

        this._selectedInventory.hide();
    }

    public getInventoryTypes(): string[]
    {
        return this._inventoryManager.inventories.getKeys();
    }
}