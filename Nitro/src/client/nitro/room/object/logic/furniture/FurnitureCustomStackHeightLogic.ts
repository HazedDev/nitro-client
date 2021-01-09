import { IAssetData } from '../../../../../core/asset/interfaces';
import { RoomObjectVariable } from '../../RoomObjectVariable';
import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureCustomStackHeightLogic extends FurnitureLogic
{
    public initialize(asset: IAssetData)
    {
        super.initialize(asset);

        if(this.object && this.object.model) this.object.model.setValue(RoomObjectVariable.FURNITURE_ALWAYS_STACKABLE, 1);
    }
}