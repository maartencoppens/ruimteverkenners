import { createServer } from "http";
import next from "next";
import { WebSocket, WebSocketServer } from "ws";

const app = next({ dev: process.env.NODE_ENV !== "production" });

app.prepare().then(() => {
  const server = createServer(app.getRequestHandler());
  const wss = new WebSocketServer({ server });
  const clients = new Set();

  const broadcast = (sender, message) =>
    clients.forEach(
      (c) => c !== sender && c.readyState === WebSocket.OPEN && c.send(message),
    );

  wss.on("connection", (ws) => {
    clients.add(ws);
    console.log("Client connected, total:", clients.size);

    ws.on("message", (data) => {
      const message = data.toString();
      console.log("Received:", message);
      broadcast(ws, message);
    });

    ws.on("close", () => {
      clients.delete(ws);
      console.log("Client disconnected, total:", clients.size);
    });
  });

  server.listen(3000, () => console.log("> Ready on http://localhost:3000"));
});
