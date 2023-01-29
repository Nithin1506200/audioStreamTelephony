import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [ws, setWs] = useState<WebSocket | undefined>(undefined);
  useEffect(() => {
    const ws = new WebSocket(import.meta.env.WSS_URL);

    return () => {
      ws.close();
    };
  }, []);
  return (
    <div className="App">
      <div>
        <title>Agent Id</title>
        <h2>Agent ID</h2>
        <input></input>
      </div>
      <div>
        <button>startWss</button>
        <button>stopWss</button>
        <button>accept call</button>
        <button>decline call</button>
        <button>mute</button>
        <button>hold</button>
      </div>
    </div>
  );
}

export default App;
