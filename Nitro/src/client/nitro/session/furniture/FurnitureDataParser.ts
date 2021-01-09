import { EventDispatcher } from '../../../core/events/EventDispatcher';
import { NitroEvent } from '../../../core/events/NitroEvent';
import { FurnitureData } from './FurnitureData';
import { FurnitureType } from './FurnitureType';
import { IFurnitureData } from './IFurnitureData';

export class FurnitureDataParser extends EventDispatcher
{
    public static FURNITURE_DATA_READY: string = 'FDP_FURNITURE_DATA_READY';
    public static FURNITURE_DATA_ERROR: string = 'FDP_FURNITURE_DATA_ERROR';

    private _floorItems: Map<number, IFurnitureData>;
    private _wallItems: Map<number, IFurnitureData>;

    constructor(floorItems: Map<number, IFurnitureData>, wallItems: Map<number, IFurnitureData>)
    {
        super();

        this._floorItems    = floorItems;
        this._wallItems     = wallItems;
    }

    public loadFurnitureData(url: string): void
    {
        if(!url) return;

        const request = new XMLHttpRequest();

        request.addEventListener('loadend', this.onFurnitureDataLoaded.bind(this, request));
        request.addEventListener('error', this.onFurnitureDataError.bind(this, request));

        request.open('GET', url);

        request.send();
    }

    private onFurnitureDataLoaded(request: XMLHttpRequest): void
    {
        if(!request) return;

        request.removeEventListener('loadend', this.onFurnitureDataLoaded.bind(this, request));
        request.removeEventListener('error', this.onFurnitureDataError.bind(this, request));

        if(request.responseText)
        {
            const data = JSON.parse(request.responseText);

            if(data.floorItems) this.parseFloorItems(data.floorItems);
            if(data.wallItems) this.parseWallItems(data.wallItems);
        }

        this.dispatchEvent(new NitroEvent(FurnitureDataParser.FURNITURE_DATA_READY));
    }

    private onFurnitureDataError(request: XMLHttpRequest): void
    {
        if(!request)

        request.removeEventListener('loadend', this.onFurnitureDataLoaded.bind(this, request));
        request.removeEventListener('error', this.onFurnitureDataError.bind(this, request));

        this.dispatchEvent(new NitroEvent(FurnitureDataParser.FURNITURE_DATA_ERROR));
    }

    private parseFloorItems(data: any): void
    {
        if(!data || !data.length) return;

        for(let furniture of data)
        {
            if(!furniture) continue;

            this._floorItems.set(furniture.id, new FurnitureData(FurnitureType.FLOOR, furniture.id, furniture.className, furniture.name, furniture.description, furniture.furniLine, furniture.colors, furniture.dimensions, furniture.canStandOn, furniture.canSitOn, furniture.canLayOn, furniture.offerId, furniture.adUrl, furniture.excludeDynamic, furniture.specialType, furniture.customParams));
        }
    }

    private parseWallItems(data: any): void
    {
        if(!data || !data.length) return;

        for(let furniture of data)
        {
            if(!furniture) continue;

            this._wallItems.set(furniture.id, new FurnitureData(FurnitureType.WALL, furniture.id, furniture.className, furniture.name, furniture.description, furniture.furniLine, furniture.colors, furniture.dimensions, furniture.canStandOn, furniture.canSitOn, furniture.canLayOn, furniture.offerId, furniture.adUrl, furniture.excludeDynamic, furniture.specialType, furniture.customParams));
        }
    }
}