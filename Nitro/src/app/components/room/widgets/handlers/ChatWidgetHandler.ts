import { IConnection } from '../../../../../client/core/communication/connections/IConnection';
import { NitroEvent } from '../../../../../client/core/events/NitroEvent';
import { AvatarFigurePartType } from '../../../../../client/nitro/avatar/enum/AvatarFigurePartType';
import { AvatarScaleType } from '../../../../../client/nitro/avatar/enum/AvatarScaleType';
import { AvatarSetType } from '../../../../../client/nitro/avatar/enum/AvatarSetType';
import { IAvatarImageListener } from '../../../../../client/nitro/avatar/IAvatarImageListener';
import { PetFigureData } from '../../../../../client/nitro/avatar/pets/PetFigureData';
import { Nitro } from '../../../../../client/nitro/Nitro';
import { RoomEngineEvent } from '../../../../../client/nitro/room/events/RoomEngineEvent';
import { RoomObjectCategory } from '../../../../../client/nitro/room/object/RoomObjectCategory';
import { RoomObjectType } from '../../../../../client/nitro/room/object/RoomObjectType';
import { RoomObjectVariable } from '../../../../../client/nitro/room/object/RoomObjectVariable';
import { RoomSessionChatEvent } from '../../../../../client/nitro/session/events/RoomSessionChatEvent';
import { IRoomWidgetHandler } from '../../../../../client/nitro/ui/IRoomWidgetHandler';
import { IRoomWidgetHandlerContainer } from '../../../../../client/nitro/ui/IRoomWidgetHandlerContainer';
import { RoomWidgetEnum } from '../../../../../client/nitro/ui/widget/enums/RoomWidgetEnum';
import { SystemChatStyleEnum } from '../../../../../client/nitro/ui/widget/enums/SystemChatStyleEnum';
import { RoomWidgetUpdateEvent } from '../../../../../client/nitro/ui/widget/events/RoomWidgetUpdateEvent';
import { RoomWidgetMessage } from '../../../../../client/nitro/ui/widget/messages/RoomWidgetMessage';
import { PointMath } from '../../../../../client/room/utils/PointMath';
import { Vector3D } from '../../../../../client/room/utils/Vector3D';
import { RoomWidgetChatUpdateEvent } from '../events/RoomWidgetChatUpdateEvent';
import { RoomWidgetRoomViewUpdateEvent } from '../events/RoomWidgetRoomViewUpdateEvent';
import { RoomChatComponent } from '../roomchat/component';

export class ChatWidgetHandler implements IRoomWidgetHandler, IAvatarImageListener
{
    private _container: IRoomWidgetHandlerContainer;
    private _widget: RoomChatComponent;

    private _connection: IConnection;

    private _avatarColorCache: Map<string, number>;
    private _avatarImageCache: Map<string, HTMLImageElement>;
    private _petImageCache: Map<string, HTMLImageElement>;
    private _primaryCanvasScale: number;
    private _primaryCanvasOriginPos: PIXI.Point;
    private _tempScreenPosVector: Vector3D;

    private _disposed: boolean;

    constructor()
    {
        this._container                 = null;
        this._widget                    = null;

        this._connection                = null;

        this._avatarColorCache          = new Map();
        this._avatarImageCache          = new Map();
        this._petImageCache             = new Map();
        this._primaryCanvasScale        = 1;
        this._primaryCanvasOriginPos    = null;
        this._tempScreenPosVector       = new Vector3D();

        this._disposed                  = false;
    }

    public dispose(): void
    {
        if(this._disposed) return;

        this._container = null;
        this._widget    = null;
        this._disposed  = true;
    }

    public update(): void
    {
        this._Str_20006();
    }

    private onRoomEngineEvent(event: RoomEngineEvent): void
    {
        switch(event.type)
        {
            case RoomEngineEvent.ROOM_ZOOMED:
                const scale = this._container.roomEngine.getRoomInstanceRenderingCanvasScale(event.roomId);

                this._primaryCanvasScale = scale;
                return;
        }
    }

