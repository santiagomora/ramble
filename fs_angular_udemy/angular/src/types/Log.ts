export type LogType = "timer"|"server"

export type Log = {
    _id?: string,
    userId?: string,
    description:string,
    type:LogType,
    createdAt?: string,
    updatedAt?: string
}