import { IMessageConfiguration } from '../../core/communication/messages/IMessageConfiguration';
import { AvailabilityStatusMessageEvent } from './messages/incoming/availability/AvailabilityStatusMessageEvent';
import { CatalogClubEvent } from './messages/incoming/catalog/CatalogClubEvent';
import { CatalogModeEvent } from './messages/incoming/catalog/CatalogModeEvent';
import { CatalogPageEvent } from './messages/incoming/catalog/CatalogPageEvent';
import { CatalogPagesEvent } from './messages/incoming/catalog/CatalogPagesEvent';
import { CatalogPurchaseEvent } from './messages/incoming/catalog/CatalogPurchaseEvent';
import { CatalogPurchaseFailedEvent } from './messages/incoming/catalog/CatalogPurchaseFailedEvent';
import { CatalogPurchaseUnavailableEvent } from './messages/incoming/catalog/CatalogPurchaseUnavailableEvent';
import { CatalogSearchEvent } from './messages/incoming/catalog/CatalogSearchEvent';
import { CatalogSoldOutEvent } from './messages/incoming/catalog/CatalogSoldOutEvent';
import { CatalogUpdatedEvent } from './messages/incoming/catalog/CatalogUpdatedEvent';
import { ClientPingEvent } from './messages/incoming/client/ClientPingEvent';
import { DesktopViewEvent } from './messages/incoming/desktop/DesktopViewEvent';
import { GenericAlertEvent } from './messages/incoming/generic/GenericAlertEvent';
import { GenericAlertLinkEvent } from './messages/incoming/generic/GenericAlertLinkEvent';
import { IncomingHeader } from './messages/incoming/IncomingHeader';
import { FurnitureListAddOrUpdateEvent } from './messages/incoming/inventory/furni/FurnitureListAddOrUpdateEvent';
import { FurnitureListEvent } from './messages/incoming/inventory/furni/FurnitureListEvent';
import { FurnitureListInvalidateEvent } from './messages/incoming/inventory/furni/FurnitureListInvalidateEvent';
import { FurnitureListRemovedEvent } from './messages/incoming/inventory/furni/FurnitureListRemovedEvent';
import { FurniturePostItPlacedEvent } from './messages/incoming/inventory/furni/FurniturePostItPlacedEvent';
import { NavigatorCategoriesEvent } from './messages/incoming/navigator/NavigatorCategoriesEvent';
import { NavigatorCollapsedEvent } from './messages/incoming/navigator/NavigatorCollapsedEvent';
import { NavigatorEventCategoriesEvent } from './messages/incoming/navigator/NavigatorEventCategoriesEvent';
import { NavigatorLiftedEvent } from './messages/incoming/navigator/NavigatorLiftedEvent';
import { NavigatorMetadataEvent } from './messages/incoming/navigator/NavigatorMetadataEvent';
import { NavigatorSearchesEvent } from './messages/incoming/navigator/NavigatorSearchesEvent';
import { NavigatorSearchEvent } from './messages/incoming/navigator/NavigatorSearchEvent';
import { NavigatorSettingsEvent } from './messages/incoming/navigator/NavigatorSettingsEvent';
import { UnseenItemsEvent } from './messages/incoming/notifications/UnseenItemsEvent';
import { RoomRightsClearEvent } from './messages/incoming/room/access/rights/RoomRightsClearEvent';
import { RoomRightsEvent } from './messages/incoming/room/access/rights/RoomRightsEvent';
import { RoomRightsOwnerEvent } from './messages/incoming/room/access/rights/RoomRightsOwnerEvent';
import { RoomEnterEvent } from './messages/incoming/room/access/RoomEnterEvent';
import { RoomFowardEvent } from './messages/incoming/room/access/RoomFowardEvent';
import { RoomChatSettingsEvent } from './messages/incoming/room/data/RoomChatSettingsEvent';
import { RoomInfoEvent } from './messages/incoming/room/data/RoomInfoEvent';
import { RoomInfoOwnerEvent } from './messages/incoming/room/data/RoomInfoOwnerEvent';
import { RoomScoreEvent } from './messages/incoming/room/data/RoomScoreEvent';
import { RoomSettingsErrorEvent } from './messages/incoming/room/data/RoomSettingsErrorEvent';
import { RoomSettingsEvent } from './messages/incoming/room/data/RoomSettingsEvent';
import { RoomSettingsSavedEvent } from './messages/incoming/room/data/RoomSettingsSavedEvent';
import { RoomSettingsUpdatedEvent } from './messages/incoming/room/data/RoomSettingsUpdatedEvent';
import { ObjectsRollingEvent } from './messages/incoming/room/engine/ObjectsRollingEvent';
import { FurnitureFloorAddEvent } from './messages/incoming/room/furniture/floor/FurnitureFloorAddEvent';
import { FurnitureFloorEvent } from './messages/incoming/room/furniture/floor/FurnitureFloorEvent';
import { FurnitureFloorRemoveEvent } from './messages/incoming/room/furniture/floor/FurnitureFloorRemoveEvent';
import { FurnitureFloorUpdateEvent } from './messages/incoming/room/furniture/floor/FurnitureFloorUpdateEvent';
import { FurnitureAliasesEvent } from './messages/incoming/room/furniture/FurnitureAliasesEvent';
import { FurnitureDataEvent } from './messages/incoming/room/furniture/FurnitureDataEvent';
import { FurnitureItemDataEvent } from './messages/incoming/room/furniture/FurnitureItemDataEvent';
import { FurnitureStateEvent } from './messages/incoming/room/furniture/FurnitureStateEvent';
import { FurnitureWallAddEvent } from './messages/incoming/room/furniture/wall/FurnitureWallAddEvent';
import { FurnitureWallEvent } from './messages/incoming/room/furniture/wall/FurnitureWallEvent';
import { FurnitureWallRemoveEvent } from './messages/incoming/room/furniture/wall/FurnitureWallRemoveEvent';
import { FurnitureWallUpdateEvent } from './messages/incoming/room/furniture/wall/FurnitureWallUpdateEvent';
import { RoomDoorEvent } from './messages/incoming/room/mapping/RoomDoorEvent';
import { RoomHeightMapEvent } from './messages/incoming/room/mapping/RoomHeightMapEvent';
import { RoomHeightMapUpdateEvent } from './messages/incoming/room/mapping/RoomHeightMapUpdateEvent';
import { RoomModelEvent } from './messages/incoming/room/mapping/RoomModelEvent';
import { RoomModelNameEvent } from './messages/incoming/room/mapping/RoomModelNameEvent';
import { RoomPaintEvent } from './messages/incoming/room/mapping/RoomPaintEvent';
import { RoomThicknessEvent } from './messages/incoming/room/mapping/RoomThicknessEvent';
import { PetFigureUpdateEvent } from './messages/incoming/room/pet/PetFigureUpdateEvent';
import { RoomUnitChatEvent } from './messages/incoming/room/unit/chat/RoomUnitChatEvent';
import { RoomUnitChatShoutEvent } from './messages/incoming/room/unit/chat/RoomUnitChatShoutEvent';
import { RoomUnitChatWhisperEvent } from './messages/incoming/room/unit/chat/RoomUnitChatWhisperEvent';
import { RoomUnitTypingEvent } from './messages/incoming/room/unit/chat/RoomUnitTypingEvent';
import { RoomUnitDanceEvent } from './messages/incoming/room/unit/RoomUnitDanceEvent';
import { RoomUnitEffectEvent } from './messages/incoming/room/unit/RoomUnitEffectEvent';
import { RoomUnitEvent } from './messages/incoming/room/unit/RoomUnitEvent';
import { RoomUnitExpressionEvent } from './messages/incoming/room/unit/RoomUnitExpressionEvent';
import { RoomUnitHandItemEvent } from './messages/incoming/room/unit/RoomUnitHandItemEvent';
import { RoomUnitIdleEvent } from './messages/incoming/room/unit/RoomUnitIdleEvent';
import { RoomUnitInfoEvent } from './messages/incoming/room/unit/RoomUnitInfoEvent';
import { RoomUnitRemoveEvent } from './messages/incoming/room/unit/RoomUnitRemoveEvent';
import { RoomUnitStatusEvent } from './messages/incoming/room/unit/RoomUnitStatusEvent';
import { AuthenticatedEvent } from './messages/incoming/security/AuthenticatedEvent';
import { UserPerksEvent } from './messages/incoming/user/access/UserPerksEvent';
import { UserPermissionsEvent } from './messages/incoming/user/access/UserPermissionsEvent';
import { UserCurrentBadgesEvent } from './messages/incoming/user/data/UserCurrentBadgesEvent';
import { UserFigureEvent } from './messages/incoming/user/data/UserFigureEvent';
import { UserInfoEvent } from './messages/incoming/user/data/UserInfoEvent';
import { UserCreditsEvent } from './messages/incoming/user/inventory/currency/UserCreditsEvent';
import { UserCurrencyEvent } from './messages/incoming/user/inventory/currency/UserCurrencyEvent';
import { UserSubscriptionEvent } from './messages/incoming/user/inventory/subscription/UserSubscriptionEvent';
import { CatalogModeComposer } from './messages/outgoing/catalog/CatalogModeComposer';
import { CatalogPageComposer } from './messages/outgoing/catalog/CatalogPageComposer';
import { CatalogPurchaseComposer } from './messages/outgoing/catalog/CatalogPurchaseComposer';
import { CatalogSearchComposer } from './messages/outgoing/catalog/CatalogSearchComposer';
import { ClientPongComposer } from './messages/outgoing/client/ClientPongComposer';
import { ClientReleaseVersionComposer } from './messages/outgoing/client/ClientReleaseVersionComposer';
import { DesktopViewComposer } from './messages/outgoing/desktop/DesktopViewComposer';
import { FurnitureList2Composer } from './messages/outgoing/inventory/furni/FurnitureList2Composer';
import { FurnitureListComposer } from './messages/outgoing/inventory/furni/FurnitureListComposer';
import { NavigatorCategoriesComposer } from './messages/outgoing/navigator/NavigatorCategoriesComposer';
import { NavigatorInitComposer } from './messages/outgoing/navigator/NavigatorInitComposer';
import { NavigatorSearchCloseComposer } from './messages/outgoing/navigator/NavigatorSearchCloseComposer';
import { NavigatorSearchComposer } from './messages/outgoing/navigator/NavigatorSearchComposer';
import { NavigatorSearchOpenComposer } from './messages/outgoing/navigator/NavigatorSearchOpenComposer';
import { NavigatorSearchSaveComposer } from './messages/outgoing/navigator/NavigatorSearchSaveComposer';
import { NavigatorSettingsComposer } from './messages/outgoing/navigator/NavigatorSettingsComposer';
import { NavigatorSettingsSaveComposer } from './messages/outgoing/navigator/NavigatorSettingsSaveComposer';
import { OutgoingHeader } from './messages/outgoing/OutgoingHeader';
import { RoomEnterComposer } from './messages/outgoing/room/access/RoomEnterComposer';
import { RoomInfoComposer } from './messages/outgoing/room/data/RoomInfoComposer';
import { FurnitureFloorUpdateComposer } from './messages/outgoing/room/furniture/floor/FurnitureFloorUpdateComposer';
import { FurnitureAliasesComposer } from './messages/outgoing/room/furniture/FurnitureAliasesComposer';
import { FurniturePickupComposer } from './messages/outgoing/room/furniture/FurniturePickupComposer';
import { FurniturePlaceComposer } from './messages/outgoing/room/furniture/FurniturePlaceComposer';
import { FurniturePostItPlaceComposer } from './messages/outgoing/room/furniture/FurniturePostItPlaceComposer';
import { FurnitureColorWheelComposer } from './messages/outgoing/room/furniture/logic/FurnitureColorWheelComposer';
import { FurnitureDiceActivateComposer } from './messages/outgoing/room/furniture/logic/FurnitureDiceActivateComposer';
import { FurnitureDiceDeactivateComposer } from './messages/outgoing/room/furniture/logic/FurnitureDiceDeactivateComposer';
import { FurnitureMultiStateComposer } from './messages/outgoing/room/furniture/logic/FurnitureMultiStateComposer';
import { FurnitureRandomStateComposer } from './messages/outgoing/room/furniture/logic/FurnitureRandomStateComposer';
import { FurnitureWallMultiStateComposer } from './messages/outgoing/room/furniture/logic/FurnitureWallMultiStateComposer';
import { FurnitureWallUpdateComposer } from './messages/outgoing/room/furniture/wall/FurnitureWallUpdateComposer';
import { RoomModelComposer } from './messages/outgoing/room/mapping/RoomModelComposer';
import { RoomUnitChatComposer } from './messages/outgoing/room/unit/chat/RoomUnitChatComposer';
import { RoomUnitChatShoutComposer } from './messages/outgoing/room/unit/chat/RoomUnitChatShoutComposer';
import { RoomUnitChatWhisperComposer } from './messages/outgoing/room/unit/chat/RoomUnitChatWhisperComposer';
import { RoomUnitTypingStartComposer } from './messages/outgoing/room/unit/chat/RoomUnitTypingStartComposer';
import { RoomUnitTypingStopComposer } from './messages/outgoing/room/unit/chat/RoomUnitTypingStopComposer';
import { RoomUnitActionComposer } from './messages/outgoing/room/unit/RoomUnitActionComposer';
import { RoomUnitDanceComposer } from './messages/outgoing/room/unit/RoomUnitDanceComposer';
import { RoomUnitDropHandItemComposer } from './messages/outgoing/room/unit/RoomUnitDropHandItemComposer';
import { RoomUnitGiveHandItemComposer } from './messages/outgoing/room/unit/RoomUnitGiveHandItemComposer';
import { RoomUnitLookComposer } from './messages/outgoing/room/unit/RoomUnitLookComposer';
import { RoomUnitPostureComposer } from './messages/outgoing/room/unit/RoomUnitPostureComposer';
import { RoomUnitSignComposer } from './messages/outgoing/room/unit/RoomUnitSignComposer';
import { RoomUnitWalkComposer } from './messages/outgoing/room/unit/RoomUnitWalkComposer';
import { SecurityTicketComposer } from './messages/outgoing/security/SecurityTicketComposer';
import { UserCurrentBadgesComposer } from './messages/outgoing/user/data/UserCurrentBadgesComposer';
import { UserFigureComposer } from './messages/outgoing/user/data/UserFigureComposer';
import { UserHomeRoomComposer } from './messages/outgoing/user/data/UserHomeRoomComposer';
import { UserInfoComposer } from './messages/outgoing/user/data/UserInfoComposer';
import { UserMottoComposer } from './messages/outgoing/user/data/UserMottoComposer';
import { UserCurrencyComposer } from './messages/outgoing/user/inventory/currency/UserCurrencyComposer';
import { UserSubscriptionComposer } from './messages/outgoing/user/inventory/subscription/UserSubscriptionComposer';