    private _Str_20006(): void
    {
        if(!this._container || !this._container.roomSession || !this._container.roomEngine || !this._container.events) return;

        const canvasId  = this._container.getFirstCanvasId();
        const roomId    = this._container.roomSession.roomId;
        const geometry  = this._container.roomEngine.getRoomInstanceGeometry(roomId, canvasId);

        if(!geometry) return;

        if(!this._primaryCanvasOriginPos)
        {
            this._tempScreenPosVector.x     = 0;
            this._tempScreenPosVector.y     = 0;
            this._tempScreenPosVector.z     = 0;
            this._primaryCanvasOriginPos    = geometry.getScreenPoint(this._tempScreenPosVector);
        }

        let eventType: string               = '';
        let _local_6: RoomWidgetUpdateEvent = null;

        this._tempScreenPosVector.x = 0;
        this._tempScreenPosVector.y = 0;
        this._tempScreenPosVector.z = 0;

        const screenPoint = geometry.getScreenPoint(this._tempScreenPosVector);

        if(screenPoint)
        {
            const offset = this._container.roomEngine.getRoomInstanceRenderingCanvasOffset(roomId, canvasId);

            if(offset) screenPoint.set((screenPoint.x + offset.x), (screenPoint.y + offset.y));

            if(((!(screenPoint.x == this._primaryCanvasOriginPos.x)) || (!(screenPoint.y == this._primaryCanvasOriginPos.y))))
            {
                const _local_9 = PointMath._Str_15193(screenPoint, PointMath._Str_6038(this._primaryCanvasOriginPos, 1));

                if(((!(_local_9.x == 0)) || (!(_local_9.y == 0))))
                {
                    eventType = RoomWidgetRoomViewUpdateEvent.POSITION_CHANGED;
                    _local_6 = new RoomWidgetRoomViewUpdateEvent(eventType, null, _local_9);

                    this._container.events.dispatchEvent(_local_6);
                }

                this._primaryCanvasOriginPos = screenPoint;
            }
        }

        if(geometry.scale !== this._primaryCanvasScale)
        {
            eventType = RoomWidgetRoomViewUpdateEvent.SCALE_CHANGED;
            _local_6 = new RoomWidgetRoomViewUpdateEvent(eventType, null, null, geometry.scale);

            this._container.events.dispatchEvent(_local_6);

            this._primaryCanvasScale = geometry.scale;
        }
    }

    public processWidgetMessage(message: RoomWidgetMessage): RoomWidgetUpdateEvent
    {
        if(!message || this._disposed) return null;

        switch(message.type)
        {

        }

        return null;
    }

    public processEvent(event: NitroEvent): void
    {
        if(!event || this._disposed) return;

        switch(event.type)
        {
            case RoomSessionChatEvent.CHAT_EVENT:
                const chatEvent = (event as RoomSessionChatEvent);

                const roomObject = this._container.roomEngine.getRoomObject(chatEvent.session.roomId, chatEvent.objectId, RoomObjectCategory.UNIT);

                if(roomObject)
                {
                    const roomGeometry = this._container.roomEngine.getRoomInstanceGeometry(chatEvent.session.roomId, this._container.getFirstCanvasId());

                    if(roomGeometry)
                    {
                        this._Str_20006();
                        
                        let x   = 0;
                        let y   = 0;

                        const objectLocation    = roomObject.getLocation();
                        const screenPoint       = roomGeometry.getScreenPoint(objectLocation);

                        if(screenPoint)
                        {
                            x = screenPoint.x;
                            y = screenPoint.y;

                            const canvasOffset = this._container.roomEngine.getRoomInstanceRenderingCanvasOffset(chatEvent.session.roomId, this._container.getFirstCanvasId());

                            if(canvasOffset)
                            {
                                x += canvasOffset.x;
                                y += canvasOffset.y;
                            }
                        }

                        const userData = this._container.roomSession.userDataManager.getUserDataByIndex(chatEvent.objectId);

                        let username                = '';
                        let avatarColor             = 0;
                        let image: HTMLImageElement = null;
                        let chatType                = chatEvent.chatType;
                        let styleId                 = chatEvent.style;
                        let userType                = 0;
                        let petType                 = -1;


                        if(userData)
                        {
                            userType = userData.type;

                            const figure = userData.figure;

                            switch(userType)
                            {
                                case RoomObjectType.PET:
                                    //@ts-ignore
                                    image   = this.getPetImage(figure, 2, true, 64, roomObject.model.getValue<string>(RoomObjectVariable.FIGURE_POSTURE));
                                    petType = new PetFigureData(figure).typeId;
                                    break;
                                case RoomObjectType.USER:
                                    image = this.getUserImage(figure);
                                    break;
                                case RoomObjectType.RENTABLE_BOT:
                                case RoomObjectType.BOT:
                                    styleId = SystemChatStyleEnum.BOT;
                                    break;

                            }

                            avatarColor = this._avatarColorCache.get(figure);
                            username    = userData.name;
                        }

                        const text = chatEvent.message;

                        if(chatType === RoomSessionChatEvent._Str_8971)
                        {
                            // generic hand item
                            console.log('hand item chat');
                        }

                        if(chatType === RoomSessionChatEvent._Str_8909)
                        {
                            console.log('mute timeout chat');
                        }

                        if(((chatType === RoomSessionChatEvent._Str_6065) || (chatType === RoomSessionChatEvent._Str_5998)) || (chatType === RoomSessionChatEvent._Str_5904))
                        {
                            console.log('pet revived chat');

                            if(chatType === RoomSessionChatEvent._Str_5998)
                            {
                                console.log('pet fertilized chat');
                            }
                            else
                            {
                                if(chatType === RoomSessionChatEvent._Str_5904)
                                {
                                    console.log('pet seed fertilized chat');
                                }
                            }
                        }

                        if(this._container && this._container.events) this._container.events.dispatchEvent(new RoomWidgetChatUpdateEvent(RoomWidgetChatUpdateEvent.RWCUE_EVENT_CHAT, userData.roomIndex, text, username, RoomObjectCategory.UNIT, userType, petType, x, y, image, avatarColor, chatEvent.session.roomId, chatType, styleId, []));

                    }
                }

                return;
        }
    }

