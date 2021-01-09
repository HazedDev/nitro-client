import { Injectable, OnDestroy } from '@angular/core';
import { UserFigureEvent } from '../../../client/nitro/communication/messages/incoming/user/data/UserFigureEvent';
import { UserInfoEvent } from '../../../client/nitro/communication/messages/incoming/user/data/UserInfoEvent';
import { Nitro } from '../../../client/nitro/Nitro';

@Injectable()
export class SessionService implements OnDestroy
{
    private _userId: number;
    private _userName: string;
    private _figure: string;
    private _gender: string;

    constructor()
    {
        this._userId    = -1;
        this._userName  = null;
        this._figure    = null;
        this._gender    = null;

        Nitro.instance.communication.registerMessageEvent(new UserInfoEvent(this.onUserInfoEvent.bind(this)));
        Nitro.instance.communication.registerMessageEvent(new UserFigureEvent(this.onUserFigureEvent.bind(this)));
    }

    public ngOnDestroy(): void
    {
        Nitro.instance.communication.removeMessageEvent(new UserInfoEvent(this.onUserInfoEvent.bind(this)));
        Nitro.instance.communication.removeMessageEvent(new UserFigureEvent(this.onUserFigureEvent.bind(this)));
    }

    private onUserInfoEvent(event: UserInfoEvent): void
    {
        if(!event) return;

        const parser = event.getParser();

        if(!parser) return;

        const userInfo = parser.userInfo;
        
        this._userId    = userInfo.userId;
        this._userName  = userInfo.username;
        this._figure    = userInfo.figure;
        this._gender    = userInfo.gender;
    }

    private onUserFigureEvent(event: UserFigureEvent): void
    {
        if(!event) return;

        const parser = event.getParser();

        if(!parser) return;

        this._figure    = parser.figure;
        this._gender    = parser.gender;
    }

    public get userId(): number
    {
        return this._userId;
    }

    public get userName(): string
    {
        return this._userName;
    }

    public get figure(): string
    {
        return this._figure;
    }

    public get gender(): string
    {
        return this._gender;
    }
}