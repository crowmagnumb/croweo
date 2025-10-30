import { NodeUtils } from "@animalus/node-core";
import { CroweoConfig } from "@crowmagnumb/croweo-core";
import { MusicLibrary } from "@crowmagnumb/croweo-node";
import { parseFile } from "music-metadata";
import path from "path";

const configDir = "/opt/config/croweo";
const config = NodeUtils.readYML<CroweoConfig>(
    path.join(configDir, "config.yml")
);

const library = new MusicLibrary();
library.load().then(async (files) => {
    for (const file of files) {
        const fullpath = path.join(config.music.rootDir, file.filename);
        const metadata = await parseFile(fullpath);
        // if (metadata.common.picture) {
        //     //
        //     // TODO: extract the pictures?
        //     // We should at least see what they are.
        //     //
        //     console.log(file.filename);
        //     console.log(metadata);
        //     console.log("===================================================");
        // }

        //
        //   artists: [ 'Hunters', 'Collectors' ],
        //   artist: 'Hunters',

        if (
            metadata.common.artists?.length > 1 ||
            (metadata.common.artists?.length === 1 &&
                metadata.common.artists[0] !== metadata.common.artist)
        ) {
            console.log(file.filename);
            console.log(metadata.common);
            console.log("===================================================");
        }
    }
});
