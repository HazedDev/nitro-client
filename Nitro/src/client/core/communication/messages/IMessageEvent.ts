import { IDisposable } from '../../common/disposable/IDisposable';
import { IConnection } from '../connections/IConnection';
import { IMessageParser } from './IMessageParser';

export interface IMessageEvent extends IDisposable
{
    callBack: Function

    parserClass: Function

    parser: IMessageParser

    connection: IConnection
}