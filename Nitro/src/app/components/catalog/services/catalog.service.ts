import { EventEmitter, Injectable } from '@angular/core';
import { CatalogPageData } from '../../../../client/nitro/communication/messages/parser/catalog/utils/CatalogPageData';
import { CatalogPageOfferData } from '../../../../client/nitro/communication/messages/parser/catalog/utils/CatalogPageOfferData';
import { CatalogProductOfferData } from '../../../../client/nitro/communication/messages/parser/catalog/utils/CatalogProductOfferData';
import { CatalogPurchaseData } from '../../../../client/nitro/communication/messages/parser/catalog/utils/CatalogPurchaseData';
import { Nitro } from '../../../../client/nitro/Nitro';
import { FurnitureType } from '../../../../client/nitro/session/furniture/FurnitureType';
import { IFurnitureData } from '../../../../client/nitro/session/furniture/IFurnitureData';
import { AppConfiguration } from '../../../AppConfiguration';

@Injectable()
export class CatalogService
{
    private _tabEmitter: EventEmitter<CatalogPageData>;
    private _pageEmitter: EventEmitter<CatalogPageData>;
    private _offerEmitter: EventEmitter<CatalogPageOfferData>;
    private _purchaseEmitter: EventEmitter<CatalogPurchaseData>;

    constructor()
    {
        this._tabEmitter        = new EventEmitter();
        this._pageEmitter       = new EventEmitter();
        this._offerEmitter      = new EventEmitter();
        this._purchaseEmitter   = new EventEmitter();
    }

    public selectTab(tab: CatalogPageData): void
    {
        if(!tab) return;

        if(this._tabEmitter) this._tabEmitter.emit(tab);
    }

    public selectPage(page: CatalogPageData): void
    {
        if(!page) return;

        if(this._pageEmitter) this._pageEmitter.emit(page);
    }

    public selectOffer(offer: CatalogPageOfferData): void
    {
        if(!offer) return;

        if(this._offerEmitter) this._offerEmitter.emit(offer);
    }

    public receivePurchase(purchase: CatalogPurchaseData): void
    {
        if(!purchase) return;

        if(this._purchaseEmitter) this._purchaseEmitter.emit(purchase);
    }

    public isDescendant(page: CatalogPageData, descendant: CatalogPageData): boolean
    {
        if(!page || !descendant) return false;

        if(page === descendant) return true;

        if(page.children.length)
        {
            for(let child of page.children)
            {
                if(!child) continue;

                if(child === descendant) return true;

                const flag = this.isDescendant(child, descendant);

                if(flag) return true;
            }
        }

        return false;
    }

    public getFurnitureDataForProductOffer(offer: CatalogProductOfferData): IFurnitureData
    {
        if(!offer) return null;

        let furniData: IFurnitureData = null;

        switch((offer.productType.toUpperCase()))
        {
            case FurnitureType.FLOOR:
                furniData = Nitro.instance.sessionDataManager.getFloorItemData(offer.furniClassId);
                break;
            case FurnitureType.WALL:
                furniData = Nitro.instance.sessionDataManager.getWallItemData(offer.furniClassId);
                break;
        }

        return furniData;
    }

    public getFurnitureDataIconUrl(furniData: IFurnitureData): string
    {
        if(!furniData) return null;

        let furniName = furniData.className;

        if(furniData.colorId > 0) furniName = furniName + '_' + furniData.colorId;

        return (AppConfiguration.FURNITURE_ICON_URL.replace('%name%', furniName));
    }

    public get tabEmitter(): EventEmitter<CatalogPageData>
    {
        return this._tabEmitter;
    }

    public get pageEmitter(): EventEmitter<CatalogPageData>
    {
        return this._pageEmitter;
    }

    public get offerEmitter(): EventEmitter<CatalogPageOfferData>
    {
        return this._offerEmitter;
    }

    public get purchaseEmitter(): EventEmitter<CatalogPurchaseData>
    {
        return this._purchaseEmitter;
    }
}