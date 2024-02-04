import { io } from "socket.io-client";

export default class socketSerivce {
    private url;
    public socket;

    constructor() {
        this.url = "http://localhost:8001";
        this.socket = io(this.url);
        this.socket.on("connect", () => {
            console.log(this.socket.id); 
        });          
    }

    async joinRoom(room: string) {
        this.socket.on("connection", socket => {
            socket.join(room);
        });
    }

    async sendToRoom(room: string, topic: string, message: string) {
        this.socket.emit(room, message);
    }

    async sendToTopic(room: string, topic: string, message: string) {
        this.socket.emit(`${room}_${topic}`, message);
    }
}
