import { Component, Input } from '@angular/core';

@Component({
	selector: 'nitro-loading',
	template: `
	<div class="nitro-loading-component">
		<div class="loading-view">
			<div class="splash">
				<div class="photo"></div>
				<div class="frame"></div>
			</div>
			<div *ngIf="message && message.length" class="text">{{ message }}</div>
			<div *ngIf="!hideProgress" class="progress-container">
				<div class="loading-bar">
					<div class="bar" [ngStyle]="{ 'width': ((percentage || 0) + '%') }"></div>
				</div>
				<div class="percent">{{ (percentage || 0) }}%</div>
			</div>
		</div>
	</div>`
})
export class LoadingComponent
{
	@Input()
	public message?: string = '';

	@Input()
	public percentage?: number = 0;

	@Input()
	public hideProgress?: boolean = false;
}