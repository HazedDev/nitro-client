import { TextureUtils } from './TextureUtils';

export class Rasterizer 
{
    public static _Str_16640(k: PIXI.Texture): PIXI.Texture
    {
        if(!k) return null;

        const matrix = new PIXI.Matrix();

        matrix.scale(-1, 1);
        matrix.translate(k.width, 0);

        const graphic = new PIXI.Graphics();

        graphic
            .beginTextureFill({
                texture: k,
                matrix
            })
            .drawRect(0, 0, k.width, k.height)
            .endFill();

        return TextureUtils.generateTexture(graphic);
    }

    public static _Str_20706(k: PIXI.Texture): PIXI.Texture
    {
        if(!k) return null;

        const matrix = new PIXI.Matrix();

        matrix.scale(1, -1);
        matrix.translate(0, k.height);

        const graphic = new PIXI.Graphics();

        graphic
            .beginTextureFill({
                texture: k,
                matrix
            })
            .drawRect(0, 0, k.width, k.height)
            .endFill();

        return TextureUtils.generateTexture(graphic);
    }

    public static _Str_20356(k: PIXI.Texture): PIXI.Texture
    {
        if(!k) return null;

        const matrix = new PIXI.Matrix();

        matrix.scale(-1, -1);
        matrix.translate(k.width, k.height);

        const graphic = new PIXI.Graphics();

        graphic
            .beginTextureFill({
                texture: k,
                matrix
            })
            .drawRect(0, 0, k.width, k.height)
            .endFill();

        return TextureUtils.generateTexture(graphic);
    }
}