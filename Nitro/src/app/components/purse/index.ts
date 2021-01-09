import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { PurseComponent } from './component';
import { PurseCreditsComponent } from './credits/component';
import { PurseService } from './services/purse.service';

@NgModule({
	imports: [
        SharedModule
    ],
    exports: [
        PurseComponent,
        PurseCreditsComponent
    ],
    providers: [
        PurseService
    ],
    declarations: [
        PurseComponent,
        PurseCreditsComponent
    ]
})
export class PurseModule {}