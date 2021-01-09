import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { GenericAlertParser } from '../../parser/generic/GenericAlertParser';

export class GenericAlertEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GenericAlertParser);
    }

    public getParser(): GenericAlertParser
    {
        return this.parser as GenericAlertParser;
    }
}