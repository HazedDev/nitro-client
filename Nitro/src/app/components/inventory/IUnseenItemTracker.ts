import { IDisposable } from "src/client/core/common/disposable/IDisposable";

export interface IUnseenItemTracker extends IDisposable {
    _Str_3613(category: number, id: number): boolean;

}