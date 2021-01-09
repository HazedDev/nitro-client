import { Nitro } from '../../nitro/Nitro';

export class RoomEnterEffect 
{
    public static _Str_14599: number = 0;
    public static _Str_11894: number = 1;
    public static _Str_14215: number = 2;
    public static _Str_12882: number = 3;

    private static _Str_621: number     = RoomEnterEffect._Str_14599;
    private static _Str_7125: boolean   = false;
    private static _Str_11007: number;
    private static _Str_12311: number   = 0;
    private static _Str_6886: number    = (20 * 1000);
    private static _Str_7448: number    = 2000;

    public static init(delay: number, duration: number): void
    {
        RoomEnterEffect._Str_11007  = 0;
        RoomEnterEffect._Str_6886   = delay;
        RoomEnterEffect._Str_7448   = duration;
        RoomEnterEffect._Str_12311  = Nitro.instance.time;
        RoomEnterEffect._Str_621    = RoomEnterEffect._Str_11894;
    }

    public static _Str_23419(): void
    {
        if((RoomEnterEffect._Str_621 === RoomEnterEffect._Str_14599) || (RoomEnterEffect._Str_621 === RoomEnterEffect._Str_12882)) return;

        const k = (Nitro.instance.time - RoomEnterEffect._Str_12311);

        if(k > (RoomEnterEffect._Str_6886 + RoomEnterEffect._Str_7448))
        {
            RoomEnterEffect._Str_621 = RoomEnterEffect._Str_12882;

            return;
        }

        RoomEnterEffect._Str_7125 = true;

        if(k < RoomEnterEffect._Str_6886)
        {
            RoomEnterEffect._Str_621 = RoomEnterEffect._Str_11894;

            return;
        }

        RoomEnterEffect._Str_621    = RoomEnterEffect._Str_14215;
        RoomEnterEffect._Str_11007  = ((k - RoomEnterEffect._Str_6886) / RoomEnterEffect._Str_7448);
    }

    public static _Str_22392(): void
    {
        RoomEnterEffect._Str_7125 = false;
    }

    public static _Str_19559(): boolean
    {
        return (RoomEnterEffect._Str_7125) && (RoomEnterEffect._Str_1349());
    }

    public static _Str_1349(): boolean
    {
        if((RoomEnterEffect._Str_621 === RoomEnterEffect._Str_11894) || (RoomEnterEffect._Str_621 === RoomEnterEffect._Str_14215)) return true;

        return false;
    }

    public static _Str_16017(k: number = 0, _arg_2: number = 1): number
    {
        return Math.min(Math.max(RoomEnterEffect._Str_11007, k), _arg_2);
    }

    public static get _Str_17562(): number
    {
        return RoomEnterEffect._Str_6886 + RoomEnterEffect._Str_7448;
    }
}