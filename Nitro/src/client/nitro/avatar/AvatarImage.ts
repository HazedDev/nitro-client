import { ConvolutionFilter } from '@pixi/filter-convolution';
import { IGraphicAsset } from '../../room/object/visualization/utils/IGraphicAsset';
import { TextureUtils } from '../../room/utils/TextureUtils';
import { Nitro } from '../Nitro';
import { ActiveActionData } from './actions/ActiveActionData';
import { IActionDefinition } from './actions/IActionDefinition';
import { IActiveActionData } from './actions/IActiveActionData';
import { AssetAliasCollection } from './alias/AssetAliasCollection';
import { IAnimationLayerData } from './animation/IAnimationLayerData';
import { IAvatarDataContainer } from './animation/IAvatarDataContainer';
import { ISpriteDataContainer } from './animation/ISpriteDataContainer';
import { AvatarFigureContainer } from './AvatarFigureContainer';
import { AvatarStructure } from './AvatarStructure';
import { AvatarImageCache } from './cache/AvatarImageCache';
import { EffectAssetDownloadManager } from './EffectAssetDownloadManager';
import { AvatarAction } from './enum/AvatarAction';
import { AvatarDirectionAngle } from './enum/AvatarDirectionAngle';
import { AvatarScaleType } from './enum/AvatarScaleType';
import { AvatarSetType } from './enum/AvatarSetType';
import { IAvatarEffectListener } from './IAvatarEffectListener';
import { IAvatarFigureContainer } from './IAvatarFigureContainer';
import { IAvatarImage } from './IAvatarImage';
import { IPartColor } from './structure/figure/IPartColor';

export class AvatarImage implements IAvatarImage, IAvatarEffectListener
{
    private static CHANNELS_EQUAL: string       = 'CHANNELS_EQUAL';
    private static CHANNELS_UNIQUE: string      = 'CHANNELS_UNIQUE';
    private static CHANNELS_RED: string         = 'CHANNELS_RED';
    private static CHANNELS_GREEN: string       = 'CHANNELS_GREEN';
    private static CHANNELS_BLUE: string        = 'CHANNELS_BLUE';
    private static CHANNELS_SATURATED: string   = 'CHANNELS_SATURATED';
    private static DEFAULT: string              = 'Default';
    private static _Str_1301: number            = 2;
    private static _Str_1501: string            = AvatarSetType.FULL;

    protected _Str_581: AvatarStructure;
    protected _Str_842: string;
    protected _Str_1668: number;
    protected _Str_1374: number;
    protected _Str_1708:IActiveActionData;
    protected _disposed: boolean;
    protected _Str_903: number[];
    protected _assets:AssetAliasCollection;
    protected _Str_586: AvatarImageCache;
    protected _Str_1710: AvatarFigureContainer;
    protected _Str_2121: IAvatarDataContainer;
    protected _Str_614: ActiveActionData[];
    protected _Str_671: PIXI.RenderTexture;

    private _Str_612: IActiveActionData;
    private _Str_1724: number = 0;
    private _Str_1005: number = 0;
    private _Str_1535: boolean;
    private _Str_1786: ISpriteDataContainer[];
    private _Str_1222: boolean;
    private _Str_2091: boolean = false;
    private _Str_2143: boolean = false;
    private _Str_1163: IActiveActionData[];
    private _Str_1566: string;
    private _Str_1306: string;
    private _Str_864: Map<string, PIXI.RenderTexture>;
    protected _Str_1586: boolean = false;
    private _Str_2042: boolean;
    private _Str_1514: number = -1;
    private _Str_2146: number;
    private _Str_1945: string[];
    private _Str_1949: number = -1;
    private _Str_1499: string = null;
    private _Str_1992: string = null;
    private _Str_1210:EffectAssetDownloadManager;
    private _Str_1153: IAvatarEffectListener;

