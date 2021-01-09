import ByteBuffer from 'bytebuffer';
import { IConnection } from '../../connections/IConnection';
import { IMessageDataWrapper } from '../../messages/IMessageDataWrapper';
import { Byte } from '../Byte';
import { ICodec } from '../ICodec';
import { Short } from '../Short';
import { EvaWireDataWrapper } from './EvaWireDataWrapper';

export class EvaWireFormat implements ICodec
{
    public encode(header: number, messages: any[]): ByteBuffer
    {
        const buffer = new ByteBuffer();

        buffer.writeInt(0).writeShort(header);

        for(let value of messages)
        {
            let type: string = typeof value;

            if(type === 'object')
            {
                if(value === null)              type = 'null';
                else if(value instanceof Byte)  type = 'byte';
                else if(value instanceof Short) type = 'short';
            }

            switch(type)
            {
                case 'null':
                    buffer.writeShort(0);
                    break;
                case 'byte':
                    buffer.writeByte(value.value);
                    break;
                case 'short':
                    buffer.writeShort(value.value);
                    break;
                case 'number':
                    buffer.writeInt(value);
                    break;
                case 'boolean':
                    buffer.writeByte(value ? 1 : 0);
                    break;
                case 'string':
                    if(!value) buffer.writeShort(0);
                    else buffer.writeShort(value.length).writeString(value);
                    break;
            }
        }

        buffer.writeInt(buffer.offset - 4, 0);

        return buffer.slice(0, buffer.offset);
    }

    public decode(connection: IConnection): IMessageDataWrapper[]
    {
        if(!connection || !connection.dataBuffer || !connection.dataBuffer.byteLength) return null;

        const wrappers: IMessageDataWrapper[] = [];

        while(connection.dataBuffer.byteLength)
        {
            if(connection.dataBuffer.byteLength < 4) break;
            
            const container = ByteBuffer.wrap(connection.dataBuffer);
            const length    = container.readInt32();

            if(length > (connection.dataBuffer.byteLength - 4)) break;

            const extracted = container.readBytes(length);

            wrappers.push(new EvaWireDataWrapper(extracted.readShort(), extracted));

            connection.dataBuffer = connection.dataBuffer.slice(length + 4);
        }

        return wrappers;
    }
}