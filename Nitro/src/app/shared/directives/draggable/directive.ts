import { AfterViewInit, Directive, ElementRef, Input, NgZone, OnDestroy } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';

@Directive({
    selector: '[draggable]'
})
export class DraggableDirective implements AfterViewInit, OnDestroy
{
    @Input()
    public dragHandle: string;

    @Input()
    public dragTarget: string;
  
    private target: HTMLElement = null;
    private handle: HTMLElement = null;
    private delta               = {x: 0, y: 0};
    private offset              = {x: 0, y: 0};
  
    private destroy$ = new Subject<void>();
  
    constructor(
        private elementRef: ElementRef,
        private zone: NgZone) {}
  
    public ngAfterViewInit(): void
    {
        const element = (this.elementRef.nativeElement as HTMLElement);

        if(!element) return;

        this.handle = this.dragHandle ? element.querySelector(this.dragHandle) : element;
        this.target = this.dragTarget ? element.querySelector(this.dragTarget) : element;

        if(this.handle) this.handle.classList.add('header-draggable');

        this.setupEvents();
    }
  
    public ngOnDestroy(): void
    {
        if(this.handle) this.handle.classList.remove('header-draggable');
        
        this.destroy$.next();
    }

    private setupEvents(): void
    {
        this.zone.runOutsideAngular(() =>
        {
            let mousedown$  = fromEvent(this.handle, 'mousedown');
            let mousemove$  = fromEvent(document, 'mousemove');
            let mouseup$    = fromEvent(document, 'mouseup');
    
            let mousedrag$ = mousedown$
                .pipe(
                    switchMap((event: MouseEvent) =>
                    {
                        let startX = event.clientX;
                        let startY = event.clientY;
            
                        return mousemove$
                            .pipe(
                                map((event: MouseEvent) => {
                                    event.preventDefault();

                                    this.delta = {
                                        x: event.clientX - startX,
                                        y: event.clientY - startY
                                    };
                                }),
                                takeUntil(mouseup$)
                            );
                    }),
                    takeUntil(this.destroy$)
                );
    
            mousedrag$.subscribe(() =>
            {
                if(this.delta.x === 0 && this.delta.y === 0) return;
        
                this.translate();
            });
    
            mouseup$
                .pipe(
                    takeUntil(this.destroy$)
                );
                
            mouseup$.subscribe(() =>
            {
                this.offset.x  += this.delta.x;
                this.offset.y  += this.delta.y;
                this.delta      = {x: 0, y: 0};
            });
        });
    }
  
    private translate(): void
    {
        this.target.style.transform = `translate(${this.offset.x + this.delta.x}px, ${this.offset.y + this.delta.y}px)`;
    }
}