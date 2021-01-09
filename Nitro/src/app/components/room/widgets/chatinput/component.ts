import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, ViewChild } from '@angular/core';
import { ConversionTrackingWidget } from '../../../../../client/nitro/ui/widget/ConversionTrackingWidget';
import { SystemChatStyleEnum } from '../../../../../client/nitro/ui/widget/enums/SystemChatStyleEnum';
import { ChatInputWidgetHandler } from '../handlers/ChatInputWidgetHandler';
import { RoomWidgetChatMessage } from '../messages/RoomWidgetChatMessage';
import { RoomWidgetChatTypingMessage } from '../messages/RoomWidgetChatTypingMessage';

@Component({
	selector: 'nitro-room-chatinput-component',
    template: `
    <div class="nitro-room-chatinput-component">
        <div class="chatinput-container">
            <input #chatInputView type="text" class="chat-input" />
        </div>
        <nitro-room-chatinput-styleselector-component (styleSelected)="onStyleSelected($event)"></nitro-room-chatinput-styleselector-component>
    </div>`
})
export class RoomChatInputComponent extends ConversionTrackingWidget implements OnDestroy, AfterViewInit
{
    @ViewChild('chatInputView')
    public chatInputView: ElementRef<HTMLInputElement>;

    public selectedUsername: string     = '';
    public floodBlocked: boolean        = false;
    public lastContent: string          = '';
    public isTyping: boolean            = false;
    public typingStartedSent: boolean   = false;
    public typingTimer: any             = null;
    public idleTimer: any               = null;
    public currentStyle: number         = -1;
    public needsStyleUpdate: boolean    = false;

    constructor(
        private ngZone: NgZone
    )
    {
        super();
    }

    public ngAfterViewInit(): void
    {
        this.ngZone.runOutsideAngular(() =>
        {
            document.body.addEventListener('keydown', this.onKeyDownEvent.bind(this));

            this.inputView.addEventListener('mousedown', this.onInputMouseDownEvent.bind(this));
            this.inputView.addEventListener('input', this.onInputChangeEvent.bind(this));
        });
    }

    public ngOnDestroy(): void
    {
        this.ngZone.runOutsideAngular(() =>
        {
            document.body.removeEventListener('keydown', this.onKeyDownEvent.bind(this));

            this.inputView.removeEventListener('mousedown', this.onInputMouseDownEvent.bind(this));
            this.inputView.removeEventListener('input', this.onInputChangeEvent.bind(this));
        });
    }

    public sendChat(text: string, chatType: number, recipientName: string = '', styleId: number = 0): void
    {
        if(this.floodBlocked) return;

        this.messageListener.processWidgetMessage(new RoomWidgetChatMessage(RoomWidgetChatMessage.MESSAGE_CHAT, text, chatType, recipientName, styleId));
    }

    private onKeyDownEvent(event: KeyboardEvent): void
    {
        if(!event) return;

        if(this.anotherInputHasFocus()) return;

        this.setInputFocus();

        const key       = event.keyCode;
        const shiftKey  = event.shiftKey;

        switch(key)
        {
            case 32: // SPACE
                this.checkSpecialKeywordForInput();
                return;
            case 13: // ENTER
                this.sendChatFromInputField(shiftKey);
                return;
            case 8: // BACKSPACE
                if(this.inputView)
                {
                    const value = this.inputView.value;
                    const parts = value.split(' ');

                    if((parts[0] === ':whisper') && (parts.length === 3) && (parts[2] === ''))
                    {
                        this.inputView.value    = '';
                        this.lastContent        = '';
                    }
                }
                return;
        }
    }

    private onInputMouseDownEvent(event: MouseEvent): void
    {
        this.setInputFocus();
    }

    private onInputChangeEvent(event: InputEvent): void
    {
        const input = (event.target as HTMLInputElement);

        if(!input) return;

        const value = input.value;

        if(!value.length)
        {
            this.isTyping = false;

            this.startTypingTimer();
        }
        else
        {
            this.lastContent = value;

            if (!this.isTyping)
            {
                this.isTyping = true;

                this.startTypingTimer();
            }

            this.startIdleTimer();
        }
    }

