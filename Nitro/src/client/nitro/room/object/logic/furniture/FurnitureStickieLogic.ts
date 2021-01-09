import { RoomObjectUpdateMessage } from '../../../../../room/messages/RoomObjectUpdateMessage';
import { RoomObjectFurnitureActionEvent } from '../../../events/RoomObjectFurnitureActionEvent';
import { RoomObjectVariable } from '../../RoomObjectVariable';
import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureStickieLogic extends FurnitureLogic
{
    private static STICKIE_COLORS: string[] = [ '9CCEFF', 'FF9CFF', '9CFF9C', 'FFFF33' ];

    public getEventTypes(): string[]
    {
        const types = [ RoomObjectFurnitureActionEvent.STICKIE ];

        return this.mergeTypes(super.getEventTypes(), types);
    }

    public processUpdateMessage(message: RoomObjectUpdateMessage): void
    {
        super.processUpdateMessage(message);

        this.updateColor();
    }

    protected updateColor(): void
    {
        if(!this.object) return;

        const furnitureData = this.object.model.getValue<string>(RoomObjectVariable.FURNITURE_DATA);

        let colorIndex = FurnitureStickieLogic.STICKIE_COLORS.indexOf(furnitureData);

        if(colorIndex < 0) colorIndex = 3;

        this.object.model.setValue(RoomObjectVariable.FURNITURE_COLOR, (colorIndex + 1));
    }
}