import { FileUtils } from "@animalus/corejs";
import { NodeUtils } from "@animalus/node-core";
import path from "path";
import { CroweoConfig } from "@crowmagnumb/croweo-core";

const configDir = "/opt/config/croweo"
const config = NodeUtils.readYML<CroweoConfig>(path.join(configDir, "config.yml"));

const allmusic = NodeUtils.walkDir(config.music.rootDir, (file => {
    let ext = FileUtils.getExtension(file);
    if (!ext) {
        return false;
    }
    ext = ext.toLowerCase();
    return ext === "flac" || ext === "ogg" || ext === "mp3";
}));

const dataDir = "/opt/data/croweo"
NodeUtils.writeTextFileSync(path.join(dataDir, "music_library.txt"), allmusic.join("\n"));
