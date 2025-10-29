import { NodeUtils } from "@animalus/node-core";
import express from "express";
import { CroweoConfig, RandomMusic } from "@crowmagnumb/croweo-core";
import pino from "pino";
import path from "path";
// import cors from "cors";
import http from "http";
import { WebSocket, WebSocketServer } from "ws";
import { SocketManager } from "./SocketManager";

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

const dataDir = "/opt/data/croweo";
const allmusic = await NodeUtils.readFileToLines(
    path.join(dataDir, "music_library.txt")
);

logger.info(`Library has [${allmusic.length}] files`);

const app = express();

// app.use(
//     cors({
//         origin: "http://localhost:4200",
//         // methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//         // allowedHeaders: ["Content-Type", "Authorization"],
//         // credentials: true,
//     })
// );

// ----- Attach a WebSocket server to the same HTTP server as the express app, that way we can use the same port -----
const socket = new SocketManager(
    new WebSocket.Server({ server: http.createServer(app) })
);

//
// Must call init at the start of your application.
//
// auhttp.init(apiset);

const player = new RandomMusic(config.music.rootDir, allmusic);

app.post("/random", (req, res) => {
    player.start();
    res.send();
});

app.post("/stop", (req, res) => {
    player.stop();
    res.send();
});

const port = config.port ?? 3000;
app.listen(port, () => {
    console.log(`App ready listening on port [${port}]`);
});
