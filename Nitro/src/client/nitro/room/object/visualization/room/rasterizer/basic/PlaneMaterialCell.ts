import { IGraphicAsset } from '../../../../../../../room/object/visualization/utils/IGraphicAsset';
import { IVector3D } from '../../../../../../../room/utils/IVector3D';
import { TextureUtils } from '../../../../../../../room/utils/TextureUtils';
import { Randomizer } from '../../utils/Randomizer';
import { PlaneTexture } from './PlaneTexture';

export class PlaneMaterialCell 
{
    private _cachedBitmapData: PIXI.Graphics;
    private _texture: PlaneTexture;
    private _extraItemOffsets: PIXI.Point[];
    private _extraItemAssets: IGraphicAsset[];
    private _extraItemCount: number = 0;

    constructor(k: PlaneTexture, _arg_2: IGraphicAsset[] = null, _arg_3: PIXI.Point[] = null, _arg_4: number = 0)
    {
        this._cachedBitmapData  = null;
        this._texture           = k;
        this._extraItemOffsets  = [];
        this._extraItemAssets   = [];
        this._extraItemCount    = 0;

        if(_arg_2 && _arg_2.length && (_arg_4 > 0))
        {
            let assetIndex = 0;

            while(assetIndex < _arg_2.length)
            {
                const graphic = _arg_2[assetIndex];

                if(graphic) this._extraItemAssets.push(graphic);

                assetIndex++;
            }

            if(this._extraItemAssets.length)
            {
                if(_arg_3)
                {
                    let pointIndex = 0;

                    while(pointIndex < _arg_3.length)
                    {
                        const point = _arg_3[pointIndex];

                        if(point) this._extraItemOffsets.push(new PIXI.Point(point.x, point.y));

                        pointIndex++;
                    }
                }

                this._extraItemCount = _arg_4;
            }
        }
    }

    public get isStatic(): boolean
    {
        return this._extraItemCount == 0;
    }

    public dispose(): void
    {
        if(this._texture)
        {
            this._texture.dispose();

            this._texture = null;
        }

        if(this._cachedBitmapData)
        {
            this._cachedBitmapData.destroy();

            this._cachedBitmapData = null;
        }

        this._extraItemAssets   = null;
        this._extraItemOffsets  = null;
        this._extraItemCount    = 0;
    }

    public _Str_3355(): void
    {
        if(this._cachedBitmapData)
        {
            this._cachedBitmapData.destroy();

            this._cachedBitmapData = null;
        }
    }

    public _Str_9599(k: IVector3D): number
    {
        if(this._texture)
        {
            const texture = this._texture._Str_4913(k);

            if(texture) return texture.height;
        }

        return 0;
    }

    public render(normal: IVector3D, textureOffsetX: number, textureOffsetY: number): PIXI.Graphics
    {
        if(!this._texture) return null;

        const texture = this._texture._Str_4913(normal);

        if(!texture) return null;

        let bitmap = new PIXI.Graphics()
            .beginTextureFill({ texture })
            .drawRect(0, 0, texture.width, texture.height)
            .endFill();

        if((textureOffsetX !== 0) || (textureOffsetY !== 0))
        {
            const sourceBitmap = new PIXI.Graphics()
                .beginFill(0)
                .drawRect(0, 0, (bitmap.width * 2), (bitmap.height * 2))
                .endFill()
                .beginTextureFill({ texture })
                .drawRect(0, 0, bitmap.width, bitmap.height)
                .drawRect(bitmap.width, 0, bitmap.width, bitmap.height)
                .drawRect(0, bitmap.height, bitmap.width, bitmap.height)
                .drawRect(bitmap.width, bitmap.height, bitmap.width, bitmap.height)
                .endFill();

            bitmap = new PIXI.Graphics()
                .beginFill(0)
                .drawRect(0, 0, bitmap.width, bitmap.height)
                .endFill();

            while(textureOffsetX < 0) textureOffsetX += texture.width;

            while(textureOffsetY < 0) textureOffsetY += texture.height;

            const sourceTexture = TextureUtils.generateTexture(sourceBitmap, new PIXI.Rectangle((textureOffsetX % bitmap.width), (textureOffsetY % bitmap.height), texture.width, texture.height));

            if(sourceTexture)
            {
                bitmap
                    .beginTextureFill({ texture: sourceTexture })
                    .drawRect(0, 0, texture.width, texture.height)
                    .endFill();
            }
        }

        if(bitmap)
        {
            if(!this.isStatic)
            {
                if(this._cachedBitmapData)
                {
                    if((this._cachedBitmapData.width !== bitmap.width) || (this._cachedBitmapData.height !== bitmap.height))
                    {
                        this._cachedBitmapData.destroy();

                        this._cachedBitmapData = null;
                    }
                    else
                    {
                        const bitmapTexture = TextureUtils.generateTexture(bitmap, new PIXI.Rectangle(0, 0, bitmap.width, bitmap.height));

                        if(bitmapTexture)
                        {
                            this._cachedBitmapData
                                .beginTextureFill({ texture: bitmapTexture })
                                .drawRect(0, 0, bitmapTexture.width, bitmapTexture.height)
                                .endFill();
                        }
                    }
                }

                if(!this._cachedBitmapData) this._cachedBitmapData = bitmap.clone();

                const limitMin      = Math.min(this._extraItemCount, this._extraItemOffsets.length);
                const limitMax      = Math.max(this._extraItemCount, this._extraItemOffsets.length);
                const offsetIndexes = Randomizer._Str_23572(this._extraItemCount, limitMax);

                let i = 0;

                while (i < limitMin)
                {
                    const offset    = this._extraItemOffsets[offsetIndexes[i]];
                    const item      = this._extraItemAssets[(i % this._extraItemAssets.length)];

                    if(offset && item)
                    {
                        const assetTexture = item.texture;

                        if(assetTexture)
                        {
                            const offsetFinal   = new PIXI.Point((offset.x + item.offsetX), (offset.y + item.offsetY));
                            const flipMatrix    = new PIXI.Matrix();

                            let x           = 1;
                            let y           = 1;
                            let translateX  = 0;
                            let translateY  = 0;

                            if(item.flipH)
                            {
                                x           = -1;
                                translateX  = assetTexture.width;
                            }

                            if(item.flipV)
                            {
                                y           = -1;
                                translateY  = assetTexture.height;
                            }
                            
                            let offsetX = (offsetFinal.x + translateX);
                            offsetX = ((offsetX >> 1) << 1);

                            flipMatrix.scale(x, y);
                            flipMatrix.translate(offsetX, (offsetFinal.y + translateY));

                            this._cachedBitmapData
                                .beginTextureFill({ texture: assetTexture, matrix: flipMatrix })
                                .drawRect(flipMatrix.tx, flipMatrix.ty, assetTexture.width, assetTexture.height)
                                .endFill();
                        }
                    }

                    i++;
                }

                return this._cachedBitmapData;
            }

            return bitmap;
        }

        return null;
    }

    public _Str_2125(k:IVector3D): string
    {
        return (this._texture == null) ? null : this._texture._Str_2125(k);
    }
}