import { NodeUtils } from "@animalus/node-core";
import express from "express";
import { CroweoConfig } from "@crowmagnumb/croweo-core";
import pino from "pino";
import path from "path";
import { RandomUtils } from "@animalus/corejs";

// const configDir = __dirname;
const configDir = "/opt/config/croweo"

const config = NodeUtils.readYML<CroweoConfig>(path.join(configDir, "config.yml"));

const logger = pino({
    level: config.log?.level ?? "info",
    transport: {
        target: "pino-pretty",
        options: { colorize: true }
    }
});

const dataDir = "/opt/data/croweo"
const allmusic = await NodeUtils.readFileToLines(path.join(dataDir, "music_library.txt"));

logger.info(`Library has [${allmusic.length}] files`)

const app = express();

app.get('/random', (req, res) => {
    res.send(RandomUtils.nextItem(allmusic));
});

const port = config.port ?? 3000;
app.listen(port, () => {
    console.log(`App ready listening on port [${port}]`);
});
