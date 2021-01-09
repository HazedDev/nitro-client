import { Component } from '@angular/core';
import { CatalogLayout } from '../component';

@Component({
    selector: 'nitro-catalog-layout-pets2-component',
    template: `
    <div class="d-flex flex-column w-100 h-100 card nitro-catalog-layout-pets2-component">
        <div class="card-header">
            <img *ngIf="pageImage" [src]="pageImage" />
            <div class="d-flex flex-grow flex-column w-100 justify-content-center" *ngIf="pageDescription" [innerHTML]="pageDescription"></div>
        </div>
        <div class="card-body">
            <div *ngIf="getText(2)" class="d-flex flex-row">
                <span [innerHTML]="getText(2)"></span>
            </div>
            <div *ngIf="getText(3)" class="d-flex flex-row">
                <span [innerHTML]="getText(3)"></span>
            </div>
        </div>
    </div>`
})
export class CatalogLayoutPets2Component extends CatalogLayout
{
    public static LAYOUT_CODE: string = 'pets2';
}