    constructor(k: AvatarStructure, _arg_2: AssetAliasCollection, _arg_3: AvatarFigureContainer, _arg_4: string, _arg_5: EffectAssetDownloadManager, _arg_6: IAvatarEffectListener = null)
    {
        this._Str_903 = [];
        this._Str_614 = [];
        this._Str_1945 = [];
        this._Str_1535 = true;
        this._disposed = false;
        this._Str_1210 = _arg_5;
        this._Str_581 = k;
        this._assets = _arg_2;
        this._Str_842 = _arg_4;
        this._Str_1153 = _arg_6;
        if (this._Str_842 == null)
        {
            this._Str_842 = AvatarScaleType.LARGE;
        }
        if (_arg_3 == null)
        {
            _arg_3 = new AvatarFigureContainer('hr-893-45.hd-180-2.ch-210-66.lg-270-82.sh-300-91.wa-2007-.ri-1-');
        }
        this._Str_1710 = _arg_3;
        this._Str_586 = new AvatarImageCache(this._Str_581, this, this._assets, this._Str_842);
        this.setDirection(AvatarImage._Str_1501, AvatarImage._Str_1301);
        this._Str_614 = [];
        this._Str_612 = new ActiveActionData(AvatarAction.POSTURE_STAND);
        this._Str_612._Str_742 = this._Str_581._Str_1675(AvatarImage.DEFAULT);
        this._Str_1632();
        this._Str_864 = new Map();
        this._Str_2146 = 0;
    }

    public _Str_1009(): any[]
    {
        this._Str_1972(AvatarSetType.FULL);
        
        return this._Str_586._Str_1009();
    }

    public dispose(): void
    {
        if(this._disposed) return;

        this._Str_581 = null;
        this._assets = null;
        this._Str_1708 = null;
        this._Str_1710 = null;
        this._Str_2121 = null;
        this._Str_614 = null;

        if(this._Str_671)
        {
            this._Str_671.destroy();

            this._Str_671 = null;
        }

        if(this._Str_586)
        {
            this._Str_586.dispose();
            this._Str_586 = null;
        }

        if(this._Str_864)
        {
            for(let k of this._Str_864.values()) if(k) k.destroy();

            this._Str_864 = null;
        }

        this._Str_671 = null;
        this._Str_903 = null;
        this._disposed = true;
    }

    public get disposed(): boolean
    {
        return this._disposed;
    }

    public _Str_784(): IAvatarFigureContainer
    {
        return this._Str_1710;
    }

    public _Str_797(): string
    {
        return this._Str_842;
    }

    public _Str_867(k: string): IPartColor
    {
        return this._Str_581._Str_867(this._Str_1710, k);
    }

    public setDirection(k: string, _arg_2: number): void
    {
        _arg_2 = (_arg_2 + this._Str_1005);

        if(_arg_2 < AvatarDirectionAngle.MIN_DIRECTION)
        {
            _arg_2 = (AvatarDirectionAngle.MAX_DIRECTION + (_arg_2 + 1));
        }

        if(_arg_2 > AvatarDirectionAngle.MAX_DIRECTION)
        {
            _arg_2 = (_arg_2 - (AvatarDirectionAngle.MAX_DIRECTION + 1));
        }

        if(this._Str_581._Str_1939(k))
        {
            this._Str_1668 = _arg_2;
        }

        if((k === AvatarSetType.HEAD) || (k === AvatarSetType.FULL))
        {
            if((k === AvatarSetType.HEAD) && (this._Str_1285()))
            {
                _arg_2 = this._Str_1668;
            }

            this._Str_1374 = _arg_2;
        }

        this._Str_586.setDirection(k, _arg_2);
        this._Str_1535 = true;
    }

    public _Str_880(k: string, _arg_2: number): void
    {
        var _local_3: number;
        _local_3 = Math.floor(_arg_2 / 45);

        this.setDirection(k, _local_3);
    }

    public _Str_754(): ISpriteDataContainer[]
    {
        return this._Str_1786;
    }

    public _Str_781(): number[]
    {
        return this._Str_903;
    }

    public _Str_607(k: ISpriteDataContainer): IAnimationLayerData
    {
        return this._Str_581._Str_1881(k.animation.id, this._Str_1724, k.id);
    }

    public _Str_953(k: number=1): void
    {
        this._Str_1724 += k;
        this._Str_1535 = true;
    }

    public _Str_833(): void
    {
        this._Str_1724 = 0;
        this._Str_1535 = true;
    }

