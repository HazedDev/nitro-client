import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { InventoryComponent } from './component';
import { InventoryFurniComponent } from './furni/FurniView';

@NgModule({
	imports: [
        SharedModule
    ],
    exports: [
        InventoryComponent,
        InventoryFurniComponent
    ],
    declarations: [
        InventoryComponent,
        InventoryFurniComponent
    ]
})
export class InventoryModule {}