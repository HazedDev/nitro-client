import { IMessageDataWrapper } from '../../../../../../core/communication/messages/IMessageDataWrapper';

export class NavigatorSearchResultRoom
{
    private THUMBNAIL_BITMASK: number           = 1;
    private GROUPDATA_BITMASK: number           = 2;
    private ROOMAD_BITMASK: number              = 4;
    private SHOWOWNER_BITMASK: number           = 8;
    private ALLOWPETS_BITMASK: number           = 16;
    private DISPLAYROOMENTRYAD_BITMASK: number  = 32;

    private _flatId: number;
    private _roomName: string;
    private _showOwner: boolean;
    private _ownerId: number;
    private _ownerName: string;
    private _doorMode: number;
    private _userCount: number;
    private _maxUserCount: number;
    private _description: string;
    private _tradeMode: number;
    private _score: number;
    private _ranking: number;
    private _categoryId: number;
    private _nStars: number;
    private _habboGroupId: number = 0;
    private _groupName: string = "";
    private _groupBadgeCode: string = "";
    private _tags: string[];
    private _allowPets: boolean;
    private _displayRoomEntryAd: boolean;
    private _roomAdName: string = "";
    private _roomAdDescription: string = "";
    private _roomAdExpiresInMin: number = 0;
    private _allInRoomMuted: boolean;
    private _canMute: boolean;
    private _disposed: boolean;
    private _officialRoomPicRef: string = null;

    constructor(wrapper: IMessageDataWrapper)
    {
        if(!wrapper) throw new Error('invalid_wrapper');

        this.flush();
        this.parse(wrapper);
    }

    public flush(): boolean
    {
        this._flatId                = -1;
        this._roomName              = null;
        this._ownerId               = -1;
        this._ownerName             = null;
        this._doorMode              = 0;
        this._userCount             = 0;
        this._maxUserCount          = 0;
        this._description           = null;
        this._tradeMode             = 0;
        this._score                 = 0;
        this._ranking               = 0;
        this._categoryId            = -1;
        this._tags                  = [];
        this._officialRoomPicRef    = null;
        this._habboGroupId          = -1;
        this._groupName             = null;
        this._groupBadgeCode        = null;
        this._roomAdName            = null;
        this._roomAdDescription     = null;
        this._roomAdExpiresInMin    = 0;
        this._showOwner             = false;
        this._allowPets             = false;
        this._displayRoomEntryAd    = false;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._flatId        = wrapper.readInt();
        this._roomName      = wrapper.readString();
        this._ownerId       = wrapper.readInt();
        this._ownerName     = wrapper.readString();
        this._doorMode      = wrapper.readInt();
        this._userCount     = wrapper.readInt();
        this._maxUserCount  = wrapper.readInt();
        this._description   = wrapper.readString();
        this._tradeMode     = wrapper.readInt();
        this._score         = wrapper.readInt();
        this._ranking       = wrapper.readInt();
        this._categoryId    = wrapper.readInt();

        let totalTags = wrapper.readInt();

        while (totalTags > 0)
        {
            this._tags.push(wrapper.readString());

            totalTags--;
        }

        const bitmask = wrapper.readInt();

        if((bitmask & this.THUMBNAIL_BITMASK) > 0) this._officialRoomPicRef = wrapper.readString();

        if ((bitmask & this.GROUPDATA_BITMASK) > 0)
        {
            this._habboGroupId      = wrapper.readInt();
            this._groupName         = wrapper.readString();
            this._groupBadgeCode    = wrapper.readString();
        }

        if((bitmask & this.ROOMAD_BITMASK) > 0)
        {
            this._roomAdName            = wrapper.readString();
            this._roomAdDescription     = wrapper.readString();
            this._roomAdExpiresInMin    = wrapper.readInt();
        }

        this._showOwner             = ((bitmask & this.SHOWOWNER_BITMASK) > 0);
        this._allowPets             = ((bitmask & this.ALLOWPETS_BITMASK) > 0);
        this._displayRoomEntryAd    = ((bitmask & this.DISPLAYROOMENTRYAD_BITMASK) > 0);

        return true;
    }
}