    private _Str_1469(): string
    {
        var k:IActiveActionData;
        var _local_2: number;
        if (!this._Str_2042)
        {
            return null;
        }
        if (((this._Str_1163.length == 1) && (this._Str_1668 == this._Str_1374)))
        {
            return (this._Str_1668 + this._Str_1306) + (this._Str_1724 % 4);
        }
        if (this._Str_1163.length == 2)
        {
            for(let k of this._Str_1163)
            {
                if (((k._Str_695 == 'fx') && ((((k._Str_727 == '33') || (k._Str_727 == '34')) || (k._Str_727 == '35')) || (k._Str_727 == '36'))))
                {
                    return (this._Str_1668 + this._Str_1306) + 0;
                }
                if (((k._Str_695 == 'fx') && ((k._Str_727 == '38') || (k._Str_727 == '39'))))
                {
                    _local_2 = (this._Str_1724 % 11);
                    return (((this._Str_1668 + '_') + this._Str_1374) + this._Str_1306) + _local_2;
                }
            }
        }
        return null;
    }

    private _Str_755(k: string, _arg_2: string, _arg_3: number): string[]
    {
        if ((((!(_arg_3 == this._Str_1949)) || (!(_arg_2 == this._Str_1499))) || (!(k == this._Str_1992))))
        {
            this._Str_1949 = _arg_3;
            this._Str_1499 = _arg_2;
            this._Str_1992 = k;
            this._Str_1945 = this._Str_581._Str_755(k, _arg_2, _arg_3);
        }
        return this._Str_1945;
    }

    public _Str_1972(k: string): void
    {
        var _local_4: string;
        if (this._Str_1708 == null)
        {
            return;
        }
        var _local_2 = this._Str_581._Str_1664(this._Str_842, this._Str_1708._Str_742._Str_868);
        if (_local_2 == null)
        {
            return;
        }
        var _local_3 = this._Str_755(k, this._Str_1708._Str_742._Str_868, this._Str_1668);
        var _local_6 = (_local_3.length - 1);
        while (_local_6 >= 0)
        {
            _local_4 = _local_3[_local_6];
            const _local_5 = this._Str_586._Str_1629(_local_4, this._Str_1724, true);
            _local_6--;
        }
    }

    public getImage(setType: string, hightlight: boolean, scale: number = 1): PIXI.RenderTexture
    {
        if(!this._Str_1535) return this._Str_671;

        if(!this._Str_1708) return null;

        if(!this._Str_2143) this._Str_962();

        const _local_4 = this._Str_1469();

        if(_local_4)
        {
            if(this.getFullImage(_local_4))
            {
                this._Str_1535 = false;

                if(hightlight) return (this.getFullImage(_local_4).clone() as PIXI.RenderTexture);

                this._Str_671   = this.getFullImage(_local_4);
                this._Str_1586  = true;

                return this._Str_671;
            }
        }

        const avatarCanvas = this._Str_581._Str_1664(this._Str_842, this._Str_1708._Str_742._Str_868);

        if(!avatarCanvas) return null;

        if((this._Str_1586 || (this._Str_671 == null)) || ((!(this._Str_671.width == avatarCanvas.width)) || (!(this._Str_671.height == avatarCanvas.height))))
        {
            if(this._Str_671 && !this._Str_1586) this._Str_671.destroy();

            this._Str_671   = null;
            this._Str_1586  = false;
        }

        const _local_6 = this._Str_755(setType, this._Str_1708._Str_742._Str_868, this._Str_1668);

        this._Str_671 = null;

        const container = new PIXI.Container();

        var _local_11 = true;
        var _local_12 = (_local_6.length - 1);

        while(_local_12 >= 0)
        {
            const _local_7 = _local_6[_local_12];
            const _local_8 = this._Str_586._Str_1629(_local_7, this._Str_1724);

            if(_local_8)
            {
                const _local_9 = _local_8.image;

                _local_11 = ((_local_11) && (_local_8._Str_1807));

                let _local_10 = _local_8._Str_1076.clone();

                _local_10.x += avatarCanvas.offset.x;
                _local_10.y += avatarCanvas.offset.y;

                if(_local_9 && _local_10)
                {
                    _local_10.x += avatarCanvas._Str_1076.x;
                    _local_10.y += avatarCanvas._Str_1076.y;

                    const sprite = PIXI.Sprite.from(_local_9);

                    if(sprite)
                    {
                        sprite.position.set(_local_10.x, _local_10.y);

                        container.addChild(sprite);
                    }
                }
            }

            _local_12--;
        }

        const texture = TextureUtils.generateTexture(container, new PIXI.Rectangle(0, 0, avatarCanvas.width, avatarCanvas.height));

        if(!texture) return null;
        
        this._Str_671   = texture;
        this._Str_1535  = false;

        if(this._Str_2121)
        {
            if(this._Str_2121._Str_832)
            {
                let avatarImage = this._Str_1894(this._Str_671);

                this.applyPalette(avatarImage, this._Str_2121.reds);

                if(this._Str_671) this._Str_671.destroy();

                this._Str_671 = avatarImage;
            }
        }

        if (((!(_local_4 == null)) && (_local_11)))
        {
            this.cacheFullImage(_local_4, (this._Str_671.clone() as PIXI.RenderTexture));
        }

        if(scale !== 1)
        {
            const matrix = new PIXI.Matrix();

            matrix.scale(scale, scale);

            const graphic = new PIXI.Graphics();

            graphic
                .beginTextureFill({ texture: this._Str_671, matrix })
                .drawRect(0, 0, (this._Str_671.width * scale), (this._Str_671.height * scale))
                .endFill();

            const texture = TextureUtils.generateTexture(graphic);

            if(texture) this._Str_671 = texture;
        }

        if(this._Str_671 && hightlight) return (this._Str_671.clone() as PIXI.RenderTexture);
        
        return this._Str_671;
    }

