import { Directive, Input } from '@angular/core';
import { CatalogPageParser } from '../../../../client/nitro/communication/messages/parser/catalog/CatalogPageParser';
import { CatalogPageData } from '../../../../client/nitro/communication/messages/parser/catalog/utils/CatalogPageData';
import { CatalogPageOfferData } from '../../../../client/nitro/communication/messages/parser/catalog/utils/CatalogPageOfferData';
import { RoomPreviewer } from '../../../../client/nitro/room/preview/RoomPreviewer';
import { AppConfiguration } from '../../../AppConfiguration';
import { CatalogService } from '../services/catalog.service';

@Directive()
export class CatalogLayout
{
    @Input()
    public catalogPage: CatalogPageData = null;
    
    @Input()
    public pageParser: CatalogPageParser = null;

    @Input()
    public activeOffer: CatalogPageOfferData = null;

    @Input()
    public roomPreviewer: RoomPreviewer = null;

    constructor(
        protected catalogService: CatalogService) {}

    public getText(index: number = 0): string
    {
        return (this.pageParser.localization.texts[index] || null);
    }

    public getImage(index: number = 0): string
    {
        return (this.pageParser.localization.images[index] || null);
    }

    public get headerText(): string
    {
        return (this.catalogPage.localization || null);
    }

    public get headerDescription(): string
    {
        return this.getText(0);
    }

    public get headerImage(): string
    {
        let imageName = this.getImage(0);

        if(imageName && this.pageParser)
        {
            return (AppConfiguration.CATALOG_IMAGE_URL.replace('%name%', imageName));
        }

        return null;
    }

    public get pageDescription(): string
    {
        return this.getText(1);
    }
    
    public get pageImage(): string
    {
        let imageName = this.getImage(1);

        if(imageName && (imageName !== '') && this.pageParser)
        {
            return (AppConfiguration.CATALOG_IMAGE_URL.replace('%name%', imageName));
        }

        return null;
    }
}