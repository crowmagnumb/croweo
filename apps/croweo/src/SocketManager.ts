import { SocketMessage } from "@animalus/corejs";
import { WebSocket, WebSocketServer } from "ws";

export class SocketManager {
    constructor(private wss: WebSocketServer) {}

    broadcast<T>(sm: SocketMessage<T>) {
        const msg = JSON.stringify(sm);
        this.wss.clients.forEach((ws) => {
            if (ws.readyState == WebSocket.OPEN) {
                ws.send(msg);
            }
        });
    }
}
