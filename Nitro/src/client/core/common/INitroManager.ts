import { EventDispatcher } from '../events/EventDispatcher';
import { IEventDispatcher } from '../events/IEventDispatcher';
import { IDisposable } from './disposable/IDisposable';
import { INitroLogger } from './logger/INitroLogger';
import { NitroLogger } from './logger/NitroLogger';

export interface INitroManager extends IDisposable
{
    init(): void

    reload(): void

    logger: INitroLogger

    events: IEventDispatcher

    isLoaded: boolean

    isLoading: boolean
}