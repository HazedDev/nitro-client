import { IMessageDataWrapper } from '../../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../../core/communication/messages/IMessageParser';
import { IObjectData } from '../../../../../room/object/data/IObjectData';
import { ObjectDataFactory } from '../../../../../room/object/data/ObjectDataFactory';
import { LegacyDataType } from '../../../../../room/object/data/type/LegacyDataType';

export class FurnitureDataParser implements IMessageParser
{
    private _itemId: number;
    private _data: IObjectData;

    public flush(): boolean
    {
        this._itemId    = 0;
        this._data      = null;

        return true;
    }
    
    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._itemId    = parseInt(wrapper.readString());
        this._data      = FurnitureDataParser.parseObjectData(wrapper);

        return true;
    }

    public static parseObjectData(wrapper: IMessageDataWrapper): IObjectData
    {
        if(!wrapper) return null;
        
        const data = ObjectDataFactory.getData(wrapper.readInt());

        if(!data) return null;

        data.parseWrapper(wrapper);

        return data;
    }

    public static parseWallStuffData(wrapper: IMessageDataWrapper): IObjectData
    {
        if(!wrapper) return null;

        const objectData = new LegacyDataType();

        objectData.setString(wrapper.readString());

        return objectData;
    }

    public get furnitureId(): number
    {
        return this._itemId;
    }

    public get objectData(): IObjectData
    {
        return this._data;
    }
}