import { NodeUtils } from "@animalus/node-core";
import express from "express";
import { CroweoConfig, RandomMusic } from "@crowmagnumb/croweo-core";
import pino from "pino";
import path from "path";

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

app.get("/random", (req, res) => {
    const player = new RandomMusic(config.music.rootDir, allmusic);
    player.start();
    res.send();
});

const port = config.port ?? 3000;
app.listen(port, () => {
    console.log(`App ready listening on port [${port}]`);
});