    private _Str_1901(): ConvolutionFilter
    {
        var k = 8;
        var _local_2 = (k / -100);
        var _local_3 = ((_local_2 * -8) + 1);
        var _local_4 = [_local_2, _local_2, _local_2, _local_2, _local_3, _local_2, _local_2, _local_2, _local_2];
        return new ConvolutionFilter(_local_4, 3, 3);
    }

    private _Str_1894(k: PIXI.Texture, _arg_2: string = 'CHANNELS_EQUAL'): PIXI.RenderTexture
    {
        let _local_3 = 0.33;
        let _local_4 = 0.33;
        let _local_5 = 0.33;
        let _local_6 = 1;

        switch (_arg_2)
        {
            case "CHANNELS_UNIQUE":
                _local_3 = 0.3;
                _local_4 = 0.59;
                _local_5 = 0.11;
                break;
            case "CHANNELS_RED":
                _local_3 = 1;
                _local_4 = 0;
                _local_5 = 0;
                break;
            case "CHANNELS_GREEN":
                _local_3 = 0;
                _local_4 = 1;
                _local_5 = 0;
                break;
            case "CHANNELS_BLUE":
                _local_3 = 0;
                _local_4 = 0;
                _local_5 = 1;
                break;
            case "CHANNELS_DESATURATED":
                _local_3 = 0.3086;
                _local_4 = 0.6094;
                _local_5 = 0.082;
                break;
        }

        const colorFilter = new PIXI.filters.ColorMatrixFilter();

        colorFilter.matrix = [_local_3, _local_4, _local_5, 0, 0, _local_3, _local_4, _local_5, 0, 0, _local_3, _local_4, _local_5, 0, 0, 0, 0, 0, 1, 0];

        const sprite = PIXI.Sprite.from(k);

        if(sprite)
        {
            sprite.filters = [ colorFilter ];

            return TextureUtils.generateTexture(sprite, new PIXI.Rectangle(0, 0, k.width, k.height));
        }

        return null;
    }

    private applyPalette(texture: PIXI.Texture, reds: number[] = null, greens: number[] = null, blues: [] = null, alphas: number[] = null): PIXI.Texture
    {
        const sprite            = PIXI.Sprite.from(texture);
        const textureCanvas     = Nitro.instance.renderer.extract.canvas(sprite);
        const textureCtx        = textureCanvas.getContext('2d');
        const textureImageData  = textureCtx.getImageData(0, 0, textureCanvas.width, textureCanvas.height);
        const data              = textureImageData.data;

        for(let i = 0; i < data.length; i += 4)
        {
            var r = i;
			var g = i + 1;
			var b = i + 2;
            var a = i + 3;
            
			var red = (reds) ? reds[data[r]] : data[r] << 16;
			var green = (greens) ? greens[data[g]] : data[g] << 8;
			var blue = (blues) ? blues[data[b]] : data[b];
            var alpha = (alphas) ? alphas[data[a]] : (data[a] << 24) >>> 0;
            
			data[r] = ((red >> 16 & 0xFF) + (green >> 16 & 0xFF) + (blue >> 16 & 0xFF) + (alpha >> 16 & 0xFF)) % 256;
			data[g] = ((red >> 8 & 0xFF) + (green >> 8 & 0xFF) + (blue >> 8 & 0xFF) + (alpha >> 8 & 0xFF)) % 256;
			data[b] = ((red & 0xFF) + (green & 0xFF) + (blue & 0xFF) + (alpha & 0xFF)) % 256;
            data[a] = ((red >> 24 & 0xFF) + (green >> 24 & 0xFF) + (blue >> 24 & 0xFF) + (alpha >> 24 & 0xFF)) % 256;
        }

        textureCtx.putImageData(textureImageData, 0, 0);

        return PIXI.Texture.from(textureCanvas);
    }

