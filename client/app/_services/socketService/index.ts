import { io } from "socket.io-client";

export default class socketSerivce {
    private url;
    private socket;

    constructor() {
        this.url = "http://localhost:8001";
        this.socket = io(this.url);
    }

    async sendToRoom(room: string, message: any) {
        this.socket.emit(room, message);
    }

    async sendToTopic(room:string, topic:string, message:any){
        this.socket.emit(`${room}_${topic}`, message);
    }
}
