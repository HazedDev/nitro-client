import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AlertToastComponent } from './components/alerts/alert/component';
import { ConfirmToastComponent } from './components/alerts/confirm/component';
import { AvatarImageComponent } from './components/avatarimage/component';
import { BadgeComponent } from './components/badge/component';
import { LoadingComponent } from './components/loading/component';
import { RoomPreviewComponent } from './components/roompreview/component';
import { BringToTopDirective } from './directives/bringtotop/directive';
import { DraggableDirective } from './directives/draggable/directive';
import { AlertService } from './services/alert/service';

@NgModule({
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		ToastrModule.forRoot()
	],
	exports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		AvatarImageComponent,
		BadgeComponent,
		LoadingComponent,
		RoomPreviewComponent,
		DraggableDirective,
		BringToTopDirective
	],
	providers: [
		AlertService
	],
	declarations: [
		AlertToastComponent,
		ConfirmToastComponent,
		AvatarImageComponent,
		BadgeComponent,
		LoadingComponent,
		RoomPreviewComponent,
		DraggableDirective,
		BringToTopDirective
	],
	entryComponents: [ ConfirmToastComponent, AlertToastComponent ]
})
export class SharedModule {}