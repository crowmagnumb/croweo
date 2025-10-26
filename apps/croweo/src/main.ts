import { NodeUtils } from "@animalus/node-core";
import express from "express";
import { FileUtils } from "@animalus/corejs";
import { CroweoConfig } from "@crowmagnumb/croweo-core";
import pino from "pino";
import path from "path";

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

const allmusic = NodeUtils.walkDir(config.music.rootDir, (file => {
    let ext = FileUtils.getExtension(file);
    if (!ext) {
        return false;
    }
    ext = ext.toLowerCase();
    return ext === "flac" || ext === "ogg" || ext === "mp3";
}))

logger.info(`Library has [${allmusic.length}] files`)

const app = express();

app.get('/', (req, res) => {
    res.send({ message: 'Hello API' });
});

const port = config.port ?? 3000;
app.listen(port, () => {
    console.log(`App ready listening on port [${port}]`);
});
