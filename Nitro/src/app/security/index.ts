import { NgModule } from '@angular/core';
import { SessionService } from './services/session.service';

@NgModule({
	providers: [
		SessionService
	]
})
export class SecurityModule {}