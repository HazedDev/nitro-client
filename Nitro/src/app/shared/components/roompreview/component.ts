import { AfterViewInit, Component, ElementRef, Input, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Nitro } from '../../../../client/nitro/Nitro';
import { RoomPreviewer } from '../../../../client/nitro/room/preview/RoomPreviewer';
import { IRoomRenderingCanvas } from '../../../../client/room/renderer/IRoomRenderingCanvas';

@Component({
	selector: '[nitro-room-preview-component]',
	template: `
	<div class="nitro-room-preview-component">
		<img #previewImage [src]="imageUrl" />
	</div>`
})
export class RoomPreviewComponent implements OnInit, OnDestroy, AfterViewInit
{
	public static PREVIEW_COUNTER: number = 0;
	
	@ViewChild('previewImage')
	public previewImage: ElementRef<HTMLImageElement>;

	@Input()
	public roomPreviewer: RoomPreviewer = null;

	@Input()
	public width: number = 1;

	@Input()
	public height: number = 1;

	public renderingCanvas: IRoomRenderingCanvas = null;
	public displayObject: PIXI.DisplayObject = null;
	public imageUrl: string = null;
	public isRunning: boolean = false;

	constructor(
		private ngZone: NgZone) {}

	public ngOnInit(): void
	{
		if(!this.roomPreviewer)
		{
			this.roomPreviewer = new RoomPreviewer(Nitro.instance.roomEngine, ++RoomPreviewComponent.PREVIEW_COUNTER);
		}
	}

	public ngOnDestroy(): void
	{
		this.stop();
	}

	public ngAfterViewInit(): void
	{
		if(this.roomPreviewer)
		{
			this.displayObject 		= this.roomPreviewer.getRoomCanvas(this.width, this.height);
			this.renderingCanvas	= this.roomPreviewer.getRenderingCanvas();
		}

		this.start();
	}

	public start(): void
	{
		if(this.isRunning) return;

		this.ngZone.runOutsideAngular(() =>
		{
			if(this.previewImageElement)
			{
				this.previewImageElement.addEventListener('click', this.onClick.bind(this));
			}

			Nitro.instance.ticker.add(this.update, this);
		});

		this.isRunning = true;
	}

	public stop(): void
	{
		if(!this.isRunning) return;

		this.ngZone.runOutsideAngular(() =>
		{
			if(this.previewImageElement)
			{
				this.previewImageElement.removeEventListener('click', this.onClick.bind(this));
			}
			
			Nitro.instance.ticker.remove(this.update, this);
		});

		this.isRunning = false;
	}

	public update(time: number): void
	{
		if(this.roomPreviewer && this.renderingCanvas && this.displayObject)
		{
			this.roomPreviewer.updatePreviewRoomView();
			
			if(this.renderingCanvas.canvasUpdated)
			{
				const imageUrl = Nitro.instance.renderer.extract.base64(this.displayObject);

				this.previewImageElement.src = imageUrl;
			}
		}
	}

	public onClick(event: MouseEvent): void
	{
		if(!event) return;

		if(this.roomPreviewer) this.roomPreviewer.changeRoomObjectState();
	}

	public get previewImageElement(): HTMLImageElement
	{
		return ((this.previewImage && this.previewImage.nativeElement) || null);
	}
}