export class NitroMessages implements IMessageConfiguration
{
    private _events: Map<number, Function>;
    private _composers: Map<number, Function>;

    constructor()
    {
        this._events    = new Map();
        this._composers = new Map();

        this.registerEvents();
        this.registerComposers();
    }
    
    private registerEvents(): void
    {
        // AVAILABILITY
        this._events.set(IncomingHeader.AVAILABILITY_STATUS, AvailabilityStatusMessageEvent);

        // CATALOG
        this._events.set(IncomingHeader.CATALOG_CLUB, CatalogClubEvent);
        this._events.set(IncomingHeader.CATALOG_MODE, CatalogModeEvent);
        this._events.set(IncomingHeader.CATALOG_PAGE, CatalogPageEvent);
        this._events.set(IncomingHeader.CATALOG_PAGES, CatalogPagesEvent);
        this._events.set(IncomingHeader.CATALOG_PURCHASE, CatalogPurchaseEvent);
        this._events.set(IncomingHeader.CATALOG_PURCHASE_FAILED, CatalogPurchaseFailedEvent);
        this._events.set(IncomingHeader.CATALOG_PURCHASE_UNAVAILABLE, CatalogPurchaseUnavailableEvent);
        this._events.set(IncomingHeader.CATALOG_SEARCH, CatalogSearchEvent);
        this._events.set(IncomingHeader.CATALOG_SOLD_OUT, CatalogSoldOutEvent);
        this._events.set(IncomingHeader.CATALOG_UPDATED, CatalogUpdatedEvent);

        // CLIENT
        this._events.set(IncomingHeader.CLIENT_PING, ClientPingEvent);

        // DESKTOP
        this._events.set(IncomingHeader.DESKTOP_VIEW, DesktopViewEvent);

        // GENERIC
        this._events.set(IncomingHeader.GENERIC_ALERT, GenericAlertEvent);
        this._events.set(IncomingHeader.GENERIC_ALERT_LINK, GenericAlertLinkEvent);

        // INVENTORY
        this._events.set(IncomingHeader.USER_FURNITURE_ADD, FurnitureListAddOrUpdateEvent);
        this._events.set(IncomingHeader.USER_FURNITURE, FurnitureListEvent);
        this._events.set(IncomingHeader.USER_FURNITURE_REFRESH, FurnitureListInvalidateEvent);
        this._events.set(IncomingHeader.USER_FURNITURE_REMOVE, FurnitureListRemovedEvent);
        this._events.set(IncomingHeader.USER_FURNITURE_POSTIT_PLACED, FurniturePostItPlacedEvent);

        // NAVIGATOR
        this._events.set(IncomingHeader.NAVIGATOR_CATEGORIES, NavigatorCategoriesEvent);
        this._events.set(IncomingHeader.NAVIGATOR_COLLAPSED, NavigatorCollapsedEvent);
        this._events.set(IncomingHeader.NAVIGATOR_EVENT_CATEGORIES, NavigatorEventCategoriesEvent);
        this._events.set(IncomingHeader.NAVIGATOR_LIFTED, NavigatorLiftedEvent);
        this._events.set(IncomingHeader.NAVIGATOR_SEARCH, NavigatorSearchEvent);
        this._events.set(IncomingHeader.NAVIGATOR_SEARCHES, NavigatorSearchesEvent);
        this._events.set(IncomingHeader.NAVIGATOR_SETTINGS, NavigatorSettingsEvent);
        this._events.set(IncomingHeader.NAVIGATOR_METADATA, NavigatorMetadataEvent);

        // NOTIFICATIONS
        this._events.set(IncomingHeader.UNSEEN_ITEMS, UnseenItemsEvent);

        // ROOM

        // ACCESS
        this._events.set(IncomingHeader.ROOM_ENTER, RoomEnterEvent);
        this._events.set(IncomingHeader.ROOM_FORWARD, RoomFowardEvent);

        // RIGHTS
        this._events.set(IncomingHeader.ROOM_RIGHTS_CLEAR, RoomRightsClearEvent);
        this._events.set(IncomingHeader.ROOM_RIGHTS_OWNER, RoomRightsOwnerEvent);
        this._events.set(IncomingHeader.ROOM_RIGHTS, RoomRightsEvent);

        // DATA
        this._events.set(IncomingHeader.ROOM_SETTINGS_CHAT, RoomChatSettingsEvent);
        this._events.set(IncomingHeader.ROOM_INFO, RoomInfoEvent);
        this._events.set(IncomingHeader.ROOM_INFO_OWNER, RoomInfoOwnerEvent);
        this._events.set(IncomingHeader.ROOM_SCORE, RoomScoreEvent);
        this._events.set(IncomingHeader.ROOM_SETTINGS_SAVE_ERROR, RoomSettingsErrorEvent);
        this._events.set(IncomingHeader.ROOM_SETTINGS, RoomSettingsEvent);
        this._events.set(IncomingHeader.ROOM_SETTINGS_SAVE, RoomSettingsSavedEvent);
        this._events.set(IncomingHeader.ROOM_SETTINGS_UPDATED, RoomSettingsUpdatedEvent);

        // ENGINE
        this._events.set(IncomingHeader.ROOM_ROLLING, ObjectsRollingEvent);

        // FURNITURE
        this._events.set(IncomingHeader.FURNITURE_ALIASES, FurnitureAliasesEvent);
        this._events.set(IncomingHeader.FURNITURE_DATA, FurnitureDataEvent);
        this._events.set(IncomingHeader.FURNITURE_ITEMDATA, FurnitureItemDataEvent);
        this._events.set(IncomingHeader.FURNITURE_STATE, FurnitureStateEvent);

        // FLOOR
        this._events.set(IncomingHeader.FURNITURE_FLOOR_ADD, FurnitureFloorAddEvent);
        this._events.set(IncomingHeader.FURNITURE_FLOOR, FurnitureFloorEvent);
        this._events.set(IncomingHeader.FURNITURE_FLOOR_REMOVE, FurnitureFloorRemoveEvent);
        this._events.set(IncomingHeader.FURNITURE_FLOOR_UPDATE, FurnitureFloorUpdateEvent);

        // WALL
        this._events.set(IncomingHeader.ITEM_WALL_ADD, FurnitureWallAddEvent);
        this._events.set(IncomingHeader.ITEM_WALL, FurnitureWallEvent);
        this._events.set(IncomingHeader.ITEM_WALL_REMOVE, FurnitureWallRemoveEvent);
        this._events.set(IncomingHeader.ITEM_WALL_UPDATE, FurnitureWallUpdateEvent);

        // MAPPING
        this._events.set(IncomingHeader.ROOM_MODEL_DOOR, RoomDoorEvent);
        this._events.set(IncomingHeader.ROOM_HEIGHT_MAP, RoomHeightMapEvent);
        this._events.set(IncomingHeader.ROOM_HEIGHT_MAP_UPDATE, RoomHeightMapUpdateEvent);
        this._events.set(IncomingHeader.ROOM_MODEL, RoomModelEvent);
        this._events.set(IncomingHeader.ROOM_MODEL_NAME, RoomModelNameEvent);
        this._events.set(IncomingHeader.ROOM_PAINT, RoomPaintEvent);
        this._events.set(IncomingHeader.ROOM_THICKNESS, RoomThicknessEvent);

        // PET
        this._events.set(IncomingHeader.PET_FIGURE_UPDATE, PetFigureUpdateEvent);

        // UNIT
        this._events.set(IncomingHeader.UNIT_DANCE, RoomUnitDanceEvent);
        this._events.set(IncomingHeader.UNIT_EFFECT, RoomUnitEffectEvent);
        this._events.set(IncomingHeader.UNIT, RoomUnitEvent);
        this._events.set(IncomingHeader.UNIT_EXPRESSION, RoomUnitExpressionEvent);
        this._events.set(IncomingHeader.UNIT_HAND_ITEM, RoomUnitHandItemEvent);
        this._events.set(IncomingHeader.UNIT_IDLE, RoomUnitIdleEvent);
        this._events.set(IncomingHeader.UNIT_INFO, RoomUnitInfoEvent);
        this._events.set(IncomingHeader.UNIT_REMOVE, RoomUnitRemoveEvent);
        this._events.set(IncomingHeader.UNIT_STATUS, RoomUnitStatusEvent);

        // CHAT
        this._events.set(IncomingHeader.UNIT_CHAT, RoomUnitChatEvent);
        this._events.set(IncomingHeader.UNIT_CHAT_SHOUT, RoomUnitChatShoutEvent);
        this._events.set(IncomingHeader.UNIT_CHAT_WHISPER, RoomUnitChatWhisperEvent);
        this._events.set(IncomingHeader.UNIT_TYPING, RoomUnitTypingEvent);

        // SECURITY
        this._events.set(IncomingHeader.AUTHENTICATED, AuthenticatedEvent);

        // USER

        // ACCESS
        this._events.set(IncomingHeader.USER_PERKS, UserPerksEvent);
        this._events.set(IncomingHeader.USER_PERMISSIONS, UserPermissionsEvent);

        // DATA
        this._events.set(IncomingHeader.USER_BADGES_CURRENT, UserCurrentBadgesEvent);
        this._events.set(IncomingHeader.USER_FIGURE, UserFigureEvent);
        this._events.set(IncomingHeader.USER_INFO, UserInfoEvent);

        // INVENTORY

         // CURRENCY
        this._events.set(IncomingHeader.USER_CREDITS, UserCreditsEvent);
        this._events.set(IncomingHeader.USER_CURRENCY, UserCurrencyEvent);

        // SUBSCRIPTION
        this._events.set(IncomingHeader.USER_SUBSCRIPTION, UserSubscriptionEvent);
    }

