import * as ByteBuffer from 'bytebuffer';
import { IMessageDataWrapper } from '../../messages/IMessageDataWrapper';

export class EvaWireDataWrapper implements IMessageDataWrapper
{
    private _header: number;
    private _buffer: ByteBuffer;

    constructor(header: number, buffer: ByteBuffer)
    {
        this._header    = header;
        this._buffer    = buffer;
    }

    public readByte(): number
    {
        if(!this._buffer) return -1;

        return this._buffer.readByte();
    }

    public readBytes(length: number): ByteBuffer
    {
        if(!this._buffer) return null;

        return this._buffer.readBytes(length);
    }

    public readBoolean(): boolean
    {
        return this.readByte() === 1;
    }

    public readShort(): number
    {
        if(!this._buffer) return -1;

        return this._buffer.readInt16();
    }

    public readInt(): number
    {
        if(!this._buffer) return -1;

        return this._buffer.readInt32();
    }

    public readString(): string
    {
        let string = '';
        
        let length = this.readShort();

        while(length)
        {
            string += String.fromCharCode(this.readByte());

            length--;
        }

        return string;
    }

    public get header(): number
    {
        return this._header;
    }

    public get bytesAvailable(): boolean
    {
        return this._buffer && this._buffer.remaining() > 0;
    }
}