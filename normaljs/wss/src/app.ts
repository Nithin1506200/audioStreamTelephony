import Websocket, { WebSocketServer } from "ws";
import AudioContext from "web-audio-api";
import * as fs from "fs";
import http from "http";
import app from "express";

const server = http.createServer(app);
function getData(audioFile, callback) {
  fs.readFile(audioFile, (err, data) => {
    callback(data);
  });
}
let b64encoded;
// let data: Buffer | undefined = undefined;
getData("./src/test.mp3", async (data: Buffer) => {
  var decoder = new TextDecoder("utf8");
  b64encoded = data.toString("base64");
});
const wss = new WebSocketServer({ server: server });
wss.on("connection", (ws) => {
  const length = b64encoded.length;
  for (let i = 0; i < length - 3200 - 1; i = i + 3200) {
    setTimeout(() => {
      ws.send(
        JSON.stringify({
          bytes: b64encoded.slice(i, i + 3200),
        })
      );
    }, 200);
  }
});

server.listen(3003, () => {
  console.log("hjkh");
});
