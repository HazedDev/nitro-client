import { IDisposable } from "src/client/core/common/disposable/IDisposable";
import { IRoomObject } from "../object/IRoomObject";
import { IRoomRenderer } from "./IRoomRenderer";

export interface IRoomRendererBase extends IDisposable, IRoomRenderer {
    update(time: number);
    reset(): void

    addObject(object: IRoomObject): void

    removeObject(object: IRoomObject): void
}