import paper, { Path, Tool } from "paper";
import { Point } from "paper/dist/paper-core";
import { createRef } from "react";
import { io } from "socket.io-client";
const backend = import.meta.env.VITE_BACKEND_URL;
const socket = io(backend);
const Video = () => {
    const canvasRef = createRef();
    window.addEventListener('load', () => {
        try {
            paper.setup(canvasRef.current);

            let path, pencil = {};
            let tool = new Tool();

            tool.onMouseDown = function (event) {
                console.log("Mouse Down");
                path = new Path();
                path.strokeColor = 'black';
                path.add(event.point);
                console.log(path);
            };

            tool.onMouseDrag = function (event) {
                console.log("Mouse Dragged");
                path.add(event.point);
                pencil.position = event.point;
            };

            tool.onMouseUp = function (event) {
                let { x, y } = pencil.position;
                let positionAtMouseUp = new Point(x, y);

                let pathObj = {
                    paperObj: path.exportJSON({ precision: 2 }),
                    finalPosition: positionAtMouseUp
                };
                socket.emit("packet", { pathObj });
                console.log("packet - sent", pathObj);
                console.log("MouseUp", event.point);
            };

            // Draw from others.
            socket.on("packet", function (data) {
                console.log("packet - received : ", data.pathObj);
                if (data.pathObj) {
                    const receivedPath = new Path();
                    receivedPath.importJSON(data.pathObj.paperObj);
                    receivedPath.finalPosition = new Point(data.pathObj.finalPosition, data.pathObj.finalPosition);
                    receivedPath.smooth();
                }
            });
        } catch (e) {
            console.log(e);
        }

    });


    return (
        <div className="w-full h-full bg-gray-100 rounded-lg p-4 col-span-5">
            <canvas className="w-full h-full bg-blue-100 rounded-lg z-10" ref={canvasRef} />
        </div>
    );
};

export default Video;