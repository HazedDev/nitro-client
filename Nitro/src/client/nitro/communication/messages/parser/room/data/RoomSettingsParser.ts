import { IMessageDataWrapper } from '../../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../../core/communication/messages/IMessageParser';
import { RoomChatParser } from './RoomChatParser';
import { RoomModerationParser } from './RoomModerationParser';

export class RoomSettingsParser implements IMessageParser
{
    private _roomId: number;
    private _name: string;
    private _description: string;
    private _state: number;
    private _categoryId: number;
    private _userCount: number;
    private _maxUserCount: number;
    private _tags: string[];
    private _tradeMode: number;
    private _allowPets: number;
    private _allowPetsEat: number;
    private _allowWalkthrough: number;
    private _hideWalls: number;
    private _thicknessWall: number;
    private _thicknessFloor: number;
    private _chat: RoomChatParser;
    private _moderation: RoomModerationParser;

    public flush(): boolean
    {
        this._roomId = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._roomId            = wrapper.readInt();
        this._name              = wrapper.readString();
        this._description       = wrapper.readString();
        this._state             = wrapper.readInt();
        this._categoryId        = wrapper.readInt();
        this._userCount         = wrapper.readInt();
        this._maxUserCount      = wrapper.readInt();

        this.parseTags(wrapper);

        this._allowPets         = wrapper.readInt();
        this._allowPetsEat      = wrapper.readInt();
        this._allowWalkthrough  = wrapper.readInt();
        this._hideWalls         = wrapper.readInt();
        this._thicknessWall     = wrapper.readInt();
        this._thicknessFloor    = wrapper.readInt();
        this._chat              = new RoomChatParser(wrapper);
        this._moderation        = new RoomModerationParser(wrapper);

        return true;
    }

    private parseTags(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._tags = [];

        let totalTags = wrapper.readInt();

        while(totalTags > 0)
        {
            this._tags.push(wrapper.readString());

            totalTags--;
        }

        return true;
    }

    public get roomId(): number
    {
        return this._roomId;
    }
}