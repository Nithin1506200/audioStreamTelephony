import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import AudioStream from "./audioStream/audioStream";
function App() {
  const [audioStream, setAudioStream] = useState<AudioStream | undefined>(
    undefined
  );
  function doWith16array(array: Int16Array) {
    if (log.current) {
      (log.current as HTMLElement).innerText = " ";
      (log.current as HTMLElement).innerText = array.join(" ");
    }
  }
  const log = useRef(null);
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      const as = new AudioStream(16000, 3200, 200, doWith16array);

      setAudioStream(as);

      // setAudioStream(audioStream);
    }
    return () => {
      audioStream?.kill();
    };
  }, []);
  return (
    <div className="app">
      <audio ref={ref} />
      <p className="data" ref={log}></p>
      <button
        onClick={() => {
          audioStream?.pause();
        }}
      >
        {" "}
        stop{" "}
      </button>
      <button
        onClick={() => {
          audioStream?.resume();
        }}
      >
        start
      </button>
    </div>
  );
}

export default App;
