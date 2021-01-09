import { IDisposable } from 'src/client/core/common/disposable/IDisposable';

export interface IAvatarEffectListener extends IDisposable {
    resetEffect(id: number);
}