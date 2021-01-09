import { RoomObjectType } from '../../../../../client/nitro/room/object/RoomObjectType';
import { ContextInfoView } from '../contextmenu/ContextInfoView';

export class AvatarContextInfoView extends ContextInfoView
{
    public userId: number       = -1;
    public userName: string     = '';
    public userType: number     = -1;
    public roomIndex: number    = -1;

    public static extendedSetup(view: AvatarContextInfoView, userId: number, userName: string, userType: number, roomIndex: number): void
    {
        view.userId     = userId;
        view.userName   = userName;
        view.userType   = userType;
        view.roomIndex  = roomIndex;

        view.completeSetup();
    }

    protected getOffset(k: PIXI.Rectangle): number
    {
        let y = -(this.activeViewElement.offsetHeight);

        if((this.userType === RoomObjectType.USER) || (this.userType === RoomObjectType.BOT) || (this.userType === RoomObjectType.RENTABLE_BOT))
        {
            y = (y + ((k.height > 50) ? 25 : 0));
        }
        else
        {
            y = (y - 4);
        }

        return y;
    }
}