    public onStyleSelected(styleId: number): void
    {
        if(styleId === this.currentStyle) return;

        this.currentStyle       = styleId;
        this.needsStyleUpdate   = true;
    }

    private sendChatFromInputField(shiftKey: boolean = false): void
    {
        if(!this.inputView || (this.inputView.value === '')) return;

        let chatType        = (shiftKey ? RoomWidgetChatMessage.CHAT_SHOUT : RoomWidgetChatMessage.CHAT_DEFAULT);
        let text            = this.inputView.value;
        
        const parts         = text.split(' ');

        let recipientName   = '';
        let append          = '';

        switch(parts[0])
        {
            case ':whisper':
                chatType        = RoomWidgetChatMessage.CHAT_WHISPER;
                recipientName   = parts[1];
                append          = (`:whisper ${ recipientName } `);

                parts.shift();
                parts.shift();
                break;
            case ':shout':
                chatType = RoomWidgetChatMessage.CHAT_SHOUT;

                parts.shift();
                break;
            case ':speak':
                chatType = RoomWidgetChatMessage.CHAT_DEFAULT;

                parts.shift();
                break;
        }

        text = parts.join(' ');

        let chatStyle = SystemChatStyleEnum.NORMAL;
        
        if(this.typingTimer) this.resetTypingTimer();

        if(this.idleTimer) this.resetIdleTimer();
            
        this.sendChat(text, chatType, recipientName, this.currentStyle);

        this.isTyping = false;

        if(this.typingStartedSent) this.sendTypingMessage();

        this.typingStartedSent = false;

        this.inputView.value    = append;
        this.lastContent        = append;
    }

    private sendTypingMessage(): void
    {
        if(this.floodBlocked) return;

        this.messageListener.processWidgetMessage(new RoomWidgetChatTypingMessage(this.isTyping));
    }

    private anotherInputHasFocus(): boolean
    {
        const activeElement = document.activeElement;

        if(!activeElement) return false;

        if(this.chatInputView && this.chatInputView.nativeElement && (this.chatInputView.nativeElement === activeElement)) return false;

        if(!(activeElement instanceof HTMLInputElement)) return false;

        return true;
    }

    private setInputFocus(): void
    {
        this.chatInputView && this.chatInputView.nativeElement && this.chatInputView.nativeElement.focus();
    }

    private checkSpecialKeywordForInput(): void
    {
        const inputView = ((this.chatInputView && this.chatInputView.nativeElement) || null);

        if(!inputView || (inputView.value === '')) return;

        const text              = inputView.value;
        const selectedUsername  = this.selectedUsername;

        if((text !== ':whisper') || (selectedUsername.length === 0)) return;

        inputView.value = `${ inputView.value } ${ this.selectedUsername }`;
    }

    private startIdleTimer(): void
    {
        this.resetIdleTimer();

        this.idleTimer = setTimeout(this.onIdleTimerComplete.bind(this), 10000);
    }

    private resetIdleTimer(): void
    {
        if(this.idleTimer)
        {
            clearTimeout(this.idleTimer);

            this.idleTimer = null;
        }
    }

    private onIdleTimerComplete(): void
    {
        if(this.isTyping) this.typingStartedSent = false;

        this.isTyping = false;

        this.sendTypingMessage();
    }

    private startTypingTimer(): void
    {
        this.resetTypingTimer();

        this.typingTimer = setTimeout(this.onTypingTimerComplete.bind(this), 1000);
    }

    private resetTypingTimer(): void
    {
        if(this.typingTimer)
        {
            clearTimeout(this.typingTimer);

            this.typingTimer = null;
        }
    }

    private onTypingTimerComplete(): void
    {
        if(this.isTyping) this.typingStartedSent = true;

        this.sendTypingMessage();
    }

    public get inputView(): HTMLInputElement
    {
        return ((this.chatInputView && this.chatInputView.nativeElement) || null);
    }

    public get handler(): ChatInputWidgetHandler
    {
        return (this.widgetHandler as ChatInputWidgetHandler);
    }
}