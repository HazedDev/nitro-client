import { IAssetData } from '../../../../../core/asset/interfaces';
import { RoomObjectVariable } from '../../RoomObjectVariable';
import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

export class FurnitureWindowLogic extends FurnitureMultiStateLogic
{
    public initialize(asset: IAssetData): void
    {
        super.initialize(asset);

        const maskType = (asset.maskType || null);

        if(maskType)
        {
            this.object.model.setValue(RoomObjectVariable.FURNITURE_USES_PLANE_MASK, 1);
            this.object.model.setValue(RoomObjectVariable.FURNITURE_PLANE_MASK_TYPE, maskType);
        }
    }
}