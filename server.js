import { createServer } from "http";
import next from "next";
import { WebSocket, WebSocketServer } from "ws";

const app = next({ dev: process.env.NODE_ENV !== "production" });
const wsPath = "/ws";

app.prepare().then(() => {
  const handle = app.getRequestHandler();
  const server = createServer((req, res) => handle(req, res));
  const wss = new WebSocketServer({ noServer: true });
  const clients = new Set();

  const broadcast = (sender, message) =>
    clients.forEach(
      (c) => c !== sender && c.readyState === WebSocket.OPEN && c.send(message),
    );

  server.on("upgrade", (request, socket, head) => {
    if (!request.url?.startsWith(wsPath)) {
      return;
    }

    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit("connection", ws, request);
    });
  });

  wss.on("connection", (ws) => {
    clients.add(ws);
    console.log("Client connected, total:", clients.size);

    ws.on("message", (data) => {
      try {
        const message = data.toString();
        console.log("Received:", message);
        broadcast(ws, message);
      } catch (err) {
        console.error("WebSocket message error:", err);
      }
    });

    ws.on("error", (err) => {
      console.error("WebSocket error:", err);
    });

    ws.on("close", () => {
      clients.delete(ws);
      console.log("Client disconnected, total:", clients.size);
    });
  });

  server.listen(3000, () =>
    console.log(`> Ready on http://localhost:3000 (WebSocket: ${wsPath})`),
  );
});
