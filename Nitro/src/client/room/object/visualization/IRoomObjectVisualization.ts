import { IDisposable } from "src/client/core/common/disposable/IDisposable";
import { IRoomObject } from "../IRoomObject";

export interface IRoomObjectVisualization extends IDisposable {
    object: IRoomObject
}