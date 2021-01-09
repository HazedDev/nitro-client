import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { GenericAlertLinkParser } from '../../parser/generic/GenericAlertLinkParser';

export class GenericAlertLinkEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GenericAlertLinkParser);
    }

    public getParser(): GenericAlertLinkParser
    {
        return this.parser as GenericAlertLinkParser;
    }
}