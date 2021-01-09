import { AfterViewChecked, Component, ElementRef, Input, NgZone, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { PurseService } from '../services/purse.service';

@Component({
	selector: '[nitro-purse-credits-component]',
    template: `
    <div class="nitro-purse-credits-component">
        <canvas #creditCanvas width="{{ width }}" height="{{ height }}"></canvas>
        {{ value }}
    </div>`
})
export class PurseCreditsComponent implements OnInit, OnChanges, AfterViewChecked
{
    @Input()
    public value: number = 0;

    @ViewChild('creditCanvas')
    public creditCanvas: ElementRef<HTMLCanvasElement>;

    public hasPendingChange: boolean = false;
    public image: HTMLImageElement = null;
    public imageLoaded: boolean = false;

    public width: number = 22;
    public height: number = 22;
    public isFirstRun: boolean = true;
    public frameNumber: number = 0;
    public totalFrames: number = 6;
    public interval: any = null;

    constructor(
        private purseService: PurseService,
        private ngZone: NgZone) {}

    public ngOnInit(): void
    {
        this.loadImage();
    }

    public ngOnChanges(changes: SimpleChanges): void
    {
        const previous  = changes.value.previousValue;
        const next      = changes.value.currentValue;

        if(next === previous) return;

        this.hasPendingChange = true;
    }

    public ngAfterViewChecked(): void
    {
        if(this.hasPendingChange)
        {
            this.runAnimation();
            
            this.hasPendingChange = false;
        }
    }

    private loadImage(): void
    {
        if(this.image || this.imageLoaded) return;

        this.image = new Image();

        this.image.src = '../../../assets/images/wallet/credit-sprite.png';

        this.image.onload = (() =>
        {
            this.imageLoaded = true;

            this.runAnimation();
        });
    }

    private startAnimation(): void
    {
        this.stopAnimation();

        this.interval = setInterval(() =>
        {
            this.drawSprite();
            
            if(this.frameNumber === 0) this.stopAnimation();
        }, 80);
    }

    private stopAnimation(): void
    {
        if(this.interval)
        {
            clearInterval(this.interval);

            this.interval = null;
        }

        this.frameNumber = 0;
    }

    public runAnimation()
    {
        if(!this.imageLoaded) return;

        this.ngZone.runOutsideAngular(() => this.startAnimation());
    }

    private updateFrame(): void
    {
        this.frameNumber = (++this.frameNumber % this.totalFrames);
    }

    private drawSprite(): void
    {
        if(!this.imageLoaded || !this.image) return;
        
        this.updateFrame();

        const canvas    = this.creditCanvas.nativeElement;
        const context   = (canvas && canvas.getContext('2d'));

        if(!canvas || !context) return;

        context.clearRect(0, 0, this.width, this.height);

        context.drawImage(
            this.image,
            this.frameNumber * this.width,
            0,
            this.width,
            this.height,
            0,
            0,
            this.width,
            this.height
        );
    }
}