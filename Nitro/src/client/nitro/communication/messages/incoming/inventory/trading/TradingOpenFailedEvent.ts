import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { TradingOpenFailedEventParser } from '../../../parser/inventory/trading/TradingOpenFailedEventParser';

export class TradingOpenFailedEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, TradingOpenFailedEventParser);
    }

    public getParser(): TradingOpenFailedEventParser
    {
        return this.parser as TradingOpenFailedEventParser;
    }
}