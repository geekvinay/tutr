"use client";
import React, { useEffect, useRef, useState } from 'react';
import PenTools from '../PenTools/PenTools';
import { fabric } from 'fabric';
import { penToolTip } from '@/app/_utils/enums';
import { Button } from '@mui/material';

const Whiteboard = ({ isTeacher }: { isTeacher: boolean; }) => {
    const canvasRef: any = useRef("");
    const canvasPar: any = useRef("");
    const [penTools, setPenTools] = useState(
        {
            penTip: penToolTip.PEN,
            tipColor: "#0E0E0E",
            tipSize: 3
        }
    );
    let canvas = useRef() as any;

    useEffect(() => {
        if (!canvasRef) return;
        console.log(canvasPar);

        canvas.current = new fabric.Canvas(canvasRef.current, {
            isDrawingMode: true,
            height: canvasPar.current.clientHeight - 24,
            width: canvasPar.current.clientWidth - 24,
        });

        canvas.current.freeDrawingBrush.width = penTools.tipSize;
        canvas.current.freeDrawingBrush.color = penTools.tipColor;

        return () => {
            canvas.current.dispose();
        };
    }, [penTools]);

    function setTipAsEraser() {
        canvas.current.freeDrawingBrush.width = 15;
        canvas.current.freeDrawingBrush.color = "white";
    }

    function setTipAsPencil() {
        canvas.current.freeDrawingBrush.width = penTools.tipSize;
        canvas.current.freeDrawingBrush.color = penTools.tipColor;
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