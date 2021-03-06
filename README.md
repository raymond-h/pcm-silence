# pcm-silence
Infinitely generate PCM data of silence


## Installing
`npm install pcm-silence`


## Example usage
```javascript
const generateSilence = require('pcm-silence').generateSilence

// 4 bytes (32 bits) * 16000hz * 1 channel (mono)
const oneSecond = 4 * 16000 * 1

// buf is a node buffer containing 1 second of silence in signed, 32 bit, mono,
// 16khz, little endian PCM format
const buf = generateSilence(oneSecond, { float: true, byteOrder: 'LE' })
```


## Streaming usage

You may also generate a continuous stream of silence:

```javascript
const PcmSilenceReadable = require('pcm-silence').PcmSilenceReadable
const Speaker            = require('speaker')


const speaker = new Speaker({
  channels: 1,
  bitDepth: 32,
  float: true,
  signed: true
})

const silence = new PcmSilenceReadable({ float: true, byteOrder: 'LE' })

silence.pipe(speaker)
```


## License
The MIT License (MIT)

Copyright (c) 2015 Raymond Hammarling

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
