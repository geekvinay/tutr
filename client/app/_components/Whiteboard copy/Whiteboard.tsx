"use client";
import React, { useEffect, useRef, useState } from 'react';
import * as paper from 'paper';
import { Path } from 'paper';
import { Point } from "paper/dist/paper-core";
import { io } from 'socket.io-client';
import { AddIcCallOutlined, CloseFullscreen, RedoOutlined, UndoOutlined } from '@mui/icons-material';
import PenTools from '../PenTools/PenTools';
import { DragOptions, useDraggable } from '@neodrag/react';
const socket = io("192.168.29.152:8001");


const Whiteboard = ({ isTeacher }: { isTeacher: boolean; }) => {
    let [pathArr, setPathArr] = useState([] as paper.Path[]);
    let [path, setPath] = useState({} as paper.Path);
    const canvasRef = useRef();
    const penToolsRef = useRef(null);
    const dragOptions: DragOptions = {
        bounds: 'parent',
    };
    useDraggable(penToolsRef, dragOptions);

    const undoOperation = () => {
        if (pathArr.length) {
            let topPath = pathArr[0];
            topPath.remove();
            setPathArr(pathArr);
        }
        let path: paper.Path;
    };

    useEffect(() => {
        // paper.setup(canvasRef.current as any);
        // setPath(new paper.Path());


        const tool = new paper.Tool();
        if (isTeacher) {
            tool.onMouseDown = (event: any) => {
                path.strokeColor = new paper.Color('#0e0e0e');
                path.strokeWidth = 2;
                path.add(event);
            };

            tool.onMouseDrag = (event: any) => {
                path.add(event.point);
                path.strokeWidth = 2;
                path.smooth({ type: 'catmull-rom', factor: 1 });
            };

            tool.onMouseUp = (event: any) => {
                let { x, y } = event.point;
                let positionAtMouseUp = new Point(x, y);
                // console.log('pathArr:1 ', pathArr);
                // setPathArr([path, ...pathArr]);
                // console.log('pathArr:2 ', pathArr);
                // setPath(path);


                let pathObj = {
                    paperObj: path.exportJSON({ precision: 2 }),
                    finalPosition: positionAtMouseUp
                };
                socket.emit('new-path', {
                    pathObj
                });
            };

            socket.on('message', (data) => {
                if (data) {
                    console.log(data);
                }
            });
        }
        else {
            socket.on('new-path', (data) => {
                if (data.pathObj) {
                    const receivedPath = new Path();
                    receivedPath.importJSON(data.pathObj.paperObj);
                    receivedPath.smooth();
                }
            });
        }
        return () => { };
    });


    return (
        <section className='relative h-full w-full text-gray-200 bg-gray-50 rounded-md p-3 flex justify-center'>
            <canvas id="myCanvas" ref={canvasRef as any} className='rounded-md h-full w-full hover:cursor-pointer' />
            {
                isTeacher ?
                    <div className='absolute bottom-[2rem] wrapper m-4' ref={penToolsRef}>
                        <PenTools operations={{ undoOperation }} />
                    </div>
                    : <></>
            }
        </section>
    );
};

export default Whiteboard;