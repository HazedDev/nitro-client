import { Component } from '@angular/core';
import { CatalogLayout } from '../component';

@Component({
    selector: 'nitro-catalog-layout-frontpagefeatured-component',
    template: `
    <div class="nitro-catalog-layout-frontpagefeatured-component">
        frontpage
    </div>`
})
export class CatalogLayoutFrontPageFeaturedComponent extends CatalogLayout
{
    public static LAYOUT_CODE: string = 'frontpage_featured';
}