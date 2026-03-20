import { createServer } from "http";
import { parse } from "url";
import next from "next";
import { WebSocketServer } from "ws";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  // WebSocket server runs on the same port
  const wss = new WebSocketServer({ server });

  const clients = new Set();

  wss.on("connection", (ws) => {
    clients.add(ws);
    console.log("Client connected, total:", clients.size);

    ws.on("message", (data) => {
      // TouchDesigner sends a message → broadcast to all other clients (the display page)
      const message = data.toString();
      console.log("Received:", message);
      clients.forEach((client) => {
        if (client !== ws && client.readyState === 1) {
          client.send(message);
        }
      });
    });

    ws.on("close", () => {
      clients.delete(ws);
      console.log("Client disconnected, total:", clients.size);
    });
  });

  server.listen(3000, () => {
    console.log("> Ready on http://localhost:3000");
  });
});
