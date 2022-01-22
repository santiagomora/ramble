export type LogType = "timer"|"server"

export type Log = {
    type: LogType;
    createdAt: Date;
    description: string;
}