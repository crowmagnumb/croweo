import { ErrorInfo } from "@animalus/corejs";

export const SOCKET_TYPE_MUSIC = "music";

export type MusicConfig = {
    rootDir: string;
};

export type LogConfig = {
    level: string;
};

export type CroweoConfig = {
    port: number;
    log: LogConfig;
    music: MusicConfig;
};

export type MusicFile = {
    filename: string;
};

export type MusicFileStatus = {
    mf: MusicFile;
    error?: ErrorInfo;
};
