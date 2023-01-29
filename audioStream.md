- [audio characteristics](#audio-characteristics)
- [Fromula](#fromula)
- [Audiocontext architecture](#audiocontext-architecture)
- [Audio receive](#audio-receive)

# audio characteristics

| characteristics | value   |
| --------------- | ------- |
| sampling freq   | `8Khz`  |
| time            | `200ms` |
| bit rate        | `16bit` |
| sampling rate   | 16000   |
| array length    | 3200    |
| format          | pcm     |

# Fromula

$time=length/samplingRate$

$length=0.2*16000=3200$

---

# Audiocontext architecture

```mermaid
flowchart LR
get(Get the audio from media devices)
getbuffer(select buffer of 200 ms)
convert(convert the sample rate of 8khz, 16bits , pcm)
stream(stream the buffer)
    get --> getbuffer --> convert --> stream
```

```mermaid
graph TD;
A(mediarecorder)
B(200ms data)
C(32 float -> 16bit int)
D(stream)
    A-->B;
    B-->C;
    C-->D;
```

# Audio receive

```mermaid
   graph TD
   A(Blob)

   B(ArrayBuffer)
   C(32bit float array)
   D(setaudio same sample rate)
   E(AudiocontextApi play)
   A -->B-->C-->D-->E
```

https://stackoverflow.com/questions/64758250/why-does-the-mimetype-of-media-recorder-change-when-i-start-recording

https://base64.guru/converter/decode/audio

https://codepen.io/xewl/pen/NjyRJx

https://www.npmjs.com/package/recordrtc
