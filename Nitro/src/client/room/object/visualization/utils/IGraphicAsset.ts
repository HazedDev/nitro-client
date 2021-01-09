export class IGraphicAsset implements IGraphicAsset
{
    name: string

    source: string

    texture: PIXI.Texture

    usesPalette: boolean

    x: number

    y: number

    width: number

    height: number

    offsetX: number

    offsetY: number

    flipH: boolean

    flipV: boolean

    rectangle: PIXI.Rectangle
}