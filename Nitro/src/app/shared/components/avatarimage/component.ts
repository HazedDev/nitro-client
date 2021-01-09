import { Component, Input, NgZone, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { AvatarScaleType } from '../../../../client/nitro/avatar/enum/AvatarScaleType';
import { AvatarSetType } from '../../../../client/nitro/avatar/enum/AvatarSetType';
import { IAvatarImageListener } from '../../../../client/nitro/avatar/IAvatarImageListener';
import { Nitro } from '../../../../client/nitro/Nitro';

@Component({
	selector: 'nitro-avatar-image',
	template: `
	<img *ngIf="avatarUrl" [src]="avatarUrl" />`
})
export class AvatarImageComponent implements OnInit, OnChanges, OnDestroy, IAvatarImageListener
{
	@Input()
	public figure: string = '';

	@Input()
	public gender: string = 'M';

	@Input()
	public headOnly: boolean = false;

	@Input()
	public direction: number = 0;

	@Input()
	public scale: number = 1;

	public avatarUrl: string	= null;
	public disposed: boolean	= false;
	public needsUpdate: boolean	= true;

	constructor(
		private ngZone: NgZone) {}

	public ngOnInit(): void
	{
		if(this.needsUpdate) this.buildAvatar();
	}

	public ngOnDestroy(): void
	{
		this.dispose();
	}

	public ngOnChanges(changes: SimpleChanges): void
	{
		const figureChange = changes.figure;

		if(figureChange)
		{
			if(figureChange.previousValue !== figureChange.currentValue) this.needsUpdate = true;
		}

		const genderChange = changes.gender;

		if(genderChange)
		{
			if(genderChange.previousValue !== genderChange.currentValue) this.needsUpdate = true;
		}

		const headOnlyChange = changes.headOnly;

		if(headOnlyChange)
		{
			if(headOnlyChange.previousValue !== headOnlyChange.currentValue) this.needsUpdate = true;
		}

		const directionChange = changes.direction;

		if(directionChange)
		{
			if(directionChange.previousValue !== directionChange.currentValue) this.needsUpdate = true;
		}

		const scaleChange = changes.scale;

		if(scaleChange)
		{
			if(scaleChange.previousValue !== scaleChange.currentValue) this.needsUpdate = true;
		}

		if(this.needsUpdate) this.buildAvatar();
	}

	public dispose(): void
	{
		if(this.disposed) return;
	}

	public resetFigure(figure: string): void
	{
		this.buildAvatar();
	}

	private buildAvatar(): void
	{
		let avatarUrl: string = null;

		this.ngZone.runOutsideAngular(() =>
		{
			this.needsUpdate = false;

			const avatarImage = Nitro.instance.avatar.createAvatarImage(this.figure, AvatarScaleType.LARGE, this.gender, this, null);
	
			if(avatarImage)
			{
				let setType = AvatarSetType.FULL;
	
				if(this.headOnly) setType = AvatarSetType.HEAD;
	
				avatarImage.setDirection(setType, this.direction);
	
				const texture	= avatarImage.getImage(setType, false, 1);
				const image 	= Nitro.instance.renderer.extract.image(texture);

				avatarUrl = image.src;
	
				avatarImage.dispose();
			}
		});

		if(avatarUrl) this.ngZone.run(() => (this.avatarUrl = avatarUrl));
	}
}