import { ILoaderOptions } from 'pixi.js';
import { GraphicAssetCollection } from '../../room/object/visualization/utils/GraphicAssetCollection';
import { IGraphicAsset } from '../../room/object/visualization/utils/IGraphicAsset';
import { IGraphicAssetCollection } from '../../room/object/visualization/utils/IGraphicAssetCollection';
import { Disposable } from '../common/disposable/Disposable';
import { IAssetManager } from './IAssetManager';
import { IAssetData } from './interfaces';

export class AssetManager extends Disposable implements IAssetManager
{
    private _textures: Map<string, PIXI.Texture>;
    private _collections: Map<string, GraphicAssetCollection>;
    private _pendingUrls: Map<string, Function[]>;

    constructor()
    {
        super();

        this._textures          = new Map();
        this._collections       = new Map();
        this._pendingUrls       = new Map();
    }

    public static removeFileExtension(name: string): string
    {
        return (name.substring(0, name.lastIndexOf('.')) || name);
    }

    public getTexture(name: string): PIXI.Texture
    {
        if(!name) return null;

        const existing = this._textures.get(AssetManager.removeFileExtension(name));

        if(!existing) return null;

        return existing;
    }

    public setTexture(name: string, texture: PIXI.Texture): void
    {
        if(!name || !texture) return;

        name = AssetManager.removeFileExtension(name);

        this._textures.set(name, texture);
    }

    public getAsset(name: string): IGraphicAsset
    {
        if(!name) return null;

        for(let collection of this._collections.values())
        {
            if(!collection) continue;

            const existing = collection.getAsset(name);

            if(!existing) continue;

            return existing;
        }

        return null;
    }

    public getCollection(name: string): IGraphicAssetCollection
    {
        if(!name) return null;

        const existing = this._collections.get(name);

        if(!existing) return null;

        return existing;
    }

    public createCollection(data: IAssetData, spritesheet: PIXI.Spritesheet): IGraphicAssetCollection
    {
        if(!data) return null;

        const collection = new GraphicAssetCollection(data, spritesheet);

        if(collection)
        {
            for(let [ name, texture ] of collection.textures.entries()) this.setTexture(name, texture);

            this._collections.set(collection.name, collection);
        }
    }

    public downloadAsset(assetUrl: string, cb: Function): boolean
    {
        return this.downloadAssets([ assetUrl ], cb);
    }

    public downloadAssets(assetUrls: string[], cb: Function): boolean
    {
        if(!assetUrls || !assetUrls.length)
        {
            cb(true);

            return true;
        }

        let totalToDownload = assetUrls.length;
        let totalDownloaded = 0;

        const onDownloaded = (loader: PIXI.Loader) =>
        {
            totalDownloaded++;

            if(loader) loader.destroy();

            if(totalDownloaded === totalToDownload) cb(true);
        }

        for(let url of assetUrls)
        {
            if(!url) continue;

            const loader = new PIXI.Loader();

            const options: ILoaderOptions = {
                crossOrigin: false
            }

            loader
                .use((resource: PIXI.LoaderResource, next: Function) => this.assetLoader(loader, resource, next, onDownloaded))
                .add(url, options)
                .load();
        }

        return true;
    }
    
    private assetLoader(loader: PIXI.Loader, resource: PIXI.LoaderResource, next: Function, onDownloaded: Function): void
    {
        if(!resource || resource.error) return next();

        if(resource.type === PIXI.LoaderResource.TYPE.JSON)
        {
            const assetData = (resource.data as IAssetData);

            if(!assetData.type) return;
            
            if(assetData.spritesheet && Object.keys(assetData.spritesheet).length)
            {
                const imageUrl = (resource.url.substring(0, (resource.url.lastIndexOf('/') + 1)) + assetData.spritesheet.meta.image);

                if(!imageUrl) return;

                const baseTexture = PIXI.BaseTexture.from(imageUrl);

                if(baseTexture.valid)
                {
                    const spritesheet = new PIXI.Spritesheet(baseTexture, assetData.spritesheet);

                    spritesheet.parse(textures =>
                    {
                        this.createCollection(assetData, spritesheet);

                        onDownloaded(loader);
                    });
                }
                else
                {
                    baseTexture.once('loaded', () =>
                    {
                        const spritesheet = new PIXI.Spritesheet(baseTexture, assetData.spritesheet);

                        spritesheet.parse(textures =>
                        {
                            this.createCollection(assetData, spritesheet);

                            onDownloaded(loader);
                        });
                    });
                }

                return;
            }
                
            this.createCollection(assetData, null);

            onDownloaded(loader);

            return;
        }

        if(resource.type === PIXI.LoaderResource.TYPE.IMAGE)
        {
            const split = resource.name.split('/');
            const name  = split[(split.length - 1)];

            this.setTexture(name, resource.texture);

            onDownloaded(loader);

            return;
        }
    }

    public get collections(): Map<string, GraphicAssetCollection>
    {
        return this._collections;
    }
}