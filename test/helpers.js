/* eslint-env mocha */
import chai from 'chai';
import os from 'os';

chai.should();

import { defaults, writeToBuffer } from '../src/helpers';

describe('helpers', () => {

    describe('.defaults()', () => {
        it('should add certain default parameters', () => {
            defaults({ float: true })
            .should.deep.equal({
                float: true, signed: true, bitDepth: 32,
                channels: 1, byteOrder: os.endianness()
            });

            defaults({ float: false, signed: false, bitDepth: 8, channels: 4 })
            .should.deep.equal({
                float: false, signed: false, bitDepth: 8,
                channels: 4, byteOrder: ''
            });
        });
    });

    describe('.writeToBuffer()', () => {
        it('should allow writing floats', () => {
            const buf = new Buffer(4);
            writeToBuffer(buf, 0.5, { float: true, byteOrder: 'LE' });
            buf.readFloatLE(0).should.be.closeTo(0.5, 0.001);
        });

        it('should allow writing signed integers', () => {
            const buf = new Buffer(4);
            writeToBuffer(buf, 489741, { float: false, signed: true, bitDepth: 32, byteOrder: 'LE' });
            buf.readUInt32LE(0).should.equal(489741);
        });

        it('should allow writing unsigned integers', () => {
            const buf = new Buffer(4);
            writeToBuffer(buf, 489741, { float: false, signed: false, bitDepth: 32, byteOrder: 'LE' });
            buf.readInt32LE(0).should.equal(489741);
        });
    });
});
