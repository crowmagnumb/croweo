import path from "path";
// import { Pool } from "pg";
import { NodeUtils } from "@animalus/node-core";
// import { MusicFile } from "@crowmagnumb/croweo-core";

// const pool = new Pool();

// //
// // Single query
// //
// const res = await pool.query<MusicFile>("SELECT * FROM users WHERE id = $1", [
//     1,
// ]);
// console.log("user:", res.rows[0]);

// //
// // Multiple Queries
// //
// const client = await pool.connect();
// const res = await client.query("SELECT * FROM users WHERE id = $1", [1]);
// console.log(res.rows[0]);
// //
// // ... do more queries on the client
// //
// client.release();

export class MusicLibrary {
    // files: MusicFile[];
    files: { filename: string }[];

    load() {
        const dataDir = "/opt/data/croweo";
        return NodeUtils.readFileToLines(
            path.join(dataDir, "music_library.txt")
        ).then((files) => {
            // this.files = files.map((filename) => ({ filename } as MusicFile));
            this.files = files.map((filename) => ({ filename }));
            return this.files;
        });
    }

    size() {
        return this.files.length;
    }
}