    public getCroppedImage(setType: string, scale: number = 1): HTMLImageElement
    {
        if(!this._Str_1708) return null;

        if(!this._Str_2143) this._Str_962();

        const avatarCanvas = this._Str_581._Str_1664(this._Str_842, this._Str_1708._Str_742._Str_868);

        if(!avatarCanvas) return null;

        const setTypes = this._Str_755(setType, this._Str_1708._Str_742._Str_868, this._Str_1668);

        const container = new PIXI.Container();

        let _local_12 = (setTypes.length - 1);

        while(_local_12 >= 0)
        {
            const set       = setTypes[_local_12];
            const bodyPart  = this._Str_586._Str_1629(set, this._Str_1724);

            if(bodyPart)
            {
                const texture = bodyPart.image;

                if(!texture)
                {
                    container.destroy();

                    return null;
                }

                const offset = bodyPart._Str_1076;
                const sprite = PIXI.Sprite.from(texture);

                sprite.x = offset.x;
                sprite.y = offset.y;

                container.addChild(sprite);
            }

            _local_12--;
        }

        const image = Nitro.instance.renderer.extract.image(container);

        if(!image) return null;
        
        return image;
    }

    protected getFullImage(k: string): PIXI.RenderTexture
    {
        return (this._Str_864.get(k) || null);
    }

    protected cacheFullImage(k: string, _arg_2: PIXI.RenderTexture): void
    {
        let existing = this._Str_864.get(k);

        if(existing)
        {
            existing.destroy();

            this._Str_864.delete(k);

            existing = _arg_2;
        }

        this._Str_864.set(k, existing);
    }

    public getAsset(k: string): IGraphicAsset
    {
        return this._assets.getAsset(k);
    }

    public getDirection(): number
    {
        return this._Str_1668;
    }

    public _Str_913(): void
    {
        this._Str_614 = [];
        this._Str_2143 = false;
        this._Str_1306 = '';
        this._Str_2042 = false;
    }

    public _Str_962(): void
    {
        var k:ActiveActionData;

        if(!this._Str_711()) return;
        
        for(let k of this._Str_1163)
        {
            if(k._Str_695 === AvatarAction.EFFECT)
            {
                if(!this._Str_1210.isAvatarEffectReady(parseInt(k._Str_727))) this._Str_1210.downloadAvatarEffect(parseInt(k._Str_727), this);
            }
        }

        this._Str_1632();
        this._Str_1679();
    }

