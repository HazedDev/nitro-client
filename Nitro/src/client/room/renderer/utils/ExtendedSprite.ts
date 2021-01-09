import { Nitro } from '../../../nitro/Nitro';

export class ExtendedSprite extends PIXI.Sprite
{
    private _offsetX: number;
    private _offsetY: number;
    private _tag: string;
    private _alphaTolerance: number;
    private _Str_8253: boolean;
    private _clickHandling: boolean;

    private _pairedSpriteId: number;
    private _pairedSpriteUpdateCounter: number;

    constructor(texture?: PIXI.Texture)
    {
        super(texture);
        
        this._offsetX                   = 0;
        this._offsetY                   = 0;
        this._tag                       = '';
        this._alphaTolerance            = 128;
        this._Str_8253                  = false;
        this._clickHandling             = false;

        this._pairedSpriteId            = -1;
        this._pairedSpriteUpdateCounter = -1;
    }

    public needsUpdate(pairedSpriteId: number, pairedSpriteUpdateCounter: number): boolean
    {
        if((this._pairedSpriteId === pairedSpriteId) && (this._pairedSpriteUpdateCounter === pairedSpriteUpdateCounter)) return false;

        this._pairedSpriteId            = pairedSpriteId;
        this._pairedSpriteUpdateCounter = pairedSpriteUpdateCounter;

        return true;
    }

    public setTexture(texture: PIXI.Texture): void
    {
        if(!texture) texture = PIXI.Texture.EMPTY;
        
        if(texture === this.texture) return;

        if(texture === PIXI.Texture.EMPTY)
        {
            this._pairedSpriteId            = -1;
            this._pairedSpriteUpdateCounter = -1;
        }

        this.texture = texture;
    }

    public containsPoint(point: PIXI.Point): boolean
    {        
        return ExtendedSprite.containsPoint(this, point);
    }

    public static containsPoint(sprite: ExtendedSprite, point: PIXI.Point): boolean
    {
        if(!sprite || !point || (sprite.alphaTolerance > 255)) return false;

        if(!(sprite instanceof PIXI.Sprite)) return false;

        if(sprite.blendMode !== PIXI.BLEND_MODES.NORMAL) return;

        const texture       = sprite.texture;
        const baseTexture   = texture.baseTexture;

        if(!texture || !baseTexture || !baseTexture.valid) return false;

        const x = (point.x * sprite.scale.x);
        const y = (point.y * sprite.scale.y);

        if(!sprite.getLocalBounds().contains(x, y)) return false;

        //@ts-ignore
        if(!baseTexture.hitMap || (baseTexture.hitMapLastThreshold !== sprite.alphaTolerance))
        {
            let canvas: HTMLCanvasElement = null;

            if(!baseTexture.resource)
            {
                //@ts-ignore
                if(!texture.getLocalBounds)
                {
                    const tempSprite = PIXI.Sprite.from(texture);

                    canvas = Nitro.instance.renderer.extract.canvas(tempSprite);

                    tempSprite.destroy();
                }
                else
                {
                    canvas = Nitro.instance.renderer.extract.canvas(texture as PIXI.RenderTexture);
                }
            }

            if(!ExtendedSprite.generateHitMap(baseTexture, sprite.alphaTolerance, canvas)) return false;
        }

        //@ts-ignore
        const hitMap        = baseTexture.hitMap;
        const resolution    = baseTexture.resolution;
        const dx            = Math.round((x + texture.frame.x) * resolution);
        const dy            = Math.round((y + texture.frame.y) * resolution);
        //@ts-ignore
        const num           = (dx + (dy * baseTexture.hitMapWidth));
        const num32         = ((num / 32) | 0);
        const numRest       = (num - (num32 * 32));

        return ((hitMap[num32] & (1 << numRest)) !== 0);
    }
    
    private static generateHitMap(baseTexture: PIXI.BaseTexture, threshold: number, tempCanvas: HTMLCanvasElement = null): boolean
    {
        let canvas: HTMLCanvasElement           = null;
        let context: CanvasRenderingContext2D   = null;

        if(tempCanvas)
        {
            canvas  = tempCanvas;
            context = canvas.getContext('2d');
        }
        else
        {
            if(!baseTexture.resource) return false;

            //@ts-ignore
            let source = baseTexture.resource.source as HTMLCanvasElement;

            if(!source) return false;

            if(source.getContext)
            {
                canvas  = source;
                context = canvas.getContext('2d');
            }
            
            else if(source instanceof Image)
            {
                canvas          = document.createElement('canvas');
                canvas.width    = source.width;
                canvas.height   = source.height;
                context         = canvas.getContext('2d');

                context.drawImage(source, 0, 0);
            }

            else return false;
        }

        const width     = canvas.width;
        const height    = canvas.height;
        const imageData = context.getImageData(0, 0, width, height);
        const hitMap    = new Uint32Array(Math.ceil(width * height / 32));
    
        for(let j = 0; j < height; j++)
        {
            for(let i = 0; i < width; i++)
            {
                const num       = j * width + i;
                const num32     = num / 32 | 0;
                const numRest   = num - num32 * 32;
                
                if(imageData.data[(4 * num) + 3] >= threshold) hitMap[num32] |= (1 << numRest);
            }
        }

        //@ts-ignore
        baseTexture.hitMap              = hitMap;
        //@ts-ignore
        baseTexture.hitMapWidth         = width;
        //@ts-ignore
        baseTexture.hitMapLastThreshold = threshold;

        return true;
    }

    public get offsetX(): number
    {
        return this._offsetX;
    }

    public set offsetX(offset: number)
    {
        this._offsetX = offset;
    }

    public get offsetY(): number
    {
        return this._offsetY;
    }

    public set offsetY(offset: number)
    {
        this._offsetY = offset;
    }

    public get tag(): string
    {
        return this._tag;
    }

    public set tag(tag: string)
    {
        this._tag = tag;
    }

    public get alphaTolerance(): number
    {
        return this._alphaTolerance;
    }

    public set alphaTolerance(tolerance: number)
    {
        this._alphaTolerance = tolerance;
    }

    public get _Str_4593(): boolean
    {
        return this._Str_8253;
    }

    public set _Str_4593(flag: boolean)
    {
        this._Str_8253 = flag;
    }

    public get clickHandling(): boolean
    {
        return this._clickHandling;
    }

    public set clickHandling(flag: boolean)
    {
        this._clickHandling = flag;
    }
}