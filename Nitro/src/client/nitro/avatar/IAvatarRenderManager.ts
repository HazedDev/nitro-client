import { IAvatarEffectListener } from "./IAvatarEffectListener";
import { IAvatarImage } from './IAvatarImage';
import { IAvatarImageListener } from "./IAvatarImageListener";

export interface IAvatarRenderManager {
    events: any;
    isReady: boolean;
    createAvatarImage(figure: string, LARGE: string, gender: string, avatarListener: IAvatarImageListener, effectListener?: IAvatarEffectListener): IAvatarImage;
    assets: any;
    init();
    dispose();
}