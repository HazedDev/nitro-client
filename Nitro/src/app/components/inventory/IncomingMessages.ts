import { IMessageEvent } from '../../../client/core/communication/messages/IMessageEvent';
import { INitroCommunicationManager } from '../../../client/nitro/communication/INitroCommunicationManager';
import { DesktopViewEvent } from '../../../client/nitro/communication/messages/incoming/desktop/DesktopViewEvent';
import { FurnitureListAddOrUpdateEvent } from '../../../client/nitro/communication/messages/incoming/inventory/furni/FurnitureListAddOrUpdateEvent';
import { FurnitureListEvent } from '../../../client/nitro/communication/messages/incoming/inventory/furni/FurnitureListEvent';
import { FurnitureListInvalidateEvent } from '../../../client/nitro/communication/messages/incoming/inventory/furni/FurnitureListInvalidateEvent';
import { FurnitureListRemovedEvent } from '../../../client/nitro/communication/messages/incoming/inventory/furni/FurnitureListRemovedEvent';
import { FurniturePostItPlacedEvent } from '../../../client/nitro/communication/messages/incoming/inventory/furni/FurniturePostItPlacedEvent';
import { TradingAcceptEvent } from '../../../client/nitro/communication/messages/incoming/inventory/trading/TradingAcceptEvent';
import { TradingCloseEvent } from '../../../client/nitro/communication/messages/incoming/inventory/trading/TradingCloseEvent';
import { TradingCompletedEvent } from '../../../client/nitro/communication/messages/incoming/inventory/trading/TradingCompletedEvent';
import { TradingConfirmationEvent } from '../../../client/nitro/communication/messages/incoming/inventory/trading/TradingConfirmationEvent';
import { TradingNotOpenEvent } from '../../../client/nitro/communication/messages/incoming/inventory/trading/TradingNotOpenEvent';
import { TradingOpenFailedEvent } from '../../../client/nitro/communication/messages/incoming/inventory/trading/TradingOpenFailedEvent';
import { TradingOtherNotAllowedEvent } from '../../../client/nitro/communication/messages/incoming/inventory/trading/TradingOtherNotAllowedEvent';
import { TradingYouAreNotAllowedEvent } from '../../../client/nitro/communication/messages/incoming/inventory/trading/TradingYouAreNotAllowedEvent';
import { RoomEnterEvent } from '../../../client/nitro/communication/messages/incoming/room/access/RoomEnterEvent';
import { RoomInfoOwnerEvent } from '../../../client/nitro/communication/messages/incoming/room/data/RoomInfoOwnerEvent';
import { FurnitureListItemParser } from '../../../client/nitro/communication/messages/parser/inventory/furniture/utils/FurnitureListItemParser';
import { Nitro } from '../../../client/nitro/Nitro';
import { InventoryCategory } from './enum/InventoryCategory';
import { HabboInventory } from './HabboInventory';

export class IncomingMessages
{
    private _inventory: HabboInventory;
    private _communication: INitroCommunicationManager;
    private _messages: IMessageEvent[];

    private _furniMsgFragments: Map<number, FurnitureListItemParser>[];

    constructor(inventory: HabboInventory)
    {
        this._inventory         = inventory;
        this._communication     = Nitro.instance.communication;
        this._messages          = [];

        this._furniMsgFragments  = [];

        this.registerMessages();
    }

    public dispose(): void
    {
        this.unregisterMessages();
    }

