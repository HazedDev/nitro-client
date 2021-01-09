import { IDisposable } from '../../core/common/disposable/IDisposable';

export interface IRoomObjectModel extends IDisposable {
    setValue(ROOM_SELECTED_X: string, _local_19: any);
    updateCounter: number;
    getValue<T>(_roomObjectVariableAccurateZ: string);

}