    public appendAction(k: string, ..._args: any[]): boolean
    {
        let _local_3 = '';

        this._Str_2143 = false;

        if(_args && (_args.length > 0)) _local_3 = _args[0];

        if((_local_3 !== undefined) && (_local_3 !== null)) _local_3 = _local_3.toString();

        switch(k)
        {
            case AvatarAction.POSTURE:
                switch (_local_3)
                {
                    case AvatarAction.POSTURE_LAY:
                        if (this._Str_1668 == 0)
                        {
                            this.setDirection(AvatarSetType.FULL, 4);
                        }
                        else
                        {
                            this.setDirection(AvatarSetType.FULL, 2);
                        }
                    case AvatarAction.POSTURE_WALK:
                        this._Str_2042 = true;
                    case AvatarAction.POSTURE_STAND:
                        this._Str_2042 = true;
                    case AvatarAction.POSTURE_SWIM:
                    case AvatarAction.POSTURE_FLOAT:
                    case AvatarAction.POSTURE_SIT:
                    case AvatarAction.SNOWWAR_RUN:
                    case AvatarAction.SNOWWAR_DIE_FRONT:
                    case AvatarAction.SNOWWAR_DIE_BACK:
                    case AvatarAction.SNOWWAR_PICK:
                    case AvatarAction.SNOWWAR_THROW:
                        this._Str_1182(_local_3);
                        break;
                }
                break;
            case AvatarAction.GESTURE:
                switch (_local_3)
                {
                    case AvatarAction.GESTURE_AGGRAVATED:
                    case AvatarAction.GESTURE_SAD:
                    case AvatarAction.GESTURE_SMILE:
                    case AvatarAction.GESTURE_SURPRISED:
                        this._Str_1182(_local_3);
                        break;
                }
                break;
            case AvatarAction.EFFECT:
                if((((((_local_3 === '33') || (_local_3 === '34')) || (_local_3 === '35')) || (_local_3 === '36')) || (_local_3 === '38')) || (_local_3 === '39'))
                {
                    this._Str_2042 = true;
                }
            case AvatarAction.DANCE:
            case AvatarAction.TALK:
            case AvatarAction.EXPRESSION_WAVE:
            case AvatarAction.SLEEP:
            case AvatarAction.SIGN:
            case AvatarAction.EXPRESSION_RESPECT:
            case AvatarAction.EXPRESSION_BLOW_A_KISS:
            case AvatarAction.EXPRESSION_LAUGH:
            case AvatarAction.EXPRESSION_CRY:
            case AvatarAction.EXPRESSION_IDLE:
            case AvatarAction.EXPRESSION_SNOWBOARD_OLLIE:
            case AvatarAction.EXPRESSION_SNOWBORD_360:
            case AvatarAction.EXPRESSION_RIDE_JUMP:
                this._Str_1182(k, _local_3);
                break;
            case AvatarAction.CARRY_OBJECT:
            case AvatarAction.USE_OBJECT:
                const _local_4 = this._Str_581._Str_2018(k);
                if(_local_4) _local_3 = _local_4._Str_1350(_local_3);
                this._Str_1182(k, _local_3);
                break;
        }
        
        return true;
    }

    protected _Str_1182(k: string, _arg_2: string=''): void
    {
        var _local_3:ActiveActionData;
        if(!this._Str_614) this._Str_614 = [];

        var _local_4: number = 0;
        while (_local_4 < this._Str_614.length)
        {
            _local_3 = this._Str_614[_local_4];
            if (((_local_3._Str_695 == k) && (_local_3._Str_727 == _arg_2)))
            {
                return;
            }
            _local_4++;
        }
        this._Str_614.push(new ActiveActionData(k, _arg_2, this._Str_1724));
    }

    public _Str_899(): boolean
    {
        return (this._Str_1222) || (this._Str_2146 > 1);
    }

    private _Str_1632(): boolean
    {
        this._Str_2091 = false;
        this._Str_1222 = false;
        this._Str_1786 = [];
        this._Str_2121 = null;
        this._Str_1005 = 0;
        this._Str_581._Str_2101(this);
        this._Str_1708 = this._Str_612;
        this._Str_1708._Str_742 = this._Str_612._Str_742;
        this._Str_741(this._Str_612);
        return true;
    }

    private _Str_1285(): boolean
    {
        var _local_2: IActionDefinition;
        var _local_3: ActiveActionData;
        var k: boolean;
        if (this._Str_1163 == null)
        {
            return false;
        }
        for(let _local_3 of this._Str_1163)
        {
            _local_2 = this._Str_581._Str_2018(_local_3._Str_695);
            if (((!(_local_2 == null)) && (_local_2._Str_715(_local_3._Str_727))))
            {
                k = true;
            }
        }
        return k;
    }

