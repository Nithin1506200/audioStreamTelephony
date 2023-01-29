- [websockets events](#websockets-events)
  - [accept call](#accept-call)
  - [hold call](#hold-call)
  - [send media](#send-media)
  - [decline call](#decline-call)

# websockets events

## accept call

```json
{
    status: "accept",
    agentId: agentId,
    sessionId: onGoingCallChatSessionId,
    event: "start", //start/end/hold
    source: "agent",
}
```

## hold call

```json
{
    status: "accept",
    agentId: agentId,
    sessionId: onGoingCallChatSessionId,
    event: "hold", //start/end/hold
    source: "agent",
}
```

## send media

```json
{
    agentId: agentId,
    sessionId: onGoingCallChatSessionId,
    event: "media",
    source: "agent",
    status: "",
    bytes: (base64data as string).split("base64,")[1],
}
```

## decline call

```json
{
    status: "decline",
    agentId: agentId,
    sessionId: onGoingCallChatSessionId,
    event: "end", //start/end/hold
    source: "agent",
}

```

```mermaid

   flowchart TD
    A[] --> B{Is it?}
    B -- Yes --> C[OK]
    C --> D[Rethink]
    D --> B
    B -- No ----> E[End]


```
