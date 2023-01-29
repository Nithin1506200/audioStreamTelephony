import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import AudioStream from "./audioStream/audioStream";
import useWebSocket, { ReadyState } from "react-use-websocket";
import fs from "fs";
import RecordRTC, { StereoAudioRecorder } from "recordrtc";
const content = "Some content!";

function App() {
  // const { sendMessage, lastMessage, readyState } = useWebSocket(
  //   "wss://agentdesktop.saarthi.ai"
  // );
  const [play, setPlay] = useState(false);
  const [audio, setAudio] = useState<string>("");
  const {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
  } = useWebSocket("wss://agentdesktop.saarthi.ai");
  const [audioStream, setAudioStream] = useState<AudioStream | undefined>(
    undefined
  );
  const [recorder, setRecorder] = useState<any>("");
  function sendData() {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const recorder = new RecordRTC(stream, {
          type: "audio",
          mimeType: "audio/webm;codecs=pcm",
          recorderType: StereoAudioRecorder,
          timeSlice: 200, // set 250 ms intervals of data that sends to AAI
          //sampleRate: 16000,
          desiredSampRate: 8000,
          numberOfAudioChannels: 1,
          bufferSize: 4096,
          //audioBitsPerSecond: 128000,
          ondataavailable: (blob) => {
            // console.log("trying to read blob: ", blob);
            const reader = new FileReader();
            reader.onload = () => {
              const base64data = reader.result;
              // console.log("base64data is: ", base64data);
              if (log.current) {
                (log.current as HTMLElement).innerText = " ";
                (log.current as HTMLElement).innerText = base64data as string;
              }
              // audio data must be sent as a base64 encoded string
              console.log("streaming", play);
              if (true) {
                sendJsonMessage({
                  agentId: "63c2a389229e0f35d2672cc5",
                  sessionId: "dummy",
                  event: "media",
                  source: "agent",
                  status: "",
                  bytes: (base64data as string).split("base64,")[1],
                });
                console.log("streaming");
              }
            };
            setRecorder(recorder);
            reader.readAsDataURL(blob);
          },
        });

        recorder.startRecording();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function doWith16array(binary: any, data: any, blob: any) {
    const audioUrl = window.URL.createObjectURL(blob);
    // sendJsonMessage({      //send
    //   agentId: "63c2a389229e0f35d2672cc5",
    //   sessionId: "dummy",
    //   event: "media",
    //   source: "agent",
    //   status: "",
    //   bytes: audioUrl,
    // });
    // console.log({ binary }, blob);
    downloadBlob(blob);
    if (log.current) {
      (log.current as HTMLElement).innerText = " ";
      (log.current as HTMLElement).innerText = binary;
    }
    // console.log(binary);
  }
  function handleSocketEvent(event: MessageEvent<any>) {
    console.log(event.data);
    const element = document.createElement("a");
    const file = new Blob([event.data], {
      type: "text/plain;charset=utf-8",
    });
    element.href = URL.createObjectURL(file);
    element.download = "myFile.txt";
    document.body.appendChild(element);
    element.click();
  }
  function downloadBlob(blob: Blob) {
    const element = document.createElement("a");
    element.href = URL.createObjectURL(blob);
    element.download = "myFile.mpeg";
    document.body.appendChild(element);
    element.click();
  }
  const log = useRef(null);
  const ref = useRef(null);
  //init
  useEffect(() => {
    if (ref.current) {
      // const as = new AudioStream(16000, 3200, 2000, doWith16array);

      setAudioStream(undefined);
    }

    sendJsonMessage({
      agentId: "63c2a389229e0f35d2672cc5",
      source: "agent",
      event: "connect",
    });
    sendJsonMessage({
      source: "agent",
      agentId: "63c2a389229e0f35d2672cc5",
      event: "start",
      status: "accept",
    });

    return () => {
      audioStream?.kill();
    };
  }, []);
  useEffect(() => {
    if (lastMessage !== null) {
      // handleSocketEvent(lastMessage);
    }
  }, [lastMessage]);
  return (
    <div className="app">
      <audio ref={ref} />
      <p className="data" ref={log}></p>
      <button
        onClick={() => {
          setPlay(false);
          audioStream?.pause();
          recorder.stopRecording();
        }}
      >
        {" "}
        stop{" "}
      </button>
      <button
        onClick={() => {
          audioStream?.resume();
          setPlay(true);
          sendData();
        }}
      >
        start
      </button>
      <audio id="player" src={`data:audio/x-wav;base64,${audio}`}></audio>
    </div>
  );
}

export default App;
