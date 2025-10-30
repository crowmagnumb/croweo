import { NodeUtils } from "@animalus/node-core";
import express from "express";
import { CroweoConfig, SOCKET_TYPE_MUSIC } from "@crowmagnumb/croweo-core";
import { MusicLibrary } from "@crowmagnumb/croweo-node";
import pino from "pino";
import path from "path";
import cors from "cors";
import { WebSocketServer } from "ws";
import { SocketManager } from "./SocketManager";
import { MusicPlayer } from "./MusicPlayer";

// const configDir = __dirname;
const configDir = "/opt/config/croweo";

const config = NodeUtils.readYML<CroweoConfig>(
    path.join(configDir, "config.yml")
);

const logger = pino({
    level: config.log?.level ?? "info",
    transport: {
        target: "pino-pretty",
        options: { colorize: true },
    },
});

const library = new MusicLibrary();
library.load();

logger.info(`Library has [${library.size()}] files`);

const app = express();

app.use(
    cors({
        origin: "http://localhost:4200",
        // methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        // allowedHeaders: ["Content-Type", "Authorization"],
        // credentials: true,
    })
);

// ----- Attach a WebSocket server to the same HTTP server as the express app, that way we can use the same port -----
const server = http.createServer(app);
const socket = new SocketManager(new WebSocketServer({ server }));

const player = new MusicPlayer(config.music.rootDir, (status) => {
    socket.broadcast({ type: SOCKET_TYPE_MUSIC, data: status });
});

app.get("/status", (req, res) => {
    res.send(player.status());
});

app.post("/random", (req, res) => {
    player.start(library.files, true);
    res.send();
});

app.post("/skip", (req, res) => {
    player.skip();
    res.send();
});

app.post("/stop", (req, res) => {
    player.stop();
    res.send();
});

const port = config.port ?? 3000;
server.listen(port, () => {
    console.log(`App ready listening on port [${port}]`);
});
