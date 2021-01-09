import { NgModule } from '@angular/core';
import { AppComponent } from './component';
import { ComponentsModule } from './components';
import { CoreModule } from './core';
import { SecurityModule } from './security';
import { SharedModule } from './shared';

@NgModule({
	imports: [
		SharedModule,
		CoreModule,
		SecurityModule,
		ComponentsModule
	],
	declarations: [
		AppComponent
	],
	bootstrap: [ AppComponent ]
})
export class AppModule {} 