import { RandomUtils } from "@animalus/corejs";
import { NodeUtils } from "@animalus/node-core";
import path from "path";
import { MusicFile } from "./types";

export class RandomMusic {
    running = false;

    constructor(
        private rootDir: string,
        private collection: MusicFile[],
        private onNext: (MusicFile) => void
    ) {}

    private next() {
        const mf = RandomUtils.nextItem(this.collection);

        const filename = path.join(this.rootDir, mf.filename);

        console.log(`Playing ${filename}`);

        this.onNext(mf);

        NodeUtils.execSync(`play "${filename}"`);

        if (this.running) {
            this.next();
        }
    }

    start() {
        this.running = true;
        this.next();
    }

    stop() {
        //
        // TODO: Kill running process.
        //
        this.running = false;
    }
}
