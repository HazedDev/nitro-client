import { AfterViewInit, Component, ComponentFactoryResolver, ComponentRef, ElementRef, Input, NgZone, OnDestroy, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { Texture } from 'pixi.js';
import { IConnection } from '../../../client/core/communication/connections/IConnection';
import { EventDispatcher } from '../../../client/core/events/EventDispatcher';
import { IEventDispatcher } from '../../../client/core/events/IEventDispatcher';
import { NitroEvent } from '../../../client/core/events/NitroEvent';
import { IAvatarRenderManager } from '../../../client/nitro/avatar/IAvatarRenderManager';
import { Nitro } from '../../../client/nitro/Nitro';
import { RoomEngineObjectEvent } from '../../../client/nitro/room/events/RoomEngineObjectEvent';
import { RoomEngineTriggerWidgetEvent } from '../../../client/nitro/room/events/RoomEngineTriggerWidgetEvent';
import { IRoomEngine } from '../../../client/nitro/room/IRoomEngine';
import { RoomObjectCategory } from '../../../client/nitro/room/object/RoomObjectCategory';
import { RoomObjectOperationType } from '../../../client/nitro/room/object/RoomObjectOperationType';
import { RoomObjectVariable } from '../../../client/nitro/room/object/RoomObjectVariable';
import { RoomVariableEnum } from '../../../client/nitro/room/RoomVariableEnum';
import { RoomControllerLevel } from '../../../client/nitro/session/enum/RoomControllerLevel';
import { IRoomSession } from '../../../client/nitro/session/IRoomSession';
import { IRoomSessionManager } from '../../../client/nitro/session/IRoomSessionManager';
import { ISessionDataManager } from '../../../client/nitro/session/ISessionDataManager';
import { IRoomWidgetHandler } from '../../../client/nitro/ui/IRoomWidgetHandler';
import { IRoomWidgetHandlerContainer } from '../../../client/nitro/ui/IRoomWidgetHandlerContainer';
import { MouseEventType } from '../../../client/nitro/ui/MouseEventType';
import { RoomWidgetEnum } from '../../../client/nitro/ui/widget/enums/RoomWidgetEnum';
import { RoomWidgetUpdateEvent } from '../../../client/nitro/ui/widget/events/RoomWidgetUpdateEvent';
import { IRoomWidget } from '../../../client/nitro/ui/widget/IRoomWidget';
import { IRoomWidgetMessageListener } from '../../../client/nitro/ui/widget/IRoomWidgetMessageListener';
import { RoomWidgetMessage } from '../../../client/nitro/ui/widget/messages/RoomWidgetMessage';
import { IRoomObject } from '../../../client/room/object/IRoomObject';
import { ColorConverter } from '../../../client/room/utils/ColorConverter';
import { RoomGeometry } from '../../../client/room/utils/RoomGeometry';
import { Vector3D } from '../../../client/room/utils/Vector3D';
import { RoomWidgetRoomObjectUpdateEvent } from './widgets/events/RoomWidgetRoomObjectUpdateEvent';
import { RoomWidgetRoomViewUpdateEvent } from './widgets/events/RoomWidgetRoomViewUpdateEvent';
import { AvatarInfoWidgetHandler } from './widgets/handlers/AvatarInfoWidgetHandler';
import { ChatInputWidgetHandler } from './widgets/handlers/ChatInputWidgetHandler';
import { ChatWidgetHandler } from './widgets/handlers/ChatWidgetHandler';
import { InfoStandWidgetHandler } from './widgets/handlers/InfoStandWidgetHandler';
import { ObjectLocationRequestHandler } from './widgets/handlers/ObjectLocationRequestHandler';

@Component({
	selector: 'nitro-room-component',
    template: `
    <div #roomView class="nitro-room-component">
        <div #roomCanvas class="room-view"></div>
        <ng-template #widgetContainer></ng-template>
    </div>`
})
export class RoomComponent implements OnInit, OnDestroy, AfterViewInit, IRoomWidgetHandlerContainer, IRoomWidgetMessageListener
{
    public static ROOM_VIEW_READY: string = 'RC_ROOM_VIEW_READY';
    
    @Input()
    public roomSession: IRoomSession;

    @Input()
    public connection: IConnection;

    @Input()
    public roomEngine: IRoomEngine;

    @Input()
    public avatarRenderManager: IAvatarRenderManager;

    @Input()
    public sessionDataManager: ISessionDataManager;

    @Input()
    public roomSessionManager: IRoomSessionManager;

    @ViewChild('widgetContainer', { read: ViewContainerRef })
    public widgetContainer: ViewContainerRef;

    @ViewChild('roomCanvas')
    public roomCanvasReference: ElementRef<HTMLDivElement>;
    
    @ViewChild('roomView')
	public roomViewReference: ElementRef<HTMLDivElement>;

    public events: IEventDispatcher             = new EventDispatcher();
    public roomCanvasWrapper: HTMLCanvasElement = null;
    public canvasIds: number[]                  = [];
    public didViewInit: boolean                 = false;

    public widgets: Map<string, ComponentRef<IRoomWidget>>              = new Map();
    public widgetHandlerMessageMap: Map<string, IRoomWidgetHandler[]>   = new Map();
    public widgetHandlerEventMap: Map<string, IRoomWidgetHandler[]>     = new Map();

    public resizeTimer: any 				    = null;
    public didMouseMove: boolean			    = false;
    public lastClick: number        		    = 0;
	public clickCount: number       		    = 0;

    public roomBackground: PIXI.Sprite          = null;
    public roomBackgroundColor: number          = 0;

    constructor(
        private ngZone: NgZone,
        private componentFactoryResolver: ComponentFactoryResolver) {}

    public ngOnInit(): void
    {
        if(this.roomSession) this.roomSessionManager.startSession(this.roomSession);
    }

	public ngAfterViewInit(): void
	{
        this.didViewInit = true;

        this.insertRoomView();
    }
    
    public ngOnDestroy(): void
    {
        if(this.resizeTimer)
        {
            clearTimeout(this.resizeTimer);

            this.resizeTimer = null;
        }

        if(this.widgets)
        {
            for(let widget of this.widgets.values())
            {
                if(!widget) continue;

                widget.instance && widget.instance.dispose();
            }

            this.widgets = null;
        }
    }

    public update(): void
    {
        for(let widget of this.widgets.values()) widget.instance.widgetHandler && widget.instance.widgetHandler.update();
    }

	public prepareCanvas(canvasId: number): void
    {
        if(!this.roomSession || (this.canvasIds.indexOf(canvasId) >= 0)) return;

        const width     = window.innerWidth;
        const height    = window.innerHeight;
        const scale     = RoomGeometry.SCALE_ZOOMED_IN;

        const displayObject = this.roomEngine.getRoomInstanceDisplay(this.roomSession.roomId, canvasId, width, height, scale);

        if(!displayObject) return;

        const geometry = (this.roomEngine.getRoomInstanceGeometry(this.roomSession.roomId, canvasId) as RoomGeometry);

        if(geometry)
        {
            let minX = (this.roomEngine.getRoomInstanceVariable<number>(this.roomSession.roomId, RoomVariableEnum.ROOM_MIN_X) || 0);
            let maxX = (this.roomEngine.getRoomInstanceVariable<number>(this.roomSession.roomId, RoomVariableEnum.ROOM_MAX_X) || 0);
            let minY = (this.roomEngine.getRoomInstanceVariable<number>(this.roomSession.roomId, RoomVariableEnum.ROOM_MIN_Y) || 0);
            let maxY = (this.roomEngine.getRoomInstanceVariable<number>(this.roomSession.roomId, RoomVariableEnum.ROOM_MAX_Y) || 0);

            let x = ((minX + maxX) / 2);
            let y = ((minY + maxY) / 2);

            let offset = 20;

            x = (x + (offset - 1));
            y = (y + (offset - 1));

            let z = (Math.sqrt(((offset * offset) + (offset * offset))) * Math.tan(((30 / 180) * Math.PI)));

            geometry.location = new Vector3D(x, y, z);
        }

        const stage = Nitro.instance.stage;

        if(!stage) return;

        stage.addChild(displayObject);
        
        if(!this.roomCanvasWrapper)
        {
            this.roomCanvasWrapper = Nitro.instance.renderer.view;

            this.roomCanvasWrapper.onclick         = this.onMouseEvent.bind(this);
            this.roomCanvasWrapper.onmousemove     = this.onMouseEvent.bind(this);
            this.roomCanvasWrapper.onmousedown     = this.onMouseEvent.bind(this);
            this.roomCanvasWrapper.onmouseup       = this.onMouseEvent.bind(this);
    
            window.onresize = this.onWindowResizeEvent.bind(this);

            this.insertRoomView();
        }

        this.canvasIds.push(canvasId);
    }
    
    private insertRoomView(): void
    {
        if(!this.didViewInit) return;

        if(this.roomCanvasReference && this.roomCanvasReference.nativeElement)
        {
			this.roomCanvasReference.nativeElement.innerHTML = '';

			if(this.roomCanvasWrapper) this.roomCanvasReference.nativeElement.appendChild(this.roomCanvasWrapper);
        }

        this.events.dispatchEvent(new NitroEvent(RoomComponent.ROOM_VIEW_READY));
    }
	
	private onWindowResizeEvent(event: UIEvent): void
    {
        if(!event || !this.roomSession) return;

        if(this.resizeTimer) clearTimeout(this.resizeTimer);

        this.resizeTimer = setTimeout(() =>
        {
            this.roomEngine.initializeRoomInstanceRenderingCanvas(this.roomSession.roomId, this.canvasIds[0], Nitro.instance.renderer.view.width, Nitro.instance.renderer.view.height);

            this.events.dispatchEvent(new RoomWidgetRoomViewUpdateEvent(RoomWidgetRoomViewUpdateEvent.SIZE_CHANGED, this.getRoomViewRect()));

            this.setBackground(this.getRoomBackground());
        }, 1);
	}
	
	private onMouseEvent(event: MouseEvent): void
    {
		if(!event || !this.roomSession) return;
        
        const x = event.clientX;
        const y = event.clientY;

        let eventType = event.type;

        if(eventType === MouseEventType.MOUSE_CLICK)
        {
            if(this.lastClick)
            {
                this.clickCount = 1;
                    
                if(this.lastClick >= Date.now() - 300) this.clickCount++;
            }

            this.lastClick = Date.now();

            if(this.clickCount === 2)
            {
                if(!this.didMouseMove) eventType = MouseEventType.DOUBLE_CLICK;

                this.clickCount    = 0;
                this.lastClick     = null;
            }
        }

        switch(eventType)
        {
            case MouseEventType.MOUSE_CLICK:
                break;
            case MouseEventType.DOUBLE_CLICK:
                break;
            case MouseEventType.MOUSE_MOVE:
                this.didMouseMove = true;
                break;
            case MouseEventType.MOUSE_DOWN:
                this.didMouseMove = false;
                break;
            case MouseEventType.MOUSE_UP:
                break;
            default: return;
        }
        
        let ctrlKey = (event.ctrlKey || event.metaKey);

        this.roomEngine.setActiveRoomId(this.roomSession.roomId);
        this.roomEngine.dispatchMouseEvent(this.canvasIds[0], x, y, eventType, event.altKey, ctrlKey, event.shiftKey, false);
    }

    public createWidget(type: string, component: Type<IRoomWidget>): void
    {
        const existing = this.widgets.get(type);

        if(existing) return;

        let widgetHandler: IRoomWidgetHandler = null;

        let sendSizeUpdate = false;

        switch(type)
        {
            case RoomWidgetEnum.CHAT_WIDGET:
                sendSizeUpdate = true;

                const handler = new ChatWidgetHandler();
                handler.connection = Nitro.instance.communication.connection;

                widgetHandler = handler;
                break;
            case RoomWidgetEnum.CHAT_INPUT_WIDGET:
                sendSizeUpdate = true;
                widgetHandler = new ChatInputWidgetHandler();
                break;
            case RoomWidgetEnum.AVATAR_INFO:
                widgetHandler = new AvatarInfoWidgetHandler();
                break;
            case RoomWidgetEnum.INFOSTAND:
                widgetHandler = new InfoStandWidgetHandler();
                break;
            case RoomWidgetEnum.LOCATION_WIDGET:
                widgetHandler = new ObjectLocationRequestHandler();
                break;
            // case RoomWidgetEnum.FURNI_TROPHY_WIDGET:
            //     widgetHandler = new FurnitureTrophyWidgetHandler();
            //     break;
        }

        if(widgetHandler)
        {
            widgetHandler.container = this;

            const messageTypes = widgetHandler.messageTypes;

            if(messageTypes && messageTypes.length)
            {
                for(let name of messageTypes)
                {
                    if(!name) continue;

                    let messages = this.widgetHandlerMessageMap.get(name);

                    if(!messages)
                    {
                        messages = [];

                        this.widgetHandlerMessageMap.set(name, messages);
                    }

                    messages.push(widgetHandler);
                }
            }

            const eventTypes = widgetHandler.eventTypes;

            eventTypes.push(RoomEngineTriggerWidgetEvent.OPEN_WIDGET, RoomEngineTriggerWidgetEvent.CLOSE_WIDGET);

            if(eventTypes && eventTypes.length)
            {
                for(let name of eventTypes)
                {
                    if(!name) continue;

                    let events = this.widgetHandlerEventMap.get(name);

                    if(!events)
                    {
                        events = [];

                        this.widgetHandlerEventMap.set(name, events);
                    }

                    events.push(widgetHandler);
                }
            }
        }

        if(!component) return;

        let widgetRef: ComponentRef<IRoomWidget>    = null;
        let widget: IRoomWidget                     = null;

        this.ngZone.run(() =>
        {
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);

            widgetRef   = this.widgetContainer.createComponent(componentFactory);
            widget      = (widgetRef.instance as IRoomWidget);
        });

        if(!widget) return;

        widget.widgetHandler    = widgetHandler;
        widget.messageListener  = this;

        widget.registerUpdateEvents(this.events);

        this.widgets.set(type, widgetRef);

        if(sendSizeUpdate) this.events.dispatchEvent(new RoomWidgetRoomViewUpdateEvent(RoomWidgetRoomViewUpdateEvent.SIZE_CHANGED, this.getRoomViewRect()));
    }

    public processEvent(event: NitroEvent): void
    {
        if(!event || !this.widgetHandlerEventMap) return;

        const events = this.widgetHandlerEventMap.get(event.type);

        if(!events) return;

        let dispatchEvent = false;

        for(let existing of events)
        {
            if(!existing) continue;

            dispatchEvent = true;

            if((event.type === RoomEngineTriggerWidgetEvent.OPEN_WIDGET) || (event.type === RoomEngineTriggerWidgetEvent.CLOSE_WIDGET))
            {
                if(event instanceof RoomEngineTriggerWidgetEvent)
                {
                    dispatchEvent = (existing.type === event.widget);
                }
            }

            if(dispatchEvent) existing.processEvent(event);
        }
    }

    public processWidgetMessage(message: RoomWidgetMessage): RoomWidgetUpdateEvent
    {
        if(!message || !message.type) return null;

        const handlers = this.widgetHandlerMessageMap.get(message.type);

        if(!handlers || !handlers.length) return null;

        for(let handler of handlers)
        {
            if(!handler) continue;

            const update = handler.processWidgetMessage(message);

            if(!update) continue;

            return update;
        }

        return null;
    }

    public onRoomEngineObjectEvent(event: RoomEngineObjectEvent): void
    {
        if(!event) return;

        const objectId  = event.objectId;
        const category  = event.category;

        let updateEvent: RoomWidgetRoomObjectUpdateEvent = null;

        switch(event.type)
        {
            case RoomEngineObjectEvent.SELECTED:
                if(!this.isFurnitureSelectionDisabled(event)) updateEvent = new RoomWidgetRoomObjectUpdateEvent(RoomWidgetRoomObjectUpdateEvent.OBJECT_SELECTED, objectId, category, event.roomId);
                break;
            case RoomEngineObjectEvent.DESELECTED:
                updateEvent = new RoomWidgetRoomObjectUpdateEvent(RoomWidgetRoomObjectUpdateEvent.OBJECT_DESELECTED, objectId, category, event.roomId);
                break;
            case RoomEngineObjectEvent.ADDED:
                let addedEventType: string = null;

                switch(category)
                {
                    case RoomObjectCategory.FLOOR:
                    case RoomObjectCategory.WALL:
                        addedEventType = RoomWidgetRoomObjectUpdateEvent.FURNI_ADDED;
                        break;
                    case RoomObjectCategory.UNIT:
                        addedEventType = RoomWidgetRoomObjectUpdateEvent.USER_ADDED;
                        break;
                }

                if(addedEventType) updateEvent = new RoomWidgetRoomObjectUpdateEvent(addedEventType, objectId, category, event.roomId);
                break;
            case RoomEngineObjectEvent.REMOVED:
                let removedEventType: string = null;

                switch(category)
                {
                    case RoomObjectCategory.FLOOR:
                    case RoomObjectCategory.WALL:
                        removedEventType = RoomWidgetRoomObjectUpdateEvent.FURNI_REMOVED;
                        break;
                    case RoomObjectCategory.UNIT:
                        removedEventType = RoomWidgetRoomObjectUpdateEvent.USER_REMOVED;
                        break;
                }
                
                if(removedEventType) updateEvent = new RoomWidgetRoomObjectUpdateEvent(removedEventType, objectId, category, event.roomId);
                break;
            case RoomEngineObjectEvent.MOUSE_ENTER:
                updateEvent = new RoomWidgetRoomObjectUpdateEvent(RoomWidgetRoomObjectUpdateEvent.OBJECT_ROLL_OVER, objectId, category, event.roomId);
                break;
            case RoomEngineObjectEvent.MOUSE_LEAVE:
                updateEvent = new RoomWidgetRoomObjectUpdateEvent(RoomWidgetRoomObjectUpdateEvent.OBJECT_ROLL_OUT, objectId, category, event.roomId);
                break;
            case RoomEngineObjectEvent.REQUEST_MOVE:
                if(this.checkFurniManipulationRights(event.roomId, objectId, category))
                {
                    this.roomEngine.processRoomObjectOperation(objectId, category, RoomObjectOperationType.OBJECT_MOVE);
                }
                break;
            case RoomEngineObjectEvent.REQUEST_ROTATE:
                if(this.checkFurniManipulationRights(event.roomId, objectId, category))
                {
                    this.roomEngine.processRoomObjectOperation(objectId, category, RoomObjectOperationType.OBJECT_ROTATE_POSITIVE);
                }
                break;
        }

        if(updateEvent) this.events.dispatchEvent(updateEvent);
    }

    private isFurnitureSelectionDisabled(k: RoomEngineObjectEvent): boolean
    {
        let result = false;

        const roomObject = this.roomEngine.getRoomObject(k.roomId, k.objectId, k.category);

        if(roomObject)
        {
            //@ts-ignore
            const selectionDisabled = (roomObject.model.getValue<number>(RoomObjectVariable.FURNITURE_SELECTION_DISABLED) === 1);

            if(selectionDisabled)
            {
                result = true;

                if(this.sessionDataManager.isModerator) result = false;
            }
        }

        return result;
    }

    public checkFurniManipulationRights(roomId: number, objectId: number, category: number): boolean
    {
        return ((this.roomSession.controllerLevel >= RoomControllerLevel.GUEST) || (this.sessionDataManager.isModerator)) || (this.isOwnerOfFurniture(this.roomEngine.getRoomObject(roomId, objectId, category)));
    }

    public isOwnerOfFurniture(roomObject: IRoomObject): boolean
    {
        if(!roomObject || !roomObject.model) return false;

        const userId        = this.sessionDataManager.userId;
        const objectOwnerId = roomObject.model.getValue<number>(RoomObjectVariable.FURNITURE_OWNER_ID);

        return (userId === objectOwnerId);
    }

    private getRoomBackground(): PIXI.Sprite
    {
        if(this.roomBackground) return this.roomBackground;

        const canvas = this.roomEngine.getRoomInstanceRenderingCanvas(this.roomSession.roomId, this.canvasIds[0]);

        if(!canvas) return null;

        const displayObject = canvas.displayObject as PIXI.Container;

        const background = new PIXI.Sprite(Texture.WHITE);

        displayObject.addChildAt(background, 0);

        this.roomBackground = background;

        return this.roomBackground;
    }

    public setBackgroundColor(hue: number, saturation: number, lightness: number): void
    {
        this.roomBackgroundColor = ColorConverter._Str_13949(((((hue & 0xFF) << 16) + ((saturation & 0xFF) << 8)) + (lightness & 0xFF)));

        const background = this.getRoomBackground();

        if(!background) return;

        if(!hue || !saturation || !lightness)
        {
            background.visible = false;
        }
        else
        {
            background.visible = true;

            this.setBackground(background);
        }
    }

    private setBackground(sprite: PIXI.Sprite): void
    {
        if(!sprite) return;

        sprite.tint     = this.roomBackgroundColor;
        sprite.width    = window.innerWidth;
        sprite.height   = window.innerHeight;
    }

    public getFirstCanvasId(): number
    {
        if(this.canvasIds && (this.canvasIds.length > 0)) return this.canvasIds[0];

        return 0;
    }

    public getRoomViewRect(): PIXI.Rectangle
    {
        const bounds = ((this.roomViewReference && this.roomViewReference.nativeElement && this.roomViewReference.nativeElement.getBoundingClientRect()) || null);

        return new PIXI.Rectangle((Math.round(bounds.x) || 0), (Math.round(bounds.y) || 0), (Math.round(bounds.width) || 0), (Math.round(bounds.height)|| 0));
    }
}