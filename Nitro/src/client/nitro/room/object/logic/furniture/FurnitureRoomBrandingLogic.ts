import { AssetManager } from '../../../../../core/asset/AssetManager';
import { RoomObjectUpdateMessage } from '../../../../../room/messages/RoomObjectUpdateMessage';
import { Nitro } from '../../../../Nitro';
import { ObjectAdUpdateMessage } from '../../../messages/ObjectAdUpdateMessage';
import { ObjectDataUpdateMessage } from '../../../messages/ObjectDataUpdateMessage';
import { MapDataType } from '../../data/type/MapDataType';
import { RoomObjectVariable } from '../../RoomObjectVariable';
import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureRoomBrandingLogic extends FurnitureLogic
{
    public static STATE: string         = 'state';
    public static IMAGEURL_KEY: string  = 'imageUrl';
    public static CLICKURL_KEY: string  = 'clickUrl';
    public static OFFSETX_KEY: string   = 'offsetX';
    public static OFFSETY_KEY: string   = 'offsetY';
    public static OFFSETZ_KEY: string   = 'offsetZ';

    public processUpdateMessage(message: RoomObjectUpdateMessage): void
    {
        super.processUpdateMessage(message);

        if(message instanceof ObjectDataUpdateMessage) this.processAdDataUpdateMessage(message);

        if(message instanceof ObjectAdUpdateMessage) this.processAdUpdate(message);
    }

    private processAdDataUpdateMessage(message: ObjectDataUpdateMessage): void
    {
        if(!message) return;

        const objectData = new MapDataType();

        objectData.initializeFromRoomObjectModel(this.object.model);

        const state = parseInt(objectData.getValue(FurnitureRoomBrandingLogic.STATE));

        if(!isNaN(state) && (this.object.getState(0) !== state)) this.object.setState(state, 0);

        const imageUrl = objectData.getValue(FurnitureRoomBrandingLogic.IMAGEURL_KEY);

        if(imageUrl)
        {
            const existingUrl = this.object.model.getValue<string>(RoomObjectVariable.FURNITURE_BRANDING_IMAGE_URL);

            if(!existingUrl || (existingUrl !== imageUrl))
            {
                this.object.model.setValue(RoomObjectVariable.FURNITURE_BRANDING_IMAGE_URL, imageUrl);
                this.object.model.setValue(RoomObjectVariable.FURNITURE_BRANDING_IMAGE_STATUS, 0);

                this.downloadBackground();
            }
        }

        const clickUrl = objectData.getValue(FurnitureRoomBrandingLogic.CLICKURL_KEY);

        if(clickUrl)
        {
            const existingUrl = this.object.model.getValue<string>(RoomObjectVariable.FURNITURE_BRANDING_URL);

            if(!existingUrl || existingUrl !== clickUrl)
            {
                if(this.object.model) this.object.model.setValue(RoomObjectVariable.FURNITURE_BRANDING_URL, clickUrl);
            }
        }

        const offsetX = parseInt(objectData.getValue(FurnitureRoomBrandingLogic.OFFSETX_KEY));
        const offsetY = parseInt(objectData.getValue(FurnitureRoomBrandingLogic.OFFSETY_KEY));
        const offsetZ = parseInt(objectData.getValue(FurnitureRoomBrandingLogic.OFFSETZ_KEY));

        if(!isNaN(offsetX)) this.object.model.setValue(RoomObjectVariable.FURNITURE_BRANDING_OFFSET_X, offsetX);
        if(!isNaN(offsetY)) this.object.model.setValue(RoomObjectVariable.FURNITURE_BRANDING_OFFSET_Y, offsetY);
        if(!isNaN(offsetZ)) this.object.model.setValue(RoomObjectVariable.FURNITURE_BRANDING_OFFSET_Z, offsetZ);
    }

    private processAdUpdate(message: ObjectAdUpdateMessage): void
    {
        if(!message) return;

        switch(message.type)
        {
            case ObjectAdUpdateMessage.IMAGE_LOADED:
                this.object.model.setValue(RoomObjectVariable.FURNITURE_BRANDING_IMAGE_STATUS, 1);
                break;
            case ObjectAdUpdateMessage.IMAGE_LOADING_FAILED:
                this.object.model.setValue(RoomObjectVariable.FURNITURE_BRANDING_IMAGE_STATUS, -1);
                break;
        }
    }

    private downloadBackground(): void
    {
        const model = this.object && this.object.model;

        if(!model) return;

        const imageUrl      = model.getValue<string>(RoomObjectVariable.FURNITURE_BRANDING_IMAGE_URL);
        const imageStatus   = model.getValue<number>(RoomObjectVariable.FURNITURE_BRANDING_IMAGE_STATUS);

        if(!imageUrl || imageStatus === 1) return;

        const asset = Nitro.instance.core && Nitro.instance.core.asset;

        if(!asset) return;

        const split     = imageUrl.split('/');
        const name      = AssetManager.removeFileExtension(split[(split.length - 1)]);
        const texture   = asset.getTexture(AssetManager.removeFileExtension(name));

        if(!texture)
        {
            asset.downloadAsset(imageUrl, () => this.processUpdateMessage(new ObjectAdUpdateMessage(ObjectAdUpdateMessage.IMAGE_LOADED)));

            return;
        }

        this.processUpdateMessage(new ObjectAdUpdateMessage(ObjectAdUpdateMessage.IMAGE_LOADED));
    }
}