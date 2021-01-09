import { RoomEngineEvent } from './RoomEngineEvent';

export class RoomEngineAnimateIconEvent extends RoomEngineEvent
{
    public static ANIMATE: string = 'REAIE_ANIMATE';

    private _icon: string;
    private _image: HTMLImageElement;
    private _x: number;
    private _y: number;

    constructor(roomId: number, icon: string, image: HTMLImageElement, x: number, y: number)
    {
        super(RoomEngineAnimateIconEvent.ANIMATE, roomId);

        this._icon  = icon;
        this._image = image;
        this._x     = x;
        this._y     = y;
    }

    public get icon(): string
    {
        return this._icon;
    }

    public get image(): HTMLImageElement
    {
        return this._image;
    }

    public get x(): number
    {
        return this._x;
    }

    public get y(): number
    {
        return this._y;
    }
}