    private registerMessages(): void
    {
        if(!this._communication) return;

        this.unregisterMessages();

    //     this._com.addHabboConnectionMessageEvent(new _Str_6742(this._Str_25320, _Str_9219));
    //     this._com.addHabboConnectionMessageEvent(new _Str_8269(this._Str_24595));
    //     this._com.addHabboConnectionMessageEvent(new _Str_6821(this._Str_18656));
    //     this._com.addHabboConnectionMessageEvent(new _Str_9041(this._Str_25862));
    //     this._com.addHabboConnectionMessageEvent(new _Str_4187(this._Str_15910));
    //     this._com.addHabboConnectionMessageEvent(new _Str_9129(this._Str_23613));
    //     this._com.addHabboConnectionMessageEvent(new _Str_5147(this._Str_18002));
    //     this._com.addHabboConnectionMessageEvent(new UserBadgesEvent(this._Str_12065));
    //     this._com.addHabboConnectionMessageEvent(new _Str_5727(this._Str_16010));
    //     this._com.addHabboConnectionMessageEvent(new _Str_5714(this._Str_15910));
    //     this._com.addHabboConnectionMessageEvent(new _Str_9517(this._Str_25747));
    //     this._com.addHabboConnectionMessageEvent(new _Str_5581(this._Str_25001));
    //     this._com.addHabboConnectionMessageEvent(new AchievementsScoreEvent(this._Str_18065));
    //     this._com.addHabboConnectionMessageEvent(new _Str_9550(this._Str_23427));
    //     this._com.addHabboConnectionMessageEvent(new _Str_3492(this._Str_23143));
    //     this._com.addHabboConnectionMessageEvent(new _Str_6908(this._Str_25700));
    //     this._com.addHabboConnectionMessageEvent(new _Str_5720(this._Str_17365));
    //     this._com.addHabboConnectionMessageEvent(new _Str_5514(this._Str_16520));
    //     this._com.addHabboConnectionMessageEvent(new _Str_8892(this._Str_23929));
    //     this._com.addHabboConnectionMessageEvent(new _Str_9359(this._Str_23887));
    //     this._com.addHabboConnectionMessageEvent(new _Str_3352(this._Str_15910));
    //     this._com.addHabboConnectionMessageEvent(new _Str_7375(this._Str_22556, _Str_9589));
    //     this._com.addHabboConnectionMessageEvent(new UserRightsMessageEvent(this._Str_4297));
    //     this._com.addHabboConnectionMessageEvent(new _Str_8120(this._Str_23620));
    //     this._com.addHabboConnectionMessageEvent(new _Str_5946(this._Str_16617));
    //     this._com.addHabboConnectionMessageEvent(new _Str_6450(this._Str_21372));
    //     this._com.addHabboConnectionMessageEvent(new _Str_9259(this._Str_24135));
    //     this._com.addHabboConnectionMessageEvent(new FurniListAddOrUpdateEvent(this._Str_23121));
    //     this._com.addHabboConnectionMessageEvent(new _Str_6022(this._Str_16181));
    //     this._com.addHabboConnectionMessageEvent(new _Str_3660(this._Str_25294));
    //     this._com.addHabboConnectionMessageEvent(new _Str_8524(this._Str_25173));
    //     this._com.addHabboConnectionMessageEvent(new _Str_5345(this._Str_17996));
    //     this._com.addHabboConnectionMessageEvent(new _Str_2752(this._Str_3012));
    //     this._com.addHabboConnectionMessageEvent(new _Str_6944(this._Str_18461));
    //     this._com.addHabboConnectionMessageEvent(new _Str_9047(this._Str_22306));
    //     this._com.addHabboConnectionMessageEvent(new _Str_8980(this._Str_25648));

        this._messages = [
            new RoomInfoOwnerEvent(this.onRoomInfoOwnerEvent.bind(this)),
            new DesktopViewEvent(this.triggerLeaveRoom.bind(this)),
            new RoomEnterEvent(this.triggerLeaveRoom.bind(this)),
            new FurnitureListAddOrUpdateEvent(this.onFurnitureListAddOrUpdateEvent.bind(this)),
            new FurnitureListEvent(this.onFurnitureListEvent.bind(this)),
            new FurnitureListInvalidateEvent(this.onFurnitureListInvalidateEvent.bind(this)),
            new FurnitureListRemovedEvent(this.onFurnitureListRemovedEvent.bind(this)),
            new FurniturePostItPlacedEvent(this.onFurniturePostItPlacedEvent.bind(this)),

            new TradingAcceptEvent(this.onTradingAcceptEvent.bind(this)),
            new TradingCloseEvent(this.onTradingCloseEvent.bind(this)),
            new TradingCompletedEvent(this.onTradingCompletedEvent.bind(this)),
            new TradingConfirmationEvent(this.onTradingConfirmationEvent.bind(this)),
            new TradingNotOpenEvent(this.onTradingNotOpenEvent.bind(this)),
            new TradingOpenFailedEvent(this.onTradingOpenFailedEvent.bind(this)),
            new TradingOtherNotAllowedEvent(this.onTradingOtherNotAllowedEvent.bind(this)),
            new TradingYouAreNotAllowedEvent(this.onTradingYouAreNotAllowedEvent.bind(this)),

        ];

        for(let message of this._messages) this._communication.registerMessageEvent(message);
    }

