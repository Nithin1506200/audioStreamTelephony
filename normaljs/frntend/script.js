const ws = new WebSocket("localhost:3003");
ws.onopen((e) => {
  console.log("socket open");
});
ws.onmessage((e) => {
  console.log("msg", e);
});
