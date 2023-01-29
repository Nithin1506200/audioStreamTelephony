import { type } from "os";

class AudioStream {
  context: AudioContext;

  // destinationNode:AudioDestinationNode;
  stream: MediaStream | undefined;
  // destinationNode: AudioDestinationNode;
  sourceNode!: AudioNode;
  // gainNode: Audio;
  // gainNode: AudioNode;
  getBuffer: boolean;
  mediaRecorder: MediaRecorder | undefined;
  cb!: CallableFunction;
  constructor(
    sampleRate: number,
    arraylength: number,
    time: number,
    cb: CallableFunction
  ) {
    this.context = new AudioContext({ sampleRate: 16000 });

    // this.sourceNode = this.context.createMediaElementSource();
    // this.destinationNode = this.context.destination;
    this.cb = cb;
    // this.gainNode = this.context.createGain();
    this.getBuffer = false;
    if (navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({
          audio: { sampleSize: 16, channelCount: 1, sampleRate: 16000 },
        })
        .then((stream) => {
          // this.sourceNode = this.context.createMediaStreamSource(stream);
          this.mediaRecorder = new MediaRecorder(stream, {
            mimeType: "audio/x-wav;base64",
          });

          this.mediaRecorder.start(time);
          this.mediaRecorder.ondataavailable = async (event) => {
            if (
              event.data.size > 0 &&
              event.data.size % 4 == 0 &&
              this.getBuffer
            ) {
              const data = await event.data.arrayBuffer();
              // data
              const blob = new Blob([event.data], { type: "audio/mpeg-3" });

              // let channelData: any = buffer.getChannelData(0);
              // channelData = this.convertFloat32ToInt16(channelData);
              // console.log((channelData as Int16Array).join(" "));
              // const data2 = new Float32Array(data);
              // console.log(data2, "blob data arraybuffer");
              // const x = Buffer.from(data);
              const base64 = this.newBufferToBase64(data);
              const audio = new Audio("data:audio/wav;base64," + base64);
              this.cb(base64, event.data, blob);
            }
          };
        });
      // this.gainNode.connect(this.destinationNode);
    }
  }

  resume() {
    this.context.resume();
    this.getBuffer = true;
  }
  /**
   * pause recording
   * donot use resource
   */
  pause() {
    this.context.suspend();
    this.getBuffer = false;
  }
  kill() {
    this.context.close();
    this.getBuffer = false;
  }
  /**
   *
   *
   * @param samplingRate {number} :
   * @param time {number} : in second
   * @returns
   */
  getLength(sampleRate: number, time: number) {
    return sampleRate * time;
  }
  convertFloat32ToInt16(buffer: Float32Array) {
    let l = buffer.length;
    let buf = new Int16Array(l);
    while (l--) {
      buf[l] = Math.min(1, buffer[l]) * 0x7fff;
    }
    return buf;
  }
  arrayBufferToBase64(buffer: Buffer) {
    var str = buffer.toString("base64");
  }
  base64ToArrayBuffer(base64: any) {
    let binary_string = window.atob(base64);
    let len = binary_string.length;
    let bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }
  newBufferToBase64(buffer: ArrayBuffer) {
    let bytes = new Uint8Array(buffer);
    let len = buffer.byteLength;
    let binary = "";
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
  newbase64ToBuffer(string: string) {
    let binary = window.atob(string);
    let buffer = new ArrayBuffer(binary.length);
    let bytes = new Uint8Array(buffer);
    for (let i = 0; i < buffer.byteLength; i++) {
      bytes[i] = binary.charCodeAt(i) & 0xff;
    }
    return buffer;
  }
}
export default AudioStream;
