import { io } from "socket.io-client";

export default class socketSerivce {
    private url;
    public socket;
    private roomId;

    constructor(roomId: String) {
        this.url = "http://localhost:8001";
        this.socket = io(this.url);
        this.roomId = roomId;
        this.socket.on("connect", () => {
            console.log('this.socket.id: ', this.socket.id);
            // this.socket.emit('joinRoom', roomId);
        });
    }

    async joinRoom(room: String) {
        this.socket.emit('joinRoom', room.length ? room : this.roomId);
    }

    async leaveRoom(room: String) {
        this.socket.emit('leaveRoom', room.length ? room : this.roomId);
    }

    async sendToRoom(message: String, room: String = this.roomId, topic: string = 'sendMessage') {
        this.socket.emit(topic, { room, message });
    }
}
