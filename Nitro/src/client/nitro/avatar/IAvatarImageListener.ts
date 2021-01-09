import { IDisposable } from 'src/client/core/common/disposable/IDisposable';

export interface IAvatarImageListener extends IDisposable {
    disposed: any;
    resetFigure(figure: string);
    
}