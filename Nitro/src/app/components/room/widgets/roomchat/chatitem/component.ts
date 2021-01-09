import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { bounceIn } from 'ng-animate';
import { RoomWidgetChatUpdateEvent } from '../../events/RoomWidgetChatUpdateEvent';

@Component({
    template: `
    <div [@animation]="animation" #chatContainer class="nitro-room-chat-item-component chat-style-{{ chatStyle }} chat-type-{{ chatType }}">
        <div class="chat-left" [ngStyle]="{ 'background-color': senderColorString }">
            <div #chatItemUserImage class="user-image"></div>
            <div class="user-pointer"></div>
        </div>
        <div class="chat-right">
            <b>{{ senderName }}:</b> {{ message }}
        </div>
        <div class="chat-pointer"></div>
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
export class RoomChatItemComponent
{
    @Input()
    public id: string;

    @ViewChild('chatContainer')
    public chatContainer: ElementRef<HTMLDivElement>;

    @ViewChild('chatItemUserImage')
    public chatItemUserImageReference: ElementRef<HTMLDivElement>;

    public chatType: number;
    public chatStyle: number;
    public senderId: number;
    public senderName: string;
    public message: string;
    public messageLinks: string[];
    public timeStamp: number;
    public senderX: number;
    public senderImage: HTMLImageElement;
    public senderColor: number;
    public senderColorString: string;
    public roomId: number;
    public userType: number;
    public petType: number;
    public senderCategory: number;
    public x: number;
    public y: number;

    public animation: any;

    public update(k: RoomWidgetChatUpdateEvent): void
    {
        this.chatType           = k.chatType;
        this.chatStyle          = k.styleId;
        this.senderId           = k.userId;
        this.senderName         = k.userName;
        this.senderCategory     = k.userCategory;
        this.message            = k.text;
        this.messageLinks       = k.links;
        this.senderX            = k.userX;
        this.senderImage        = k.userImage;
        this.senderColor        = k.userColor;
        this.senderColorString  = (this.senderColor && ('#' + (this.senderColor.toString(16).padStart(6, '0'))) || null);
        this.roomId             = k.roomId;
        this.userType           = k.userType;
        this.petType            = k.petType;
    }

    public ready(): void
    {
        this.insertSenderImage();

        this.makeVisible();
    }

    public makeVisible(): void
    {
        (this.chatContainerElement && (this.chatContainerElement.style.visibility = 'visible'));
    }

    private insertSenderImage(): void
    {
        if(!this.senderImage) return;

        const imageElement  = document.createElement('img');
        const scale         = 0.5;

        imageElement.src = this.senderImage.src;

        imageElement.onload = (() =>
        {
            imageElement.height = (imageElement.height * scale);
        });

        this.chatItemUserImageReference.nativeElement.appendChild(imageElement);
    }

    public getX(): number
    {
        return this.x;
    }

    public setX(x: number): void
    {
        if(!this.chatContainerElement) return;

        this.x = x;

        this.chatContainerElement.style.left = (x + 'px');
    }

    public getY(): number
    {
        return this.y;
    }

    public setY(y: number): void
    {
        if(!this.chatContainerElement) return;

        y = y - 1;

        this.y = y;

        this.chatContainerElement.style.top = (y + 'px');
    }

    public get width(): number
    {
        return ((this.chatContainerElement && this.chatContainerElement.offsetWidth) || 0);
    }

    public get height(): number
    {
        return ((this.chatContainerElement && this.chatContainerElement.offsetHeight) || 0);
    }

    public get chatContainerElement(): HTMLDivElement
    {
        return ((this.chatContainer && this.chatContainer.nativeElement) || null);
    }

    public get chatUserImageElement(): HTMLDivElement
    {
        return ((this.chatItemUserImageReference && this.chatItemUserImageReference.nativeElement) || null);
    }
}