    private _Str_711(): boolean
    {
        var _local_2: boolean;
        var _local_3: boolean;
        var _local_4:ActiveActionData;
        var _local_5: number;
        var k: boolean;

        this._Str_1306 = '';
        this._Str_1163 = this._Str_581._Str_711(this._Str_614);
        this._Str_2146 = this._Str_581._Str_1936(this._Str_1163);

        if(!this._Str_1163)
        {
            this._Str_903 = [ 0, 0, 0 ];

            if(this._Str_1566 !== '')
            {
                k = true;

                this._Str_1566 = '';
            }
        }
        else
        {
            this._Str_903 = this._Str_581._Str_781(this._Str_1163, this._Str_842, this._Str_1668);

            for(let _local_4 of this._Str_1163)
            {
                this._Str_1306 = (this._Str_1306 + (_local_4._Str_695 + _local_4._Str_727));

                if(_local_4._Str_695 === AvatarAction.EFFECT)
                {
                    const _local_5 = parseInt(_local_4._Str_727);

                    if(this._Str_1514 !== _local_5) _local_2 = true;

                    this._Str_1514 = _local_5;

                    _local_3 = true;
                }
            }

            if(!_local_3)
            {
                if(this._Str_1514 > -1) _local_2 = true;

                this._Str_1514 = -1;
            }

            if(_local_2) this._Str_586._Str_1086(0);

            if(this._Str_1566 != this._Str_1306)
            {
                k = true;

                this._Str_1566 = this._Str_1306;
            }
        }

        this._Str_2143 = true;

        return k;
    }

    private _Str_1679(): void
    {
        if(!this._Str_1163 == null) return;

        var _local_3: number    = Nitro.instance.time;
        var _local_4: string[]  = [];

        for(let k of this._Str_1163) _local_4.push(k._Str_695);

        for(let k of this._Str_1163)
        {
            if((k && k._Str_742) && k._Str_742._Str_861)
            {
                const _local_2 = this._Str_581._Str_720(((k._Str_742.state + '.') + k._Str_727));

                if(_local_2 && _local_2._Str_1892())
                {
                    const _local_5 = _local_2._Str_1571();

                    if(_local_5)
                    {
                        for(let _local_6 of _local_5)
                        {
                            if(_local_4.indexOf(_local_6) >= 0) k._Str_707 = _local_2._Str_707(_local_6);
                        }
                    }
                }

                if(_local_2 && _local_2.resetOnToggle) this._Str_2091 = true;
            }
        }

        for(let k of this._Str_1163)
        {
            if(!((!(k)) || (!(k._Str_742))))
            {
                if(k._Str_742._Str_861 && (k._Str_727 === '')) k._Str_727 = '1';

                this._Str_1496(k, _local_3);
                
                if(k._Str_742._Str_861)
                {
                    this._Str_1222 = k._Str_742._Str_801(k._Str_727);

                    const _local_2 = this._Str_581._Str_720(((k._Str_742.state + '.') + k._Str_727));

                    if(_local_2)
                    {
                        this._Str_1786 = this._Str_1786.concat(_local_2._Str_786);

                        if(_local_2._Str_776()) this._Str_1005 = _local_2._Str_1493.offset;

                        if(_local_2._Str_872()) this._Str_2121 = _local_2._Str_1475;
                    }
                }
            }
        }
    }

    private _Str_1496(k: IActiveActionData, _arg_2: number): void
    {
        if (((k == null) || (k._Str_742 == null)))
        {
            return;
        }
        if (k._Str_742._Str_778 == '')
        {
            return;
        }
        if (k._Str_742._Str_779)
        {
            this._Str_1708 = k;
            this._Str_586._Str_2014(k._Str_742._Str_868);
        }
        this._Str_586._Str_1565(k, _arg_2);
        this._Str_1535 = true;
    }

    private _Str_741(k: IActiveActionData): void
    {
        if(!k) return;

        if(k._Str_742._Str_778 === '') return;

        if(k._Str_742._Str_779)
        {
            this._Str_1708 = k;
            this._Str_586._Str_2014(k._Str_742._Str_868);
        }

        this._Str_586._Str_741(k);
        this._Str_1535 = true;
    }

    public get _Str_920(): IAvatarDataContainer
    {
        return this._Str_2121;
    }

    private _Str_1591(k: string): void
    {
    }

    private _Str_1511(k: string): void
    {
    }

    public isPlaceholder(): boolean
    {
        return false;
    }

    public _Str_998(): void
    {
        this._Str_1566 = '';
    }

    public get _Str_677(): boolean
    {
        return this._Str_2091;
    }

    public get _Str_792(): string
    {
        return this._Str_1708._Str_695;
    }

    public resetEffect(effect: number): void
    {
        if(effect === this._Str_1514)
        {
            this._Str_1632();
            this._Str_1679();

            this._Str_2091 = true;
            this._Str_1535 = true;

            if(this._Str_1153) this._Str_1153.resetEffect(effect);
        }
    }
}