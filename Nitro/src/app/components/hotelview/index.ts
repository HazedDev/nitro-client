import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { HotelViewComponent } from './component';

@NgModule({
	imports: [
        SharedModule
    ],
    exports: [
        HotelViewComponent
    ],
    declarations: [
        HotelViewComponent
    ]
})
export class HotelViewModule {} 