    private unregisterMessages(): void
    {
        if(!this._communication) return;

        for(let message of this._messages) this._communication.removeMessageEvent(message);
    }

    private onRoomInfoOwnerEvent(event: RoomInfoOwnerEvent): void
    {
        if(!event) return;

        this._inventory.isInRoom = true;
    }

    private triggerLeaveRoom(event: IMessageEvent): void
    {
        if(!event) return;

        this._inventory.isInRoom = false;
    }

    private onFurnitureListAddOrUpdateEvent(event: FurnitureListAddOrUpdateEvent): void
    {
        if(!event) return;

        const parser = event.getParser();

        if(!parser) return;

        console.log(parser);
    }

    private onFurnitureListEvent(event: FurnitureListEvent): void
    {
        if(!event) return;

        const parser = event.getParser();

        if(!parser) return;

        if(!this._furniMsgFragments) this._furniMsgFragments = new Array(parser.totalFragments);

        const map       = new Map([ ...parser.fragment ]);
        const merged    = this.mergeFragments(map, parser.totalFragments, parser.fragmentNumber, this._furniMsgFragments);

        if(!merged) return;

        const model = this._inventory.furniModel;

        if(model) model._Str_24428(merged);

        this._furniMsgFragments = null;
    }

    private onFurnitureListInvalidateEvent(event: FurnitureListInvalidateEvent): void
    {
        if(!event) return;

        const parser = event.getParser();

        if(!parser) return;

        this._inventory._Str_5943(InventoryCategory.FURNI, false);
    }

    private onFurnitureListRemovedEvent(event: FurnitureListRemovedEvent): void
    {
        if(!event) return;

        const parser = event.getParser();

        if(!parser) return;

        const itemId = parser.itemId;

        const model = this._inventory.furniModel;

        if(model)
        {
            const groupItem = model.removeItemById(itemId);

            if(groupItem)
            {
                //model._Str_4409();
            }
        }
    }

    private onFurniturePostItPlacedEvent(event: FurnitureListAddOrUpdateEvent): void
    {
        if(!event) return;

        const parser = event.getParser();

        if(!parser) return;

        console.log(parser);
    }

    private onTradingAcceptEvent(event: TradingAcceptEvent): void
    {

    }

    private onTradingCloseEvent(evenet: TradingCloseEvent): void
    {

    }

    private onTradingCompletedEvent(event: TradingCompletedEvent): void
    {

    }

    private onTradingConfirmationEvent(event: TradingConfirmationEvent): void
    {

    }

    private onTradingNotOpenEvent(event: TradingNotOpenEvent): void
    {

    }

    private onTradingOpenFailedEvent(event: TradingOpenFailedEvent): void
    {

    }

    private onTradingOtherNotAllowedEvent(event: TradingOtherNotAllowedEvent): void
    {

    }

    private onTradingYouAreNotAllowedEvent(event: TradingYouAreNotAllowedEvent): void
    {
        
    }

    private mergeFragments(fragment: Map<number, FurnitureListItemParser>, totalFragments: number, fragmentNumber: number, fragments: Map<number, FurnitureListItemParser>[]): Map<number, FurnitureListItemParser>
    {
        if(totalFragments === 1) return fragment;

        fragments[fragmentNumber] = fragment;

        for(let frag of fragments)
        {
            if(!frag) return null;
        }

        const mergedFragment: Map<number, FurnitureListItemParser> = new Map();

        for(let frag of fragments)
        {
            for(let [ key, value ] of frag) mergedFragment.set(key, value);

            frag.clear();
        }

        fragments = null;

        return mergedFragment;
    }
}