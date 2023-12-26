"use client";
import React, { useEffect, useRef } from 'react';
import * as paper from 'paper';


const Whiteboard = () => {
    const canvasRef = useRef();
    useEffect(() => {
        paper.setup(canvasRef.current as any);
        const tool = new paper.Tool();
        let path: any;

        tool.onMouseDown = (event: any) => {
            path = new paper.Path();
            path.strokeColor = '#0F0F0F';
            path.strokeWidth = 2;
            path.add(event);
        };
        
        tool.onMouseDrag = (event: any) => {
            path.add(event.point);
            path.strokeWidth = 2;
            path.smooth({ type: 'catmull-rom', factor: 1 });
        };

        return () => { };
    }, []);


    return (
        <section className='h-full w-full p-4 text-gray-200'>
            <canvas id="myCanvas" ref={canvasRef as any} className='bg-gray-200 border-2 border-gray-400 rounded-md h-full w-full hover:cursor-pointer' />
        </section>
    );
};

export default Whiteboard;