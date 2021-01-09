import { IDisposable } from "src/client/core/common/disposable/IDisposable";
import { IEventDispatcher } from "src/client/core/events/IEventDispatcher";

export interface IRoomWidget extends IDisposable {
    registerUpdateEvents(events: IEventDispatcher);
    messageListener: any;
    widgetHandler: any;
}