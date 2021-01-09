import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { NavigatorComponent } from './component';

@NgModule({
	imports: [
        SharedModule
    ],
    exports: [
        NavigatorComponent
    ],
    providers: [
    ],
    declarations: [
        NavigatorComponent
    ]
})
export class NavigatorModule {}