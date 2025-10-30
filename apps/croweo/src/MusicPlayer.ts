import { RandomUtils } from "@animalus/corejs";
import path from "path";
import { ChildProcess, exec } from "child_process";
import {
    CroweoStatus,
    LastN,
    MusicFile,
    MusicFileStatus,
} from "@crowmagnumb/croweo-core";

export class MusicPlayer {
    running = false;
    _random = false;
    items: MusicFile[];
    index: number;
    ps: ChildProcess;
    playing: MusicFile;
    history = new LastN<MusicFileStatus>(20);

    constructor(
        private rootDir: string,
        private onNext: (obj: CroweoStatus) => void
    ) {}

    public status() {
        return {
            playing: this.playing,
            history: this.history.snapshot(),
        } as CroweoStatus;
    }

    private next() {
        const mfs = this.items;

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

        this.playing = mf;

        this.onNext(this.status());

        this.ps = exec(
            `play "${path.join(this.rootDir, mf.filename)}"`,
            (error, stdout, stderr) => {
                this.history.add({ mf, error });
                if (this.running) {
                    this.next();
                } else {
                    this.playing = null;
                    this.onNext(this.status());
                }
            }
        );
    }

    start(items: MusicFile[], random = false) {
        this._random = random;
        this.items = items;
        this.index = 0;
        this.running = true;
        this.next();
    }

    private stopCurrent() {
        this.ps?.kill();
        this.ps = null;
        this.playing = null;
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
        this.playing = null;
        this.onNext(this.status());
    }
}
