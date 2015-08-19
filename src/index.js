import stream from 'stream';

import { defaults, writeToBuffer } from './helpers';

function silentSampleValue(format) {
    if(format.float || format.signed) return 0;

    return 1 << (format.bitDepth-1);
}

export function generateSilence(size, format) {
    format = defaults(format);

    const byteDepth = format.bitDepth / 8;
    const frameSize = format.channels * byteDepth;
    const sampleBuf = new Buffer(Math.floor(size / frameSize) * frameSize);

    for(let i = 0; i < sampleBuf.length; i += byteDepth) {
        writeToBuffer(
            sampleBuf.slice(i),
            silentSampleValue(format), format
        );
    }

    return sampleBuf;
}

export default class PcmSilenceReadable extends stream.Readable {
    constructor(format) {
        super();

        this.format = format;
    }

    _read(size) {
        this.push(generateSilence(size, this.format));
    }
}
