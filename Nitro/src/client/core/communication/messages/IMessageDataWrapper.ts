import * as ByteBuffer from 'bytebuffer';

export interface IMessageDataWrapper
{
    readByte(): number

    readBytes(length: number): ByteBuffer

    readBoolean(): boolean

    readShort(): number

    readInt(): number

    readString(): string

    header: number

    bytesAvailable: boolean
}