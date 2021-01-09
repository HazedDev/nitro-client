import { NitroEvent } from '../../../core/events/NitroEvent';

export class BadgeImageReadyEvent extends NitroEvent
{
    public static IMAGE_READY: string = 'BIME_BADGE_IMAGE_READY';

    private _badgeId: string;
    private _image: PIXI.Texture;

    constructor(badgeId: string, image: PIXI.Texture)
    {
        super(BadgeImageReadyEvent.IMAGE_READY);

        this._badgeId   = badgeId;
        this._image     = image;
    }

    public get badgeId(): string
    {
        return this._badgeId;
    }

    public get image(): PIXI.Texture
    {
        return this._image;
    }
}