    public getUserImage(figure: string): HTMLImageElement
    {
        let existing = this._avatarImageCache.get(figure);

        if(!existing)
        {
            existing = this.setFigureImage(figure);
        }

        return existing;
    }

    private setFigureImage(figure: string): HTMLImageElement
    {
        const avatarImage = this._container.avatarRenderManager.createAvatarImage(figure, AvatarScaleType.LARGE, null, this);

        if(!avatarImage) return;
        
        const texture   = avatarImage.getImage(AvatarSetType.HEAD, false);
        const image     = Nitro.instance.renderer.extract.image(texture);
        const color     = avatarImage._Str_867(AvatarFigurePartType.CHEST);

        this._avatarColorCache.set(figure, ((color && color._Str_915) || 16777215));

        avatarImage.dispose();

        this._avatarImageCache.set(figure, image);

        return image;
    }

    private getPetImage(figure: string, direction: number, _arg_3: boolean, scale: number = 64, posture: string = null): HTMLImageElement
    {
        let existing = this._petImageCache.get((figure + posture));

        if(existing) return existing;

        const figureData   = new PetFigureData(figure);
        const typeId       = figureData.typeId;

        const image = this._container.roomEngine.getRoomObjectPetImage(typeId, figureData.paletteId, figureData.color, new Vector3D((direction * 45)), scale, null, (typeId !== 15), 0, figureData.customParts, posture);

        if(image)
        {
            existing = Nitro.instance.renderer.extract.image(image.data);

            this._petImageCache.set((figure + posture), existing);
        }

        return existing;
    }

    public resetFigure(figure: string): void
    {
        this.setFigureImage(figure);
    }

    public get type(): string
    {
        return RoomWidgetEnum.CHAT_WIDGET;
    }

    public get messageTypes(): string[]
    {
        return [ ];
    }

    public get eventTypes(): string[]
    {
        return [ RoomSessionChatEvent.CHAT_EVENT ];
    }

    public get container(): IRoomWidgetHandlerContainer
    {
        return this._container;
    }

    public set container(container: IRoomWidgetHandlerContainer)
    {
        if(container)
        {
            container.roomEngine.events.addEventListener(RoomEngineEvent.ROOM_ZOOMED, this.onRoomEngineEvent.bind(this));
        }
        else
        {
            if(this._container)
            {
                container.roomEngine.events.removeEventListener(RoomEngineEvent.ROOM_ZOOMED, this.onRoomEngineEvent.bind(this));
            }
        }

        this._container = container;
    }

    public get widget(): RoomChatComponent
    {
        return this._widget;
    }

    public set widget(widget: RoomChatComponent)
    {
        this._widget = widget;
    }

    public get connection(): IConnection
    {
        return this._connection;
    }

    public set connection(connection: IConnection)
    {
        this._connection = connection;
    }

    public get disposed(): boolean
    {
        return this._disposed;
    }
}