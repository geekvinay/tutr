import paper, { Path } from "paper";
import { Point } from "paper/dist/paper-core";
import { createRef } from "react";
import { io } from "socket.io-client";
import { Fab } from "@mui/material";
import { AddIcCallOutlined } from "@mui/icons-material";
const backend = import.meta.env.VITE_BACKEND_URL;
const socket = io(backend);
const Video = () => {
    const canvasRef = createRef();
    window.addEventListener('load', () => {
        try {
            paper.setup(canvasRef.current);
            // Draw from others.
            socket.on("packet", function (data) {
                console.log("packet - received : ", data.pathObj);
                if (data.pathObj) {
                    const receivedPath = new Path();
                    receivedPath.importJSON(data.pathObj.paperObj);
                    receivedPath.finalPosition = new Point(data.pathObj.finalPosition, data.pathObj.finalPosition);
                }
            });
        } catch (e) {
            console.log(e);
        }
    });

    return (
        <div className="relative w-full h-[85vh] bg-gray-100 rounded-lg p-4">
            <canvas className="w-full h-full bg-red-300 rounded-lg z-10" ref={canvasRef} />
            <Fab color="primary" aria-label="add">
                <AddIcCallOutlined />
            </Fab>
        </div>
    );
};

export default Video;