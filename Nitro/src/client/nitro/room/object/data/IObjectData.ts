import { IMessageDataWrapper } from 'src/client/core/communication/messages/IMessageDataWrapper';
import { IRoomObjectModel } from 'src/client/room/object/IRoomObjectModel';

export interface IObjectData
{
    parseWrapper(wrapper: IMessageDataWrapper): void

    initializeFromRoomObjectModel(model: IRoomObjectModel): void

    writeRoomObjectModel(model: IRoomObjectModel): void

    getLegacyString(): string

    compare(data: IObjectData): boolean

    state: number

    isUnique: boolean

    uniqueNumber: number

    uniqueSeries: number

    flags: number
}