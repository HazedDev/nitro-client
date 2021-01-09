import { IDisposable } from "src/client/core/common/disposable/IDisposable";
import { IConnection } from "src/client/core/communication/connections/IConnection";

export interface IRoomSession extends IDisposable {
    sendChatTypingMessage(isTyping: boolean);
    sendChatMessage(text: string, styleId: number);
    sendShoutMessage(text: string, styleId: number);
    sendWhisperMessage(recipientName: string, text: string, styleId: number);
    ownRoomIndex: number;
    sendMottoMessage(motto: string);
    isRoomOwner: boolean;
    isGuildRoom: boolean;
    tradeMode: any;
    sendDanceMessage(style: number);
    sendExpressionMessage(_Str_6677: number);
    sendPostureMessage(posture: number);
	isSpectator: any;
    userDataManager: any;
    isDecorating: boolean;
    setConnection(connection: IConnection);
    state: string;
    start();
    reset(toRoomId: number);
    controllerLevel: number;
    roomId: any;

}