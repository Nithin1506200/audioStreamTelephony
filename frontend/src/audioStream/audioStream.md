- [audio characteristics](#audio-characteristics)
- [Fromula](#fromula)
- [Audiocontext architecture](#audiocontext-architecture)

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
A(context)
B(source node)
C(gain node)
D(destination node)
    A-->B;
    B-->C;
    C-->D;
```
