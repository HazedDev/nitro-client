import { FurnitureListItemParser } from '../../../../client/nitro/communication/messages/parser/inventory/furniture/utils/FurnitureListItemParser';
import { IObjectData } from '../../../../client/nitro/room/object/data/IObjectData';

export interface IFurnitureItem
{
    rentable: boolean

    id: number

    ref: number

    category: number

    type: number

    stuffData: IObjectData

    _Str_2794: number

    _Str_16260: boolean

    isTradable: boolean

    isGroupable: boolean

    sellable: boolean

    secondsToExpiration: number

    _Str_8932: number

    _Str_9050: number

    _Str_9408: number

    slotId: string

    _Str_3951: number

    locked: boolean

    flatId: number

    isWallItem: boolean

    hasRentPeriodStarted: boolean

    _Str_10616: number

    unlocked: boolean

    update(parser: FurnitureListItemParser): void
}