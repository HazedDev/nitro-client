import { transition, trigger, useAnimation } from '@angular/animations';
import { Component } from '@angular/core';
import { bounceIn } from 'ng-animate';
import { Toast, ToastPackage, ToastrService } from 'ngx-toastr';
  
@Component({
    selector: '[nitro-toast-alert-component]',
    template: `
    <div [@animation]="animation" class="card nitro-alert nitro-toast-alert-component" [draggable] dragHandle=".card-header" [style.display]="state.value === 'inactive' ? 'none' : ''">
        <div class="card-header">
            <div class="header-title">{{ title }}</div>
        </div>
        <div class="card-body">
            <div *ngIf="message && options.enableHtml" [class]="options.messageClass" [innerHTML]="message"></div>
            <div *ngIf="message && !options.enableHtml" [class]="options.messageClass">{{ message }}</div>
        </div>
        <div class="card-footer">
            <div class="button-container btn-group">
                <button *ngIf="options.closeButton" type="button" class="btn btn-primary" (click)="remove()">Close</button>
            </div>
        </div>
    </div>`,
    animations: [
        trigger('animation', [
            transition('* => *',
                useAnimation(bounceIn,
                {
                    params: { timing: 0.5, delay: 0 }
                })
            )
        ])
    ]
})
export class AlertToastComponent extends Toast
{
    public animation: any;

    constructor(
        protected toastrService: ToastrService,
        public toastPackage: ToastPackage)
    {
        super(toastrService, toastPackage);
    }
}