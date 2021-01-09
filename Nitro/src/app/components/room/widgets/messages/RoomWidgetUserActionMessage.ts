import { RoomWidgetMessage } from '../../../../../client/nitro/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetUserActionMessage extends RoomWidgetMessage
{
    public static RWUAM_WHISPER_USER: string = 'RWUAM_WHISPER_USER';
    public static RWUAM_IGNORE_USER: string = 'RWUAM_IGNORE_USER';
    public static RWUAM_IGNORE_USER_BUBBLE: string = 'RWUAM_IGNORE_USER_BUBBLE';
    public static RWUAM_UNIGNORE_USER: string = 'RWUAM_UNIGNORE_USER';
    public static RWUAM_KICK_USER: string = 'RWUAM_KICK_USER';
    public static RWUAM_BAN_USER_HOUR: string = 'RWUAM_BAN_USER_HOUR';
    public static RWUAM_BAN_USER_DAY: string = 'RWUAM_BAN_USER_DAY';
    public static RWUAM_BAN_USER_PERM: string = 'RWUAM_BAN_USER_PERM';
    public static MUTE_USER_2MIN: string = 'RWUAM_MUTE_USER_2MIN';
    public static MUTE_USER_5MIN: string = 'RWUAM_MUTE_USER_5MIN';
    public static MUTE_USER_10MIN: string = 'RWUAM_MUTE_USER_10MIN';
    public static RWUAM_SEND_FRIEND_REQUEST: string = 'RWUAM_SEND_FRIEND_REQUEST';
    public static RWUAM_RESPECT_USER: string = 'RWUAM_RESPECT_USER';
    public static RWUAM_GIVE_RIGHTS: string = 'RWUAM_GIVE_RIGHTS';
    public static RWUAM_TAKE_RIGHTS: string = 'RWUAM_TAKE_RIGHTS';
    public static RWUAM_START_TRADING: string = 'RWUAM_START_TRADING';
    public static RWUAM_OPEN_HOME_PAGE: string = 'RWUAM_OPEN_HOME_PAGE';
    public static RWUAM_REPORT: string = 'RWUAM_REPORT';
    public static RWUAM_PICKUP_PET: string = 'RWUAM_PICKUP_PET';
    public static RWUAM_MOUNT_PET: string = 'RWUAM_MOUNT_PET';
    public static RWUAM_TOGGLE_PET_RIDING_PERMISSION: string = 'RWUAM_TOGGLE_PET_RIDING_PERMISSION';
    public static RWUAM_TOGGLE_PET_BREEDING_PERMISSION: string = 'RWUAM_TOGGLE_PET_BREEDING_PERMISSION';
    public static RWUAM_DISMOUNT_PET: string = 'RWUAM_DISMOUNT_PET';
    public static RWUAM_SADDLE_OFF: string = 'RWUAM_SADDLE_OFF';
    public static RWUAM_TRAIN_PET: string = 'RWUAM_TRAIN_PET';
    public static _Str_6480: string = ' RWUAM_RESPECT_PET';
    public static RWUAM_TREAT_PET: string = 'RWUAM_TREAT_PET';
    public static RWUAM_REQUEST_PET_UPDATE: string = 'RWUAM_REQUEST_PET_UPDATE';
    public static RWUAM_START_NAME_CHANGE: string = 'RWUAM_START_NAME_CHANGE';
    public static RWUAM_PASS_CARRY_ITEM: string = 'RWUAM_PASS_CARRY_ITEM';
    public static RWUAM_DROP_CARRY_ITEM: string = 'RWUAM_DROP_CARRY_ITEM';
    public static RWUAM_GIVE_CARRY_ITEM_TO_PET: string = 'RWUAM_GIVE_CARRY_ITEM_TO_PET';
    public static RWUAM_GIVE_WATER_TO_PET: string = 'RWUAM_GIVE_WATER_TO_PET';
    public static RWUAM_GIVE_LIGHT_TO_PET: string = 'RWUAM_GIVE_LIGHT_TO_PET';
    public static RWUAM_REQUEST_BREED_PET: string = 'RWUAM_REQUEST_BREED_PET';
    public static RWUAM_HARVEST_PET: string = 'RWUAM_HARVEST_PET';
    public static RWUAM_REVIVE_PET: string = 'RWUAM_REVIVE_PET';
    public static RWUAM_COMPOST_PLANT: string = 'RWUAM_COMPOST_PLANT';
    public static RWUAM_GET_BOT_INFO: string = 'RWUAM_GET_BOT_INFO';
    public static RWUAM_REPORT_CFH_OTHER: string = 'RWUAM_REPORT_CFH_OTHER';
    public static RWUAM_AMBASSADOR_ALERT_USER: string = 'RWUAM_AMBASSADOR_ALERT_USER';
    public static RWUAM_AMBASSADOR_KICK_USER: string = 'RWUAM_AMBASSADOR_KICK_USER';
    public static AMBASSADOR_MUTE_USER_2MIN: string = 'RWUAM_AMBASSADOR_MUTE_2MIN';
    public static AMBASSADOR_MUTE_USER_10MIN: string = 'RWUAM_AMBASSADOR_MUTE_10MIN';
    public static AMBASSADOR_MUTE_USER_60MIN: string = 'RWUAM_AMBASSADOR_MUTE_60MIN';
    public static AMBASSADOR_MUTE_USER_18HOUR: string = 'RWUAM_AMBASSADOR_MUTE_18HOUR';

    private _userId: number;

    constructor(k: string, userId: number = 0)
    {
        super(k);

        this._userId = userId;
    }

    public get userId(): number
    {
        return this._userId;
    }
}