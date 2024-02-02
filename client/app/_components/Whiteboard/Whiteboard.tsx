"use client";
import React, { useEffect, useRef, useState } from 'react';
import * as paper from 'paper';
import { Path } from 'paper';
import { Point } from "paper/dist/paper-core";
import { io } from 'socket.io-client';
import {  } from '@mui/icons-material';
import PenTools from '../PenTools/PenTools';
import { DragOptions, useDraggable } from '@neodrag/react';
const socket = io('http://localhost:8001');


const Whiteboard = ({ isTeacher }: { isTeacher: boolean; }) => {
    var pathBox: paper.Path[] = [];
    const canvasRef = useRef();
    const penToolsRef = useRef(null);
    const dragOptions: DragOptions = {
        bounds: 'parent',
    };
    useDraggable(penToolsRef, dragOptions);
    const undoOperation = () => {
        if (pathBox.length > 0) {
            if (pathBox[-1]) {
                pathBox[-1].remove();
            }
        }
    };
    
    useEffect(() => {
        paper.setup(canvasRef.current as any);
        const tool = new paper.Tool();
        let tempPath : paper.Path;
        
        if (isTeacher) {
            tool.onMouseDown = (event: any) => {
                tempPath = new paper.Path();
                tempPath.strokeColor = new paper.Color('#0e0e0e');
                tempPath.strokeWidth = 2;
                tempPath.add(event);
            };

            tool.onMouseDrag = (event: any) => {
                tempPath.add(event.point);
                tempPath.strokeWidth = 2;
                tempPath.smooth({ type: 'catmull-rom', factor: 1 });
            };

            tool.onMouseUp = (event: any) => {
                let { x, y } = event.point;
                let positionAtMouseUp = new Point(x, y);

                pathBox.push(tempPath);
                console.log('pathArr:1 ', pathBox);

                let pathObj = {
                    paperObj: tempPath.exportJSON({ precision: 2 }),
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
                    <div className='absolute bottom-[1.5rem] wrapper m-2' ref={penToolsRef}>
                        <PenTools operations={{ undoOperation }} />
                    </div>
                    : <></>
            }
        </section>
    );
};

export default Whiteboard;