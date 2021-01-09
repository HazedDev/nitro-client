import { IDisposable } from "../common/disposable/IDisposable";

export interface IEventDispatcher extends IDisposable
{
    disposed: any;
    addEventListener(type: string, callback: Function): void;

    removeEventListener(type: string, callback: any): void;
    
    dispatchEvent(event: Event): boolean;
}