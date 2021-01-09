import { GraphicAssetCollection } from '../../room/object/visualization/utils/GraphicAssetCollection';
import { IGraphicAsset } from '../../room/object/visualization/utils/IGraphicAsset';
import { IGraphicAssetCollection } from '../../room/object/visualization/utils/IGraphicAssetCollection';
import { IAssetData } from './interfaces';

export interface IAssetManager
{
    dispose();
    getTexture(name: string): PIXI.Texture

    setTexture(name: string, texture: PIXI.Texture): void

    getAsset(name: string): IGraphicAsset

    getCollection(name: string): IGraphicAssetCollection

    createCollection(data: IAssetData, spritesheet: PIXI.Spritesheet): IGraphicAssetCollection

    downloadAsset(assetUrl: string, cb: Function): boolean

    downloadAssets(assetUrls: string[], cb: Function): boolean

    collections: Map<string, GraphicAssetCollection>
}