    private registerComposers(): void
    {
        // CATALOG
        this._composers.set(OutgoingHeader.CATALOG_MODE, CatalogModeComposer);
        this._composers.set(OutgoingHeader.CATALOG_PAGE, CatalogPageComposer);
        this._composers.set(OutgoingHeader.CATALOG_PURCHASE, CatalogPurchaseComposer);
        this._composers.set(OutgoingHeader.CATALOG_SEARCH, CatalogSearchComposer);

        // CLIENT
        this._composers.set(OutgoingHeader.CLIENT_PONG, ClientPongComposer);
        this._composers.set(OutgoingHeader.RELEASE_VERSION, ClientReleaseVersionComposer);

        // DESKTOP
        this._composers.set(OutgoingHeader.DESKTOP_VIEW, DesktopViewComposer);

        // NAVIGATOR
        this._composers.set(OutgoingHeader.NAVIGATOR_CATEGORIES, NavigatorCategoriesComposer);
        this._composers.set(OutgoingHeader.NAVIGATOR_INIT, NavigatorInitComposer);
        this._composers.set(OutgoingHeader.NAVIGATOR_SEARCH_CLOSE, NavigatorSearchCloseComposer);
        this._composers.set(OutgoingHeader.NAVIGATOR_SEARCH, NavigatorSearchComposer);
        this._composers.set(OutgoingHeader.NAVIGATOR_SEARCH_OPEN, NavigatorSearchOpenComposer);
        this._composers.set(OutgoingHeader.NAVIGATOR_SEARCH_SAVE, NavigatorSearchSaveComposer);
        this._composers.set(OutgoingHeader.NAVIGATOR_SETTINGS, NavigatorSettingsComposer);
        this._composers.set(OutgoingHeader.NAVIGATOR_SETTINGS_SAVE, NavigatorSettingsSaveComposer);

        // INVENTORY

        // FURNI
        this._composers.set(OutgoingHeader.USER_FURNITURE, FurnitureListComposer);
        this._composers.set(OutgoingHeader.USER_FURNITURE2, FurnitureList2Composer);

        // ROOM

        // ACCESS
        this._composers.set(OutgoingHeader.ROOM_ENTER, RoomEnterComposer);

        // DATA
        this._composers.set(OutgoingHeader.ROOM_INFO, RoomInfoComposer);

        // FURNITURE
        this._composers.set(OutgoingHeader.FURNITURE_ALIASES, FurnitureAliasesComposer);
        this._composers.set(OutgoingHeader.FURNITURE_PICKUP, FurniturePickupComposer);
        this._composers.set(OutgoingHeader.FURNITURE_PLACE, FurniturePlaceComposer);
        this._composers.set(OutgoingHeader.FURNITURE_POSTIT_PLACE, FurniturePostItPlaceComposer);

        // FLOOR
        this._composers.set(OutgoingHeader.FURNITURE_FLOOR_UPDATE, FurnitureFloorUpdateComposer);

        // WALL
        this._composers.set(OutgoingHeader.FURNITURE_WALL_UPDATE, FurnitureWallUpdateComposer);

        // LOGIC
        this._composers.set(OutgoingHeader.ITEM_COLOR_WHEEL_CLICK, FurnitureColorWheelComposer);
        this._composers.set(OutgoingHeader.ITEM_DICE_CLICK, FurnitureDiceActivateComposer);
        this._composers.set(OutgoingHeader.ITEM_DICE_CLOSE, FurnitureDiceDeactivateComposer);
        this._composers.set(OutgoingHeader.FURNITURE_MULTISTATE, FurnitureMultiStateComposer);
        this._composers.set(OutgoingHeader.FURNITURE_RANDOMSTATE, FurnitureRandomStateComposer);
        this._composers.set(OutgoingHeader.FURNITURE_WALL_MULTISTATE, FurnitureWallMultiStateComposer);

        // MAPPING
        this._composers.set(OutgoingHeader.ROOM_MODEL, RoomModelComposer);

        // UNIT
        this._composers.set(OutgoingHeader.UNIT_ACTION, RoomUnitActionComposer);
        this._composers.set(OutgoingHeader.UNIT_DANCE, RoomUnitDanceComposer);
        this._composers.set(OutgoingHeader.UNIT_DROP_HAND_ITEM, RoomUnitDropHandItemComposer);
        this._composers.set(OutgoingHeader.UNIT_GIVE_HANDITEM, RoomUnitGiveHandItemComposer);
        this._composers.set(OutgoingHeader.UNIT_LOOK, RoomUnitLookComposer);
        this._composers.set(OutgoingHeader.UNIT_SIGN, RoomUnitSignComposer);
        this._composers.set(OutgoingHeader.UNIT_POSTURE, RoomUnitPostureComposer);
        this._composers.set(OutgoingHeader.UNIT_WALK, RoomUnitWalkComposer);

        // CHAT
        this._composers.set(OutgoingHeader.UNIT_CHAT, RoomUnitChatComposer);
        this._composers.set(OutgoingHeader.UNIT_CHAT_SHOUT, RoomUnitChatShoutComposer);
        this._composers.set(OutgoingHeader.UNIT_CHAT_WHISPER, RoomUnitChatWhisperComposer);
        this._composers.set(OutgoingHeader.UNIT_TYPING, RoomUnitTypingStartComposer);
        this._composers.set(OutgoingHeader.UNIT_TYPING_STOP, RoomUnitTypingStopComposer);
                
        // SECURITY
        this._composers.set(OutgoingHeader.SECURITY_TICKET, SecurityTicketComposer);

        // USER
        this._composers.set(OutgoingHeader.USER_BADGES_CURRENT, UserCurrentBadgesComposer);
        this._composers.set(OutgoingHeader.USER_FIGURE, UserFigureComposer);
        this._composers.set(OutgoingHeader.USER_HOME_ROOM, UserHomeRoomComposer);
        this._composers.set(OutgoingHeader.USER_INFO, UserInfoComposer);
        this._composers.set(OutgoingHeader.USER_MOTTO, UserMottoComposer);

        // INVENTORY

        // CURRENCY
        this._composers.set(OutgoingHeader.USER_CURRENCY, UserCurrencyComposer);

        // SUBSCRIPTION
        this._composers.set(OutgoingHeader.USER_SUBSCRIPTION, UserSubscriptionComposer);
    }

    public get events(): Map<number, Function>
    {
        return this._events;
    }

    public get composers(): Map<number, Function>
    {
        return this._composers;
    }
}