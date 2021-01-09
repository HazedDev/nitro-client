import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { CatalogComponent } from './component';
import { ConfirmPurchaseToastComponent } from './confirmpurchase/component';
import { CatalogLayoutDefaultComponent } from './layouts/default/component';
import { CatalogLayoutFrontPageFeaturedComponent } from './layouts/frontpagefeatured/component';
import { CatalogLayoutPetsComponent } from './layouts/pets/component';
import { CatalogLayoutPets2Component } from './layouts/pets2/component';
import { CatalogLayoutTrophiesComponent } from './layouts/trophies/component';
import { CatalogNavigationComponent } from './navigation/component';
import { CatalogNavigationItemComponent } from './navigation/navigationitem/component';
import { CatalogNavigationSetComponent } from './navigation/navigationset/component';
import { CatalogOfferGridComponent } from './offergrid/component';
import { CatalogOfferGridItemComponent } from './offergrid/griditem/component';
import { CatalogPurchaseComponent } from './purchase/component';
import { CatalogService } from './services/catalog.service';

@NgModule({
	imports: [
        SharedModule
    ],
    exports: [
        CatalogComponent,
        ConfirmPurchaseToastComponent,
        CatalogLayoutDefaultComponent,
        CatalogLayoutFrontPageFeaturedComponent,
        CatalogLayoutTrophiesComponent,
        CatalogLayoutPetsComponent,
        CatalogLayoutPets2Component,
        CatalogNavigationComponent,
        CatalogNavigationItemComponent,
        CatalogNavigationSetComponent,
        CatalogOfferGridComponent,
        CatalogOfferGridItemComponent,
        CatalogPurchaseComponent
    ],
    providers: [
        CatalogService
    ],
    declarations: [
        CatalogComponent,
        ConfirmPurchaseToastComponent,
        CatalogLayoutDefaultComponent,
        CatalogLayoutFrontPageFeaturedComponent,
        CatalogLayoutTrophiesComponent,
        CatalogLayoutPetsComponent,
        CatalogLayoutPets2Component,
        CatalogNavigationComponent,
        CatalogNavigationItemComponent,
        CatalogNavigationSetComponent,
        CatalogOfferGridItemComponent,
        CatalogOfferGridComponent,
        CatalogPurchaseComponent
    ],
    entryComponents: [
        ConfirmPurchaseToastComponent
    ]
})
export class CatalogModule {}