import { transition, trigger, useAnimation } from '@angular/animations';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { bounceIn } from 'ng-animate';
import { Nitro } from '../../../../../../client/nitro/Nitro';
import { HabboClubLevelEnum } from '../../../../../../client/nitro/session/HabboClubLevelEnum';
import { AppConfiguration } from '../../../../../AppConfiguration';

@Component({
	selector: 'nitro-room-chatinput-styleselector-component',
    template: `
    <div [@animation]="animation" class="nitro-room-chatinput-styleselector-component">
        <i class="icon chatstyles-icon" (click)="toggleSelector()"></i>
        <div #styleSelectorContainer class="component-styles-container" [ngClass]="{ 'active': showStyles }">
            <div class="card">
                <div class="card-body">
                    <div class="container-items">
                        <div *ngFor="let styleId of styleIds" class="item-detail">
                            <div class="nitro-room-chat-item-component chat-style-{{ styleId }}" (click)="selectStyle(styleId)">
                                <div class="chat-left"></div>
                                <div class="chat-right"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`,
    animations: [
        trigger('animation', [
            transition('* => *',
                useAnimation(bounceIn,
                {
                    params: { timing: 0.8, delay: 0 }
                })
            )
        ])
    ]
})
export class RoomChatInputStyleSelectorComponent implements OnInit, OnDestroy
{
    @ViewChild('styleSelectorContainer')
    public styleSelectorContainer: ElementRef<HTMLDivElement>;

    @Output()
    public styleSelected = new EventEmitter<number>();

    public showStyles           = false;
    public lastSelectedId       = 0;
    public styleIds: number[]   = [];

    public animation: any;

    constructor(
        private changeDetector: ChangeDetectorRef,
        private ngZone: NgZone) {}

    public ngOnInit(): void
    {
        const styles = AppConfiguration.CHAT_STYLES;

        for(let style of styles)
        {
            if(!style) continue;

            if(style.minRank > 0)
            {
                if(Nitro.instance.sessionDataManager.hasSecurity(style.minRank)) this.styleIds.push(style.styleId);

                continue;
            }

            if(style.isSystemStyle || (AppConfiguration.DISABLED_CHAT_STYLES.indexOf(style.styleId) >= 0)) continue;

            if(style.isHcOnly && (Nitro.instance.sessionDataManager.clubLevel >= HabboClubLevelEnum._Str_2964))
            {
                this.styleIds.push(style.styleId);

                continue;
            }

            if(style.isAmbassadorOnly && Nitro.instance.sessionDataManager.isAmbassador)
            {
                this.styleIds.push(style.styleId);

                continue;
            }

            if(!style.isHcOnly && !style.isAmbassadorOnly) this.styleIds.push(style.styleId);
        }
    }

    public ngOnDestroy(): void
    {
        this.hideSelector();
    }

    private onOutsideClick(event: MouseEvent): void
    {
        if(!this.showStyles) return;
        
        if(event.target === this.styleSelectorContainer.nativeElement) return;
        
        this.hideSelector();
    }

    private showSelector(): void
    {
        this.showStyles = true;

        //this.ngZone.runOutsideAngular(() => document.body.addEventListener('click', this.onOutsideClick.bind(this)));
    }

    private hideSelector(): void
    {
        this.showStyles = false;
        
        //this.ngZone.runOutsideAngular(() => document.body.removeEventListener('click', this.onOutsideClick.bind(this)));
    }

    public toggleSelector(): void
    {
        if(this.showStyles)
        {
            this.hideSelector();

            return;
        }

        this.showSelector();
    }

    public selectStyle(styleId: number): void
    {
        this.styleSelected.emit(styleId);

        this.hideSelector();
    }
}