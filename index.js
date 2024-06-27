import { createBareServer } from "@tomphttp/bare-server-node";
import express from "express";
import { createServer } from"node:http";
import { uvPath } from"@titaniumnetwork-dev/ultraviolet";
import { hostname } from "node:os";

const bare = createBareServer("/bare/");
const app = express();

const server = createServer();
const port = 8080;

app.use(express.static('public'));
app.use("/uv/", express.static(uvPath));

app.get('*', function(req, res) {
  res.send('404');
});

server.on("request", (req, res) => {
  if (bare.shouldRoute(req)) {
    bare.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

server.on("upgrade", (req, socket, head) => {
  if (bare.shouldRoute(req)) {
    bare.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});



server.on("listening", () => {
  const address = server.address();

  console.log("Listening on:");
  console.log(`\thttp://localhost:${address.port}`);
  console.log(`\thttp://${hostname()}:${address.port}`);
  console.log(`\thttp://${address.family === "IPv6" ? `[${address.address}]` : address.address}:${address.port}`);
});

// https://expressjs.com/en/advanced/healthcheck-graceful-shutdown.html
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

function shutdown() {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close();
  bare.close();
  process.exit(0);
}

server.listen({
  port,
});