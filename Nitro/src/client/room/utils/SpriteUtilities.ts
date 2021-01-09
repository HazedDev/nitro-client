export class SpriteUtilities
{
    public static hex2int(hex: string): number
    {
        return parseInt(hex, 16);
    }

    public static inkToBlendMode(ink: string | number): PIXI.BLEND_MODES
    {
        if(ink == 'ADD' || ink == 33) return PIXI.BLEND_MODES.ADD;

        return PIXI.BLEND_MODES.NORMAL;
    }
}