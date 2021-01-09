import { IRoomObject } from '../object/IRoomObject';
import { IRoomRenderingCanvas } from './IRoomRenderingCanvas';

export interface IRoomRenderer
{
    getInstanceId(object: IRoomObject): number

    getRoomObject(instanceId: number): IRoomObject

    getCanvas(id: number): IRoomRenderingCanvas

    createCanvas(id: number, width: number, height: number, scale: number): IRoomRenderingCanvas

    removeCanvas(id: number): void

    objects: Map<number, IRoomObject>

    roomObjectVariableAccurateZ: string
}