import { Injectable, NgZone, OnDestroy, Type } from '@angular/core';
import { ActiveToast, GlobalConfig, ToastrService } from 'ngx-toastr';
import { IMessageEvent } from '../../../../client/core/communication/messages/IMessageEvent';
import { GenericAlertEvent } from '../../../../client/nitro/communication/messages/incoming/generic/GenericAlertEvent';
import { GenericAlertLinkEvent } from '../../../../client/nitro/communication/messages/incoming/generic/GenericAlertLinkEvent';
import { Nitro } from '../../../../client/nitro/Nitro';
import { AlertToastComponent } from '../../components/alerts/alert/component';

@Injectable()
export class AlertService implements OnDestroy
{
    private _messages: IMessageEvent[];

    constructor(
        private toastrService: ToastrService,
        private ngZone: NgZone)
    {
        this.registerMessages();
    }

    public ngOnDestroy(): void
    {
        this.unregisterMessages();
    }

    private registerMessages(): void
    {
        if(this._messages) this.unregisterMessages();

        this._messages = [
            new GenericAlertEvent(this.onGenericAlertEvent.bind(this)),
            new GenericAlertLinkEvent(this.onGenericAlertLinkEvent.bind(this))
        ];

        for(let message of this._messages) Nitro.instance.communication.registerMessageEvent(message);
    }

    private unregisterMessages(): void
    {
        if(this._messages && this._messages.length)
        {
            for(let message of this._messages) Nitro.instance.communication.removeMessageEvent(message);
        }
    }

    private onGenericAlertEvent(event: GenericAlertEvent): void
    {
        if(!event) return;

        const parser = event.getParser();

        this.alert(parser.message);
    }

    private onGenericAlertLinkEvent(event: GenericAlertLinkEvent): void
    {
        if(!event) return;

        const parser = event.getParser();

        this.alert(parser.message);
    }

    public alert(template: string): void
    {
        this.ngZone.run(() =>
        {
            const config = this.alertConfig();

            if(!config) return;

            config.positionClass = 'toast-hotel-alert';

            this.createToast(AlertToastComponent, template, this.getTitle(), config);
        });
    }

    public clearToast(toastId: number): void
    {
        this.toastrService.clear(toastId);
    }

    public createToast<T>(component: Type<T>, template: string, title: string = null, options: GlobalConfig = null): ActiveToast<T>
    {
        //@ts-ignore
        if(!options) options = {};

        options.toastComponent = component;

        return (this.toastrService.show(template, title, options) as ActiveToast<T>);
    }

    private getTitle(): string
    {
        return 'Nitro Alert';
    }

    public alertConfig(): GlobalConfig
    {
        //@ts-ignore
        const options: GlobalConfig = {};

        options.toastClass      = '';
        options.positionClass   = 'toast-center-center';
        options.enableHtml      = true;
        options.disableTimeOut  = true;
        options.closeButton     = true;
        options.tapToDismiss    = false;

        return Object.assign({}, options);
    }
}