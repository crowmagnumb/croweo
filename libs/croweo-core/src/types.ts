export type MusicConfig = {
    rootDir: string;
}

export type LogConfig = {
    level: string
}

export type CroweoConfig = {
    port: number,
    log: LogConfig,
    music: MusicConfig,
}