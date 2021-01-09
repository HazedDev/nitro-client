import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { CameraControlsComponent } from './cameracontrols/component';
import { ToolbarComponent } from './component';

@NgModule({
	imports: [
        SharedModule
    ],
    exports: [
        ToolbarComponent,
        CameraControlsComponent
    ],
    providers: [
    ],
    declarations: [
        ToolbarComponent,
        CameraControlsComponent
    ]
})
export class ToolbarModule {}