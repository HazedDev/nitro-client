export interface IGetImageListener {
    imageReady(id: number, arg1?: PIXI.Texture, image?: HTMLImageElement);
    imageFailed(objectId: any);
}