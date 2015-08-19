/* eslint-env mocha */
import chai from 'chai';

chai.should();

import PcmSilenceReadable, { generateSilence } from '../src/index';

describe('generateSilence()', () => {
    it('should generate floating-point silence', () => {
        const buf = generateSilence(8, { float: true, byteOrder: 'LE' });

        buf.readFloatLE(0).should.be.closeTo(0.0, 0.001);
        buf.readFloatLE(4).should.be.closeTo(0.0, 0.001);
    });

    it('should generate signed silence', () => {
        const buf = generateSilence(4, { float: false, signed: true, bitDepth: 16, byteOrder: 'LE' });

        buf.readInt16LE(0).should.equal(0);
        buf.readInt16LE(2).should.equal(0);
    });

    it('should generate unsigned silence', () => {
        const buf = generateSilence(4, { float: false, signed: false, bitDepth: 16, byteOrder: 'LE' });

        buf.readUInt16LE(0).should.be.closeTo(65536/2, 1);
        buf.readUInt16LE(2).should.be.closeTo(65536/2, 1);
    });
});
