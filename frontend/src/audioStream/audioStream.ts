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
    this.context = new AudioContext();
    // this.sourceNode = this.context.createMediaElementSource();
    // this.destinationNode = this.context.destination;
    this.cb = cb;
    // this.gainNode = this.context.createGain();
    this.getBuffer = false;
    if (navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: false })
        .then((stream) => {
          this.sourceNode = this.context.createMediaStreamSource(stream);
          this.mediaRecorder = new MediaRecorder(stream, {
            mimeType: "audio/webm",
          });
          // this.cb = () => {};
          // console.log("xx", this.mediaRecorder);
          this.mediaRecorder.start(time);
          this.mediaRecorder.ondataavailable = async (event) => {
            if (
              event.data.size > 0 &&
              event.data.size % 4 == 0 &&
              this.getBuffer
            ) {
              const data = await event.data.arrayBuffer();
              const buffer = this.context.createBuffer(
                1,
                arraylength,
                sampleRate
              );
              buffer.copyToChannel(new Float32Array(data), 0);
              let channelData: any = buffer.getChannelData(0);
              channelData = this.convertFloat32ToInt16(channelData);
              // console.log((channelData as Int16Array).join(" "));
              this.cb(channelData);
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
}
export default AudioStream;
