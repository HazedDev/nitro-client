import { IAssetData } from '../../../../core/asset/interfaces';
import { GraphicAsset } from './GraphicAsset';
import { GraphicAssetPalette } from './GraphicAssetPalette';
import { IGraphicAsset } from './IGraphicAsset';

export interface IGraphicAssetCollection
{
    addReference(): void

    removeReference(): void

    define(data: IAssetData): void

    getAsset(name: string): IGraphicAsset

    getAssetWithPalette(name: string, paletteName: string): IGraphicAsset

    getPaletteNames(): string[]

    getPaletteColors(paletteName: string): number[]

    getPalette(name: string): GraphicAssetPalette

    addAsset(name: string, texture: PIXI.Texture, override?: boolean, x?: number, y?: number, flipH?: boolean, flipV?: boolean): boolean

    disposeAsset(name: string): void

    getLibraryAsset(name: string): PIXI.Texture

    referenceCount: number

    referenceTimestamp: number

    name: string

    data: IAssetData

    textures: Map<string, PIXI.Texture>

    assets: Map<string, GraphicAsset>
}