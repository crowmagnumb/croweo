import { RandomUtils } from "@animalus/corejs";
import { NodeUtils } from "@animalus/node-core";
import path from "path";

export class RandomMusic {
    running = false;

    constructor(private rootDir: string, private files: string[]) {}

    private next() {
        const filename = path.join(this.rootDir, RandomUtils.nextItem(this.files))
        console.log(`Playing ${filename}`);
        NodeUtils.execSync(`play ${filename}`);
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