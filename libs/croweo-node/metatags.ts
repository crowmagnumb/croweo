// meta.js
import { parseFile } from "music-metadata";
import { promises as fs } from "fs";
import path from "path";

async function getMeta(filePath) {
    // `parseFile` automatically detects the format from the file header.
    const metadata = await parseFile(filePath);

    // ---- Human‑readable fields ------------------------------------------------
    const common = metadata.common; // unified view across formats
    console.log("Title :", common.title);
    console.log("Artist:", common.artist);
    console.log("Album :", common.album);
    console.log("Year  :", common.year);
    console.log("Genre :", common.genre?.join(", "));
    console.log("Track #: ", common.track?.no);
    console.log("Disc  #: ", common.disk?.no);
    console.log("Duration (s):", metadata.format.duration?.toFixed(2));

    // ---- Embedded picture (album art) ----------------------------------------
    if (common.picture && common.picture.length) {
        const pic = common.picture[0]; // usually the front cover
        const ext = pic.format.split("/")[1] || "jpg";
        const outPath = path.join(
            path.dirname(filePath),
            `${path.parse(filePath).name}_cover.${ext}`
        );
        await fs.writeFile(outPath, pic.data);
        console.log("✔ Saved cover art to", outPath);
    } else {
        console.log("ℹ No embedded picture found.");
    }
}
