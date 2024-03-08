"use client";
import React, { useEffect, useRef, useState } from 'react';
import PenTools from '../PenTools/PenTools';
import { fabric } from 'fabric';
import { penToolTip } from '@/app/_utils/enums';
import { Button } from '@mui/material';
import socketSerivce from '@/app/_services/socketService';

const Whiteboard = ({ isTeacher, socket }: { isTeacher: boolean; socket: socketSerivce }) => {
    const canvasRef: any = useRef("");
    const canvasPar: any = useRef("");
    const [penTools, setPenTools] = useState(
        {
            penTip: penToolTip.PEN,
            tipColor: "#0E0E0E",
            tipSize: 3
        }
    );
    const myCanvas = useRef() as any;

    useEffect(() => {
        socket.socket.on("sendMessage", (mess)=>{
            console.log("received mess : ", mess);
        })

        if (!canvasRef) return;
        myCanvas.current = new fabric.Canvas(
            canvasRef.current,
            {
                isDrawingMode: true,
                height: canvasPar.current.clientHeight - 24,
                width: canvasPar.current.clientWidth - 24,  
                defaultCursor: "grab",
            }
        );
        myCanvas.current.freeDrawingBrush.width = 3;
        myCanvas.current.freeDrawingBrush.color = "0e0e0e";

        const handleMouseDown = (options: any) => {
            console.log("Mouse Down:", options.e.clientX, options.e.clientY);
        };

        const handleMouseUp = (options: any) => {

            console.log("Mouse Up:", options.e.clientX, options.e.clientY);
        };

        const handleObjectModified = (event: any) => {
            const modifiedObject = event.target;
            console.log("Object Modified:", modifiedObject.path);
            socket.sendToRoom(JSON.stringify(modifiedObject));
        };

        myCanvas.current.on('mouse:down', handleMouseDown);
        myCanvas.current.on('mouse:up', handleMouseUp);
        myCanvas.current.on('object:added', handleObjectModified);


        return () => {
            myCanvas.current.dispose();
        };
    });

    function setTipAsEraser() {
        myCanvas.current.freeDrawingBrush.width = 10;
        myCanvas.current.freeDrawingBrush.color = "#FFFFFF";
    }

    function setTipAsPencil() {
        myCanvas.current.freeDrawingBrush.width = 3;
        myCanvas.current.freeDrawingBrush.color = "0E0E0E";
    }


    return (
        <section ref={canvasPar} className='h-full w-full text-gray-200 bg-white rounded-md p-3 flex justify-center'>
            <canvas ref={canvasRef} className='rounded-md' height={canvasPar.current.clientHeight} width={canvasPar.current.clientWidth} />
            <div className='button-wrapper w-fit h-fit'>
                <Button color='inherit' className='bg-sky-600 hover:bg-sky-800 w-full h-fit' onClick={setTipAsEraser}>Eraser</Button>
                <Button color='inherit' className='bg-sky-600 hover:bg-sky-800 w-full h-fit mt-2' onClick={setTipAsPencil}>Pencil</Button>
            </div>
        </section>
    );
};

export default Whiteboard;