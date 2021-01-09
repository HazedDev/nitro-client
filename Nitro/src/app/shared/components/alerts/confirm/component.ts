import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { zoomIn } from 'ng-animate';
import { Toast, ToastPackage, ToastrService } from 'ngx-toastr';
  
@Component({
    selector: '[nitro-toast-confirm-component]',
    template: `
    <div [@zoomIn]="zoomIn" class="card nitro-alert nitro-toast-confirm-component" [draggable] dragHandle=".card-header" [style.display]="state.value === 'inactive' ? 'none' : ''">
        <div class="card-header">
            <div class="header-title">{{ title }}</div>
            <div class="header-close" (click)="remove()"><i class="fas fa-times"></i></div>
        </div>
        <div #toastContents class="card-body">
            <div *ngIf="message && options.enableHtml" [class]="options.messageClass" [innerHTML]="message"></div>
            <div *ngIf="message && !options.enableHtml" [class]="options.messageClass">{{ message }}</div>
        </div>
        <div class="card-footer">
            <div class="button-container btn-group">
                <button type="button" class="btn btn-primary" (click)="confirm()">Confirm</button>
                <button *ngIf="options.closeButton" type="button" class="btn btn-primary" (click)="remove()">Cancel</button>
            </div>
        </div>
    </div>`,
    animations: [
        trigger('zoomIn', [
            transition('* => *',
                useAnimation(zoomIn,
                {
                    params: { timing: 0.5, delay: 0 }
                })
            )
        ])
    ],
})
export class ConfirmToastComponent extends Toast
{
    @ViewChild('toastContents')
    public toastContents: ElementRef<HTMLDivElement>;

    public zoomIn: any;
    
    constructor(
        protected toastrService: ToastrService,
        public toastPackage: ToastPackage)
    {
        super(toastrService, toastPackage);
    }

    public confirm(): void
    {
        this.toastPackage.triggerAction('CONFIRM');
    }
}