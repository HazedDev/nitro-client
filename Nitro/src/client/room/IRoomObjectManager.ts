import { IDisposable } from '../core/common/disposable/IDisposable';
import { AdvancedMap } from '../core/utils/AdvancedMap';
import { IRoomObject } from './object/IRoomObject';

export interface IRoomObjectManager extends IDisposable
{
    getObject(id: number): IRoomObject

    getObjectByIndex(index: number): IRoomObject

    createObject(id: number, stateCount: number, type: string): IRoomObject

    removeObject(id: number|IRoomObject): void

    removeAllObjects(): void

    objects: AdvancedMap<number, IRoomObject>

    totalObjects: number
}