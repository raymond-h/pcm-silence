import os from 'os';

export function defaults({ channels, float, signed, bitDepth, byteOrder }) {
    if(channels == null) channels = 1;

    if(float) {
        signed = true;
        bitDepth = 32;
    }

    if(bitDepth <= 8) byteOrder = '';
    else if(byteOrder == null) byteOrder = os.endianness();

    return { channels, float, signed, bitDepth, byteOrder };
}

export function writeToBuffer(buffer, value, { float, signed, bitDepth, byteOrder }) {
    if(float) return buffer['writeFloat'+byteOrder](value, 0);

    if(signed) return buffer['writeInt'+bitDepth+byteOrder](value, 0);
    return buffer['writeUInt'+bitDepth+byteOrder](value, 0);
}
