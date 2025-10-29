import { RandomUtils } from "@animalus/corejs";
import path from "path";
import { ChildProcess, exec } from "child_process";
import { MusicFile, MusicFileStatus } from "@crowmagnumb/croweo-core";

export class MusicPlayer {
    running = false;
    _random = false;
    items: MusicFile[];
    index: number;
    ps: ChildProcess;

    constructor(
        private rootDir: string,
        private collection: MusicFile[],
        private onNext: (obj: MusicFileStatus) => void
    ) {}

    private next() {
        const mfs = this.items ?? this.collection;

        let mf: MusicFile;
        if (this._random) {
            mf = RandomUtils.nextItem(mfs);
        } else {
            if (this.index >= mfs.length) {
                this.stop();
                return;
            }
            this.index++;
            mf = mfs[this.index];
        }

        this.onNext({ mf });

        this.ps = exec(
            `play "${path.join(this.rootDir, mf.filename)}"`,
            (error, stdout, stderr) => {
                if (error) {
                    this.onNext({ mf, error });
                }
                if (this.running) {
                    this.next();
                }
            }
        );
    }

    random() {
        this._random = true;
        this.items = null;
        this.running = true;
        this.next();
    }

    start(items: MusicFile[]) {
        this.items = items;
        this._random = false;
        this.index = 0;
        this.running = true;
        this.next();
    }

    private stopCurrent() {
        this.ps?.kill();
        this.ps = null;
    }

    skip() {
        //
        // This will kill the current process which will auto-trigger the next song.
        //
        this.stopCurrent();
    }

    stop() {
        //
        // This will kill the current process but since we are setting running to false
        // it will not  auto-trigger the next song.
        //
        this.running = false;
        this.stopCurrent();
    }
}
