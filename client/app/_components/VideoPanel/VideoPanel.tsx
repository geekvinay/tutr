import React from 'react'
import { TopBar } from '../TopBar/TopBar';
import Whiteboard from '../Whiteboard/Whiteboard';

export const VideoPanel = () => {
  return (
    <section className='h-full w-full bg-gray-100 border-r-2 border-gray-300 col-span-5 flex flex-col justify-start items-start'>
        <TopBar/>
        <Whiteboard/>
    </section>
  )
}
