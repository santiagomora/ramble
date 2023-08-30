export type MessageOutlet = "inComponent" | "topLeftCorner" | "inHeader" | "noDisplay";

export type Notification = "reloadServers" | "reloadLogs" | "reloadRecipes" | "reloadItems";

export type MessageType = "info" | "success" | "error"

export type PlainMessage = {
    data: any,
    message: string,
    outlet: MessageOutlet,
    type: MessageType
}