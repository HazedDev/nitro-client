import { IDisposable } from "src/client/core/common/disposable/IDisposable";
import { IRoomObjectSprite } from "src/client/room/object/visualization/IRoomObjectSprite";

export interface IAvatarAddition extends IDisposable {
    update(arg0: IRoomObjectSprite, scale: any);
    animate(arg0: IRoomObjectSprite);
    id: number;
}