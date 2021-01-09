import { Component, Input } from '@angular/core';
import { NitroConfiguration } from '../../../../client/NitroConfiguration';

@Component({
	selector: 'nitro-badge',
	template: `
	<img [src]="badgeUrl" />`
})
export class BadgeComponent
{
	@Input()
	public badge: string = '';

	@Input()
	public hover?: boolean = true;

	public get badgeUrl(): string
	{
		return (NitroConfiguration.BADGE_URL.replace('%badgename%', this.badge));
	}
}