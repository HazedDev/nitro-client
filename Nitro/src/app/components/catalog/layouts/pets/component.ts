import { Component } from '@angular/core';
import { CatalogLayout } from '../component';

@Component({
    selector: 'nitro-catalog-layout-pets-component',
    template: `
    <div class="d-flex flex-column w-100 h-100 card nitro-catalog-layout-pets2-component">
        <div class="card-header">
            <img *ngIf="pageImage" [src]="pageImage" />
            <div class="d-flex flex-grow flex-column w-100 justify-content-center" [innerHTML]="getText(1)"></div>
        </div>
        <div class="card-body">
            <div class="d-flex flex-row">
                <span [innerHTML]="getText(2)"></span>
            </div>
            <div class="d-flex flex-row">
                <span [innerHTML]="getText(3)"></span>
            </div>
        </div>
    </div>`
})
export class CatalogLayoutPetsComponent extends CatalogLayout
{
    public static LAYOUT_CODE: string = 'pets';
}