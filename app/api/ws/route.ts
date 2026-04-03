import type { NextRequest } from "next/server";
import type { RouteContext } from "next-ws/server";
import { WebSocket, type WebSocketServer } from "ws";

export function GET() {
  return new Response("Upgrade Required", {
    status: 426,
    headers: { "Content-Type": "text/plain" },
  });
}

type Message = {
  isZoomedIn: boolean | number | string;
  planetId: string | number | null;
};

const toMessage = (value: unknown): Message => {
  if (typeof value === "string") {
    try {
      return toMessage(JSON.parse(value));
    } catch {
      return { isZoomedIn: false, planetId: null };
    }
  }

  if (typeof value === "object" && value !== null) {
    const data = value as Partial<Message>;
    return {
      isZoomedIn: data.isZoomedIn ?? false,
      planetId: data.planetId ?? null,
    };
  }

  return { isZoomedIn: false, planetId: null };
};

export function UPGRADE(
  client: WebSocket,
  server: WebSocketServer,
  _request: NextRequest,
  _context: RouteContext<"/api/ws">,
) {
  client.send(JSON.stringify({ isZoomedIn: false, planetId: null }));

  client.on("message", (message) => {
    const text =
      typeof message === "string"
        ? message
        : Buffer.isBuffer(message)
          ? message.toString("utf8")
          : Array.isArray(message)
            ? Buffer.concat(message).toString("utf8")
            : new TextDecoder().decode(message);

    const data = toMessage(text);
    const isZoomedIn =
      data.isZoomedIn === true || Number(data.isZoomedIn) === 1;
    const payload = JSON.stringify({
      isZoomedIn,
      planetId: data.planetId,
    });

    server.clients.forEach((peer) => {
      if (peer.readyState === WebSocket.OPEN) {
        peer.send(payload);
      }
    });

    // console.log("Received WS message:", data);
  });
}
